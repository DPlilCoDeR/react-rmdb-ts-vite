import { FunctionComponent, useState } from "react";

interface RateI {
    callback: (value: number) => void
}

const Rate: FunctionComponent<RateI> = ({callback}) => {
    const [value, setValue] = useState(5)

    return(
        <>
            <input 
                type="range" 
                min='1'
                max='10'
                value={value}
                onChange={ e => setValue(Number(e.currentTarget.value))}
            />
            {value}
            <p>
                <button onClick={() => callback(value)}>Rate</button>
            </p>
        </>
    )
}

export default Rate;