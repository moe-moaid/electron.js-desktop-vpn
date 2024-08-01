import React, { useState } from 'react';

export default function Checkbox({ label, isChecked }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    isChecked(!checked);
  };

  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded hover:cursor-pointer"
        checked={checked}
        onChange={handleChange}
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
}