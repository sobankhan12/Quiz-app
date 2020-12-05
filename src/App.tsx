import React,{useState} from 'react';
import{Difficulty,QuestionState} from './Types/QuizTypes'
import {GlobalStyle,Wrapper} from './App.styles';
import QuestionCard from './Components/QuestionCard';
import {fetchQuestion} from './API/quiz_api'
const TOTAL_QUESTION=10;
type AnswerObject={
  question:string;
  answer:string;
  correctAnswer:string;
  correct:boolean;
  // options:string[];
}
function App() {
  const[loading,setLoading]=useState(false);
  const [questions,setQuestions]=useState<QuestionState[]>([])
  const [number,setNumber]=useState(0);
  const [gameOver,setGameOver]=useState(true);
  const [userAnswer,setUserAnswer]=useState<AnswerObject[]>([])
  const [score,setScore]=useState(0)
  console.log(questions);
  
  const startQuiz=async()=>{
    setLoading(true)
    setGameOver(false)
    const nextQuestions=await fetchQuestion(10,Difficulty.EASY)
    setQuestions(nextQuestions);
    setScore(0)
    setUserAnswer([])
    setNumber(0)
    setLoading(false)
  }
  const nextQuestion=async()=>{
    const nextQuestion=number+1;
    if(nextQuestion===TOTAL_QUESTION){
      setGameOver(true)
    }else{
      setNumber(nextQuestion)
    }
  
  }
  
  
  
  const checkAnswer=(e:React.MouseEvent<HTMLButtonElement>)=>{
    if(!gameOver){
      const answer=e.currentTarget.value;
      const correct=questions[number].correct_answer===answer;
      if (correct)setScore(prev=>prev+1)
      const answerObject={
        question:questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer,
        // options:[...questions[number].incorrect_answers]
      }
      setUserAnswer(prev=>[...prev,answerObject])

    }
  }
  return (
    <>
    <GlobalStyle/>
    <Wrapper>
          <h1 className="heading">React Quiz</h1>
          {gameOver || userAnswer.length===TOTAL_QUESTION? (
            <button className="start" onClick={startQuiz}>Start Quiz</button>
          ):null }
          {!gameOver? (
            <p className="score">Score:{score}</p>
          ):null}
          {
            loading? (
<p className="loading">Loading....</p>
            ):null
          }
          {!gameOver && !loading? (
            <QuestionCard 
            question={questions[number].question}
            questionNumber={number+1}
            totalQuestion={TOTAL_QUESTION}
            
            answers={questions[number].answers}
            userAnswer={userAnswer? userAnswer[number]:undefined}
            callback={checkAnswer}
           />
          ):null}
           {!gameOver && !loading && userAnswer.length===number+1 && number !==TOTAL_QUESTION-1? (
             <button className="next" onClick={nextQuestion}>Next Question</button>
           ):null}
          
    </Wrapper>
    </>
  );
}

export default App;
