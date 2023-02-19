import {useEffect, useState} from 'react'
 /*
Simple login page 
 */
const Login = () => {
    const [quizes,setQuizes]=useState([]);
/*
Fetch function used to get the login link from the api
*/
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
    return ( 
        <div className='home_base'>
            <div className='quiz_list'>
                {quizes.map((quiz)=>(
                    <div>
                        <a href='/quiz'>{quiz.title}</a>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Login;