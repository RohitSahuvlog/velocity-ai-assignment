import React, { createContext, useEffect, useState } from 'react';
import { fetchPolls } from '../api';
import { socket } from '../components/VotePoll';

export const PollContext = createContext();

export const PollProvider = ({ children }) => {
    const [polls, setPolls] = useState([]);
    const [currentPoll, setCurrentPoll] = useState(null);

    // fetch the poll all
    const getPolls = async () => {
        try {
            const response = await fetchPolls();
            console.log(response);
            setPolls(response.data);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    useEffect(() => {
        getPolls();
    }, [])

    useEffect(() => {
        socket.on('pollCreated', (newPoll) => {
            setPolls((prevPolls) => [...prevPolls, newPoll]);
        });

        console.log('pollCreated', socket)
        return () => {
            socket.off('pollCreated');
        };
    }, [setPolls]);

    return (
        <PollContext.Provider value={{ polls, setPolls, currentPoll, setCurrentPoll }}>
            {children}
        </PollContext.Provider>
    );
};