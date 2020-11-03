import api from '../api/api';
import React from 'react';

export default function Preorders() {
  const preorders = api.get('/preorders');

  return (
    <React.Fragment>
      <div class="container">
        <h1>Manage Preorders</h1>
        <div class="table-responsive">
          <table id="preordersTable" class="table table-striped table-bordered" cellspacing="0" width="99%">
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
                    <td class="text-right pr-1">
                      <div class="btn-group" role="group">
                        <button 
                          style="width:40px" type="button" class="btn btn-success" title="Approve preorder"
                          aria-label="Approve preorder" data-toggle="modal" data-target="#completeModal"
                          data-id={trans.id} data-name={trans.item_name} data-count={trans.count}
                          data-onyen={trans.onyen}
                        >
                          <i class="fas fa-check"></i>
                        </button>
                        <button 
                          style="width:40px" type="button" class="btn btn-danger" title="Cancel preorder"
                          aria-label="Cancel preorder" data-toggle="modal" data-target="#cancelModal" 
                          data-id={trans.id} data-name={trans.item_name} data-count={trans.count}
                          data-onyen={trans.onyen}
                        >
                          <i class="fas fa-times"></i>
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
      <div class="modal fade" id="completeModal" tabindex="-1" role="dialog" aria-labelledby="completeModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title" id="completeModalLabel">Complete this preorder?</p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form name="completeForm" id="completeForm" action="/preorders/complete" method="POST">
                <div class="form-group">
                  <input 
                    class="form-control" type="text" name="id" 
                    id="completeModalId" readonly hidden
                    aria-label="item id" 
                  />
                </div>
                <div class="form-group">
                  <label for="completeModalName">Item Name</label>
                  <input 
                    class="form-control" type="text" name="name" 
                    id="completeModalName" placeholder="Item Name"
                    readonly 
                  />
                </div>
                <div class="form-group">
                  <label for="completeModalOnyen">ONYEN</label>
                  <input 
                    class="form-control" type="text" name="onyen" 
                    id="completeModalOnyen" placeholder="ONYEN" 
                    readonly 
                  />
                </div>
                <div class="form-group">
                  <label for="completeModalCount">Count</label>
                  <input 
                    class="form-control" type="number" name="count"
                    id="completeModalCount" min="1" readonly 
                  />
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary" id="submitComplete">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="cancelModal" tabindex="-1" role="dialog" aria-labelledby="cancelModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title" id="cancelModalLabel">Cancel this preorder?</p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form name="cancelForm" id="cancelForm" action="/preorders/cancel" method="POST">
                <div class="form-group">
                  <input class="form-control" type="text" name="id" id="cancelModalId" readonly hidden aria-label="item id" />
                </div>
                <div class="form-group">
                  <label for="cancelModalName">Item Name</label>
                  <input class="form-control" type="text" name="name" id="cancelModalName" placeholder="Item Name" readonly />
                </div>
                <div class="form-group">
                  <label for="cancelModalOnyen">ONYEN</label>
                  <input class="form-control" type="text" name="onyen" id="cancelModalOnyen" placeholder="ONYEN" readonly />
                </div>
                <div class="form-group">
                  <label for="cancelModalCount">Count</label>
                  <input class="form-control" type="number" name="count" id="cancelModalCount" min="1" readonly />
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary" id="submitCancel">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ); // TODO add script from preorders.ejs view
}