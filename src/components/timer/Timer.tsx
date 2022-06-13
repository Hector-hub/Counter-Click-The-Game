
interface MyProps { //interface to manage component props

    tiempo: number

}

const Timer = ({ tiempo }: MyProps) => {


    return (
        <>
        {/* to display timer count value */}
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className=" ">

                    <h2 >{tiempo}</h2>
                    <h5 className="mb-1 text-xl font-small text-gray-900 dark:text-white">Segundos</h5>


                </div>
            </div>

        {/* to display timer count value */}
        </>
    )

}

export default Timer;
