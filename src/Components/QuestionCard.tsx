import React from 'react'
import {QuestionCardTypes} from './../Types/QuizTypes'
import {Wrapper,ButtonWrapper} from './QuestionCard.styles'
const QuestionCard:React.FC<QuestionCardTypes> = ({question,questionNumber,totalQuestion,userAnswer,answers,callback}) => {
    return (
        <Wrapper>
            <p>Question:{questionNumber}/{totalQuestion}</p>
             <p dangerouslySetInnerHTML={{__html:question}}/>
             <div>
                 {
                     answers.map((answer,ind)=>(
                         <ButtonWrapper 
                         correct={userAnswer?.correctAnswer===answer}
                         userClicked={userAnswer?.answer===answer}
                         key={ind}>
                             <button disabled={userAnswer} value={answer} onClick={callback}>
                                 <span dangerouslySetInnerHTML={{__html:answer}}/>
                             </button>
                         </ButtonWrapper>
                     )

                     )
                 }
             </div>
        </Wrapper>
    )
}

export default QuestionCard
