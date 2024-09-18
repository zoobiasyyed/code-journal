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
