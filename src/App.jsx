import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Login from "./Login";
import Profile from "./Profile";
import Body from "./Body";
import Explore from "./Explore";
import appStore from "./utils/appStore";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            {/* Default route: / */}
            <Route path="/" element={<Explore />} />

            {/* /login */}
            <Route path="/login" element={<Login />} />

            {/* /profile */}
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
