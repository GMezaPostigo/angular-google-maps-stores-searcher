export interface IStore {
  geometry: IStoreGeometry;
  name: number;
  place_id: string;
  rating: number;
  user_ratings_total: number;
}

export interface IStoreGeometry {
  location: IGeometryLocation;
}

export interface IGeometryLocation {
  lat: number;
  lng: number;
}
