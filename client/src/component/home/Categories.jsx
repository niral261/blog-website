import React, { useState } from 'react';
import { Button, styled, Box, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../../constants/data.js';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 20vw;
    max-width: 300px;
    overflow-x: hidden; 
`;

const StyledLink = styled(Link)`
    width: 100px;
    display: flex;
    align-items: center;
    text-decoration: none;
    margin: 10px; 
    background: #fff;
    color: #878787;
    border-radius: 20px;
    padding-top: 5px;
    padding-left: 10px;
    padding-bottom: 5px;
    font-size: 14px;
    &:hover {
        color: #000;
    }
`;

const IconWrapper = styled(Box)`
    margin-right: 10px;
`;

const VerticalLine = styled(Box)`
    border-left: 1px solid rgba(224, 224, 224, 1);
    height: 100%;
    margin: 0 20px;
`;

const ButtonContainer = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-right: -10px; 
`;

const StyledButton = styled(Button)`
    margin-top: 5px;
    
    && {
        background-color: #878787;
        color: white;
        margin: 10px;
        border-radius: 20px;
        font-family: 'Poppins', sans-serif;
    }
`;

const SeeMoreLink = styled(Link)`
    text-decoration: none;
    color: #878787;
    margin-top: 10px;
    margin-left: 20px;
    margin-bottom: 10px;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <Container>
            <StyledLink to={`/create?category=${category || ''}`}>
                <IconWrapper><DrawOutlinedIcon/></IconWrapper>
                Write
            </StyledLink>
            <VerticalLine />
            <Typography style={{ fontWeight: 'bold', color: '#fff', marginTop: '20px', marginBottom: '5px', marginLeft: '20px' }}>Recommended Topics</Typography>
            <ButtonContainer>
                {categories.slice(0, showMore ? categories.length : 5).map(category => (
                    <StyledButton key={category.id} component={Link} to={`/?category=${category.type}`} variant="contained">
                        {category.type}
                    </StyledButton>
                ))}
            </ButtonContainer>
            {categories.length > 5 && (
                <SeeMoreLink onClick={toggleShowMore}>
                    {showMore ? 'See Less' : 'See More'}
                </SeeMoreLink>
            )}
        </Container>
    )
}

export default Categories;
