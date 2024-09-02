import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Typography } from '@mui/material';

const footerStyle = {
    borderTop:  '1px solid #fff',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

const sectionStyle = {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
};

const typoStyle = {
    fontSize: '20px',
    marginRight: '40px',
    fontFamily: 'Poppins',  
};

const socialIconsStyle = {
    display: 'flex', 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
};

const iconLinkStyle = {
    color: '#fff',
    fontSize: '24px',
    margin: '0 20px',
    textDecoration: 'none',
};

export const Footer = () => {
  return (
    <footer style={footerStyle}>
        <div style={containerStyle}>
            <div style={sectionStyle}>
                <a href="/" style={{ textDecoration: 'none', color: '#fff' }}>
                    <Typography style={typoStyle}>Terms</Typography>
                </a>
                <a href="/" style={{ textDecoration: 'none', color: '#fff' }}>
                    <Typography style={typoStyle}>Service</Typography>
                </a>
                <a href="/contact" style={{ textDecoration: 'none', color: '#fff' }}>
                    <Typography style={typoStyle}>Follow Us</Typography>
                </a>
            </div>
            <div style={socialIconsStyle}>
                <a href="https://linkedin.com" style={iconLinkStyle}><FaLinkedin /></a>
                <a href="https://github.com" style={iconLinkStyle}><FaGithub /></a>
                <a href="https://instagram.com" style={iconLinkStyle}><FaInstagram /></a>
                <a href="https://twitter.com" style={iconLinkStyle}><FaTwitter /></a>
            </div>
        </div>
    </footer>
  );
};
