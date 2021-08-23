geturl()

function geturl() {
    const win = window.location.search;
    const id = win.slice(2)
    fetch(`http://localhost:3000/api/cameras/${id}`)
        .then(resp => resp.json())
        .then(datas => {
                console.log(datas)
                document.getElementById("image").src = datas.imageUrl
                document.getElementById("nomproduit").textContent = datas.name
                document.getElementById("prix").textContent = datas.price / (100) + "€"
                document.getElementById("descrip").textContent = datas.description

                let contain = "";
                const { lenses } = datas
                lenses.forEach(element => {
                    contain += ` <option value="${element}">${element}</option>`
                    document.getElementById("selection").innerHTML = contain
                });

                const boutonAjout = document.getElementById("btn");
                boutonAjout.addEventListener("click", e => {
                    e.preventDefault();
                    const selected = document.getElementById("selection");
                    const choiceLensesByUser = selected.value
                    const optionUtilisateur = {
                        imageProduit: datas.imageUrl,
                        nomProduit: datas.name,
                        prixProduit: datas.price / (100) + "€",
                        decripProduit: datas.description,
                        idProduit: datas._id,
                        choixLenses: choiceLensesByUser,
                        quantite: 1
                    }
                    const confirmChoice = () => {
                        if (window.confirm(`${datas.name} avec les lentilles ${choiceLensesByUser}ok pour ajouter au panier si non annuler pour revenir en arriere`)) {
                            window.location.href = "panier.html"
                        } else {
                            window.location.href = "index.html"
                        }
                    }
                    let prdtEnrgDansLeLocalStrge = JSON.parse(localStorage.getItem("produit"))
                    if (prdtEnrgDansLeLocalStrge) {
                        prdtEnrgDansLeLocalStrge.push(optionUtilisateur);
                        localStorage.setItem("produit", JSON.stringify(prdtEnrgDansLeLocalStrge))
                        confirmChoice()

                    } else {
                        prdtEnrgDansLeLocalStrge = [];
                        prdtEnrgDansLeLocalStrge.push(optionUtilisateur);
                        localStorage.setItem("produit", JSON.stringify(prdtEnrgDansLeLocalStrge))
                        confirmChoice()
                    }
                });

            }

        )
        .catch(err => alert(err))
}