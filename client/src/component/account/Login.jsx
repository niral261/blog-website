import React, { useState, useContext } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { API } from '../../service/api.js';
import { DataContext } from '../../context/DataProvider.jsx';
import  { useNavigate } from 'react-router-dom';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

const Component = styled(Box)`
    width: 1000px;
    height: 600px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
    display: flex;
    background-color: #fff;
    // border: 380px solid #FFF455;
`;

const BlackBox = styled(Box)`
    background-color: #1D1D1D;
    background-image: url("https://i.postimg.cc/yNYLFj7c/login.jpg");
    background-size: cover;
    background-position: center;
    width: 50%;
`;

const Image = styled('img')({
    width: 200,
    margin: 'auto',
    position: 'absolute',
    top: '20%',
    transform: 'translate(80%,-50%)',
    left: 'calc(50%)',
    padding: '40px 0 0',
});

const Wrapper = styled(Box)`
    width: 50%;
    padding: 25px 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > div {
        margin-top: 10px;
        position: relative;
    }
    position: absolute;
    top: 60%;
    transform: translate(-5%,-50%);
    left: calc(50%); 
    
`;

const IconWrapper = styled(Box)`
    position: absolute;
    top: 50%;
    transform: translate(-550%,0%);
    left: calc(50%); 
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #fb641b;
    width: 250px;
    height: 45px;
    border-radius: 2px;
    margin-top: 20px;
    &:hover {
        background-color: #fcb728;
        color: #404040; 
    }
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #fb641b;
    width: 250px;
    height: 45px;
    margin-top: 20px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
    &:hover {
        background-color: #fcb728;
        color: #404040;  
    }
`;

const LearnMoreButton = styled(Button)`
    margin-top: -450px;
    margin-left: 55px;
    background-color: #fb641b90;
    &: hover{
        background-color: #fcb728;
        color: #404040;
    }
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff661;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;
    text-align: center;
    margin-top: 17px;
`;

const LoginText = styled(Typography)`
    color: #fff;
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 52px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%; 
    margin-left: 55px;
    margin-right: 15px;
    font-family: 'Poppins';
`;



const loginInitialValues = {
    username:'',
    password:'',
};

const signupInitialValues = {
    name:'',
    username:'',
    password:'',
};

const Login = ({isUserAuthenticated}) => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value});
    };

    const loginUser = async() => {
        let response;
        try {
            response = await API.userLogin(login);
            if (!response.isError) {
                setError('');
                
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                
                setAccount({ username: response.data.username, name:response.data.name});
                isUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigate('/');
            } else {
                setError(response.msg || 'Something went wrong! Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred. Please try again later.');
        }
    }
    

    const signupUser = async () => {
        let response;
        try {
            response = await API.userSignup(signup);
            if (response.isSuccess) {
                setError('');
                setSignup(signupInitialValues);
                toggleAccount('login');
            } else {
                setError('Something went wrong! Please try again.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setError('An error occurred. Please try again later.');
        }
    
        
    }
    
    return (
        <Component>
            <BlackBox>
                <LoginText>
                    Publish Your Passions,
                    <br />
                    Your Way
                </LoginText>
                <LearnMoreButton variant="contained">Learn More</LearnMoreButton>
            </BlackBox>
            <Box>
                <Image src={imageURL} alt='login' />
                {account === 'login' ? (
                    <Wrapper>
                        <div>
                            <IconWrapper><PersonOutlineRoundedIcon /></IconWrapper>
                            <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name="username" label="Enter username" InputLabelProps={{ shrink: !!login.username }}/>
                            
                        </div>
                        <div>
                            <IconWrapper><KeyRoundedIcon /></IconWrapper>
                            <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name="password" label="Enter password" InputLabelProps={{ shrink: !!login.password }}/>
                        </div>
                        { error && <Error>{error}</Error>} 
                        <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                        <Text>OR</Text>
                        <SignupButton onClick={() => toggleSignup()}>No account? Create one</SignupButton>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <div>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name="name" label="Enter name" InputLabelProps={{ shrink: !!signup.name }}/>
                            <IconWrapper><PersonOutlineRoundedIcon /></IconWrapper>
                        </div>
                        <div>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name="username" label="Enter username" InputLabelProps={{ shrink: !!signup.username }}/>
                            <IconWrapper><PersonOutlineRoundedIcon /></IconWrapper>
                        </div>
                        <div>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name="password" label="Enter password" InputLabelProps={{ shrink: !!signup.password }}/>
                            <IconWrapper><KeyRoundedIcon /></IconWrapper>
                        </div>
                        { error && <Error>{error}</Error> }
                        <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
                        <Text>OR</Text>
                        <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                    </Wrapper>
                )}
            </Box>
        </Component>
    );
};

export default Login;