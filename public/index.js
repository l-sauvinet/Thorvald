function toggleMenu() {
    var menuContent = document.querySelector(".menu_content");
    var toggleMenuBtn = document.getElementById("toggleMenuBtn");

    if (menuContent.classList.contains("closed")) {
        menuContent.classList.remove("closed");
        toggleMenuBtn.classList.add("rotate");
        toggleMenuBtn.style.left = '300px';
    } else {
        menuContent.classList.add("closed");
        toggleMenuBtn.classList.remove("rotate");
        toggleMenuBtn.style.left = '0';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var menuContent = document.querySelector(".menu_content");
    var toggleMenuBtn = document.getElementById("toggleMenuBtn");

    menuContent.classList.remove("closed");
    toggleMenuBtn.classList.add("rotate");
    toggleMenuBtn.style.left = '300px';
});
