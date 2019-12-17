import firebase from "firebase";
import firestore from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB9a-Bbgkeuut6YnmfwMZSqL87_Ub-_7pM",
	authDomain: "e-commerce-platform-cb077.firebaseapp.com",
	databaseURL: "https://e-commerce-platform-cb077.firebaseio.com",
	projectId: "e-commerce-platform-cb077",
	storageBucket: "e-commerce-platform-cb077.appspot.com",
	messagingSenderId: "1073691969915",
	appId: "1:1073691969915:web:c0febb672fcf33888b55de",
	measurementId: "G-01YH84MYEZ"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore();