import React, { useEffect,useRef } from 'react';
import * as THREE from 'three';
import "../styles/three.css";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const ExtrudeGeometry = (props) => {
    const canvasRef = useRef(null);
    useEffect( () => {
        
        // Create a new scene
        const scene = new THREE.Scene();

        // Create a new camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Create a new renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(300,300)
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Define the geometry of the square section rod
        const size = 0.05; // The size of the rod
    
        const geometry1 = new THREE.BoxGeometry(parseFloat(props.width), size, size);
  
        const geometry2 = new THREE.BoxGeometry(size, parseFloat(props.height), size);
    
        const geometry3 = new THREE.BoxGeometry(size, size, parseFloat(props.depth));

        // Create a new material
        const material = new THREE.MeshStandardMaterial({
            color: 0x7b7f8c,
            roughness: 0.5,
            metalness: 0.2,
          })

        // Create a new mesh using the material and geometry
        const mesh1 = new THREE.Mesh(geometry1, material);
        const mesh2 = new THREE.Mesh(geometry1, material);
        const mesh3 = new THREE.Mesh(geometry1, material);
        const mesh4 = new THREE.Mesh(geometry1, material);
        const mesh5 = new THREE.Mesh(geometry2, material);
        const mesh6 = new THREE.Mesh(geometry2, material);
        const mesh7 = new THREE.Mesh(geometry2, material);
        const mesh8 = new THREE.Mesh(geometry2, material);
        const mesh9 = new THREE.Mesh(geometry3, material);
        const mesh10 = new THREE.Mesh(geometry3, material);
        const mesh11 = new THREE.Mesh(geometry3, material);
        const mesh12 = new THREE.Mesh(geometry3, material);

          mesh1.position.set(0,0,0);
          mesh2.position.set(
            parseFloat(props.width) - size / 2,
            parseFloat(props.height) / 2,
            size
          );
          mesh3.position.set(
            size / 2,
            parseFloat(props.height) / 2,
            parseFloat(props.depth) - size
          );
          mesh4.position.set(
            parseFloat(props.width) - size / 2,
            parseFloat(props.height) / 2,
            parseFloat(props.depth)
          );
          // rod5.position.set((2.5-0.25),2.5+0.25,0);
          mesh5.position.set(0, parseFloat(props.height) / 2 - size / 2, size);
          // rod6.position.set(2.5-0.25,2.5+0.25,5+0.25);
          mesh6.position.set(
            0,
            parseFloat(props.height) / 2 - size / 2,
            parseFloat(props.depth)
          );
          // rod7.position.set(2.5-0.25,-2.5-0.25,0);
          mesh7.position.set(0, -(parseFloat(props.height) / 2 - size / 2), 0);
          // rod8.position.set(2.5-0.25,-2.75,5+0.25);
          mesh8.position.set(
            0,
            -(parseFloat(props.height) / 2 - size / 2),
            parseFloat(props.depth) - size
          );
          // rod9.position.set(5-0.5,2.5+0.25,2.5+0.25);
          mesh9.position.set(
            parseFloat(props.width) - size / 2,
            parseFloat(props.height) / 2,
            0
          );
          // rod10.position.set(0,2.5+0.25,2.5+0.25);
          mesh10.position.set(size / 2, parseFloat(props.height) / 2 - size, 0);
          // rod11.position.set(0,-2.75,2.5+0.25);
          mesh11.position.set(size / 2, -(parseFloat(props.height) / 2), 0);
          // rod12.position.set(5+0.25-0.75,-2.75,2.5+0.25);
          mesh12.position.set(
            parseFloat(props.width) - size / 2,
            -(parseFloat(props.height) / 2 - size),
            0
          );

        // Add the mesh to the scene
        scene.add(mesh1,mesh2,mesh3,mesh4,mesh5,mesh6,mesh7,mesh8,mesh9,mesh10,mesh11,mesh12);

        // Render the scene
        renderer.setClearColor(0xF5F5F5);
        renderer.render(scene, camera);

        const pointLight1 = new THREE.PointLight({ color:0xffffff, intensity:1 });
        const pointLight2 = new THREE.PointLight({ color:0xffffff, intensity:1 });
        const pointLight3 = new THREE.PointLight({ color:0xffffff, intensity:1 });

        pointLight1.position.set(0,-5,10)
        pointLight2.position.set(0,10,2)
        pointLight3.position.set(-10,10,2)

        scene.add(pointLight1,pointLight2,pointLight3);
        
        // orbitcontrols
        const controls = new OrbitControls(camera, renderer.domElement);
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            });

        animate();
        return (
            <div className="my-canvas-container">
            <canvas id="myCanvas" ref={canvasRef} />
          </div>

        );
    }
    );
}

export default ExtrudeGeometry;