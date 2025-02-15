import {EarthquakesGeojson} from '../common/types'

const localFilePathUrl: string = '/eq-data-barbara-2019-2024.geojson.json'

export async function loadEarthquakeGeojson(): Promise<EarthquakesGeojson> {
  const url = new URL(localFilePathUrl, import.meta.url);
  return await fetch(url).then(res => res.json());
}
