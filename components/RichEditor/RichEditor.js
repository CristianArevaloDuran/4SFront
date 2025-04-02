import './styles.css';

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder';
import { Poppins } from 'next/font/google';

import MenuBar from './MenuBar';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
});

export default function RichEditor({content, onChange}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type something...'
      })
    ],
    content: content,
    editorProps: {
      attributes: {
        class: `editor-content ${poppins.className}`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false
  })
  
  return (
    <div className='rich-editor'>
      <MenuBar editor={editor}/>
      <EditorContent editor={editor} />
    </div>
  )
}