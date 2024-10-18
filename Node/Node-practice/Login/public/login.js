
let loginform = document.querySelector("#loginForm")

let data = JSON.parse(localStorage.getItem("users"));

loginform.addEventListener("submit", (e) => {
    e.preventDefault()

    let email = loginform.email.value;
    let password = loginform.password.value;

    console.log(email, password);

    console.log(data.email);

    let currentUser = data.find((ele, ind) => {
        return ele.email == email
    })


    if(email && password){

        if (currentUser) {
            if (password == currentUser.password) {
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                window.location="home.html"
            }else{
                alert("Wrong Details")
            }
    
        }
    }else{
        alert("fill Details")
    }
})