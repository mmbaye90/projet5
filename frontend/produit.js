//Appel de la fonction
geturl()


function geturl() {
    //avec cette API de window,je récupére l'URL actuel
    const win = window.location.search;
    // je je supprime tous les elements sauf l'Id renvoyé
    const id = win.slice(2)
        // j'effectue ma requette GET avec la méthode fetch, cette fois ci en lui passant un ID
    fetch(`http://localhost:3000/api/cameras/${id}`)
        .then(resp => resp.json())
        .then(datas => {
                console.log(datas)
                    //Je récupere mes elements html et j'affiche la réponse duu server
                document.getElementById("image").src = datas.imageUrl
                document.getElementById("nomproduit").textContent = datas.name
                document.getElementById("prix").textContent = datas.price / 100 + " €"
                document.getElementById("descrip").textContent = datas.description
                    //je déclare ma variable me permettant d'introduire à chaque tour de boucle la nouvelle donnée
                let contain = "";
                //je fais une destructuration sur les lenses et je fais une boucle 
                const { lenses } = datas
                lenses.forEach(element => {
                    //récupération element html avec les données
                    contain += ` <option value="${element}">${element}</option>`
                        //Affichage
                    document.getElementById("selection").innerHTML = contain
                });

                //Fonctionalité pour ajouter un produit au panier
                //je cible le bouton
                const boutonAjout = document.getElementById("btn");
                //j'écoute le clique
                boutonAjout.addEventListener("click", e => {
                    e.preventDefault();
                    //je récupére l'element parent du html
                    const selected = document.getElementById("selection");
                    //Je récupére la valeur sélectionée
                    const choiceLensesByUser = selected.value
                        //Je construis ma variable objet à envoyer dans LS avec les données récupérées du server
                    const optionUtilisateur = {
                            imageProduit: datas.imageUrl,
                            nomProduit: datas.name,
                            prixProduit: datas.price / 100,
                            decripProduit: datas.description,
                            idProduit: datas._id,
                            choixLenses: choiceLensesByUser,
                            quantite: 1
                        }
                        /*Déclaration variable dans laquelle sera stocké les values & key
                        de la key contenu dans le LS en format JS*/
                    let prdtEnrgDansLeLocalStrge = JSON.parse(localStorage.getItem("produit"))

                    //je crée la key avec une condition
                    if (prdtEnrgDansLeLocalStrge) {
                        //Ajout d'une key à chaque fois que le user en sélectionne une
                        prdtEnrgDansLeLocalStrge.push(optionUtilisateur);
                        //je la stocke dans le LS
                        localStorage.setItem("produit", JSON.stringify(prdtEnrgDansLeLocalStrge))

                    } else {
                        //j'utilise la variable en JS :prdtEnrgDansLeLocalStrge pour declarer un tab vide
                        prdtEnrgDansLeLocalStrge = [];
                        //j'y stocke  les valeurs selectionnées par le user et le stocke dans le LS
                        prdtEnrgDansLeLocalStrge.push(optionUtilisateur);
                        localStorage.setItem("produit", JSON.stringify(prdtEnrgDansLeLocalStrge))

                    }

                    //Je récupére la long du tab et la met  dans le panier
                    const count = prdtEnrgDansLeLocalStrge.length
                    document.getElementById("count").textContent = count
                });

            }


        )
        .catch(err => alert(err))
}