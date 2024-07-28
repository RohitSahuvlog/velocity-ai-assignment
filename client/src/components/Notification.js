import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { socket } from './VotePoll';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        socket.emit('join', user?._id);
        socket.on('newVote', (data) => {
            console.log(data);
            toast.info(data.message);
        });
        return () => {
            socket.disconnect();
        };
    }, [user?._id]);

    return null;
};

export default Notification;