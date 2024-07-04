interface IDB {
  transaction: (storeName: string, mode: IDBTransactionMode) => IDBTransaction;
}

interface IImageObject {
  mimeType: string;
  id: string;
  dataURL: string;
  created: number;
  lastRetrieved: number;
}

export const saveImageToIndexedDB = (
  db: IDB,
  key: string,
  dataURL: string,
  mimeType: string
): void => {
  const transaction = db.transaction("files-store", "readwrite");
  const store = transaction.objectStore("files-store");

  const imageObject: IImageObject = {
    mimeType: mimeType,
    id: key,
    dataURL: dataURL,
    created: Date.now(),
    lastRetrieved: Date.now(),
  };

  store.put(imageObject, key);

  // Delete expired images
  const expirationTime = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const request = store.openCursor();

  request.onsuccess = (event: any) => {
    const cursor = event.target.result;
    if (cursor) {
      const image: IImageObject = cursor.value;
      if (Date.now() - image.created > expirationTime) {
        store.delete(cursor.primaryKey);
      }
      cursor.continue();
    }
  };
};

export const loadImageFromIndexedDB: (
  db: IDB,
  key: string
) => Promise<string> = (db, key) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("files-store", "readwrite");
    const store = transaction.objectStore("files-store");
    const request = store.get(key);

    request.onsuccess = (event: any) => {
      const image = event.target.result;
      if (image) {
        image.lastRetrieved = Date.now();
        store.put(image, key);
        resolve(image.dataURL);
      } else {
        reject("Image not found");
      }
    };

    request.onerror = (event) => {
      reject("Failed to load image from IndexedDB");
    };
  });
};

export const saveToLocalStorage = (key: string, data: unknown): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromLocalStorage = (key: string): unknown => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};
export const initializeIndexedDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("files-db", 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore("files-store"); // keyPath 없이 key-value 형태로 저장
    };

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onerror = () => {
      reject("IndexedDB initialization error");
    };
  });
};
export const readFileAndSaveToIndexedDB: (
  file: File,
  imageId: string
) => Promise<string> = async (file, imageId) => {
  const db = await initializeIndexedDB();
  const dataURL: string = await new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => resolve(e.target?.result as string);
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  });
  const mimeType = file.type;
  await saveImageToIndexedDB(db, imageId, dataURL, mimeType);
  return dataURL;
};
