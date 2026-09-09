import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/test" element={<div>Test Page</div>} />
        </Routes>
      </BrowserRouter>
      <Navbar />
    </>
  );
}

export default App;
