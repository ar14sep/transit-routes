import './App.css';
import { useEffect, useState } from 'react';
import AddRoute from './containers/AddRoute';
import ViewRoutes from './containers/ViewRoutes';
import Home from './containers/Home';
import { Route, Routes } from 'react-router-dom';

function App() {

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const storedRoutes = sessionStorage.getItem("routes");

    if(storedRoutes){
      const x = JSON.parse(storedRoutes);
      setRoutes(x);
    }
  }, [])

  const addRoute = (newRoute) => {
    const x = [...routes, newRoute];
    setRoutes(x);
    sessionStorage.setItem("routes", JSON.stringify([...routes, newRoute]));
  }

  const deleteRoute = (id) => {
    const newRoutes = routes.filter((item) => item.routeId !== id);
    setRoutes([...newRoutes]);
    window.location.reload();
    sessionStorage.setItem("routes", JSON.stringify(newRoutes));
  };

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="add" element={ <AddRoute routes={routes} addRoute={addRoute} /> } />
        <Route path="view" element={ <ViewRoutes routes={routes} deleteRoute={deleteRoute} /> } />
      </Routes>
    </div>
  );
}

export default App;
