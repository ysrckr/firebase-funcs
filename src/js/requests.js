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
				const result = await upVote({
					id,
				});
				console.log(result.data);
			} catch (error) {
				console.log(error);
			}
			const updateState = id => {
				const index = this.requests.findIndex(
					request => request.id === id,
				);
				this.requests[index].upvotes++;
				nextTick();
			};
			updateState(id);
		},
		async deleteRequest(id) {
			const deleteRequest = httpsCallable(
				functions,
				'deleteRequest',
				auth,
			);
			try {
				const result = await deleteRequest({
					id,
				});
				console.log(result.data);
			} catch (error) {
				console.log(error);
			}
			const updateState = id => {
				const index = this.requests.findIndex(
					request => request.id === id,
				);
				this.requests.splice(index, 1);
				nextTick();
			};
			updateState(id);
		},
	},
}).mount('#component');
