import React, { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch((error) => {
            console.error(error);
        });
    };

    const addNewEmployee = () => navigator('/add-employee');
    const updateEmployee = (id) => navigator(`/edit-employee/${id}`);
    const removeEmployee = (id) => {
        deleteEmployee(id).then(() => getAllEmployees())
            .catch((err) => console.error(err));
    };

    return (
        <div className='container mt-4'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h2>Employees</h2>
                <button className='btn btn-primary' onClick={addNewEmployee}>Add Employee</button>
            </div>
            <div className='table-responsive'>
                <table className='table table-hover table-bordered'>
                    <thead className='table-dark'>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info btn-sm me-2' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger btn-sm' onClick={() => removeEmployee(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListEmployeeComponent;
