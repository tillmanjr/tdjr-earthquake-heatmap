import {FeatureCollection, Point} from 'geojson';

export type EarthquakeProps = {
  id: string;
  mag: number;
  time: number;
  felt: number | null;
  tsunami: 0 | 1;
};

export type EarthquakeFilterProps = {
    dateMin: Date,
    dateMax: Date,
    depthMin: number;
    depthMax: number;
    intensityMin: number;
    intensityMax: number;
  };

export type EarthquakesGeojson = FeatureCollection<Point, EarthquakeProps>;