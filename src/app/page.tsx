"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      // 1. Cek di collection admins dulu
      const adminSnap = await getDoc(doc(db, "admins", code));
      if (adminSnap.exists() && adminSnap.data().active) {
        localStorage.setItem('role', 'ADMIN');
        router.push('/admin');
        return;
      }

      // 2. Kalau bukan admin, cek di license_keys (User)
      const userSnap = await getDoc(doc(db, "license_keys", code));
      if (userSnap.exists()) {
        const data = userSnap.data();
        const now = new Date();
        if (data.active && now < data.expiredAt.toDate()) {
          localStorage.setItem('role', 'USER');
          localStorage.setItem('user_code', code);
          router.push('/dashboard');
        } else {
          alert("KODE EXPIRED ATAU MATI, BABI!");
        }
      } else {
        alert("KODE TIDAK DIKENAL, ASU!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-purple-500 flex flex-col items-center justify-center p-4 font-mono">
      <div className="border-2 border-purple-500 p-8 bg-zinc-900 shadow-[8px_8px_0px_0px_rgba(168,85,247,1)] max-w-sm w-full">
        <h1 className="text-2xl font-black mb-6 text-center italic uppercase tracking-tighter">Beyond Injector v1</h1>
        <input 
          type="text" 
          placeholder="ENTER ACCESS CODE..." 
          className="w-full p-3 bg-black border border-purple-900 mb-4 focus:border-white outline-none text-center font-bold uppercase"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button 
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-purple-600 text-black font-black p-3 hover:bg-white transition duration-300"
        >
          {loading ? 'WAITING...' : 'AUTHENTICATE'}
        </button>
      </div>
    </div>
  );
}
