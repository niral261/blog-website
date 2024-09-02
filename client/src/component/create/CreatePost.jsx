import { useState, useEffect, useContext } from 'react';
import { Box, styled, FormControl, InputBase, Button } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api.js';
import HREditor from '../../text-editor/editor.js';
import '../../text-editor/editor.css';

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Container = styled(Box)`
    margin: 50px 100px;
`;

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
};

const CreatePost = () => {
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
    
                try {
                    const response = await API.uploadFile(data);
                    setPost(prevPost => ({
                        ...prevPost,
                        picture: response.data
                    }));
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
            }
        };
        getImage();
        setPost(prevPost => ({
            ...prevPost,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        }));
    }, [file, location.search, account.username]);

    const savePost = async () => {
        const response = await API.createPost(post);
        if(response.isSuccess){
            navigate('/');
        }
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        let editor;

        const loadEditor = () => {
            const container = document.getElementById('editor-container');
            
            editor = HREditor.init(container);
            editor.onChange((html) => {
                setPost(prevPost => ({
                    ...prevPost,
                    description: html
                }));
            });
        };

        loadEditor();

        return () => {
            if (editor && typeof editor.destroy === 'function') {
                editor.destroy();
            }
        };
    }, []);

    return (
        <Container>
            <Image src={url} alt="post" />
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                <InputTextField placeholder='Title' onChange={(e) => handleChange(e)} name="title" />
                <Button onClick={() => savePost()} variant="contained" style={{ backgroundColor: "#000", color: "#ffb21e" }}>Publish</Button>
            </StyledFormControl>

            <div id="editor-container" style={{ marginTop: '50px', padding: '10px' ,minHeight: '200px', border: '1px solid #ccc' }} />
        </Container>
    );
}

export default CreatePost;
