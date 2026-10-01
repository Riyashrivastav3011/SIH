import React, { useCallback, useEffect, useState } from "react";
import { getSummary, getZones, getDelayed } from "../services/controlroomapi.js";
import { useLive } from "../hooks/useLive.js";
import './Cascade.css';

const ControlRoom = () => {
    const [summary, setSummary] = useState({
        activeTrains: 0,
        onSchedule: 0,
        delayed: 0,
        averageDelay: 0,
    });

    const [zones, setZones] = useState([]);
    const [delayedTrains, setDelayedTrains] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const loadControlRoom = async () => {
        try {
            setLoading(true);
            setError("");

            const [summaryResponse, zonesResponse, delayedResponse] =
                await Promise.all([
                    getSummary(),
                    getZones(),
                    getDelayed(),
                ]);

            setSummary(
                summaryResponse?.data ||
                summaryResponse ||
                {
                    activeTrains: 0,
                    onSchedule: 0,
                    delayed: 0,
                    averageDelay: 0,
                }
            );

            setZones(
                zonesResponse?.data ||
                zonesResponse ||
                []
            );

            setDelayedTrains(
                delayedResponse?.data ||
                delayedResponse ||
                []
            );

            setLastUpdated(new Date());
        } catch (err) {
            console.error(err);

            if (err?.response?.status === 401 || err?.response?.status === 403) {
                setError(
                    "Staff or Admin login is required to access Control Room."
                );
            } else {
                setError(
                    "Unable to load control room data. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadControlRoom();
        const id = setInterval(async () => {
            try {
                const [s, z, d] = await Promise.all([getSummary(), getZones(), getDelayed()]);
                setSummary(s);
                setZones(z);
                setDelayedTrains(d);
                setLastUpdated(new Date());
            } catch (e) { /* keep last data */ }
        }, 10000);
        return () => clearInterval(id);
    }, []);

    const handleLiveUpdate = useCallback((update) => {
        if (!update) return;

        const trainNumber =
            update.trainNumber ||
            update.number ||
            update.train?.number;

        const delay =
            update.delayMinutes ??
            update.delay ??
            update.train?.delayMinutes;

        const status =
            update.status ||
            update.train?.status;

        if (!trainNumber) return;

        setDelayedTrains((previous) => {
            const existingIndex = previous.findIndex(
                (train) =>
                    String(
                        train.trainNumber ||
                        train.number ||
                        train.train?.number
                    ) === String(trainNumber)
            );

            const updatedTrain = {
                ...update,
                trainNumber,
                delayMinutes: delay ?? 0,
                status: status || "Delayed",
            };

            if (
                status === "On Time" ||
                status === "Completed" ||
                Number(delay) <= 0
            ) {
                return previous.filter(
                    (train) =>
                        String(
                            train.trainNumber ||
                            train.number ||
                            train.train?.number
                        ) !== String(trainNumber)
                );
            }

            if (existingIndex === -1) {
                return [updatedTrain, ...previous];
            }

            const copy = [...previous];
            copy[existingIndex] = {
                ...copy[existingIndex],
                ...updatedTrain,
            };

            return copy;
        });

        setLastUpdated(new Date());
    }, []);

    useLive(
        "subscribe:all",
        null,
        "status",
        handleLiveUpdate
    );

    const formatTime = (date) => {
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const getTrainNumber = (train) =>
        train.trainNumber ||
        train.number ||
        train.train?.number ||
        "—";

    const getTrainName = (train) =>
        train.trainName ||
        train.name ||
        train.train?.name ||
        "Express Service";

    const getRoute = (train) =>
        train.route ||
        train.train?.route ||
        `${train.source || "—"} → ${train.destination || "—"}`;

    const getZone = (train) =>
        train.zone ||
        train.train?.zone ||
        "Central";

    const getDelay = (train) =>
        train.delayMinutes ??
        train.delay ??
        train.train?.delayMinutes ??
        0;

    const getStatusClass = (delay) => {
        if (delay >= 30) return "critical";
        if (delay >= 10) return "warning";
        return "minor";
    };

    if (loading) {
        return (
            <div className="cr-page">
                <div className="cr-loading">
                    <div className="cr-loader"></div>
                    <p>Loading railway operations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cr-page">

            {/* HEADER */}
            <header className="cr-header">
                <div>
                    <div className="cr-breadcrumb">
                        OPERATIONS / CONTROL ROOM
                    </div>

                    <h1>Control Room</h1>

                    <p>
                        Real-time railway traffic monitoring and operational
                        intelligence
                    </p>
                </div>

                <div className="cr-header-right">
                    <div className="cr-live-indicator">
                        <span></span>
                        LIVE MONITORING
                    </div>

                    <div className="cr-sync">
                        Last sync
                        <strong>{formatTime(lastUpdated)}</strong>
                    </div>

                    <button
                        className="cr-refresh-btn"
                        onClick={loadControlRoom}
                    >
                        ↻
                    </button>
                </div>
            </header>

            {/* ERROR */}
            {error && (
                <div className="cr-error">
                    <div>
                        <strong>Control Room unavailable</strong>
                        <span>{error}</span>
                    </div>

                    <button onClick={loadControlRoom}>
                        Retry
                    </button>
                </div>
            )}

            {/* KPI SECTION */}
            <section className="cr-kpi-grid">

                <div className="cr-kpi blue">
                    <div className="cr-kpi-top">
                        <span>ACTIVE TRAINS</span>
                        <div className="cr-kpi-icon">🚆</div>
                    </div>

                    <strong>
                        {summary.activeTrains ??
                            summary.active ??
                            0}
                    </strong>

                    <small>
                        Currently running
                    </small>
                </div>

                <div className="cr-kpi green">
                    <div className="cr-kpi-top">
                        <span>ON SCHEDULE</span>
                        <div className="cr-kpi-icon">✓</div>
                    </div>

                    <strong>
                        {summary.onSchedule ??
                            summary.onTime ??
                            0}%
                    </strong>

                    <small>
                        Punctuality rate
                    </small>
                </div>

                <div className="cr-kpi orange">
                    <div className="cr-kpi-top">
                        <span>DELAYED TRAINS</span>
                        <div className="cr-kpi-icon">!</div>
                    </div>

                    <strong>
                        {summary.delayed ??
                            summary.delayedTrains ??
                            delayedTrains.length}
                    </strong>

                    <small>
                        Requiring attention
                    </small>
                </div>

                <div className="cr-kpi purple">
                    <div className="cr-kpi-top">
                        <span>AVG. DELAY</span>
                        <div className="cr-kpi-icon">◷</div>
                    </div>

                    <strong>
                        {summary.averageDelay ??
                            summary.avgDelay ??
                            0}m
                    </strong>

                    <small>
                        Across active services
                    </small>
                </div>

            </section>

            {/* MAIN GRID */}
            <section className="cr-main-grid">

                {/* DELAYED TRAINS */}
                <div className="cr-panel cr-trains-panel">

                    <div className="cr-panel-header">
                        <div>
                            <span className="cr-section-label">
                                LIVE OPERATIONS
                            </span>

                            <h2>Delayed Train Services</h2>

                            <p>
                                Live updates from the railway network
                            </p>
                        </div>

                        <div className="cr-count">
                            {delayedTrains.length} Active
                        </div>
                    </div>

                    <div className="cr-table-wrap">
                        <table className="cr-table">
                            <thead>
                                <tr>
                                    <th>TRAIN</th>
                                    <th>SERVICE</th>
                                    <th>ROUTE</th>
                                    <th>ZONE</th>
                                    <th>DELAY</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {delayedTrains.length > 0 ? (
                                    delayedTrains.map((train, index) => {
                                        const delay = Number(
                                            getDelay(train)
                                        );

                                        return (
                                            <tr
                                                key={
                                                    getTrainNumber(train) +
                                                    index
                                                }
                                            >
                                                <td>
                                                    <div className="cr-train-number">
                                                        {getTrainNumber(train)}
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="cr-service-name">
                                                        {getTrainName(train)}
                                                    </div>
                                                </td>

                                                <td>
                                                    <span className="cr-route">
                                                        {getRoute(train)}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="cr-zone">
                                                        {getZone(train)}
                                                    </span>
                                                </td>

                                                <td>
                                                    <strong
                                                        className={`cr-delay ${getStatusClass(
                                                            delay
                                                        )}`}
                                                    >
                                                        +{delay} min
                                                    </strong>
                                                </td>

                                                <td>
                                                    <span
                                                        className={`cr-status ${getStatusClass(
                                                            delay
                                                        )}`}
                                                    >
                                                        {delay >= 30
                                                            ? "Critical"
                                                            : delay >= 10
                                                            ? "Delayed"
                                                            : "Minor Delay"}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="cr-empty"
                                        >
                                            <div>
                                                <span>✓</span>
                                                <strong>
                                                    No delayed trains
                                                </strong>
                                                <small>
                                                    All monitored services are
                                                    currently on schedule.
                                                </small>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ZONE STATUS */}
                <div className="cr-panel">

                    <div className="cr-panel-header">
                        <div>
                            <span className="cr-section-label">
                                NETWORK
                            </span>

                            <h2>Zone Status</h2>

                            <p>
                                Current operational health
                            </p>
                        </div>
                    </div>

                    <div className="cr-zones">

                        {zones.length > 0 ? (
                            zones.map((zone, index) => {
                                const name =
                                    zone.name ||
                                    zone.zone ||
                                    `Zone ${index + 1}`;

                                const status =
                                    zone.status ||
                                    "Operational";

                                const trains =
                                    zone.activeTrains ??
                                    zone.trains ??
                                    zone.active ??
                                    0;

                                const delay =
                                    zone.delay ??
                                    zone.averageDelay ??
                                    0;

                                const isWarning =
                                    String(status).toLowerCase() !==
                                    "operational";

                                return (
                                    <div
                                        className="cr-zone-item"
                                        key={name + index}
                                    >
                                        <div className="cr-zone-info">
                                            <div className="cr-zone-dot"></div>

                                            <div>
                                                <strong>{name}</strong>

                                                <span>
                                                    {trains} active trains
                                                </span>
                                            </div>
                                        </div>

                                        <div className="cr-zone-right">
                                            <strong
                                                className={
                                                    isWarning
                                                        ? "warning"
                                                        : "healthy"
                                                }
                                            >
                                                {delay}m
                                            </strong>

                                            <span>
                                                {isWarning
                                                    ? status
                                                    : "Operational"}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="cr-no-zones">
                                No zone data available.
                            </div>
                        )}

                    </div>
                </div>

            </section>

            {/* OPERATION FOOTER */}
            <section className="cr-operation-strip">

                <div>
                    <span className="cr-strip-label">
                        NETWORK STATUS
                    </span>

                    <strong>
                        Railway network operating normally
                    </strong>
                </div>

                <div className="cr-strip-items">
                    <span>
                        <i className="green-dot"></i>
                        API Connected
                    </span>

                    <span>
                        <i className="green-dot"></i>
                        Live Feed
                    </span>

                    <span>
                        <i className="green-dot"></i>
                        Monitoring Active
                    </span>
                </div>

            </section>

        </div>
    );
};

export default ControlRoom;