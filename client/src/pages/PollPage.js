import React from 'react';
import PollResults from '../components/PollResults';
import CommentSection from '../components/CommentSection';
import { useParams, useSearchParams } from 'react-router-dom';

function PollPage() {
    const { id } = useParams();
    return (
        <div>
            <PollResults pollId={id} />
        </div>
    );
}

export default PollPage;
