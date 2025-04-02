'use client';
import './styles.css';
import { Poppins } from 'next/font/google';
import Link from "next/link";
import useGetUser from "@/hooks/useGetUser";
import useLogout from '@/hooks/useLogout';
import { useRef, useEffect, useState} from 'react';

const poppins = Poppins({weight: ["400"], subsets: ['latin']});

export default function Navbar() {

    const { user, img } = useGetUser();
    const userRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const showUser = (event) => {
        event.stopPropagation();
        setMenuOpen(true);
        userRef.current?.classList.toggle("active");
    };

    useEffect(() => {
        if (!menuOpen) return;

        const handleClickOutside = (event) => {
            if (event.target !== userRef.current || event.target !== userRef.current?.children) {
                userRef.current?.classList.remove("active");
                setMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuOpen]);
    
    return (
        <nav className='navbar'>
            {
                user ? (
                    <div className={`${poppins.className} nav-links`}>
                        <div className='nav-buttons'>
                            <Link href="/">Home</Link>
                            <Link href="/dashboard">Dashboard</Link>
                        </div>
                        <button onClick={showUser}>
                            <img src={img} draggable='false' alt='profile pic' />
                        </button>
                        <div className='nav-user' ref={userRef}>
                            <Link href='/profile' className={poppins.className}>{user.username}</Link>
                            <button className={poppins.className} onClick={useLogout}>Logout</button>
                        </div>
                    </div>
                    
                ) : (
                    <div className={`${poppins.className} nav-links`}>
                        <div className='nav-buttons'>
                            <Link href="/">Home</Link>
                        </div>
                            <Link href="/login">Login</Link>
                    </div>
                )
            }
        </nav>
    );
}