
import {useEffect, useState,useSearchParams} from 'react'
import {useLocation} from "react-router-dom";
import {useParams} from 'react-router-dom'
import UserProfile from './UserProfile';
 /*
This file renders the inventory page of a user
 */
const Inventory = () => {
    const search = useLocation().search;
    const [valutWeapons,setVaultWeapon]=useState([]);
    const [equippedWeapons,setEquippedWeapons]=useState([])
    const {id}=useParams()
    UserProfile.setName(id);
    const [requested,setRequested]=useState(false)
 /*
Fetch used to get the users currently equipped items
 */
      useEffect(()=>{
        fetch("https://ioprojekt.pythonanywhere.com/api/get_player_equipped/"+UserProfile.getName())
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setEquippedWeapons(data.itemesEquipped)
            
        })
    },[requested])
 /*
Fetch used to grap the users items from the inventory
 */
    useEffect(()=>{
        fetch("https://ioprojekt.pythonanywhere.com/api/get_player_vault/"+UserProfile.getName())
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setVaultWeapon(data.itemsInventory)
            
        })
    },[requested])
    useEffect(()=>{

    },[])
    const [hover, setHover] = useState({})
 /*
Basic hover map to highlight currently hovered item
 */
    const mouseOver = (event, index) => {
        setHover(c => {
            return {
                ...c,
                [index]: true
            };
        })
    }
    const mouseOut = (event, index) => {
        setHover(c => {
            return {
                ...c,
                [index]: false
            };
        })
    }
    const [data, setData] = useState({data: []});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
 /*
Function used to interact with the api to send requests to equip or unequip items that have been clicked
 */
    const handleClick = async (link) => {
        setIsLoading(true);
    
        try {
          const response = await fetch(link);
            console.log(link)
            setRequested(!requested)
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
    
          const result = await response.json();
    
          console.log('result is: ', JSON.stringify(result, null, 4));
    
          setData(result);
        } catch (err) {
          setErr(err.message);
        } finally {
          setIsLoading(false);
        }
      };

    return ( 
        <div className="Inventory">
               
            <div className='"float-container' style={{padding:"20px"}}>
                <div className='Equipped' style ={{float:"left",width:"40%"}}>
                    <h1>Equipped Items:</h1>
                    <div className='colorme'>
                {equippedWeapons.map((weapon,index)=>(
                    
                        <button className='itemEquippedLoadout'  onMouseEnter={(e)=>{mouseOver(e,weapon.itemHash)}} onClick={()=>handleClick(weapon.unequip_item_link)} onMouseLeave={(e)=>{mouseOut(e,weapon.itemHash)}} key={index} style={{ backgroundImage:"url(" + weapon.iconLink + ")",display:"block",float:"left",width:"96px",height:"96px",border: !hover[weapon.itemHash] ?"5px solid #80475E":"5px solid #203669",margin:"5px"}}></button>
                    ))}
                </div>
                </div>
                <div className='Vault'style={{float:"left", width:"40%"}}>
                    <h1>Items in the vault:</h1>
                    {valutWeapons.map((weapon,index)=>(
                        <button className='itemInventory'  onClick={()=>handleClick(weapon.equip_item_link)} onMouseEnter={(e)=>{mouseOver(e,weapon.itemHash)}} onMouseLeave={(e)=>{mouseOut(e,weapon.itemHash)}} key={index} style={{ backgroundImage:"url(" + weapon.iconLink + ")",display:"block",float:"left",width:"96px",height:"96px",border: !hover[weapon.itemHash] ?"5px solid #00A6ED":"5px solid #F8F272",margin:"5px"}}></button>
                    ))}
                </div>
                
            </div>
        </div>
        
     );
}
 
export default Inventory;