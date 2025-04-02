import './styles.css';

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Poppins } from 'next/font/google';

import MenuBar from './MenuBar';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
});

export default function RichEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        class: `editor-content ${poppins.className}`,
      },
    },
    onChange: (editorState) => {
      console.log(editorState.getJSON())
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