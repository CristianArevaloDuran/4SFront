'use client';
import './styles.css';

import useVerifyUser from "@/hooks/useVerifyUser";
import { useEffect } from 'react';
import { TaskProvider } from '@/context/TaskContext';

//Components

import Tasks from '@/components/Tasks/Tasks';
import CreateTaskForm from '@/components/CreateTaskFrom/CreateTaskForm';

export default function Protected() {

    useEffect(() => {
        document.title = 'Dashboard | Task Manager';
    }, []);

    useVerifyUser();

    return (
        <TaskProvider>
            <div className='dash-container'>
                <div className='task-add'>
                    <CreateTaskForm />
                </div>
                <div className='task-list'>
                    <Tasks />
                </div>
            </div>
        </TaskProvider>
    );
}