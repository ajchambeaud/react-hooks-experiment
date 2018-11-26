import delay from 'delay';
import shortid from 'shortid';
import { append, reject } from 'ramda';

const db = {
  items: []
};

export async function addItem(title) {
  const id = shortid.generate();
  const item = { id, title };

  await delay(3000);

  db.items = append(item, db.items);

  return item;
}

export async function removeItem(id) {
  const byId = item => item.id === id;

  await delay(1000);

  db.items = reject(byId, db.items);
}

export async function fetchItems(id) {
  await delay(1000);

  return db.items;
}
