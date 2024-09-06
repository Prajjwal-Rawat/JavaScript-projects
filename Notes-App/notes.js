const createNotesbtn = document.querySelector('.CreateNotes');
const inputContainer = document.querySelector('.notes-container');


function createNotes(){
  const generatedNote = document.createElement('textarea');
  const dltBtn = document.createElement('img');
  
  generatedNote.id = 'input-notes';
  generatedNote.setAttribute('role', 'cell');
  generatedNote.setAttribute('placeholder', 'Write Your Text here');

  dltBtn.classList.add('dltBtn');
  dltBtn.src = "images/delete.png";
  
  inputContainer.appendChild(generatedNote);
  inputContainer.appendChild(dltBtn);

}


createNotesbtn.addEventListener('click', createNotes);


inputContainer.addEventListener('click', (e) => {
    if(e.target.tagName === 'IMG' && e.target.classList.contains('dltBtn')){
        const textArea = e.target.previousElementSibling;
        
        inputContainer.removeChild(textArea);
        inputContainer.removeChild(e.target);
    }
})


