window.onload = function() {
  var newartistButton = document.getElementById("newartist");
  var newartistDesc   = document.getElementById("newartist-desc");
  var artistList      = document.getElementById("artists-list");

  newartistButton.addEventListener("click", RCApp.createArtist.bind(RCApp), false);
  artistList.addEventListener("click", RCApp.toggleArtistShow.bind(artistList), false);
}
