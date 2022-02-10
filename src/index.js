document.addEventListener("DOMContentLoaded", function () {
    fetch(" http://localhost:3000/ramens")
        .then(Response => Response.json())
        .then(ramens => renderRamens(ramens))


    const ramenMenu = document.querySelector("#ramen-menu")
    console.log(ramenMenu)

    function renderRamens(ramens) {
        ramens.forEach(ramen => {
            const ramenImage = document.createElement("img")
            ramenImage.setAttribute("src", ramen.image)
            ramenImage.setAttribute("id", ramen.id)
            ramenMenu.appendChild(ramenImage)
            
            ramenImage.addEventListener("click", () => fetchRamen(ramen) )

            console.log(ramenImage)
        });

    }
    function fetchRamen(ramen){
        fetch(`http://localhost:3000/ramens/${ramen.id}`)
        .then(Response => Response.json())
        .then(ramen => renderRamen(ramen))
    }

function renderRamen(ramen){
    //add image to the placeholder
    const ramenImage = document.querySelector(".detail-image")
    ramenImage.setAttribute("src",ramen.image)
    ramenImage.innerHTML = ramen.image

    // add name 
    const name = document.querySelector(".name")
    name.innerHTML = ramen.name

    //add restaurant 
    const restaurant = document.querySelector(".restaurant")
    restaurant.innerHTML = ramen.restaurant

    // add rating 
    const rating = document.querySelector("#rating-display")
    rating.innerHTML = ramen.rating

    // add comment 
    const comment = document.querySelector("#comment-display")
    comment.innerHTML = ramen.comment
}

document.querySelector("form").addEventListener("submit", newRamenInfo )


function newRamenInfo(event){
    event.preventDefault()
    
    let ramenObj = {
        name: event.target.newName.value,
        restaurant: event.target.newRestaurant.value,
        image: event.target.newImage.value,
        rating:  event.target.newRating.value,
        comment: event.target.newComment.value,
    }
    console.log(ramenObj)
    addNewRamen(ramenObj)

}

function addNewRamen(ramenObj){
    const ramenImage = document.createElement("img")
    ramenImage.setAttribute("src", ramenObj.image)
    ramenImage.setAttribute("id", ramenObj.id)
    ramenMenu.appendChild(ramenImage)
    
    ramenImage.addEventListener("click", () => fetchRamen(ramenObj) )


    fetch(" http://localhost:3000/ramens", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ramenObj)
    })
}







}) //dont remove