import { useEffect, useState } from 'react';

export default function useGetTasks() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await fetch(`${apiUrl}get-tasks`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await res.json();
                setTasks(data.tasks);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        getTasks();
    }, []);

    return { tasks, loading, error };
}   