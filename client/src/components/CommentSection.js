import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { addComment, fetchPollComments } from '../api';
import { AuthContext } from '../context/AuthContext';

const CommentSection = ({ pollId }) => {
    const { user } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const socket = io('http://localhost:5000');

    useEffect(() => {
        const getComments = async () => {
            const response = await fetchPollComments(pollId);
            setComments(response.data);
        };

        getComments();

        socket.on('commentUpdate', () => {
            getComments();
        });

        return () => {
            socket.off('commentUpdate');
        };
    }, [pollId]);

    const handleCommentSubmit = async () => {
        await addComment(pollId, { content: newComment, userId: user._id });
        setNewComment('');
    };

    return (
        <div>
            <h4>Comments</h4>
            {comments.map((comment, index) => {
                if (typeof comment === 'object' && comment !== null) {
                    return (
                        <div key={index}>
                            {comment.content} - {comment.userId._id}
                        </div>
                    );
                }
                return null;
            })}
            <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
            />
            <button onClick={handleCommentSubmit}>Submit</button>
        </div>
    );
};

export default CommentSection;