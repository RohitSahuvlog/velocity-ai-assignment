import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../api';
import { toaster } from 'evergreen-ui';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7f7f7;
`;

const FormWrapper = styled.div`
    width: 400px;
    padding: 40px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const Title = styled.h1`
    margin-bottom: 20px;
    font-size: 2em;
    text-align: center;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    &:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    &:hover {
        background-color: #0056b3;
    }
`;

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(email, password);
            setUser(res.data.user);
            localStorage.setItem("token", res.data.token);
            navigate('/');
        } catch (error) {
            toaster.danger('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Login</Title>
                <Form onSubmit={handleLogin}>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <Button type="submit">Login</Button>
                </Form>
            </FormWrapper>
        </Container>
    );
}

export default LoginPage;
