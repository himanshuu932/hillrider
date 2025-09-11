import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function AdminLogin({ setIsAdmin }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            // The API call now includes `withCredentials: true`
            await axios.post(
                "http://localhost:5000/api/admin/login",
                formData,
                { 
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true // This is crucial for sending/receiving cookies
                }
            );

            // 🚫 We no longer save the token to localStorage
            // localStorage.setItem('adminToken', res.data.token);

            setIsAdmin(true);
            navigate("/admin");

        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
            console.error(err);
        }
    };


    return (
        <div className="flex min-w-[600px ] items-center justify-center min-h-[60vh] bg-gray-100 p-4">
            
            <form 
                className="w-[500px]  bg-white p-6 sm:p-8 rounded-xl shadow-xl"
                onSubmit={handleSubmit}
            >
                {/* Header: Always a row, now centered */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8">
                    {/* Logo */}
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-200 shadow flex-shrink-0"
                    />

                    {/* Title */}
                    <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
                        Hill Riders Manva Sewa Samiti
                    </h1>
                </div>

                {error && (
                    <p className="bg-red-100 border border-red-300 text-red-700 text-sm rounded-md p-3 mb-4">
                        {error}
                    </p>
                )}

                <div>
                    <input
                        type="text"
                        name="identifier"
                        placeholder="Email or Phone"
                        value={formData.identifier}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white font-bold text-lg rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
