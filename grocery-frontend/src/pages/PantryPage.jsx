import { useState, useEffect } from 'react';
import axios from 'axios';
import PantryItemForm from '../components/PantryItemForm';
import Navbar from '../components/Navbar';

export default function PantryPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    // Fetch pantry items
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get('/api/pantry', {
                    headers: getAuthHeaders(),
                });

                if (!Array.isArray(res.data)) {
                    throw new Error('Invalid response format');
                }

                setItems(res.data);
                setError('');
            } catch (err) {
                if (err.response?.status === 401) {
                    setError('🔐 Please log in to view your pantry.');
                } else {
                    setError('❌ Failed to fetch pantry items.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // Add new pantry item
    const handleAddItem = async (data) => {
        try {
            const res = await axios.post('/api/pantry', data, {
                headers: getAuthHeaders(),
            });

            setItems((prev) => [...prev, res.data]);
            setShowForm(false);
            setError('');
        } catch (err) {
            if (err.response?.status === 401) {
                setError('🔐 Please log in to add items.');
            } else {
                setError('❌ Failed to add item.');
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">My Pantry</h1>

                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

                {loading ? (
                    <p>Loading pantry items...</p>
                ) : (
                    <>
                        {items.length === 0 ? (
                            <p className="text-gray-600">No pantry items found. Add some!</p>
                        ) : (
                            <ul className="space-y-3">
                                {items.map((item) => (
                                    <li
                                        key={item._id}
                                        className="p-4 border rounded shadow-sm flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-semibold text-lg">{item.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {item.quantity} {item.unit} &mdash; {item.category}
                                            </p>
                                            {item.expiryDate && (
                                                <p className="text-xs text-red-600">
                                                    Expires: {new Date(item.expiryDate).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {!showForm ? (
                            <button
                                onClick={() => setShowForm(true)}
                                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                            >
                                ➕ Add Pantry Item
                            </button>
                        ) : (
                            <div className="mt-6">
                                <PantryItemForm
                                    onSubmit={handleAddItem}
                                    onCancel={() => setShowForm(false)}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
