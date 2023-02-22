import React, { useRef } from "react";
import "../styles/three.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DoubleSide } from "three";

function Generate3DModel(props) {
  const canvasRef = useRef(null);

  const renderPanel = () => {
    // Set up scene, camera, renderer and orbitControl
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(-1, 0.8, 3);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(680, 400);
    renderer.setClearColor(0xf5f5f5);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Handeling window resizing
    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Create an axes helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

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
    const dimensions = {
      width: parseFloat(props.width),
      height: parseFloat(props.height),
      depth: parseFloat(props.depth),
    };

    const extrudeSettings1 = {
      depth: dimensions.width, // along x-axis
      bevelEnabled: false,
    };
    const extrudeSettings2 = {
      depth: dimensions.height, // along y-axis
      bevelEnabled: false,
    };
    const extrudeSettings3 = {
      depth: dimensions.depth, // along z-axis
      bevelEnabled: false,
    };

    const geometry1 = new THREE.ExtrudeGeometry(shape, extrudeSettings1);
    const geometry2 = new THREE.ExtrudeGeometry(shape, extrudeSettings2);
    const geometry3 = new THREE.ExtrudeGeometry(shape, extrudeSettings3);

    const material = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.4,
      metalness: 0.6
    });

    // Defining the geometry of the c type channel and setting up its position
    const channel1 = new THREE.Mesh(geometry2, material);
    channel1.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    channel1.position.set(web / 2, dimensions.height / 2, 0);

    const channel2 = new THREE.Mesh(geometry2, material);
    channel2.rotation.set(Math.PI / 2, 0, -(Math.PI / 2));
    channel2.position.set(dimensions.width - web / 2, dimensions.height / 2, web);

    const channel3 = new THREE.Mesh(geometry2, material);
    channel3.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    channel3.position.set(web / 2, dimensions.height / 2, dimensions.depth - web);

    const channel4 = new THREE.Mesh(geometry2, material);
    channel4.rotation.set(Math.PI / 2, 0, -(Math.PI / 2));
    channel4.position.set(
      dimensions.width - web / 2,
      dimensions.height / 2,
      dimensions.depth
    );

    const channel5 = new THREE.Mesh(geometry1, material);
    channel5.rotation.set(0, Math.PI / 2, 0);
    channel5.position.set(0, dimensions.height / 2 - web / 2, web);

    const channel6 = new THREE.Mesh(geometry1, material);
    channel6.rotation.set(0, Math.PI / 2, 0);
    channel6.position.set(0, dimensions.height / 2 - web / 2, dimensions.depth);

    const channel7 = new THREE.Mesh(geometry1, material);
    channel7.rotation.set(Math.PI, Math.PI / 2, 0);
    channel7.position.set(0, -(dimensions.height / 2 - web / 2), 0);

    const channel8 = new THREE.Mesh(geometry1, material);
    channel8.rotation.set(Math.PI, Math.PI / 2, 0);
    channel8.position.set(
      0,
      -(dimensions.height / 2 - web / 2),
      (dimensions.depth - web)
    );

    const channel9 = new THREE.Mesh(geometry3, material);
    channel9.rotation.set(0, 0, -(Math.PI / 2));
    channel9.position.set(dimensions.width - web / 2, dimensions.height / 2, 0);

    const channel10 = new THREE.Mesh(geometry3, material);
    channel10.rotation.set(0, 0, Math.PI / 2);
    channel10.position.set(web / 2, dimensions.height / 2 - web, 0);

    const channel11 = new THREE.Mesh(geometry3, material);
    channel11.rotation.set(0, 0, Math.PI / 2);
    channel11.position.set(web / 2, -(dimensions.height / 2), 0);

    const channel12 = new THREE.Mesh(geometry3, material);
    channel12.rotation.set(0, 0, -(Math.PI / 2));
    channel12.position.set(
      dimensions.width - web / 2,
      -(dimensions.height / 2 - web),
      0
    );

    scene.add(
      channel1,
      channel2,
      channel3,
      channel4,
      channel5,
      channel6,
      channel7,
      channel8,
      channel9,
      channel10,
      channel11,
      channel12
    );

    // creating metal sheets
    const sheetMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.8,
      metalness: 0.8,
      side: DoubleSide
    });

    const topBottomSheetGeometry = new THREE.PlaneGeometry(
      dimensions.width,
      dimensions.depth
    );
    const leftRightSheetGeometry = new THREE.PlaneGeometry(
      dimensions.depth,
      dimensions.height
    );
    const backSheetGeometry = new THREE.PlaneGeometry(
      dimensions.width,
      dimensions.height
    );

    const topSheet = new THREE.Mesh(topBottomSheetGeometry, sheetMaterial);
    topSheet.position.set((dimensions.width / 2),(dimensions.height / 2),(dimensions.depth / 2));
    topSheet.rotation.set((Math.PI / 2), 0 , 0);

    const bottomSheet = new THREE.Mesh(topBottomSheetGeometry, sheetMaterial);
    bottomSheet.position.set((dimensions.width / 2),-(dimensions.height / 2),(dimensions.depth / 2));
    bottomSheet.rotation.set((Math.PI / 2), 0 , 0);

    const leftSheet = new THREE.Mesh(leftRightSheetGeometry, sheetMaterial);
    leftSheet.position.set(0,0,(dimensions.depth / 2));
    leftSheet.rotation.set(0, (Math.PI / 2) , 0);

    const rightSheet = new THREE.Mesh(leftRightSheetGeometry, sheetMaterial);
    rightSheet.position.set((dimensions.width),0,(dimensions.depth / 2));
    rightSheet.rotation.set(0, (Math.PI / 2) , 0);

    const backSheet = new THREE.Mesh(backSheetGeometry, sheetMaterial);
    backSheet.position.set((dimensions.width/2),0,0);

    scene.add(
      topSheet, 
      bottomSheet, 
      leftSheet, 
      rightSheet, 
      backSheet
    );
   
    // Adding Lights to the scene
    const ambientLight = new THREE.AmbientLight({
      color: 0xffffff,
      intensity: 1,
    });
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight({ color: 0xffffff, intensity: 1 });
    pointLight1.position.set(2, 6, 3);

    const pointLight2 = new THREE.PointLight({ color: 0xffffff, intensity: 1 });
    pointLight2.position.set(10, -15, 5);

    const pointLight3 = new THREE.PointLight({ color: 0xffffff, intensity: 1 });
    pointLight3.position.set(-2, -5, 0);

    const pointLight4 = new THREE.PointLight({ color: 0xffffff, intensity: 1 });
    pointLight4.position.set(10, -15, 5);

    const pointLight5 = new THREE.PointLight({ color: 0xffffff, intensity: 1 });
    pointLight5.position.set(10, -15, 5);

    // scene.add(
    //   pointLight1, 
    //   pointLight2, 
    //   pointLight3, 
    //   pointLight4, 
    //   pointLight5
    // );

    // Animate the scene
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    return (
      <div className="my-canvas-container">
        <canvas id="myCanvas" ref={canvasRef} />
      </div>
    );
  };
renderPanel();
}
export default Generate3DModel;
