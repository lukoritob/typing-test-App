import React from 'react';
import ChallengeDetailsCard from '../ChallengeDetailsCard/ChallengeDetailsCard';
import TypingChallenge from '../TypingChallenge/TypingChallenge';
import './TypingChallengeContainer.css';

const TypingChallengeContainer = ({
    selectedParagraph,
    words,
    characters,
    wpm,
    timeRemaining,
    timerStarted,
    testInfo,
    onInputChange,
}) => {
    return (
        <div className='typing-challenge-container'>
            {/* details section */}
            <div className="details-container">
                {/* words typed */}
                <ChallengeDetailsCard cardName="words" cardValue={words} />
                {/* characters typed */}
                <ChallengeDetailsCard cardName="characters" cardValue={characters} />
                {/* speed */}
                <ChallengeDetailsCard cardName="speed" cardValue={wpm} />
            </div>
            <div className="typewriter-container">
                {/* the Real Challenge */}
                <TypingChallenge
                    testInfo={testInfo}
                    timeRemaining={timeRemaining}
                    timerStarted={timerStarted}
                    selectedParagraph={selectedParagraph}
                    onInputChange={onInputChange}
                />
            </div>
        </div>
    );
}

export default TypingChallengeContainer;