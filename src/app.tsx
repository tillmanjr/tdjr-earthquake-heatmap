import React, {useEffect, useState, useMemo} from 'react';
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

const App = () => {
  const [radius, setRadius] = useState(8);
  const [opacity, setOpacity] = useState(0.8);
  //  The format is "yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS"
  const [dateMin, setDateMin] = useState(new Date('2019-01-01T00:00:01'));
  const [dateMax, setDateMax] = useState(new Date('2025-01-01T00:00:00'));
  const [depthMin, setDepthMin] = useState(5.6);
  const [depthMax, setDepthMax] = useState(200);
  const [intensityMin, setIntensityMin] = useState(2.7) // , () => setGeoFilters());//useState(2.7);
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
