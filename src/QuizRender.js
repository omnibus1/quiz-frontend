import {useEffect, useState} from 'react'
import Quiz from './Session';
const QuizRender = () => {
    
    const [questionData,setQuestionData]=useState([]);
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/quiz/"+localStorage.getItem("Id")+"/questions")
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            
            setQuestionData(data)
            
            setCurrentQuestion(data[0])
            
        })
    },[])
    const [currentQuestion,setCurrentQuestion]=useState([])
    return ( 
        <div>
            <h1>{localStorage.getItem("QuizName")}</h1>
            <h1>{localStorage.getItem("Id")}</h1>
            {questionData.map((question)=>(
                    <div key={question.question_text}>
                        <h1>{question.question_text}</h1>
                        {question.answers.map((questionAnswer)=>(
                            <div>
                                <h1>{questionAnswer.text}</h1>
                                <h1>{questionAnswer.answer.toString()}</h1>
                            </div>
                            
                        ))}
                    </div>
                ))}
        </div>
     );
}
 
export default QuizRender;