import './styles.css';

import useCreateTask from '@/hooks/useCreateTask';
import useGetPriorities from '@/hooks/useGetPriorities';
import { useRef } from 'react';

import Spinner from '@/components/Spinner/Spinner';
import RichEditor from '../RichEditor/RichEditor';

import { Poppins } from "next/font/google";

const poppins = Poppins({weight: ["400"], subsets: ["latin"]});

export default function CreateTaskForm() {
        const onChange = (content) => {
            handleContent(content);
    };

    const { priorities, loading, error } = useGetPriorities();
    const { content, priority, taskCreateError, createTaskLoading, handleContent, handlePriority, handleSubmit } = useCreateTask(); 

    const formRef = useRef(null);

    const handleSend = async (e) => {
        e.preventDefault();
        const createdTask = await handleSubmit(e);
        if (createdTask) {
            formRef.current.parentNode.classList.remove("active");
        }
    }

    return (
        <form ref={formRef} className={`${poppins.className} task-add`} onSubmit={(e) => handleSend(e)}>
            <h1>Add Task</h1>
            <div className='task-input'>
                
            </div>
            <div className='task-input'>
                <RichEditor content={content} onChange={onChange}></RichEditor>
            </div>
            <div className='task-input'>
                <select name='priority' className={`${poppins.className}`} onChange={handlePriority} value={priority}>
                    <option value=''>Select Priority</option>
                    {
                        loading ? <option>Loading...</option> :
                        error ? <option>{error}</option> :
                        priorities.map((priority) => (
                            <option key={priority._id} value={priority._id} style={{color: priority.color}}>{priority.priority}</option>
                        ))
                    }
                </select>
            </div>
            <p className={`${poppins.className} error`}>
                {
                    taskCreateError ? taskCreateError : ''
                }
            </p>
            <div className='task-input'>
                {
                    createTaskLoading ? <Spinner /> : <button type='submit' className={`${poppins.className}`}>Add Task</button> 
                }
            </div>
        </form>
    )
}