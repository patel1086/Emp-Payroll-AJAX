let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makeAjaxCall(methodType, url, callback, async = true, data = null) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    console.log("State Changed called. Ready state: " +xhr.readyState +" Status: " +xhr.status);
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr === 201) callback(xhr.responseText);
      else if (xhr.status >= 400)
        console.log("Handle 400 Client Error or 500 Server Error");
    }
  };
  xhr.open(methodType, url, async);
  if (data) {
    console.log(JSON.stringify(data));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  } else xhr.send();
  console.log(methodType + " request sent to the server");
}

const getURL = "http://127.0.0.1:3000/employee_payroll/2";
function getUserDetails(data) {
  console.log("Get User Data :" + data);
}

//Get Employee Details
makeAjaxCall("GET", getURL, getUserDetails);

const deleteURL = "http://127.0.0.1:3000/employee_payroll/3";
function userDeleted(data) {
  console.log("User Deleted: " + data);
}

//Delete a particular employee Details
makeAjaxCall("DELETE", deleteURL, userDeleted, false);

const postURL = "http://127.0.0.1:3000/employee_payroll/";
const empData = {
  company_id: 0,
  name: "Trisha",
  gender: "F",
  salary: 3000000,
  start_date: "2019-11-13",
  active: 1,
};
function userAdded(data) {
  console.log("User added: " + data);
}

//Update a particular employee details
makeAjaxCall("POST", postURL, userAdded, true, empData);