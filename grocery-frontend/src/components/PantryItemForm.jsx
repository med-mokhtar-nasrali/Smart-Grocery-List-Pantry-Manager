import { useState, useEffect } from 'react';

const categories = ['Produce', 'Dairy', 'Meat', 'Beverage', 'Grains', 'Spices', 'Other'];
const units = ['pcs', 'kg', 'g', 'L', 'ml', 'oz', 'cup', 'tbsp', 'tsp'];

// Helper to format ISO date to yyyy-MM-dd or empty string if invalid
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return isNaN(d) ? '' : d.toISOString().slice(0, 10);
};

export default function PantryItemForm({ initialData = {}, onSubmit, onCancel }) {
    // Format expiryDate once before initial state setup
    const formattedExpiry = formatDate(initialData.expiryDate);

    const [form, setForm] = useState({
        name: initialData.name || '',
        category: initialData.category || 'Other',
        quantity: initialData.quantity ?? 1,
        unit: initialData.unit || 'pcs',
        expiryDate: formattedExpiry,
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({
            ...f,
            [name]: name === 'quantity' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Optional: validate form fields before submit

        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-md shadow-md">
            <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Category</label>
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="flex space-x-4">
                <div className="flex-1">
                    <label className="block mb-1 font-semibold">Quantity</label>
                    <input
                        type="number"
                        min="0"
                        step="any"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="flex-1">
                    <label className="block mb-1 font-semibold">Unit</label>
                    <select
                        name="unit"
                        value={form.unit}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {units.map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block mb-1 font-semibold">Expiry Date</label>
                <input
                    type="date"
                    name="expiryDate"
                    value={form.expiryDate}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
