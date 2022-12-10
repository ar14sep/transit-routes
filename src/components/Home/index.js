
import './index.css';

import Menusvg from "../../icons/circle.svg";

function Home({onButtonClick}) {
  return (
    <div className="container">
        <div className="headerBar">
          <h1 className='header'>
            Transit Routes
            <img src={Menusvg} className="imgClass"></img>
          </h1>
        </div>

        <div className='optionsContainer'>
          <button onClick={() => onButtonClick("viewRoutes")} className='optionsCta'>
            Find a route
          </button>
          <button onClick={() => onButtonClick("addRoute")} className="optionsCta">
            Create a route
          </button>
        </div>
    </div>
  );
}

export default Home;
