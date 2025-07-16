import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-indigo-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 font-bold text-xl cursor-pointer">
                        <Link to="/">SmartGrocery</Link>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link
                            to="/"
                            className="hover:bg-indigo-500 px-3 py-2 rounded-md transition"
                        >
                            Home
                        </Link>
                        <Link
                            to="/pantry"
                            className="hover:bg-indigo-500 px-3 py-2 rounded-md transition"
                        >
                            Pantry
                        </Link>
                        <Link
                            to="/shopping-list"
                            className="hover:bg-indigo-500 px-3 py-2 rounded-md transition"
                        >
                            Shopping List
                        </Link>
                        <Link
                            to="/profile"
                            className="hover:bg-indigo-500 px-3 py-2 rounded-md transition"
                        >
                            Profile
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-indigo-700 px-2 pt-2 pb-3 space-y-1">
                    <Link
                        to="/"
                        className="block px-3 py-2 rounded-md hover:bg-indigo-500"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/pantry"
                        className="block px-3 py-2 rounded-md hover:bg-indigo-500"
                        onClick={() => setIsOpen(false)}
                    >
                        Pantry
                    </Link>
                    <Link
                        to="/shopping-list"
                        className="block px-3 py-2 rounded-md hover:bg-indigo-500"
                        onClick={() => setIsOpen(false)}
                    >
                        Shopping List
                    </Link>
                    <Link
                        to="/profile"
                        className="block px-3 py-2 rounded-md hover:bg-indigo-500"
                        onClick={() => setIsOpen(false)}
                    >
                        Profile
                    </Link>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            handleLogout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-md bg-red-500 hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}
