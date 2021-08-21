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
                        choixLenses: choiceLensesByUser
                    }
                    console.log(optionUtilisateur)
                });

            }

        )
        .catch(err => alert(err))
}