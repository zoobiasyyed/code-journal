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

  if (data.editing === null) {
    formData.entryID = data.nextEntryId;
    data.nextEntryId++;

    data.entries.unshift(formData);
    const newElements = renderEntry(formData);
    $journalEntries?.prepend(newElements);
    toggleNoEntries();
  } else {
    formData.entryID = data.editing.entryID;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryID === data.editing.entryID) {
        data.entries[i] = formData;
        // rendering new DOM tree
      }
    }
    const $newLi = document.querySelectorAll('li');
    for (let y = 0; y < $newLi.length; y++) {
      if (
        $newLi[y].getAttribute('data-entry-id') ===
        data.editing.entryID.toString()
      ) {
        const newEntryElement = renderEntry(formData);
        $newLi[y].replaceWith(newEntryElement);
      }
    }
  }

  $editEntry.textContent = 'New Entry';

  data.editing = null;

  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');

  $form.reset();
  $deleteEntryButton?.classList.add('hide');
  viewSwap('entries');
  serializeDataModel();
});

// view entries

function renderEntry(entry: Entry): HTMLLIElement {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row journal-entry');
  $li.setAttribute('data-entry-id', entry.entryID.toString());

  const $divForImage = document.createElement('div');
  $divForImage.setAttribute('class', 'column-half');
  $li.appendChild($divForImage);

  const $img1 = document.createElement('img');
  $img1.setAttribute('class', 'image');
  $img1.setAttribute('src', `${entry.imageUrl}`);
  $img1.setAttribute('alt', `${entry.title}`);
  $divForImage.appendChild($img1);

  const $divForContent = document.createElement('div');
  $divForContent.setAttribute('class', 'column-half');
  $li.appendChild($divForContent);

  const $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  $divForContent.appendChild($h3);

  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  $divForContent.appendChild($p);

  const $i = document.createElement('i');
  $i.setAttribute('class', 'fa-solid fa-pencil');
  $h3.appendChild($i);

  return $li;
}

const $journalEntries = document.querySelector('#journal-entries');
const $tp = document.querySelector('#toggle-p');

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const $entry = renderEntry(data.entries[i]);

    $journalEntries?.appendChild($entry);
  }
  toggleNoEntries();
  viewSwap(data.view);
});

function toggleNoEntries(): void {
  if (data.entries.length === 0) {
    $tp?.classList.remove('hidden');
  } else {
    $tp?.setAttribute('class', 'hidden');
  }
}

const $viewEntries = document.querySelector('div[data-view= "entry-form"]');
const $entries = document.querySelector('div[data-view="entries" ]');

function viewSwap(viewToShow: 'entries' | 'entry-form'): void {
  if (viewToShow === 'entry-form') {
    $viewEntries?.classList.remove('hidden');
    $entries?.classList.add('hidden');
  } else {
    $entries?.classList.remove('hidden');
    $viewEntries?.classList.add('hidden');
  }
  data.view = viewToShow;
  serializeDataModel();
}

const $viewEntriesLink = document.querySelector('#entries-link');
$viewEntriesLink?.addEventListener('click', () => {
  viewSwap('entries');
});
const $viewNewEntries = document.querySelector('#entries-button');
$viewNewEntries?.addEventListener('click', () => {
  $form.reset();
  $deleteEntryButton?.classList.add('hide');
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  viewSwap('entry-form');
});

// delete button
const $deleteEntryButton = document.querySelector('#delete-entry-button');
const $ul = document.querySelector('ul');

// querying for elements
const $prePopulateTitle = document.querySelector(
  '#title-textbox',
) as HTMLInputElement;
const $prePopulatePhotoUrl = document.querySelector(
  '#photo-textbox',
) as HTMLInputElement;
const $prePopulateNotes = document.querySelector(
  '#notes-textbox',
) as HTMLInputElement;

const $editEntry = document.querySelector('h2') as HTMLHeadElement;

$ul?.addEventListener('click', (event: Event) => {
  const eventTarget = event.target as HTMLElement;
  const $closestli = eventTarget.closest('li');

  if (eventTarget.getAttribute('class') === 'fa-solid fa-pencil') {
    for (let i = 0; i < data.entries.length; i++) {
      if (
        data.entries[i].entryID.toString() ===
        $closestli?.getAttribute('data-entry-id')
      ) {
        data.editing = data.entries[i];
      }
    }
    if (data.editing) {
      $prePopulateTitle.value = data.editing.title;
      $prePopulateNotes.value = data.editing.notes;
      $prePopulatePhotoUrl.value = data.editing.imageUrl;
      $photoPreview.setAttribute('src', data.editing.imageUrl);
      $editEntry.textContent = 'Edit Entry';
      $deleteEntryButton?.classList.remove('hide');
    }
  } else {
    return;
  }

  viewSwap('entry-form');
});

if (!$deleteEntryButton) throw new Error('$deleteEntryButton not in query ');
const $dontDismissModal = document.querySelector('.dont-dismiss-modal');
const $dismissModal = document.querySelector('.dismiss-modal');
const $dialog = document.querySelector('dialog') as HTMLDialogElement;

$deleteEntryButton.addEventListener('click', () => {
  $dialog?.showModal();
});

$dontDismissModal?.addEventListener('click', () => {
  $dialog?.close();
});

$dismissModal?.addEventListener('click', () => {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i] === data.editing) {
      data.entries.splice(i, 1);
    }
  }
  const $liToRemove = document.querySelector(
    `li[data-entry-id='${data?.editing?.entryID}']`,
  );
  if ($liToRemove) {
    $liToRemove.remove();
  }
  console.log($liToRemove);
  toggleNoEntries();
});
