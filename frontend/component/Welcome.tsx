import React, {useState, useRef} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { setName } from '../redux/states.js';
export default function Welcome () {

    const [name, inputName] = useState(null);
    const dispatch = useDispatch()
    const user = useSelector((state: RootStateOrAny) => state.user.value)


     const enterUsername = async(e) => {
         e.preventDefault();
         await dispatch(setName(name))
     }

    if (user) {
        return <Redirect to="/room/" />
    }

    return (
        <div>
            <h1>Chatroom</h1>
            <form onSubmit={enterUsername}>
                <label>
                   <input placeholder="enter a nickname" onChange={(e) => inputName(e.target.value)} /> 
                </label>
            </form>
        </div>
    )
}