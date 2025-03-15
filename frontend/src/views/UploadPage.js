// /frontend/src/views/UploadPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [userId, setUserId] = useState('');
    const { authToken } = useAuth();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file || !userId) {
            alert("Please select a file and enter user ID.");
            return;
        }
        console.log("Auth Token before upload:", authToken);  // Debugging
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userid', userId);

        try {
            await axios.post('http://localhost:5050/api/v1/upload', formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            alert('File uploaded successfully');
        } catch (error) {
            console.error('File upload failed:', error);
            alert('Failed to upload file');
        }
    };

    return (
        <div style={{ marginTop: '100px' }}>
            <h2>Upload Document</h2>
            <input type="file" onChange={handleFileChange} />
            <input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadPage;
