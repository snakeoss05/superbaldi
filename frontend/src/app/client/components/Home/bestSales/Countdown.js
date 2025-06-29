"use client";
import React, { useState, useEffect, useCallback } from "react";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minus: Math.floor((difference / 1000 / 60) % 60),
        Secs: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [targetDate]);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="flex flex-col lg:flex-row items-center rounded-lg ">
      <div className="flex flex-row space-x-2  items-center justify-center text-center">
        {Object.keys(timeLeft).length === 0 ? (
          <span className="text-xl text-black px-2 rounded-full uppercase">
            0d : 00h : 00m : 00s
          </span>
        ) : (
          Object.entries(timeLeft).map(([interval, value]) => (
            <div
              key={interval}
              className="flex flex-row items-center justify-center gap-2">
              <div className="flex flex-col items-center justify-center bg-border-light   h-[30px] w-[28px]  text-center ">
                <span className="font-secondary font-semibold text-text-light text-sm ">
                  {value}
                </span>
              </div>
              {interval !== "Secs" && (
                <span className="font-bold text-sm ">:</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Countdown;
