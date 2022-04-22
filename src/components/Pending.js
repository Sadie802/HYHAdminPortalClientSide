import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Search from "./Search";
import { Navigate, useLocation } from "react-router-dom";
import Userfront from "@userfront/react";
import {
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Dialog,
} from "@mui/material";
import { Table } from "reactstrap";
import View from "./View";
import Edit from "./Edit";
import edit from "../images/edit.png";
import view from "../images/view.png";
import trash from "../images/trash.png";

export default function PendingRequests() {
  const [search, setSearch] = useState(null);
  const [display, setDisplay] = useState();
  const [viewClicked, setViewClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [pending, setPending] = useState([]);
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientLocation, setRecipientLocation] = useState("");
  const [comments, setComments] = useState("");
  const [recipientState, setRecipientState] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [deleteItem, setDeleteItem] = useState("");
  const [error, setError] = useState(false);

  //Delete functionality----------------

  //opening delete confirmation pop-up
  const handleClickOpen = (e) => {
    setDeleteClicked(true);
    setDeleteItem(e.target.id); //setting deleteItem to clicked item's Id
    let selected = pending.find((item) => item._id === e.target.id); //finding data that matches id of request clicked
    setItem(selected.itemName);
  };

  //closing delete confirmation pop-up
  const handleClose = () => {
    setDeleteClicked(false);
  };

  //sending to-be-deleted item's ID to database
  async function handleDelete(e) {
    try {
      let response = await fetch(`http://localhost:8003/delete`, {
        method: "POST",
        body: JSON.stringify({
          itemId: e.target.id, //button id (which is id of item clicked)
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      await response.json();
      window.location.reload();
    } catch (error) {
      console.log(error, "404 - Not Found");
    }
  }
  //-----END delete functionality-------------

  //view modal
  function handleViewClick(e) {
    setDisplay(e.target.id); //setting ID of request clicked to display state
    if (viewClicked === false) {
      setViewClicked(true); //opening modal
    } else if (viewClicked === true) {
      setViewClicked(false); //closed modal
    }
  }

  //edit modal
  function handleEditClick(e) {
    setEditClicked(!editClicked);
    setDisplay(e.target.id); //setting ID of request clicked to display state
    let selected = pending.find((item) => item._id === e.target.id); //finding data that matches id of request clicked

    // modal about to be opened - setting states to be selected item
    if (editClicked === false) {
      setItem(selected.itemName);
      setPrice(selected.itemPrice);
      setDescription(selected.donationDescription);
      setRecipientName(selected.recipientName);
      setRecipientLocation(selected.recipientUSLocation);
      setComments(selected.comments);
      setRecipientState(selected.recipientState);
      setItemCategory(selected.itemCategory);
    } else if (editClicked === true) {
      // Modal is open and is about to be closed
      setItem("");
      setPrice("");
      setDescription("");
      setRecipientName("");
      setRecipientLocation("");
      setComments("");
      setRecipientState("");
      setItemCategory("");
    }
  }

  //fetching funded items from DB
  useEffect(() => {
    let isConnectedToServer = true;
    async function getData() {
      try {
        let response = await fetch(`http://localhost:8003/`);
        response = await response.json();
        setPending(response);
      } catch (error) {
        console.log(error, "404 - Not Found");
        setError(true);
      }
    }
    if (isConnectedToServer) {
      getData();
    }
    // cleanup function to stop getData from running more than needed
    return () => {
      isConnectedToServer = false;
    };
  }, []);

  //mapping over data to create 'item cards' for each piece of data (each request)
  const itemCardList = pending.map((itemCard, index) => {
    let id = itemCard._id;
    id = id.slice(17);
    let date = itemCard.dateCreated;
    date = date.slice(0, 10);

    return (
      <tr key={`donationItemCard-${index}`}>
        <td>{date}</td>
        <td>{itemCard.itemName}</td>
        <td>{itemCard.recipientName}</td>
        <td>{id}</td>
        <td>
          {/* creating edit button for each item(request) card */}
          <button
            id={itemCard._id}
            className="dataBtn"
            type="button"
            onClick={handleEditClick}
          >
            <img
              id={itemCard._id}
              src={edit}
              width="15px"
              onClick={handleEditClick}
            />
          </button>
        </td>
        <td>
          {/* creating view button for each item(request) card */}
          <button
            id={itemCard._id}
            className="dataBtn"
            type="button"
            onClick={handleViewClick}
          >
            <img
              src={view}
              width="15px"
              id={itemCard._id}
              onClick={handleViewClick}
            />
          </button>
        </td>
        {/* if edit or view modal open (true), do not show delete button - else, show it */}
        {viewClicked || editClicked ? null : (
          <td>
            <Button id={itemCard._id} onClick={handleClickOpen}>
              <img src={trash} width="15px" id={itemCard._id} />
            </Button>
          </td>
        )}
      </tr>
    );
  });

  //only allowing access to this component if user logged in - otherwise redirects to login page
  let location = useLocation();
  if (!Userfront.tokens.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <main>
      <NavBar />
      {/* View the selected item */}
      <View
        viewClicked={viewClicked}
        handleViewClick={handleViewClick}
        pending={pending}
        display={display}
      />
      {/* Edit the selected item */}
      <Edit
        editClicked={editClicked}
        handleEditClick={handleEditClick}
        display={display}
        item={item}
        price={price}
        donationDescription={description}
        recipientName={recipientName}
        recipientLocation={recipientLocation}
        comments={comments}
        recipientState={recipientState}
        itemCategory={itemCategory}
      />
      <div className="pendingHeader">
        <h1 id="pendingTitle">Pending Requests</h1>
        {/* If edit or view modal open (true), don't show search bar (null), else, show search bar */}
        {viewClicked || editClicked ? null : (
          <TextField
            sx={{ marginLeft: "100px" }}
            className="textfield"
            id="standard-basic"
            label="Search"
            variant="standard"
            color="secondary"
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </div>
      <div id="tableContainer">
        <Table hover size="sm">
          <thead>
            <tr>
              <th>Date Published</th>
              <th>Item</th>
              <th>Recipient</th>
              <th>ID</th>
              <th>Edit</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          {/* If error fetching data */}
          {error && (
            <div id="errorMsg">
              <h1>Error</h1>
              <h5>
                Unable to connect to database. Please try refreshing the page
              </h5>
            </div>
          )}
          <tbody>
            {/* If search true (text typed in search bar), display Search component, else, display full itemCardList */}
            {search ? (
              <Search
                pending={pending}
                search={search}
                handleEditClick={handleEditClick}
                handleViewClick={handleViewClick}
                handleDelete={handleDelete}
                deleteItem={deleteItem}
                handleClose={handleClose}
                deleteClicked={deleteClicked}
                handleClickOpen={handleClickOpen}
                viewClicked={viewClicked}
                editClicked={editClicked}
              />
            ) : (
              itemCardList
            )}
          </tbody>
        </Table>
      </div>
      {/* Modal (dialog box) asking user to confirm that they want to delete request/data piece */}
      <Dialog
        open={deleteClicked}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete {item}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This request will be permanently deleted. Do you wish to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* setting button's id to the item clicked id. button's id passed into fetch request*/}
          <Button id={deleteItem} onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
