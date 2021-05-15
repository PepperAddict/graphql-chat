import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { POST_MESSAGE } from '../helpers/graphql.js';

var formData = new FormData()


export default function UploadImage({ name }) {
    const [file, setFile] = useState(null)
    const [sendMessage] = useMutation(POST_MESSAGE);
    const imageInput = useRef();



    const uploadFile = (e) => {
        e.preventDefault();

        
        const acceptedImages = ["image/jpeg", "image/png", "image/gif"]
        if ( file && acceptedImages.includes(file.type)) {
            formData.append('myFile', file)
        
            fetch('http://localhost:8080/upload', {
                method: "POST",
                body: formData
            }).then((res) => res.text()).then((response) => {
                sendMessage({
                    variables: {
                        theUser: name,
                        theMessage: response,
                        theFile: 'true'
                    }
                })
                //reset everything
                setFile(null);
                if (imageInput) (imageInput as any).current.value = ""
                formData = new FormData();
            }).catch((err) => console.log(err))
        } else {
            console.log('not allowed')
        }


    }
    return (
        <form onSubmit={uploadFile}>
            <input type="file" id="myFile" name="filename" ref={imageInput} onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit">upload</button>
        </form>
    )
}