const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false;
let div = document.getElementById("toy-collection");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json()
  }).then(function(json) {
    let toys = json
    toys.forEach(toy => {
      createToyCard(toy.id, toy.name, toy.image, toy.likes)
    })
  })
});

function addLike(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

function createToyCard(id, name, image, likes) {
  let h2 = document.createElement('h2')
  h2.innerText = name

  let img = document.createElement('img')
  img.setAttribute('src', image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    // debugger
    addLike(e)
  })

  let divCard = document.createElement("div")
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  
  div.appendChild(divCard)
}

function postToy(toy_data) {
  let formData = {
    "name": toy_data.name.value,
    "image": toy_data.image.value,
    "likes": 0
  };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch('http://localhost:3000/toys', configObj)
    .then(function(response) {
      return response.json();
    })
    .then((obj_toy) => {
      let new_toy = createToyCard(obj_toy.id, obj_toy.name, obj_toy.image, obj_toy.likes)
      div.append(new_toy)
    })
    .catch(function(error) {
      alert("Failed to add Toy");
      console.log(error.message);
    });
}

