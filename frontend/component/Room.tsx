import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, useSubscription } from '@apollo/client';
import { RootStateOrAny, useSelector } from 'react-redux';
import { POST_MESSAGE, WATCH_MESSAGE } from '../helpers/graphql.js';
import TheFileUpload from './UploadImage'
import '../styles/room.styl'

function Messages({ messages }) {

    return (<div className="chat-container">
        { messages.sort((a, b) => b._id - a._id).map(({ _id, name, message, file }, key) => {
            if (file === "true") {
                return <div key={_id} className="img-container"> <strong>{name}</strong> <img src={message} /></div>
            }
            return <p key={_id}> <strong>{name}: </strong> {message}</p>
        })}
    </div>
    )
}


export default function Room() {

    const user = useSelector((state: RootStateOrAny) => state.user.value);
    const [message, setMessage] = useState('');
    const [fileUpload, setFileUpload] = useState(false)


    const [sendMessage] = useMutation(POST_MESSAGE);
    const { loading, error, data } = useSubscription(WATCH_MESSAGE);

    const submitForm = (e) => {
        e.preventDefault();
        if (message.length > 1) {
            sendMessage({
                variables: {
                    theUser: user,
                    theMessage: message
                }
            })
        }



        setMessage('')
    }
    const dragged = (e) => {
        setFileUpload(true)
    }

    if (!user) {
        return <Redirect to="/" />
    }

    return <div className="main-container">
        <h1>Hello {user}</h1>
        <div className="navigation-container">
            <button onClick={() => setFileUpload(false)}>chat</button> <button onClick={() => setFileUpload(true)}>upload</button>
        </div>

        {!fileUpload ?
            <form onSubmit={submitForm} onDragOver={dragged} onDragEnter={dragged}>
                <input placeholder="Enter a message" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Send</button>
            </form> : <TheFileUpload name={user} />
        }


        {data && <Messages messages={data.newMessages} />}

    </div>
}