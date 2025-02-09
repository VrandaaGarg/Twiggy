import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useProfile();
  const [credentials, setCredentials] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("customer"));

    if (
      storedUser &&
      (storedUser.email === credentials.emailOrPhone ||
        storedUser.phone === credentials.emailOrPhone) &&
      storedUser.password === credentials.password
    ) {
      login(storedUser);
      navigate("/");
    } else {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="max-w-md my-28 mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email or Phone"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>

      {/* Sign-Up Option */}
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/signup")}
          className="text-blue-500 underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
