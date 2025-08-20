import { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";

// Accept setIsAdmin as a prop to update the parent state
export default function AdminLogin({ setIsAdmin }) { 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: "", // Changed from 'email' to 'identifier' to match input
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        try {
            const res = await axios.post(
                "http://localhost:5000/api/admin/login",
                formData,
                { headers: { "Content-Type": "application/json" } }
            );
            
            // On successful login:
            // 1. Store the token to keep the user logged in
            localStorage.setItem('adminToken', res.data.token); 
            
            // 2. Update the application's authentication state
            setIsAdmin(true);
            
            // 3. Navigate to the admin panel
            navigate("/admin");

        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Admin Login</h2>

                {error && <p className="error-message">{error}</p>}

                <input
                    type="text"
                    name="identifier"
                    placeholder="Email or Phone"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}
