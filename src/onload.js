window.onload = function() {
  var newartistButton = document.getElementById("newartist");
  var newartistDesc    = document.getElementById("newartist-desc");

  newartistButton.addEventListener("click", RCApp.createArtist.bind(RCApp), false);
}
