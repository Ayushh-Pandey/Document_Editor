import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import "./Style.css";
import { io } from "socket.io-client"
import { useParams } from 'react-router-dom';
import { DocContext } from './context/DocProvider';
// require('dotenv').config({path:'./frontend.env'});
// const TOOL
const SAVE_INTERVAL_MS = 2000;

const TOOLBAR_OPTIONS = [
    ['undo','redo'],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["image", "blockquote", "code-block", "link"],
    ["clean"],
]

const TextEditor = () => {

    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const { id: documentId } = useParams();

    const { file,setPdf } = useContext(DocContext);

    function undoChange(){
        this.quill.history.undo();
    }
    function redoChange (){
        this.quill.history.redo();
    }

    useEffect(() => {
        const st = io(process.env.REACT_APP_API_URL);
        setSocket(st);
        return () => {
            st.disconnect()
        }
    }, [])

    useEffect(() => {
        if (socket == null || quill == null)
            return

        socket.once('load-document', document => {
            quill.setContents(document)
            quill.enable()
        })
        socket.emit('get-document', documentId)
    }, [socket, quill, documentId])

    useEffect(() => {
        if (socket == null || quill == null)
            return;

        const Interval = setInterval(() => {
            socket.emit('save-document', quill.getContents())
            setPdf(quill.getContents().ops[0].insert);
        }, SAVE_INTERVAL_MS)

        return () => {
            clearInterval(Interval)
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null)
            return;
        const handler = (delta, oldDelta, source) => {
            if (source !== 'user')
                return;
            socket.emit("send-changes", delta);
        }
        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null)
            return;
        const handler = (delta) => {
            quill.updateContents(delta)
        }
        socket.on('receive-changes', handler)

        return () => {
            socket.off('receive-change', handler)
        }
    }, [socket, quill])

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null)
            return;
        wrapper.innerHTML = "";
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, {

            modules: {
                history: {
                    delay: 0,
                    maxStack: 100,
                    userOnly: true
                },
                toolbar: {
                    container: TOOLBAR_OPTIONS,
                    handlers: {
                        "undo": undoChange,
                        "redo": redoChange
                    }
                },

            },
            theme: "snow",
            placeholder: "Start typing your document...",

        });
        
        const undoButton = document.querySelector('.ql-undo');
        undoButton.append('⟲')
        const redoButton = document.querySelector('.ql-redo');
        redoButton.append('⟳')
        q.disable();
        q.setText('Loading...');
        setQuill(q);
    }, [file])

    return (
        <div className='container' ref={wrapperRef}> </div>
    )
}

export default TextEditor;