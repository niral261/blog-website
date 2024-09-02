
import { useEffect, useState } from 'react';

import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

// import { getAllPosts } from '../../../service/api';
import { API } from '../../../service/api';

//components
import Post from './Post';

const Posts = () => {
    const [posts, getPosts] = useState([]);
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => { 
            let response = await API.getAllPosts({ category : category || '' });
            if (response.isSuccess) {
                getPosts(response.data);
            }
        }
        fetchData();
    }, [category]);

    return (
        <>
            <Grid container spacing={2} style={{ margin: '0px 0px 10px 20px' }}> 
                {posts?.length ? posts.map(post => (
                    <Grid item key={post._id} > {/* Add key prop */}
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{ color: '#fff', margin: '30px 80px', fontSize: 18 }}>
                    No data is available for the selected category
                </Box>}
            </Grid>
        </>
    )
}

export default Posts;
