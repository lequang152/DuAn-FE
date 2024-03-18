import { openDB } from 'idb';

interface IndexedDBData {
  questionId: number;
  accessToken: string;
  answerToken: string;
  base64Data: any;
  timeStamp: string;
}

interface Answer {
  accessToken: string,
  answerToken: string,
  value: any,
}

const DB_NAME = 'survey';
const STORE_NAME = 'storeBlob';

const openDatabase = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'accessToken' });
      }
    },
  });
};

export const putDataToIndexDb = async (data: IndexedDBData) => {
  const preAnswer: Answer | undefined = await getDataFromIndexDb(data.accessToken);
  const answer: Answer = {
    accessToken: data.accessToken,
    answerToken: data.answerToken,
    value: {
      ...preAnswer?.value,
      [data.questionId]: {
        answerAudio: data.base64Data,
        timeStamp: data.timeStamp
      }
    }
  } 

  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  
  await store.put(answer);
  await transaction.done;
};

export const getDataFromIndexDb = async (accessToken: string) => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const result = await store.get(accessToken);
  await transaction.done;
  return result;
};

export const getAllDataIndexDb = async () => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const result = await store.getAll();
  await transaction.done;
  return result;
};

export const clearData = async () => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  await store.clear();
  await transaction.done;
};

export const clearDataForAccessToken = async (accessToken: string) => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  try {
    // Delete the entry with the specified accessToken
    await store.delete(accessToken);
  } finally {
    await transaction.done;
  }
};

