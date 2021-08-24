let prdtEnrgDansLeLocalStrge = JSON.parse(localStorage.getItem("produit"))

if (prdtEnrgDansLeLocalStrge === null) {
    const panierVide = `<h3>votre panier est vide de vide </h3>`
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
                <p class="prix" id="prix"><strong>${element.prixProduit}</strong></p>
                <button class ="btn-supp">Supprimer</button>
                </div>
            </div>   
        </div>`
    });
    const blocSection = document.getElementById("sectionproduit")
    blocSection.innerHTML = formatPanier;
}