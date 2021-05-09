import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, useSubscription } from '@apollo/client';
import { RootStateOrAny, useSelector } from 'react-redux';
import { POST_MESSAGE, WATCH_MESSAGE } from '../helpers/graphql.js';

function Messages({ messages }) {

    return (<div>
        { messages.sort((a, b) => b._id - a._id).map(({ _id, name, message, file }, key) => {
            if (file === "true") {
                return <div key={_id}> <p>{name}</p> <img src={message} /></div>
            }
            return <p key={_id}> <strong>{name}: </strong> {message}</p>
        })}
    </div>
    )
}


export default function Room() {

    const user = useSelector((state: RootStateOrAny) => state.user.value);
    const [message, setMessage] = useState('');


    const [sendMessage] = useMutation(POST_MESSAGE);
    const { loading, error, data } = useSubscription(WATCH_MESSAGE);

    const submitForm = (e) => {
        e.preventDefault();

        sendMessage({
            variables: {
                theUser: user,
                theMessage: message
            }
        })

        setMessage('')
    }

    if (!user) {
        return <Redirect to="/" />
    }

    return <div>
        <h1>Hello {user}</h1>
        {data && <Messages messages={data.newMessages} />}

        <form onSubmit={submitForm}>
            <input placeholder="Enter a message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="submit">Send</button>
        </form>
    </div>
}