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
        detailNode = this.htmlElements.detail.bind(this)(),
        myAlbums;

    artistNode.setAttribute("id", "artist_" + this.uid);
    // artistNode.innerHTML = "<h3 class='artist-header'>" + this.name + "</h3>";
    artistNode.appendChild(this.htmlElements.header.bind(this)());

    // detailNode.innerHTML = "<h4>" + this.desc + "</h4>";
    // detailNode.className = "desc";

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
  },
  htmlElements: {
    header: function() {
      var h3 = document.createElement("h3"),
          button = RCApp.buttons.delete;

      button.setAttribute("id", "delartist_" + this.uid);
      h3.className = "artist-header"
      h3.appendChild(button);
      h3.innerHTML += this.name
      return h3;
    },
    detail: function() {
      var detailNode = document.createElement("div")
      detailNode.className = "desc";
      detailNode.innerHTML = "<h4>" + this.desc + "</h4>";
      return detailNode;
    }
  }
}
