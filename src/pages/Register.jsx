import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ CSS variable
  const styles = `
    .container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f1f5f9;
    }

    .card {
      width: 350px;
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .header p {
      font-size: 14px;
      color: gray;
    }

    .field {
      margin-bottom: 15px;
    }

    .field label {
      font-size: 13px;
      display: block;
      margin-bottom: 5px;
    }

    .field input {
      width: 100%;
      padding: 10px;
      border-radius: 6px;
      border: 1px solid #ccc;
    }

    .field input:focus {
      outline: none;
      border-color: #4f46e5;
    }

    .btn {
      width: 100%;
      padding: 10px;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .btn:hover {
      background: #4338ca;
    }

    .error {
      background: #fee2e2;
      color: red;
      padding: 8px;
      margin-bottom: 10px;
      border-radius: 5px;
    }

    .footer {
      text-align: center;
      margin-top: 15px;
      font-size: 14px;
    }
  `;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Inject CSS */}
      <style>{styles}</style>

      <div className="container">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="header">
            <h2>Create Account</h2>
            <p>Join our community</p>
          </div>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="btn"
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Register'}
            </motion.button>
          </form>

          <p className="footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}