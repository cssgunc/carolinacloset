import React from 'react';

const transactions = ''

export default function OrderHistory() {
  return (
    <div class="container">
      <h1>Transaction History</h1>
      <div class="table-responsive">
        <table id="historyTable" class="table table-striped table-bordered" cellspacing="0" width="99%">
          <thead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Item Name</th>
              <th scope="col">Count</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions && (
              transactions.forEach((trans) => {
                <tr>
                  <td>{trans.createdAt.toLocaleString()}</td>
                  <td>{trans.item_name}</td>
                  <td>{trans.count}</td>
                  <td>{trans.status}</td>
                </tr>
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  ); // TODO add history script found at bottom of history.ejs
}