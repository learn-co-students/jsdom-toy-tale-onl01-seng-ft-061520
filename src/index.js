// let addToy = false;

// const addBtn = document.querySelector("#new-toy-btn");
// const toyFormContainer = document.querySelector(".container");

// function fetchToys() {
//   return fetch("http://localhost:3000/toys").then((resp) => resp.json);
// }

// fetchToys().then((toys) => {
//   toys.forEach((toy) => {
//     renderToys(toy);
//   });
// });

// function renderToys(toy) {
//   //add to div id toy collection class card, h2 name, img src, p with likes, button for like

//   const h2 = document.createElement("h2");
//   h2.innerText = toy.name;

//   const toyPic = document.createElement("img");
//   toyPic.setAttribute("src", toy.image);
//   toyPic.setAttribute("class", "toy-avatar");

//   const toyP = document.createElement("P");
//   toyP.innerText = `${toy.likes} likes`;

//   const toyButton = document.createElement("BUTTON");
//   toyButton.setAttribute("class", "like-toyButton");
//   toyButton.setAttribute("id", toy.id);
//   toyButton.innerText = "like";
//   toyButton.addEventListener("click", (e) => {
//     console.log(e.target.dataset);
//     likes(e);
//   });

//   // const toyDiv = document.getElementById("toy_collection")
//   // const toyName = document.createElement("toyName")
//   const toyDiv = document.createElement("DIV");
//   toyDiv.setAttribute("class", "card");
//   toyDiv.append(h2, toyPic, toyP, toyButton);
// }

// fetch("http://localhost:3000/toys", {
//   method= "POST",
//   headers:
//   {
//     "Content-Type": "application/json",
//     Accept: "application/json"
//   }
//   body: JSON.stringify({
//     "name": name,
//     "image": image,
//     "likes": 0
//   })
// })

//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });
const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;
let divCollect = document.querySelector("#toy-collection");

function getToys() {
  return fetch("http://localhost:3000/toys").then((res) => res.json());
}

function postToy(toy_data) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: toy_data.name.value,
      image: toy_data.image.value,
      likes: 0,
    }),
  })
    .then((res) => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy);
      divCollect.append(new_toy);
    });
}

function likes(e) {
  e.preventDefault();
  let more = parseInt(e.target.previousElementSibling.innerText) + 1;

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: more,
    }),
  })
    .then((res) => res.json())
    .then((like_obj) => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    });
}

function renderToys(toy) {
  let h2 = document.createElement("h2");
  h2.innerText = toy.name;

  let img = document.createElement("img");
  img.setAttribute("src", toy.image);
  img.setAttribute("class", "toy-avatar");

  let p = document.createElement("p");
  p.innerText = `${toy.likes} likes`;

  let btn = document.createElement("button");
  btn.setAttribute("class", "like-btn");
  btn.setAttribute("id", toy.id);
  btn.innerText = "like";
  btn.addEventListener("click", (e) => {
    console.log(e.target.dataset);
    likes(e);
  });

  let divCard = document.createElement("div");
  divCard.setAttribute("class", "card");
  divCard.append(h2, img, p, btn);
  divCollect.append(divCard);
}

addBtn.addEventListener("click", () => {
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    toyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      postToy(event.target);
    });
  } else {
    toyForm.style.display = "none";
  }
});

getToys().then((toys) => {
  toys.forEach((toy) => {
    renderToys(toy);
  });
});
