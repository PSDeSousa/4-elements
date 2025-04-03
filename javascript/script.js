//Burger
let burgerMenu = document.getElementById("burgerMenu")
burgerMenu.addEventListener("click", function(){
    if(!burgerMenu.classList.contains("d-no")){
        mobileNav.classList.remove("d-no");
        closeMenu.classList.remove("d-no");
        burgerMenu.classList.add("d-no");
    }
})
let closeMenu = document.getElementById("closeMenu")
closeMenu.addEventListener("click", function(){
    if(!closeMenu.classList.contains("d-no")){
        mobileNav.classList.add("d-no");
        burgerMenu.classList.remove("d-no");
        closeMenu.classList.add("d-no");
    }
})