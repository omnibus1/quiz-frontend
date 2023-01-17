import { useState, useEffect } from "react"
 /*
Render of the users info
 */
const Profile = () => {
    const[profileInfo,setProfileInfo]=useState([])
 /*
Fetches user details from the api, and stores them in a variable
 */
    useEffect(()=>{
        fetch("https://ioprojekt.pythonanywhere.com/api/get_player_stats/"+localStorage.getItem("Username"))
        .then(res=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setProfileInfo(data)
            
        })
    },[])
    return ( 
        
            
                <div className="profile-middle">
                <h1 className="profile-list">profile_name: {profileInfo['name']}</h1>
                <h1 className="profile-list">membership_id: {profileInfo['membershipId']}</h1>
                <h1 className="profile-list">profile_theme_name: {profileInfo['profileThemeName']}</h1>
                <h1 className="profile-list">steam_display_name: {profileInfo['steamDisplayName']}</h1>
                <h1 className="profile-list">unique_name: {profileInfo['uniqueName']}</h1>
                <h1 className="profile-list">user_title_display: {profileInfo['userTitleDisplay']}</h1>
                
                
                
            
        </div>
     );
 }
  
 export default Profile;