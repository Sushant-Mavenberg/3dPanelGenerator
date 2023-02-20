import React, { useState } from "react";
import Generate3DModel from './components/three';
import ExtrudeGeometry from "./components/try";

function App() {
  const [showComponent, setShowComponent] = useState(false);
  const [measurements, setMeasurements] = useState({
    width: 0,
    height:0,
    depth:0
  });

  const handleMeasurement = (e) => {
    const name = e.target.name;
    const value =
    e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setMeasurements({
      ...measurements,
      [name]: value
    })
  }
  const handleButtonClick = (event) => {
    setShowComponent(true);
  };
  return (
    <div>
      <header>
        <h1>3D-Generator</h1>
      </header>
      <div className='container'>
        <div>
          <input id = 'width' type="text" name="width" onChange={handleMeasurement}/> <br />
          <label>Width</label>
        </div>
        <div>
          <input id ='height' type="text"  name="height" onChange={handleMeasurement}/> <br />
          <label>Height</label>
        </div>
        <div>
          <input id = 'depth' type="text" name='depth' onChange={handleMeasurement} /> <br />
          <label>Depth</label>
        </div>
      </div>
      <div>
        <button onClick={handleButtonClick}>Generate 3D Model</button>
        {showComponent && <ExtrudeGeometry width={measurements.width} height={measurements.height} depth={measurements.depth}/>}
      </div>
    </div>
  );
}

export default App;
