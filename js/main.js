'use strict';
// adding input event listener to the photo URL
const $photoUrl = document.querySelector('#photo-textbox');
const $photoPreview = document.querySelector('#ph-image');
if (!$photoUrl) throw new Error('The $photoURL query failed');
if (!$photoPreview) throw new Error('The $photoPreview query failed');
$photoUrl.addEventListener('input', () => {
  $photoPreview.setAttribute('src', $photoUrl.value);
});
const $form = document.querySelector('form');
if (!$form) throw new Error('The $form query failed');
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements;
  const formData = {
    entryID: data.nextEntryId,
    imageUrl: $formElements['photo-textbox'].value,
    title: $formElements['title-textbox'].value,
    notes: $formElements['notes-textbox'].value,
  };
  data.nextEntryId++;
  data.entries.unshift(formData);
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  serializeDataModel();
});
// view entries
function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row journal-entry');
  const $divForImage = document.createElement('div');
  $divForImage.setAttribute('class', 'column-half');
  $li.appendChild($divForImage);
  const $img = document.createElement('img');
  $img.setAttribute('src', `${entry.imageUrl}`);
  $img.setAttribute('alt', `${entry.title}`);
  $divForImage.appendChild($img);
  const $divForContent = document.createElement('div');
  $divForContent.setAttribute('class', 'column-half');
  $li.appendChild($divForContent);
  const $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  $divForContent.appendChild($h3);
  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  $divForContent.appendChild($p);
  return $li;
}
console.log(renderEntry);
const $journalEntries = document.querySelector('#journal-entries');
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const $entry = renderEntry(data.entries[i]);
    // $journalEntries?.appendChild($entry);
    // if (data.entries.length === 0){
    // }
  }
});
