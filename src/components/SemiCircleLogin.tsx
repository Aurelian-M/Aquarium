
import React, { useState } from 'react';
import './SemiCircleLogin.css';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../utils/AuthUtiles';
import { useAuth } from '../context/authContext';

const SemiCircleLogin: React.FC = () => {
  const [mode, setMode] = useState<'guest' | 'hater' | 'login'>('guest');
  const [formType, setFormType] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (formType === "register") {
      if (password !== confirmPassword) {
        alert("❌ Passwords do not match.");
        return;
      }

      const newUser = { username, password, isAdmin: role === "admin" };
      const registeredUser = await registerUser(newUser);
      if (!registeredUser) {
        alert("❌ Registration failed.");
        return;
      }

    
      const loginResult = await loginUser(username, password);
      if (loginResult) {
        login(loginResult.user, loginResult.token);
        navigate("/mainweb");
      } else {
        alert("❌ Login failed after registration.");
      }
    }

    if (formType === "login") {
      const loginResult = await loginUser(username, password);
      if (!loginResult) {
        alert("❌ Invalid username or password.");
        return;
      }

      login(loginResult.user, loginResult.token);
      navigate("/mainweb");
    }
  };

  return (
    <div className="circle-wrapper">
      <div className={`circle-container ${mode === 'login' ? 'open' : ''}`}>
        <h2 className='h2'> Visit as a:</h2>
        <div className="top-row">
          <button className="segment guest" onClick={() => {
            login({id:33, username: "Guest", role: "guest" });
            navigate('/mainweb');
          }}>Guest</button>

          <button className="segment hater" onClick={() => {
            login({id:34, username: "Hater", role: "hater" });
            navigate('/mainweb');
          }}>Hater</button>
        </div>

        {mode !== 'login' && (
          <button className="segment login" onClick={() => setMode('login')}>
            Login
          </button>
        )}

        {mode === 'login' && (
          <div className="login-form">
            <div className="form-toggle">
              <button className={formType === 'login' ? 'active' : ''} onClick={() => setFormType('login')}>Login</button>
              <button className={formType === 'register' ? 'active' : ''} onClick={() => setFormType('register')}>Register</button>
            </div>

            <form onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}>
              <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
              {formType === 'register' && (
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              )}
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              {formType === 'register' && (
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
              )}
              {formType === 'register' && (
                <select value={role} onChange={e => setRole(e.target.value as 'user' | 'admin')}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              )}
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SemiCircleLogin;
