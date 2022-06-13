import { getDatabase, ref, set} from "firebase/database";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyCNlob6rMZUSrepN9FzvieHPuJvcSt7wb0",
    authDomain: "counterclick-thegame.firebaseapp.com",
    databaseURL: "https://counterclick-thegame-default-rtdb.firebaseio.com",
    projectId: "counterclick-thegame",
    storageBucket: "counterclick-thegame.appspot.com",
    messagingSenderId: "314577469713",
    appId: "1:314577469713:web:e7b19b1873f9ed1cb54cb0"
};
    
const app = initializeApp(firebaseConfig);
const database =getDatabase(app);


export default database;

