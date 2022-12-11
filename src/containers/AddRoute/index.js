
import './index.css';
import Stops from "../../stops";
import { useEffect, useState } from 'react';
import { CreateRoute } from '../../components/CreateRoute';

function AddRoute({addRoute}) {
  const [stopsObject, setStopsObject] = useState({...Stops});
  const [stopsList, setStops] = useState([]);

  const addStop = (item) => {
    if(stopsObject[item.id].added == true){
      return;
    }
    const x = {...stopsObject};
    x[item.id].added = true;
    setStopsObject(x);
    setStops([...stopsList, item]);
  };
  
  return (
    <div className="container">
        <div className="headerBar">
          <h1 className='header'>
            Transit Routes
          </h1>
        </div>
        <div className='mainContainer'>
        <div className='listContainer'>
            <h3 className='stopsHeader'>
                Select Stops
            </h3>
            <p>*Select stops in sequence to create a route</p>
            <div className='stopsList'>
            {/* To add a search bar */}
            {Object.keys(stopsObject).map((key) => (
                <div className='stopItem' onClick={() => {addStop(stopsObject[key])}} key={stopsObject[key].id}>
                  <span>{stopsObject[key].name}</span>
                  <span className={stopsObject[key].added ? "dotSelected" : "dotEmpty"}></span>
                </div>
            ))}
            </div>
        </div>
        <CreateRoute stopsList={stopsList} addNewRoute={addRoute} />
        </div>
    </div>
  );
}

export default AddRoute;
