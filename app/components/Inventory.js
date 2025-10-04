"use client";

import { useState, useEffect } from "react";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [threshold, setThreshold] = useState("");
  const [purchaseLink, setPurchaseLink] = useState("");

  // Step 2: Fetch inventory from API on mount
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = { itemName, quantity, threshold, purchaseLink };

    // Step 2: Send new item to API
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      const savedItem = await res.json();

      // Update local state with saved item
      setInventory((prev) => [...prev, savedItem]);
      setItemName("");
      setQuantity("");
      setThreshold("");
      setPurchaseLink("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <header>
        <h1 className="text-4xl font-bold mb-6 text-center">Inventory Tracker</h1>
      </header>

      {/* Add Item Form */}
      <section id="add-item" className="mb-8">
        <h2 className="text-2xl mb-4">Add a New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-2 bg-white p-6 rounded shadow">
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Reorder Threshold"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="url"
            placeholder="Purchase Link (optional)"
            value={purchaseLink}
            onChange={(e) => setPurchaseLink(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Item
          </button>
        </form>
      </section>

      {/* Inventory Table */}
      <section id="inventory">
        <h2 className="text-2xl mb-4">Current Inventory</h2>
        <table className="w-full border-collapse border border-gray-400 bg-white shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 p-2">Item Name</th>
              <th className="border border-gray-400 p-2">Quantity</th>
              <th className="border border-gray-400 p-2">Reorder Threshold</th>
              <th className="border border-gray-400 p-2">Purchase Link</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-400 p-2">{item.itemName}</td>
                <td className="border border-gray-400 p-2">{item.quantity}</td>
                <td className="border border-gray-400 p-2">{item.threshold}</td>
                <td className="border border-gray-400 p-2">
                  {item.purchaseLink && (
                    <a
                      href={item.purchaseLink}
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      Buy
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
