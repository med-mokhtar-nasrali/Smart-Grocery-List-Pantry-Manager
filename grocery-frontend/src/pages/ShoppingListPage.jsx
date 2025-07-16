import { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingListItemForm from '../components/ShoppingListItemForm';
import Navbar from '../components/Navbar';

export default function ShoppingListPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const res = await axios.get('/api/shopping-list', { headers: getAuthHeaders() });
                setItems(res.data);
                setError('');
            } catch (err) {
                setError('Failed to load shopping list');
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const handleAddOrUpdate = async (data) => {
        try {
            if (editItem) {
                // Update existing
                const res = await axios.put(`/api/shopping-list/${editItem._id}`, data, { headers: getAuthHeaders() });
                setItems(items.map(item => (item._id === editItem._id ? res.data : item)));
                setEditItem(null);
            } else {
                // Add new
                const res = await axios.post('/api/shopping-list', data, { headers: getAuthHeaders() });
                setItems([...items, res.data]);
            }
            setShowForm(false);
            setError('');
        } catch {
            setError('Failed to save item');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/shopping-list/${id}`, { headers: getAuthHeaders() });
            setItems(items.filter(item => item._id !== id));
            setError('');
        } catch {
            setError('Failed to delete item');
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Shopping List</h1>

                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

                {loading ? (
                    <p>Loading shopping list...</p>
                ) : (
                    <>
                        {items.length === 0 ? (
                            <p>No items in your shopping list. Add some!</p>
                        ) : (
                            <ul className="space-y-3">
                                {items.map(item => (
                                    <li key={item._id} className="p-3 border rounded flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {item.quantity} {item.unit}
                                            </p>
                                            {item.notes && <p className="text-xs text-gray-500">{item.notes}</p>}
                                        </div>
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditItem(item);
                                                    setShowForm(true);
                                                }}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {!showForm && (
                            <button
                                onClick={() => {
                                    setEditItem(null);
                                    setShowForm(true);
                                }}
                                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Add Item
                            </button>
                        )}

                        {showForm && (
                            <div className="mt-6">
                                <ShoppingListItemForm
                                    initialData={editItem}
                                    onSubmit={handleAddOrUpdate}
                                    onCancel={() => {
                                        setShowForm(false);
                                        setEditItem(null);
                                    }}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
