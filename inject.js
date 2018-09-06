var columnTitleElements = document.getElementsByClassName("BoardColumnHeaderTitle");
var res = "";
var separator = "###";

for (var i = 0; i < columnTitleElements.length; i++) {
  res += columnTitleElements[i].textContent;
  if (i < columnTitleElements.length - 1) {
    res += separator;
  }
}

res;
