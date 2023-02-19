 /*
Some basic functions to store session variables
 */
var Quiz = (function() {
    var full_name = "";
    var id="";
  
    var getName = function() {
      return full_name; 
    };
    var getId = function() {
        return id; 
      };
  
    var setName = function(name) {

      full_name = name;
      localStorage.setItem("QuizName",name)     

    };
    var setId = function(quizid) {

        id = quizid;
        localStorage.setItem("Id",id)     
  
      };
  
    return {
      getName: getName,
      setName: setName,
      getId: getId,
      setId: setId
    }
  
  })();
  
  export default Quiz;