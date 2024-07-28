import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchPollResults } from '../api';

const Container = styled.div`
    padding: 40px;
    max-width: 800px;
    margin: auto;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    font-family: Arial, sans-serif;
`;

const Title = styled.h1`
    font-size: 2.5em;
    color: #333;
    margin-bottom: 20px;
`;

const OptionContainer = styled.div`
    margin-bottom: 20px;
`;

const Option = styled.p`
    font-size: 1.5em;
    color: #555;
`;

const Votes = styled.p`
    font-size: 1.2em;
    color: #777;
`;

const Loading = styled.div`
    font-size: 1.5em;
    text-align: center;
    margin-top: 50px;
    color: #777;
`;

const PollResults = () => {
    const { id } = useParams();
    const [poll, setPoll] = useState({});

    useEffect(() => {
        const getPollResults = async () => {
            const data = await fetchPollResults(id);
            console.log(data.data)
            setPoll(data.data);
        };
        // getPollResults();
    }, [id]);

    if (!poll) return <Loading>Loading...</Loading>;

    return (
        <Container>
            <Title>{poll?.question}</Title>
            {
                poll?.options?.map((option, index) => (
                    <OptionContainer key={index}>
                        <Option>{option}</Option>
                        <Votes>{poll.votes[index]?.count} votes</Votes>
                    </OptionContainer>
                ))
            }
        </Container>
    );
};

export default PollResults;
