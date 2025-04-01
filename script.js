//Récupérer un JSON
let donnees = [];//tableau miroir du JSON
const url = "";

fetch(url)
  .then(function(reponse) {
    return reponse.json();
  })
  .then(function(data) {
    donnees = data;

//Fonctions au chargement :


  })
  .catch(function(error) {
    console.error("Erreur lors du chargement du fichier JSON :", error);
  });