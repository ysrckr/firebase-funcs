import app from './firebaseInitilizer.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { createApp } from 'vue/dist/vue.esm-bundler';


const db = getFirestore(app);

let requests = [];
const ref = await getDocs(collection(db, 'requests'));
ref.forEach(doc => {
	requests = [
		...requests,
		{ text: doc.data().text, upvotes: doc.data().upvotes, id: doc.id },
	];
});
console.log(requests);

createApp({
	data() {
		return {
			requests,
		};
	},
}).mount('#component');
