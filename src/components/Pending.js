import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
// import TextField from "@mui/material/TextField";
import { Table } from "reactstrap";
import View from "./View";
import Edit from "./Edit";
import edit from "../images/edit.png";
import view from "../images/view.png";

export default function PendingRequests() {

  const [display, setDisplay] = useState();
  const [viewClicked, setViewClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [pending, setPending] = useState([]);
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientLocation, setRecipientLocation] = useState("");
  const [recipientOrigin, setRecipientOrigin] = useState("");
  const [comments, setComments] = useState("");
  const [recipientState, setRecipientState] = useState("");
  const [itemCategory, setItemCategory] = useState("")

  function handleViewClick(e) {
    setDisplay(e.target.id);
    if (viewClicked === false) {
      setViewClicked(true);
    } else if (viewClicked === true) {
      setViewClicked(false);
    }
  }

  function handleEditClick(e) {
    setEditClicked(!editClicked);
    setDisplay(e.target.id);

    let selected = pending.find((item) => item._id === e.target.id);

    // Modal is closed and is about to be open
    if (editClicked === false) {
      setItem(selected.itemName);
      setPrice(selected.itemPrice);
      setDescription(selected.donationDescription);
      setRecipientName(selected.recipientName);
      setRecipientLocation(selected.recipientUSLocation);
      setRecipientOrigin(selected.recipientHomeOrigin);
      setComments(selected.comments);
      setRecipientState(selected.recipientState);
      setItemCategory(selected.itemCategory)
    } else if (editClicked === true) {
      // Modal is open and is about to be closed
      setItem("");
      setPrice("");
      setDescription("");
      setRecipientName("");
      setRecipientLocation("");
      setRecipientOrigin("");
      setComments("");
      setRecipientState("");
      setItemCategory("")
    }
  }

  //fetching isFunded = false items from DB
  useEffect(() => {
    let isConnectedToServer = true;

    async function getData() {
      let response = await fetch(`http://localhost:8003/`);

      response = await response.json();

      //setting response to notFunded state
      setPending(response);
    }

    if (isConnectedToServer) {
      getData();
    }

    // cleanup function to stop getData from running more than needed
    return () => {
      isConnectedToServer = false;
    };
  }, []);

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
          <button id={itemCard._id} className="dataBtn" type="button" onClick={handleEditClick}>
            <img
              id={itemCard._id}
              src={edit}
              width="15px"
              onClick={handleEditClick}
            />
          </button>
        </td>
        <td>
          <button id={itemCard._id} className="dataBtn" type="button" onClick={handleViewClick}>
            <img
              src={view}
              width="15px"
              id={itemCard._id}
              onClick={handleViewClick}
            />
          </button>
        </td>
      </tr>
    );
  });

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
        recipientOrigin={recipientOrigin}
        comments={comments}
        recipientState={recipientState}
        itemCategory={itemCategory}
      />
      <div className="pendingHeader">
        <h1 id="pendingTitle">Pending Requests</h1>
        {/* <TextField variant="standard" label="Search"/> */}
        {/*^^^^^^^NECESSARY????*/}
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
            </tr>
          </thead>
          <tbody>{itemCardList}</tbody>
        </Table>
      </div>
    </main>
  );
}
