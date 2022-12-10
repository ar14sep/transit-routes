import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBzwY7jDtALvJODB9hnwaoZgg_kdl4t2VI"
    })

    return (
        <div className="mapViewContainer">
            <h3>View on Map</h3>
            {isLoaded ? 
               <RoutesMap />
            : <div>Loading...</div>
            }
        </div>
    )
}

function RoutesMap() {

    return (
        <GoogleMap
            zoom={10}
            center={{lat: 28.7532, lng: 77.1988}}
            mapContainerClassName="mapContainer"
        >
            <Marker position={{lat: 28.7532, lng: 77.1988}} />
      
        </GoogleMap>
    )
}