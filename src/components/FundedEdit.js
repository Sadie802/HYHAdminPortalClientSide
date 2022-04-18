import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import close from "../images/close.png";



export default function Edit(props) {
  let itemId = props.display
  const [item, setItem] = useState(props.item);
  const [price, setPrice] = useState(props.price);
  const [description, setDescription] = useState(props.donationDescription);
  const [recipientName, setRecipientName] = useState(props.recipientName);
  const [recipientLocation, setRecipientLocation] = useState(props.recipientLocation);
  const [recipientOrigin, setRecipientOrigin] = useState(props.recipientOrigin);
  const [comments, setComments] = useState(props.comments);
  const [recipientState, setRecipientState] = useState(props.recipientState)
  const [itemCategory, setItemCategory] = useState(props.itemCategory)

  async function handleSubmit() {
      
    let response = await fetch(`http://localhost:8003/edit`, {
      method: "POST",
      body: JSON.stringify({
        itemId: itemId,
        itemName: item,
        itemPrice: price,
        donationDescription: description,
        isFunded: true,
        recipientName: recipientName,
        recipientUSLocation: recipientLocation,
        recipientHomeOrigin: recipientOrigin,
        dateCreated: new Date(),
        comments: comments,
        recipientState: recipientState,
        itemCategory: itemCategory,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    await response.json();
  }

useEffect(() => {
  setItem(props.item)
  setPrice(props.price)
  setDescription(props.donationDescription)
  setRecipientName(props.recipientName)
  setRecipientLocation(props.recipientLocation)
  setRecipientOrigin(props.recipientOrigin)
  setComments(props.comments)
  setRecipientState(props.recipientState)
  setItemCategory(props.itemCategory)
}, [props.editClicked])

  if (/*props.selected &&*/ props.editClicked === true) {
  let showSelectedRequest = (
      <Form className="requestForm" onSubmit={handleSubmit}>
        <div className="closeBtnContainer">
            <button id="modalCloseBtn" onClick={props.handleViewClick}>
          <img src={close} width="25px" />
        </button>
        </div>
        <h2 id="formTitle" style={{ textAlign: "center" }}>
          Edit Request
        </h2>

        <FormGroup>
          <Label htmlFor="itemName">Item Name</Label>
          <Input
            name="itemName"
           readOnly
            value={item}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="itemPrice">Item Price</Label>
          <Input
            name="itemPrice"
           readOnly
            value={price}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input
            name="description"
        
           readOnly
            value={description}
          />
        </FormGroup>
        <div className='selectInputs'>
          <FormGroup>
            <Label htmlFor='stateSelect'>State</Label>
            <Input name="select" id="stateSelect" readOnly value={recipientState}></Input>
          </FormGroup>
        
          <FormGroup>
            <Label htmlFor='categorySelect'>Category</Label>
            <Input name="select" id="exampleSelect" readOnly value={itemCategory}>
            </Input>
          </FormGroup>
        </div>

        <FormGroup>
          <Label htmlFor="recipientName">Recipient Name</Label>
          <Input
            name="recipientName"
            readOnly
            value={recipientName}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="currentLocation">Recipient's Current Location</Label>
          <Input
            name="currentLocation"
          readOnly
            value={recipientLocation}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="origin">Recipients Origin Location</Label>
          <Input
            name="origin"
           readOnly
            value={recipientOrigin}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="comments">Comments</Label>
          <Input
            name="description"
            className="textArea"
            type="textarea"
            onChange={(e) => {
              setComments(e.target.value);
            }}
            value={comments}
          />
        </FormGroup>
        <div className="btnHolder">
        <button id="formBtn" type="submit" >
          Update
        </button>
        </div>
      </Form>
    );
    return (
      <main id="modal-background" style={{ overflow: "scroll" }}>
        <section>{showSelectedRequest}</section>
      </main>
    );
  }
  return null;
}




