// console.log("welcome")
shownotes();
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTtl = document.getElementById("addTtl");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }


    let myObj = {
        title: addTtl.value,
        text: addTxt.value
    }

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTtl.value = "";
    addTxt.value = "";
    // console.log(notesObj);
    shownotes();
})


//function to show elements from local storage 
function shownotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title" >${element.title}</h5>
            <p class="card-text"> ${element.text}</p>
            <button id="${index}" onclick="dltNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
    });

    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = "Nothing to show";
    }
}

//function to delete a note
function dltNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}


// function to search in search engine

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {

    let val = search.value.toLowerCase();
    let card = document.getElementsByClassName("card-body");
    Array.from(card).forEach(function (element) {

        let cardtxt1 = element.getElementsByTagName("h5")[0].innerText;
        let cardtxt2 = element.getElementsByTagName("p")[0].innerText;

        if (cardtxt1.includes(val) || cardtxt2.includes(val)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

