import { useState } from "react";

export default function useDoneTask() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDoneTask = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}done-task/${id}`, {
                method: "PUT",
                credentials: "include"
            });
            if (response.status === 200) {
                setLoading(false);
            }
            else {
                console.error("Error updating task");
                setError("Error updating task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            setError("Error deleting task");
        }
    }

    return {fetchDoneTask, loading, error};
}