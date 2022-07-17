import app from './firebaseInitilizer.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(app);

let requests = [];
const ref = await getDocs(collection(db, 'requests'));
ref.forEach(doc => {
	requests.push([doc.data(), doc.id]);
});

