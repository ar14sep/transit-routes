
import './index.css';

function Home() {
  const onButtonClick = (type) => {
    window.location.href = `/${type}`;
  }
  return (
    <div className="container">
        <div className="headerBar">
          <h1 className='header'>
            Transit Routes
          </h1>
        </div>

        <div className='optionsContainer'>
          <button onClick={() => onButtonClick("view")} className='optionsCta'>
            Find a route
          </button>
          <button onClick={() => onButtonClick("add")} className="optionsCta">
            Create a route
          </button>
        </div>
    </div>
  );
}

export default Home;
