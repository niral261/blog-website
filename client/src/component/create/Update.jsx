import { useState, useEffect, useContext } from 'react';
import { Box, styled, FormControl, InputBase, Button } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRadius: '10px',
}));

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
}

const Update = () => {
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const { account } = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const url = post.picture || 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            let res = await API.getPostById(id);
            if (res.isSuccess) {
                setPost(res.data);
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                try {
                    const response = await API.uploadFile(data);
                    setPost(prevPost => ({ ...prevPost, picture: response.data }));
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
            }
        }
        getImage();
    }, [file]);

    useEffect(() => {
        setPost(prevPost => ({
            ...prevPost,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        }));
    }, [account.username, location.search]);

    const updateBlogPost = async () => {
        let response = await API.updatePost(post);
        if (response.isSuccess) {
            navigate(`/details/${id}`);
        }
    }

    const handleChange = (e) => {
        setPost(prevPost => ({ ...prevPost, [e.target.name]: e.target.value }));
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
    },[]);

    return (
        <Container>
            <Image src={url} alt="post" />
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                <InputTextField placeholder='Title' value={post.title} onChange={handleChange} name="title" />
                <Button variant="contained" onClick={updateBlogPost} style={{ color: "#000", backgroundColor: "#f4d160" }}>Update</Button>
            </StyledFormControl>

            <div id="editor-container" style={{ marginTop: '50px', padding: '10px', minHeight: '200px', border: '1px solid #ccc' }} />
        </Container>
    )
}

export default Update;
