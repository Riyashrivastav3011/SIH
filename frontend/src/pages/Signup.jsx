import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/authApi";
import "./Signup.css";

function Signup() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        organization: "",
        role: "public",
        accessCode: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (
            !form.name ||
            !form.email ||
            !form.password ||
            !form.confirmPassword
        ) {

            setError(
                "Please complete all required fields."
            );

            return;
        }


        if (form.role !== "public" && !form.accessCode) {
            setError("Access code is required for staff and administrator accounts.");
            return;
        }


        if (form.password !== form.confirmPassword) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        if (form.password.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;
        }


        try {

            setLoading(true);

            const data = await signupUser({
                name: form.name,
                email: form.email,
                organization: form.organization,
                role: form.role,
                accessCode: form.accessCode,
                password: form.password
            });

            // sign the user in straight away
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("name", data.name || "");

            navigate(
                data.role === "staff" || data.role === "admin"
                    ? "/control-room"
                    : "/dashboard"
            );

        } catch (err) {

            setError(
                err?.response?.data?.error ||
                "Unable to create account. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (
        <div className="auth-page">

            {/* Left Section */}
            <div className="auth-brand">

                <div className="auth-brand-content">

                    <div className="brand auth-logo">

                        <div className="brand-logo">
                            RC
                        </div>

                        <div className="brand-text">

                            <h2>
                                RAILCAST
                            </h2>

                            <span>
                                INTELLIGENT RAIL NETWORK
                            </span>

                        </div>

                    </div>


                    <div className="auth-hero">

                        <div className="eyebrow">
                            NETWORK INTELLIGENCE
                        </div>

                        <h1>
                            One network.
                            <br />
                            <span>One intelligent view.</span>
                        </h1>

                        <p>
                            Monitor railway operations,
                            understand delays and make
                            informed decisions with real-time
                            network intelligence.
                        </p>

                    </div>


                    <div className="auth-features">

                        <div>
                            <span>01</span>
                            Real-time train monitoring
                        </div>

                        <div>
                            <span>02</span>
                            Dynamic ETA forecasting
                        </div>

                        <div>
                            <span>03</span>
                            Network-wide analytics
                        </div>

                    </div>

                </div>

            </div>


            {/* Signup Section */}
            <div className="auth-form-section">

                <div className="auth-card signup-card">

                    <div className="auth-mobile-logo">

                        <div className="brand-logo">
                            RC
                        </div>

                        <div>
                            <strong>
                                RAILCAST
                            </strong>

                            <span>
                                INTELLIGENT RAIL NETWORK
                            </span>
                        </div>

                    </div>


                    <div className="auth-heading">

                        <div className="eyebrow">
                            GET STARTED
                        </div>

                        <h2>
                            Create your account
                        </h2>

                        <p>
                            Set up your authorized RailCast
                            workspace access.
                        </p>

                    </div>


                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}


                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-row">

                            <div className="form-group">

                                <label className="form-label">
                                    Full name
                                </label>

                                <input
                                    className="form-input"
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form-group">

                                <label className="form-label">
                                    Role
                                </label>

                                <select
                                    className="form-select"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                >

                                    <option value="staff">
                                        Railway Staff
                                    </option>

                                    <option value="admin">
                                        Administrator
                                    </option>

                                </select>

                            </div>

                        </div>


                        {form.role !== "public" && (
                            <div className="form-group">

                                <label className="form-label">
                                    Access code
                                </label>

                                <input
                                    className="form-input"
                                    type="password"
                                    name="accessCode"
                                    placeholder="Issued by the control room"
                                    value={form.accessCode}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />

                            </div>
                        )}


                        <div className="form-group">

                            <label className="form-label">
                                Work email
                            </label>

                            <input
                                className="form-input"
                                type="email"
                                name="email"
                                placeholder="you@organization.com"
                                value={form.email}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label className="form-label">
                                Organization
                                <span className="optional">
                                    Optional
                                </span>
                            </label>

                            <input
                                className="form-input"
                                type="text"
                                name="organization"
                                placeholder="Organization or department"
                                value={form.organization}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label className="form-label">
                                Password
                            </label>

                            <div className="password-input">

                                <input
                                    className="form-input"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Minimum 6 characters"
                                    value={form.password}
                                    onChange={handleChange}
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"
                                    }
                                </button>

                            </div>

                        </div>


                        <div className="form-group">

                            <label className="form-label">
                                Confirm password
                            </label>

                            <input
                                className="form-input"
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-enter your password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />

                        </div>


                        <label className="terms-check">

                            <input
                                type="checkbox"
                                required
                            />

                            <span>
                                I agree to the RailCast
                                platform terms and authorized
                                access policy.
                            </span>

                        </label>


                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating account..."
                                : "Create account"
                            }

                        </button>

                    </form>


                    <div className="auth-security">

                        <span>🔒</span>

                        <span>
                            Your credentials are protected
                            using secure authentication.
                        </span>

                    </div>


                    <div className="auth-switch">

                        <span>
                            Already have an account?
                        </span>

                        <Link to="/login">
                            Sign in
                        </Link>

                    </div>


                    <div className="auth-footer">
                        RailCast · Intelligent Rail Network
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Signup;