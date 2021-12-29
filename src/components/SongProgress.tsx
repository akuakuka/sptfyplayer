import { Progress } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface SongProgressProps {
    durationMS: number;
    paused: boolean;
}

export const SongProgress: React.FC<SongProgressProps> = ({ durationMS, paused }) => {
    const [progress, setProgress] = useState<number>(0);
    const [percents, setPercents] = useState<number>(0);

    useEffect(() => {
        setProgress(0)
        setPercents(0)
    }, [durationMS])
    useEffect(() => {
        console.log("PAUSED")
console.log(paused)

    }, [paused])

    useEffect(() => {
        console.log({paused})
        const interval = setInterval(() => {

          setProgress(progress + 1000);
        }, 1000);
        return () => clearInterval(interval);
      },[]);




    useEffect(() => {
        console.log(percents)
        setPercents((+progress / +durationMS) * 100)

    }, [progress]);

    return (
        <Progress value={percents} height="5px" color="brandDark.200" width={"100vw"} />
    )
}