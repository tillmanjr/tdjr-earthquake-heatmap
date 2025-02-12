import {EarthquakesGeojson} from './types'

// const localFilePathUrl: string = '../data/test.geojson.json'
// const localFilePathUrl: string = '../data/eq-data-barbara-2024.geojson.json'
const localFilePathUrl: string = '/eq-data-barbara-2019-2024.geojson.json'
// const localFilePathUrl: string = './jsonData/eq-data-barbara-2019-2024.geojson.json'
// const localFilePathUrl: string = 'public/earthquake.geojson.json'

export async function loadEarthquakeGeojson(): Promise<EarthquakesGeojson> {
  const url = new URL(localFilePathUrl, import.meta.url);
  console.log('url', url)
  return await fetch(url).then(res => res.json());
}
