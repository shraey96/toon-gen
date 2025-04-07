import { useEffect, useState } from "react";

interface CountdownProps {
  initialCount: number;
  onComplete: () => void;
}

export default function Countdown({
  initialCount,
  onComplete,
}: CountdownProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count, onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-black/50 text-white text-6xl font-bold rounded-full w-24 h-24 flex items-center justify-center">
        {count}
      </div>
    </div>
  );
}
