import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-color: #1D1D1D;
    width: 100%;
    height: 100vh;
`;

const Wrapper = styled(Box)`
    width: 50%;
    color: #fff;
    padding: 20px;
    text-align: justify;
    & > h3 {
        font-size: 100px;
    }
    & > h3, & > h5 {
        font-family: 'Poppins';
    }
    & > h6 {
        margin-top: 20px;
    }
`;

const Text = styled(Typography)`
    color: #fff;
`;

const About = () => {

    return (
        <Box>
            <Banner>
                <Wrapper>
                    <Typography variant="h3">Listen our story.</Typography>
                    <Text variant="h6">
                        We believe that what you read and write matters. Words can divide or empower us, inspire or discourage us. In a world where the most sensational and surface-level stories often win, we’re building a system that rewards depth, nuance, and time well spent. A space for thoughtful conversation more than drive-by takes, and substance over packaging.
                    </Text>
                    <Text variant="h6">I am a techie student. 
                        I've built websites, and desktop applications.<br />
                        If you are interested, you can view some of my favorite projects here
                        <Box component="span" style={{ marginLeft: 5 }}>
                            <Link href="https://github.com/niral261" color="inherit" target="_blank"><GitHub /></Link>
                        </Box>.
                    </Text>
                    <Text variant="h6">
                        Need something built or simply want to have chat? Reach out to me on
                        <Box component="span" style={{ marginLeft: 5 }}>
                            <Instagram />
                        </Box>  
                            or send me an Email    
                            <Link href="mailto:ajmeraniral@gmail.com" target="_blank" color="inherit">
                                <Email />
                            </Link>.
                    </Text>
                </Wrapper>
            </Banner>
        </Box>
    )
}

export default About;