// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const storage = require('firebase/storage')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlIiRTn62M5n7t0NUtL9JTeGIzHrbN9uw",
  authDomain: "bookspace-be.firebaseapp.com",
  projectId: "bookspace-be",
  storageBucket: "bookspace-be.appspot.com",
  messagingSenderId: "712888873922",
  appId: "1:712888873922:web:98c73159a9e5429b8c9c5b"
};

// Initialize Firebase

module.exports = () => {
    initializeApp(firebaseConfig);
    console.log('Init Firebase');
}