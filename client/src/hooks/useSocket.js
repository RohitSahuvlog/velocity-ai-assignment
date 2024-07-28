import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = (url, event, callback) => {
    useEffect(() => {
        const socket = io(url);

        socket.on(event, callback);

        return () => {
            socket.off(event, callback);
        };
    }, [url, event, callback]);
};

export default useSocket;
