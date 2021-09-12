
shownotes();
//If user add a note,add it to localstorage
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener('click', function (e) {
  let addtxt = document.getElementById('addtxt');
  let addTitle = document.getElementById('addTitle');
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  let myobj={
    Title: addTitle.value,
    Text:addtxt.value
  }
  notesObj.push(myobj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addtxt.value = "";
  addTitle.value="";

  shownotes();
});

//Function to display the notes content in the card
function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${index+1} . ${element.Title}</h5>
                        <p class="card-text"> ${element.Text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary id="$">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}
// Function to delete a note from the localstorage
function deleteNote(index) {


  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  shownotes();
}


let search = document.getElementById('searchtxt');
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  
  let noteCard = document.getElementsByClassName('noteCard');
  Array.from(noteCard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
  })

});