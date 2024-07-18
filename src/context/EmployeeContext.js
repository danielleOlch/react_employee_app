import React, { createContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('FAVS');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('FAVS', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (employee) => {
    if (!favorites.some(fav => fav.email === employee.email)) {
      setFavorites([...favorites, employee]);
    }
  };

  const removeFromFavorites = (email) => {
    setFavorites(favorites.filter((emp) => emp.email !== email));
  };

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, favorites, addToFavorites, removeFromFavorites, error, setError }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
