import yargs from "yargs";
import { readFileSync } from "fs";
import { Cube } from "./cube";
export const EARTH_RADIUS_M = 6371000;

const argv = yargs
  .option("i", {
    alias: "input",
    demandOption: true,
    type: "string"
  })
  .option("r", {
    alias: "resolution",
    type: "number"
  }).argv;

const filenameRegex = /([NS])(\d\d)([EW])(\d\d\d).*/;

if (!filenameRegex.test(argv.i)) {
  throw new Error(`Filename is incorrect`);
}

// 1. import the input
const input = readFileSync(argv.i, null);
const getLatLonFilename = filename => {
  const [, latDir, lat, lonDir, lon] = filename.match(filenameRegex);
  return [
    parseInt(lat) * (latDir === "S" ? -1 : 1),
    parseInt(lon) * (lonDir === "W" ? -1 : 1)
  ];
};
// The name of each file refers to the latitude
// and longitude at the lower left corner of the tile
const [tileLat, tileLon] = getLatLonFilename(argv.i);

const tileSide = Math.sqrt(input.length / 2);
const arcSec = 1 / tileSide;

console.log(
  `Got tile ${tileSide} wide. Coords: LAT ${tileLat}, LON ${tileLon}`
);

const result: Array<Array<number>> = [];

for (let x = 0; x <= tileSide; x++) {
  result[x] = [];
  for (let y = 0; y <= tileSide; y++) {
    result[x][y] = input.readInt16BE(x * 2 + y * tileSide);
  }
}

// ====================================

const world = new Cube(argv.r);

world.addPoints(result, tileLat, tileLon);
