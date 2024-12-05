import React, { useState } from "react";

const Signin = ({setauthLogin, setisAuth}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.data.user_id) {
        setUserId(data.data.user_id);
        setisAuth(true);
        localStorage.setItem("Auth", data.data.user_id);
        setMessage("Login successful!");
      } else {
        setMessage(data.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Signin</button>
        <div onClick={() => setauthLogin(true)}>Create new account</div>
      </form>
      {message && <p>{message}</p>}
      {userId && <p>Welcome! Your User ID: {userId}</p>}
    </div>
  );
};

export default Signin;
