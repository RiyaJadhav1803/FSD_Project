// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// const FileUpload = () => {
//     const [file, setFile] = useState(null);
//     const [userId, setUserId] = useState('');
//     const { authToken } = useAuth();

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!file || !userId) {
//             alert("Please select a file and enter user ID.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('userid', userId);

//         try {
//             await axios.post('http://localhost:5050/api/v1/upload', formData, {
//                 headers: {
//                     Authorization: `Bearer ${authToken}`,
//                 },
//             });
//             alert('File uploaded successfully');
//         } catch (error) {
//             console.error('File upload failed:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Upload File</h2>
//             <input type="file" onChange={handleFileChange} />
//             <input
//                 type="text"
//                 placeholder="Enter User ID"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//             />
//             <button onClick={handleUpload}>Upload</button>
//         </div>
//     );
// };

// export default FileUpload;
