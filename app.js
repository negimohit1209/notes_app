const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');
var user = os.userInfo();
var notes = require('./notes');

const title = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}
const body = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
.command('add', 'add a new note', {
    title,body
})
.command('list','list all nodes')
.command('read', 'Reads a Note', {
    title
})
.command('remove', 'removes a Note', {
    title
})
.help()
.argv;

// console.log(_.isString("dsfgd"));
// console.log(_.isString("Mohit"));

// var sum = notes.add(4,5);
// console.log(sum);
// console.log(module);
// fs.appendFileSync('greeting.txt', `hello ${user.username}`);
var command = argv._[0];


// console.log('Yargs:', argv);

if( command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if(typeof note === 'undefined')
        console.log("Title already exists");
    else{
        console.log('Node created');
        console.log('---');
        console.log(`title: ${note.title}, Body:${note.body}`);
    }
        
}else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => {
        notes.logNote(note);
    })
}else if(command === "read"){
    notes.getNote(argv.title);
}else if(command === "remove"){
    var noteremove = notes.removeNote(argv.title);
    var message = noteremove ? 'Note was Removed': 'No note available with title';
    console.log(message);
}else{
    console.log("command not recognised")
}