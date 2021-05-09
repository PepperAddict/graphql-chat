import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { POST_MESSAGE } from '../helpers/graphql.js';

const formData = new FormData()


export default function UploadImage({ name }) {
    const [file, setFile] = useState(null)
    const [sendMessage] = useMutation(POST_MESSAGE);

    const uploadFile = (e) => {
        e.preventDefault();
        console.log(file);
        formData.append('myFile', file)

        fetch('http://localhost:8080/upload', {
            method: "POST",
            body: formData
        }).then((res) => res.text()).then((response) => {
            sendMessage({variables: {
                theUser: 'tracy',
                theMessage: response, 
                theFile: 'true'
            }})
        }).catch((err) => console.log(err))
    }
    return (
        <form onSubmit={uploadFile}>
            <input type="file" id="myFile" name="filename" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit">upload</button>
        </form>
    )
}