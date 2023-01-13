import UserProfile from './UserProfile';
const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Destiny item manager {localStorage.getItem("Username")}</h1>
            <div className="links">
                <a href="/">About</a>
                <a href={"/profile/"+localStorage.getItem("Username")}>Profile</a>
                <a href={"/inventory/"+localStorage.getItem("Username")}>Inventory</a>
                <a href={"/loadouts/"+localStorage.getItem("Username")}>Loadouts</a>
            </div>
            
        </nav>
     );
}
 
export default Navbar ;