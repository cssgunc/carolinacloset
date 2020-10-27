import React from 'react';
import { useHistory } from 'react-router-dom';

const users = '';
const types = '';

export default function ManageUsers() {
  const history = useHistory();

  return (
    <React.Fragment>
      <div class="container">
        <div class="row">
          <h1>Manage Users</h1>
        </div>
        <div class="row">
          <div class="table-responsive">
            <table id="usersTable" class="table table-striped table-bordered" cellspacing="0" width="99%">
              <thead>
                <tr>
                  <th scope="col">ONYEN</th>
                  <th scope="col">User Type</th>
                  <th scope="col">PID</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">First Time Visited</th>
                  <th scope="col"># Items Received</th>
                  <th scope="col" class="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {users && (
                  users.forEach((user) => {
                    <tr>
                      <td>{user.onyen}</td>
                      <td>{user.type}</td>
                      <td>{user.pid}</td>
                      <td>{user.email}</td>
                      {user.firstItemDate ? (
                        <td> {user.firstItemDate.toLocaleString()}</td>
                      ) : ''}
                      <td>{user.numItemsReceived}</td>
                      <td class="text-right pr-1">
                        {(user.onyen !== preorder) && (
                          <div class="btn-group" role="group">
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal"
                              data-onyen={user.onyen} data-type={user.type} data-pid={user.pid}
                              data-email={user.email}>
                              Edit</button>
                            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal"
                              data-onyen={user.onyen} data-type={user.type} data-pid={user.pid}
                              data-email={user.email}>
                              Delete</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <button 
              role="button" class="btn btn-primary float-left" 
              onClick={() => history.push('/admin/users/import')}
            >
              Import CSV
            </button>
          </div>
          <div class="col-sm-6">
            <button type="button" class="btn btn-success float-right" data-toggle="modal" data-target="#createModal">Add new
              user</button>
          </div>
        </div>
      </div>
      <div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title" id="createModalLabel">Add new user</p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form name="createForm" id="createForm" action="/admin/users/create" method="POST">
                <div class="form-group">
                  <label for="createModalOnyen">ONYEN</label>
                  <input class="form-control" type="text" name="onyen" id="createModalOnyen" placeholder="ONYEN" />
                </div>
                <div class="form-group">
                  <label for="createModalType">User Type</label>
                  <select class="form-control" name="type" id="createModalType">
                    {types && types.forEach((type) => {
                      <option value={type}>{type}</option>
                    })}
                  </select>
                </div>
                <div class="form=group">
                  <label for="createModalPid">PID</label>
                  <input class="form-control pid" type="number" name="pid" id="createModalPid" placeholder="PID" />
                </div>
                <div class="form=group">
                  <label for="createModalEmail">Email Address</label>
                  <input class="form-control email" type="email" name="email" id="createModalEmail"
                    placeholder="Email Address" />
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary" id="submitCreate">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title" id="editModalLabel">Edit user type</p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form name="editForm" id="editForm" action="/admin/users/edit" method="POST">
                <div class="form-group">
                  <label for="editModalOnyen">ONYEN</label>
                  <input class="form-control" type="text" name="onyen" id="editModalOnyen" placeholder="ONYEN" readOnly />
                </div>
                <div class="form-group">
                  <label for="editModalType">User Type</label>
                  <select class="form-control" name="type" id="editModalType">
                    {types && types.forEach((type) => {
                      <option value={type}>{type}</option>
                    })}
                  </select>
                </div>
                <div class="form=group">
                  <label for="editModalPid">PID</label>
                  <input class="form-control pid" type="number" name="pid" id="editModalPid" placeholder="PID" />
                </div>
                <div class="form=group">
                  <label for="editModalEmail">Email Address</label>
                  <input class="form-control email" type="email" name="email" id="editModalEmail"
                    placeholder="Email Address" />
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary" id="submitEdit">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title" id="deleteModalLabel">Delete user</p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form name="deleteForm" id="deleteForm" action="/admin/users/delete" method="POST">
                <div class="form-group">
                  <label for="deleteModalOnyen">ONYEN</label>
                  <input class="form-control" type="text" name="onyen" id="deleteModalOnyen" placeholder="ONYEN" readOnly />
                </div>
                <div class="form-group">
                  <label for="deleteModalType">User Type</label>
                  <input class="form-control" type="text" name="type" id="deleteModalType" placeholder="Type" readOnly />
                </div>
                <div class="form=group">
                  <label for="deleteModalPid">PID</label>
                  <input class="form-control pid" type="number" name="pid" id="deleteModalPid" placeholder="PID" readOnly />
                </div>
                <div class="form=group">
                  <label for="deleteModalEmail">Email Address</label>
                  <input class="form-control email" type="email" name="email" id="deleteModalEmail"
                    placeholder="Email Address" readOnly />
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-danger" id="submitDelete">Delete</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ); // TODO add admin users script
}