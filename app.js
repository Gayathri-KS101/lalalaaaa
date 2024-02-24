// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA0JVeGAHLTdg_asmsu6dKpxwstVESXxI8",
    authDomain: "letstryagain-23e84.firebaseapp.com",
    databaseURL: "https://letstryagain-23e84-default-rtdb.firebaseio.com",
    projectId: "letstryagain-23e84",
    storageBucket: "letstryagain-23e84.appspot.com",
    messagingSenderId: "936218584409",
    appId: "1:936218584409:web:21c12247ae29c00b179848",
    measurementId: "G-JXS0V6E50Z"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const storageRef = storage.ref();

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const fileName = file.name;

    const uploadTask = storageRef.child(fileName).put(file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            // Progress monitoring
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            // Handle unsuccessful uploads
            console.error(error);
        },
        () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
    );
}