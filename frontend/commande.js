// Récupération de la réponse du serveur stocké dans le local Storage
const reponseServer = localStorage.getItem("retourServer");
console.log(reponseServer)
    //Récupération prix total
const recupPrixTotal = localStorage.getItem("PrixTotal");
console.log(`Prix total est : ${recupPrixTotal}`)
const structurehtml = `<div class="print-valid-commande">
    <p class="remerciement"><strong>Merci pour votre commande</strong></p>
    <p class="numero-commande">Votre numéro de commande est le : <span class="numero">${reponseServer}</span></p>
    <p class="prixtotal"> Le montant total de votre commande est : <span class="prix">${recupPrixTotal}</span></p>
    </div>`;
const positionElmt = document.getElementById("sectionproduit");

positionElmt.innerHTML = structurehtml