import { useState } from "react";
import { useTasks } from "@/context/TaskContext";

export default function useCreateTask() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [content, setContent] = useState('');
    const [priority, setPriority] = useState('');
    const [createTaskLoading, setCreateTaskLoading] = useState(false);
    const [taskCreateError, setTaskCreateError] = useState('');

    const { addTask } = useTasks();

    const handleContent = (e) => {
        setContent(e);
    }

    const handlePriority = (e) => {
        setPriority(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setCreateTaskLoading(true);
        if (!content || !priority) {
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
                            content, 
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
                            content: data.task.content,
                            priority: {
                                _id: data.task.priority._id,
                                priority: data.task.priority.priority,
                                color: data.task.priority.color,
                            },
                            status: data.task.status,
                            createdAt: data.task.createdAt,
                        }
                        addTask(task);
                        
                        setContent('');
                        setPriority('');
                        setCreateTaskLoading(false);
                        return true;
                    }
                } catch (error) {
                    setCreateTaskLoading(false);
                    setTaskCreateError('An error occurred');
                }
            }
            fetchData();
        }
    }

    return { content, priority, taskCreateError, createTaskLoading, handleContent, handlePriority, handleSubmit };
}