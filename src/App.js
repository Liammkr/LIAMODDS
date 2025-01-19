import React, { useEffect } from "react";
import { Toaster, toast } from "sonner";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyB_ve0_tAF3TbkH_sF9i8Td7EltJf_m_e0",
  authDomain: "liamkrodds.firebaseapp.com",
  databaseURL: "https://liamkrodds-default-rtdb.firebaseio.com",
  projectId: "liamkrodds",
  storageBucket: "liamkrodds.appspot.com",
  messagingSenderId: "62124083693",
  appId: "1:62124083693:web:d8650c5ede061bc666bfe4",
  measurementId: "G-ZLSBRFXPP0",
};

function App() {
  useEffect(() => {
    function isMobile() {
      return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    }
    window.prizepicksexportids = [];
    function handleBetButtonClick() {
      if (
        Array.isArray(window.prizepicksexportids) &&
        window.prizepicksexportids.length > 0
      ) {
        const projections = window.prizepicksexportids
          .map(
            ({ id, ou, line }) =>
              `${encodeURIComponent(id)}-${encodeURIComponent(
                ou
              )}-${encodeURIComponent(line)}`
          )
          .join(",");

        const webUrl = `https://prizepicks.onelink.me/gCQS/?projections=${projections}`;
        window.open(webUrl, "_blank");
      } else {
        console.error("No selections available to create a bet URL!");
        toast.error("No selections available!");
      }
    }
    function updateexports(element, id, line, ou) {
      const bet = document.getElementById("betonPP");
      const parent = element.parentElement.parentElement.parentElement;

      if (parent) {
        const computedStyle = window.getComputedStyle(parent);
        if (computedStyle.borderColor !== "rgb(99, 102, 241)") {
          // Add the object to the global array
          parent.style.borderColor = "rgb(99,102,241)";

          if (Array.isArray(window.prizepicksexportids)) {
            window.prizepicksexportids.push({ id, line, ou });
            console.log("Added:", { id, line, ou });
          } else {
            console.error("prizepicksexportids is not an array!");
          }
        } else {
          // Remove the object from the global array
          parent.style.borderColor = "rgba(18, 19, 32, 1)";

          if (Array.isArray(window.prizepicksexportids)) {
            window.prizepicksexportids = window.prizepicksexportids.filter(
              (item) => item.id !== id
            );
            console.log("Removed ID:", id);
          } else {
            console.error("prizepicksexportids is not an array!");
          }
        }

        console.log("Updated export IDs:", window.prizepicksexportids);
        if (bet && window.prizepicksexportids.length !== 0) {
          bet.style.display = "block";
        } else {
          bet.style.display = "none";
        }
      }
    }
    window.handleBetButtonClick = handleBetButtonClick;
    window.updateexports = updateexports;
    function papaer() {
      const responseContainer2 = document.getElementById("responseContainer");
      responseContainer2.innerHTML = "";
      var htmltest;
      htmltest = `<button class="shadow__btn" id="betonPP" style="display: none" onclick="handleBetButtonClick()">
  <span>
    <img src="https://cdn.prod.website-files.com/64b5f8bfc12b3ec8aef889d7/64e61222b6292fb6b7113f15_Favicon.png" alt="icon" />Bet
  </span>
</button>`;
      document.title = "Liam Odds | All Sports";
      if (isMobile()) {
        console.log("User is on a mobile device.");

        htmltest += '<div style="width:100%"class="grid-container">';
      } else {
        console.log("User is on a desktop device.");

        htmltest += '<div style="width:80%"class="grid-container">';
      }
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        user
          .getIdToken(true)
          .then((idToken) => {
            console.log("ID Token refreshed with new custom claims:", idToken);
            // Proceed with your logic using the updated token
          })
          .catch((error) => {
            console.error("Error refreshing ID Token:", error);
          });
        user
          .getIdTokenResult()
          .then((idTokenResult) => {
            console.log(idTokenResult.claims);
            if (idTokenResult.claims.premium) {
              console.log("User has access to premium content.");
              //document.getElementById("subscribetothis").remove();
              const dbRef = ref(database);
              get(child(dbRef, `/paidContent`))
                .then((data) => {
                  console.log(data.val());
                  const props = data.val();
                  console.log(props);
                  for (let i = 0; i < props.length; i++) {
                    console.log(props[i]);
                    if (props[i].over > props[i].under) {
                      htmltest +=
                        `<div class="card">
                            <img src="` +
                        props[i].url +
                        `" alt="` +
                        props[i].name +
                        `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                        props[i].sport +
                        " " +
                        props[i].name +
                        `</div>
                                </div>
                                <div class="points">
                                    ` +
                        props[i].line +
                        ` <span>` +
                        props[i].market +
                        `</span>
                                </div>
                                <div class="buttons">
                                    <button class="more">LESS</button>
                                    <button onclick="updateexports(this,` +
                        props[i].playerid +
                        `,` +
                        props[i].line +
                        `,'o')" class="right">MORE ` +
                        props[i].over +
                        `%</button>
                                </div>
                            </div>
                        </div>`;
                    } else {
                      htmltest +=
                        `<div class="card">
                            <img src="` +
                        props[i].url +
                        `" alt="` +
                        props[i].name +
                        `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                        props[i].sport +
                        " " +
                        props[i].name +
                        `</div>
                                </div>
                                <div class="points">
                                    ` +
                        props[i].line +
                        ` <span>` +
                        props[i].market +
                        `</span>
                                </div>
                                <div class="buttons">
                                <button onclick="updateexports(this,` +
                        props[i].playerid +
                        `,` +
                        props[i].line +
                        `,'u')" class="right">LESS ` +
                        props[i].under +
                        `%</button>
                                    <button class="more">MORE</button>
                                </div>
                            </div>
                        </div>`;
                    }
                  }
                  htmltest += "</div>";

                  responseContainer2.innerHTML = htmltest;
                })
                .catch((error) => {
                  console.error("Error fetching paid content:", error);
                  toast.error(
                    "Permission denied. Unable to access paid content."
                  );
                });

              console.log("User is paid");
            } else {
              console.log("User does not have access to premium content.");
              fetch(
                "https://firebasestorage.googleapis.com/v0/b/liamkrodds.appspot.com/o/uploads%2Ftop1.json?alt=media"
              )
                .then((response) => response.json())
                .then((data) => {
                  var mobileornot = 2;
                  if (isMobile()) {
                    console.log("User is on a mobile device.");
                    mobileornot = 1;
                  } else {
                    console.log("User is on a desktop device.");
                    mobileornot = 2;
                  }
                  if (data.over >= data.under) {
                    htmltest +=
                      `<div class="card">
                            <img src="` +
                      data.url +
                      `" alt="` +
                      data.name +
                      `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                      data.sport +
                      " " +
                      data.name +
                      `</div>
                                </div>
                                <div class="points">
                                    ` +
                      data.line +
                      ` <span>` +
                      data.market +
                      `</span>
                                </div>
                                <div class="buttons">
                                    <button class="more">LESS</button>
                                    <button class="right">MORE ` +
                      data.over +
                      `%</button>
                                </div>
                            </div>
                        </div>`;
                    for (let i = 0; i < 2; i++) {
                      htmltest +=
                        `<div class="card" style="filter: blur(10px)">
                            <img src="` +
                        data.url +
                        `" alt="` +
                        data.name +
                        `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                        data.sport +
                        " " +
                        data.name +
                        `</div>
                                </div>
                                <div class="points">
                                    ` +
                        data.line +
                        ` <span>` +
                        data.market +
                        `</span>
                                </div>
                                <div class="buttons">
                                    <button class="more">LESS</button>
                                    <button class="right">MORE ` +
                        data.over +
                        `%</button>
                                </div>
                            </div>
                        </div>`;
                    }
                  } else if (data.over < data.under) {
                    htmltest +=
                      `<div class="card ">
                            <img src="` +
                      data.url +
                      `" alt="` +
                      data.name +
                      `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                      data.sport +
                      " " +
                      data.name +
                      `</div>
                                </div>
                                <div class="points">
                                    ` +
                      data.line +
                      ` <span>` +
                      data.market +
                      `</span>
                                </div>
                                <div class="buttons">
                                    <button class="right">LESS ` +
                      data.under +
                      `%</button>
                                    <button class="more">MORE</button>
                                </div>
                            </div>
                        </div>`;
                    for (let i = 0; i < mobileornot; i++) {
                      htmltest +=
                        `<div class="card" style="filter: blur(10px)">
                            <img src="` +
                        data.url +
                        `" alt="` +
                        data.name +
                        `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                        data.sport +
                        " " +
                        data.name +
                        `</div>
                                </div>
                                <div class="points">
                                    ` +
                        data.line +
                        ` <span>` +
                        data.market +
                        `</span>
                                </div>
                                <div class="buttons">
                                    <button class="right">LESS ` +
                        data.under +
                        `%</button>
                                    <button class="more">MORE</button>
                                </div>
                            </div>
                        </div>`;
                    }
                  }
                  htmltest += "</div>";

                  responseContainer2.innerHTML = htmltest;
                });
              // Inform the user they do not have access
            }
          })
          .catch((error) => {
            console.error("Error fetching token result:", error);
          });
      } else {
        fetch(
          "https://firebasestorage.googleapis.com/v0/b/liamkrodds.appspot.com/o/uploads%2Ftop1.json?alt=media"
        )
          .then((response) => response.json())
          .then((data) => {
            var mobileornot = 2;
            if (isMobile()) {
              console.log("User is on a mobile device.");
              mobileornot = 1;
            } else {
              console.log("User is on a desktop device.");
              mobileornot = 2;
            }
            if (data.over >= data.under) {
              htmltest +=
                `<div class="card">
                            <img src="` +
                data.url +
                `" alt="` +
                data.name +
                `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                data.sport +
                " " +
                data.name +
                `</div>
                                </div>
                                <div class="points">
                                    ` +
                data.line +
                ` <span>` +
                data.market +
                `</span>
                                </div>
                                <div class="buttons">
                                    <button class="more">LESS</button>
                                    <button class="right">MORE ` +
                data.over +
                `%</button>
                                </div>
                            </div>
                        </div>`;
              for (let i = 0; i < 2; i++) {
                htmltest +=
                  `<div class="card" style="filter: blur(10px)">
                            <img src="` +
                  data.url +
                  `" alt="` +
                  data.name +
                  `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                  data.sport +
                  " " +
                  data.name +
                  `</div>
                                </div>
                                <div class="points">
                                    ` +
                  data.line +
                  ` <span>` +
                  data.market +
                  `</span>
                                </div>
                                <div class="buttons">
                                    <button class="more">LESS</button>
                                    <button class="right">MORE ` +
                  data.over +
                  `%</button>
                                </div>
                            </div>
                        </div>`;
              }
            } else if (data.over < data.under) {
              htmltest +=
                `<div class="card ">
                            <img src="` +
                data.url +
                `" alt="` +
                data.name +
                `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                data.sport +
                " " +
                data.name +
                `</div>
                                </div>
                                <div class="points">
                                    ` +
                data.line +
                ` <span>` +
                data.market +
                `</span>
                                </div>
                                <div class="buttons">
                                    <button class="right">LESS ` +
                data.under +
                `%</button>
                                    <button class="more">MORE</button>
                                </div>
                            </div>
                        </div>`;
              for (let i = 0; i < mobileornot; i++) {
                htmltest +=
                  `
                  <div class="card" style="filter: blur(10px)">
                            <img src="` +
                  data.url +
                  `" alt="` +
                  data.name +
                  `">
                            <div class="info">
                                <div class="player-info">
                                    <div>` +
                  data.sport +
                  " " +
                  data.name +
                  `</div>
                                </div>
                                <div class="points">
                                    ` +
                  data.line +
                  ` <span>` +
                  data.market +
                  `</span>
                                </div>
                                <div class="buttons">
                                    <button class="right">LESS ` +
                  data.under +
                  `%</button>
                                    <button class="more">MORE</button>
                                </div>
                            </div>
                        </div>
`;
              }
            }
            htmltest += "</div>";

            responseContainer2.innerHTML = htmltest;
          });
      }
    }
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getDatabase(app);

    const errorMessages = {
      "auth/user-not-found": "No user found with this email.",
      "auth/wrong-password": "Incorrect password.",
      "auth/email-already-in-use": "This email is already in use.",
      "auth/weak-password": "Password is too weak.",
      "auth/invalid-email": "Invalid email address.",
      "auth/user-disabled": "This user has been disabled.",
      "auth/popup-closed-by-user": "The popup has been closed by the user.",
      "auth/too-many-requests": "Too many requests. Please try again later.",
    };

    const showError = (error) => {
      const message =
        errorMessages[error.code] || "An unexpected error occurred.";
      toast.error(`${message} (Error code: ${error.code})`);
    };

    const handleGoogleSignIn = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          toast.success(`User signed in: ${result.user.displayName}`);
          document.getElementById("overlay").style.display = "none";
          document.getElementById("overlay2").style.display = "none";
          document.getElementById("overlay3").style.display = "none";
        })
        .catch((error) => {
          console.error("Error signing in: ", error);
          showError(error);
        });
    };

    const handleSignUp = () => {
      const email = document.getElementById("email2").value;
      const password = document.getElementById("password2").value;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success(`User signed up: ${user.email}`);
          document.getElementById("overlay").style.display = "none";
          document.getElementById("overlay2").style.display = "none";
          document.getElementById("overlay3").style.display = "none";

          // Assign a default role (e.g., 'user') to the newly signed-up user
        })
        .catch((error) => {
          console.error("Error signing up: ", error);
          showError(error);
        });
    };

    const handleLogIn = () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          toast.success(`User logged in: ${userCredential.user.email}`);
          localStorage.setItem("loggedin", userCredential.user.email);
          document.getElementById("overlay").style.display = "none";
          document.getElementById("overlay2").style.display = "none";
          document.getElementById("overlay3").style.display = "none";
        })
        .catch((error) => {
          console.error("Error logging in: ", error);
          showError(error);
        });
    };

    const handleResetPassword = () => {
      const email = document.getElementById("reset-email").value;
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Password reset email sent!");
        })
        .catch((error) => {
          console.error("Error sending password reset email: ", error);
          showError(error);
        });
    };
    const handleLogOut = () => {
      signOut(auth)
        .then(() => {
          toast.success("User logged out.");
          localStorage.setItem("loggedin", "");
        })
        .catch((error) => {
          console.error("Error logging out: ", error);
          showError(error);
        });
    };
    const starttopay = () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        fetch(
          "https://smiling-lively-fabrosaurus.glitch.me/create-checkout-session?email=" +
            user.email
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Network response was not ok " + response.statusText,
                toast.error("Error Checking Out")
              );
            }
            return response.json();
          })
          .then((data) => {
            window.location = data.url; // Handle the data received from the server
          });
      } else {
        toast.error("Please sign in or create account");
        document.getElementById("overlay").style.display = "flex";
      }
    };
    const portalrequest = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const useremailtemp = user.email;

        try {
          const response = await fetch(
            "https://smiling-lively-fabrosaurus.glitch.me/create-customer-portal-session",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ useremailtemp }), // Send user email in the request body
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json(); // Await JSON parsing
          window.location.href = data.url; // Redirect the user to the Customer Portal
        } catch (error) {
          console.error("Error opening customer portal:", error);
          alert("Failed to open customer portal. Please try again.");
        }
      } else {
        toast.error("Error Occurred: User is not authenticated");
      }
    };
    const loadpaid = () => {
      papaer();
    };
    const handlesubscribe = () => {
      function isValidEmail(email) {
        // Regular expression for validating an email
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        // Test the email string against the regex
        return emailRegex.test(email);
      }
      function addEmailIfNotExists(email) {
        const auth = getAuth();
        const user = auth.currentUser;
        if (isValidEmail(email)) {
          if (user) {
            set(ref(database, "emails/" + user.uid), {
              email: email,
              uid: user.uid,
            })
              .then(function () {
                //alert("Successfully Subscribed!");
                localStorage.setItem("emailsent", "emailrecieved");
                document.getElementById("notis").remove();
                toast.success("Successfully Subscribed");
              })
              .catch(function (error) {
                toast.error("Error adding email: ", error);
              });
          } else {
            toast.error("Please Sign In Or Create Account");
          }
        } else {
          toast.error("Please Enter A Valid Email");
        }
      }

      addEmailIfNotExists(document.getElementById("email-address").value);
    };
    onAuthStateChanged(auth, (user) => {
      if (localStorage.getItem("sport") === "best_sprt") {
        papaer();
      }
      if (user) {
        document.getElementById("in").style.display = "none";
        document.getElementById("up").style.display = "none";
        document.getElementById("out").style.display = "block";
        //document.getElementById("info").style.display = "block";
        console.log(user);
        if (user.photoURL != null) {
          var fullStyle = 'url("' + user.photoURL + '")';
          document.getElementById("out").style.backgroundImage = fullStyle;
        } else {
          document.getElementById("out").innerText = user.email.substring(0, 2);
        }
        if (user.displayName != null) {
          document.getElementById("info").textContent = user.displayName;
        } else if (user.email != null) {
          document.getElementById("info").textContent = user.email;
        }
        user.getIdTokenResult().then((idTokenResult) => {
          console.log(idTokenResult.claims);
          if (idTokenResult.claims.premium) {
            try {
              document.getElementById("subscribetothis").remove();
            } catch (error) {
              console.log("already del");
            }
          }
        });
      } else {
        document.getElementById("in").style.display = "block";
        document.getElementById("up").style.display = "block";
        document.getElementById("out").style.display = "none";
        //document.getElementById("info").style.display = "none";
      }
    });

    const googleSignInButton = document.getElementById("google-sign-in");
    const googleSignInButton2 = document.getElementById("google-sign-in2");
    const signUpButton = document.getElementById("sign-up");
    const logInButton = document.getElementById("log-in");
    const resetPasswordButton = document.getElementById("reset-password");
    const subscribeButton = document.getElementById("subscribe");
    const logoutbutton = document.getElementById("logout");
    const paystart = document.getElementById("payup");
    const bestsprt = document.getElementById("best");
    const portalbutton = document.getElementById("accountinfo");

    if (googleSignInButton)
      googleSignInButton.addEventListener("click", handleGoogleSignIn);
    if (googleSignInButton2)
      googleSignInButton2.addEventListener("click", handleGoogleSignIn);
    if (signUpButton) signUpButton.addEventListener("click", handleSignUp);
    if (logInButton) logInButton.addEventListener("click", handleLogIn);
    if (resetPasswordButton)
      resetPasswordButton.addEventListener("click", handleResetPassword);
    if (subscribeButton)
      subscribeButton.addEventListener("click", handlesubscribe);
    if (logoutbutton) logoutbutton.addEventListener("click", handleLogOut);
    if (paystart) paystart.addEventListener("click", starttopay);
    if (bestsprt) bestsprt.addEventListener("click", loadpaid);
    if (portalbutton) portalbutton.addEventListener("click", portalrequest);

    return () => {
      if (googleSignInButton)
        googleSignInButton.removeEventListener("click", handleGoogleSignIn);
      if (googleSignInButton2)
        googleSignInButton2.removeEventListener("click", handleGoogleSignIn);
      if (signUpButton) signUpButton.removeEventListener("click", handleSignUp);
      if (logInButton) logInButton.removeEventListener("click", handleLogIn);
      if (resetPasswordButton)
        resetPasswordButton.removeEventListener("click", handleResetPassword);
      if (subscribeButton)
        subscribeButton.removeEventListener("click", handlesubscribe);
      if (logoutbutton) logoutbutton.removeEventListener("click", handleLogOut);
      if (paystart) paystart.removeEventListener("click", starttopay);
      if (bestsprt) bestsprt.removeEventListener("click", loadpaid);
      if (portalbutton)
        portalbutton.removeEventListener("click", portalrequest);
    };
  }, []);

  return (
    <div>
      <Toaster richColors position="top-center" expand={true} theme="dark" />
    </div>
  );
}

export default App;
