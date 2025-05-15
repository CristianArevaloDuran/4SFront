import { createContext, useState, useContext, useEffect } from "react";
import useGetTasks from '@/hooks/useGetTasks';
import useDeleteTask from "@/hooks/useDeleteTask";
import useDoneTask from "@/hooks/useDoneTask";
import useEditTask from "@/hooks/useEditTask";

const TaskContext = createContext({
    tasks: [],
    addTask: () => {},
    loading: false,
    error: null
});

export function TaskProvider({ children }) {
    const { tasks: serverTasks, loading, error } = useGetTasks();

    const [tasks, setTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    useEffect(() => {
        setTasks(serverTasks);
        setPendingTasks(serverTasks.filter(task => task.status.code !== "DONE"));
        setDoneTasks(serverTasks.filter(task => task.status.code === "DONE"));
    }, [serverTasks]);

    const addTask = async (newTask) => {
        setTasks([newTask, ...tasks]);
        setPendingTasks([newTask, ...pendingTasks]);
        setDoneTasks(doneTasks.filter(task => task._id !== newTask._id));
        try {
        
        } catch (error) {
            console.error("Error al guardar la tarea:", error);
            setTasks(prevTasks => prevTasks.filter(task => task._id !== newTask._id));
            setPendingTasks(prevTasks => prevTasks.filter(task => task._id !== newTask._id));
            setDoneTasks(prevTasks => [...prevTasks, newTask]);
        }
    }

    const { fetchDeleteTask: deleteTaskServer, loading: deleteTaskLoading, error: deleteTaskError } = useDeleteTask();

    const { fetchDoneTask, loading: doneTaskLoading, error: doneTaskError } = useDoneTask();

    const { serverEditTask, loading: editTaskLoading, error: editTaskError } = useEditTask();

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task._id !== id));
        setPendingTasks(pendingTasks.filter(task => task._id !== id));
        setDoneTasks(doneTasks.filter(task => task._id !== id));
        try {
            deleteTaskServer(id);
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
            setTasks(prevTasks => [...prevTasks, tasks.find(task => task._id === id)]);
            setPendingTasks(prevTasks => [...prevTasks, tasks.find(task => task._id === id)]);
            setDoneTasks(prevTasks => [...prevTasks, tasks.find(task => task._id === id)]);
        }
    }

    const doneTask = (id) => {
        if (pendingTasks.find(task => task._id === id)) {
            setPendingTasks(pendingTasks.filter(task => task._id !== id));
            setDoneTasks([...doneTasks, tasks.find(task => task._id === id)]);
        }
        else {
            setDoneTasks(doneTasks.filter(task => task._id !== id));
            setPendingTasks([tasks.find(task => task._id === id), ...pendingTasks]);
            //filtra las tareas pendientes por fecha de creacion
            setPendingTasks(prevTasks =>[...prevTasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        }
        try {
            fetchDoneTask(id);
        } catch (error) {
            console.error("Error al marcar la tarea como completada:", error);
            setPendingTasks(prevTasks => [...prevTasks, tasks.find(task => task._id === id)]);
            setDoneTasks(prevTasks => [...prevTasks, tasks.find(task => task._id === id)]);
        }
    }

    const editTask = (id, content, priority) => {
        const taskToEdit = tasks.find(task => task._id === id);
        if (taskToEdit) {
            setTasks(tasks.map(task => task._id === id ? { ...task, content: taskToEdit.content } : task));
            setPendingTasks(pendingTasks.map(task => task._id === id ? { ...task, content: taskToEdit.content } : task));
            setDoneTasks(doneTasks.map(task => task._id === id ? { ...task, content: taskToEdit.content } : task));
        }
        try {
            serverEditTask(id, content, priority);
        } catch (error) {
            console.error("Error al editar la tarea:", error);
            setTasks(prevTasks => [...prevTasks, tasks.find(task => task._id === id)]);
            setPendingTasks(prevTasks => [...prevTasks, tasks.find(task => task._id === id)]);
            setDoneTasks(prevTasks => [...prevTasks, tasks.find(task => task._id === id)]);
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, pendingTasks, doneTasks, addTask, deleteTask, doneTask, editTask, loading, error, editTaskError }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext);
}