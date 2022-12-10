
import './index.css';
import { useState } from 'react';
import Map from '../Maps';

function ViewRoutes({routes, onLogoClick}) {

  const [inputVal, setInputVal] = useState("");

  const [filtered, setFiltered] = useState([]);

  const [selectedRoute, setSelectedRoute] = useState({});

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
    <div className="container">
        <div className="headerBar">
          <h1 className='header' onClick={() => onLogoClick("home")}>
            Transit Routes
          </h1>
        </div>
        <div className='viewContainer'>
           <div className="searchBox">
            <h2 className='searchBoxHeader'>Search a Route</h2>
            <input 
              className='inputClass'
              value={inputVal}
              placeholder="Enter Route Name"
              onChange={onInputChange}
            />
            
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
                <Map />
        </div>
    </div>
  );
}

export default ViewRoutes;
