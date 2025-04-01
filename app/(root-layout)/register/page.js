'use client';
import './styles.css';
import { useEffect } from 'react';
import Head from 'next/head';

import RegisterForm from "@/components/RegisterForm/RegisterForm";

export default function Register() {
    useEffect(() => {
        document.title = 'Register';
    }, []);
    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <div className='container'>
                <RegisterForm />
            </div>
        </>
    );
}