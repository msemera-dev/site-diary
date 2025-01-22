import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCxsDPgdHZao5AfeP_mveBNyJh-22PO1oc",
  authDomain: "site-diary-storage.firebaseapp.com",
  projectId: "site-diary-storage",
  storageBucket: "site-diary-storage.firebasestorage.app",
  messagingSenderId: "448151329317",
  appId: "1:448151329317:web:a91caf375abde4d04fbdcc",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
