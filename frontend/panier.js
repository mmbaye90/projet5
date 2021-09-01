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
})
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const prixTotal = tabPrix.reduce(reducer, 0);

const printPrix = `<di><strong>Prix-Total : ${prixTotal} €</strong></div>`
blocSection.insertAdjacentHTML("afterbegin", printPrix)



const btnCommander = document.getElementById("btnCommander");

btnCommander.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation();
    // *************************Récupérations des valeurs de forulaire******************************
    let firstName = document.querySelector("#prenom").value;
    let lastName = document.querySelector("#nom").value;
    let address = document.querySelector("#adresse").value;
    let city = document.querySelector("#ville").value;
    let email = document.querySelector("#mail").value;
    //***************************** */ Préparation de l'objet contact à envoyer*******************************
    let contact = {
        firstName,
        lastName,
        address,
        city,
        email,
    };
    //**************************** */préparation de l'id produit à envoyer**************************************
    let products = [];
    prdtEnrgDansLeLocalStrge.forEach(function(el, index) {
            const idRecupere = prdtEnrgDansLeLocalStrge[index].idProduit
            products.push(idRecupere)
        })
        //***************************Début fonctions et verification des inputs********************************
    const verifStringNom = (value) => {
        return /^[A-Za-z]{3,20}$/.test(value);
    }

    function verifNom() {
        // const recupNom = contact.lastName
        if (verifStringNom(lastName)) {
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
        // const recupPrenom = contact.firstName;
        if (verifStrPrenonVille(firstName)) {
            return true
        } else {
            alert("veuillez saisir un prenom valide entre 3 et 20 lettres\n sans caracteres speciaux sauf le tiret")
            return false
        }
    }

    function verifVille() {
        // const recupVille = contact.city;
        if (verifStrPrenonVille(city)) {
            return true
        } else {
            alert("veuillez saisir un nom de ville valide : \n ou composé avec un tiret")
            return false
        }
    }


    const verifAdresse = (value) => {
        return /^([0-9]{1,3}) ?([A-Za-z\s]{5,20})$/.test(value);
        // return /^[0-9]{1,3}(?:(?:[,. ]){1}[a-zA-Z]+)+$/.test(value)
    }

    function verifAd() {
        // const recupAd = contact.address;
        if (verifAdresse(address)) {
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
        // const recupMail = contact.email
        if (validateEmail(email)) {
            return true
        } else {
            alert("Veuillez saisir un mail correcte")
            return false
        }
    }

    //**************************************Fin verification inputs************************************/

    // ******************si toutes les inputs sont valides je stocke l'objet contact dans le LS

    if (verifNom() && verifPrenom() && verifVille() && verifAd() && verifMail()) {
        localStorage.setItem("contact", JSON.stringify(contact))
        localStorage.setItem("PrixTotal", JSON.stringify(prixTotal))

    } else {
        alert("remplir correctement le formulaire")

    }

    //***************************************** */Envoi données au server***************************************
    fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            body: JSON.stringify({ contact, products }),
            headers: {
                'Content-Type': 'application/json',
            }

        })
        .then(response => response.json())
        .then(response => {
            localStorage.setItem("retourServer", response.orderId)
            window.location.href = "confcommande.html"
        })
        .catch(error => {
            console.log(error)
        })

    // const toSend = {
    //     prdtEnrgDansLeLocalStrge,
    //     contact,
    // }





});
// donStorage = localStorage.getItem("contact");
// convDonneStorage = JSON.parse(donStorage);
// document.querySelector("#nom").value = convDonneStorage.lastName
// document.querySelector("#prenom").value = convDonneStorage.firstName
// document.querySelector("#mail").value = convDonneStorage.email
// document.querySelector("#adresse").value = convDonneStorage.adress
// document.querySelector("#ville").value = convDonneStorage.city