//  Get the add button and main container
const addBtn = document.getElementById("addbtn");
const main = document.getElementById("main");

// Save all notes to localStorage
const savenotes = () => {
    const notes = document.querySelectorAll(".note textarea"); 
    const data = [];
    notes.forEach((note) => {
        data.push(note.value); // store each note's text
    });

    if (data.length === 0) {
        localStorage.removeItem("notes"); // if no notes, remove from storage
    } else {
        localStorage.setItem("notes", JSON.stringify(data)); // save notes array to localStorage
    }
};

// Function to add a new note to the DOM
const addnote = (text = "") => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    noteElement.innerHTML = `
        <div class="tool">
            <i class="trash fas fa-trash"></i>
            <i class="save fas fa-save"></i>
        </div>
        <textarea>${text}</textarea>
    `;

    // Trash button event — delete the note
    noteElement.querySelector(".trash").addEventListener("click", () => {
        noteElement.remove();
        savenotes(); // update storage after deletion
    });

    // Save button — enable/disable editing and save
    noteElement.querySelector(".save").addEventListener("click", () => {
        const textarea = noteElement.querySelector("textarea");
        textarea.disabled = !textarea.disabled; // toggle editable state
        savenotes(); // save updated note
    });

    // Save when textarea loses focus
    noteElement.querySelector("textarea").addEventListener("focusout", function () {
        savenotes(); // auto-save on blur
    });

    main.appendChild(noteElement); // add note to DOM
    savenotes(); // update localStorage
};

// Load saved notes from localStorage when page loads
const savedNotes = JSON.parse(localStorage.getItem("notes"));


if (savedNotes && savedNotes.length > 0) {
    savedNotes.forEach((note) => {
        addnote(note); // add each saved note to the page
    });
}

//  Add button event to create a new note
addBtn.addEventListener("click", () => {
    addnote(); // create empty note on click
});
