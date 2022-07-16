import '../css/styles.css';
import app from './firebaseInitilizer';
import { auth } from './auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();

const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');
const requestForm = document.querySelector('.request-form');

requestLink.addEventListener('click', () => {
	requestModal.classList.add('open');
});

requestModal.addEventListener('click', e => {
	if (e.target.classList.contains('new-request')) {
		requestModal.classList.remove('open');
	}
});

// Add a new request
requestForm.addEventListener('submit', async e => {
	e.preventDefault();
	const addRequest = httpsCallable(functions, 'addRequest', auth);
	try {
		const result = await addRequest({
			text: requestForm.request.value,
		});
		console.log(result.data);
		requestForm.querySelector('.error').textContent = '';
	} catch (error) {
		requestForm.querySelector('.error').textContent = error.message;
	}
	requestForm.reset();
	requestModal.classList.remove('open');
});
