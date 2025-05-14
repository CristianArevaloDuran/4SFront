'use client';
import useGetTask from "@/hooks/useGetTask";
import { useEffect, useState } from "react";
import RichEditor from "@/components/RichEditor/RichEditor";
import React from "react";
import { useTasks } from "@/context/TaskContext";
import useGetPriorities from "@/hooks/useGetPriorities";

import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export default function TaskPage({ params }) {

    const { editTask } = useTasks();
    const { id } = React.use(params)
    const { task, loading, error, getTask } = useGetTask();
    const { priorities, loading: prioritiesLoading, error: prioritiesError } = useGetPriorities();

    const [content, setContent] = useState('');
    const [priority, setPriority] = useState('');

    const onChange = (content) => {
        setContent(content);
        console.log(content);
    };

    const handlePriority = (e) => {
        setPriority(e.target.value);
        console.log(priority);
        
    }

    const handleEdit = (e) => {
        editTask(id, content, priority);
    }

    useEffect(() => {
        document.title = 'Edit Task';
    }, []);

    useEffect(() => {
        getTask(id);
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="task-page">
            <h1>Edit Task</h1>
            <button onClick={handleEdit}>
                Done
            </button>
            <div className='task-input'>
                <select name='priority' className={`${poppins.className}`} onChange={handlePriority} value={priority}>
                    <option value=''>Select Priority</option>
                    {
                        prioritiesLoading ? <option>Loading...</option> :
                        prioritiesError ? <option>{error}</option> :
                        priorities.map((priority) => (
                            <option key={priority._id} value={priority._id} style={{color: priority.color}}>{priority.priority}</option>
                        ))
                    }
                </select>
            </div>
            <RichEditor content={task.content} onChange={onChange} />
        </div>
    );
}