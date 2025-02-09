import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const BankBuildingScene = () => {
  const mountRef = useRef(null);
  const modelRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparency
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load('/src/assets/bank-building.glb', (gltf) => {
      modelRef.current = gltf.scene;

      // Center and scale the model
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = new THREE.Vector3();
      box.getCenter(center);
      modelRef.current.position.sub(center); // Center the model
      modelRef.current.scale.set(0.5, 0.5, 0.5); // Scale down the model

      scene.add(modelRef.current);
    }, undefined, (error) => {
      console.error('An error occurred while loading the model:', error);
    });

    // Camera position
    camera.position.z = 5;

    // Handle mouse move for hover-based rotation
    const handleMouseMove = (event) => {
      if (isHovered && modelRef.current) {
        const rect = mountRef.current.getBoundingClientRect();
        mouseXRef.current = ((event.clientX - rect.left) / rect.width) * 2 - 1; // Normalize to [-1, 1]
        mouseYRef.current = -((event.clientY - rect.top) / rect.height) * 2 + 1; // Normalize to [-1, 1]
      }
    };

    // Handle hover state
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    mountRef.current.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('mouseenter', handleMouseEnter);
    mountRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the model horizontally based on mouse position
      if (isHovered && modelRef.current) {
        modelRef.current.rotation.y = mouseXRef.current * Math.PI; // Rotate only around Y-axis
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
      mountRef.current.removeEventListener('mousemove', handleMouseMove);
      mountRef.current.removeEventListener('mouseenter', handleMouseEnter);
      mountRef.current.removeEventListener('mouseleave', handleMouseLeave);
      modelRef.current = null;
    };
  }, [isHovered]); // Re-run effect when hover state changes

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }}></div>;
};

export default BankBuildingScene;