import app from './firebaseInitilizer';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	getAuth,
} from 'firebase/auth';

const auth = getAuth(app);

const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const signOut = document.querySelector('.sign-out');

//Toggle auth modals
authSwitchLinks.forEach(link => {
	link.addEventListener('click', () => {
		authModals.forEach(modal => {
			modal.classList.toggle('active');
		});
	});
});

//Register Form
registerForm.addEventListener('submit', async e => {
	e.preventDefault();
	const email = registerForm.email.value;
	const password = registerForm.password.value;
	try {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = await userCredentials.user;
		registerForm.reset();
	} catch (err) {
		const errorCode = err.code;
		const errorMessage = err.message;
		registerForm.querySelector('.error').textContent = errorMessage;
	}
});

//Login Form
loginForm.addEventListener('submit', async e => {
	e.preventDefault();
	const email = loginForm.email.value;
	const password = loginForm.password.value;
	try {
		const userCredentials = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = await userCredentials.user;
		loginForm.reset();
	} catch (err) {
		const errorCode = err.code;
		const errorMessage = err.message;
		loginForm.querySelector('.error').textContent = errorMessage;
	}
});

//Auth Listeners
onAuthStateChanged(auth, user => {
	if (user) {
		authWrapper.classList.remove('open');
		authModals.forEach(modal => {
			modal.classList.remove('active');
		});
	} else {
		authWrapper.classList.add('open');
		authModals[0].classList.add('active');
	}
});

//Sign Out
signOut.addEventListener('click', () => {
	auth.signOut();
});
