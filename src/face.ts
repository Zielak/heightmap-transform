import { Sector } from "./sector";

class Face {
  sectors = new Array<Array<Sector>>();
  constructor(public id: FaceID, resolution: number) {
    for (let i = 0; i < resolution; i++) {
      this.sectors.push([]);
    }
  }

  getSector(latitude: number, longitude: number) {
    return this.sectors[0][0];
  }
}

export { Face };

export enum FaceID {
  top,
  bottom,
  left,
  right,
  front,
  back
}
