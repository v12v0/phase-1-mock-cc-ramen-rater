document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/ramens")
        .then(Response => Response.json())
        .then(ramen => renderRamens(ramen))
})

// grabs the ramen menu div
const ramenMenu = document.querySelector("#ramen-menu")

// grabs the particular ramen that you clicked 
function fetchRamen(ramen) {
    fetch(`http://localhost:3000/ramens/${ramen.id}`)
        .then(Response => Response.json())
        .then(ramen => renderRamen(ramen))
}

//renders the ramen into the menu
function renderRamens(ramens) {
    ramens.forEach(ramen => {
        const ramenImage = document.createElement("img") //create an image tag for each ramen
        ramenImage.setAttribute("src", ramen.image) //points to the source for each of the ramen image
        ramenImage.setAttribute("id", ramen.id) // points to the source for each of the ramen id
        ramenImage.addEventListener("click", () => fetchRamen(ramen)) //assigns a click event to each of the image & invokes the cb function 
        ramenMenu.appendChild(ramenImage) // appends the ramen images into the menu via DOM
    });
}

function renderRamen(ramen) {
    //getting the raman image and putting it in the image 
    const ramenImage = document.querySelector(".detail-image") //grabbing the img tag
    ramenImage.setAttribute("src", ramen.image) // setting the src of the img tag to the ramen.image 
    ramenImage.innerHTML = ramen.image // replacing what was there before with the new ramen immage

    //getting ramen name and putting it in the placeholder
    const ramenName = document.querySelector(".name")
    ramenName.innerHTML = ramen.name

    // getting restaurant and putting it in the placeholder 
    const restaurant = document.querySelector(".restaurant")
    restaurant.innerHTML = ramen.restaurant

    // getting rating and putting it in the placeholder 
    const rating = document.querySelector("#rating-display")
    rating.innerHTML = ramen.rating

    // getting comment and putting it in the placeholder 
    const comment = document.querySelector("#comment-display")
    comment.innerHTML = ramen.comment
}

const createButton = document.querySelector("form") // grabs the create button
createButton.addEventListener("submit", newRamenInfo) // upon clicking the submit, it invokes the cb function


function newRamenInfo(e) {
    e.preventDefault()
    let ramenObj = {
        name: e.target.newName.value,
        restaurant: e.target.newRestaurant.value,
        image: e.target.newImage.value,
        rating: e.target.newRating.value,
        comment: e.target.newComment.value,
    }
    console.log(ramenObj)
    addNewRamen(ramenObj)
}

function addNewRamen(ramenObj){
    const ramenImage = document.createElement("img") //create an image tag for each ramen
        ramenImage.setAttribute("src", ramenObj.image) //points to the source for each of the ramen image
        ramenImage.setAttribute("id", ramenObj.id) // points to the source for each of the ramen id
        ramenImage.addEventListener("click", () => fetchRamen(ramenObj)) //assigns a click event to each of the image & invokes the cb function 
        ramenMenu.appendChild(ramenImage) // appends the ramen images into the menu via DOM

    fetch("http://localhost:3000/ramens", {
    method:'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(ramenObj)
    })
    .then(Response => Response.json())
    .then(ramen => console.log(ramen))
}
