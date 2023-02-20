import React, { useEffect, useRef } from "react";
import "../styles/three.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function Generate3DModel(props) {
  const canvasRef = useRef(null);
  useEffect(() => {
    // Set up scene, camera, renderer and orbitControl
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Create an axes helper
    const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    camera.position.set(-1, 0.8, 3);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(680,400)
    document.body.appendChild(renderer.domElement);
    // Create 2D shape to extrude
    const thickness = 0.0025; // Thickness of C type Channel
    const web = 0.03; // web of C type Channel
    const flange = 0.015; // flange of C type Channel

    const shape = new THREE.Shape();

    shape.moveTo(0, 0);
    shape.lineTo(0, flange);
    shape.lineTo(web, flange);
    shape.lineTo(web, 0);
    shape.lineTo(web - thickness, 0);
    shape.lineTo(web - thickness, flange - thickness);
    shape.lineTo(thickness, flange - thickness);
    shape.lineTo(thickness, 0);
    shape.lineTo(0, 0);

    // Create Mesh of Three Types
    const extrudeSettings1 = {
      depth: parseFloat(props.width), // along x-axis
      bevelEnabled: false,
    };
    const extrudeSettings2 = {
      depth: parseFloat(props.height), // along y-axis
      bevelEnabled: false,
    };
    const extrudeSettings3 = {
      depth: parseFloat(props.depth), // along z-axis
      bevelEnabled: false,
    };

    renderer.setClearColor(0xF5F5F5);
    
    const geometry1 = new THREE.ExtrudeGeometry(shape, extrudeSettings1);
    const geometry2 = new THREE.ExtrudeGeometry(shape, extrudeSettings2);
    const geometry3 = new THREE.ExtrudeGeometry(shape, extrudeSettings3);

    const material = new THREE.MeshStandardMaterial({
      color: 0x7b7f8c,
      roughness: 0.5,
      metalness: 0.2,
    });
    // const mesh = new THREE.Mesh( geometry, material ) ;
    // scene.add(mesh);
    // mesh.position.set(0,0,0);
    // mesh.rotation.set(Math.PI/2,0,0);
    // Define the geometry of the square section rod
    const size = 0.03; // The size of the rod
    // const geometry1 = new THREE.BoxGeometry(size*10, size, size);
    // const geometry1 = new THREE.BoxGeometry(parseFloat(props.width), size, size);
    // const geometry2 = new THREE.BoxGeometry(size, size*10, size);
    // const geometry2 = new THREE.BoxGeometry(size, parseFloat(props.height), size);
    // const geometry3 = new THREE.BoxGeometry(size, size, size*10);
    // const geometry3 = new THREE.BoxGeometry(size, size, parseFloat(props.depth));

    const pointLight1 = new THREE.PointLight({ color: 0xffffff, intensity: 1 });
    const pointLight2 = new THREE.PointLight({ color: 0xffffff, intensity: 1 });
    const pointLight3 = new THREE.PointLight({ color: 0xffffff, intensity: 1 });
    const pointLight4 = new THREE.PointLight({ color: 0xffffff, intensity: 1 });
    const pointLight5 = new THREE.PointLight({ color: 0xffffff, intensity: 1 });

    pointLight1.position.set(10, 15, 5);
    pointLight2.position.set(10, -15, 5);
    pointLight3.position.set(-2, -5, 0);
    pointLight4.position.set(10, -15, 5);
    pointLight5.position.set(10, -15, 5);

    scene.add(pointLight1, pointLight2);
    // Define the material of the square section rod
    // const material = new THREE.MeshStandardMaterial({ color: 0x7b7f8c, roughness:0.5, metalness:0.2}); // steel color

    // Create the square section rod and add it to the scene
    const rod1 = new THREE.Mesh(geometry2, material);
    rod1.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    const rod2 = new THREE.Mesh(geometry2, material);
    rod2.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
    const rod3 = new THREE.Mesh(geometry2, material);
    rod3.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    const rod4 = new THREE.Mesh(geometry2, material);
    rod4.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
    const rod5 = new THREE.Mesh(geometry1, material);
    rod5.rotation.set(0, Math.PI / 2, 0);
    const rod6 = new THREE.Mesh(geometry1, material);
    rod6.rotation.set(0, Math.PI / 2, 0);
    const rod7 = new THREE.Mesh(geometry1, material);
    rod7.rotation.set(Math.PI, Math.PI / 2, 0);
    const rod8 = new THREE.Mesh(geometry1, material);
    rod8.rotation.set(Math.PI, Math.PI / 2, 0);
    const rod9 = new THREE.Mesh(geometry3, material);
    rod9.rotation.set(0, 0, -Math.PI / 2);
    const rod10 = new THREE.Mesh(geometry3, material);
    rod10.rotation.set(0, 0, Math.PI / 2);
    const rod11 = new THREE.Mesh(geometry3, material);
    rod11.rotation.set(0, 0, Math.PI / 2);
    const rod12 = new THREE.Mesh(geometry3, material);
    rod12.rotation.set(0, 0, -Math.PI / 2);

    // position of rods
    rod1.position.set(size / 2, parseFloat(props.height) / 2, 0);
    rod2.position.set(
      parseFloat(props.width) - size / 2,
      parseFloat(props.height) / 2,
      size
    );
    rod3.position.set(
      size / 2,
      parseFloat(props.height) / 2,
      parseFloat(props.depth) - size
    );
    rod4.position.set(
      parseFloat(props.width) - size / 2,
      parseFloat(props.height) / 2,
      parseFloat(props.depth)
    );
    // rod5.position.set((2.5-0.25),2.5+0.25,0);
    rod5.position.set(0, parseFloat(props.height) / 2 - size / 2, size);
    // rod6.position.set(2.5-0.25,2.5+0.25,5+0.25);
    rod6.position.set(
      0,
      parseFloat(props.height) / 2 - size / 2,
      parseFloat(props.depth)
    );
    // rod7.position.set(2.5-0.25,-2.5-0.25,0);
    rod7.position.set(0, -(parseFloat(props.height) / 2 - size / 2), 0);
    // rod8.position.set(2.5-0.25,-2.75,5+0.25);
    rod8.position.set(
      0,
      -(parseFloat(props.height) / 2 - size / 2),
      parseFloat(props.depth) - size
    );
    // rod9.position.set(5-0.5,2.5+0.25,2.5+0.25);
    rod9.position.set(
      parseFloat(props.width) - size / 2,
      parseFloat(props.height) / 2,
      0
    );
    // rod10.position.set(0,2.5+0.25,2.5+0.25);
    rod10.position.set(size / 2, parseFloat(props.height) / 2 - size, 0);
    // rod11.position.set(0,-2.75,2.5+0.25);
    rod11.position.set(size / 2, -(parseFloat(props.height) / 2), 0);
    // rod12.position.set(5+0.25-0.75,-2.75,2.5+0.25);
    rod12.position.set(
      parseFloat(props.width) - size / 2,
      -(parseFloat(props.height) / 2 - size),
      0
    );

    scene.add(rod1);
    scene.add(rod2);
    scene.add(rod3);
    scene.add(rod4);
    scene.add(rod5);
    scene.add(rod6);
    scene.add(rod7);
    scene.add(rod8);
    scene.add(rod9);
    scene.add(rod10);
    scene.add(rod11);
    scene.add(rod12);

    const light = new THREE.AmbientLight({ color: 0xffffff });
    scene.add(light);

    // orbitcontrols
    const controls = new OrbitControls(camera, renderer.domElement);
    // Animate the scene

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
    // Handeling window resizing
    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  });
  return  <div className="my-canvas-container">
            <canvas id="myCanvas" ref={canvasRef} />
          </div>
}
export default Generate3DModel;
