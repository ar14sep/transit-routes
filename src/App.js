import './App.css';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import AddRoute from './components/AddRoute';
import ViewRoutes from './components/ViewRoutes';

function App() {
  const [viewType, setViewType] = useState("home");

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const storedRoutes = sessionStorage.getItem("routes");

    if(storedRoutes){
      const x = JSON.parse(storedRoutes);
      setRoutes(x);
    }
  }, [])

  const updateRoute = (newRoute) => {
    const x = [...routes, newRoute];
    setRoutes(x);
    sessionStorage.setItem("routes", JSON.stringify([...routes, newRoute]));
  }

  const updatePageView = (type) => {
    setViewType(type);
  }
  return (
    <div className="App">
      {viewType == "addRoute" ? <AddRoute routes={routes} updateRoute={updateRoute} onLogoClick={updatePageView} /> : null}
      {viewType == "viewRoutes" ? <ViewRoutes routes={routes} onLogoClick={updatePageView} /> : null}
      {viewType == "home" ? <Home onButtonClick={updatePageView} /> : null}
    </div>
  );
}

export default App;
