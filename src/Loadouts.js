import {useEffect, useState} from 'react'
import React from 'react';
import message from './Message';
 /*
This file renders the loadouts page of a user, and lets himm interact with the api a bit
 */
const Loadouts = () => {
    const [requested,setRequested]=useState(false)
    const [loadouts,setLoadout]=useState([]);
    const [hasItems,setHasItems]=useState(false)
/*
Fetch used to grab players loadouts, and store them in a variable
*/
    useEffect(()=>{
        fetch("https://ioprojekt.pythonanywhere.com/api/get_player_loadouts/"+localStorage.getItem("Username"))
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            
            setLoadout(data)
            if(data.lenght!==0){
              setHasItems(true)
              
            }
            console.log(data)
            console.log(hasItems)
            
        })
    },[requested])
    const [data, setData] = useState({data: []});

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
 /*
A fethc function that sends requests to the api to equip or delete a loadout
 */
      const handleClick = async (link) => {
          setIsLoading(true);
      
          try {
            let new_link=link.replace(/\s+/g,'_')
            console.log(new_link)
            const response = await fetch(new_link);
              
              setRequested(!requested)
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
      
            const result = await response.json();
      
            console.log('resoult is: ', JSON.stringify(result, null, 4));
      
            setData(result);
          } catch (err) {
            setErr(err.message);
          } finally {
            setIsLoading(false);
          }
        };
    return ( 
        <div className="loadouts">
            <div>{<message/>}
                {loadouts.map(loadout=>(
                    <div className='loadout' style={{display:"block", border:"5px solid black",margin:"10px",height:"106px",backgroundColor:'#574ae2'}}>
                        <div className='nazwa'>"{loadout.name}"</div>
                        
                        {loadout['contains'].map(item=>(
  
                             <div key={item.item.itemHash} style={{ backgroundImage: "url(" + item.item.iconLink + ")",boxSizing:"border-box",float:"left",display:"block",width:"96px",height:"96px",border:"3px solid black",margin:"5px"}}></div>
                        ))}
                        <button className='equip' onClick={()=>handleClick(loadout.equip_link)} type="CLICK" style={{backgroundColor:"#BBC7A4",border:"none",display:"inline-block",fontSize:"32px",padding:"35px 60px",float:"right",margin:"0px"}}>EQUIP</button>
                        <button className='delete' onClick={()=>handleClick(loadout.delete_link)} type="CLICK" style={{backgroundColor:"#E75A7C",border:"none",display:"inline-block",fontSize:"32px",padding:"35px 60px",float:"right"}}>DELETE</button>
                     
                     </div>
                     
                ))}

            </div>
            <div className='createLoadout' style={{textAlign:'center',margin:"50px"}}>
                <a href={"/create_loadout/"+localStorage.getItem("Username")} style={{backgroundColor:"#FAC748",fontSize:"2em",border:"2px solid black",padding:"10px 20px",textDecoration:"none"}} className='createLoadoutButton' >CREATE LOADOUT</a>
            </div>
        </div>
        
     );
}


export default Loadouts;