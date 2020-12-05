export type QuestionCardTypes={
    question:string;
    answers:string[];
    userAnswer:any;
    // correctAns:string;
    questionNumber:number;
    totalQuestion:number;
    callback:any
}
export type Question={
    question:string;
    correct_answer:string;
    incorrect_answers:string[];
    type:string;
    category:string;
    difficulty:string;
}
export enum Difficulty{
    EASY="easy",
    MEDIUM="medium",
    HARD="hard"

}
export type QuestionState=Question &{answers:string[]}