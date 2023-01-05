import React from 'react'
import UserProfile from './UserProfile';


import {useEffect, useState,useSearchParams} from 'react'
import {useParams} from 'react-router-dom'


const UserDetail = () => {
    const [equippedWeapons,setEquippedWeapons]=useState([])
    const [valutWeapons,setVaultWeapon]=useState([]);
    const {id}=useParams()
    UserProfile.setName(id);
    useEffect(()=>{
        fetch("https://ioprojekt.pythonanywhere.com/api/get_player_equipped/"+UserProfile.getName())
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setEquippedWeapons(data.itemesEquipped)
            
        })
    },[])
    useEffect(()=>{
        fetch("https://ioprojekt.pythonanywhere.com/api/get_player_vault/"+UserProfile.getName())
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setVaultWeapon(data.itemsInventory)
            
        })
    },[])
    return <div>
        {equippedWeapons.map(weapon=>(
                    
                    <div className='itemEquipped' key={weapon.itemHash} style={{ backgroundImage: "url(" + weapon.iconLink + ")",display:"block",float:"left",width:"96px",height:"96px",border:"3px solid red",margin:"5px"}}></div>
                ))}
        {valutWeapons.map(weapon=>(
                    
                    <div className='itemVault' key={weapon.itemHash} style={{ backgroundImage: "url(" + weapon.iconLink + ")",display:"block",float:"left",width:"96px",height:"96px",border:"3px solid green",margin:"5px"}}></div>
                ))}
    </div>
}

 
export default UserDetail ; 