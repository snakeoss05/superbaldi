"use client";
import React, { useState, useEffect, useCallback } from "react";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
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
    <div className="flex flex-col lg:flex-row items-center rounded-lg">
      <div className="flex flex-row space-x-2 sm:space-x-2 items-center justify-center text-center">
        {Object.keys(timeLeft).length === 0 ? (
          <span className="text-sm sm:text-xl text-white bg-danger px-2 rounded-full uppercase">
            0ي : 00س : 00د : 00ث
          </span>
        ) : (
          Object.entries(timeLeft).map(([interval, value]) => {
            const arabicLabels = {
              d: "ي", // يوم
              h: "س", // ساعة
              m: "د", // دقيقة
              s: "ث", // ثانية
            };

            return (
              <div key={interval} className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center h-[60px] w-[56px] bg-danger justify-center space-x-1.5 rounded-lg text-center text-white">
                  <span className="text-sm sm:text-lg mx-1  uppercase font-semibold">
                    {value}
                  </span>
                  <span className="text-sm uppercase font-semibold">
                    {arabicLabels[interval] || interval}
                  </span>
                </div>
                {interval !== "s" && (
                  <span className="font-bold text-md">:</span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Countdown;
