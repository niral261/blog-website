import React from 'react';
import { AppBar, Toolbar, styled, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Component = styled(AppBar)`
    background: #f4d160;
    color: #000;
    border-bottom: 2px solid #000;
`;

const Text = styled(Link)`
    font-style: normal;
    font-weight: bold;
    font-size: 50px;
    font-family: 'Poppins';
    text-decoration: none;
    color: #000;
    margin-left: 100px;
`;
const Container = styled(Toolbar)`
    justify-content: space-between;  
    margin-right: 100px;
`;

const MenuButton = styled(Button)`
    text-decoration: none;
    color: #000;
    border-radius: 20px; 
    margin-right: 20px;
    &.active {
        color: #fff;
        background-color: #000;
    }
`;



export const Header = () => {
    const location = useLocation();

    return (
        <Component>
            <Container>
                <Text to='/'> blog </Text>
                <div>
                    <MenuButton component={Link} to='/' className={location.pathname === '/' ? 'active' : ''}>Home</MenuButton>
                    <MenuButton component={Link} to='/about' className={location.pathname === '/about' ? 'active' : ''}>Our Story</MenuButton>
                    <MenuButton component={Link} to='/contact' className={location.pathname === '/contact' ? 'active' : ''}>Contact</MenuButton>
                    <MenuButton component={Link} to='/login' className={location.pathname === '/login' ? 'active' : ''}>LogIn</MenuButton>
                </div>
            </Container>
        </Component>
    )
}
