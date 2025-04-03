function ouvrPage(){
    let page = modalReservation;
    if (page.classList.contains("d-no")){
        page.classList.remove("d-no");
        page.classList.add("d-block");
    }
}

function fermPage(){
    let page = modalReservation;
    if (page.classList.contains("d-block")){
            page.classList.remove("d-block");
            page.classList.add("d-no");
        }
}

//bouton fermer formulaire
document.getElementById("closeReservation").addEventListener("click", function(){
    fermPage();
})

//bouton reset formulaire
document.getElementById("resetReservation").addEventListener("click", function(){
    localStorage.clear()
    form.reset();
})


// Formulaire de réservation (modal)


//Local storage :
// Affiche les données sauvegardées au chargement de la page pour vérifier 
document.addEventListener("DOMContentLoaded", function () {
    let savedName = localStorage.getItem("fullname");
    let savedStreetNb = localStorage.getItem("streetNb");
    let savedStreet = localStorage.getItem("street");
    let savedPostal = localStorage.getItem("postal");
    let savedCity = localStorage.getItem("city");
    let savedEmail = localStorage.getItem("email");
    let savedPhone = localStorage.getItem("phone");
    let savedHotel = localStorage.getItem("hotel");
    let savedRoom = localStorage.getItem("room");
    let savedNbConvive = localStorage.getItem("nbConvive");
    let savedDateArr = localStorage.getItem("dateArr");
    let savedDateDep = localStorage.getItem("dateDep");
    if (savedName) {
        document.getElementById("fullname").value = savedName;
    }
    if (savedStreetNb) {
        document.getElementById("streetNb").value = savedStreetNb;
    }
    if (savedStreet) {
        document.getElementById("street").value = savedStreet;
    }
    if (savedPostal) {
        document.getElementById("postal").value = savedPostal;
    }
    if (savedCity) {
        document.getElementById("city").value = savedCity;
    }
    if (savedEmail) {
        document.getElementById("email").value = savedEmail;
    }
    if (savedPhone) {
        document.getElementById("phone").value = savedPhone;
    }
    if (savedHotel) {
        document.getElementById("hotel").value = savedHotel;
        hotel = document.getElementById("hotel").value;
        toggle(hotel === "feu",roomChoise);
    }
    if (savedRoom) {
        document.getElementById("room").value = savedRoom;
    }
    if (savedDateArr) {
        document.getElementById("dateArr").value = savedDateArr;
    }
    if (savedDateDep) {
        document.getElementById("dateDep").value = savedDateDep;
    }
    if (savedNbConvive) {
        document.getElementById("nbConvive").value = savedNbConvive;
    }
    });




const modalReservation = document.getElementById("modalReservation");
const form = document.getElementById("form");
//Emplacement erreur dans html
//Regex
const emailRegex = /^[^@\s]+@[^@\s]+.[^@\s]+$/;
const phoneRegex = /^[0-9\s-/]{10,14}$/;

//Formulaire affichage erreur :
function showError(fieldId, message) {
    let span = document.getElementById(fieldId + "Error");
    if (span) {
    span.textContent = message;
    console.log(message);
    formError = true;
    }
}
function initError(fieldId) {
    document.getElementById(fieldId + "Error").innerHTML = "";
    }


//Déclarations formulaire
let summary = document.getElementById("summary");
let diet = document.getElementById("diet");
let mealOption = document.getElementById("mealOption");
let hotel = document.getElementById("hotel").value.trim();
let room = document.getElementById("room").value.trim();
let roomChoise = document.getElementById("roomChoise");
let lgtOption = "";
let petitDej = document.getElementById("petitDej").checked;
let meal = document.getElementById("meal").checked;

//Tableau des tarifs
const tarifs= 
    {
        chauffeur: 11,
        petitDej: 15,
        guide: 20,
        meal: 25,
        igloo: 500,    
        suite: 850,
    }        

let prixTotal = 0;
// 1 jour en milisecondes
const oneDay = 24 * 60 * 60 * 1000;

let formError = false;


//Vérification des champs, sauvegarde des champs et affichage du résumé
form.addEventListener('submit', function(e) {
    e.preventDefault();
    //Initialisation
    formError = false;
    prixTotal = 0
    summary.innerHTML = "";

    //récupération et contrôles des infos du formulaire
    //
    // Nom
    // let fullname = document.getElementById("fullname").value.trim();
    initError("fullname");
    if(fullname.length < 2 || fullname.length > 50){
        showError("fullname","Prénom invalide (doit avoir entre 2 et 50 caractères)");
    }else{
        // Sauvegarde dans le localStorage
        localStorage.setItem("fullname", fullname);
    }
    //adresse
    let streetNb = document.getElementById("streetNb").value;
    initError("streetNb");
    if(streetNb < 1 || streetNb > 9999){
        showError("streetNb","le numéro de rue doit être numérique");
        }else{
            localStorage.setItem("streetNb", streetNb);
        }
    let street = document.getElementById("street").value.trim();
    initError("street");
    if(street.length < 5 || street.length > 150){
        showError("street","Nom de rue invalide (doit avoir entre 5 et 150 caractères)");
        }else{
            localStorage.setItem("street", street);
        }
    let postal = document.getElementById("postal").value.trim();
    initError("postal");
    if(postal < 1 || postal > 99999){
        showError("postal","Code postal invalide");
        }else{
            localStorage.setItem("postal", postal);
        }
    let city = document.getElementById("city").value.trim();
    initError("city");
    if(city.length < 2 || city.length > 100){
        showError("city","Ville invalide (doit avoir entre 5 et 100 caractères)");
        }else{
            localStorage.setItem("city", city);
        }

    //email
    let email = document.getElementById("email").value.trim();

    initError("email");
    if(!emailRegex.test(email) || email.length > 50){
        showError("email", "Format d'adresse email invalide");
        }else{
            localStorage.setItem("email", email);
        }
    
        //tel
    let phone = document.getElementById("phone").value.trim();
    //Vérification des données renseignées
    initError("phone");
    if(!phoneRegex.test(phone)){
        showError("phone","Format de numéro de téléphone invalide");
        }else{
            localStorage.setItem("phone", phone);
        }
    
    //Choix hotel
    hotel = document.getElementById("hotel").value.trim();
    initError("hotel");
    if((hotel === "")){
        showError("hotel","le choix de l'hôtel est nécessaire");
    }else{
        localStorage.setItem("hotel", hotel);
    }

    //Choix chambre
    room = document.getElementById("room").value.trim();
    initError("room");
    if((room === "")){
        showError("room","le choix de la chambre est nécessaire");
    }else{
        localStorage.setItem("room", room);
    }
    console.log(hotel);
    console.log(room);
    //Nb convives
    initError("nbConvive");
    let nbConvive = parseInt(document.getElementById("nbConvive").value);
    if(nbConvive < 1 || nbConvive > 2){
        showError("nbConvive","le nombre de convives doit être entre 1 et 2");
    }else{
        localStorage.setItem("nbConvive", nbConvive);
    }
    //Dates
    var today = new Date();
    var start = new Date(document.getElementById("dateArr").value);
    initError("dateArr");
    if (start < today) {
        showError("dateArr", "La date d'arrivée doit être supérieur à la date du jour");
        }else{
            localStorage.setItem("dateArr", document.getElementById("dateArr").value);
        }
    var end = new Date(document.getElementById("dateDep").value);
    initError("dateDep");
    if (end <= start) {
    showError("dateDep", "La date de départ doit être après l'arrivée");
    }else{
        localStorage.setItem("dateDep", document.getElementById("dateDep").value);
    }
    //Options
    let chauffeur = document.getElementById("chauffeur").checked;
    let guide = document.getElementById("guide").checked;
    petitDej = document.getElementById("petitDej").checked;
    meal = document.getElementById("meal").checked;
    let noRegime = document.getElementById("noRegime").checked;
    let vegan = document.getElementById("vegan").checked;
    let vegetarian = document.getElementById("vegetarian").checked;
    let lunch = document.getElementById("lunch").checked;
    let diner = document.getElementById("diner").checked;
    let ponctual = document.getElementById("ponctual").checked;
    initError("diet");
    if((!noRegime) && (!vegan) && (!vegetarian) && (petitDej || meal)){
        showError("diet","merci de choisir au moins un régime alimentaire");
    }
    initError("restriction");
    if((!noRegime) && (!vegan) && (!vegetarian) && (petitDej || meal)){
        showError("restriction","merci de choisir au moins une option");
    }
    initError("mealOption");
    if((!lunch) && (!diner) && (!ponctual) && (meal)){
        showError("mealOption","merci de choisir au moins une option");
    }
    //Calcul du prix :
    const nights = Math.round((end - start) / oneDay);

    if (chauffeur){
        prixTotal = prixTotal + tarifs.chauffeur * nights;
    }
    if (petitDej){
        prixTotal = prixTotal + tarifs.petitDej * nights * nbConvive;
    }
    //NB de repas
    if (meal){
        let nbMeal = 0;
        if (lunch){
            nbMeal = nbMeal + 1;
        }
        if(diner){
            nbMeal = nbMeal + 1;
        }
        prixTotal = prixTotal + tarifs.meal * nights * nbConvive*nbMeal;
    }
    if (guide){
        prixTotal = prixTotal + tarifs.guide;
    }
    if (room === "igloo"){
        prixTotal = prixTotal + tarifs.igloo * nights;
    }
    if (room === "suite"){
        prixTotal = prixTotal + tarifs.suite * nights;
    }
    console.log(hotel);
    console.log(room);
    //Affichage summuary
    if (!formError){
        let contenu = "<h3>Votre réservation :</h3>";
        contenu += "<p> Réservation pour " + nights + " nuit(s) et " + nbConvive + " convive(s)</p>"
        contenu += "<p> dans l'hôtel " + hotel + " dans un(e) " + room + "</p>";
        contenu += "<p>Pour un prix total de : " + prixTotal + " Euros</p>";
        summary.innerHTML = contenu;
        ouvrPage();
    }

})


//Fonction toggle
function toggle(tOption,tForm){
    if(tOption){
        tForm.style.display = "block";
    }else{
        tForm.style.display = "none";
    }
}


//Scrute le bouton hotel du formulaire
document.getElementById("hotel").addEventListener("change", function(){
    hotel = document.getElementById("hotel").value.trim();
    console.log(hotel);
    toggle(hotel === "feu",roomChoise);
})

//Scrute le bouton petitDej du formulaire
document.getElementById("petitDej").addEventListener("change", function(){
    petitDej = document.getElementById("petitDej").checked;
    meal = document.getElementById("meal").checked;
    toggle(meal || petitDej,diet);
})

//Scrute le bouton meal du formulaire
document.getElementById("meal").addEventListener("change", function(){
    petitDej = document.getElementById("petitDej").checked;
    meal = document.getElementById("meal").checked;
    toggle((meal || petitDej),diet);
    toggle((meal),mealOption);
})