import {Question,Difficulty} from "../Types/QuizTypes"
const ShuffledArray=(array:any[])=>
[...array].sort(()=>Math.random()-0.5)
export const fetchQuestion=async(amount:number,difficulty:Difficulty)=>{
    const url=`https://opentdb.com/api.php?amount=${amount}&category=9&difficulty=${difficulty}&type=multiple`
    const data=await(await fetch(url)).json()
    return data.results.map((question:Question)=>(
        {
        ...question,
        answers:ShuffledArray([...question.incorrect_answers,question.correct_answer])
    }
    ))
}