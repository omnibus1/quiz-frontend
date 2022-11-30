
import {useEffect, useState,useSearchParams} from 'react'
import {useLocation} from "react-router-dom";
const Inventory = () => {
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('name');
    const [valutWeapons,setVaultWeapon]=useState([]);
    const [equippedWeapons,setEquippedWeapons]=useState([])
    useEffect(()=>{
        fetch("https://pies123456.pythonanywhere.com/get_equipped")
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setEquippedWeapons(data)
            
        })
    },[])
    useEffect(()=>{
        fetch("https://pies123456.pythonanywhere.com/get_weapons")
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setVaultWeapon(data)
            
        })
    },[])
    return ( 
        <div className="Inventory">
               
            <div className='"float-container' style={{padding:"20px"}}>
                <div className='Equipped' style ={{float:"left",width:"50%"}}>
                    <h1>Equipped Items</h1>
                {equippedWeapons.map(weapon=>(
                    
                        <div className='item' key={weapon.itemHash} style={{ backgroundImage: "url(" + weapon.icon + ")",display:"block",float:"left",width:"96px",height:"96px",border:"3px solid red",margin:"5px"}}></div>
                    ))}
                </div>
                <div className='Vault'style={{float:"left", width:"50%"}}>
                    <h1>Items in the vault</h1>
                    {valutWeapons.map(weapon=>(
                        <div className='item' key={weapon.itemHash} style={{ backgroundImage: "url(" + weapon.icon + ")",display:"block",float:"left",width:"96px",height:"96px",border:"3px solid black",margin:"5px"}}></div>
                    ))}
                </div>
            </div>
        </div>
        
     );
}
 
export default Inventory;