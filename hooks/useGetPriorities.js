import { useState, useEffect } from "react";

export default function useGetPriorities() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [priorities, setPriorities] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}get-priorities`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })
                const data = await response.json();
                if (response.status === 403) {
                    setPriorities(null);
                    setError("You are not authorized to view this content");
                } else {
                    setPriorities(data.priorities);
                    setLoading(false);
                }
            } catch (err) {
                setError("An error occurred. Please try again later.");
            }
        }
        fetchData();
    }, []);
    
    return { priorities, error, loading };
}