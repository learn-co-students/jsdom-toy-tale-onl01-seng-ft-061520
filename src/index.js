let addToy = false;

function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => makeToyCards(json))
}

function makeToyCards(toys) {
  const collection = document.querySelector('#toy-collection')
  toys.forEach(toy => {
    const div = document.createElement('div')
    div.className = "card"
    const h2 = document.createElement('h2')
    h2.innerText = toy.name
    div.appendChild(h2)
    const pic = document.createElement('img')
    pic.className = "toy-avatar"
    pic.src = toy.image
    div.appendChild(pic)
    const p = document.createElement('p')
    p.innerText = `${toy.likes} Likes`
    div.appendChild(p)
    const btn = document.createElement('button')
    btn.className = "like-btn"
    btn.innerText = "Like <3"
    div.appendChild(btn)
    collection.appendChild(div)
  })
}

function submitData(name, imageUrl, likes){
  let formData = {
    name: name,
    image: imageUrl,
    likes: likes
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  return fetch('http://localhost:3000/toys', configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      makeToyCards(object);
    })
    .catch(function(error) {
      alert("Bad things! Ragnarők!");
      document.body.append(error.message);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  fetchToys();
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      submitData();
    } else {
      toyFormContainer.style.display = "none";
    }
  });


});
