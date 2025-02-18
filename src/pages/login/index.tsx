import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import apiFetch from '../../utils/axios';
import './style.css';

export default function Login(): JSX.Element {
  const navigate = useNavigate();

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const { username, password } = ev.target as typeof ev.target & {
      username: { value: string };
      password: { value: string };
    };

    try {
      const response = await apiFetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: username.value,
          password: password.value,
        },
      });

      if (response.status >= 400) {
        throw new Error(response.data.message);
      }

      const data = await response.data;
      localStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      document.cookie = `token=${data.token}; path=/;`;

      navigate('/'); // Redirect ke halaman home
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        alert(err.message);
        return;
      }
      alert('Ada masalah pada server');
    }
  }

  return (
    <div className="login-wrapper">
      <div className="foto">
        <div className="circle"></div>
        <img src="/src/assets/OIP (3).jpg" alt="Foto Profil" />
      </div>

      <div className="card">
        <div className="form">
          <h2>Login</h2>
          <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
              </div>
              <div className="forget-signup">
                <a href="#">Forget Password?</a>
              </div>
              {/* Container untuk tombol Login dan link Sign Up */}
              <div className="btn-container">
                <button type="submit" className="login-btn">
                  Login
                </button>
                <a className="signup-link" onClick={() => navigate('/register')}>
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="copyright">
        <p>
          Created by{' '}
          <a href="https://www.instagram.com/fauzan_azhri.zip/" target="_blank" rel="noreferrer">
            Dzulfikar hidayat
          </a>
        </p>
      </div>
    </div>
  );
}
