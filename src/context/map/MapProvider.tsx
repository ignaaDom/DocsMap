import { useContext, useEffect, useReducer } from "react"
import { Map, Marker, Popup } from "mapbox-gl"

import { MapContext } from "./MapContext"
import { MapReducer } from "./MapReducer"

import { PlacesContext } from "../";

import { directionApi } from "../../apis";
import { DirectionsResponse } from '../../interfaces/directions';


export interface MapState {
    isMapReady: boolean,
    map?: Map;
    markers: Marker[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
} 

interface Props {
    children: React.JSX.Element | React.JSX.Element[]
}

export const MapProvider = ( { children }:Props ) => {

    const [ state , dispatch ] = useReducer(MapReducer,INITIAL_STATE);

    const { places } = useContext( PlacesContext);

    useEffect(()=>{
        state.markers.forEach( marker => marker.remove());

        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [ lng, lat ] = place.center;
            const popup = new Popup()
                .setHTML(`
                    <h6>${ place.text }</h6>
                    <p>${ place.place_name }</p>
                `);
            const newMarker = new Marker({color: '#007bff'})
                    .setPopup( popup )
                    .setLngLat( [ lng, lat ] )
                    .addTo( state.map! );

            newMarkers.push( newMarker );
        }

        dispatch( {type: 'setMarkers' , payLoad: newMarkers });

    },[places]); 

    const setMap = ( map: Map ) => {

        // Añado un Popup cuando se selecciona el puntero de la ubicacion
        const myLocationPopup = new Popup()
            .setHTML(`
            <h4 class="mt-3">Aquí estoy</h4>
            `)

        // Map.getCenter obtiene la posicion inicial del marcador (Tu ubicacion)
        new Marker({
            color: '#000'
        })
            .setLngLat( map.getCenter() )
            .setPopup( myLocationPopup )
            .addTo( map );

        dispatch( { type: 'setMap', payLoad: map } )

    }

    const getRouteBetweenPoints = async(start: [number,number], end: [number,number]) => {
        const resp = await directionApi.get<DirectionsResponse>(`/${ start.join('%2C') }%3B${ end.join('%2C') }`);
        const { distance, duration, geometry} = resp.data.routes[0];

        let kms = distance / 1000;
            kms = Math.round(kms * 100);
            kms = kms / 100;
        
        const minutes = Math.floor(duration / 60);

        console.log(kms,minutes,geometry)

    }

    return (
        <MapContext.Provider value={{
            ...state,

            // Methods

            setMap,
            getRouteBetweenPoints,
        }}>
            { children }
        </MapContext.Provider>
    )
}
