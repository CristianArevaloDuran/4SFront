import './styles.css';

import { useTasks } from '@/context/TaskContext';

import { Poppins } from 'next/font/google';

const poppins = Poppins({weight: ["400"], subsets: ['latin']});

export default function Task({ task }) {

    const { deleteTask } = useTasks();

    const handleDelete = (e) => {
        deleteTask(e.target.id);
    }

    return (
        <div className={`${poppins.className} task`}>
            <div dangerouslySetInnerHTML={{__html: task.content}} className='task-content'>
            </div>
            <div className='actions'>
                <button id={task._id} onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
            </div>
        </div>
    )
}