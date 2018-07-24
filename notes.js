const fs = require('fs');

var fetchNotes= ()=>{
    try{
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    }catch(e){
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes)); 
}
var addNote = (title, body)=>{
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter((note)=> note.title === title);
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes); 
        return note;
    }
};

var getAll = ()=>{
    return fetchNotes();
}
var getNote = (title)=>{
    var notes = fetchNotes();
    notes.filter((note) => note.title === title);
    if(notes.length === 0)
        console.log("No note found with the title: " , title);
    else
        console.log(`----`);
        console.log(`title: ${title}`);
        console.log(`Body: ${notes[0].body}`);
}

var removeNote = (title)=>{
    //fetch note
    //filter note
    //removing title
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title)
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length
}

var logNote = (note) => {
    console.log("-----");
    console.log(`Title: ${note.title}`)
    console.log(`Body: ${note.body}`)
}

module.exports = {
    addNote,getAll, getNote, removeNote, logNote
};

