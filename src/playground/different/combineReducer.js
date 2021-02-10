import { useReducer } from 'react';
  import combineReducers from 'react-combine-reducers';
 
  const initialIdentity = {
    name: 'Harry'
  }
 
  const initialLocation = {
    country: 'UK',
    city: 'London'
  }
 
  const identityReducer = (state, action) => {
    switch (action.type) {
      case 'ACTION_A':
        return { ...state, name: 'Puli' };
      default: return state;
    }
  }
 
  const locationReducer = (state, action) => {
    switch (action.type) {
      case 'ACTION_B':
        return { ...state, city: 'Manchester' };
      default: return state;
    }
  }
 
  const [profileReducer, initialProfile] = combineReducers({
    identity: [identityReducer, initialIdentity],
    location: [locationReducer, initialLocation]
  });
 
  const [state, dispatch] = useReducer(profileReducer, initialProfile);
 
  console.log(state);
  // Outputs the following state:
  // {
  //   identity: {
  //     name: "Harry"
  //   },
  //   location: {
  //     country: "UK",
  //     city: "London"
  //   }
  // }