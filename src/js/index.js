import '../css/styles.css';
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');
const button = document.querySelector('#call');

requestLink.addEventListener('click', () => {
	requestModal.classList.add('open');
});

requestModal.addEventListener('click', e => {
	if (e.target.classList.contains('new-request')) {
		requestModal.classList.remove('open');
	}
});

button.addEventListener('click', async () => {
	//get function reference
	const sayHello = httpsCallable(functions, 'sayHello');
	//invoke function
	try {
		// say Hello funtion
		const result = await sayHello();
		//log result
		console.log(result.data);
	} catch (err) {
		const code = err.code;
		const message = err.message;
		const details = err.details;
	}
});
