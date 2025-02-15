import {useMemo} from 'react'
import {
    EarthquakesGeojson,
    EarthquakeFilterProps
} from './types'

export function applyFilter(geoJson: EarthquakesGeojson, earthquakeFilterProps: EarthquakeFilterProps) {  // : Promise<EarthquakesGeojson> {
    if (geoJson === undefined) {
        console.log('applyFilters: geoJson: undefined')
        return undefined
    }

    const dateMinNumber = earthquakeFilterProps.dateMin.getTime()
    const dateMaxNumber = earthquakeFilterProps.dateMax.getTime()

    const result =  {
        "type":"FeatureCollection",
        "features":  geoJson.features.filter(feature => {
            return (
                feature.properties.time >=  dateMinNumber &&
                feature.properties.time <= dateMaxNumber &&
                feature.properties.mag >= earthquakeFilterProps.intensityMin &&
                feature.properties.mag <= earthquakeFilterProps.intensityMax) &&
                feature.geometry.coordinates[2] >= earthquakeFilterProps.depthMin &&
                feature.geometry.coordinates[2] <= earthquakeFilterProps.depthMax 
                // feature.properties.mag <= earthquakeFilterProps.intensityMax)
            })
    }
    if (result.features.length == 1) {
        console.log('coordinate[]2', result.features[0].geometry.coordinates[2])
    }
    return result
}