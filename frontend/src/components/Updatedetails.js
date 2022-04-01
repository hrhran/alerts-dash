import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";

export const Updatedetails = ({ res, setShowupdate }) => {
  const [data, setData] = useState({
    action: res.action,
    ticker: res.ticker,
    strike: res.strike,
    type: res.type,
    premium: res.premium,
    comment: res.comment,
    quantity: res.quantity,
  });
  const [expiry, setExpiry] = useState(res.expiry);
  const [createdAt, setCreatedAt] = useState(new Date(res.created_at * 1000));

  const createdAtSet = (e) => {
    setCreatedAt(e.target.value);
    console.log(e.target.value);
  };

  const dateSet = (e) => {
    setExpiry(e.target.value);
    console.log(e.target.value);
  };

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };


  //Function for put request for editing data in backend
  const handleEdit = async () => {
    if (
      !data.action ||
      !data.ticker ||
      !data.strike ||
      !data.type ||
      !data.premium ||
      !data.comment ||
      !data.quantity ||
      !expiry ||
      !createdAt
    ) {
      alert("Fill values first");
    } else {
      const created_at = createdAt.getTime() / 1000.0;
      await axios
        .put(`/editdata/${res._id}`, { data, expiry, created_at })
        .then((res) => {
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
          alert("Can't update data there is some issue at server side");
        });
    }
  };
  const showHandle = () => {
    setModal(false);
    setShowupdate(false);
  };
  const [modal, setModal] = useState(true);

  return (
    <div>
      <Modal show={modal}>
        <Modal.Body
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <form>
            <div className="form-outline mt-2">
              <label
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontSize: "15px",
                }}
              >
                Action
              </label>
              <select
                name="action"
                className="form-select"
                onChange={handleInputs}
              >
                <option value="BOUGHT">BOUGHT</option>
                <option value="SOLD">SOLD</option>
              </select>
            </div>
            <div className="form-outline mt-2">
              <label
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontSize: "15px",
                }}
              >
                Ticker
              </label>
              <input
                type="text"
                name="ticker"
                className="form-control form-control-md"
                placeholder="Enter Ticker"
                onChange={handleInputs}
                value={data.ticker}
              />
            </div>
            <div className="form-outline mt-2">
              <label
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontSize: "15px",
                }}
              >
                Strike
              </label>
              <input
                type="number"
                className="form-control form-control-md"
                placeholder="Strike Value (Note: It should be number)"
                name="strike"
                onChange={handleInputs}
                value={data.strike}
                min="0"
              />
            </div>
            <div className="form-outline mt-2">
              <label
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontSize: "15px",
                }}
              >
                Type
              </label>
              <select
                name="type"
                className="form-select"
                onChange={handleInputs}
              >
                <option value="C">C</option>
                <option value="P">P</option>
              </select>
            </div>
            <div className="form-outline mt-2">
              <label
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontSize: "15px",
                }}
              >
                Premium (*Note: The value should be positive)
              </label>
              <input
                type="number"
                className="form-control form-control-md"
                value={data.premium}
                name="premium"
                placeholder="Premium Value"
                onChange={handleInputs}
                min="1"
              />
            </div>
            <div className="form-outline mt-2 form-group">
              <label
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontSize: "15px",
                }}
              >
                Expiry Date
              </label>
              <input
                type="date"
                className="form-control form-control-md"
                value={expiry}
                name="expiry"
                onChange={dateSet}
              />
            </div>
            <div className="form-outline mt-2">
              <label
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontSize: "15px",
                }}
              >
                Comment
              </label>
              <input
                type="text"
                name="comment"
                className="form-control form-control-md"
                placeholder="Comment"
                onChange={handleInputs}
                value={data.comment}
              />
            </div>
            <div className="form-outline mt-2">
              <label
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontSize: "15px",
                }}
              >
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                className="form-control form-control-md"
                placeholder="Quantity"
                onChange={handleInputs}
                value={data.quantity}
                min="0"
              />
            </div>
            <div className="form-outline mt-2">
              <label
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontSize: "15px",
                }}
              >
                CreatedAt Date and Time
              </label>
              <DateTimePickerComponent
                onChange={createdAtSet}
                value={createdAt}
                style={{ fontSize: "17px" }}
                format="y-MM-dd h:mm:ss a"
                placeholder="yyyy-mm-dd hh:mm:ss"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-info"
            style={{ color: "white" }}
            onClick={handleEdit}
          >
            Update Data
          </button>
          <button
            type="button"
            className="btn btn-danger"
            style={{ color: "white" }}
            onClick={showHandle}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
