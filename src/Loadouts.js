import {useEffect, useState,useSearchParams} from 'react'
import {useLocation} from "react-router-dom";
const Loadouts = () => {
    const [requested,setRequested]=useState(false)
    const [loadouts,setLoadout]=useState([]);
    useEffect(()=>{
        fetch("https://ioprojekt.pythonanywhere.com/api/get_player_loadouts/"+localStorage.getItem("Username"))
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            
            setLoadout(data)
            console.log(data)
            
        })
    },[requested])
    const [data, setData] = useState({data: []});

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
  
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
        <div className="loadouts">
            <div>
                {loadouts.map(loadout=>(
                    <div className='loadout' style={{display:"block", border:"5px solid black",margin:"10px",height:"106px",backgroundColor:'white'}}>
                        <div className='nazwa'>"{loadout.name}"</div>
                        
                        {loadout['contains'].map(item=>(
  
                             <div key={item.item.itemHash} style={{ backgroundImage: "url(" + item.item.iconLink + ")",boxSizing:"border-box",float:"left",display:"block",width:"96px",height:"96px",border:"3px solid black",margin:"5px"}}></div>
                        ))}
                        <button className='equip' onClick={()=>handleClick(loadout.equip_link)} type="CLICK" style={{backgroundColor:"green",border:"none",display:"inline-block",fontSize:"32px",padding:"35px 60px",float:"right",margin:"0px"}}>EQUIP</button>
                        <button className='delete' onClick={()=>handleClick(loadout.delete_link)} type="CLICK" style={{backgroundColor:"red",border:"none",display:"inline-block",fontSize:"32px",padding:"35px 60px",float:"right"}}>DELETE</button>
                     
                     </div>
                     
                ))}
                {/* {loadouts.map(loadout=>(
                    <div style={{display:"block", border:"5px solid black",margin:"10px",height:"106px"}}>
                   {loadout.map(weapon=>(
                    <div key={weapon.itemHash} style={{ backgroundImage: "url(" + weapon.icon + ")",boxSizing:"border-box",float:"left",display:"block",width:"96px",height:"96px",border:"3px solid black",margin:"5px"}}></div>
                   ))}
                   <button className='equip' type="CLICK" style={{backgroundColor:"green",border:"none",display:"inline-block",fontSize:"32px",padding:"35px 60px",float:"right"}}>EQUIP</button>
                    </div>
                ))} */}
            </div>
            <div className='createLoadout' style={{textAlign:'center',margin:"50px"}}>
                <a href={"/create_loadout/"+localStorage.getItem("Username")} style={{backgroundColor:"orange",fontSize:"2em",border:"2px solid black",padding:"10px 20px",textDecoration:"none"}} className='createLoadoutButton' >CREATE LOADOUT</a>
            </div>
        </div>
        
     );
}

export default Loadouts;