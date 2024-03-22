// ==UserScript==
// @name         Tahvel
// @namespace    http://tahvel.edu.ee/
// @version      2024-03-08
// @description  try to take over the world!
// @author       Travis Sova
// @match        *tahvel.edu.ee*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        GM_addStyle
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
        newDiv.setAttribute("style", "background: url('https://wallpaperaccess.com/full/235700.jpg'); z-index: 80; height: 100%; width: 100%; position: fixed; background-repeat: no-repeat; background-size: cover;");
        document.body.prepend(newDiv);
    }


    function login(){
        document.getElementById("login-button").click();
    }

    function logDelete(){
        var loginDelete = document.querySelectorAll('#main-toolbar, #content-and-sidenav-wrapper, #footer, .md-dialog-size > md-toolbar:nth-child(1)');

        loginDelete.forEach(function (element) {
            element.style.display = "none";
        });
    }

    function logBlur(){
        var loginBlur = document.querySelectorAll('.md-dialog-size, md-content.md-padding');

        loginBlur.forEach(function (element) {
            element.setAttribute("style", "background: rgba(0, 0, 0, 0.1); backdrop-filter: blur(40.33333206176758px);")
        });
    }

    if (!checkCookie("XSRF-TOKEN")) {
        login();
        addBackground();
        logDelete();
        logBlur();
    }

    document.querySelector('#user-menu-button').addEventListener("click", function() {
        document.querySelector('#user-menu-content > md-menu-item:nth-child(4) > button:nth-child(1)').addEventListener("click", function() {
            login();
            addBackground();
            setTimeout(logDelete, 840)
            setTimeout(logBlur, 840)
        });
    });

})();