import './styles.css';

import { useTasks } from '@/context/TaskContext';
import { useRef, useState, useEffect } from 'react';

import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({weight: ["400"], subsets: ['latin']});

export default function Task({ task }) {

    const { deleteTask, doneTask } = useTasks();
    const [taskId, setTaskId] = useState(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const [confirmationText, setConfirmationText] = useState("");
    const [confirmationBtns, setConfirmationBtns] = useState('');

    const deleteConfirmationRef = useRef(null);
    const contentRef = useRef(null);
    const menuRef = useRef(null);

    const handleDelete = (e) => {
        deleteTask(taskId);
    }

    const handleDoneTask = (e) => {
        doneTask(taskId);
    }

    useEffect(() => {
        const el = contentRef.current;
        if (el.scrollHeight > el.clientHeight) {
          setIsOverflowing(true);
        }
      }, []);   
      
    useEffect(() => {
        if (!menuOpen) return;

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && !deleteConfirmationRef.current.contains(event.target)) {
                menuRef.current?.classList.remove("active");
                setMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuOpen]);

    const handleDeleteConfirmation = (e) => {
        e.stopPropagation();
        setConfirmationText("Are you sure you want to delete this task?");
        setConfirmationBtns(
            <>
            <button className={`${poppins.className}`} id={task._id} onClick={handleDelete}>
                <p>Yes</p>
            </button>
            <button className={`${poppins.className}`} onClick={handleDeleteConfirmation}>
                <p>No</p>
            </button>
            </>
        );
        deleteConfirmationRef.current.classList.toggle('active');
        if (e.target.id) {
            setTaskId(e.target.id);
        }
    }

    const handleDone = (e) => {
        e.stopPropagation();
        setConfirmationText("Are you sure you want to mark this task as done?");
        setConfirmationBtns(
            <>
            <button className={`${poppins.className}`} id={task._id} onClick={handleDoneTask} >
                <p>Yes</p>
            </button>
            <button className={`${poppins.className}`} onClick={handleDeleteConfirmation}>
                <p>No</p>
            </button>
            </>
        );
        deleteConfirmationRef.current.classList.toggle('active');
        if (e.target.id) {
            setTaskId(e.target.id);
        }
    }
    
    const handleMenu = (e) => {
        e.stopPropagation();
        setMenuOpen(true);
        if (menuRef.current) {
            menuRef.current.classList.toggle('active');
        }
    }

    const handleCloseModal = (e) => {
        e.stopPropagation();
      
        if (menuRef.current && menuRef.current.classList.contains('active')) {
            const isClickInsideConfirmation = deleteConfirmationRef.current?.contains(e.target);
            const isClickInsideContent = e.target?.closest('.delete-confirmation-content');
            if (
              deleteConfirmationRef.current &&
              deleteConfirmationRef.current.classList.contains('delete-confirmation') &&
              !isClickInsideContent
            ) {
              deleteConfirmationRef.current.classList.toggle('active');
            }
        }
      
    };
      

    return (
        <>
        <div className='delete-confirmation' onClick={handleCloseModal} ref={deleteConfirmationRef}>
                <div className='delete-confirmation-content'>
                    <p className={`${poppins.className}`}>{confirmationText}</p>
                    <div className='confirmation-btns'>
                        {confirmationBtns}
                    </div>
                </div>
        </div>
        <div className={`${poppins.className} task`} style={{borderColor: task.priority.color}}>
            <div className='task-priority'>
                <div className='priority-color' style={{backgroundColor: task.priority.color}}>
                    <p>{task.priority.priority}</p>
                </div>
            </div>
                <div ref={contentRef} dangerouslySetInnerHTML={{__html: task.content}} className='task-content'>
                </div>
                {
                    isOverflowing && (
                        <button className={`${poppins.className} expand-content`} onClick={() => {
                            setExpanded(!expanded);
                            contentRef.current.classList.toggle('expanded');
                        }}>
                        {expanded ? "Show less" : "Show more..."}
                        </button>
                    )
                }
            <div className='actions'>
                <button id={task._id} onClick={(e) => {
                    handleMenu(e);
                    setTaskId(e.target.id);
                }
                }>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
                </button>
            </div>
            <div className='menu' ref={menuRef}>
                <div className='menu-btns'>
                    <Link href={`/task/${task._id}`} className={`${poppins.className} edit-btn`}>
                        <p className={`${poppins.className}`}>Edit</p>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                    </Link>
                    <button id={task._id} onClick={handleDone}>
                        <p className={`${poppins.className}`}>Done</p>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    </button>
                    <button id={task._id} onClick={handleDeleteConfirmation} className='delete-btn'>
                        <p className={`${poppins.className}`}>Delete</p>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
                    </button>
                    
                </div>
            </div>
        </div>
        </>
    )
}