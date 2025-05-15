'use client';
import './styles.css';
import useGetTask from "@/hooks/useGetTask";
import { useEffect, useState } from "react";
import RichEditor from "@/components/RichEditor/RichEditor";
import React from "react";
import { useTasks } from "@/context/TaskContext";
import useGetPriorities from "@/hooks/useGetPriorities";

import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export default function TaskPage({ params }) {

    const { editTask, editTaskError } = useTasks();
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
        console.log(editTaskError);
        
    }

    useEffect(() => {
        document.title = 'Edit Task';
    }, []);

    useEffect(() => {
        getTask(id);
    }, [id]);

    useEffect(() => {
        if (task) {
            setContent(task.content);
            setPriority(task.priority);
        }
    }, [task]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="task-page">
            <h1 className={`${poppins.className} title`}>Edit Task</h1>
            <RichEditor content={task.content} onChange={onChange} className='editor' />
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
            <p className={`${poppins.className} error`}>
                {editTaskError}
            </p>
            <div className='actions'>
                <button onClick={handleEdit} className={`${poppins.className}`}>
                    Done
                </button>
                <Link href='/dashboard' className={`${poppins.className}`}>
                    <p>Back</p>
                </Link>
            </div>
        </div>
    );
}