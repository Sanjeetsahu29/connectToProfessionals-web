import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Feed from "./Feed";
import Login from "./Login";
import Body from "./Body";
import appStore from "./utils/appStore";
import EditProfile from "./EditProfile";
import Connections from "./Connections";
import Requests from "./RequestReceived";
import Profile from "./Profile";
import Signup from "./Signup";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            {/* Default route: / */}
            <Route path="/" element={<Feed />} />

            {/* /login */}
            <Route path="/login" element={<Login />} />

            {/* /profile */}
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/profile/:id" element={<Profile />} />

            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
