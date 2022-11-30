import {useEffect, useState} from 'react'
const Login = () => {
    const [link,setLink]=useState([]);
    useEffect(()=>{
        fetch("https://pies123456.pythonanywhere.com/get_link")
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setLink(data)
            
        })
    },[])
    return ( 
        <a href={link.link}>Login link</a>
    
     );
}
 
export default Login;