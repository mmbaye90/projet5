getArticles()

function getArticles() {
    fetch("http://localhost:3000/api/cameras")
        .then(response => response.json())
        .then(datas => datas.forEach(article => {
                console.log(article)
                const elmt = document.getElementById("temp")
                const clone = document.importNode(elmt.content, true)
                clone.getElementById("image").src = article.imageUrl
                clone.getElementById("nomproduit").textContent = article.name
                clone.getElementById("prix").textContent = article.price / (100) + "€"
                clone.getElementById("descrip").textContent = article.description
                clone.getElementById("bloca").href += "?=" + article._id
                document.getElementById("sectionproduit").appendChild(clone)
            })

        )
        .catch(error => alert(err));
}