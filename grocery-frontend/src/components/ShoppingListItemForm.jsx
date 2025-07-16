import { useState, useEffect } from 'react';

const units = ['pcs', 'kg', 'g', 'L', 'ml', 'oz', 'pack', 'box', 'bottle', 'other'];

export default function ShoppingListItemForm({ initialData = {}, onSubmit, onCancel }) {
    const [form, setForm] = useState({
        name: '',
        quantity: 1,
        unit: 'pcs',
        notes: '',
        ...initialData,
    });

    useEffect(() => {
        // When initialData changes (like when editing), update form
        setForm(prev => ({
            ...prev,
            ...initialData,
        }));
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return; // simple validation
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-md shadow-md border">
            <div>
                <label className="block mb-1 font-semibold">Item Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Apples"
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex space-x-4">
                <div className="flex-1">
                    <label className="block mb-1 font-semibold">Quantity</label>
                    <input
                        type="number"
                        min="0.01"
                        step="0.01"
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
                        {units.map(u => (
                            <option key={u} value={u}>{u}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block mb-1 font-semibold">Notes (optional)</label>
                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Add any notes, e.g. brand preference"
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
