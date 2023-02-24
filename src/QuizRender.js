import {useEffect, useState} from 'react'

const QuizRender = () => {
    const [sprawdz,setSprawdz]=useState(false)
    const [answerDict,setAnswerDict]=useState({})
    const [questionData,setQuestionData]=useState([]);
    const [currentIndex,setCurrentIndex]=useState(0)
    const [currentQuestion,setCurrentQuestion]=useState({})
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
    useEffect(() => {
        if(Object.keys(currentQuestion).length !== 0){
            let tmpDict={}
            for(const element of currentQuestion.answers){
                
                tmpDict[element.text]=false
                }
            
            setAnswerDict(tmpDict)
            
        }
        
        
    }, [currentQuestion]);

    const handleClickSprawdz=async () =>{
        
        
        setSprawdz(true)
    }
    
    const handleClickNext = async () => {
        setSprawdz(false)
        if(currentIndex<questionData.length-1){
            setCurrentQuestion(questionData[currentIndex+1])
            setCurrentIndex(currentIndex+1)
        }
      };
      const handleClickLast = async () => {
        setSprawdz(false)
        if(currentIndex>0){
            setCurrentQuestion(questionData[currentIndex-1])
            setCurrentIndex(currentIndex-1)
        }
      };
    
    const giveColor=(answerElement)=>{
        if(!sprawdz){
            return 'white'
        }
        else if(answerElement.answer===answerDict[answerElement.text]&&sprawdz){
            return 'green'
        }
        return 'red'
    }
    const handleAnwserChange=(e,answerElement)=> {
        let isChecked=e.target.checked
        console.log(answerElement.text)
        let tmp={}
        Object.assign(tmp,answerDict)
        console.log(tmp)
        tmp.setState(answerElement.text,isChecked)
        console.log(tmp)


    }
    return ( 
        <div>
            <h1>{localStorage.getItem("QuizName")}</h1>
            <h1>{localStorage.getItem("Id")}</h1>
            <h1>{currentQuestion.question_text}</h1>
            
            
            {currentQuestion.answers&& currentQuestion.answers.map((questionAnswer)=>(
                            <div key={questionAnswer.text} style={{background:giveColor(questionAnswer)}}>
                                <input type="checkbox" id={questionAnswer.text} onChange={e=>handleAnwserChange(e,questionAnswer)}/>
                                <label htmlFor={questionAnswer.text}>{questionAnswer.text}</label>
                                <h2>   {questionAnswer.answer.toString()}</h2>
                                
                                
                            </div>
                            
                        ))}
        <h1 onClick={()=>handleClickSprawdz()}>Sprawdz</h1>
        <h1 onClick={()=>handleClickNext()}>Nastepne</h1>
        <h1 onClick={()=>handleClickLast()}>Poprzednie</h1> 
        <h1>{currentIndex+1}/{questionData.length}</h1>
        </div>
     );
}
 
export default QuizRender;