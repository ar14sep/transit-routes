import { useEffect, useState } from "react";
import { useRoutesContext } from "../../contextProvider";
import "./index.css";

export function CreateRoute({stopsList,removeStop,routeToUpdate = {}}) {
    const [routeName, setRouteName] = useState("");
    const [routeDirection, setRouteDirection] = useState("Up");
    const [routeStatus, setRouteStatus] = useState("Active");
    const [errMsg, setErrMsg] = useState("");
    const [succMsg, setSuccMsg] = useState("");

    const contextData = useRoutesContext() || {};
    const { addNewRoute, updateRoute, routes = [] } = contextData;

    useEffect(()=> {
      if(routeToUpdate && routeToUpdate.routeId){
        setRouteName(routeToUpdate.name);
        setRouteDirection(routeToUpdate.direction);
        setRouteStatus(routeToUpdate.status);
      }
    }, [routeToUpdate])


    const validateRoute = (routeItem) => {
        const { name, direction, status, stops, routeId } = routeItem;
        let isValid = true;
        setSuccMsg("");
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
        if(isValid && !routeToUpdate.routeId){
          routes.forEach(element => {
            if(element.routeId == routeId){
              isValid = false;
              setErrMsg("This route no. with the mentioned direction already exists");
            }
           });
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
          if(routeToUpdate.routeId){
            updateRoute(routeItem)
            setSuccMsg("Route Updated successfully");
          } else {
            addNewRoute(routeItem);
            setSuccMsg("Route added successfully");
          }
          setErrMsg("");
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
                readOnly={routeToUpdate.routeId}
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
              <select value={routeDirection} onChange={(e) => setRouteDirection(e.target.value)} disabled={routeToUpdate.routeId}>
                <option value="Up">Up</option>
                <option value="Down">Down</option>
              </select>
            </label>
            <div className='submitButton'>
              <button onClick={addRoute} className="buttonStyles">Submit Route</button>
            </div>
            {!routeToUpdate.routeId ? <div className='submitButton'>
              <button onClick={onReset} className="buttonStyles resetButton">Reset</button>
            </div> : null}
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
                   <span className="removeText" onClick={() => removeStop(item)}>remove</span>
                </div>
            )): null}
        </div>
    </div>
    );
}