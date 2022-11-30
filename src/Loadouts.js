import {useEffect, useState,useSearchParams} from 'react'
import {useLocation} from "react-router-dom";
const Loadouts = () => {
    const [loadouts,setLoadout]=useState([]);
    useEffect(()=>{
        fetch("https://pies123456.pythonanywhere.com/get_loadouts")
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            
            setLoadout(data)
            
        })
    },[])
    return ( 
        <div className="loadouts">
            <div>
                {loadouts.map(loadout=>(
                    <div style={{display:"block", border:"5px solid black",margin:"10px",height:"106px"}}>
                   {loadout.map(weapon=>(
                    <div key={weapon.itemHash} style={{ backgroundImage: "url(" + weapon.icon + ")",boxSizing:"border-box",float:"left",display:"block",width:"96px",height:"96px",border:"3px solid black",margin:"5px"}}></div>
                   ))}
                   <button className='equip' type="CLICK" style={{backgroundColor:"green",border:"none",display:"inline-block",fontSize:"32px",padding:"35px 60px",float:"right"}}>EQUIP</button>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Loadouts;