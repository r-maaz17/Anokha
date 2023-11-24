import React from 'react';
import axios from 'axios';

const UploadImages = () => {
    const onSelectFile = async (event) => {
        const file = event.target.files[0];
        const convertedFile = await convertToBase64(file);
        console.log(convertedFile)
        const response = await axios.post(
            'http://localhost:8000/api/v1/upload',
            {
              image: convertedFile,
              imageName: file.name,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
    }
    const convertToBase64 = (file) => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            }
        })
    }
    return (
        <input type="file" accept="image/*" onChange={onSelectFile}/>
    )
}
export default UploadImages;