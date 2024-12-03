import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { POST } = useFetch();
  const navigate = useNavigate();
  const loginStyle: React.CSSProperties = {
    textAlign: "center",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const UserLogin = { email, password };
    const findUser = await POST("auth/login", UserLogin);
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={loginStyle}>
        <div>
          <label htmlFor="email">איימיל</label>
          <input
            id="email"
            type="text"
            placeholder="Enter your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">סיסמה</label>
          <input
            id="password"
            type="text"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">לחץ עלי</button>
      </form>
    </>
  );
}
