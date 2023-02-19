import {useEffect, useState} from 'react'
import Quiz from './Session';
import { useHistory } from "react-router-dom";

const Home = () => {
    const [quizes,setQuizes]=useState([]);
    const history = useHistory();

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/avilable_quizes")
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setQuizes(data)
            
        })
    },[])
    const handleClick = async (quiz) => {
        Quiz.setName(quiz.title)
        Quiz.setId(quiz.id)

        console.log(Quiz.getName())
        history.push('/quiz/'+Quiz.getName());
      };
    return ( 
        <div className='home_base'>
            <div className='quiz_list'>
                {quizes.map((quiz)=>(
                    <div key={quiz.title}>
                        <h1 onClick={()=>handleClick(quiz)} >{quiz.title}</h1>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Home;