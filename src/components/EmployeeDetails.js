import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EmployeeContext } from '../context/EmployeeContext';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const { employees, favorites } = useContext(EmployeeContext);

  useEffect(() => {
    const fetchEmployee = async () => {
      const favoriteEmployee = favorites.find(emp => emp.login.uuid === id);
      const existingEmployee = employees.find(emp => emp.login.uuid === id);

      if (favoriteEmployee) {
        setEmployee(favoriteEmployee);
      } else if (existingEmployee) {
        setEmployee(existingEmployee);
      } else {
        try {
          const response = await fetch(`https://randomuser.me/api/?uuid=${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch employee');
          }
          const data = await response.json();
          setEmployee(data.results[0]);
        } catch (error) {
          console.error('Error fetching employee:', error);
        }
      }
    };

    fetchEmployee();
  }, [id, employees, favorites]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Employee Details</h2>
      <p>Name: {`${employee.name.first} ${employee.name.last}`}</p>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Location: {`${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.country}`}</p>
    </div>
  );
};

export default EmployeeDetails;
