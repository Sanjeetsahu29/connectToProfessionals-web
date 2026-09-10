# Understanding React Redux and Redux Toolkit

To manage the State on a Global level so that any component which need any state data can simply import from the central state we use redux store

Redux is a predictable state-management library used to manage shared application state. Redux Toolkit is the recommended modern way to use Redux because it reduces boilerplate and provides APIs such as configureStore and createSlice. The store holds the application's Redux state, slices define state and reducers for specific domains, components dispatch actions to request state changes, reducers process those actions, and components use selectors to read the updated state. In React, Provider makes the store available to components, while useDispatch and useSelector are used to update and read Redux state.

### 1. What is Redux?

Redux is a state management library.

In a React application, you normally manage state using: useState()
const [user, setUser] = useState(null)

This works very well when the state is needed by one component or a small component tree.

But imagine your application has:

```
App
├── Navbar
│   └── UserProfile
├── Dashboard
│   ├── Sidebar
│   └── Profile
└── Settings
```

Suppose all of these components need the logged-in user's information.

Without global state, you may end up passing data:

```
App
 ↓
Dashboard
 ↓
Profile
 ↓
UserDetails
```

This is called prop drilling.

Redux provides a centralized place where application-level state can live.

```
                 Redux Store
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
      Navbar      Dashboard     Settings
```

Any component can access the state without manually passing props through every component.

### 2. What is Redux Toolkit?

Originally, Redux required quite a lot of boilerplate. Redux Toolkit (RTK) was created to make Redux easier, safer, and more practical.

You need two package to get started and build global level state management

```javaScript
npm install @reduxjs/toolkit react-redux
```

`@reduxjs/toolkit`<br>
Provides Redux's modern APIs:

```
configureStore
createSlice
createAsyncThunk
createEntityAdapter
```

`react-redux`<br>
Connects Redux with React:

```
Provider
useSelector
useDispatch
```

### 3. Your Store

```javaScript
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default appStore;
```

Let's understand every line.
`configureStore()` creates your Redux store

Think of the store as the central container for your application's global state.

```javaScript
const appStore = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});
```

So your Redux store contains different pieces of application state.

### 4. What is a reducer?

This is one of the most important concepts.

A reducer is a function responsible for determining how a particular piece of Redux state changes in response to actions.

```javaScript
const initialState = {
  name: "",
  email: "",
  isLoggedIn: false,
};
```

Your user reducer determines how this state changes.

```javaScript
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    name: "",
    email: "",
    isLoggedIn: false,
  },

  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.name = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
```

Now your store:

```javaScript
const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});
```
