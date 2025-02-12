import * as React from 'react';
import DateTimePicker from 'react-datetime-picker';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

type Props = {
  radius: number;
  opacity: number;
  dateMin: Date;
  dateMax: Date;
  depthMin: number;
  depthMax: number;
  intensityMin: number;
  intensityMax: number;
  inputError: string;
  onRadiusChanged: (radius: number) => void;
  onOpacityChanged: (opacity: number) => void;
  handleDateMinChange: (dateMin: Date | null) => void;
  handleDateMaxChange: (dateMax: Date | null) => void;
  handleDepthMinChange: (depthMin: number) => void;
  handleDepthMaxChange: (depthMax: number) => void;
  handleIntensityMinChange: (intensityMin: number) => void;
  handleIntensityMaxChange: (intensityMin: number) => void;
};
2
function ControlPanel({
  radius,
  opacity,
  dateMin,
  dateMax,
  depthMin,
  depthMax,
  intensityMin,
  intensityMax,
  inputError,
  onRadiusChanged,
  onOpacityChanged,
  handleDateMinChange,
  handleDateMaxChange,
  handleDepthMinChange,
  handleDepthMaxChange,
  handleIntensityMinChange,
  handleIntensityMaxChange
}: Props) {
  return (
    <div className="control-panel" style={{width: "300px"}}>
      <span style={{width: '100%', fontSize: 'larger', display: 'inline-block', textAlign: 'center'}}>USGS Earthquake Data</span><br />
      <span style={{width: '40%', display: 'inline-block', textAlign: 'right'}}>2019-2024&nbsp;</span>
      <span style={{width: '60%', display: 'inline-block', textAlign: 'left'}}><em>&nbsp;11,596 earthquakes</em></span>
      <p style={{paddingLeft: '5px'}} >
        <b>Minimum cutoffs:</b> <br />
        <span style={{paddingLeft: '10px', fontSize: 'smaller'}}>Intensity 2.5</span><br />
        <span style={{paddingLeft: '10px', fontSize: 'smaller'}}>Depth: 5.6 km</span><br />
        <b>Geographic boundaries:</b> <br />
        <span style={{paddingLeft: '10px', fontSize: 'smaller'}}>[44.117, -126.123] [44.117, -114.346]</span><br />
        <span style={{paddingLeft: '10px', fontSize: 'smaller'}}>[31.383, -126.123] [31.383, -114.346]</span><br />
      </p>

      {/* Circle Controls */}
      <div style={{marginBottom: '2rem'}}>
        <b>Map</b> <br />
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingLeft: '5px'
            }}>
            <label htmlFor="radius">Radius:</label>
            <input
              type="number"
              value={radius}
              onChange={e => onRadiusChanged(Number(e.target.value))}
              min={5}
              max={50}
            />
            <label htmlFor="opacity">Opacity:</label>
            <input
              type="number"
              value={opacity}
              onChange={e => onOpacityChanged(Number(e.target.value))}
              min={0}
              max={1}
              step={0.1}
            />
          </div>
          <div><b>Intensity</b></div>
          <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingLeft: '5px'
              }}>
              <label htmlFor="intensityMin">Min:</label>
              <input
                type="number"
                value={intensityMin}
                onChange={e=>handleIntensityMinChange(Number(e.target.value))}
                min={2.5}
                max={10}
                step={0.1}
              />
              <label htmlFor="intensityMax">Max:</label>
              <input
                type="number"
                value={intensityMax}
                onChange={e => handleIntensityMaxChange(Number(e.target.value))}
                min={2.8}
                max={10}
                step={0.1}
              />
            </div>
        </div>
        <div>
          <b>Depth</b>
        </div>
        <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingLeft: '5px'
            }}>
            <label htmlFor="depthMin">Min:</label>
            <input
              type="number"
              value={depthMin}
              onChange={e => handleDepthMinChange(Number(e.target.value))}
              min={5.6}
              max={200}
              step={0.1}
            />
          
            <label htmlFor="depthMax">Max:</label>
            <input
              type="number"
              value={depthMax}
              onChange={e => handleDepthMaxChange(Number(e.target.value))}
              min={5.7}
              max={200}
              step={0.1}
            />
        </div>
        <div style={{
            paddingTop: '10px'}}>
          <b>Date Range (GMT)</b>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '10px',
            paddingTop: '5px'
          }}>
            <label htmlFor="dateMin" style={{paddingTop: "5px", paddingRight: "4px"}}>Min:</label>
          <DateTimePicker
              amPmAriaLabel="Select AM/PM"
              calendarAriaLabel="Toggle calendar"
              clearAriaLabel="Clear value"
              dayAriaLabel="Day"
              hourAriaLabel="Hour"
              maxDetail="second"
              minuteAriaLabel="Minute"
              monthAriaLabel="Month"
              nativeInputAriaLabel="Date and time"
              onChange={handleDateMinChange}
              secondAriaLabel="Second"
              value={dateMin}
              yearAriaLabel="Year"
              disableClock={true}
              showLeadingZeros={true}
              clearIcon={null}
              minDate={new Date('2019-01-01T00:00:01')}
              maxDate={new Date('2025-01-01T00:00:00')}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '5px',
            paddingTop: '5px'
          }}>
            <label htmlFor="dateMax" style={{paddingTop: "5px", paddingRight: "4px"}}>Max:</label>
          <DateTimePicker
              amPmAriaLabel="Select AM/PM"
              calendarAriaLabel="Toggle calendar"
              clearAriaLabel="Clear value"
              dayAriaLabel="Day"
              hourAriaLabel="Hour"
              maxDetail="second"
              minuteAriaLabel="Minute"
              monthAriaLabel="Month"
              nativeInputAriaLabel="Date and time"
              onChange={handleDateMaxChange}
              secondAriaLabel="Second"
              value={dateMax}
              yearAriaLabel="Year"
              disableClock={true}
              showLeadingZeros={true}
              clearIcon={null}
              minDate={new Date('2019-01-01T00:00:01')}
              maxDate={new Date('2025-01-01T00:00:00')}
          />
        </div>
            
           


        <div style={{color:"red"}}>
          {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
        </div>

      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
