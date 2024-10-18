let singUpForm = document.querySelector("#singUpForm");
let userName = document.querySelector("#username");
let userEmail = document.querySelector("#email");
let userPassword = document.querySelector("#password")

let singUpData =  JSON.parse(localStorage.getItem("singUpData")) ||  [];

singUpForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("hi");

    let name = userName.value;
    let email = userEmail.value;
    let password = userPassword.value;

    console.log(name, email, password);


    if (name && email && password) {
        let obj = {
            name: name,
            email: email,
            password: password
        }


        singUpData.push(obj);

        console.log(singUpData);

        localStorage.setItem("users", JSON.stringify(singUpData))
        window.location.href = "login.html"

       
    } else {
        alert("fill Details")
    }


     userName.value="";
    userEmail.value="";
    userPassword.value="";

})