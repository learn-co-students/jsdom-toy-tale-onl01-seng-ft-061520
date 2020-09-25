let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    const createBtn = document.querySelector("input.submit");

			       
    addBtn.addEventListener("click", () => {
	// hide & seek with the form
	addToy = !addToy;
	if (addToy) {
	    toyFormContainer.style.display = "block";
	    toyFormContainer.addEventListener("submit", (event) => {
		event.preventDefault();
		createNewToy(event.target);
		toyFormContainer.style.display = "none";
	    });
	} else {
	    toyFormContainer.style.display = "none";
	}
    });

    const toyCollection = document.querySelector('#toy-collection');
    fetch("http://localhost:3000/toys")
	.then( (response) => response.json())
	.then( (toys) => {
	    toys.forEach( (toy) => {
		renderToy(toy);
	    });
	});
    function renderToy(toy){
    	let card = document.createElement("div");
	card.className = "card";
	document.body.appendChild(card);
	let name = document.createElement("h2");
	name.innerText = toy.name;
	card.appendChild(name);
	let img = document.createElement("img");
	img.src = toy.image;
	img.className = "toy-avatar";
	card.appendChild(img);
	let likes = document.createElement("p");
	likes.innerText = toy.likes
	card.appendChild(likes);
	let likeButton = document.createElement("button");
	likeButton.innerText = "Like <3";
	likeButton.className = "like-btn";
	likeButton.setAttribute('id', toy.id)
	card.appendChild(likeButton);
	likeButton.addEventListener("click", (event) => {
	    console.log(event.target.id);
	    console.log(event.target.previousSibling.innerText);
	    addLike(event);
	});

    };

    function addLike(e){
	const newLikes = parseInt(e.target.previousSibling.innerText) + 1;
	fetch(`http://localhost:3000/toys/${e.target.id}`, {
	    method: "PATCH",
	    headers:
	    {
		"Content-Type": "application/json",
		Accept: "application/json"
	    },
	    body: JSON.stringify({
		"likes": newLikes
	    })})
	   .then( response => response.json())
	   .then( (toy) => {
	       e.target.previousSibling.innerText = newLikes;
	   })
   };

    function createNewToy(toy){
	fetch("http://localhost:3000/toys", {
	    method: "POST",
	    headers: 
	    {
		"Content-Type": "application/json",
		Accept: "application/json"
	    },
	    
	    body: JSON.stringify({
		"name": toy.name.value,
		"image": toy.image.value,
		"likes": 0
	    })})
	    .then( (response) => response.json())
	    .then( (toy) => {
		renderToy(toy);
	    })
    };
});
