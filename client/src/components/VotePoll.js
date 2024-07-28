import React, { useContext, useState, useEffect } from 'react';
import { PollContext } from '../context/PollContext';
import { votePoll } from '../api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
`;

const Question = styled.h3`
    margin-bottom: 20px;
    text-align: center;
`;

const OptionContainer = styled.div`
    display: flex;
    align-items: left;
    width: 100%;
    justify-items: center;
`;

const RadioButton = styled.input`
    margin-right: 10px;
`;

const VoteButton = styled.button`
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
    margin: 20px auto;
`;

const ProgressContainer = styled.div`
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
`;

const ProgressBar = styled.div`
    height: 20px;
    width: ${(props) => props.width}%;
    background-color: #007BFF;
`;

const PollInfo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
`;

const PollDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const VoteDiv = styled.div`
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
`;

const LikeButton = styled.button`
    padding: 5px 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #218838;
    }
    margin: 10px;
`;

const CommentContainer = styled.div`
    width: 100%;
    margin-top: 20px;
`;

const CommentInput = styled.textarea`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ced4da;
    margin-bottom: 10px;
`;

const CommentButton = styled.button`
    padding: 5px 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const Commentsdiv = styled.div`
    display: ${({ showComments }) => (showComments ? 'flex' : 'none')};
    height: ${({ showComments }) => (showComments ? '30vh' : '0')};
    flex-direction: column;
    border: 1px solid #ccc;
    overflow-y: auto;
`;

export const socket = io('https://velocity-ai-assignment.onrender.com/', {
    query: { token: localStorage.getItem('token') }
});

const VotePoll = ({ poll }) => {
    const { user } = useContext(AuthContext)
    const { setCurrentPoll } = useContext(PollContext);
    const [selectedOption, setSelectedOption] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [currentPoll, setCurrentPollState] = useState(poll);
    const [likes, setLikes] = useState(poll.likes || 0);
    const [comments, setComments] = useState(poll.comments || []);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        if (user && user.votedPolls.some(votedPoll => votedPoll._id === poll._id)) {
            setHasVoted(true);
            setShowResults(true);
        }

        socket.on('pollUpdated', (updatedPoll) => {
            if (updatedPoll._id === poll._id) {
                setCurrentPollState(updatedPoll);
                if (user && user.votedPolls.some(votedPoll => votedPoll._id === poll._id)) {
                    setShowResults(true);
                }
            }
        });

        socket.on('likeUpdated', (data) => {
            if (data.pollId === poll._id) {
                setLikes(data.likes);
            }
        });

        socket.on('commentAdded', (data) => {
            if (data.pollId === poll._id) {
                setComments(data.comments);
            }
        });

        return () => {
            socket.off('pollUpdated');
            socket.off('likeUpdated');
            socket.off('commentAdded');
        };
    }, [poll._id, user]);

    const handleVote = async () => {
        await votePoll(poll._id, { option: selectedOption });
        setCurrentPoll(poll._id);
        setShowResults(true);
        setHasVoted(true);
    };

    const handleLike = () => {
        socket.emit('updateLike', { pollId: poll._id, likes: likes + 1 });
    };

    const handleCommentSubmit = () => {
        socket.emit('addComment', { pollId: poll._id, comment: newComment });
        setNewComment('');
    };

    const totalVotes = currentPoll.votes.reduce((acc, vote) => acc + vote.count, 0);

    const getVotePercentage = (count) => {
        return totalVotes ? (count / totalVotes) * 100 : 0;
    };

    return (
        <Container>
            <PollDetails>
                <Question>
                    <Link to={`/poll/${poll._id}`}>{currentPoll.question}</Link>
                </Question>
                <PollInfo>
                    <span style={{ marginRight: '20px' }}>
                        {poll.daysLeft ? `${poll.daysLeft} days left` : '0 days left'}
                    </span>
                    <span>{totalVotes} votes</span>
                </PollInfo>
                <div>
                    <LikeButton onClick={handleLike}>Like ({likes})</LikeButton>
                </div>
            </PollDetails>
            {!showResults ? (
                currentPoll?.votes?.map((vote, index) => (
                    <OptionContainer key={index}>
                        <RadioButton
                            type="radio"
                            value={vote.option}
                            checked={selectedOption === vote.option}
                            onChange={(e) => setSelectedOption(e.target.value)}
                        />
                        {vote.option}
                    </OptionContainer>
                ))
            ) : (
                currentPoll?.votes?.map((vote, index) => (
                    <div key={index} style={{ width: '100%' }}>
                        <VoteDiv>{vote.option}</VoteDiv>
                        <OptionContainer>
                            <ProgressContainer>
                                <ProgressBar width={getVotePercentage(vote.count)}></ProgressBar>
                            </ProgressContainer>
                            <span>{getVotePercentage(vote.count).toFixed(2)}%</span>
                        </OptionContainer>
                        <VoteDiv>{vote.count} votes</VoteDiv>
                    </div>
                ))
            )}
            {!showResults && !hasVoted && <VoteButton onClick={handleVote}>Vote</VoteButton>}
            <CommentContainer>
                <CommentInput
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <CommentButton onClick={handleCommentSubmit}>Comment({comments?.length || 0})</CommentButton>
                <CommentButton onClick={() => setShowComments(!showComments)}>
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </CommentButton>
                <Commentsdiv showComments={showComments}>
                    {comments.map((comment, index) => (
                        <div key={index}>
                            <div style={{ marginLeft: "10px", textAlign: user?._id === comment.user_id ? "right" : "left", whiteSpace: "nowrap" }}>
                                <h4>{comment.username}</h4>{comment.comment}
                            </div>
                        </div>
                    ))}
                </Commentsdiv>
            </CommentContainer>
        </Container>
    );
};

export default VotePoll;