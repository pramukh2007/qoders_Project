import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Receipt Scanner</h1>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className={`text-white ${location.pathname === '/dashboard' ? 'underline' : ''}`}>
                Dashboard
              </Link>
              <Link to="/upload-receipt" className={`text-white ${location.pathname === '/upload-receipt' ? 'underline' : ''}`}>
                Upload Receipt
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="text-white hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`text-white ${location.pathname === '/login' ? 'underline' : ''}`}>
                Login
              </Link>
              <Link to="/register" className={`text-white ${location.pathname === '/register' ? 'underline' : ''}`}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;