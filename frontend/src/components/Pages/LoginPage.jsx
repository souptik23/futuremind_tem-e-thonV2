import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Squares from "../reactbits/Squares";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSuccess = (message) => toast.success(message);
  const handleError = (message) => toast.error(message);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Added for cookie handling
        body: JSON.stringify(loginInfo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      handleSuccess('Login successful!');
      localStorage.setItem('token', data.token);
      navigate('/home');
    } catch (error) {
      handleError(error.message || 'An error occurred during login');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebAuthnLogin = async () => {
    if (!loginInfo.email) {
      handleError('Email is required for WebAuthn login');
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Get challenge from server
      const challengeResponse = await fetch('http://localhost:8080/auth/login-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId: loginInfo.email }),
      });

      if (!challengeResponse.ok) {
        const errorData = await challengeResponse.json();
        throw new Error(errorData.message || 'Failed to get authentication challenge');
      }

      const { options } = await challengeResponse.json();

      // Step 2: Prepare options for WebAuthn
      const publicKeyCredentialRequestOptions = {
        ...options,
        challenge: Uint8Array.from(
          atob(options.challenge.replace(/-/g, '+').replace(/_/g, '/')), 
          c => c.charCodeAt(0)
        ),
        allowCredentials: options.allowCredentials?.map(credential => ({
          ...credential,
          id: Uint8Array.from(
            atob(credential.id.replace(/-/g, '+').replace(/_/g, '/')),
            c => c.charCodeAt(0)
          ),
        })),
      };

      // Step 3: Get credential from browser
      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
      });

      // Step 4: Prepare credential for server verification
      const credentialForServer = {
        id: credential.id,
        rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, ''),
        response: {
          authenticatorData: btoa(String.fromCharCode(...new Uint8Array(credential.response.authenticatorData)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, ''),
          clientDataJSON: btoa(String.fromCharCode(...new Uint8Array(credential.response.clientDataJSON)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, ''),
          signature: btoa(String.fromCharCode(...new Uint8Array(credential.response.signature)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, ''),
        },
        type: credential.type,
      };

      // Step 5: Verify with server
      const verifyResponse = await fetch('http://localhost:8080/auth/login-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          userId: loginInfo.email,
          credential: credentialForServer
        }),
      });

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        throw new Error(errorData.message || 'WebAuthn verification failed');
      }

      const result = await verifyResponse.json();
      handleSuccess('Login successful!');
      localStorage.setItem('token', result.token);
      navigate('/home');
    } catch (error) {
      handleError(error.message || 'WebAuthn login failed');
      console.error('WebAuthn error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black relative overflow-hidden">
      <Squares direction="diagonal" speed={1} strokeColor="#333" fillColor="#111" hoverFillColor="#222" className="absolute inset-0 z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-96 relative z-10"
      >
        <motion.h2 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3 }} 
          className="text-3xl font-bold mb-6 text-white text-center"
        >
          Welcome Back
        </motion.h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="group">
            <label className="block text-white font-medium mb-2">Email</label>
            <input 
              type="email" 
              name="email" 
              value={loginInfo.email} 
              onChange={handleChange} 
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 text-white placeholder-white/50 transition-all duration-300" 
              placeholder="Enter your email..." 
              required 
              disabled={isLoading}
            />
          </div>

          <div className="group relative">
            <label className="block text-white font-medium mb-2">Password</label>
            <input 
              type={isPasswordVisible ? "text" : "password"} 
              name="password" 
              value={loginInfo.password} 
              onChange={handleChange} 
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 text-white placeholder-white/50 transition-all duration-300" 
              placeholder="Enter your password..." 
              required 
              disabled={isLoading}
            />
            <button 
              type="button" 
              className="absolute right-3 top-[42px] text-white/70 hover:text-white transition-colors" 
              onClick={togglePasswordVisibility}
              disabled={isLoading}
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            type="submit" 
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg transition-all hover:shadow-xl disabled:opacity-50" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-white">Or continue with</span>
          </div>
        </div>

        <div className="mt-6">
          <button 
            type="button" 
            onClick={handleWebAuthnLogin} 
            className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg transition-all hover:opacity-90 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Login with Fingerprint'
            )}
          </button>
        </div>
      </motion.div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Login;