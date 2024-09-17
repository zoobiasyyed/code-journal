'use strict';
const data = readDataModel();
// In data.ts, add functions that serialize the data model
// as JSON and stores the JSON in localStorage, and that reads
// the JSON from localStorage returned the parsed value
// (or a default data model if it does not exist).
function serializeDataModel() {
  const serializeData = JSON.stringify(data);
  localStorage.setItem('data-storage', serializeData);
}
console.log(serializeDataModel);
function readDataModel() {
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
