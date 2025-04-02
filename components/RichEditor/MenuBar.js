import './menu-styles.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin']
});

export default function MenuBar({editor}) {
    if (!editor) {
        return null
    }

    const Options = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-280v-400h80v160h160v-160h80v400h-80v-160H280v160h-80Zm480 0v-320h-80v-80h160v400h-80Z"/></svg>,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive('heading', { level: 1 }),
            title: 'Heading 1'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-160q0-33 23.5-56.5T600-520h160v-80H520v-80h240q33 0 56.5 23.5T840-600v80q0 33-23.5 56.5T760-440H600v80h240v80H520Z"/></svg>,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            pressed: editor.isActive('heading', { level: 2 }),
            title: 'Heading 2'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-80h240v-80H600v-80h160v-80H520v-80h240q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H520Z"/></svg>,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editor.isActive('heading', { level: 3 }),
            title: 'Heading 3'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z"/></svg>,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive('bold'),
            title: 'Bold'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z"/></svg>,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive('italic'),
            title: 'Italic'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M80-400v-80h800v80H80Zm340-160v-120H200v-120h560v120H540v120H420Zm0 400v-160h120v160H420Z"/></svg>,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive('strike'),
            title: 'Strike'
        },
        {
            icon: <p className={`${poppins.className}`}>Limpiar</p>,
            onClick: () => editor.chain().clearContent().run(),
            pressed: editor.isActive('clearContent'),
            title: 'Clear Formatting'
        }
    ]

    return (
        <div className="menu-bar">
            {
                Options.map((option, index) => (
                    <button
                        key={index}
                        onClick={e => {
                            e.preventDefault()
                            option.onClick()
                        }}
                        className={`menu-button ${option.pressed ? 'is-active' : ''}`}
                        title={option.title}
                        onMouseDown={event => event.preventDefault()}
                    >
                        {option.icon}
                    </button>
                ))
            }
        </div>
    )
}