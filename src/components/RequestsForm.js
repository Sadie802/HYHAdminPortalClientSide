import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import NavBar from "./NavBar";
import "../stylesheets/main.css";

export default function RequestsForm() {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientLocation, setRecipientLocation] = useState("");
  const [recipientOrigin, setRecipientOrigin] = useState("");
  const [comments, setComments] = useState("");
  const [recipientState, setRecipientState] = useState("");
  const [itemCategory, setItemCategory] = useState("");

  async function handleSubmit() {
    let response = await fetch(`http://localhost:8003/`, {
      method: "POST",
      body: JSON.stringify({
        itemName: item,
        itemPrice: price,
        donationDescription: description,
        isFunded: false,
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
    let data = await response.json();
  }

  return (
    <main>
      <NavBar />
      {/* Form for Inputting new requests */}
      <Form className="requestForm" onSubmit={handleSubmit}>
        <h2 id="formTitle" style={{ textAlign: "center" }}>
          Request Input Form
        </h2>

        <FormGroup>
          <Label htmlFor="itemName">Item Name</Label>
          <Input
            name="itemName"
            type="text"
            placeholder="Item name.."
            onChange={(e) => {
              setItem(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="itemPrice">Item Price</Label>
          <Input
            name="itemPrice"
            type="number"
            placeholder="$"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input
            name="description"
            className="textArea"
            type="textarea"
            placeholder="description.."
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </FormGroup>
        <div className="selectInputs">
          <FormGroup>
            <Label htmlFor="stateSelect">State</Label>
            <Input
              type="select"
              name="select"
              id="stateSelect"
              onChange={(e) => {
                setRecipientState(e.target.value);
              }}
            >
              <option>- State -</option>
              <option>Alabama</option>
              <option>Alaska</option>
              <option>Arizona</option>
              <option>Arkansas</option>
              <option>California</option>
              <option>Colorado</option>
              <option>Connecticut</option>
              <option>Delaware</option>
              <option>Florida</option>
              <option>Georgia</option>
              <option>Hawaii</option>
              <option>Idaho</option>
              <option>Illinois</option>
              <option>Indiana</option>
              <option>Iowa</option>
              <option>Kansas</option>
              <option>Kentucky</option>
              <option>Louisiana</option>
              <option>Maine</option>
              <option>Maryland</option>
              <option>Massachusetts</option>
              <option>Michigan</option>
              <option>Minnesota</option>
              <option>Mississippi</option>
              <option>Missouri</option>
              <option>Montana</option>
              <option>Nebraska</option>
              <option>Nevada</option>
              <option>New Hampshire</option>
              <option>New Jersey</option>
              <option>New Mexico</option>
              <option>New York</option>
              <option>North Carolina</option>
              <option>North Dakota</option>
              <option>Ohio</option>
              <option>Oklahoma</option>
              <option>Oregon</option>
              <option>Pennsylvania</option>
              <option>Rhode Island</option>
              <option>South Carolina</option>
              <option>South Dakota</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Utah</option>
              <option>Vermont</option>
              <option>Virginia</option>
              <option>Washington</option>
              <option>West Virginia</option>
              <option>Wisconsin</option>
              <option>Wyoming</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="categorySelect">Category</Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={(e) => {
                setItemCategory(e.target.value);
              }}
            >
              <option>- Category -</option>
              <option>Bedroom & Bathroom</option>
              <option>Footwear</option>
              <option>Clothing</option>
              <option>Computers</option>
              <option>Gas Cards & Gift Cards</option>
              <option>Outerwear</option>
              <option>Kitchenware & Appliances</option>
              <option>Livingroom</option>
              <option>Toys & Children</option>
              <option>Misc</option>
            </Input>
          </FormGroup>
        </div>

        <FormGroup>
          <Label htmlFor="recipientName">Recipient Name</Label>
          <Input
            name="recipientName"
            type="text"
            placeholder="recipient's name.."
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="currentLocation">Recipient's Current Location</Label>
          <Input
            name="currentLocation"
            type="text"
            placeholder="recipient's current location.."
            onChange={(e) => {
              setRecipientLocation(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="origin">Recipients Origin Location</Label>
          <Input
            name="origin"
            type="text"
            placeholder="recipient's origin location.."
            onChange={(e) => {
              setRecipientOrigin(e.target.value);
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="comments">Comments</Label>
          <Input
            name="description"
            className="textArea"
            type="textarea"
            placeholder="additional comments.."
            onChange={(e) => {
              setComments(e.target.value);
            }}
          />
        </FormGroup>
        <div className="btnHolder">
        <button id="formBtn" type="submit">Save & Publish</button>
        </div>
      </Form>
    </main>
  );
}



//onsubmit of form, show "successfuly added" alert

//only a few of the form Input fields will be passed to front end request page.
//but all of this data will have to hangout in another component where Eloise can maybe search by recipients name to find all info once request is funded
//unless Eloise holds onto google doc form and searches that way?????
