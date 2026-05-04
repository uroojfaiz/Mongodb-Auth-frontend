import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Dashboard() {
 const { user, logout } = useAuth();
 const navigate = useNavigate();
 const handleLogout = async () => {
 await logout();
 navigate('/login');
 };
 return (
 <div style={s.container}>
 <div style={s.card}>
 <h2 style={s.title}>Welcome back!</h2>
 <p style={s.sub}>You are successfully logged in</p>
 <div style={s.box}>
 <p style={s.label}>NAME</p>
 <p style={s.val}>{user?.name || 'User'}</p>
 </div>
 <div style={s.box}>
 <p style={s.label}>EMAIL</p>
 <p style={s.val}>{user?.email || 'email@example.com'}</p>
 </div>
 <button onClick={handleLogout} style={s.btn}>Logout</button>
 </div>
 </div>
 );
}
const s = {
 container:{minHeight:'100vh',display:'flex',alignItems:'center',
 justifyContent:'center',backgroundColor:'#f5f5f5'},
 card:{background:'#fff',padding:'2rem',borderRadius:'12px',
 boxShadow:'0 2px 16px rgba(0,0,0,0.08)',width:'100%',maxWidth:'400px'},
 title:{fontSize:'22px',fontWeight:'500',marginBottom:'4px'},
 sub:{fontSize:'14px',color:'#888',marginBottom:'1.5rem'},
 box:{background:'#f9f9f9',padding:'12px 16px',borderRadius:'8px',marginBottom:'12px'},
 label:{fontSize:'11px',color:'#aaa',marginBottom:'2px'},
 val:{fontSize:'15px',fontWeight:'500',color:'#333'},
 btn:{marginTop:'1rem',width:'100%',padding:'11px',borderRadius:'8px',
 border:'none',backgroundColor:'#ef4444',color:'#fff',
 fontSize:'14px',fontWeight:'500',cursor:'pointer'},
};