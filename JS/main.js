// ^ Start definition of variable
var signInEmailInput=document.getElementById("signInEmail");
var signInPasswordInput=document.getElementById("signInPassword");
var incorrect=document.querySelector(".incorrect");

var signUpNameInput=document.getElementById("signUpName");
var signUpEmailInput=document.getElementById("signUpEmail");
var signUnPasswordInput=document.getElementById("signUnPassword");

var cardWelcome=document.querySelector("#cardWelcome");
var hide=document.querySelector(".hide");

var userAccounts=[];
var nameuser=[];
var isEmailExists=0;
// ^ End definition of variable


// ^Local Storage
if (localStorage.getItem("Accounts") != null) {
    userAccounts = JSON.parse(localStorage.getItem("Accounts"));
  }
  
  if (localStorage.getItem("UsersName") != null) {
    nameuser = JSON.parse(localStorage.getItem("UsersName"));
  }
//^ Sign Up Page

// ^*this function Verifies the validity of the data if it is correct or not
 function validation(input){
    var regex={
        signUpName: /^[A-Z][a-zA-Z]{2,10}$/,
    signUpEmail: /^.{1,}(@gmail|@Gmail){1}\.com{1}$/,
    signUnPassword: /^[A-Z]{1}\w{1,9}$/,
    };
    var isValid=regex[input.id].test(input.value);
    if(isValid){
        input.nextElementSibling.classList.add("d-none");
    }else{
        input.nextElementSibling.classList.remove("d-none");
    }
    return isValid;
 }

//  ^*this Function take Email information From user and Add it to array[users Accounts]
 function addAcount() {
    if (
      validation(signUpNameInput) &&
      validation(signUpEmailInput) &&
      validation(signUnPasswordInput)
    ) {
      for (let i = 0; i < userAccounts.length; i++) {
        if (
          userAccounts[i].accountEmail
            .toLowerCase()
            .includes(signUpEmailInput.value.toLowerCase())
        ) {
          isEmailExists = 1;
          break;
        } else {
          isEmailExists = 0;
        }
      }
      console.log(isEmailExists);
  
      if (isEmailExists == 0) {
        let Account = {
          accountName: signUpNameInput.value,
          accountEmail: signUpEmailInput.value,
          accountPassword: signUnPasswordInput.value,
        };
  
        userAccounts.push(Account);
        localStorage.setItem("Accounts", JSON.stringify(userAccounts));
        clear();
        window.location.href = "../index.html";
      } else {
        Swal.fire({
          icon: "error",
          title: "This email already exists",
          text: "Please Enter another email !",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error in Account Information",
        text: "Please check that the data is correct!",
      });
    }
  }


// ^*this function Clear All inputs Form Values
  function clear(){
    if (document.title == "Login") {
        signInEmailInput.value = "";
        signInPasswordInput.value = "";
      } else if (document.title == "Sign Up") {
        signUpNameInput.value = "";
        signUpEmailInput.value = "";
        signUnPasswordInput.value = "";
      }
  }


// ^*This function checks whether the email and password match the database or not, and if they match, it takes me to the user page.
  function login(){
    if(userAccounts==0){
        incorrect.classList.remove("d-none");
    }else{
      for(let i = 0; i < userAccounts.length; i++) {
        if (
            signInEmailInput.value.toLowerCase() ==
              userAccounts[i].accountEmail.toLowerCase() &&
            signInPasswordInput.value.toLowerCase() ==
              userAccounts[i].accountPassword.toLowerCase()
          ) {
            nameuser.push(userAccounts[i].accountName);
            localStorage.setItem("UsersName", JSON.stringify(nameuser));
            clear();
            window.location.href = "Login Success Page/login.html";
            break;
          } else {
            incorrect.classList.remove("d-none");
          }
      } 
    }
  }


//  ^* this function change User Name when he Login Success And take Array to Return Last Name login to display it
  function welcomeName(nameuser) {
    if (document.title == "User Page") {
      cardWelcome.innerHTML = `Welcome ${nameuser[nameuser.length - 1]} `;
    }
  }
  welcomeName(nameuser);


// ^*this function change type input to text and if type input is text change it to password  if i Click in icon
if (document.title == "Login") {
  hide.addEventListener("click" , ()=>{
    if(signInPasswordInput.type == "password"){
      signInPasswordInput.type = "text";
    }
    else if (signInPasswordInput.type == "text"){
      signInPasswordInput.type = "password";
    }
  })
}