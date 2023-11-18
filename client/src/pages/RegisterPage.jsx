import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", { name, email, password });
      alert("Registration succesfully, now you can log in!");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  };

  return (
    <div className=" flex flex-col min-h-screen ">
      <Header />
      <div className="mt-4 grow flex items-center justify-around">
        <div className="-mt-64">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary">Register</button>
            <div className="text-center py-2 text-gray-500">
              Allready have an account?
              <Link to={"/login"} className="underline text-black px-1">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}