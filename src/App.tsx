import React, { useState, useEffect } from 'react';
import { fetchVerse, getVerses } from './API';

export type VerseObject = {
  bookname: string;
  chapter: string;
  verse: string;
  text: string;
  correct: boolean;
};

function App() {
  const [verseObject, setVerseObject] = useState<VerseObject[][] | null>(null);
  const [question, setQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const startGame = async () => {
    setLoading(true);
    setVerseObject(await getVerses());
    setLoading(false);
  };

  const nextQuestion = () => {
    if (verseObject && question === verseObject.length - 1) {
      setQuestion(0);
      setScore(0);
      alert('Restarting game!');
    } else setQuestion(question + 1);
  };

  // const correctVerseLocation = `${verseObject[question][0].bookname} ${verseObject[question][0].chapter}:${verseObject[question][0].verse}`;
  const correctVerseLocation =
    verseObject &&
    verseObject[question].find((verse) => verse.correct === true);
  const correctVerse = correctVerseLocation?.text;

  return (
    <div className='text-md m-2'>
      <h1 className='text-center text-3xl font-bold'>Bible Quiz</h1>
      <div className='flex flex-col items-center justify-center'>
        {!verseObject && (
          <div className='flex flex-col align-center justify-center gap-5 text-center m-4'>
            <p className='text-xl'>
              In this game, you will have to find where a passage is found in
              the Bible. You have four options per question, and ten questions
              per game.
            </p>
            <p>Click the button below to start the game!</p>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={startGame}
            >
              Start
            </button>
          </div>
        )}
        {/* {verseObject && (
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={nextQuestion}
          >
            New Verse
          </button>
        )} */}
      </div>
      {verseObject && (
        <p>Where is the following verse found? "{correctVerse}"</p>
      )}
      <p className='flex flex-col gap-0.5'>
        {verseObject
          ? verseObject[question].map((verse) => (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 m-2 px-4 rounded'
                key={`${verse.bookname} ${verse.chapter}:${verse.verse}`}
                onClick={() => {
                  if (verse === correctVerseLocation) {
                    setScore(score + 1);
                    alert(`Correct!`);
                  } else {
                    alert(
                      `Incorrect! The correct answer is ${correctVerseLocation?.bookname} ${correctVerseLocation?.chapter}:${correctVerseLocation?.verse}`,
                    );
                  }
                  nextQuestion();
                }}
              >
                {`${verse.bookname} ${verse.chapter}:${verse.verse}`}
              </button>
            ))
          : null}
      </p>
      {verseObject && (
        <>
          <p>Question {question} of 10</p>
          <p>
            Score <strong>{score}</strong>
          </p>
        </>
      )}
      {loading && (
        // <p className='font-bold text-blue-400 justify-center align-middle'>
        // make a p that's centered on the screen
        <p className='flex justify-center items-center font-bold text-blue-400 m-10 text-2xl'>
          Loading...
        </p>
      )}
      {/* <p>
        For testing: <strong>{JSON.stringify(verseObject)}</strong>
      </p> */}
    </div>
  );
}

export default App;
