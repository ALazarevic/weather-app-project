import { UserLocation } from "./userLocation.model";

export interface UserCountry { // types added only for relevant data.
  as: object,
  ip: string,
  isp: string,
  location: UserLocation,
  proxy: object
}