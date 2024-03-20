
//Create Connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

//Connect to Methods that hub invokes aka receive notfications from hub
connectionUserCount.on("updatedTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
    //newCountSpan.innerText = `${value}`;
});

connectionUserCount.on("updatedTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
    //newCountSpan.innerText = `${value}`;
});
//invoke hub methods aka send notfication
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded");
}

//start connection
function fullfilled() {
    //do something on start
    console.log("Connection to User Hub Successful");
    newWindowLoadedOnClient();
}
function rejected() {
    //rejected logs
}

connectionUserCount.start().then(fullfilled, rejected);