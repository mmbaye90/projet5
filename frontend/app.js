getArticles()

function getArticles() {
    fetch("http://localhost:3000/api/cameras")
        .then(response => response.json())
        .then(datas => datas.forEach(article => {

                //Récupération de l'élément html
                const elmt = document.getElementById("temp")
                    //clone de l'élément
                const clone = document.importNode(elmt.content, true)
                    // selection et affichage des résultats obtenus du serveur
                clone.getElementById("image").src = article.imageUrl
                clone.getElementById("nomproduit").textContent = article.name
                clone.getElementById("prix").textContent = article.price / 100 + " €"
                clone.getElementById("descrip").textContent = article.description
                clone.getElementById("bloca").href += "?=" + article._id
                document.getElementById("sectionproduit").appendChild(clone)
            })

        )
        .catch(error => alert(err));
}