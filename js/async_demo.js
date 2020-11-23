function showTime() {
    const date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }
  
  function showSessionExpire() {
    console.log("Activity B expired at " + showTime());
  }
  
  console.log("Activity A starting at " + showTime());
  setTimeout(showSessionExpire, 5000);
  console.log(
    "Activity A has triggered B after it's execution at " +
      showTime() +
      " but Acticity B is going to wait for 5 seconds"
  );