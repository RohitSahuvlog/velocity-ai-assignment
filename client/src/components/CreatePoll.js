import React, { useState, useContext, useEffect } from 'react';
import { PollContext } from '../context/PollContext';
import styled from 'styled-components';
import { socket } from './VotePoll';

const FormContainer = styled.div`
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const FormTitle = styled.h2`
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    font-size: 1.8em;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1em;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    align-self: center;
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

const OptionContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const RemoveButton = styled.button`
    background: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;

    &:hover {
        background: #c82333;
    }
`;

const AddOptionButton = styled(Button)`
    background-color: #28a745;

    &:hover {
        background-color: #218838;
    }
`;

const CreatePoll = () => {
    const { setPolls } = useContext(PollContext);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPoll = { question, options };
        socket.emit('createPoll', newPoll);
        setQuestion('');
        setOptions(['', '']);
    };



    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleRemoveOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    return (
        <FormContainer>
            <FormTitle>Create a New Poll</FormTitle>
            <Form onSubmit={handleSubmit}>
                <Input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Question"
                    required
                />
                {options.map((option, index) => (
                    <OptionContainer key={index}>
                        <Input
                            value={option}
                            onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[index] = e.target.value;
                                setOptions(newOptions);
                            }}
                            placeholder={`Option ${index + 1}`}
                            required
                        />
                        {options.length > 2 && (
                            <RemoveButton onClick={() => handleRemoveOption(index)}>Remove</RemoveButton>
                        )}
                    </OptionContainer>
                ))}
                <AddOptionButton type="button" onClick={handleAddOption}>Add Option</AddOptionButton>
                <Button type="submit">Create Poll</Button>
            </Form>
        </FormContainer>
    );
};

export default CreatePoll;