import { VerseObject } from './App';

export const fetchVerse = async (): Promise<VerseObject> => {
  const response = await fetch(
    `https://labs.bible.org/api/?passage=random&type=json`,
  );
  const data = await response.json();
  return data[0];
};

export const getVerses = async (): Promise<VerseObject[][]> => {
  const questions = [];
  for (let i = 0; i < 10; i++) {
    const question = [];
    for (let j = 0; j < 4; j++) {
      question.push(await fetchVerse());
      if (j === 0) {
        question[0].correct = true;
      }
    }
    const shuffleArray = (array: any[]) =>
      [...array].sort(() => Math.random() - 0.5);
    questions.push(shuffleArray(question));
  }
  return questions;
};
