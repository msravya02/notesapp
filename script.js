document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const noteList = document.getElementById('note-list');

    // Retrieve notes from local storage
    const getNotes = () => {
        return JSON.parse(localStorage.getItem('notes')) || [];
    };

    // Save notes to local storage
    const saveNotes = (notes) => {
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    // Render the list of notes
    const renderNotes = () => {
        const notes = getNotes();
        noteList.innerHTML = '';
        notes.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';

            const noteTitle = document.createElement('h3');
            noteTitle.textContent = note.title;

            const noteContent = document.createElement('p');
            noteContent.textContent = note.content;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editNote(note.id);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteNote(note.id);

            noteItem.append(noteTitle, noteContent, editButton, deleteButton);
            noteList.appendChild(noteItem);
        });
    };

    // Add a new note
    noteForm.onsubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const notes = getNotes();
        notes.push({
            id: Date.now(),
            title,
            content
        });
        saveNotes(notes);
        renderNotes();

        noteForm.reset();
    };

    // Edit an existing note
    const editNote = (id) => {
        const notes = getNotes();
        const note = notes.find(note => note.id === id);
        if (note) {
            const newTitle = prompt('Edit Title', note.title);
            const newContent = prompt('Edit Content', note.content);

            if (newTitle !== null && newContent !== null) {
                note.title = newTitle;
                note.content = newContent;
                saveNotes(notes);
                renderNotes();
            }
        }
    };

    // Delete a note
    const deleteNote = (id) => {
        let notes = getNotes();
        notes = notes.filter(note => note.id !== id);
        saveNotes(notes);
        renderNotes();
    };

    // Initial render of notes
    renderNotes();
});
