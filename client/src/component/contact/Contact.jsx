import { Box, styled, Typography, Link } from '@mui/material';
import { Instagram, Email } from '@mui/icons-material';

// Styled components
const Banner = styled(Box)`
    width: 100%;
    height: 100vh;
`;

const BannerImage = styled('img')`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Wrapper = styled(Box)`
    text-align: center;
    padding-top: 20px;
    padding-bottom: 5px;
    background-color: #1D1D1D;
    & > h3, & > h5 {
        margin-bottom: 20px;
        color: #fff;
        font-family: 'Poppins';
    }
`;

const Contact = () => {
    return (
        <Box>
            <Banner>
                <BannerImage src="https://i.postimg.cc/rm84yGgg/contact-Us.jpg" alt="Contact Us Image" />
            </Banner>
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Typography variant="h5">
                    Reach out to me on 
                    <Instagram/>
                     or send me an Email
                    <Link href="mailto:ajmeraniral@gmail.com" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Typography>
            </Wrapper>
        </Box>
    );
}

export default Contact;
