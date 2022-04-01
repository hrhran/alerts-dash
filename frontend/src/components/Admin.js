import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import "./Admin.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import AddIcon from "@mui/icons-material/Add";

import { Updatedetails } from "./Updatedetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteDialogue } from "./DeleteDialogue";
import "./FormData.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const Admin = () => {
  //Fetching data from datatbse and setting it to res
  const [res, setRes] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("/getData")
        .then((res) => {
          console.log(res.data);
          setRes(res.data);
          setResult(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("Can't Fetch data there is some issue at server side");
        });
    };
    getData();
  }, []);
  //End of fetching of data

  //Modal which will be shown for taking input data to store in db
  const [modal, setModal] = useState(false);

  //For taking input from the users and storing them to variables
  const [data, setData] = useState({
    action: "",
    ticker: "",
    strike: "",
    type: "",
    premium: "",
    comment: "",
    quantity: "",
  });
  const [expiry, setExpiry] = useState("");
  const [createdAt, setCreatedAt] = useState();

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
  //End of taking input and storing their value

  //Function to add data to the database
  const submitData = async (e) => {
    e.preventDefault();
    const { action, ticker, strike, type, premium, comment, quantity } = data;
    if (
      !action ||
      !ticker ||
      !strike ||
      !type ||
      !premium ||
      !comment ||
      !quantity ||
      !expiry
    ) {
      alert("First fill all fields");
    } else if (createdAt === null)
      alert("createdAt value is either null or in wrong format ");
    else if (premium <= 0) alert("Premium avlue cannot be negative or 0");
    else {
      const created_at = createdAt.getTime() / 1000.0;
      await axios
        .post("/addData", {
          action,
          ticker,
          strike,
          type,
          premium,
          comment,
          quantity,
          trade_id: uuidv4(),
          expiry,
          created_at,
        })
        .then(() => {
          setModal(false);
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
          alert("Can't add data there is some issue at server side");
        });
    }
  };
  //End of submit function

  // Calling edit details modal
  const [val, setVal] = useState("");
  const [showupdate, setShowupdate] = useState(false);
  const numHandle = (res) => {
    setShowupdate(true);
    setVal(res);
  };
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteVal, setDeleteVal] = useState("");
  const DeleteData = async (val) => {
    setDeleteVal(val); //setting this object value to deleteVal to pass as props to DeleteDialogue
    setDeleteModal(true); //updating deleteModal to show DeleteDialogue component
  };
  //End of edit details model

  //Setting up filtration using search bar
  const [filterData, setFilterData] = useState("");
  const [searchText, setSearchText] = useState("");
  let add = [];

  const handleChange = (e) => {
    setSearchText(e.target.value);
    searchDropdown(e.target.value);
  };
  const searchDropdown = (val) => {
    let lowercase = val.toString().toLowerCase().trim();
    for (let i = 0; i < res.length; i++) {
      if (res[i].action.toString().toLowerCase().includes(lowercase)) {
        add.push(res[i].action);
      }
      if (res[i].type.toString().toLowerCase().includes(lowercase)) {
        add.push(res[i].type);
      }
      if (res[i].strike.toString().toLowerCase().includes(lowercase)) {
        add.push(res[i].strike);
      }
      if (res[i].ticker.toString().toLowerCase().includes(lowercase)) {
        add.push(res[i].ticker);
      }
      if (res[i].premium.toString().toLowerCase().includes(lowercase)) {
        add.push(res[i].premium);
      }
      if (res[i].quantity.toString().toLowerCase().includes(lowercase)) {
        add.push(res[i].quantity);
      }
      if (res[i].comment.toString().toLowerCase().includes(lowercase)) {
        add.push(res[i].comment);
      }
      if (res[i].expiry.toString().toLowerCase().includes(lowercase)) {
        add.push(res[i].expiry);
      }
      // if (res[i].created_at.toString().toLowerCase().includes(lowercase)) {
      //   add.push(res[i].created_at);
      // }
    }
    setFilterData([...new Set(add)]);
    console.log(add);
    console.log([...new Set(add)]);
    if (lowercase) {
      const filter = res.filter((item) => {
        return Object.keys(item).some((key) => {
          return item[key].toString().toLowerCase().includes(lowercase);
        });
      });
      setRes(filter);
    } else {
      setRes(result);
    }
  };
  const fillSearch = (val) => {
    setSearchText(val);
    setFilterData([]);
    add = [];
    let lowercase = val.toString().toLowerCase().trim();
    const filter = res.filter((item) => {
      return Object.keys(item).some((key) => {
        return (
          item[key].toString().toLowerCase().trim() === lowercase
        );
      });
    });
    setRes(filter);
  };

  // Functions for sorting based on column
  //based on quantity
  const sortingQuantity = () => {
    const array = [...res].sort((a, b) => {
      return a.quantity - b.quantity;
    });
    setRes(array);
  };

  //based on strike
  const sortingStrike = () => {
    const array = [...res].sort((a, b) => {
      return a.strike - b.strike;
    });
    setRes(array);
  };
  //based on type
  const sortingType = () => {
    const array = [...res].sort((a, b) => {
      return a.type.localeCompare(b.type);
    });
    setRes(array);
  };
  //based on premium
  const sortingPremium = () => {
    const array = [...res].sort((a, b) => {
      return a.premium - b.premium;
    });
    setRes(array);
  };
  //based on created AT
  const sortingCreatedAt = () => {
    const array = [...res].sort((a, b) => {
      return a.created_at - b.created_at;
    });
    setRes(array);
  };
  //based on expiry
  const sortingExpiry = () => {
    const array = [...res].sort((a, b) => {
      return a.expiry.localeCompare(b.expiry);
    });
    setRes(array);
  };

  //based on comment
  const sortingComment = () => {
    const array = [...res].sort((a, b) => {
      return a.comment.localeCompare(b.comment);
    });
    setRes(array);
  };

  //based on expiry
  const sortingAction = () => {
    const array = [...res].sort((a, b) => {
      return a.action.localeCompare(b.action);
    });
    setRes(array);
  };

  //based on ticker
  const sortingTicker = () => {
    const array = [...res].sort((a, b) => {
      // return a.ticker - b.ticker;
      return a.ticker.localeCompare(b.ticker);
    });
    setRes(array);
  };

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",

            alignItems: "center",
            flexWrap: "wrap",
            backgroundColor: "#34495e",
            width: "100%",
          }}
        >
          <div style={{ marginLeft: "15px" }}>
            <span style={{ fontSize: "40px" }}>TradeWithMak</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "4px",
            }}
          >
            <div
              style={{ height: "40px", display: "flex", alignItems: "center" }}
            >
              <input
                type="text"
                value={searchText}
                style={{
                  width: "550px",

                  outline: "none",
                  borderRadius: "5px",
                  border: "1px solid",
                  height: "90%",
                  paddingLeft: "8px",
                  borderColor: "gray",
                }}
                onChange={handleChange}
                placeholder="Search"
              />
            </div>
            {searchText !== "" && filterData.length > 0 && (
              <div className="dataresult">
                {filterData.map((elem, index) => {
                  return (
                    <div
                      className="dataItem"
                      key={index}
                      onClick={() => {
                        fillSearch(elem);
                      }}
                    >
                      {elem}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              marginRight: "15px",
              marginLeft: "5px",
            }}
          >
            {" "}
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => setModal(true)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <div>
                  <AddIcon />
                </div>{" "}
                <div>Add data</div>
              </div>
            </button>
          </div>
        </div>

        {/* ------------------Modal--------------- */}
        <Modal show={modal}>
          <Modal.Header
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "20px" }}>Fill details to add data</div>
          </Modal.Header>
          <Modal.Body
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <form>
              <div className="form-outline mb-2">
                <select
                  name="action"
                  className="form-select"
                  onChange={handleInputs}
                >
                  <option>Select Action</option>
                  <option value="BOUGHT">BOUGHT</option>
                  <option value="SOLD">SOLD</option>
                </select>
              </div>
              <div className="form-outline mb-2">
                <input
                  type="text"
                  name="ticker"
                  className="form-control form-control-md"
                  placeholder="Ticker"
                  onChange={handleInputs}
                  value={data.ticker}
                />
              </div>
              <div className="form-outline mb-2">
                <input
                  type="number"
                  className="form-control form-control-md"
                  placeholder="Strike value"
                  name="strike"
                  onChange={handleInputs}
                  value={data.strike}
                  min="0"
                />
              </div>
              <div className="form-outline mb-2">
                <select
                  name="type"
                  className="form-select"
                  onChange={handleInputs}
                >
                  <option>Select Type</option>
                  <option value="C">C</option>
                  <option value="P">P</option>
                </select>
              </div>
              <div className="form-outline mb-2">
                <input
                  type="number"
                  className="form-control form-control-md"
                  value={data.premium}
                  name="premium"
                  placeholder="Premium Value (*Note: The value should be positive)"
                  onChange={handleInputs}
                  min="1"
                />
              </div>
              <div className="form-outline mb-2 mt-3 form-group">
                <label
                  style={{
                    display: "flex",
                    alignSelf: "flex-start",
                    fontSize: "16px",
                  }}
                >
                  Select expiry date
                </label>
                <input
                  type="date"
                  className="form-control form-control-md"
                  value={expiry}
                  name="expiry"
                  onChange={dateSet}
                />
              </div>
              <div className="form-outline mb-2">
                <input
                  type="text"
                  name="comment"
                  className="form-control form-control-md"
                  placeholder="Comment"
                  onChange={handleInputs}
                  value={data.comment}
                />
              </div>
              <div className="form-outline mb-2">
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
                  placeholder="yyyy-mm-dd hh:mm:ss"
                  style={{ fontSize: "17px" }}
                  format="y-MM-dd h:mm:ss a"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-info"
              style={{ color: "white" }}
              onClick={submitData}
            >
              Add Data
            </button>
            <button
              type="button"
              className="btn btn-danger"
              style={{ color: "white" }}
              onClick={() => {
                setModal(false);
              }}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <div className="listdetails">
          {deleteModal && (
            <DeleteDialogue val={deleteVal} setDeleteModal={setDeleteModal} />
          )}
          {showupdate && (
            <Updatedetails res={val} setShowupdate={setShowupdate} />
          )}
          <table>
            <thead>
              <tr>
                <th>
                  Ticker
                  <span className="downwardicons" onClick={sortingTicker}>
                    <ExpandMoreIcon />
                  </span>
                </th>
                <th>
                  Action
                  <span className="downwardicons" onClick={sortingAction}>
                    <ExpandMoreIcon />
                  </span>
                </th>
                <th>
                  Strike
                  <span className="downwardicons" onClick={sortingStrike}>
                    <ExpandMoreIcon />
                  </span>
                </th>
                <th>
                  Type
                  <span className="downwardicons" onClick={sortingType}>
                    <ExpandMoreIcon />
                  </span>
                </th>
                <th>
                  Premium
                  <span className="downwardicons" onClick={sortingPremium}>
                    <ExpandMoreIcon />
                  </span>
                </th>
                <th>
                  Expiry
                  <span className="downwardicons" onClick={sortingExpiry}>
                    <ExpandMoreIcon />
                  </span>
                </th>
                <th>
                  Comment
                  <span className="downwardicons" onClick={sortingComment}>
                    <ExpandMoreIcon />
                  </span>
                </th>
                <th>
                  Quantity
                  <span className="downwardicons" onClick={sortingQuantity}>
                    <ExpandMoreIcon />
                  </span>
                </th>
                <th>
                  Created At
                  <span className="downwardicons" onClick={sortingCreatedAt}>
                    <ExpandMoreIcon />
                  </span>
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {res.map((res, index) => (
                <tr
                  key={index}
                  onDoubleClick={() => numHandle(res)}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ecf0f1" : "white",
                  }}
                >
                  <td>{res.ticker}</td>
                  <td>{res.action}</td>
                  <td>{res.strike}</td>

                  <td>{res.type}</td>

                  <td>{res.premium}</td>

                  <td>{res.expiry}</td>

                  <td>{res.comment}</td>

                  <td>{res.quantity}</td>

                  <td>
                    {new Date(res.created_at * 1000).toDateString() +
                      ` , ` +
                      new Date(res.created_at * 1000)
                        .toTimeString()
                        .slice(0, 5)}
                  </td>

                  <td
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div>
                      <EditIcon
                        onClick={() => numHandle(res)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div>
                      <DeleteIcon
                        onClick={() => DeleteData(res)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
