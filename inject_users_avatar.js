var elements = document.querySelectorAll(".Avatar.Avatar--small.DomainUserAvatar-avatar");

var res = "";
var separator = "###";

var resSet = new Set();
for (var i = 0; i < elements.length; i++) {
  var el = elements[i];
  if (el.style.backgroundImage.length > 0) {
    resSet.add(el.style.backgroundImage);
  }
}

resSet.forEach(function(s) {
  res += s;
  res += separator;
});

res.substr(0, res.length - 3);
