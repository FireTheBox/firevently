"use client";

import { useEffect, useState } from "react";

import { handleError } from "../utils";

const calculateTimeLeft = (targetDate: Date) => {
    const now = new Date();

    const difference = targetDate.getTime() - now.getTime();

    let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    return timeLeft;
};

const useCountdown = (targetDate: Date | string) => {
    let date: Date;

    try {
        date = new Date(Date.parse(targetDate as string));
    } catch (error) {
        handleError(error)
        date = targetDate as Date;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(date));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return [
        timeLeft.days,
        timeLeft.hours,
        timeLeft.minutes,
        timeLeft.seconds,
    ].map((value) => value.toString().padStart(2, "0"));
};

export { useCountdown };
