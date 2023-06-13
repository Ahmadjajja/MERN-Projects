var userArray = [];
console.log(userArray);
list.onclick= function name() {
    if (JSON.parse(localStorage.getItem("UserArray")) == null) {
        userArray = userArray;
    } else {
        userArray = JSON.parse(localStorage.getItem("UserArray"));  // get Data from local storage
    }
    
    if (userArray.length === 0) {
        result.innerHTML = "Nothing to Display!";
    } else {
        result.innerHTML = "List of Users is Below here";
    }
    for (let index = 0; index < userArray.length; index++) {
        result.innerHTML = result.innerHTML + "</br>" + (index + 1) + ") " + userArray[index];
    }
}
AddUser.onclick= function name() {
    userArray.push(prompt());
    localStorage.setItem("UserArray",JSON.stringify(userArray)); // data stored in local storage
    result.innerHTML = "Successfuly added!";
}
DeleteUser.onclick = function name() {
    userArray = JSON.parse(localStorage.getItem("UserArray"));   // get Data from local storage
    var delUser = prompt();
    for (let index = 0; index < userArray.length; index++) {
        if (delUser === userArray[index]) {
            userArray.splice(index, 1);
            result.innerHTML = "Succcessfuly user deleted!";
            break;
        }else if(index === userArray.length - 1){
            result.innerHTML = "you entered wrong user for deletion!";
        }
    }
    localStorage.setItem("UserArray",JSON.stringify(userArray));  // data stored in local storage
    if (userArray == '') {
        localStorage.removeItem("UserArray");
    }
}
login.onclick = function name() {
    var loginUser = prompt();
        for (let index = 0; index < userArray.length; index++) {
        if (loginUser === userArray[index]) {
            result.innerHTML = "Successfuly login!";
        }else{
            result.innerHTML = "login failed!";
        }
    }
}
