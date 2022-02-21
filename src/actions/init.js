import database from '../firebase/firebase';
import { getTime } from 'date-fns';

const updates = {};
let noteKeys = [];
let archivedItems = [];

//Database

const initialNotes = () => database.ref('notes').once('value');
const mySelections = (id) =>
  database.ref('private/' + id + '/mySelections').once('value');
const myArchive = (id) => {
  archivedItems = [];
  return database.ref('private/' + id + '/myArchive').once('value');
};
const singleNote = (key) => database.ref('notes/' + key).once('value');
const getKey = (id) =>
  database
    .ref('private/' + id)
    .child('MyArchive')
    .push().key;

async function singleInit(key) {
  return await singleNote(key).then((snapshot) => snapshot.val());
}

async function init() {
  noteKeys = [];
  const notesPersonal = [];
  const updates = {};

  const personal = initialNotes().then((snapshot) => {
    snapshot.forEach((child) => {
      if (child.val().eDate >= getTime(new Date())) {
        noteKeys.push(child.key);
        notesPersonal.push({ ...child.val(), key: child.key });
      } else updates[`notes/${child.key}`] = [];
    });
    database.ref().update(updates);
    return notesPersonal;
  });

  const notes = [...(await personal)];
  return notes;
}

async function myInit({ id }) {
  const selectedItems = [];
  const deletedItems = [];

  const mySelectedItems = mySelections(id).then((snapshot) => {
    snapshot.forEach((child) => {
      if (noteKeys.includes(child.val().noteKey)) {
        selectedItems.push({ ...child.val(), key: child.key });
      } else {
        updates['private/' + id + '/mySelections/' + child.key] = [];
        updates['private/' + id + '/myArchive/' + getKey(id)] = child.val();
        deletedItems.push(child.val());
      }
    });
    database.ref().update(updates);
    return selectedItems;
  });

  const myArchiveItems = myArchive(id).then((snapshot) => {
    snapshot.forEach((child) => {
      archivedItems.push({ ...child.val(), key: child.key });
    });
    return archivedItems;
  });

  const myItems = {
    items: [...(await mySelectedItems)],
    archive: [...(await myArchiveItems)],
    deleted: [...(await deletedItems)],
  };
  return myItems;
}

export { myInit, singleInit, init as default };
