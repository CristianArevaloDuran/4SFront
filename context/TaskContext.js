import { createContext, useState, useContext, useEffect } from "react";
import useGetTasks from '@/hooks/useGetTasks';
import useDeleteTask from "@/hooks/useDeleteTask";

const TaskContext = createContext({
    tasks: [],
    addTask: () => {},
    loading: false,
    error: null
});

export function TaskProvider({ children }) {
    const { tasks: serverTasks, loading, error } = useGetTasks();

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(serverTasks);
    }, [serverTasks]);

    const addTask = async (newTask) => {
        setTasks([newTask, ...tasks]);
        try {
        
        } catch (error) {
            console.error("Error al guardar la tarea:", error);
            // Revertir la actualización optimista si falla
            setTasks(prevTasks => prevTasks.filter(task => task._id !== newTask._id));
        }
    }

    const { fetchDeleteTask: deleteTaskServer, loading: deleteTaskLoading, error: deleteTaskError } = useDeleteTask();

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task._id !== id));
        try {
            deleteTaskServer(id);
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
            setTasks(prevTasks => [...prevTasks, tasks.find(task => task._id === id)]);
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, loading, error }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext);
}