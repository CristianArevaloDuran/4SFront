'use client';
import './styles.css';
import { useEffect, useState } from "react";
import Spinner from '@/components/Spinner/Spinner';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
  weight: ["400", "700"], 
  subsets: ["latin"]
});

export default function Login() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
      const {name, value} = e.target;
      if (name === "username") setUsername(value);
      if(name === 'password') setPassword(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    
    const fetchLogin = async () => {
      try {
        const response = await fetch(`${apiUrl}login`, {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        });
        const data = await response.json();
        if (response.status === 200) {
          window.location.href = "/dashboard";
        }
        else {
          setError(data.message);
          setLoading(false);
        }
      } catch (error) {
        setError("An error occurred. Try again later.");
        setLoading(false);
      }
    }
    fetchLogin();
  }

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className={`${poppins.className} login`}>
      <div className='formulario'>
        <h1 className='title'>Login</h1>
        <form onSubmit={handleSubmit}> 
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id='username'
            placeholder='Username'
            onChange={handleChange}
            className={poppins.className}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id='password'
            placeholder='Password'
            onChange={handleChange}
            className={poppins.className}
          />
          <p className='error'>{error}</p>
          {loading ? (
            <Spinner />
          ) : (
            <button type="submit" className={`${poppins.className}`}>Login</button>
          )}
        </form>
          <Link href="/register" className="link">Register</Link>
      </div>
    </div>
  );
}