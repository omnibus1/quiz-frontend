 /*
Some basic functions to store session variables
 */
var UserProfile = (function() {
    var full_name = "";
  
    var getName = function() {
      return full_name; 
    };
  
    var setName = function(name) {

      full_name = name;
      localStorage.setItem("Username",name)     

    };
  
    return {
      getName: getName,
      setName: setName
    }
  
  })();
  
  export default UserProfile;