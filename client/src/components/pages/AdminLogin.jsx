import { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:5000/api/admin/login",
                formData,
                { headers: 
                    { 
                        "Content-Type": "application/json",
                    }
                }
            );
            alert("Login successful!");
            console.log(res.data);
            navigate("/");
        } catch (err) {
            alert("Invalid credentials");
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Admin Login</h2>

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
