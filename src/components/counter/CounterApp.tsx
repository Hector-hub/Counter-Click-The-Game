// Required imports 

import database from '../../../firebase';
import { ref, set } from "firebase/database";
import { useState, useEffect, useRef } from 'react';

import './CounterApp.css';
import punto from '/assets/punto.mp3';
import punto2 from '/assets/punto2.mp3';
import fuego from '/assets/fuego.mp3';
import burro from '/assets/burro.mp3';
import burra from '/assets/burra.mp3';
import Timer from '../timer/Timer';

//interface to manage function Props
interface MyProps {
    value: number

}

//Global variables to set position of Reset button 
let a = false;
let b = true;
let c = false;

//set Audios
let puntoAudio = new Audio(punto);
let punto2Audio = new Audio(punto2);
let fuegoAudio = new Audio(fuego);
let burroAudio = new Audio(burro);
let burraAudio = new Audio(burra);


//dificult levels

let level1 = Math.floor((Math.random() * (10 - 3)) + 3)
let level2 = Math.floor((Math.random() * (30 - 20)) + 20)
let level3 = Math.floor((Math.random() * (50 - 40)) + 40)

alert(`Tienes 60 segundos para establecer tu record, no olvides colocar tu nombre al final. Let's Go!`); //Initial Greetings 


/* Storing user's device details in a variable*/
const details = navigator.userAgent;

/* Creating a regular expression 
containing some mobile devices keywords 
to search it in details string*/
const regexp = /android|iphone|kindle|ipad/i;

/* Using test() method to search regexp in details
it returns boolean value*/
const isMobileDevice = regexp.test(details);


const CounterApp = ({ value }: MyProps) => {
    //useStates variables
    const [timer, setTimer] = useState(0);          // to manage timer count
    const [counter, setCounter] = useState(value);  // to manage counter 
    const [userName, setUserName] = useState('');   // to manage user name
    const [style, setStyle] = useState('blanco');   // to manage counter style
    const [visibleclassName, setvisibleclassName] = useState('visible'); // to manage buttons visibility 


    // useRef variables 
    const countRef = useRef(0); // to get reference from counter
    countRef.current = counter;

    // Random functions
    const randomNum = () => {  //to get number 0 or 1
        return (Math.random() >= 0.5) ? 1 : 0;
    }

    const randomNumToReset = () => { //to set button reset position 
        a = false;
        b = false;
        c = false;
        return (Math.random() <= 0.3) ? a = true : (Math.random() > 0.3 && Math.random() <= 0.6) ? b = true : c = true;
    }

    // useEffect function to update timer count
    useEffect(() => {
        const interval = setInterval(() => {
            if (timer >= 60) {
                level1 = Math.floor((Math.random() * (10 - 3)) + 3)
                level2 = Math.floor((Math.random() * (30 - 20)) + 20)
                level3 = Math.floor((Math.random() * (50 - 40)) + 40)
                alert('Se acabo el tiempo!');
                saveRecord();
                setTimer(0)
                setCounter(value);
            } else {
                setTimer(seconds => seconds + 1);

            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, setTimer, level2]);

    // if to set difficult when the game advance

    if (counter > level2 || counter < 0) {

        const intervalToReset = setInterval(() => {

            if (countRef.current < level2 && countRef.current >= 0) {
                clearInterval(intervalToReset)
            } else {
                randomNumToReset();
                clearInterval(intervalToReset)

            }

        }, Math.floor((Math.random() * (5 - 3)) + 3) * 1000);
    }

    //Alert to get player name when the party finish
    const alertText = () => {

        const name: string | null = prompt("Ingresa tu nombre para guardar tu récord", "Tu nombre");

        if (name != null) {
            setUserName(name);
            return name;
        } else {
            return '';
        }
    }

    //save record into database
    const saveRecord = () => {
        const db = database;
        if (userName == '') {
            const name = alertText();
            if (name != '') {
                set(ref(db, 'users/' + name), {
                    name: name,
                    puntos: counter
                });
            }
        } else {
            set(ref(db, 'users/' + userName), {
                name: userName,
                puntos: counter

            });

        }

    }

    const masUno = () => ( //add +1 to the counter

        setCounter(counter + 1),
        (isMobileDevice) ? (
            puntoAudio.currentTime = 0,
            punto2Audio.play()
        ) : (
            puntoAudio.currentTime = 0,
            puntoAudio.play()),

        setStyle('verde'),
        setTimeout(() => {
            setStyle('blanco')
        }, 300),
        ((counter > level1 && counter < level2) || counter > level3) && (
            (randomNum() == 1) ? (
                setvisibleclassName('visible')) :
                setvisibleclassName('invisible'),
            randomNumToReset()

        )
    );

    const resetear = () => ( //to reset the counter
        setCounter(value),
        setStyle('blanco'),
        setvisibleclassName('visible'),
        (randomNum() == 1) ? (burroAudio.currentTime = 0, burroAudio.play()) : (burraAudio.currentTime = 0, burraAudio.play())

    );

    const menosUno = () => (       //subtract -1 to the counter
        setCounter(counter - 1),
        fuegoAudio.currentTime = 0.2,
        fuegoAudio.play(),
        setStyle('rojo'),
        setTimeout(() => {
            setStyle('blanco')
        }, 300),
        ((counter > level1 && counter < level2) || counter > level3) && (
            (randomNum() == 1) ? (
                setvisibleclassName('visible')) :
                setvisibleclassName('invisible'),
            randomNumToReset()
        )
    )

    return (

        <>
            {/* input to get player name */}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre</label>
                <input type="text" id="first_name" onChange={(event) => setUserName(event.target.value)} value={userName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
            </div>

            {/* input to get player name */}

            {/* to display counter value */}
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-center px-4 pt-4">
                    <h1 className={style}>{counter}</h1>
                </div>
            </div>
            {/* to display counter value */}
            {/* buttons to play the game */}
            <div className="flex flex-col items-center ">

                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Counter Click</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">The game</span>
                <div className="flex mt-4 space-x-3 lg:mt-6">
                    {c && <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={resetear}>RESETEAR</button>}

                    {visibleclassName == 'visible' && <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={menosUno}>-1</button>}

                    {!(visibleclassName == 'visible') && <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={masUno}>+1</button>}
                    {b && <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={resetear}>RESETEAR</button>}
                    {visibleclassName == 'visible' && <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={masUno}>+1</button>}
                    {!(visibleclassName == 'visible') && <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={menosUno}>-1</button>}
                    {a && <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={resetear}>RESETEAR</button>}

                </div>
            </div>
            {/* buttons to play the game */}
            {/* timer count component */}
            <Timer tiempo={timer} />
            {/* timer count component */}
        </>



    )

}


export default CounterApp