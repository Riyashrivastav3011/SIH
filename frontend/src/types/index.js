

export const STATION_STATUS = {
  COMPLETED: "COMPLETED",
  CURRENT: "CURRENT",
  UPCOMING: "UPCOMING",
  DELAYED: "DELAYED",
};

export const TRAIN_STATUS = {
  ON_TIME: "ON_TIME",
  DELAYED: "DELAYED",
  CRITICAL: "CRITICAL",
  TERMINATED: "TERMINATED",
};

export const ALERT_TYPES = [
  "Congestion",
  "Speed Restriction",
  "ETA Updated",
  "Operational Delay",
  "System Alert",
];

export const ALERT_SEVERITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
};

/**
 * @typedef {"COMPLETED" | "CURRENT" | "UPCOMING" | "DELAYED"} StationStatus
 * @typedef {"ON_TIME" | "DELAYED" | "CRITICAL" | "TERMINATED"} TrainStatus
 */

/**
 * @typedef {Object} Station
 * @property {string} code
 * @property {string} name
 * @property {number} lat
 * @property {number} lng
 * @property {string} scheduledArrival
 * @property {string} [predictedArrival]
 * @property {string} [actualArrival]
 * @property {number} delayMinutes
 * @property {number} [platform]
 * @property {StationStatus} status
 * @property {number} distanceFromOrigin
 */

/**
 * @typedef {Object} ETAPrediction
 * @property {string} nextStation
 * @property {string} nextStationCode
 * @property {string} scheduled
 * @property {string} predicted
 * @property {number} delayMinutes
 * @property {number} confidence
 * @property {string} windowStart
 * @property {string} windowEnd
 * @property {number} speed
 * @property {number} distanceCovered
 * @property {number} distanceRemaining
 * @property {number} avgSpeed
 */

/**
 * @typedef {Object} Train
 * @property {string} number
 * @property {string} name
 * @property {string} origin
 * @property {string} destination
 * @property {string} originCode
 * @property {string} destCode
 * @property {TrainStatus} status
 * @property {{ lat: number, lng: number, name: string }} currentLocation
 * @property {ETAPrediction} eta
 * @property {Station[]} stations
 * @property {{ name: string, value: number }[]} delayFactors
 */

/**
 * @typedef {Object} Alert
 * @property {string} id
 * @property {"Congestion" | "Speed Restriction" | "ETA Updated" | "Operational Delay" | "System Alert"} type
 * @property {"LOW" | "MEDIUM" | "HIGH" | "CRITICAL"} severity
 * @property {string} train
 * @property {string} section
 * @property {string} timestamp
 * @property {string} message
 */

/**
 * @typedef {Object} KPIs
 * @property {number} total
 * @property {number} onTime
 * @property {number} delayed
 * @property {number} critical
 * @property {number} avgDelay
 * @property {number} accuracy
 */