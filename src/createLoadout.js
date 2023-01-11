import {useEffect, useState,useSearchParams,} from 'react'
import {Routes, Route,useHistory } from 'react-router-dom';
import UserProfile from './UserProfile'
const CL = () => {
    const[allItems,setAllItems]=useState([])
    const[loadoutItems,setLoadoutItems]=useState([])
    const [loadoutName,setLoadoutName]=useState("")
    const history = useHistory ();
    useEffect(()=>{
        fetch("https://ioprojekt.pythonanywhere.com/api/get_player_items/"+localStorage.getItem("Username"))
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setAllItems(data)
            
        })
    },[])
    const [hover, setHover] = useState({})

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
    const handleClickOnItem=(weapon) => {
        console.log(weapon.itemHash);
        setAllItems(allItems.filter(item=>item.itemHash!==weapon.itemHash))
        setLoadoutItems(loadoutItems.concat(weapon))
        console.log("loadoutItems:")
        console.log(loadoutItems)
        
    }
    const handleClickOnItemLoadout=(weapon) => {
        console.log(weapon.itemHash);
        setLoadoutItems(loadoutItems.filter(item=>item.itemHash!==weapon.itemHash))
        setAllItems(allItems.concat(weapon))
        console.log("loadoutItems:")
        console.log(allItems)
        
        
    }
    const handleClickCreate=()=>{
        console.log("asdasdad")
        let sumString=""
        loadoutItems.forEach((weapon)=>{
            
            sumString+=weapon.itemHash
            sumString+="a"
        })
        sumString=sumString.slice(0,-1)
        sumString+="/"
        sumString+=loadoutName
        console.log(sumString)
        fetch("https://ioprojekt.pythonanywhere.com/api/create_loadout/"+localStorage.getItem("Username")+"/"+sumString)
        history.push("/loadouts/"+localStorage.getItem("Username"))
        }
    const handleChange=(event)=>{
        console.log(event.target.value)
        setLoadoutName(event.target.value)
    }

        
    

    return ( 
        <div>
            <div className="loadoutName">
            <input className="nameField" placeholder='enter a loadout name' onChange={event=>handleChange(event)}/>
            </div>
            <div className="loadoutItems">
            
            {loadoutItems.map((weapon,index)=>(
                    
                     <button className='itemEquipped'  onClick={()=>handleClickOnItemLoadout(weapon)} onMouseEnter={(e)=>{mouseOver(e,weapon.itemHash)}}  onMouseLeave={(e)=>{mouseOut(e,weapon.itemHash)}} key={index} style={{ backgroundImage: !hover[weapon.itemHash] ? "url(" + weapon.iconLink + ")":"red",border: !hover[weapon.itemHash] ?"3px solid green":"3px solid red",margin:"5px"}}></button>
                ))}
                </div>
                <div className="submitButton">
                    
                <button onClick={()=>handleClickCreate()} style={{backgroundColor:"orange",fontSize:"2em",border:"2px solid black",padding:"10px 20px",textDecoration:"none"}} className='createLoadoutButton' >CREATE LOADOUT</button>
                </div>
                <div className="userItems">
                
                {allItems.map((weapon,index)=>(
                     <button className='itemEquipped'  onClick={()=>handleClickOnItem(weapon)} onMouseEnter={(e)=>{mouseOver(e,weapon.itemHash)}}  onMouseLeave={(e)=>{mouseOut(e,weapon.itemHash)}} key={index} style={{ backgroundImage: !hover[weapon.itemHash] ? "url(" + weapon.iconLink + ")":"red",display:"block",float:"left",width:"96px",height:"96px",border: !hover[weapon.itemHash] ?"3px solid green":"3px solid red",margin:"5px"}}></button>
                ))}
                </div>
        </div>
     );
 }
  
 export default CL;