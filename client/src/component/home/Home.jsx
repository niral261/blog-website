import { Grid, Box, styled } from "@mui/material";
import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from "./post/Posts";

const Background = styled(Box)`
    background-color: #1D1D1D;
`;

const PostsContainer = styled(Box)`
    border-right: 1px solid white;
    padding-right: 20px; 
`;

const Home = () => {
    return (
        <>
            <Banner />
            <Background >
                <Grid container>
                    <Grid item xs={12} sm={10} lg={10}>
                        <PostsContainer>
                            <Posts />
                        </PostsContainer>
                    </Grid>
                    <Grid item lg={2} sm={2} xs={12}>
                        <Categories />
                    </Grid>
                </Grid>
            </Background>
        </>
    )
}

export default Home;
