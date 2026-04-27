"use client"
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, Timestamp } from 'firebase/firestore';

export default function AdminPage() {
  const [keys, setKeys] = useState<any[]>([]);
  const [newKey, setNewKey] = useState({ code: '', owner: '' });

  const fetchKeys = async () => {
    const snap = await getDocs(collection(db, "license_keys"));
    setKeys(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { fetchKeys(); }, []);

  const createKey = async () => {
    const exp = new Date();
    exp.setDate(exp.getDate() + 7); // MINGGUAN, KONTOL!

    await setDoc(doc(db, "license_keys", newKey.code), {
      owner_name: newKey.owner,
      active: true,
      expiredAt: Timestamp.fromDate(exp),
      role: "USER"
    });
    setNewKey({ code: '', owner: '' });
    fetchKeys();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 font-mono">
      <h2 className="text-purple-500 font-bold text-xl mb-4 underline">ADMIN GENERATOR</h2>
      <div className="flex gap-2 mb-8">
        <input placeholder="Code" className="bg-black border p-2" onChange={e => setNewKey({...newKey, code: e.target.value})} />
        <input placeholder="Owner" className="bg-black border p-2" onChange={e => setNewKey({...newKey, owner: e.target.value})} />
        <button onClick={createKey} className="bg-purple-600 px-4 py-2 font-bold">CREATE KEY</button>
      </div>
      
      <table className="w-full text-left border-collapse border border-zinc-800">
        <thead className="bg-zinc-900">
          <tr>
            <th className="p-2 border border-zinc-800">CODE</th>
            <th className="p-2 border border-zinc-800">OWNER</th>
            <th className="p-2 border border-zinc-800">EXPIRED</th>
            <th className="p-2 border border-zinc-800">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {keys.map(k => (
            <tr key={k.id}>
              <td className="p-2 border border-zinc-800 text-green-500 font-bold">{k.id}</td>
              <td className="p-2 border border-zinc-800">{k.owner_name}</td>
              <td className="p-2 border border-zinc-800 text-xs">{k.expiredAt?.toDate().toLocaleString()}</td>
              <td className="p-2 border border-zinc-800">
                <button onClick={async () => {await deleteDoc(doc(db, "license_keys", k.id)); fetchKeys();}} className="text-red-500 text-xs uppercase">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
