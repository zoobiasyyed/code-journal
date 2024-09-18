'use strict';
const data = readDataModel();
function serializeDataModel() {
  const serializeData = JSON.stringify(data);
  localStorage.setItem('data-storage', serializeData);
}
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
