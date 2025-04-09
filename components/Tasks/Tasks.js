import './styles.css';
import { useTasks } from '@/context/TaskContext';
import Task from '@/components/Task/Task';
import Spinner from '../Spinner/Spinner';
import { useRef } from 'react';

import { Poppins } from 'next/font/google';

const poppins = Poppins({weight: ["400", "700"], subsets: ["latin"]});

export default function Tasks() {
    const {tasks, pendingTasks, doneTasks, loading, error} = useTasks();

    const pendingTasksContainer = useRef(null);
    const doneTasksContainer = useRef(null);

    const pendingHeader = useRef(null);
    const doneHeader = useRef(null);
    
    const handleToggle = (e) => {
        e.stopPropagation();
        if(e.target.nextElementSibling.classList.contains('pending-tasks-container')) {
            pendingTasksContainer.current.classList.toggle('collapsed');
            pendingHeader.current.classList.toggle('rounded');
        }
        if(e.target.nextElementSibling.classList.contains('done-tasks-container')) {
            doneTasksContainer.current.classList.toggle('collapsed');
            doneHeader.current.classList.toggle('rounded');
        }
    }

    return (
        <div className='tasks'>
            {
                loading ? <Spinner /> :
                error ? <p className='error-message'>Error loading tasks</p> :
                tasks.length === 0 && <p className='no-tasks-message'>No tasks available</p>
            }
            {
                pendingTasks.length > 0 && (
                    <div className='pending-tasks'>
                        <div className='pending-tasks-header' onClick={handleToggle} ref={pendingHeader}>
                            <h2 className={`tasks-title ${poppins.className}`}>Pending Tasks</h2>
                            <div className='pending-tasks-count'>
                                <p className={`pending-tasks-count-text ${poppins.className}`}>{pendingTasks.length} Tasks</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                        </div>
                        <div className='pending-tasks-container' ref={pendingTasksContainer}>
                        {
                            pendingTasks.map((task) => (
                                <Task key={task._id} task={task} />
                            ))
                        }
                        </div>
                    </div>
                )
            }
            {
                doneTasks.length > 0 && (
                    <div className='done-tasks'>
                        <div className='done-tasks-header' onClick={handleToggle} ref={doneHeader}>
                            <h2 className={`tasks-title ${poppins.className}`}>Done Tasks</h2>
                            <div className='done-tasks-count'>
                                <p className={`done-tasks-count-text ${poppins.className}`}>{doneTasks.length} Tasks</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                        </div>
                        <div className='done-tasks-container' ref={doneTasksContainer}>
                        {
                            doneTasks.map((task) => (
                                <Task key={task._id} task={task} />
                            ))
                        }
                        </div>
                    </div>
                )
            }
        </div>
    )
}