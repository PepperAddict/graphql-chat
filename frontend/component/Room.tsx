import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, useSubscription } from '@apollo/client';
import { RootStateOrAny, useSelector } from 'react-redux';
import { POST_MESSAGE, WATCH_MESSAGE, REMOVE_MESSAGE } from '../helpers/graphql.js';
import TheFileUpload from './UploadImage'
import '../styles/room.styl'

//This is for deleting a message if it belongs to the user
function DeleteMessage({id}) {
    const [removeMessage] = useMutation(REMOVE_MESSAGE)
    const initiateRemoval = () => {
        removeMessage({variables: {id}})
    }
    return <span onClick={() => initiateRemoval()}>✖</span>
}

//this is for each of the messages
function Messages({ messages, user }) {
    return (<div className="chat-container">
        { messages.sort((a, b) => b._id - a._id).map(({ _id, name, message, file }, key) => {
            if (file === "true") {
                return <div key={_id} className="img-container chat"> <strong className="img-name">{name}</strong> <img src={message} /> {(user===name) && <DeleteMessage id={_id} />} </div>
            }
            return <p className="chat" key={_id}> <strong>{name}: </strong> {message} {(user===name) && <DeleteMessage id={_id} />}  </p>
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
            <button className={(!fileUpload) && "active"} onClick={() => setFileUpload(false)}>chat</button> <button className={(fileUpload) && "active"} onClick={() => setFileUpload(true)}>upload</button>
        </div>

        {!fileUpload ?
            <form onSubmit={submitForm} onDragOver={dragged} onDragEnter={dragged}>
                <input placeholder="Enter a message" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Send</button>
            </form> : <TheFileUpload name={user} />
        }

        {data && <Messages messages={data.newMessages} user={user}/>}

    </div>
}