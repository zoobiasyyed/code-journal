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
