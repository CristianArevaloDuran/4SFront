import { useState } from "react";

export default function useDeleteTask() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDeleteTask = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}delete-task/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (response.status === 200) {
                setLoading(false);
            }
            else {
                console.error("Error deleting task");
                setError("Error deleting task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            setError("Error deleting task");
        }
    }

    return {fetchDeleteTask, loading, error};
}