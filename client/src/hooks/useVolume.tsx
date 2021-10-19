import { createContext, useEffect, useState } from "react";

export const VolumeContext = createContext();


const VolumeProvider = (props) => {
	
	const [volume, setVolume] = useState(0.5);

	useEffect(() => {
        console.log(volume)
    },[volume])

	return( 
		<VolumeContext.Provider value={[volume,setVolume]}>
			{props.children}
		</VolumeContext.Provider>
	);
}

export {  VolumeProvider };