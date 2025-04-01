import { IKContext, IKUpload } from 'imagekitio-react';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';

const authenticator = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};
const upload = ({ setData, children, type }) => {
    const onError = (err) => {
        console.log(err);
        toast.error("Error loading image")
    }
    const onSuccess = (res) => {
        console.log(res);
        setData(res);
        toast.success("photo uploaded successfully")
    }
    const ref = useRef(null)
    return (
        <IKContext
            publicKey={import.meta.env.VITE_IK_PUBLICKEY}
            urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
            authenticator={authenticator} >
            <IKUpload
                // fileName="test-upload.png"
                useUniqueFileName
                className='hidden'
                onError={onError}
                onSuccess={onSuccess}
                ref={ref}
                accept={`${type}/*`}
            />
            <div className="cursor-pointer" onClick={()=>ref.current.click()}>{children}</div>
        </IKContext>
    )
}

export default upload
