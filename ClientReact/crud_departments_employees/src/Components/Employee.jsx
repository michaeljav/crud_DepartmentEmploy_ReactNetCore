import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { variables } from '../Variables';

export class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      employees: [],
      modalTitle: '',
      EmployeeId: 0,
      FirstName: '',
      LastName: '',
      DepartmentId: '',
      EmailAddress: '',
      Salary: 0,
      PhotoFileName: 'anonymous.png',
      PhotoPath: variables.PHOTO_URL,
    };
  }

  refreshList = async () => {
    //debugger;
    await axios
      .get(variables.API_URL + 'employees')
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        this.setState({ employees: response });
      })
      .then((response) => {
        axios
          .get(variables.API_URL + 'departments')
          .then((response) => {
            debugger;
            return response.data;
          })
          .then((response) => {
            this.setState({ departments: response });
          })
          .catch((error) => {
            return error;
          });
      });
  };

  async componentDidMount() {
    await this.refreshList();
  }

  handleChange = (e) => {
    debugger;
    this.setState({ [e.target.name]: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: 'Add Employee',
      EmployeeId: 0,
      FirstName: '',
      LastName: '',
      Department: '',
      EmailAddress: '',
      Salary: 0,
      PhotoFileName: 'anonymous.png',
    });
  }

  editClick(emplo) {
    this.setState({
      modalTitle: 'Edit Employee',
      EmployeeId: emplo.Id,
      FirstName: emplo.FirstName,
      LastName: emplo.LastName,
      DepartmentId: emplo.DepartmentId,
      EmailAddress: emplo.EmailAddress,
      Salary: emplo.Salary,
      PhotoFileName: emplo.Picture,
    });
  }

  createClick = async () => {
    debugger;
    await axios
      .post(
        variables.API_URL + 'employees',
        {
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          DepartmentId: this.state.DepartmentId,
          EmailAddress: this.state.EmailAddress,
          Salary: this.state.Salary,
          Picture: this.state.PhotoFileName,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        //debugger;
        return response.data;
      })
      .then((response) => {
        // debugger;
        alert(response);
        this.refreshList();
      })
      .catch((error) => {
        alert('Failed');
      });
  };

  updateClick = async () => {
    //debugger;
    await axios
      .put(
        variables.API_URL + 'employees',
        {
          Id: this.state.EmployeeId,
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          DepartmentId: this.state.DepartmentId,
          EmailAddress: this.state.EmailAddress,
          Salary: this.state.Salary,
          Picture: this.state.PhotoFileName,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        //debugger;
        return response.data;
      })
      .then((response) => {
        // debugger;
        alert(response);
        this.refreshList();
      })
      .catch((error) => {
        alert('Failed');
      });
  };

  deleteClick = async (id) => {
    //debugger;
    if (window.confirm('Are you sure to delete? ')) {
      await axios
        .delete(
          variables.API_URL + 'employees',

          {
            data: {
              id: id,
            },
          }
        )
        .then((response) => {
          //debugger;
          return response.data;
        })
        .then((response) => {
          // debugger;
          alert('Deleted Successfully ' + response.Id);
          this.refreshList();
        })
        .catch((error) => {
          var j = JSON.stringify(error);
          alert('Failed: ' + j);
        });
    }
  };

  imageUpload = async (e) => {
    e.preventDefault();

    debugger;
    const formData = new FormData();
    formData.append('file', e.target.files[0], e.target.files[0].name);

    await axios
      .post(variables.API_URL + 'employees/savefile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        debugger;
        console.log(response);
        this.setState({ PhotoFileName: response.data });
      });
  };

  render() {
    const {
      departments,
      employees,
      modalTitle,
      EmployeeId,
      FirstName,
      LastName,
      Department,
      EmailAddress,
      Salary,
      PhotoPath,
      PhotoFileName,
    } = this.state;

    return (
      <div>
        <button
          className='btn btn-primary m-2 float-end'
          type='button'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
          onClick={() => this.addClick()}
        >
          Add Employee
        </button>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>EmployeeId</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emplo) => {
              let te = departments.filter((f) => f.Id == emplo.DepartmentId);
              let DepartmentStrin = '';
              if (te.length > 0) {
                DepartmentStrin = Object.values(te[0])[1];
              }

              return (
                <tr key={emplo.Id}>
                  <td>{emplo.Id}</td>
                  <td>{emplo.FirstName}</td>
                  <td>{emplo.LastName}</td>
                  {/* <td>{departments.filter(f => f.Id == emplo.DepartmentId)[0].Name }</td> */}
                  <td>{DepartmentStrin}</td>
                  <td>{emplo.EmailAddress}</td>
                  <td>{emplo.Salary}</td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-light mr-1'
                      data-bs-toggle='modal'
                      data-bs-target='#exampleModal'
                      onClick={() => this.editClick(emplo)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-pencil-square'
                        viewBox='0 0 16 16'
                      >
                        <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                        <path
                          fillRule='evenodd'
                          d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
                        />
                      </svg>
                    </button>

                    <button type='button' className='btn btn-light mr-1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-trash-fill'
                        viewBox='0 0 16 16'
                        onClick={() => this.deleteClick(emplo.Id)}
                      >
                        <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Modalwinow */}
        <div
          className='modal fade'
          id='exampleModal'
          tabIndex='-1'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-lg modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>{modalTitle}</h5>
                <button
                  className='btn-close'
                  type='button'
                  data-bs-dismiss='modal'
                  aria-label='close'
                ></button>
              </div>

              <div className='modal-body'>
                {/* FOTO */}
                <div className='d-flex flex-row db-highlight mb-3'>
                  <div className='p-2 2050 bd-highlight'>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'>Emp Name</span>
                      <input
                        type='text'
                        className='form-control'
                        name='FirstName'
                        value={FirstName}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className='input-group mb-3'>
                      <span className='input-group-text'>Emp LastName</span>
                      <input
                        type='text'
                        className='form-control'
                        name='LastName'
                        value={LastName}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className='input-group mb-3'>
                      <span className='input-group-text'>Email</span>
                      <input
                        type='text'
                        className='form-control'
                        value={EmailAddress}
                        name='EmailAddress'
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className='input-group mb-3'>
                      <span className='input-group-text'>Salary</span>
                      <input
                        type='number'
                        className='form-control'
                        value={Salary}
                        name='Salary'
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className='input-group mb-3'>
                      <span className='input-group-text'>Department</span>
                      <select
                        className='form-select'
                        name='DepartmentId'
                        onChange={this.handleChange}
                        value={Department}
                      >
                        {departments.map((dep) => (
                          <option key={dep.Id} value={dep.Id}>
                            {dep.Name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className='p-2 2050 bd-highlight'>
                    <img
                      width='250px'
                      height='250px'
                      src={PhotoPath + PhotoFileName}
                      alt='imag'
                    />
                    <input
                      type='file'
                      className='m-2'
                      onChange={this.imageUpload}
                    />
                  </div>
                </div>
                {EmployeeId == 0 ? (
                  <button
                    type='button'
                    className='btn btn-primary float-start'
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {EmployeeId != 0 ? (
                  <button
                    type='button'
                    id='BtTest'
                    className='btn btn-primary float-start'
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
