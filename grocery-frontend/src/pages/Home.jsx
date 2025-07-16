import React from 'react';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-6" style={{ backgroundColor: '#111827' }}>
            <h1 className="text-5xl font-extrabold mb-6 text-indigo-400 text-center text-white">
                Welcome to Smart Grocery
            </h1>
            <p className="max-w-xl text-lg text-gray-300 mb-8 text-center">
                Manage your pantry, track expiration dates, and create smart shopping lists — all in one place.
            </p>

            <div className="space-x-4">
                <a
                    href="/login"
                    className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                    Login
                </a>
                <a
                    href="/register"
                    className="px-8 py-3 border border-indigo-600 text-indigo-400 rounded-md hover:bg-indigo-700 transition"
                >
                    Register
                </a>
            </div>
        </div>
    );
}
