
import './index.css';
import Stops from "../../stops";
import { useEffect, useState } from 'react';
import { CreateRoute } from '../../components/CreateRoute';
import { useRoutesContext } from '../../contextProvider';

function AddRoute() {
  const [routeStops, setRouteStops] = useState([]);
  const [addedStopIds, setAddedStopsIds] = useState([]);
  const [ routeToUpdate, setRouteToUpdate ] = useState({});
  const { routes: storedRoutes = [] } = useRoutesContext() || {};

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const routeId = urlParams.get('routeId');
    if(routeId){
      const route = storedRoutes.filter(route =>
        route.routeId === routeId
      )
      if(route && route.length > 0){
        const newAddedStopIds = [];
        const stopsList = [...route[0].stops];
        for(let i=0; i<stopsList.length; i++){
          newAddedStopIds.push(stopsList[i].id);
        }
        setRouteToUpdate(route[0]);
        setAddedStopsIds(newAddedStopIds);
        setRouteStops(stopsList);
      }
    }
  }, [storedRoutes])

  const handleClick = (item) => {
    if(addedStopIds.includes(item.id)){
      removeStop(item);
      return;
    }
    addStop(item);
  };

  const addStop = (item) => {
    setAddedStopsIds([...addedStopIds, item.id])
    setRouteStops([...routeStops, { ...item, added: true }]);
  }

  const removeStop = (item) => {
    const newAddedStopIds = addedStopIds.filter(ele =>
      ele !== item.id
    );
    setAddedStopsIds(newAddedStopIds);
    const newRouteStops = routeStops.filter(stop =>
      stop.id !== item.id
    )
    setRouteStops(newRouteStops);
  }
  
  return (
    <div className="container">
        <div className="headerBar">
          <h1 className='header'>
            Transit Routes
          </h1>
        </div>
        <div className='mainContainer'>
        <div className='listStops'>
            <h3 className='stopsHeader'>
                Select Stops
            </h3>
            <p>*Select stops in sequence to create a route</p>
            <div className='stopsList'>
            {/* To add a search bar */}
            {Stops.map((stop) => (
                <div className='stopItem' onClick={() => {handleClick(stop)}} key={stop.id}>
                  <span>{stop.name}</span>
                  <span className={addedStopIds.includes(stop.id) ? "dotSelected" : "dotEmpty"}></span>
                </div>
            ))}
            </div>
        </div>
        <CreateRoute stopsList={routeStops} routeToUpdate={routeToUpdate} removeStop={removeStop} />
        </div>
    </div>
  );
}

export default AddRoute;
