import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useProfile();

  const [user, setUser] = useState({
    name: "",
    phone: "",
    image: "",
    address: { houseNo: "", street: "", city: "", pincode: "", state: "" },
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["houseNo", "street", "city", "pincode", "state"].includes(name)) {
      setUser((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    login(user);
    alert("Account Created Successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-md my-28 mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
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

        <label>Address:</label>
        <input
          type="text"
          name="houseNo"
          placeholder="House No."
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
          required
          className="border p-2"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          onChange={handleChange}
          required
          className="border p-2"
        />

        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
