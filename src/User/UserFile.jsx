// import React, { useState, useContext, createContext } from "react";
import React, { useState, useContext, createContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export const change=createContext()
export default function AuthPage() {
  const { user, setUser, } = useContext(CartContext);
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!email || !password || (isSignup && (!name || !confirmPassword))) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    

    try {
      if (isSignup) {
        const existing = await axios.get(
          `http://localhost:5000/users?email=${email}`
        );
        if (existing.data.length > 0) {
          toast.error("Email already registered");
          return;
        }

        const newUser = {
   name,
          email,
          password,
   role: "user",
          status: "active",
   cart: [],
          wishlist:[],
          orders:[]
        };
  
        const res = await axios.post("http://localhost:5000/users", newUser);
        localStorage.setItem("user", res.data.id);
        setUser(res.data);
        toast.success("Signup successful! You are now logged in.");
        navigate("/");
      } else {
        const res = await axios.get(`http://localhost:5000/users?email=${email}`);
        const foundUser = res.data[0];

        if (!foundUser) {
          alert("User not found");
      return;
        }

        if (foundUser.password !== password) {
          alert("Incorrect password");
          return;
        }

        if (foundUser.status === "blocked") {
          alert("Your account has been blocked by an administrator.");
          return;
        }

        localStorage.setItem("user", foundUser.id);
        setUser(foundUser);

        if (foundUser.role === "admin") {
          toast.success("Welcome Admin!");
          navigate("/admin");
        } else {
          alert("Login successful!");
          navigate("/");
        }
      } 
    } catch (err) {
      console.error("Auth error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/user");
  };

  if (user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/shop1.webp')" }}
      >
        <div className="bg-black/60 p-6 rounded shadow-md text-center text-white w-[100vh] h-[50vh]">
          <h2 className="text-7xl font-bold mb-4 ">WELCOME {user.name}</h2>
          <button
            onClick={handleLogout}
            className="bg-black px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/shop.webp')" }}
      >
        <div className="bg-black/40 w-full h-full"></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {isSignup ? "Sign Up" : "Login"}
          </h2>

          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 mb-3 w-full"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Gmail"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 mb-3 w-full"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 mb-3 w-full"
          />

          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border p-2 mb-4 w-full"
            />
          )}

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded w-full mb-3 hover:bg-blue-700"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <p className="text-center text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 underline"
            >
              {isSignup ? "Login here" : "Sign up here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}