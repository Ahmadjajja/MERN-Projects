var userArray = [];
// console.log(userArray);
list.onclick= function name() {

    if (localStorage)  
    {  
        if (JSON.parse(localStorage.getItem("UserArray")) == null) {
            userArray = userArray;
        } else {
            userArray = JSON.parse(localStorage.getItem("UserArray"));  // get Data from local storage
        }
        
        if (userArray.length === 0) {
            result.innerHTML = "Empty Chat!";
        } else {
            result.innerHTML = "Chat is Below here";
        }
        for (let index = 0; index < userArray.length; index++) {
            result.innerHTML = result.innerHTML + "</br>" + (index) + ") " + userArray[index];
        }
    }  
    else  
    {  
        alert("OOPS! Your Browser Not Supporting LocalStorage Please Update It!")  
    }
}
AddUser.onclick= function name() {

    if (localStorage)  
    {  
        userArray.push(prompt());
        localStorage.setItem("UserArray",JSON.stringify(userArray)); // data stored in local storage
        result.innerHTML = "Message sent Successfuly!";
    }  
    else  
    {  
        alert("OOPS! Your Browser Not Supporting LocalStorage Please Update It!")  
    }  
}
DeleteUser.onclick = function name() {


    if (localStorage)  
    {  
        userArray = JSON.parse(localStorage.getItem("UserArray"));   // get Data from local storage
        var IndexOfDelMessage = prompt("DeletIng Message By their No");
        console.log("Working")
        for (let index = 0; index < userArray.length; index++) {
            if (IndexOfDelMessage == index) {
                userArray.splice(index,1)
                result.innerHTML = `Message ${index} deleted Succcessfuly!`;
            } 
        }
        localStorage.setItem("UserArray",JSON.stringify(userArray));  // data stored in local storage
    }  
    else  
    {  
        alert("OOPS! Your Browser Not Supporting LocalStorage Please Update It!")  
    }  
    // var delUser = prompt();
    // for (let index = 0; index < userArray.length; index++) {
    //     if (delUser === userArray[index]) {
    //         userArray.splice(index, 1);
    //         result.innerHTML = "Succcessfuly user deleted!";
    //         break;
    //     }else if(index === userArray.length - 1){
    //         result.innerHTML = "you entered wrong user for deletion!";
    //     }
    // }
    // localStorage.setItem("UserArray",JSON.stringify(userArray));  // data stored in local storage
    // if (userArray == '') {
    //     localStorage.removeItem("UserArray");
    // }
}
// login.onclick = function name() {
//     var loginUser = prompt();
//         for (let index = 0; index < userArray.length; index++) {
//         if (loginUser === userArray[index]) {
//             result.innerHTML = "Successfuly login!";
//         }
//     }
// }
