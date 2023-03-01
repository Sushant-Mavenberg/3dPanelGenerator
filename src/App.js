import React, { useState } from "react";
import Generate3DModel from "./components/panel3d";
function App() {
  const [showComponent, setShowComponent] = useState(false);
  const [measurements, setMeasurements] = useState({
    width: 0,
    height: 0,
    depth: 0,
    sectionWidth: 0,
  });
  const [sections, setSections] = useState([{ width: "", feeders: [] }]);

  const handleMeasurement = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMeasurements({
      ...measurements,
      [name]: value,
    });
  };

  const handleButtonClick = (e) => {
    setShowComponent(true);
  };

  const handleSectionWidthChange = (event, sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].width = event.target.value;
    setSections(newSections);
  };

  const handleFeederHeightChange = (event, sectionIndex, feederIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].feeders[feederIndex].height = event.target.value;
    setSections(newSections);
  };

  const addFeeder = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].feeders.push({ height: "" });
    setSections(newSections);
  };

  const addSection = () => {
    const newSections = [...sections, { width: "", feeders: [] }];
    setSections(newSections);
  };

  // Getting value of radio input
  const radios = document.getElementsByName("options");
  let selectedValue;

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      selectedValue = radios[i].value;
      break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sections);
    // do something with the sections array
  };

  return (
    <div>
      <header>
        <h1>3D-Generator</h1>
      </header>
      <div className="container">
        <div>
          <label>Width</label>
          <br />
          <input
            id="width"
            type="text"
            name="width"
            onChange={handleMeasurement}
          />
        </div>

        <div>
          <label>Height</label>
          <br />
          <input
            id="height"
            type="text"
            name="height"
            onChange={handleMeasurement}
          />
        </div>

        <div>
          <label>Depth</label>
          <br />
          <input
            id="depth"
            type="text"
            name="depth"
            onChange={handleMeasurement}
          />

          <div>
            <form onSubmit={handleSubmit}>
              {sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <label>
                    Section Width:
                    <input
                      type="text"
                      value={section.width}
                      onChange={(e) =>
                        handleSectionWidthChange(e, sectionIndex)
                      }
                    />
                  </label>
                  {section.feeders.map((feeder, feederIndex) => (
                    <div key={feederIndex}>
                      <label>
                        Feeder Height:
                        <input
                          type="text"
                          value={feeder.height}
                          onChange={(e) =>
                            handleFeederHeightChange(
                              e,
                              sectionIndex,
                              feederIndex
                            )
                          }
                        />
                      </label>
                    </div>
                  ))}
                  <button type="button" onClick={() => addFeeder(sectionIndex)}>
                    Add Feeder
                  </button>
                </div>
              ))}
              <button type="button" onClick={addSection}>
                Add Section
              </button>
            </form>
          </div>
          
          <div>
            <label>Start Sectioning From</label>
            <br />
            <div>
              <input type="radio" id="left" name="options" value="left" />
              <label htmlFor="option1">Left</label>

              <input type="radio" id="right" name="options" value="right" />
              <label htmlFor="option2">Right</label>
            </div>
          </div>

          <div>
            <p>*Provide all dimensions in mm.</p>
          </div>
        </div>
      </div>

      <div>
        <button onClick={handleButtonClick}>Generate 3D Model</button>
        {showComponent && (
          <Generate3DModel
            width={measurements.width}
            height={measurements.height}
            depth={measurements.depth}
            sections={sections}
            startFrom={selectedValue}
          />
        )}
      </div>
    </div>
  );
}
export default App;
