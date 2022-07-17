import app from './firebaseInitilizer.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { createApp } from 'vue/dist/vue.esm-bundler';
import { nextTick } from 'vue';
import { auth } from './auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

const db = getFirestore(app);
const functions = getFunctions();

let requests = [];
const ref = await getDocs(collection(db, 'requests'));
ref.forEach(doc => {
	requests = [
		...requests,
		{ text: doc.data().text, upvotes: doc.data().upvotes, id: doc.id },
	];
});
createApp({
	data() {
		return {
			requests,
		};
	},
	methods: {
		async upVote(id) {
			const upVote = httpsCallable(functions, 'upVote', auth);
			try {
				await upVote({
					id,
				});
			} catch (error) {
				console.log(error.message);
			}
			const ref = await getDocs(collection(db, 'requests'));
			ref.forEach(doc => {
				this.requests = [
					{
						text: doc.data().text,
						upvotes: doc.data().upvotes,
						id: doc.id,
					},
				];
			});
			await nextTick();
		},
		async deleteRequest(id) {
			const deleteRequest = httpsCallable(
				functions,
				'deleteRequest',
				auth,
			);
			try {
				await deleteRequest({
					id,
				});
			} catch (error) {
				console.log(error);
			}
			this.requests = this.requests.filter(request => request.id !== id);
			await nextTick();
		},
	},
}).mount('#component');
