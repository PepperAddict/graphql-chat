import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { RootStateOrAny, useSelector } from 'react-redux';
import { POST_MESSAGE, GET_MESSAGES} from '../helpers/graphql.js'


export default function Room() {

    const user = useSelector((state: RootStateOrAny) => state.user.value);
    const [message, setMessage] = useState('');


    const [sendMessage] = useMutation(POST_MESSAGE);
    const {loading, error, data} = useQuery(GET_MESSAGES);

    const submitForm = (e) => {
        e.preventDefault();

        sendMessage({
            variables: {
                theUser: user, 
                theMessage: message
            }
        })
    }

    if (!user) {
        return <Redirect to="/" />
    }

    return <div>
    <h1>Hello {user}</h1>

    {data && data.getAllMessages.map(({_id, name, message}, key) => {
        return <p key={key} id={_id}> {name}: {message}</p>
    })}
    
    <form onSubmit={submitForm}>
        <p>Enter a Message</p>
        <input placeholder="Enter a message" onChange={(e) => setMessage(e.target.value)}/>
    </form>
    </div>
}