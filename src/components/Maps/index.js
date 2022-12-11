import { GoogleMap, useLoadScript, Marker, Polyline } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const createPath = (stops = []) => {
    const path = [];
    for (let i=0; i<stops.length; i++){
       const position = {
        lat: stops[i].lat,
        lng: stops[i].long
       }
       path.push(position);
    }
    return path;
}

export default function Map({selectedRoute}) {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBzwY7jDtALvJODB9hnwaoZgg_kdl4t2VI"
    });

    const [pathArray, setPathArray] = useState([]);

    useEffect(() => {
        if(selectedRoute && selectedRoute.stops){
            setPathArray(createPath(selectedRoute.stops));
        }
    }, [selectedRoute])

    return (
        <div className="mapViewContainer">
            <h3>View on Map</h3>
            {isLoaded && pathArray.length >0 ? 
               <RoutesMap pathArray={pathArray} />
            : <div>*Select a route from search bar to view on map</div>
            }
        </div>
    )
}

function RoutesMap({pathArray = []}) {

    return (
        <GoogleMap
            zoom={10}
            center={pathArray[0]}
            mapContainerClassName="mapContainer"
        >
            <Polyline 
                path={pathArray}
                geodesic={true}
                strokeColor="#FF0000"
                strokeOpacity={1.0}
                strokeWeight={2}
            />
            {pathArray.map((item) => (
                <Marker position={item} />
            ))}
        </GoogleMap>
    )
}