import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import { FaEdit, FaPoll, FaUpload, FaSave } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { uploadProfile } from '../api';

const Container = styled.div`
    padding: 40px;
    max-width: 800px;
    margin: auto;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    font-family: Arial, sans-serif;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
`;

const Title = styled.h1`
    font-size: 2.5em;
    color: #333;
`;

const EditButton = styled.button`
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        background: #0056b3;
    }
`;

const SaveButton = styled.button`
    background: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        background: #218838;
    }
`;

const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0 auto 20px auto;
    display: block;
    border: 5px solid #007bff;
`;

const UserInfo = styled.div`
    text-align: center;
    margin-bottom: 30px;

    p {
        font-size: 1.2em;
        color: #555;
        margin: 10px 0;
    }

    input {
        font-size: 1.2em;
        color: #555;
        margin: 10px 0;
        border: none;
        border-bottom: 1px solid #555;
        background: none;
        text-align: center;
        outline: none;
    }
`;

const SectionTitle = styled.h2`
    font-size: 2em;
    color: #444;
    margin-top: 30px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`;

const PollList = styled.ul`
    list-style-type: none;
    padding: 0;
    background: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
`;

const PollItem = styled.li`
    font-size: 1.2em;
    color: #666;
    margin: 10px 0;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PollQuestion = styled.span`
    flex: 1;
`;

const ViewButton = styled(Link)`
    background: #28a745;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;

    &:hover {
        background: #218838;
    }
`;

const HiddenInput = styled.input`
    display: none;
`;

const UploadButton = styled.button`
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    `;

function ProfilePage() {
    const { user, setUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    const handleSave = async () => {
        if (!profilePicture) {
            alert('Uploading profile picture, please wait...');
            return;
        }
        const formData = new FormData();
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }
        formData.append('username', username || user?.username);
        const { data } = await uploadProfile(formData);
        setUser(prevUser => ({ ...prevUser, username: data.username }));
        setProfilePicture(profilePicture?.profilePicture)
        setIsEditing(false);
    };

    useEffect(() => {
        setUsername(user?.username);
        setProfilePicture(user?.profile)
    }, [user?.username, user?.profile]);

    return (
        <Container>
            <Header>
                <Title>Profile Page</Title>
                {isEditing ? (
                    <SaveButton onClick={handleSave}>
                        <FaSave style={{ marginRight: '8px' }} /> Save
                    </SaveButton>
                ) : (
                    <EditButton onClick={() => setIsEditing(true)}>
                        <FaEdit style={{ marginRight: '8px' }} /> Edit Profile
                    </EditButton>
                )}
            </Header>
            <ProfileImage src={user?.profilePicture} alt="Profile" />
            {isEditing && (
                <>
                    <HiddenInput
                        type="file"
                        onChange={e => setProfilePicture(e.target.files[0])}
                        id="profilePictureInput"
                    />
                    <UploadButton onClick={() => document.getElementById('profilePictureInput').click()}>
                        <FaUpload style={{ marginRight: '8px' }} /> Upload Picture
                    </UploadButton>
                </>
            )}
            <UserInfo>
                <p>
                    <strong>Username:</strong>
                    {isEditing ? (
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    ) : (
                        user?.username
                    )}
                </p>
                <p><strong>Email:</strong> {user?.email}</p>
            </UserInfo>
            <SectionTitle>
                <FaPoll style={{ marginRight: '10px' }} /> Created Polls
            </SectionTitle>
            <PollList>
                {user?.createdPolls?.map(poll => (
                    <PollItem key={poll._id}>
                        <PollQuestion>{poll.question}</PollQuestion>
                        <ViewButton to={`/poll/${poll._id}`}>View Poll</ViewButton>
                    </PollItem>
                ))}
            </PollList>
            <SectionTitle>
                <FaPoll style={{ marginRight: '10px' }} /> Voted Polls
            </SectionTitle>
            <PollList>
                {user?.votedPolls?.map(poll => (
                    <PollItem key={poll._id}>
                        <PollQuestion>{poll.question}</PollQuestion>
                        <ViewButton to={`/poll/${poll._id}`}>View Results</ViewButton>
                    </PollItem>
                ))}
            </PollList>
        </Container>
    );
}

export default ProfilePage;
