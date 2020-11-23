let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(methodType, url, async = true, data = null) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status.toString().match("^[2][0-9]{2}$")) {
          resolve(xhr.responseText);
        } else if (xhr.status.toString().match("^[45][0-9]{2}$")) {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
          console.log("XHR Failed");
        }
      }
    };
    xhr.open(methodType, url, async);
    if (data) {
      console.log(JSON.stringify(data));
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " request sent to the server");
  });
}

const getURL = "http://127.0.0.1:3000/employee_payroll/2";
makePromiseCall("GET", getURL, true)
  .then((data) => {
    console.log("Get User Data: " + data);
  })
  .catch((error) => console.log("GET Error Status: " + JSON.stringify(error)));

const deleteURL = "http://127.0.0.1:3000/employee_payroll/3";
makePromiseCall("DELETE", deleteURL, false)
  .then((data) => {
    console.log("User Deleted: " + data);
  })
  .catch((error) =>
    console.log("DELETE Error Status: " + JSON.stringify(error))
  );

const postURL = "http://127.0.0.1:3000/employee_payroll";
const empData = {
  company_id: 0,
  name: "Trisha",
  gender: "F",
  salary: 3000000,
  start_date: "2019-11-13",
  active: 1,
};
makePromiseCall("POST", postURL, true, empData)
  .then((data) => {
    console.log("User Added: " + data);
  })
  .catch((error) => console.log("POST Error Status: " + JSON.stringify(error)));