import api from '../../backend/api/api';
import React from 'react';

export default function Preorders() {
  const preorders = api.get('/preorders');

  return (
    <React.Fragment>
      <div className="container">
        <h1>Manage Preorders</h1>
        <div className="table-responsive">
          <table id="preordersTable" className="table table-striped table-bordered" cellspacing="0" width="99%">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Time</th>
                <th scope="col">Item</th>
                <th scope="col">Count</th>
                <th scope="col">ONYEN</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {preorders && (
                preorders.forEach((trans) => {
                  <tr>
                    <td>{trans.id}</td>
                    <td>{trans.createdAt.toLocaleString()}</td>
                    <td>{trans.item_name}</td>
                    <td>{trans.count}</td>
                    <td>{trans.onyen}</td>
                    <td>{trans.status}</td>
                    <td className="text-right pr-1">
                      <div className="btn-group" role="group">
                        <button 
                          style="width:40px" type="button" className="btn btn-success" title="Approve preorder"
                          aria-label="Approve preorder" data-toggle="modal" data-target="#completeModal"
                          data-id={trans.id} data-name={trans.item_name} data-count={trans.count}
                          data-onyen={trans.onyen}
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <button 
                          style="width:40px" type="button" className="btn btn-danger" title="Cancel preorder"
                          aria-label="Cancel preorder" data-toggle="modal" data-target="#cancelModal" 
                          data-id={trans.id} data-name={trans.item_name} data-count={trans.count}
                          data-onyen={trans.onyen}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal fade" id="completeModal" tabindex="-1" role="dialog" aria-labelledby="completeModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title" id="completeModalLabel">Complete this preorder?</p>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form name="completeForm" id="completeForm" action="/preorders/complete" method="POST">
                <div className="form-group">
                  <input 
                    className="form-control" type="text" name="id" 
                    id="completeModalId" readonly hidden
                    aria-label="item id" 
                  />
                </div>
                <div className="form-group">
                  <label for="completeModalName">Item Name</label>
                  <input 
                    className="form-control" type="text" name="name" 
                    id="completeModalName" placeholder="Item Name"
                    readonly 
                  />
                </div>
                <div className="form-group">
                  <label for="completeModalOnyen">ONYEN</label>
                  <input 
                    className="form-control" type="text" name="onyen" 
                    id="completeModalOnyen" placeholder="ONYEN" 
                    readonly 
                  />
                </div>
                <div className="form-group">
                  <label for="completeModalCount">Count</label>
                  <input 
                    className="form-control" type="number" name="count"
                    id="completeModalCount" min="1" readonly 
                  />
                </div>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary" id="submitComplete">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="cancelModal" tabindex="-1" role="dialog" aria-labelledby="cancelModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title" id="cancelModalLabel">Cancel this preorder?</p>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form name="cancelForm" id="cancelForm" action="/preorders/cancel" method="POST">
                <div className="form-group">
                  <input className="form-control" type="text" name="id" id="cancelModalId" readonly hidden aria-label="item id" />
                </div>
                <div className="form-group">
                  <label for="cancelModalName">Item Name</label>
                  <input className="form-control" type="text" name="name" id="cancelModalName" placeholder="Item Name" readonly />
                </div>
                <div className="form-group">
                  <label for="cancelModalOnyen">ONYEN</label>
                  <input className="form-control" type="text" name="onyen" id="cancelModalOnyen" placeholder="ONYEN" readonly />
                </div>
                <div className="form-group">
                  <label for="cancelModalCount">Count</label>
                  <input className="form-control" type="number" name="count" id="cancelModalCount" min="1" readonly />
                </div>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary" id="submitCancel">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ); // TODO add script from preorders.ejs view
}