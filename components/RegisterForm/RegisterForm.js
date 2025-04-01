import './styles.css';
import { useState } from "react";

import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: ['400', '500'], 
    styles: "latin",
    subsets: ['latin']
});

export default function RegisterForm() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");

    const handleChanges = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "firstname") setName(value);
        if (name === "lastname") setLastname(value);
        if (name === "username") setUsername(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${apiUrl}register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password,
                name: firstname,
                lastname,
                username
            }),
        });
        const data = await response.json();
        
        if (response.status !== 201) {
            alert(data.message);
        } else {
            window.location.href = "/dashboard";
        }
        
    }
       
    return (
        <div className="register">
            <h1 className={`${poppins.className}`}>Register</h1>
            <form onSubmit={handleSubmit} className={`${poppins.className}`}>
                <div className='input-group'>
                    <label htmlFor="email">
                        Email:
                    </label>
                    <input type="email" id='email' name="email" onChange={handleChanges} className={`${poppins.className}`}/>
                </div>
                <div className='input-group'>
                    <label htmlFor="firstname">
                        Name:
                    </label>
                    <input type="text" id='firstname' name="firstname" onChange={handleChanges} className={`${poppins.className}`}/>
                </div>
                <div className='input-group'>
                    <label htmlFor="lastname">
                        Lastname:
                    </label>
                    <input type="text" id='lastname' name="lastname" onChange={handleChanges} className={`${poppins.className}`}/>
                </div>
                <div className='input-group'>
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input type="text" id='username' name="username" onChange={handleChanges} className={`${poppins.className}`}/>
                </div>
                <div className='input-group'>
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" id='password' name="password" onChange={handleChanges} className={`${poppins.className}`}/>
                </div>
                <button type="submit" className={`${poppins.className}`}>Register</button>
            </form>
        </div>
    )
}