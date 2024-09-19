interface FormElements extends HTMLFormControlsCollection {
  entryID: HTMLInputElement;
  'photo-textbox': HTMLInputElement;
  'title-textbox': HTMLInputElement;
  'notes-textbox': HTMLInputElement;
}

// adding input event listener to the photo URL

const $photoUrl = document.querySelector('#photo-textbox') as HTMLInputElement;
const $photoPreview = document.querySelector('#ph-image');

if (!$photoUrl) throw new Error('The $photoURL query failed');
if (!$photoPreview) throw new Error('The $photoPreview query failed');

$photoUrl.addEventListener('input', () => {
  $photoPreview.setAttribute('src', $photoUrl.value);
});

const $form = document.querySelector('form');
if (!$form) throw new Error('The $form query failed');

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = $form.elements as FormElements;

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

const $li = document.createElement('li');
const $divForImage = document.createElement('div');
const $img1 = document.createElement('img');
const $divForContent = document.createElement('div');
const $h3 = document.createElement('h3');
const $p = document.createElement('p');
// view entries

function renderEntry(entry: Entry): HTMLLIElement {
  $li.setAttribute('class', 'row journal-entry');

  $divForImage.setAttribute('class', 'column-half');
  $li.appendChild($divForImage);

  $img1.setAttribute('src', `${entry.imageUrl}`);
  $img1.setAttribute('alt', `${entry.title}`);
  $divForImage.appendChild($img1);

  $divForContent.setAttribute('class', 'column-half');
  $li.appendChild($divForContent);

  $h3.textContent = entry.title;
  $divForContent.appendChild($h3);

  $p.textContent = entry.notes;
  $divForContent.appendChild($p);

  return $li;
}

console.log(renderEntry);

const $journalEntries = document.querySelector('#journal-entries');
const $tp = document.querySelector('#toggle-p');

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const $entry = renderEntry(data.entries[i]);

    $journalEntries?.appendChild($entry);

    toggleNoEntries();
  }
});

function toggleNoEntries(): void {
  if (data.entries.length === 0) {
    $tp?.classList.remove('hidden');
    console.log($tp);
  } else {
    $tp?.setAttribute('class', 'hidden');
    console.log('It is working');
  }
}
