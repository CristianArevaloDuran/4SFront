import './styles.css';

export default function PopoutMessage({ message, type }) {
    return (
        <div className={`popout-message ${type}`}>
            <p>{message}</p>
        </div>
    );
}