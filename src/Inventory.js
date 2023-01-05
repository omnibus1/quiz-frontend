
import {useEffect, useState,useSearchParams} from 'react'
import {useLocation} from "react-router-dom";
import {useParams} from 'react-router-dom'
import UserProfile from './UserProfile';
const Inventory = () => {
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('name');
    const [valutWeapons,setVaultWeapon]=useState([]);
    const [equippedWeapons,setEquippedWeapons]=useState([])
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
    return ( 
        <div className="Inventory">
               
            <div className='"float-container' style={{padding:"20px"}}>
                <div className='Equipped' style ={{float:"left",width:"50%"}}>
                    <h1>Equipped Items</h1>
                {equippedWeapons.map(weapon=>(
                    
                        <div className='itemEquipped' key={weapon.itemHash} style={{ backgroundImage: "url(" + weapon.iconLink + ")",display:"block",float:"left",width:"96px",height:"96px",border:"3px solid green",margin:"5px"}}></div>
                    ))}
                </div>
                <div className='Vault'style={{float:"left", width:"50%"}}>
                    <h1>Items in the vault</h1>
                    {valutWeapons.map(weapon=>(
                        <div className='itemVault' key={weapon.itemHash} style={{ backgroundImage: "url(" + weapon.iconLink + ")",display:"block",float:"left",width:"96px",height:"96px",border:"3px solid red",margin:"5px"}}></div>
                    ))}
                </div>
            </div>
        </div>
        
     );
}
 
export default Inventory;