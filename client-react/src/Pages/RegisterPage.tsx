import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { POST } = useFetch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = { fullName, email, password, phone, isAdmin };
    const seccessfulyAddUser = await POST("users", newUser);
    console.log(seccessfulyAddUser);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">שם מלא</label>
          <input
            id="fullName"
            type="text"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="email">אימייל</label>
          <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">סיסמה</label>
          <input
            id="password"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">טלפון</label>
          <input
            id="phone"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button type="submit">לחץ עלי</button>
      </form>
    </>
  );
}

// fullName: string;
// email: string;
// password: string;
// phone: string;
// isAdmin: boolean;
// image?: string;
