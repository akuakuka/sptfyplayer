import { Progress, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface SongProgressProps {
    durationMS: number;
    paused: boolean;
}

export const SongProgress: React.FC<SongProgressProps> = ({
    durationMS,
    paused,
}) => {
    const [progress, setProgress] = useState<number>(0);
    const [percents, setPercents] = useState<number>(0);

    useEffect(() => {
        setProgress(0);
        setPercents(0);
    }, [durationMS]);

    useEffect(() => {
        setPercents(Math.round((+progress / +durationMS) * 100));
    }, [progress]);



    useEffect(() => {
        let interval;
        if (!paused && progress <= durationMS) {
            interval = setInterval(() => {
                setProgress((prevTime) => prevTime + 10);
            }, 10)
        }
        return () => clearInterval(interval);
    }, [paused]);

    return (
        <Progress
            value={percents}
            height="5px"
            colorScheme={useColorModeValue("blue", "brandDark")}
            width={"100vw"}
        />
    );
};
