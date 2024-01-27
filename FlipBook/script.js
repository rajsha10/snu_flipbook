// References to DOM Elements
// const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector(".bg");
const nxt = document.querySelector("#firstSubmit");
const toTele = document.querySelector("#finalSubmit"); //to television website
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");
// Event Listener
// prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);
nxt.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = 4;
let maxLocation = numOfPapers + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    // prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    
    // prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                paper3.style.zIndex = 3;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 2;
                closeBook(false);
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                paper3.style.zIndex = 1;
                break;
            case 4:
                openBook();
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 1;
                break;
            default:
                throw new Error("unkown state");
        }

        currentLocation--;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const submitDetailsButton = document.getElementById('finalSubmit');


    submitDetailsButton.addEventListener('click', function () {
      const bookname= document.getElementById('booknames').value;
      const authorname = document.getElementById('authornames').value;
      const genre = document.getElementById('genre').value;

      // Send data to the server
      console.log(bookname, authorname, genre)
      fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: authorname,
          book: bookname,
          genre: genre,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => console.error('Error:', error));
    });
  });

//Final submit button
function checkConditions() {
    var authorName = document.getElementById("authornames").value;
    var genreName = document.getElementById("genre").value;
    var submitButton = document.getElementById("finalSubmit");

    if (authorName !== "" && genreName !== "") {
        submitButton.disabled = false;
        submitButton.classList.remove("inactive-button");
    } else {
        submitButton.disabled = true;
        submitButton.classList.add("inactive-button");
    }
}

document.getElementById("authornames").addEventListener("input", checkConditions);
document.getElementById("genre").addEventListener("input", checkConditions);

document.getElementById("finalSubmit").addEventListener("click", function() {
    alert("Form submitted!");
    paper3.classList.add("flipped");
    paper3.style.zIndex = 2;
    closeBook(false);

});

checkConditions();


    





