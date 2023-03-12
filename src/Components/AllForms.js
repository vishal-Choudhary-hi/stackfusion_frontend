import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../baseUrl";

import "./AllForm.css";
const getProducts = async (SetproductInfo) => {
  let res;
  try {
    res = await axios.get(`${baseUrl}userForm/`);
  } catch (error) {
    console.log(error);
  }
  res.data.map((item) => {
    let date = new Date(item.dob);
    let newDate =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    item.dob = newDate;
    return { ...item };
  });
  SetproductInfo(res.data);
};
function AllForms() {
  const [data, setData] = useState();
  useEffect(() => {
    getProducts(setData);
  }, []);
  return (
    <div className="tableDiv">
      {data ? (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Email ID</th>
              <th>Phone Number</th>
            </tr>
            {data.map((item, i) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.dob}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default AllForms;
