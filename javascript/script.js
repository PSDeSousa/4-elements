//Burger-------------------------------------------------------------------------------------------------------------------------------
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


//Gallery--------------------------------------------------------------------------------------------------------------------------

//Variables gallery Cell de la page
let galleries = document.querySelectorAll(".gallery-row");
let cells = ""

galleries.forEach(function(g){
    cells = g.querySelectorAll(".cell");
    cells.forEach(function(c){
        c.addEventListener("mouseenter", function(){
            reverseImages(g);
            gsap.fromTo(c, {
                duration: 0.8, // en secondes dans GSAP
                scale: 1.1, //permet changer taille
                ease: "power2out" //permet lier à une animation, ici rebond
              },
              {
                duration: 0.8, // en secondes dans GSAP
                scale: 1, //permet changer taille
                ease: "power2out" //permet lier à une animation, ici rebond
              });
        })
        c.addEventListener("mouseleave", function(){
            reverseImages(g);
            gsap.fromTo(c, {
                duration: 0.8, // en secondes dans GSAP
                scale: 1.1, //permet changer taille
                ease: "power2out" //permet lier à une animation, ici rebond
              },
              {
                duration: 0.8, // en secondes dans GSAP
                scale: 1, //permet changer taille
                ease: "power2out" //permet lier à une animation, ici rebond
              });
        })
    })
})



function reverseImages(carousel){
        if(carousel.classList.contains("right-card")){
            carousel.classList.remove("right-card");
            carousel.classList.add("left-card");
        }else if(carousel.classList.contains("left-card")){
            carousel.classList.remove("left-card");
            carousel.classList.add("right-card");
        }else{
            carousel.classList.add("left-card");
        }
    }

//Carousels--------------------------------------------------------------------------------------------------------------------------
//Au click on avance ou recul le carousel

//Variables carousel Service de la page
let service = document.getElementById("service");
let serviceCarousel = document.getElementById("serviceCarousel");
let serviceCards = document.querySelectorAll(".service-card");
let nbScrollService = 0;
let nbServiceCards = serviceCards.length;
let serviceCardWidth = (document.getElementById("serviceCarousel").scrollWidth / nbServiceCards);
let leftServiceCard = 0;
let serviceSens = 0;
console.log(document.getElementById("serviceCarousel").scrollWidth);
console.log(document.getElementById("service").clientWidth);
//Capte les scroll sur le carousel
serviceCards.forEach(function(c,k){
    c.addEventListener("click", function(){
        let nbScrollLimit = nbServiceCards - Math.ceil(service.clientWidth / serviceCardWidth);
        let result = carouselMove(k, leftServiceCard,serviceCardWidth,nbScrollService,serviceCarousel,nbScrollLimit,nbServiceCards, serviceSens);
        leftServiceCard = result[0];
        nbScrollService = result[1];
        serviceSens = result[2];
    })
})

//Variables carousel Activity de la page
let activity = document.getElementById("activity");
let activityCarousel = document.getElementById("activityCarousel");
let activityCards = document.querySelectorAll(".activity-card");
let nbScrollActivity = 0;
let nbActivityCards = activityCards.length;
let activityCardWidth = (document.getElementById("activityCarousel").scrollWidth / nbActivityCards);
let leftActivityCard = 0;
let activitySens = 0;
console.log(document.getElementById("activityCarousel").scrollWidth);
console.log(document.getElementById("activity").clientWidth);
//Capte les scroll sur le carousel
activityCards.forEach(function(c,k){
    c.addEventListener("click", function(){
        let nbScrollLimit = nbActivityCards - Math.ceil(activity.clientWidth / activityCardWidth);
        let result = carouselMove(k, leftActivityCard,activityCardWidth,nbScrollActivity,activityCarousel,nbScrollLimit,nbActivityCards, activitySens);
        leftActivityCard = result[0];
        nbScrollActivity = result[1];
        activitySens = result[2];
    })
})



//Fonction pour parcourir le carousel en cliquant sur les cards

function carouselMove(i,lCard ,w,nbScroll,carousel, nLimit, nCard, sens){
    if(nLimit === nCard - 1){
        if(lCard === nCard -1 ){
            sens = 1;
        }else if(lCard === 0){
            sens = -1;
        }
    }else if(i === lCard){
            sens = 1;
        }else{
            sens = -1;
        }     
    console.log("limit " + nLimit);
    console.log(lCard);
    if((Math.abs(nbScroll + sens) <= (nLimit + 1)) &&  ((nbScroll + sens) < 1)){
        lCard = lCard - sens;
        nbScroll = nbScroll + sens;
    }else{
        if(carousel.classList.contains("right-card")){
            carousel.classList.remove("right-card");
            carousel.classList.add("left-card");
        }else if(carousel.classList.contains("left-card")){
            carousel.classList.remove("left-card");
            carousel.classList.add("right-card");
        }else{
            carousel.classList.add("left-card");
        }
    }
    //carousel.style.transform = "translateX(" + (w * nbScroll) + "px)";
    //mouvement dynamisé avec GSAP
    gsap.to(carousel, {
        duration: 1.5, // en secondes dans GSAP
        x: w * nbScroll, //pour que soit pas visible avant animation
        ease : "power2out"
      })
    return [lCard, nbScroll, sens];
}


