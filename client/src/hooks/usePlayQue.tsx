import { createContext, useEffect, useState } from "react";

export const QueContext = createContext();


const QueProvider = (props) => {
	
	const [que, setQue] = useState(["spotify:track:1jzDzZWeSDBg5fhNc3tczV"]);

	useEffect(() => {
        console.log(que)
    },[que])

	return( 
		<QueContext.Provider value={[que,setQue]}>
			{props.children}
		</QueContext.Provider>
	);
}

export {  QueProvider };