"use client"
import { useState, useEffect } from 'react';

export default function UserDashboard() {
  const [val, setVal] = useState(1.00);

  useEffect(() => {
    // Simulasi visual, nanti ganti pake data real dari Firestore Spaceman
    const intv = setInterval(() => {
      setVal(v => +(v + 0.01).toFixed(2));
    }, 100);
    return () => clearInterval(intv);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <div className="border border-zinc-800 p-4 mb-4 flex justify-between items-center bg-zinc-900/30">
        <span className="text-green-500">● INJECTOR ACTIVE</span>
        <span className="text-zinc-500 text-xs italic">VER: 1.0.4-STABLE</span>
      </div>
      
      <div className="flex flex-col items-center justify-center h-[60vh] border-2 border-dashed border-zinc-800 rounded-3xl">
        <h3 className="text-zinc-500 text-sm tracking-[0.5em] mb-4">CURRENT MULTIPLIER</h3>
        <div className="text-8xl font-black text-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          {val}x
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 p-4 border border-zinc-800">
          <p className="text-xs text-zinc-500 mb-2">PREDICTION LOG</p>
          <p className="text-xs text-yellow-500">[!] Next Crash Estimate: 2.10x - 3.50x</p>
        </div>
        <div className="bg-zinc-900 p-4 border border-zinc-800">
          <p className="text-xs text-zinc-500 mb-2">SERVER STATUS</p>
          <p className="text-xs text-green-500">[OK] Connection to Global Node 4 Stable</p>
        </div>
      </div>
    </div>
  );
}
