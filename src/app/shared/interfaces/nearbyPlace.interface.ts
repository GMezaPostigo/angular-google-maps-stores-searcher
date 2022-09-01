import { IGeometryLocation, IStore } from './store.interface';

export interface INearbyPlace {
  stores: IStore[];
  latLngLiteral?: IGeometryLocation;
}
