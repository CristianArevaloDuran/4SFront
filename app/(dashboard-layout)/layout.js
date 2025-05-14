'use client';
import './styles.css';
import DashNavbar from '@/components/DashNavbar/DashNavbar';
import { TaskProvider } from '@/context/TaskContext';

export default function layout({ children }) {
  return (
      <html lang="en">
        <body>
          <TaskProvider>
            <DashNavbar/>
            {children}
          </TaskProvider>
        </body>
      </html>
    );
}
