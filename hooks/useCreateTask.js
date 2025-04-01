import { useState } from "react";
import { useTasks } from "@/context/TaskContext";

export default function useCreateTask() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [createTaskLoading, setCreateTaskLoading] = useState(false);
    const [taskCreateError, setTaskCreateError] = useState('');

    const { addTask } = useTasks();

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handlePriority = (e) => {
        setPriority(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setCreateTaskLoading(true);
        if (!title || !description || !priority) {
            setCreateTaskLoading(false);
            setTaskCreateError('All fields are required');
        } else {
            setTaskCreateError('');
            const fetchData = async () => {
                try {
                    const response = await fetch(`${apiUrl}create-task`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({ 
                            title, 
                            description, 
                            priority 
                        }),
                    })
                    const data = await response.json();
                    if (response.status !== 201) {
                        setCreateTaskLoading(false);
                        setTaskCreateError(data.message);
                    } else {
                        const task = {
                            _id: data.task._id,
                            title: data.task.title,
                            description: data.task.description,
                            priority: {
                                _id: data.task.priority._id,
                                priority: data.task.priority.priority,
                                color: data.task.priority.color,
                            },
                            status: data.task.status,
                            createdAt: data.task.createdAt,
                        }
                        addTask(task);
                        
                        setTitle('');
                        setDescription('');
                        setPriority('');
                        setCreateTaskLoading(false);
                    }
                } catch (error) {
                    setCreateTaskLoading(false);
                    setTaskCreateError('An error occurred');
                }
            }
            fetchData();
        }
    }

    return { title, description, priority, taskCreateError, createTaskLoading, handleTitle, handleDescription, handlePriority, handleSubmit };
}