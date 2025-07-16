import { useState } from 'react';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import PantryPage from './pages/PantryPage.jsx';

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showLogin, setShowLogin] = useState(true);

  if (user) {
    return <PantryPage />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {showLogin ? (
        <>
          <Login
            onLoginSuccess={(user) => {
              setUser(user);
              setShowLogin(false);
              localStorage.setItem('user', JSON.stringify(user));
            }}
          />
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => setShowLogin(false)}
              className="text-indigo-600 hover:underline"
            >
              Register here
            </button>
          </p>
        </>
      ) : (
        <>
          <Register />
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => setShowLogin(true)}
              className="text-indigo-600 hover:underline"
            >
              Login here
            </button>
          </p>
        </>
      )}
    </div>
  );
}
