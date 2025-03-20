// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a Context for the user
const UserContext = createContext();

//Create a provider component
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

// export function UserProvider({ children }) {
//     const [username, setUsername] = useState(null); // Track the logged-in user's email or username
  
//     const login = (username) => {
//       setUsername(username); // Set the logged-in user
//     };
  
//     const logout = () => {
//       setUsername(null); // Clear the logged-in user
//     };
  
//     return (
//       <UserContext.Provider value={{ username, setUsername, login, logout }}>
//         {children}
//       </UserContext.Provider>
//     );
//   }

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
