import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { RootStateOrAny, useSelector } from 'react-redux';
import { POST_MESSAGE, GET_MESSAGES, WATCH_MESSAGE} from '../helpers/graphql.js';

function Messages ({messages}) {
return (<div>
    { messages.map(({_id, name, message}, key) => {
        return <p key={key} id={_id}> {name}: {message}</p>
    })}
    </div>
)
}


export default function Room() {

    const user = useSelector((state: RootStateOrAny) => state.user.value);
    const [message, setMessage] = useState('');


    const [sendMessage] = useMutation(POST_MESSAGE);
    const {loading, error, data} = useSubscription(WATCH_MESSAGE);

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
    {data && <Messages messages={data.newMessages}/>}
    
    
    <form onSubmit={submitForm}>
        <p>Enter a Message</p>
        <input placeholder="Enter a message" value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button type="submit">Send</button>
    </form>
    </div>
}