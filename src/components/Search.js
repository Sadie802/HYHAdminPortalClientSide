import React from "react";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Dialog,
} from "@mui/material";
import edit from "../images/edit.png";
import view from "../images/view.png";
import trash from "../images/trash.png";

export default function Search(props) {
  let searchedItemDisplay;
  let allData = props.pending;
  let search = props.search;

  //finding all requests that match below queries
  let searchedItem = allData.filter(
    (itemCard) =>
      itemCard.itemName.includes(search) ||
      itemCard.recipientName.includes(search) ||
      itemCard._id.includes(search)
  );

  //if there's an item that matches above queries:
  if (searchedItem) {
    searchedItemDisplay = searchedItem.map((searchedItem, index) => {
      let id = searchedItem._id;
      id = id.slice(17);
      let date = searchedItem.dateCreated;
      date = date.slice(0, 10);

      return (
        <tr key={`donationItemCard-${index}`}>
          <td>{date}</td>
          <td>{searchedItem.itemName}</td>
          <td>{searchedItem.recipientName}</td>
          <td>{id}</td>
          <td>
            {/* creating edit button for each item card with id of the piece of data's id  */}
            <button
              id={searchedItem._id}
              className="dataBtn"
              type="button"
              onClick={props.handleEditClick}
            >
              <img
                id={searchedItem._id}
                src={edit}
                width="15px"
                onClick={props.handleEditClick}
              />
            </button>
          </td>
          <td>
            {/* creating view button for each item card with id of the piece of data's id  */}
            <button
              id={searchedItem._id}
              className="dataBtn"
              type="button"
              onClick={props.handleViewClick}
            >
              <img
                src={view}
                width="15px"
                id={searchedItem._id}
                onClick={props.handleViewClick}
              />
            </button>
          </td>
          {/* if edit or view modal open (true), do not show delete button - else, show it */}
          {props.editClicked || props.viewClicked ? null : (
            <td>
              <Button id={searchedItem._id} onClick={props.handleClickOpen}>
                <img src={trash} width="15px" id={searchedItem._id} />
              </Button>
              <Dialog
                open={props.deleteClicked}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Delete Request?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {`This request will be permanently deleted. Do you wish to continue?`}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={props.handleClose}>Cancel</Button>
                  <Button
                    id={props.deleteItem}
                    onClick={props.handleDelete}
                    autoFocus
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </td>
          )}
        </tr>
      );
    });
  }
  return searchedItemDisplay;
}
