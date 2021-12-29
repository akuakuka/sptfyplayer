import { Progress } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface SongProgressProps {
    durationMS: number;
}

export const SongProgress: React.FC<SongProgressProps> = ({ durationMS }) => {

    const [time, setTime] = useState(Date.now());

    const [progress, setProgress] = useState<number>(0);
    const [percents, setPercents] = useState<number>(0);

    useEffect(() => {
        /*   const interval = setInterval(() => setTime(Date.now()), 1000); */
        const interval2 = setInterval(() => setProgress(progress + 1000), 1000);
        console.log(progress)
        return () => {
            clearInterval(interval2);
        };

    }, [progress]);


    useEffect(() => {
        console.log(percents)
        setPercents((+durationMS / +progress) * 100)
    }, [progress]);

    return (
        <Progress value={(progress / durationMS) * 100} size='xs' colorScheme="pink" width={"100vw"} />
    )
}