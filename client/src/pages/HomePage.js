import React, { useContext } from 'react';
import VotePoll from '../components/VotePoll';
import PollResults from '../components/PollResults';
import { PollContext } from '../context/PollContext';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Notification from '../components/Notification';

const Container = styled.div`
    padding: 40px;
    background-color: #f5f5f5;
    min-height: 100vh;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

const Title = styled.h1`
    color: #333;
    font-size: 2.5em;
`;

const ProfileLink = styled(Link)`
    color: #007BFF;
    text-decoration: none;
    font-size: 1.2em;
    &:hover {
        text-decoration: underline;
    }
`;

const Subtitle = styled.h2`
    color: #666;
    font-size: 2em;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const PollList = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 400px);
    gap: 20px;
`;

const Button = styled(Link)`
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    font-size: 1em;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const WelcomeMessage = styled.h1`
    color: #333;
    font-size: 1.5em;
    margin-top: 20px;
    margin-bottom: 20px;
`;

function HomePage() {
    const { polls } = useContext(PollContext);
    const { user } = useContext(AuthContext);

    return (
        <Container>
            <Header>
                <Title>Polls Application</Title>
                <ProfileLink to="/profile">User Profile</ProfileLink>
            </Header>
            <WelcomeMessage>Welcome, {user?.email}</WelcomeMessage>
            <Button to="/create-poll">Create Poll</Button>
            <Subtitle>Polls</Subtitle>
            <PollList>
                {polls && polls?.map(poll => (
                    <VotePoll key={poll._id} poll={poll} />
                ))}
            </PollList>
            <PollResults />

        </Container>
    );
}

export default HomePage;
