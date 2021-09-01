// Récupération de la réponse du serveur stocké dans le local Storage
const reponseServer = localStorage.getItem("retourServer");
console.log(reponseServer)
    //Récupération prix total
const recupPrixTotal = localStorage.getItem("PrixTotal");
console.log(`Prix total est : ${recupPrixTotal}`)