import './styles.css';
import { useTasks } from '@/context/TaskContext';
import Task from '@/components/Task/Task';
import Spinner from '../Spinner/Spinner';

import { Poppins } from 'next/font/google';

const poppins = Poppins({weight: ["400", "700"], subsets: ["latin"]});

export default function Tasks() {
    const {tasks, loading, error} = useTasks();
    return (
        <div className='tasks'>
            {
                loading ? <Spinner /> :
                error ? <p>{error}</p> :
                !tasks ? <p className={`${poppins.className} no-tasks`}>There are no tasks</p> : 
                tasks.length > 0 ? tasks.map((task) => (
                    <Task key={task._id} task={task} />
                )) : <p className={`${poppins.className} no-tasks`}>There are no tasks</p>
            }
        </div>
    )
}