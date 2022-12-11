import { useState } from "react";
import "./index.css";

export function SearchRoutes({routes = [], deleteRoute, selectedRoute, setSelectedRoute}) {

  const [inputVal, setInputVal] = useState("");

  const [filtered, setFiltered] = useState([]);

  const { stops: stopsToShow = [] } = selectedRoute;

  const onChange = (val) => {
    const filtered = [];
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].name && routes[i].name.includes(val)) {
        filtered.push(routes[i]);
      }
    }
    setFiltered(filtered);
  };

  const onInputChange = (e) => {
    setInputVal(e.target.value);
    onChange(e.target.value);
  }

  const onRouteClick = (item) => {
    setSelectedRoute(item);
    setFiltered([]);
  }
    

  return (
    <div className="searchBox">
        <h2 className='searchBoxHeader'>Search a Route</h2>
        <input 
          className='inputClass'
          value={inputVal}
          placeholder="Enter Route Name"
          onChange={onInputChange}
        />

        {routes.length == 0 ? <div>
            No Routes available please create first
        </div> :null}
        
        {filtered.length > 0 ?
            <div className='listModal'>
            {filtered.map((item) => (
                <div key={item.id} onClick={() => onRouteClick(item)} className="listItem">
                {item.name}
                </div>
            ))}
            </div> 
        : null}
        {stopsToShow.length > 0 ? 
        <>
        <div className='routeDetails'>
            <p>Route Name: {selectedRoute.name}</p>
            <p>Route Direction: {selectedRoute.direction}</p>
            <p className="deleteText" onClick={() => deleteRoute(selectedRoute.routeId)}>Delete</p>
        </div>
        <div className='routeView'>
            <span>Stops:</span>
            {stopsToShow.map((item) => (
                <div className='routeItem' key={item.id}>
                   <span className='dot' /> 
                   <span>{item.name}</span>
                </div>
            ))}
        </div>
        </> : null}
    </div>
    );
}