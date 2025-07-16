import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ProfilePage() {
    const [profile, setProfile] = useState({ name: '', email: '', timezone: '' });
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ name: '', timezone: '' });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    // Helper to get auth token headers
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/api/auth/me', {
                    headers: getAuthHeaders(),
                });
                setProfile(res.data);
                setForm({ name: res.data.name, timezone: res.data.timezone });
            } catch (err) {
                setError('Failed to fetch profile. Please login again.');
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handlePasswordChange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
        setPasswordError('');
        setPasswordSuccess('');
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await axios.put(
                '/api/auth/me',
                { name: form.name, timezone: form.timezone },
                { headers: getAuthHeaders() }
            );
            setSuccess('Profile updated successfully!');
            setProfile((prev) => ({ ...prev, name: form.name, timezone: form.timezone }));
            setEditMode(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        try {
            await axios.post(
                '/api/auth/change-password',
                {
                    currentPassword: passwordForm.currentPassword,
                    newPassword: passwordForm.newPassword,
                },
                { headers: getAuthHeaders() }
            );
            setPasswordSuccess('Password changed successfully!');
            setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        } catch (err) {
            setPasswordError(err.response?.data?.message || 'Failed to change password');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>

            <Navbar />
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                <h2 className="text-3xl font-semibold mb-6 text-center">My Profile</h2>

                {/* Display basic info */}
                {!editMode ? (
                    <div className="mb-6">
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Timezone:</strong> {profile.timezone}</p>
                        <button
                            onClick={() => setEditMode(true)}
                            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleUpdateProfile} className="space-y-4 mb-6">
                        {error && <p className="text-red-600">{error}</p>}
                        {success && <p className="text-green-600">{success}</p>}

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleFormChange}
                            placeholder="Name"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            name="timezone"
                            value={form.timezone}
                            onChange={handleFormChange}
                            placeholder="Timezone"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setEditMode(false);
                                    setForm({ name: profile.name, timezone: profile.timezone });
                                    setError('');
                                    setSuccess('');
                                }}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {/* Change Password Form */}
                <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                    {passwordError && <p className="text-red-600 mb-2">{passwordError}</p>}
                    {passwordSuccess && <p className="text-green-600 mb-2">{passwordSuccess}</p>}
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <input
                            type="password"
                            name="currentPassword"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="Current Password"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="New Password"
                            required
                            minLength={6}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="password"
                            name="confirmNewPassword"
                            value={passwordForm.confirmNewPassword}
                            onChange={handlePasswordChange}
                            placeholder="Confirm New Password"
                            required
                            minLength={6}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                            Change Password
                        </button>
                    </form>
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}
