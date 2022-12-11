
import './index.css';
import Map from '../../components/Maps';
import { SearchRoutes } from '../../components/SearchRoutes';
import { useState } from 'react';

function ViewRoutes({routes, deleteRoute}) {

  const [selectedRoute, setSelectedRoute] = useState({});

  return (
    <div className="container">
        <div className="headerBar">
          <h1 className='header'>
            Transit Routes
          </h1>
        </div>
        <div className='viewContainer'>
            <SearchRoutes routes={routes} deleteRoute={deleteRoute} selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
            <Map selectedRoute={selectedRoute} />
        </div>
    </div>
  );
}

export default ViewRoutes;
