function createColumnFunction(column, hide) {
  var res = "var columnTitleElements = document.getElementsByClassName('BoardColumnHeaderTitle');";
  res += "for (var i = 0; i < columnTitleElements.length; i++) {";
  res +=  "if (columnTitleElements[i].textContent == '" + column + "') {";
  res +=    "columnTitleElements[i].parentElement.parentElement.parentElement.parentElement.style.display = '"
  if (hide) {
    res += "none";
  }
  else {
    res += "block";
  }
  res += "';";
  res +=  "}"
  res += "}";

  return res;
}


function createUserFunction(userAbbr, hide) {
  
  var res = "var userAbbrElements = document.querySelectorAll('.Avatar.Avatar--small.DomainUserAvatar-avatar');";
  res += "for (var i = 0; i < userAbbrElements.length; i++) {";
  res +=  "if (userAbbrElements[i].textContent == '" + userAbbr + "') {";
  res +=    "userAbbrElements[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = '"
  if (hide) {
    res += "none";
  }
  else {
    res += "block";
  }
  res += "';";
  res +=  "}"
  res += "}";

  return res;
}


function createUserAvatarFunction(avatarUrl, hide) {
  var res = "var userAvatarElements = document.querySelectorAll('.Avatar.Avatar--small.DomainUserAvatar-avatar');";
  //res += "window.alert('" + userAvatarElements.length + "');";
  res += "for (var i = 0; i < userAvatarElements.length; i++) {"; 
  res +=  "if (userAvatarElements[i].style.backgroundImage == '" + avatarUrl + "') {";
  res +=    "userAvatarElements[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = '"
  if (hide) {
    res += "none";
  }
  else {
    res += "block";
  }
  res += "';";
  res +=  "}"
  res += "}";
  
  return res;
}


function createHideAddColumnFunction() {
  var res = "var addColumnElement = document.querySelector('.BoardNewColumn.BoardBody-column');";
  res += "addColumnElement.style.display = 'none';";
  
  return res;
}


function createUnassignedFunction(hide) {
  var res = "var addAssigneeElements = document.querySelectorAll('.DomainUserAvatar.DomainUserAvatar--noValue');";
  res += "for (var i = 0; i < addAssigneeElements.length; i++) {";
  res +=  "addAssigneeElements[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = '"
  if (hide) {
    res += "none";
  }
  else {
    res += "block";
  }
  res += "';";
  res += "}";

  return res;
}


function columnsCallback(result) {

  var columns = result[0].split("###");
  
  var ul = document.createElement("ul");
  
  columns.forEach(function(s) {
    var li = document.createElement("li");
    var text = document.createTextNode(s);

    var check = document.createElement("input");
    check.type = "checkbox";
    check.checked = true;

    check.addEventListener('change', (event) => {

      chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];

        chrome.tabs.executeScript(tab.id, {code: createColumnFunction(s, !event.target.checked)});
      });
    });
    
    li.appendChild(check);
    li.appendChild(text);
    ul.appendChild(li);
  });

  document.querySelector("#columnFilters").appendChild(ul);
}


function usersCallback(result) {
  var users = result[0].split("###");  

  var ul = document.querySelector("#assigneeList");
  users.forEach(function(s) {
    var li = document.createElement("li");
    var text = document.createTextNode(s);

    var check = document.createElement("input");
    check.type = "checkbox";
    check.checked = true;

    check.addEventListener('change', (event) => {
      
      chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        
        chrome.tabs.executeScript(tab.id, {code: createUserFunction(s, !event.target.checked)});
      });
    });

    li.appendChild(check);
    li.appendChild(text);
    ul.appendChild(li);    
  });
}


function userAvatarsCallback(result) {

  var users = result[0].split("###");
  var ul = document.querySelector("#assigneeList");
  users.forEach(function(s) {
    var li = document.createElement("li");
    var avatar = document.createElement("img");
    avatar.src = s.substr(5, s.length - 7);
    avatar.width = "40";
    avatar.height = "40";

    var check = document.createElement("input");
    check.type = "checkbox";
    check.checked = true;
    
    check.addEventListener('change', (event) => {
       
      //window.alert("AVATAR CHECK onchange");

      chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        
        chrome.tabs.executeScript(tab.id, {code: createUserAvatarFunction(s, !event.target.checked)});
      });
    });
    
    li.appendChild(check);    
    li.appendChild(avatar);
    ul.appendChild(li);
  });
}


function addUnassignedBehavior() {
  var check = document.querySelector("#unassignedCheckbox");
  check.addEventListener('change', (event) => {
    chrome.tabs.query({active:true}, function(tabs) {
      var tab = tabs[0];
      chrome.tabs.executeScript(tab.id, {code: createUnassignedFunction(!event.target.checked)})
    });
  });
}


function addDeselectAllBehavior() {
  var check = document.querySelector("#deselectAllCheckbox");

  check.addEventListener('change', (event) => {
    var checks = document.querySelectorAll("#userFilters ul li input");
    for (var i = 0; i < checks.length; i++) {
      if (checks[i].id != "deselectAllCheckbox") {
        checks[i].checked = event.target.checked;
        var changeEvent = new Event("change");
        checks[i].dispatchEvent(changeEvent);
      }
    }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  
  addUnassignedBehavior();  
  addDeselectAllBehavior();
  chrome.tabs.query({active: true}, function(tabs) {
    var tab = tabs[0];

    chrome.tabs.executeScript(tab.id, {file: "inject.js"}, columnsCallback);

    chrome.tabs.executeScript(tab.id, {file: "inject_users.js"}, usersCallback);

    chrome.tabs.executeScript(tab.id, {file: "inject_users_avatar.js"}, userAvatarsCallback);

    chrome.tabs.executeScript(tab.id, {code: createHideAddColumnFunction()});
  });

}, false);



