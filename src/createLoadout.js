import {useEffect, useState,useSearchParams,} from 'react'
import {Routes, Route,useHistory } from 'react-router-dom';
import UserProfile from './UserProfile'
 /*
create loadout page, used to create loadouts, 
 */
const CL = () => {
    const[allItems,setAllItems]=useState([])
    const[loadoutItems,setLoadoutItems]=useState([])
    const [loadoutName,setLoadoutName]=useState("")
    const history = useHistory ();
    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
 /*
Fetches all the items the user has
 */
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
 /*
Basic mouse over to highlight currently hovered item
 */
    const mouseOver = (event, index) => {
        setHover(c => {
            return {
                ...c,
                [index]: true
            };
        })
    }

 /*
Basic mouse over to unhighlight currently hovered item
 */
    const mouseOut = (event, index) => {
        setHover(c => {
            return {
                ...c,
                [index]: false
            };
        })
    }
/*
Handle moving the items from the eq to a desired loadout
 */
    const handleClickOnItem=(weapon) => {
        console.log(weapon.itemHash);
        setAllItems(allItems.filter(item=>item.itemHash!==weapon.itemHash))
        setLoadoutItems(loadoutItems.concat(weapon))

        
    }
    const handleClickOnItemLoadout=(weapon) => {
        console.log(weapon.itemHash);
        setLoadoutItems(loadoutItems.filter(item=>item.itemHash!==weapon.itemHash))
        setAllItems(allItems.concat(weapon))
        console.log("loadoutItems:")
        console.log(allItems)
        
        
    }
    const fib=(n)=>{
        if(n===1||n===0){
            return n
        }
        return fib(n-1)+fib(n-2)
        
    }
/*
Upon clicking sets a request to the api to create a loadout, and redirects to the loadout page
 */
    const handleClickCreate=()=>{
        console.log("asdasdad")
        let sumString=""
        loadoutItems.forEach((weapon)=>{
            
            sumString+=weapon.itemHash
            sumString+="_"
        })
        sumString=sumString.slice(0,-1)
        sumString+="/"
        let x=loadoutName.replace(/\s+/g,'_')

        setLoadoutName(x)
        

        sumString+=x

        fetch("https://ioprojekt.pythonanywhere.com/api/create_loadout/"+localStorage.getItem("Username")+"/"+sumString)
        let i=0
        //delay function 
        let w=fib(25)
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
                    
                     <button className='itemEquipped'  onClick={()=>handleClickOnItemLoadout(weapon)} onMouseEnter={(e)=>{mouseOver(e,weapon.itemHash)}}  onMouseLeave={(e)=>{mouseOut(e,weapon.itemHash)}} key={index} style={{ backgroundImage:"url(" + weapon.iconLink + ")",border: !hover[weapon.itemHash] ?"3px solid green":"3px solid red",margin:"5px"}}></button>
                ))}
                </div>
                <div className="submitButton">
                    
                <button disabled={!loadoutName&&loadoutItems}  onClick={()=>handleClickCreate()} style={{backgroundColor:(!loadoutName&&loadoutItems) ?"grey":"#FAC748",fontSize:"2em",border:"2px solid black",padding:"10px 20px",textDecoration:"none"}} className='createLoadoutButton' >CREATE LOADOUT</button>
                </div>
                <div className="userItems">
                
                {allItems.map((weapon,index)=>(
                     <button className='itemEquipped'  onClick={()=>handleClickOnItem(weapon)} onMouseEnter={(e)=>{mouseOver(e,weapon.itemHash)}}  onMouseLeave={(e)=>{mouseOut(e,weapon.itemHash)}} key={index} style={{ backgroundImage:"url(" + weapon.iconLink + ")",display:"block",float:"left",width:"96px",height:"96px",border: !hover[weapon.itemHash] ?"3px solid green":"3px solid red",margin:"5px"}}></button>
                ))}
                </div>
        </div>
     );
 }
  
 export default CL;