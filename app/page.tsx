"use client";

import { useEffect, useState } from "react";

const TARGET_TIME = new Date("2027-01-15T00:00:00").getTime();

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(now: number): Countdown {
  const remaining = Math.max(0, TARGET_TIME - now);
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}

function formatUnit(value: number) {
  return value.toString().padStart(2, "0");
}

export default function Home() {
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    const update = () => {
      setCountdown(getCountdown(Date.now()));
    };

    update();
    const interval = window.setInterval(update, 250);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="countdown" aria-label="Countdown to January 15, 2027">
      <h1>The DEVengers will Return</h1>
      <div className="countdown-display" aria-live="polite">
        {countdown ? (
          <>
            <span className="countdown-unit">
              <strong>{countdown.days}</strong>
              <small>days</small>
            </span>
            <span className="separator">:</span>
            <span className="countdown-unit">
              <strong>{formatUnit(countdown.hours)}</strong>
              <small>hours</small>
            </span>
            <span className="separator">:</span>
            <span className="countdown-unit">
              <strong>{formatUnit(countdown.minutes)}</strong>
              <small>minutes</small>
            </span>
            <span className="separator">:</span>
            <span className="countdown-unit countdown-seconds">
              <strong>{formatUnit(countdown.seconds)}</strong>
              <small>seconds</small>
            </span>
          </>
        ) : (
          <span className="loading" aria-hidden="true">
            00:00:00
          </span>
        )}
      </div>
    </main>
  );
}
