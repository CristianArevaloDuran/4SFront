import { useState } from "react";

export default function useEditTask() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const serverEditTask = async (id, content, priority) => {
        setLoading(true);
        if (!content || !priority || content === '' || priority === '') {
            setLoading(false);
            setError("Please fill in all fields");
            return;
        }
        try {
            const response = await fetch(`${apiUrl}update-task/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    content,
                    priority
                }),
            });
            const data = await response.json();
            if (response.status !== 200) {
                setLoading(false);
                setError(data.message);
            } else {
                setLoading(false);
                window.location.href = '/dashboard';
            }
        } catch (error) {
            console.error("Error updating task:", error);
            setLoading(false);
            setError("Error updating task");
        }
    }

    return { loading, error, serverEditTask };
}