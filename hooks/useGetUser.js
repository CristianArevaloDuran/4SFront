import { useState, useEffect } from 'react';

export default function useGetUser() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [user, setUser] = useState(null);
    const [img, setImg] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
            const res = await fetch(`${apiUrl}user-data`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();
            if (res.status === 403) {
                setUser(null);
            } else {
                setUser(data);
            }
        } catch (err) {
            console.log(err);
        }
        }
        getUser();
    }, []);

    useEffect(() => {
        const getImg = async () => {
            try {
                const res = await fetch(`${apiUrl}user-profile-pic`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await res.blob();
                if (res.status === 403) {
                    setImg(null);
                } else {
                    const url = URL.createObjectURL(data);
                    setImg(url);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getImg();
    }, []);

    return { user, img };
}