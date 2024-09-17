interface Entry {
  entryID: number;
  imageUrl: string;
  title: string;
  notes: string;
}

interface Data {
  view: 'entries' | 'entry-form';
  entries: Entry[];
  editing: null | Entry;
  nextEntryId: number;
}

const data: Data = readDataModel();

// In data.ts, add functions that serialize the data model
// as JSON and stores the JSON in localStorage, and that reads
// the JSON from localStorage returned the parsed value
// (or a default data model if it does not exist).

function serializeDataModel(): void {
  const serializeData = JSON.stringify(data);
  localStorage.setItem('data-storage', serializeData);
}
console.log(serializeDataModel);

function readDataModel(): Data {
  const readData = localStorage.getItem('data-storage');
  if (readData) {
    const parseData = JSON.parse(readData);
    return parseData;
  } else {
    return {
      view: 'entry-form',
      entries: [],
      editing: null,
      nextEntryId: 1,
    };
  }
}
