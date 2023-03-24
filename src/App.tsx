import "./style/App.css";

import { Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import UpdateTask from "./pages/UpdateTask";
import AddTask from "./pages/AddTask";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Link className="App-link" to="/">
            Home
          </Link>{" "}
          <Link className="App-link" to="/add">
            Add a new task
          </Link>
        </header>
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="add" element={<AddTask />} />
            <Route path="update/:id" element={<UpdateTask />} />
            <Route path="/*" element={<NoMatch />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;
