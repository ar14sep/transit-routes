import './App.css';
import { useEffect, useState } from 'react';
import AddRoute from './containers/AddRoute';
import ViewRoutes from './containers/ViewRoutes';
import Home from './containers/Home';
import { Route, Routes } from 'react-router-dom';
import { RouteProvider } from './contextProvider';

function App() {

  const [routes, setRoutes] = useState([]);
  // This state can also be handled using redux

  useEffect(() => {
    const storedRoutes = sessionStorage.getItem("routes");

    if(storedRoutes){
      const x = JSON.parse(storedRoutes);
      setRoutes(x);
    }
  }, [])

  const addNewRoute = (newRoute) => {
    const x = [...routes, newRoute];
    setRoutes(x);
    sessionStorage.setItem("routes", JSON.stringify([...routes, newRoute]));
  }

  const updateRoute = (route) => {
    const index = routes.findIndex(item=> item.routeId === route.routeId);

    if(index >= 0){
      const newRoutes = [
        ...routes.slice(0,index),
        Object.assign({}, routes[index], route),
        ...routes.slice(index+1)
     ]
     setRoutes(newRoutes);
     sessionStorage.setItem("routes", JSON.stringify(newRoutes));
    }
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
        <Route path="add" element={ 
          <RouteProvider routes={routes} addNewRoute={addNewRoute} updateRoute={updateRoute}>
            <AddRoute /> 
          </RouteProvider>
        }/>
        <Route path="view" element={
          <RouteProvider routes={routes} deleteRoute={deleteRoute} >
           <ViewRoutes /> 
          </RouteProvider>
        } />
      </Routes>
    </div>
  );
}

export default App;
