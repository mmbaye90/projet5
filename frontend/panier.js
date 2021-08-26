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
    // element.addEventListener("click", (event) => {
    //     event.preventDefault();

//     const idSelectionne = element.dataset.id

//     let elmtSupByUser = prdtEnrgDansLeLocalStrge.find(p => p.idProduit == idSelectionne)

//     prdtEnrgDansLeLocalStrge = prdtEnrgDansLeLocalStrge.filter(el => el.idProduit !== elmtSupByUser)
//     console.log(prdtEnrgDansLeLocalStrge)

// })
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
    localStorage.setItem("nom", document.querySelector("#nom").value);
    localStorage.setItem("prenom", document.querySelector("#prenom").value);
    localStorage.setItem("mail", document.querySelector("#mail").value);
    localStorage.setItem("adresse", document.querySelector("#adresse").value);
    localStorage.setItem("codePostale", document.querySelector("#codePostale").value);
    localStorage.setItem("ville", document.querySelector("#ville").value);

})