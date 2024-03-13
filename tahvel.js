// ==UserScript==
// @name         Tahvel
// @namespace    http://tahvel.edu.ee/
// @version      2024-03-08
// @description  try to take over the world!
// @author       Travis Sova
// @match        *tahvel.edu.ee*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let url = location.href;

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


    function login(){

        addBackground()

        var loginDelete = document.querySelectorAll('#main-toolbar, #content-and-sidenav-wrapper, #footer');

        loginDelete.forEach(function (element) {
            element.style.display = "none";
        });

        document.getElementById("login-button").click();
    }

    if (!checkCookie("XSRF-TOKEN")) {
        login()
    }

    document.querySelector('#user-menu-button').addEventListener("click", function() {
        document.querySelector('#user-menu-content > md-menu-item:nth-child(4) > button:nth-child(1)').addEventListener("click", function() {
            login()
        });
    });

})();
