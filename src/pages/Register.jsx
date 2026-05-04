import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion'; // Animation ke liye

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4">
      {/* Animated Card using Framer Motion */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-300/50 p-8 border border-slate-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Create account</h2>
          <p className="text-slate-500 mt-2 text-sm">Join our community and start blogging</p>
        </div>

        {error && (
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Maria Hussain"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-slate-50/50 focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-slate-50/50 focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 bg-slate-50/50 focus:bg-white"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 transition-all ${
              loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating account...
              </span>
            ) : 'Register'}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
