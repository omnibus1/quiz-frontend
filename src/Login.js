import {useEffect, useState} from 'react'
 /*
Simple login page 
 */
const Login = () => {
    const [link,setLink]=useState([]);
/*
Fetch function used to get the login link from the api
*/
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
            <p>Right now only supports logging through Steam</p>
            <p>KD KB</p>
            </div>
        </div>
     );
}
 
export default Login;