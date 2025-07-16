import React from 'react';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-gray-50">
            <h1 className="text-5xl font-extrabold mb-6 text-indigo-600 text-center">
                Welcome to Smart Grocery
            </h1>
            <p className="max-w-xl text-lg text-gray-700 mb-8 text-center">
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
                    className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition"
                >
                    Register
                </a>
            </div>

            <div className="mt-12">
                {/* <img
                    src="https://undraw.co/api/illustrations/undraw_pantry.svg"
                    alt="Pantry illustration"
                    className="mx-auto w-96 max-w-full"
                    style={{ maxHeight: '300px' }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=Pantry+Illustration';
                    }}
                /> */}
            </div>
        </div>
    );
}
