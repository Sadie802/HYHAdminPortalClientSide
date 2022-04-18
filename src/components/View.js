import React from "react";
import { Table } from "reactstrap";
import close from "../images/close.png";

export default function Modal(props) {
  if (props.viewClicked === true) {
    let newCardList = props.pending;
    console.log(newCardList);
    let selectedRequest = newCardList.find(
      (item) => item._id === props.display
    );
    let id = selectedRequest._id;
    id = id.slice(17);
    let date = selectedRequest.dateCreated;
    date = date.slice(0, 10);

    return (
      <main id="modal-background">
        <section id="modal-content">
        <div className="closeBtnContainer">
                <button id="modalCloseBtn" onClick={props.handleViewClick}>
                  <img src={close} width="25px" />
                </button>
              </div>
          <Table striped size="sm">
            <tbody>
              <tr>
                <th scope="row">Id</th>
                <td>{id}</td>
              </tr>
              <tr>
                <th scrope="row">Date</th>
                <td>{date}</td>
              </tr>
              <tr>
                <th scope="row">Item</th>
                <td>{selectedRequest.itemName}</td>
              </tr>
              <tr>
                <th scope="row">Price</th>
                <td>${selectedRequest.itemPrice}</td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>{selectedRequest.donationDescription}</td>
              </tr>
              <tr>
                <th scope="row">State</th>
                <td>{selectedRequest.recipientState}</td>
              </tr>
              <tr>
                <th scope="row">Category</th>
                <td>{selectedRequest.itemCategory}</td>
              </tr>
              <tr>
                <th scope="row">Recipient</th>
                <td>{selectedRequest.recipientName}</td>
              </tr>
              <tr>
                <th scope="row">US Location</th>
                <td>{selectedRequest.recipientUSLocation}</td>
              </tr>
              <tr>
                <th scope="row">Origin Location</th>
                <td>{selectedRequest.recipientHomeOrigin}</td>
              </tr>
              <tr>
                <th scope="row">Comments</th>
                <td>{selectedRequest.comments}</td>
              </tr>
            </tbody>
          </Table>
        </section>
      </main>
    );
  }
  return null;
}
