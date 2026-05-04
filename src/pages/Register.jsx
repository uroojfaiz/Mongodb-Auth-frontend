import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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

  // ✅ ALL CSS IN ONE VARIABLE (NO TAILWIND)
  const styles = `
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: linear-gradient(to bottom right, #f8fafc, #e2e8f0);
    }

    .container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .card {
      width: 100%;
      max-width: 420px;
      background: white;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      border: 1px solid #e5e7eb;
    }

    .title {
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      color: #1f2937;
    }

    .subtitle {
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      margin-top: 5px;
    }

    .error {
      background: #fee2e2;
      border-left: 4px solid #ef4444;
      color: #b91c1c;
      padding: 10px;
      margin: 15px 0;
      border-radius: 6px;
      font-size: 13px;
    }

    .field {
      margin-bottom: 15px;
    }

    .label {
      font-size: 12px;
      font-weight: bold;
      color: #4b5563;
      text-transform: uppercase;
      margin-bottom: 5px;
      display: block;
    }

    .input {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      border: 1px solid #d1d5db;
      background: #f9fafb;
      outline: none;
      transition: 0.2s;
    }

    .input:focus {
      border-color: #6366f1;
      background: white;
      box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
    }

    .button {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 10px;
      background: #4f46e5;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s;
    }

    .button:hover {
      background: #4338ca;
    }

    .button:disabled {
      background: #a5b4fc;
      cursor: not-allowed;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 13px;
      color: #6b7280;
    }

    .link {
      color: #4f46e5;
      font-weight: bold;
      text-decoration: none;
    }

    .link:hover {
      text-decoration: underline;
    }
  `;

  return (
    <>
      {/* Inject CSS */}
      <style>{styles}</style>

      <div className="container">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="title">Create Account</h2>
          <p className="subtitle">Join our community and start blogging</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Full Name</label>
              <input
                className="input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Maria Hussain"
                required
              />
            </div>

            <div className="field">
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="field">
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button className="button" type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="footer">
            Already have an account?{' '}
            <Link className="link" to="/login">
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
