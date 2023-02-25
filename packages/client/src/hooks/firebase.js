import {initializeApp} from 'firebase/app';

import {getAuth, signInWithPopup} from 'firebase/auth';
import {useState} from 'react';

const firebaseConfig = {
	apiKey: 'AIzaSyDC9_ZfH8Nizv9mnzwvsItodU0TVptJbcE',
	authDomain: 'taynguyenchat-e9cb1.firebaseapp.com',
	projectId: 'taynguyenchat-e9cb1',
	storageBucket: 'taynguyenchat-e9cb1.appspot.com',
	messagingSenderId: '756168325787',
	appId: '1:756168325787:web:16b2658a342addb1b8e43e',
	measurementId: 'G-HQ7C8R9S48',
};

initializeApp(firebaseConfig);

const auth = getAuth();
auth.languageCode = 'it';

export default function useFireBase() {
	const [user, setUser] = useState(null);
		const [accessToken, setAccessToken] = useState(null);
	const authGoogleAuth = (provider) => {
		signInWithPopup(auth, provider)
			.then(async (result) => {
				setAccessToken(result.user.accessToken);
				setUser(result.user.providerData[0])
			})
			.catch((error) => {
				console.log(error);
			});
	};

	

	return [user, accessToken, authGoogleAuth];
}
