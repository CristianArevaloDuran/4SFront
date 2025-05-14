import { useState } from "react";

export default function useGetTask() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getTask = async (id) => {
        try {
            const res = await fetch(`${apiUrl}get-task/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();
            setTask(data.task);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    return { task, loading, error, getTask };
}