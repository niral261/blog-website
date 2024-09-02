import { styled, Box, Typography, Button } from '@mui/material';
import { useRef } from 'react';

const Image = styled(Box)`
    width: 100%;
    background-color: #f4d160; 
    height: 65vh;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    
`;

const Heading = styled(Typography)`
    width: 75%;
    font-size: 150px;
    color: #000;
    line-height: 1;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-family: 'Poppins'; 
    margin-left: 150px;
    justify-content: center;
`;

const SubHeading = styled(Typography)`
    font-size: 40px; 
    margin-top: 20px;
    margin-left: 150px;
`;

const RightDesign = styled(Box)`
    position: absolute;
    right: 0;
    height: 50vh;
    width: 400px;
    background-image: url("https://i.postimg.cc/gj0Wj3qp/writer-Pen.png"); 
    background-size: cover;
    background-position: right;
`;

const StyledButton = styled(Button)`
    align-self: flex-start; 
    margin-left: 150px; 
    background-color: #000;
    border-radius: 20px; 
    margin-top: 20px;
    text-transform: none;
    padding: 5px 25px 5px 25px;
    &:hover {
        background-color: #000;
    }
`;

const Banner = () => {
    const scrollRef = useRef(null);

    const handleScroll = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Image>
            <Heading>Stay curious.</Heading>
            <SubHeading>Create your space with us</SubHeading>
            <RightDesign/>
            <StyledButton variant="contained" onClick={handleScroll}>Get Started</StyledButton>
            <div ref={scrollRef}></div>
        </Image>
    )
}

export default Banner;
