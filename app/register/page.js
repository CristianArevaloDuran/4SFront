'use client';
import './styles.css';
import Head from 'next/head';

import RegisterForm from "@/components/RegisterForm/RegisterForm";

export default function Register() {
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