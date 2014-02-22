window.onload = function() {
  var newartistButton = document.getElementById("newartist");
  var artistList      = document.getElementById("artists-list");
  var newalbumButton  = document.getElementById("newalbum");
  var albumList       = document.getElementById("albums-list");

  newartistButton.addEventListener("click", RCApp.createArtist, false);
  newalbumButton.addEventListener("click", RCApp.createAlbum, false);

  artistList.addEventListener("click", RCApp.toggleShow, false);
  albumList.addEventListener("click", RCApp.toggleShow, false);

  artistList.addEventListener("click", RCApp.deleteItem, false);
  albumList.addEventListener("click", RCApp.deleteItem, false);

  RCApp.renderLists("albums");
}
