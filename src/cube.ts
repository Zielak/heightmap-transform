import { Point } from "./point";
import { EARTH_RADIUS_M } from ".";
import { FaceID, Face } from "./face";
import { Sector } from "./sector";

const getCubeFace = (latitude: number, longitude: number) => {};

const geoToSpherical = (latitude: number, longitude: number) => {
  return new Point(
    parseFloat(
      (EARTH_RADIUS_M * Math.cos(latitude) * Math.cos(longitude)).toFixed(3)
    ),
    parseFloat(
      (EARTH_RADIUS_M * Math.cos(latitude) * Math.sin(longitude)).toFixed(3)
    ),
    parseFloat((EARTH_RADIUS_M * Math.sin(latitude)).toFixed(3))
  );
};

// TODO:? rewrite class CSGrid(object):
// https://gist.github.com/darothen/8bf53b448790f21f616552b45ee3b22b#file-cubed_sphere-py-L166
//
// Make a map of points, which would contain their representative
// lat/lon coordinates?

class Cube {
  faces = new Map<FaceID, Face>();
  constructor(public resolution: number = 100) {
    this.faces.set(FaceID.front, new Face(FaceID.front, resolution));
    this.faces.set(FaceID.left, new Face(FaceID.left, resolution));
    this.faces.set(FaceID.back, new Face(FaceID.back, resolution));
    this.faces.set(FaceID.right, new Face(FaceID.right, resolution));
    this.faces.set(FaceID.top, new Face(FaceID.top, resolution));
    this.faces.set(FaceID.bottom, new Face(FaceID.bottom, resolution));
  }

  addPoints(data: Array<Array<number>>, startLat: number, startLon: number) {}
}

export { Cube };
