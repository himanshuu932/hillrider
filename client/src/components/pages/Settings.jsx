import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Settings() {
  const [fees, setFees] = useState({});
  const [editClass, setEditClass] = useState(""); // which class is being edited
  const [editValue, setEditValue] = useState("");

  const fetchFees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students/fee");
      setFees(res.data);
    } catch (err) {
      console.error(err);
      setFees({});
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleEdit = (cls) => {
    setEditClass(cls);
    setEditValue(fees[cls]);
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:5000/api/students/fee", {
        className: editClass,
        amount: editValue,
      });
      fetchFees();
      setEditClass("");
      setEditValue("");
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Class-wise Fee Settings</h2>
      {Object.keys(fees).length === 0 ? (
        <p>No fee config found</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Class</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(fees)
            .filter((cls) => cls !== "_id" && cls !== "__v")
            .filter((cls) => cls !== "createdAt" && cls !== "__v")
            .filter((cls) => cls !== "updatedAt" && cls !== "__v")
            .map((cls) => (
              <tr key={cls}>
                <td className="border p-2">{cls}</td>
                <td className="border p-2">
                  {editClass === cls ? (
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border p-1 w-24"
                    />
                  ) : (
                    <>₹{fees[cls]}</>
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  {editClass === cls ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(cls)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  )}
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
