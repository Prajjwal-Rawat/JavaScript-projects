const createNotesbtn = document.querySelector('.CreateNotes');
const inputContainer = document.querySelector('.notes-container');


function createNotes(text = ""){
  const generatedNote = document.createElement('textarea');
  const dltBtn = document.createElement('img');
  
  generatedNote.classList.add('input-notes');
  generatedNote.setAttribute('role', 'cell');
  generatedNote.setAttribute('placeholder', 'Write Your Text here');
  
  generatedNote.value = text;

  generatedNote.onkeyup = () => {
    updateStorage();
  }


  dltBtn.classList.add('dltBtn');
  dltBtn.src = "images/delete.png";

  inputContainer.appendChild(generatedNote);
  inputContainer.appendChild(dltBtn);
  updateStorage();
}


createNotesbtn.addEventListener('click', () => {
  createNotes();
  updateStorage();
});


inputContainer.addEventListener('click', (e) => {
  if(e.target.tagName === 'IMG' && e.target.classList.contains('dltBtn')){
    const textArea = e.target.previousElementSibling;
        
    inputContainer.removeChild(textArea);
    inputContainer.removeChild(e.target);
    updateStorage();
  }
})


function updateStorage(){
  const notearr = Array.from(inputContainer.querySelectorAll('.input-notes')).map(textarea => {
    return {text: textarea.value};
  })

  localStorage.setItem('NoteText', JSON.stringify(notearr));
}

function renderSavedNote (){
  const savednote = JSON.parse(localStorage.getItem('NoteText')) || [];
  inputContainer.innerHTML = '';
  savednote.forEach(element => {
    createNotes(element.text);
  });
}

window.onload = () =>{
  renderSavedNote();
}


