import { addElipsis } from '../../../utils/common-utils';
import { styled, Box, Typography } from '@mui/material';

const Container = styled(Box)`
    width: 300px;
    border: 2px solid #878787;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 320px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150,
});

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Details = styled(Typography)`
    font-size: 14px;
    color: #fff;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

const Post = ({ post }) => {
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    
    return (
        <Container>
            <Image src={url} alt="post" />
            <hr/>
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addElipsis(post.description, 100)}</Details>
        </Container>
    )
}

export default Post;
