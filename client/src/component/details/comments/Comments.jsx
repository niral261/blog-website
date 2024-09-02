import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';
import { useNavigate } from 'react-router-dom';

//components
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    comments: '',
    date: new Date(),
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
                // Handle the error here (e.g., show an error message)
            }
        }
        if(post._id){
            getData();
        }
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        let response = await API.newComment(comment);
        if(response.isSuccess){
            setComment(initialValue);
        }
        setToggle(prevState => !prevState);
    }
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    minRows={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button variant="contained" color="primary" size="medium" style={{ height: 40, backgroundColor: 'lightGreen' }} onClick={(e) => addComment(e)}>Post</Button>             
            </Container>
            <Box>
                {comments && comments.length > 0 && comments.map((comment, index) => (
                    <Comment key={index} comment={comment} setToggle={setToggle} />
                ))}
            </Box>
        </Box>
    )
}

export default Comments;
