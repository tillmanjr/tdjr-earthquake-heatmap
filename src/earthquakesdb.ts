import {FeatureCollection, Point} from 'geojson';
import pool from './db';


export type EarthquakeProps = {
  id: string;
  mag: number;
  time: number;
  felt: number | null;
  tsunami: 0 | 1;
};

const queryAll = 'select et.id, et.mag, et.time, null as felt, 0 as tsunami, et.depth, et.latitude, et.longitude from eq2020tp2025 et where et.did = 3770 order by et.time ASC';

export async function fetchAll() {
  try {
    const client = await pool.connect();
    const result = await client.query(queryAll);
    console.log(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

export type EarthquakesGeojson = FeatureCollection<Point, EarthquakeProps>;

export async function loadEarthquakeGeojson(): Promise<EarthquakesGeojson> {
  const url = new URL('../data/earthquakes.json', import.meta.url);

  return await fetch(url).then(res => res.json());
}
