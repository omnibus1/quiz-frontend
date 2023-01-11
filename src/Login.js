import {useEffect, useState} from 'react'
const Login = () => {
    const [link,setLink]=useState([]);
    useEffect(()=>{
        fetch("https://ioprojekt.pythonanywhere.com/api/get_link")
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setLink(data)
            
        })
    },[])
    return ( 
        <div className='logindiv'>
            <a className='loginLink' href={link.link}>Login link</a>
            <div className='text'>
            <p>This is a project website, the application after you log in will let you</p>
            <p>read your inventory information, equip and unequip your items</p>
            <p>as well as create custom loadouts for different occasions</p>
            <p>Created to hopefully pass a subject and live a long live</p>
            <p>KD KB</p>
            </div>
        </div>
     );
}
 
export default Login;