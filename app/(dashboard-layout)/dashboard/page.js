'use client';
import './styles.css';

import useVerifyUser from "@/hooks/useVerifyUser";
import { useEffect, useState, useRef } from 'react';
import { TaskProvider } from '@/context/TaskContext';

import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

//Components

import CreateTaskForm from '@/components/CreateTaskFrom/CreateTaskForm';

export default function Protected() {
    const [editorState, setEditorState] = useState(null);
    const onChange = (editorState) => {
        setEditorState(editorState);
    };

    useEffect(() => {
        document.title = 'Dashboard | Task Manager';
    }, []);

    useVerifyUser();

    const editorContainer = useRef(null);

    const showEditor = () => {
        editorContainer.current.classList.remove('display');
        setTimeout(() => {
            editorContainer.current.classList.toggle('hidden');
            if (editorContainer.current.classList.contains('hidden')) {
                setTimeout(() => {
                    editorContainer.current.classList.add('display')
                }, 250);
            }
        }, 1);
    };

    return (
        <TaskProvider>
            <button className='create-task-btn' onClick={showEditor}>
                <p className={`create-task-btn-text ${poppins.className}`}>Create Task</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q32 0 62-6t58-17l60 61q-41 20-86 31t-94 11Zm280-80v-120H640v-80h120v-120h80v120h120v80H840v120h-80ZM424-296 254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>
            </button>
            <div className='editor-container hidden display' ref={editorContainer}>
                <CreateTaskForm editorState={editorState} onChange={onChange} />
            </div>
        </TaskProvider>
    );
}