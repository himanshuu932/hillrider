import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit3, Save, X, DollarSign, Settings as SettingsIcon, Loader2, AlertCircle } from "lucide-react";

export default function Settings() {
  const [fees, setFees] = useState({});
  const [editClass, setEditClass] = useState("");
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchFees = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("http://localhost:5000/api/students/fee");
      setFees(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch fee configuration");
      setFees({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleEdit = (cls) => {
    setEditClass(cls);
    setEditValue(fees[cls]);
  };

  const handleCancel = () => {
    setEditClass("");
    setEditValue("");
  };

  const handleSave = async () => {
    if (!editValue || editValue < 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setSaving(true);
      setError("");
      await axios.put("http://localhost:5000/api/students/fee", {
        className: editClass,
        amount: parseInt(editValue),
      });
      await fetchFees();
      setEditClass("");
      setEditValue("");
    } catch (err) {
      console.error(err);
      setError("Failed to update fee. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const filteredClasses = Object.keys(fees).filter(
    (cls) => !["_id", "__v", "createdAt", "updatedAt"].includes(cls)
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Loading fee configuration...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/*header*/}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3">
          <SettingsIcon className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Fee Settings</h1>
            <p className="text-blue-100 mt-1">Manage class-wise registration fees</p>
          </div>
        </div>
      </div>

      {/* error handle*/}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/*main*/}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredClasses.length === 0 ? (
          <div className="p-12 text-center">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Fee Configuration Found</h3>
            <p className="text-gray-600">Fee settings will appear here once configured.</p>
          </div>
        ) : (
          <>

            {/*table*/}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Fee
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClasses.map((cls, index) => (
                    <tr 
                      key={cls} 
                      className={`hover:bg-gray-50 transition-colors ${
                        editClass === cls ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              Class {cls}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editClass === cls ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500">₹</span>
                            <input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="border border-gray-300 rounded-md px-3 py-2 w-24 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Amount"
                              autoFocus
                            />
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-green-600">
                              ₹{fees[cls]?.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editClass === cls ? (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={handleSave}
                              disabled={saving}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              {saving ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                              ) : (
                                <Save className="h-4 w-4 mr-1" />
                              )}
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              disabled={saving}
                              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEdit(cls)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          >
                            <Edit3 className="h-4 w-4 mr-1" />
                            Change
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}