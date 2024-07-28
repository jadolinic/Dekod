import { EmployeeProvider } from "./context/Context";
import Header from "./components/Header";
import Home from "./pages/Home";
import Forma from "./pages/Form";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <EmployeeProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forma" element={<Forma />} />
          </Routes>
        </Router>
      </EmployeeProvider>
    </div>
  );
};

export default App;
