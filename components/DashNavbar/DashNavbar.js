'use client';
import './styles.css';
import Link from 'next/link';
import useGetUser from '@/hooks/useGetUser';
import useLogout from '@/hooks/useLogout';
import { useRef } from 'react';

import { Poppins } from 'next/font/google';

const poppins = Poppins({ weight: ['400', '600'], subsets: ['latin'] });


export default function DashNavbar() {
    const { user, img } = useGetUser();
    const menuRef = useRef(null);
    const handleMenuClick = () => {
        menuRef.current.classList.toggle('active');
    };
    
    return (
        <>
        <button className='nav-btn' onClick={handleMenuClick}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
        </button>
        <div className="navbar" ref={menuRef}>
            <div className='container'>
                <Link href='/dashboard' className={`${poppins.className} nav-link`}>
                    <p>Home</p>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
                </Link>
                <Link href='' onClick={useLogout} className={`${poppins.className} nav-link`}>
                    <p>Logout</p>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                </Link>
                {
                    user ? (
                        <Link href='/profile' className={`${poppins.className} nav-link profile`}>
                            <p>{user.username}</p>
                            <img src={img} draggable='false' alt='profile pic' />
                        </Link>
                    ) : (
                        <p>Loading...</p>
                    )
                }
            </div>
        </div>
        </>
    );
}