// app/page.js
"use client"; // needed if you use useState or other React hooks

import { useState } from "react";

export default function Home() {
  const [inventory, setInventory] = useState([
    { item: "Widget A", quantity: 10 },
    { item: "Widget B", quantity: 5 },
    { item: "Widget C", quantity: 8 },
  ]);

  const increment = (index) => {
    const newInventory = [...inventory];
    newInventory[index].quantity += 1;
    setInventory(newInventory);
  };

  const decrement = (index) => {
    const newInventory = [...inventory];
    if (newInventory[index].quantity > 0) {
      newInventory[index].quantity -= 1;
      setInventory(newInventory);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Inventory Management</h1>

      <table className="w-full border-collapse border border-gray-400 mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2 text-left">Item</th>
            <th className="border border-gray-400 p-2 text-left">Quantity</th>
            <th className="border border-gray-400 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((entry, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2">{entry.item}</td>
              <td className="border border-gray-400 p-2">{entry.quantity}</td>
              <td className="border border-gray-400 p-2 space-x-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  onClick={() => increment(index)}
                >
                  +1
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => decrement(index)}
                >
                  -1
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
