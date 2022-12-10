
import './index.css';
import Stops from "../stops";
import { useState } from 'react';

function AddRoute({updateRoute, onLogoClick}) {

  const [route, setRoute] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [routeDirection, setRouteDirection] = useState("Up");
  const [routeStatus, setRouteStatus] = useState("Active");
  const [errMsg, setErrMsg] = useState("");

  const addStop = (item) => {
    setRoute([...route, item]);
  };

  const validateRoute = (routeItem) => {
    const { name, direction, status, stops } = routeItem;
    let isValid = true;
     if (!name) {
      setErrMsg("Enter valid route name");
      isValid = false;
     } else if (!direction) {
      setErrMsg("Enter valid route direction");
      isValid = false;
     } else if (!status) {
      setErrMsg("Enter valid route status");
      isValid = false;
     } else if (stops.length < 2) {
      setErrMsg("Please create a valid route");
      isValid = false;
     }

     return isValid;

  };

  const addRoute = () => {
    const routeItem = {
      name: routeName,
      routeId: `${routeName}-${routeDirection}`,
      direction: routeDirection,
      status: routeStatus,
      stops: route,
    };
    const isValid = validateRoute(routeItem);
    if(isValid) {
      updateRoute(routeItem);
    }
  }
  
  return (
    <div className="container">
        <div className="headerBar">
          <h1 className='header' onClick={() => onLogoClick("home")}>
            Transit Routes
          </h1>
        </div>
        <div className='mainContainer'>
        <div className='listContainer'>
            <h1 className='stopsHeader'>
                Select Stops
            </h1>
            <div className='stopsList'>
            {Object.keys(Stops).map((key) => (
                <div className='stopItem' onClick={() => {addStop(Stops[key])}} key={Stops[key].id}>
                  {Stops[key].name}
                </div>
            ))}
            </div>
        </div>
        <div className='routeContainer'>
            <h1 className='stopsHeader'>
                Create Routes
            </h1>
            <div className='routeForm'>
                <label>
                  Name: &nbsp;
                  <input 
                    value={routeName}
                    placeholder="Enter Route Name"
                    onChange={(e) => setRouteName(e.target.value)}
                  />
                </label>
                <label>
                  Status: &nbsp;
                  <select value={routeStatus} onChange={(e) => setRouteStatus(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </label>
                <label>
                  Direction: &nbsp;
                  <select value={routeDirection} onChange={(e) => setRouteDirection(e.target.value)}>
                    <option value="Up">Up</option>
                    <option value="Down">Down</option>
                  </select>
                </label>
                <div className='submitButton'>
                  <button onClick={addRoute} className="buttonStyles">Submit Route</button>
                </div>
            </div>
            <div className='route'>
                {route.length > 0 ? route.map((item) => (
                    <div className='routeItem' key={item.id}>
                       <span className='dot' /> 
                       <span>{item.name}</span>
                    </div>
                )): null}
            </div>
            {/* <div className='submitButton'>
              <button onClick={addRoute} className="buttonStyles">Submit Route</button>
            </div> */}
            {errMsg ? <div className='errorMessage'>
              {errMsg}
            </div> : null}
        </div>
        </div>
    </div>
  );
}

export default AddRoute;
