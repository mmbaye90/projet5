let prdtEnrgDansLeLocalStrge = JSON.parse(localStorage.getItem("produit"))

if (prdtEnrgDansLeLocalStrge === null || prdtEnrgDansLeLocalStrge == 0) {
    const panierVide = `<h3>votre panier est vide de vide</h3> `
    const blocSection = document.getElementById("sectionproduit")
    blocSection.innerHTML = panierVide
} else {
    let formatPanier = [];
    prdtEnrgDansLeLocalStrge.forEach(element => {

        formatPanier += ` 
        <div class="bloca" id="bloca">
            <div class="contener-photo">
                 <img id="image" class="image" src="${element.imageProduit}">
            </div>
            <div class="contener" id="contener">
                <div class="bloctexte" id="bloctexte">
                    <div class="bloc-nomprodt-lenses">
                        <h2 id="nomproduit" class="nomproduit">${element.nomProduit}</h2>
                        <p class="lentille"> Model : <strong>${element.choixLenses}</strong></p>
                    </div>
                    <p class="descrip" id="descrip">${element.decripProduit}</p>
                </div>
                <div class="contener-prix-supp">
                <p class="prix" id="prix"><strong>${element.prixProduit} €</strong></p>
                <button class="btn-supp">Supprimer</button>
                </div>
            </div>   
        </div>`


    });
    const blocSection = document.getElementById("sectionproduit")
    blocSection.innerHTML = formatPanier;
}

const btnClique = document.querySelectorAll(".btn-supp");
btnClique.forEach(function(name, index) {
    name.addEventListener("click", (e) => {
        e.preventDefault;
        const recupIdBtnClique = prdtEnrgDansLeLocalStrge[index].idProduit
        prdtEnrgDansLeLocalStrge = prdtEnrgDansLeLocalStrge.filter(el => el.idProduit !== recupIdBtnClique)
        console.log(prdtEnrgDansLeLocalStrge)
        localStorage.setItem("produit", JSON.stringify(prdtEnrgDansLeLocalStrge))

        window.location.href = "panier.html"
    })
})
const ajoutBtnSupp = `<button class="suppAll">Vider le panier</button>`;
const blocSection = document.getElementById("sectionproduit")
blocSection.insertAdjacentHTML("beforeend", ajoutBtnSupp)
const supp = document.querySelector(".suppAll")
supp.addEventListener("click", (e) => {
    e.preventDefault;
    localStorage.removeItem("produit")
    alert("attention vous vider votre panier")
    location.href = "panier.html"
})

let tabPrix = [];
prdtEnrgDansLeLocalStrge.forEach(function(el, index) {
    const prixRecupere = prdtEnrgDansLeLocalStrge[index].prixProduit
    tabPrix.push(prixRecupere)
    console.log(tabPrix)

})
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const prixTotal = tabPrix.reduce(reducer, 0);

const printPrix = `<di><strong>Prix-Total : ${prixTotal} €</strong></div>`
blocSection.insertAdjacentHTML("afterbegin", printPrix)



const btnCommander = document.getElementById("btnCommander");
btnCommander.addEventListener("click", (e) => {
    e.preventDefault
    const valFormulaire = {
        nom: document.querySelector("#nom").value,
        prenom: document.querySelector("#prenom").value,
        mail: document.querySelector("#mail").value,
        adresse: document.querySelector("#adresse").value,
        codePostal: document.querySelector("#codePostal").value,
        ville: document.querySelector("#ville").value,
    }

    const verifStringNom = (value) => {
        return /^[A-Za-z]{3,20}$/.test(value);
    }

    function verifNom() {
        const recupNom = valFormulaire.nom
        if (verifStringNom(recupNom)) {
            return true
        } else {
            alert("entrez un nom compris entre 3 et 20 mots\n sans caracteres speciaux, ni space ")
            return false
        }
    }


    const verifStrPrenonVille = (value) => {
        return /^([A-Za-z]{3,20})?([-]){0,1}?([A-Za-z]{3,20})$/.test(value);
    }

    function verifPrenom() {
        const recupPrenom = valFormulaire.prenom;
        if (verifStrPrenonVille(recupPrenom)) {
            return true
        } else {
            alert("veuillez saisir un prenom valide entre 3 et 20 lettres\n sans caracteres speciaux sauf le tiret")
            return false
        }
    }

    function verifVille() {
        const recupVille = valFormulaire.ville;
        if (verifStrPrenonVille(recupVille)) {
            return true
        } else {
            alert("veuillez saisir un nom de ville valide : \n ou composé avec un tiret")
            return false
        }
    }
    const verifCp = (value) => {
        return /^[0-9]{5}$/.test(value)
    }

    function verifCodPostale() {
        const recupCp = valFormulaire.codePostal
        if (verifCp(recupCp)) {
            return true
        } else {
            alert("Veuillez entrer un Code postale de quatre chiffres")
            return false
        }
    }

    const verifAdresse = (value) => {
        return /^([0-9]{1,3}) ?([A-Za-z\s]{5,20})$/.test(value);
        // return /^[0-9]{1,3}(?:(?:[,. ]){1}[a-zA-Z]+)+$/.test(value)
    }

    function verifAd() {
        const recupAd = valFormulaire.adresse;
        if (verifAdresse(recupAd)) {
            return true
        } else {
            alert("Veuillez saisir une adresse identique à l'exemple")
            return false
        }
    }

    const validateEmail = (value) => {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }

    function verifMail() {
        const recupMail = valFormulaire.mail
        if (validateEmail(recupMail)) {
            return true
        } else {
            alert("Veuillez saisir un mail correcte")
            return false
        }
    }
    if (verifNom() && verifPrenom() && verifVille() && verifCodPostale() && verifAd() && verifMail()) {
        localStorage.setItem("valFormulaire", JSON.stringify(valFormulaire))
    } else {
        return false
    }

    const storageToSend = {
        prdtEnrgDansLeLocalStrge,
        valFormulaire
    }

})