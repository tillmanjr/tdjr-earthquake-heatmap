import React, {useEffect, useState, useRef} from 'react';
import {createRoot} from 'react-dom/client';

import {APIProvider, Map, InfoWindow} from '@vis.gl/react-google-maps';

import {
  EarthquakesGeojson,
  EarthquakeFilterProps
} from './types'
import ControlPanel from './control-panel';
import Heatmap from './heatmap';
import {loadEarthquakeGeojson} from './earthquakes';
import {applyFilter} from './geoFilters'

const API_KEY = 'AIzaSyByVwAy15t8c4VoLJ-ZK1qBlPxh-I0_NUQ'
//  globalThis.GOOGLE_MAPS_API_KEY ?? (process.env.GOOGLE_MAPS_API_KEY as string);
const dataDateMin: Date = new Date('2019-01-01T00:00:01');
const dataDateMax: Date = new Date('2025-01-01T00:00:00');

function useInterval(callback, delay) {
  const intervalRef = React.useRef(null);
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => savedCallback.current();

    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay);

      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);

  return intervalRef;
}

const App = () => {
  const [automationStatus, setAutomationStatus] = useState('idle')
  const [automationType, setAutomationType] = useState('interval')
  const [automationStepBy, setAutomationStepBy] = useState(1)
  const [automationWindow, setAutomationWindow] = useState(7)
  
  const [radius, setRadius] = useState(8);
  const [opacity, setOpacity] = useState(0.8);
  //  The format is "yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS"
  
  const [dateMin, setDateMin] = useState(dataDateMin);
  const [dateMax, setDateMax] = useState(dataDateMax);

  const [depthMin, setDepthMin] = useState(5.6);
  const [depthMax, setDepthMax] = useState(200);

  const [intensityMin, setIntensityMin] = useState(2.7);
  const [intensityMax, setIntensityMax] = useState(10);

  
  const [inputError, setInputError] = useState()

  const [earthquakesGeojson, setEarthquakesGeojson] =
    useState<EarthquakesGeojson>();

  useEffect(() => {
    loadEarthquakeGeojson()
      .then(data => setEarthquakesGeojson(data))
      , []});
  
  const [filteredData, setFilteredData] = useState();

  function filterData() {
    const filtered = applyFilter(earthquakesGeojson, (
    {
      dateMin: dateMin,
      dateMax: dateMax,
      depthMin: depthMin,
      depthMax: depthMax,
      intensityMin: intensityMin,
      intensityMax: intensityMax
    }
  )) as EarthquakesGeojson
    
    return filtered
  }

  function handleIntensityMinChange(value: number) {
    const maxValue = intensityMax || 0;
    setIntensityMin(value)

    const errorMessage = (value > maxValue) ? 'Intensity: Min must greater than Max' : ''
    setInputError(errorMessage)
  }
  function handleIntensityMaxChange(value: number) {
    const minValue = intensityMin || 0;
    setIntensityMax(value)

    const errorMessage = (value < minValue) ? 'Intensity: Min must greater than Max' : ''
    setInputError(errorMessage)
  }

  function handleDateMinChange(value: Date) {
      const maxDateValue = dateMax
      setDateMin(value)

      const errorMessage = (value > maxDateValue) ? 'Date: Min must greater than Max' : ''
      setInputError(errorMessage)
  }

  function handleDateMaxChange(value: Date) {
      const minDateValue = dateMin
      setDateMax(value)

      const errorMessage = (value < minDateValue) ? 'Date: Max must greater than Min' : ''
      setInputError(errorMessage)
  }

  function handleDepthMinChange(value: number) {
    const maxValue = depthMax || 0;
    setDepthMin(value)

    const errorMessage = (value > maxValue) ? 'Depth: Min must greater than Max' : ''
    setInputError(errorMessage)
  }
  function handleDepthMaxChange(value: number) {
    const minValue = depthMin || 0;
    setDepthMax(value)

    const errorMessage = (value < minValue) ? 'Depth: Min must greater than Max' : ''
    setInputError(errorMessage)
  }

  function showNextInterval( stepByDays: number, windowDays: number) {
    let newDateMin = new Date(dateMin)
    newDateMin.setDate(newDateMin.getDate() + stepByDays)
    
    let newDateMax = new Date(dateMin)
    newDateMax.setDate(newDateMax.getDate() + stepByDays + windowDays);

    console.log('showNextInterval', dateMin, dateMax, newDateMin, newDateMax)
    setDateMin(newDateMin);
    setDateMax(newDateMax); 
  }

  function showNextAccumulation( stepByDays: number ) {
    let newDateMax = new Date(dateMax)
    newDateMax.setDate(newDateMax.getDate() + stepByDays);

    setDateMax(newDateMax); 
  }

  useInterval(
    () => {
      if (automationType === 'interval') {
        showNextInterval(automationStepBy,automationWindow);
      } else {
        showNextAccumulation(automationStepBy);
      }
    },
    automationStatus === 'running' ? 1000 : null 
  )

  function handleToggleAutomation() {
    if (automationType === 'interval') {
      showNextInterval(automationStepBy,automationWindow);
    } else {
      showNextAccumulation(automationStepBy);
    }
    setAutomationStatus((automationStatus) => (automationStatus === 'running' ? 'idle' : 'running'))
  }

  function handleShowNextAccumulationEvent() {
    showNextAccumulation(1);
  }

  

  // mapId={'7a9e2ebecd32a903'}
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId={'7a9e2ebecd32a903'}
        defaultCenter={{lat: 37.7749, lng: -120.4194}}
        defaultZoom={6}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
      </Map>

      {earthquakesGeojson && (
        <Heatmap
          geojson={filterData()}
          radius={radius}
          opacity={opacity}
        >

        </Heatmap>
      )}
       
      <ControlPanel
        radius={radius}
        opacity={opacity}
        dateMin={dateMin}
        dateMax={dateMax}
        depthMin={depthMin}
        depthMax={depthMax}
        intensityMin={intensityMin}
        intensityMax={intensityMax}

        automationStatus={automationStatus}
        automationType={automationType}
        automationStepBy={automationStepBy}
        automationWindow={automationWindow}

        inputError={inputError}
        onRadiusChanged={setRadius}
        onOpacityChanged={setOpacity}
        handleDateMinChange={handleDateMinChange}
        handleDateMaxChange={handleDateMaxChange}
        // onDepthMinChanged={setDepthMin}
        // onDepthMaxChanged={setDepthMax}
        handleDepthMinChange={handleDepthMinChange}
        handleDepthMaxChange={handleDepthMaxChange}
        handleIntensityMinChange={handleIntensityMinChange}
        handleIntensityMaxChange={handleIntensityMaxChange}

        handleToggleAutomation={handleToggleAutomation}

        onAutomationTypeChange={setAutomationType}
        onAutomationStepByChange={setAutomationStepBy}
        onAutomationWindowChange={setAutomationWindow}
      />
    </APIProvider>
  );
};
export default App;

export function renderToDom(container: HTMLElement) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
