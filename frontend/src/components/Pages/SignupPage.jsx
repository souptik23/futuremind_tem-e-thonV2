import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { loadFull } from "tsparticles";
import { Particles } from "react-tsparticles";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Squares from "../reactbits/Squares";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const canvasRef = useRef(null);
  const threeSceneRef = useRef(null);
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Three.js setup remains the same as your original code
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // 3D Shape
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x4a90e2,
      metalness: 0.9,
      roughness: 0.1,
      opacity: 0.7,
      transparent: true,
      wireframe: true,
      emissive: 0x4a90e2,
      emissiveIntensity: 0.5,
    });

    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4a90e2, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 6;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      shape.rotation.x += 0.002;
      shape.rotation.y += 0.002;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    threeSceneRef.current = { scene, camera, renderer, controls, shape };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSuccess = (message) => toast.success(message);
  const handleError = (message) => toast.error(message);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      handleError('Name, email, and password are required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || `Signup failed: ${response.status}`);
      }

      handleSuccess('Account created successfully!');
      // Don't automatically proceed to WebAuthn registration
      // Wait for user to click the fingerprint button
    } catch (err) {
      handleError(err.message || 'Something went wrong during signup');
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebAuthnSignup = async () => {
    if (!signupInfo.email) {
      handleError('Please complete signup first');
      return;
    }

    setIsLoading(true);
    try {
      // Step 1: Get challenge from server
      const challengeResponse = await fetch('http://localhost:8080/auth/register-challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ userId: signupInfo.email })
      });

      if (!challengeResponse.ok) {
        const errorData = await challengeResponse.json();
        throw new Error(errorData.message || 'Failed to get registration challenge');
      }

      const { options } = await challengeResponse.json();

      // Step 2: Prepare options for WebAuthn
      const publicKeyCredentialCreationOptions = {
        ...options,
        challenge: Uint8Array.from(
          atob(options.challenge.replace(/-/g, '+').replace(/_/g, '/')),
          c => c.charCodeAt(0)
        ),
        user: {
          ...options.user,
          id: Uint8Array.from(
            atob(options.user.id.replace(/-/g, '+').replace(/_/g, '/')),
            c => c.charCodeAt(0)
          ),
        }
      };

      // Step 3: Create credential
      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      });

      // Step 4: Prepare credential for server verification
      const credentialForServer = {
        id: credential.id,
        rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, ''),
        response: {
          attestationObject: btoa(String.fromCharCode(...new Uint8Array(credential.response.attestationObject)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, ''),
          clientDataJSON: btoa(String.fromCharCode(...new Uint8Array(credential.response.clientDataJSON)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, ''),
        },
        type: credential.type
      };

      // Step 5: Verify with server
      const verifyResponse = await fetch('http://localhost:8080/auth/register-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: signupInfo.email,
          credential: credentialForServer
        })
      });

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        throw new Error(errorData.message || 'WebAuthn verification failed');
      }

      const result = await verifyResponse.json();
      handleSuccess('WebAuthn registration successful!');
      
      // Navigate to login page after short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      handleError(error.message || 'WebAuthn registration failed');
      console.error('WebAuthn error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black relative overflow-hidden">
      <Squares
        direction="diagonal"
        speed={1}
        borderColor="#999"
        squareSize={70}
        hoverFillColor="#222"
        className="absolute inset-0 z-0"
      />
      <Particles
        id="tsparticles"
        init={loadFull}
        options={{
          particles: {
            number: { value: 50, density: { enable: true, area: 800 } },
            color: { value: ["#4a90e2", "#9b51e0"] },
            links: { enable: true, opacity: 0.2, distance: 150 },
            move: { enable: true, speed: 1 },
            shape: { type: "circle" },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
      />

      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-11/12 max-w-md p-6 sm:p-8 rounded-2xl backdrop-blur-xl bg-white/10 shadow-2xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">Create Account</h2>

        {error && (
          <div className="mt-4 p-3 text-center text-red-300 bg-red-500/20 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={signupInfo.name}
              onChange={handleChange}
              placeholder="Enter your name..."
              className="w-full px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 transition-all"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="relative">
            <input
              type="email"
              name="email"
              value={signupInfo.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className="w-full px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 transition-all"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={signupInfo.password}
              onChange={handleChange}
              placeholder="Enter your password..."
              className="w-full px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 transition-all"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              disabled={isLoading}
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg transition-all hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-6 h-6 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleWebAuthnSignup}
            disabled={isLoading}
            className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg transition-all hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-6 h-6 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Register with Fingerprint'
            )}
          </button>
        </div>
      </motion.div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default SignupPage;