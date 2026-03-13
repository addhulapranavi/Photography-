/* SHOW USER */

let user = localStorage.getItem("userEmail");

if(user){
document.getElementById("welcome").innerHTML = "Welcome " + user;
}


/* DARK MODE */

function toggleDarkMode(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
localStorage.setItem("mode","dark");
}else{
localStorage.setItem("mode","light");
}

}

if(localStorage.getItem("mode")=="dark"){
document.body.classList.add("dark");
}


/* LIKE BUTTON */

function likePhoto(el){
el.classList.toggle("liked");
}


/* COMMENTS */

function addComment(btn){

let card = btn.parentElement;

let input = card.querySelector(".commentInput");
let list = card.querySelector(".commentList");

if(input.value==""){
alert("Write comment");
return;
}

let li = document.createElement("li");
li.innerText = input.value;

list.appendChild(li);

input.value = "";
}


/* RATING SYSTEM */

let ratings = {};

document.querySelectorAll(".rating").forEach((box)=>{

let stars = box.querySelectorAll("input");
let avgText = box.parentElement.querySelector(".avg");
let photo = box.dataset.photo;

ratings[photo] = {total:0,count:0};

stars.forEach((star)=>{

star.addEventListener("click",function(){

let value = parseInt(this.id.slice(-1));

ratings[photo].total += value;
ratings[photo].count++;

let avg = (ratings[photo].total/ratings[photo].count).toFixed(1);

avgText.innerHTML = "Average Rating: " + avg;

updateTopPhoto();

});

});

});


/* TOP PHOTO */

function updateTopPhoto(){

let bestPhoto = "";
let bestScore = 0;

for(let photo in ratings){

let avg = ratings[photo].total / ratings[photo].count;

if(avg > bestScore){
bestScore = avg;
bestPhoto = photo;
}

}

if(bestPhoto!=""){
document.getElementById("topPhoto").innerHTML =
"Top Rated Photo: " + bestPhoto + " ⭐ " + bestScore.toFixed(1);
}

}


/* UPLOAD IMAGE */

function uploadImage(){

let file = document.getElementById("uploadPhoto").files[0];

if(!file){
alert("Select photo");
return;
}

let reader = new FileReader();

reader.onload = function(e){

let gallery = document.getElementById("galleryContainer");

let card = document.createElement("div");
card.className = "card";

card.innerHTML =
`<img src="${e.target.result}">
<h3>User Photo</h3>`;

gallery.appendChild(card);

};

reader.readAsDataURL(file);

}