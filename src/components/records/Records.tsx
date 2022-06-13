import { useState } from "react"
import { getDatabase, ref, onValue, off } from "firebase/database";
import '../records/Records.css';



let Data: any = []
const db = getDatabase(); //get database ref
const Records = () => {

    const snapshotToArray = (snapshot: any) => {             //convert snapshot into array
        let returnArr: any = [];
        snapshot.forEach(function (childSnapshot: any) {
            let item = childSnapshot.val();
            returnArr.push(item);
        });

        returnArr.sort(function (a: any, b: any) {         //sort data to get 5 better players
            if (a.puntos < b.puntos) {
                return 1;
            }
            if (a.puntos > b.puntos) {
                return -1;
            }

            return 0;
        });
        returnArr.length = 5
        return returnArr;
    };

    const [invisible, setInvisible] = useState(false)     // variable to show or not records table
    const [spinner, setSpinner] = useState(false);        // variable to show ot not spinner

    const getRecords = () => {                            //to get records from data base
        return onValue(ref(db, '/users'), (snapshot) => {
            Data = snapshotToArray(snapshot);
            setSpinner(true);
            setInvisible(false)
            setTimeout(() => {
                setInvisible(true)
                setSpinner(false);
            }, 1000);
        }, {
            onlyOnce: false
        });
    }

    const verRecords = () => {                             // to show and hide records table         
        if (invisible) {
            setInvisible(false)
            off(ref(db, 'users'))
        } else {
            getRecords();
            setSpinner(true);
            setTimeout(() => {
                setInvisible(true)
                setSpinner(false);
            }, 1000);
        }
    }

    return (
        <>
            <br />
            {/* button to hide and show records table */}
            <button className="w-11/12 text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                onClick={verRecords}>
                <h1 >
                    Records
                </h1>
            </button>
            {/* button to hide and show records table */}
            {/* Spinner */}
            {
                spinner && <div className="text-center">
                    <svg role="status" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
            }
            {/* Spinner */}
             {/* Records Table  */}
            {
                (invisible) && <div className={" relative overflow-x-auto shadow-md sm:rounded-lg" + invisible}>

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Top #5
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Record
                                </th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                Data.map(({ name, puntos }: any, index: number) => {    /* to print records data into record table  */ 
                                    return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {puntos}
                                        </td>

                                    </tr>
                                })
                            }



                        </tbody>
                    </table>

                      {/* Records Table  */}
                </div>
            }

        </>
    )
}


export default Records