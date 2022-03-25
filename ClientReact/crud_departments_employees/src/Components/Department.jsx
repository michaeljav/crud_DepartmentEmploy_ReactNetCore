import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { variables } from '../Variables';

export class Department extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      modalTitle: '',
      DepartmentName: '',
      Description: '',
      DepartmentId: 0,
    };
  }

  refreshList = async () => {
    await axios
      .get(variables.API_URL + 'departments')
      .then((response) => {
        //debugger;
        return response.data;
      })
      .then((response) => {
        this.setState({ departments: response });
      })
      .catch((error) => {
        return error;
      });
  };

  async componentDidMount() {
    await this.refreshList();
  }

  changeDepartmentName = (e) => {
    this.setState({ DepartmentName: e.target.value });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: 'Add Department',
      DepartmentId: 0,
      DepartmentName: '',
      Description: '',
    });
  }

  editClick(m) {
    this.setState({
      modalTitle: 'Edit Department',
      DepartmentId: m.Id,
      DepartmentName: m.Name,
      Description: m.Description,
    });
  }

  createClick = async () => {
    await axios
      .post(
        variables.API_URL + 'departments',
        {
          Name: this.state.DepartmentName,
          Description: this.state.Description,
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
        alert('Added Successfully ' + response.Id);
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
        variables.API_URL + 'departments',
        {
          id: this.state.DepartmentId,
          Name: this.state.DepartmentName,
          Description: this.state.Description,
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
        alert('Updated Successfully ' + response.Id);
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
          variables.API_URL + 'departments',

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

  render() {
    const {
      departments,
      modalTitle,
      DepartmentId,
      DepartmentName,
      Description,
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
          Add Deparment
        </button>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>DeparmentId</th>
              <th>DepartmentName</th>
              <th>Description</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((m) => {
              return (
                <tr key={m.Id}>
                  <td>{m.Id}</td>
                  <td>{m.Name}</td>
                  <td>{m.Description}</td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-light mr-1'
                      data-bs-toggle='modal'
                      data-bs-target='#exampleModal'
                      onClick={() => this.editClick(m)}
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
                        onClick={() => this.deleteClick(m.Id)}
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
                <div className='input-group mb-3'>
                  <span className='input-group-text'>DepartmentName</span>
                  <input
                    type='text'
                    className='form-control'
                    value={DepartmentName}
                    onChange={this.changeDepartmentName}
                  />
                </div>

                <div class='mb-3'>
                  <label for='exampleFormControlTextarea1' class='form-label'>
                    Description
                  </label>
                  <textarea
                    name='Description'
                    class='form-control'
                    id='exampleFormControlTextarea1'
                    rows='3'
                    value={Description}
                    onChange={this.handleChange}
                  ></textarea>
                </div>

                {DepartmentId == 0 ? (
                  <button
                    type='button'
                    className='btn btn-primary float-start'
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {DepartmentId != 0 ? (
                  <button
                    type='button'
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
