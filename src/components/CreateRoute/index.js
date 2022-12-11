import { useState } from "react";
import "./index.css";

export function CreateRoute({addNewRoute,stopsList}) {
    const [routeName, setRouteName] = useState("");
    const [routeDirection, setRouteDirection] = useState("Up");
    const [routeStatus, setRouteStatus] = useState("Active");
    const [errMsg, setErrMsg] = useState("");
    const [succMsg, setSuccMsg] = useState("");

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
          stops: stopsList,
        };
        const isValid = validateRoute(routeItem);
        if(isValid) {
          addNewRoute(routeItem);
          setSuccMsg("Route added successfully");
        }
      }

      const onReset = () => {
    window.location.reload();
      }

    return (
        <div className='routeContainer'>
        <h3 className='stopsHeader'>
            Create Routes
        </h3>
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
            <div className='submitButton'>
              <button onClick={onReset} className="buttonStyles resetButton">Reset</button>
            </div>
        </div>
        {errMsg ? <div className='errorMessage'>
          {errMsg}
        </div> : null}
        {succMsg ? <div className='successMessage'>
          {succMsg}
        </div> : null}
        <div className='route'>
            {stopsList.length > 0 ? stopsList.map((item) => (
                <div className='routeItem' key={item.id}>
                   <span className='dot' /> 
                   <span>{item.name}</span>
                </div>
            )): null}
        </div>
    </div>
    );
}