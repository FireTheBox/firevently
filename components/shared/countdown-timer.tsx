"use client";

import { useEffect, useState } from "react";
import { Large } from "../typography/large";
import { P } from "../typography/p";

interface CountdownSegmentProps {
  value: number;
  label: string;
}

const CountdownSegment: React.FC<CountdownSegmentProps> = ({
  value,
  label,
}) => (
  <div className="flex">
    <Large>{value.toString().padStart(2, "0")}</Large>
    <P>{label}</P>
  </div>
);

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

const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2">
      <CountdownSegment value={timeLeft.days} label="d" />
      <CountdownSegment value={timeLeft.hours} label="h" />
      <CountdownSegment value={timeLeft.minutes} label="m" />
      <CountdownSegment value={timeLeft.seconds} label="s" />
    </div>
  );
};

export { CountdownTimer };
