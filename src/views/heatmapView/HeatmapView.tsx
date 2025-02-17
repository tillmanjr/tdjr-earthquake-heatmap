import React, { useEffect, useState, useRef } from 'react';

import FocusLock from 'react-focus-lock';

import { EarthquakesGeojson } from '../../common/types'
import { loadEarthquakeGeojson } from '../../data/earthquakes';

import { useOnClickOutside } from '../../hooks'
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../global'
import { AnimationMonitor, Burger, Menu } from '../../components'

import { theme } from '../../theme'

import { APIProvider, Map, InfoWindow } from '@vis.gl/react-google-maps';

import ControlPanel from '../../components/controlPanel/ControlPanel'
import Heatmap from '../../components/heatmap/Heatmap'

import { applyFilter } from '../../common/geoFilters'

import { useInterval } from '../../hooks/UseInterval';

import {addDays} from '../../common/dayFunctions'
import {calculateAnimationStepCount} from '../../common/animationFunctions'

const dataDateMin: Date = new Date('2019-01-01T00:00:01');
const dataDateMax: Date = new Date('2025-01-01T00:00:00');

export function HeatmapView() {
    const [earthquakesGeojson, setEarthquakesGeojson] =
        useState<EarthquakesGeojson>();

    useEffect(() => {
        loadEarthquakeGeojson()
            .then(data => setEarthquakesGeojson(data))
            , []
    });

    const [open, setOpen] = useState(false);
    const node = useRef(null);
    const menuId = "main-menu";

    const [automationStatus, setAutomationStatus] = useState('idle')
    const [automationType, setAutomationType] = useState('interval')
    const [automationStepBy, setAutomationStepBy] = useState(1)
    const [automationWindow, setAutomationWindow] = useState(7)

    const [automationTotalSteps, setAutomationTotalSteps] = useState(0)
    const [automationCurrentStep, setAutomationCurrentStep] = useState(0)
    
    const [radius, setRadius] = useState(8);
    const [opacity, setOpacity] = useState(0.8);
    //  The format is "yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS"
    const [dateMin, setDateMin] = useState(dataDateMin);
    const [dateMax, setDateMax] = useState(dataDateMax);
    const [depthMin, setDepthMin] = useState(5.6);
    const [depthMax, setDepthMax] = useState(200);
    const [intensityMin, setIntensityMin] = useState(2.7);
    const [intensityMax, setIntensityMax] = useState(10);


    const [inputError, setInputError] = useState('')

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

    function handleDateMinChange(value: Date | null) {
        if (value) {
            const maxDateValue = dateMax
            setDateMin(value)

            const errorMessage = (value > maxDateValue) ? 'Date: Min must greater than Max' : ''
            setInputError(errorMessage)
        }
    }

    function handleDateMaxChange(value: Date | null) {
        if (value) {
            const minDateValue = dateMin
            setDateMax(value)

            const errorMessage = (value < minDateValue) ? 'Date: Max must greater than Min' : ''
            setInputError(errorMessage)
        }
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

    function showNextInterval(stepByDays: number, windowDays: number) {
        let newDateMin = addDays(dateMin, stepByDays)
        let newDateMax = addDays(dateMin, stepByDays + windowDays)

        setDateMin(newDateMin);
        setDateMax(newDateMax);
        setAutomationCurrentStep(automationCurrentStep + 1)
    }

    function showNextAccumulation(stepByDays: number) {
        let newDateMax = addDays(dateMax, stepByDays)
        setDateMax(newDateMax);
        setAutomationCurrentStep(automationCurrentStep + 1)
    }

    useInterval(
        () => {
            if (automationStatus === 'running') {
                if (automationType === 'interval') {
                    showNextInterval(automationStepBy, automationWindow);
                } else {
                    showNextAccumulation(automationStepBy);
                }
            }
        },
        automationStatus === 'running' ? 1000 : null
    )

    function startAnimation() {
        const steps = calculateAnimationStepCount({
            animationType: (automationType === 'interval' ? 'interval' : 'accumulation'),
            startDate: (automationType === 'interval' ? dateMin : dateMax),
            stopDate: dataDateMax,
            stepBy: automationStepBy,
            windowSize: automationWindow 
        })
        setAutomationTotalSteps(steps)
        if (automationType === 'interval') {
            showNextInterval(automationStepBy, automationWindow);
        } else {
            showNextAccumulation(automationStepBy);
        }
        setAutomationStatus('running')
    }

    function stopAnimation() {
        setAutomationTotalSteps(0)
        setAutomationCurrentStep(0)
        setAutomationStatus('idle')
    }

    function handleToggleAutomation() {
        if (automationStatus === 'idle') {
            startAnimation()
        }
        if (automationStatus === 'running') {
            stopAnimation();
        }
        // if (automationType === 'interval') {
        //     showNextInterval(automationStepBy, automationWindow);
        // } else {
        //     showNextAccumulation(automationStepBy);
        // }
        // setAutomationStatus((automationStatus) => (automationStatus === 'running' ? 'idle' : 'running'))
    }

    function handleShowNextAccumulationEvent() {
        showNextAccumulation(1);
    }

    const API_KEY = "AIzaSyByVwAy15t8c4VoLJ-ZK1qBlPxh-I0_NUQ" // process.env.VITE_GOOGLE_MAPS_API_KEY
    const MAP_ID = "7a9e2ebecd32a903" // process.env.VITE_GOOGLE_MAPS_MAP_ID

    return (
        <APIProvider apiKey={API_KEY}>
            <ThemeProvider theme={theme}>
                <>
                    <GlobalStyles />

                    <div ref={node}>
                        <FocusLock disabled={!open}>
                            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                            <AnimationMonitor  
                                automationStatus={automationStatus}
                                automationType={automationType}
                                automationTotalSteps={automationTotalSteps}
                                automationCurrentStep={automationCurrentStep}
                                dateMin={dateMin}
                                dateMax={dateMax}
                            />
                            <Menu open={open} setOpen={setOpen} id={menuId} >
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
                                    handleDepthMinChange={handleDepthMinChange}
                                    handleDepthMaxChange={handleDepthMaxChange}
                                    handleIntensityMinChange={handleIntensityMinChange}
                                    handleIntensityMaxChange={handleIntensityMaxChange}
                                    handleToggleAutomation={handleToggleAutomation}
                                    onAutomationTypeChange={setAutomationType}
                                    onAutomationStepByChange={setAutomationStepBy}
                                    onAutomationWindowChange={setAutomationWindow}
                                />
                            </Menu>
                        </FocusLock>
                    </div>
                    <div>
                    </div>

                    <Map
                        mapId={MAP_ID}
                        defaultCenter={{ lat: 37.7749, lng: -120.4194 }}
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




                </>
            </ThemeProvider>
        </APIProvider>
    );
}
