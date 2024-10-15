// ==UserScript==
// @name         Tahvel
// @namespace    http://tahvel.edu.ee/
// @version      2024-03-08
// @description  Tahvel script
// @author       Travis Sova
// @match        *tahvel.edu.ee*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

const UPDATE_COOLDOWN = 100;
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

(function () {
    "use strict";

    function checkCookie(cookieName) {
        // Split document.cookie into individual cookies
        var cookies = document.cookie.split(';');

        // Loop through each cookie to find the one with the specified name
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim(); // Trim any leading or trailing whitespace

            // Check if the cookie starts with the specified name followed by '='
            if (cookie.indexOf(cookieName + '=') === 0) {
                // Return the value of the cookie
                return cookie.substring(cookieName.length + 1);
            }
        }

        // Return null if the cookie is not found
        return null;
    }

    function addBackground() {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("style", "background: url('https://images.pexels.com/photos/417202/pexels-photo-417202.jpeg?w=1920&h=1080'); z-index: 80; height: 100%; width: 100%; position: fixed;");
        document.body.prepend(newDiv);
    }

    function Login() {
        var myCookie = checkCookie("XSRF-TOKEN");

        if (myCookie != null) {
            console.log("Logged In");


            let updateQueued = false;
            const observer = new MutationObserver(() => {
                if (updateQueued) return;
                updateQueued = true;

                setTimeout(() => {
                    updateQueued = false;

                    Pages();
                }, UPDATE_COOLDOWN);
            });

            var config = { attributes: true, childList: true, subtree: true };
            observer.observe(document.body, config);

            return;
        } else {
            console.log("Not Logged In");
            addBackground();

            var loginDelete = document.querySelectorAll('#main-toolbar, #content-and-sidenav-wrapper, #footer');

            loginDelete.forEach(function (element) {
                element.style.display = "none";
            });

            document.getElementById("login-button").click();
            return;
        }
    }

    function Pages() {
        if (window.location.href === "https://tahvel.edu.ee/#/students/journals") {
            const headers = document.querySelectorAll("table>thead>tr");
            for (const header of headers) {
                if (header.children.length !== 7) continue;

                header.children[6].remove();
                header.children[3].remove();
                header.children[2].remove();
            }

            const containers = document.querySelectorAll("table>tbody");

            for (const container of containers) {
                if (container.children[0] === undefined) continue;
                if (container.children[0].children.length !== 7) continue;

                for (const child of container.children) {
                    child.children[6].remove();
                    child.children[3].remove();
                    child.children[2].remove();

                    const grades = child.querySelector("td.md-cell>span");

                    for (let i = 0; i < grades.children.length; i++) {
                        if (i % 2 === 0) {
                            const grade = grades.children[i].children[0];

                            if (grade.innerHTML === "2" || grade.innerHTML === "X") {
                                grade.classList.add("bad");
                            }
                        }
                    }
                }
            }

            const mainContent = document.getElementById("main-content");

            const nav = mainContent.querySelector("md-nav-bar");
            if (nav !== null) {
                nav.remove();
            }

            return;
        }
    }

    setTimeout(Login, 100);
})();