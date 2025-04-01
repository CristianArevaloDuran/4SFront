import './styles.css';
import DashNavbar from '@/components/DashNavbar/DashNavbar';

export default function layout({ children }) {
  return (
      <html lang="en">
        <body>
          <DashNavbar />
          {children}
        </body>
      </html>
    );
}
