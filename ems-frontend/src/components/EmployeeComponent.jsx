import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const navigator = useNavigate();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch((err) => console.error(err));
        }
    }, [id]);

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const employee = { firstName, lastName, email };
            if (id) {
                updateEmployee(id, employee).then(() => navigator('/employees')).catch(err => console.error(err));
            } else {
                createEmployee(employee).then(() => navigator('/employees')).catch(err => console.error(err));
            }
        }
    };

    const validateForm = () => {
        let isValid = true;
        const errorsCopy = { ...errors };

        if (firstName.trim()) errorsCopy.firstName = '';
        else {
            errorsCopy.firstName = 'First Name is required';
            isValid = false;
        }

        if (lastName.trim()) errorsCopy.lastName = '';
        else {
            errorsCopy.lastName = 'Last Name is required';
            isValid = false;
        }

        if (email.trim()) errorsCopy.email = '';
        else {
            errorsCopy.email = 'Email is required';
            isValid = false;
        }

        setErrors(errorsCopy);
        return isValid;
    };

    const pageTitle = () => (
        <h2 className='text-center my-4'>{id ? 'Update Employee' : 'Add Employee'}</h2>
    );

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='card col-md-8 shadow p-4'>
                    {pageTitle()}
                    <form>
                        <div className='form-group mb-3'>
                            <label className='form-label'>First Name:</label>
                            <input
                                type='text'
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder='Enter First Name'
                            />
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Last Name:</label>
                            <input
                                type='text'
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder='Enter Last Name'
                            />
                            {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Email:</label>
                            <input
                                type='email'
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter Email'
                            />
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <div className='d-grid'>
                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
