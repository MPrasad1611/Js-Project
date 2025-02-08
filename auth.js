import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "./firebase.js";
  
  let signup = document.getElementById("signup");
  let signin = document.getElementById("signin");
  let btn = document.getElementById("btn");
  let btn2 = document.getElementById("bts");
  
  signup.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((e) => {
        if (e.user) {
          alert("User Created");
          signin.style.display = "inline-block";
          signup.style.display = "none";
          btn.style.display = "none";
          btn2.style.display = "inline-block";
        }
      })
      .catch((error) => {
        console.log(error), alert("User not created");
      });
  });
  signin.addEventListener("submit", (e) => {
      e.preventDefault();
      let email = e.target[0].value;
      let password = e.target[1].value;
      signInWithEmailAndPassword(auth, email, password)
          .then((e) => {console.log(e.user.accessToken);
          if (e.user.accessToken) {
              alert("User Signed In");
              location.assign("home.html");
          }
          })
          .catch((error) => {
          console.log(error), alert("User not signed in");
          });
  });
  btn.addEventListener("click", () => {
    signin.style.display = "inline-block";
    signup.style.display = "none";
    btn.style.display = "none";
    btn2.style.display = "inline-block";
  });
  btn2.addEventListener("click", () => {
    signin.style.display = "none";
    signup.style.display = "inline-block";
    btn2.style.display = "none";
    btn.style.display = "inline-block";
  });
  