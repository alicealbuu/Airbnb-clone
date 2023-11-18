import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      setUser(response.data);
      alert("Login succesful");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className=" flex flex-col min-h-screen ">
      <Header />
      <div className="mt-4 grow flex items-center justify-around">
        <div className="-mt-64">
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form className="max-w-md mx-auto" onSubmit={loginUser}>
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
            <button className="primary">Login</button>
            <div className="text-center py-2 text-gray-500">
              Don`t have an account yet?
              <Link to={"/register"} className="underline text-black px-1">
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
