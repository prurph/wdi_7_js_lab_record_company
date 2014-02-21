// RCApp is defined in RCApp.js
RCApp.artist = function(name, desc) {
  if (name.length === 0) {
    throw new Error("Artist must have name");
  }
  this.name   = name;
  this.desc   = desc || "No Description";
  this.uid    = RCApp.uid("artist");
  this.albums = []; // String list of albums
};

RCApp.artist.prototype = {
  renderSelf: function() {
    var artistNode = document.createElement("div"),
        detailNode = document.createElement("div"),
        myAlbums;

    artistNode.setAttribute("data-artistid", this.uid)

    artistNode.innerHTML = "<h3>" + this.name + "</h3>"
    detailNode.innerHTML = "<h4>" + this.desc + "</h4>"

    // renderAlbums() if there are any and tack onto the detailNode
    if (this.albums.length > 0) {
      myAlbums = this.renderAlbums();
      detailNode.appendChild(myAlbums);
    }
    artistNode.appendChild(detailNode);

    return artistNode;
  },
  renderAlbums: function() {
    var albumNode = document.createElement("ul");

    this.albums.forEach(function (album, index, array) {
      var albumli = document.createElement("li");
      albumli.innerHTML = album;
      albumNode.appendChild(albumli);
    });

    return albumNode;
  }
}
