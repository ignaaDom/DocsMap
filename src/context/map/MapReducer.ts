import { Map, Marker } from "mapbox-gl";
import { MapState } from "./MapProvider";

type MapAction = 
| { type: 'setMap', payLoad: Map }
| { type: 'setMarkers', payLoad: Marker[] };


export const MapReducer = ( state: MapState, action: MapAction): MapState =>{
    switch ( action.type ) {
        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payLoad
            }

        case 'setMarkers':
            return{
                ...state,
                markers: action.payLoad
            }
        default:
            return state;
    }
}