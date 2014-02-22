// RCApp is defined in RCApp.js
RCApp.artist = function(name, desc) {
  if (name.length === 0) {
    throw new Error("Artist must have name");
  }
  this.name       = name;
  this.desc       = desc || "No Description";
  this.uid        = RCApp.uid("artist");
  this.albums     = []; // String list of albums
  this.collection = []; // albumuids
};

RCApp.artist.prototype = {
  renderSelf: function() {
    var artistNode = document.createElement("div"),
        detailNode = this.htmlElements.detail.bind(this)(),
        thisArtist = this,
        myAlbums;

    artistNode.setAttribute("id", "artist_" + this.uid);
    artistNode.appendChild(this.htmlElements.header.bind(this)());

    // renderAlbums() and tack onto detailNode
    myAlbums = this.renderAlbums();
    detailNode.appendChild(myAlbums);

    artistNode.appendChild(detailNode);
    artistNode.addEventListener("click", function(event) {
      // if clicked on plus user is trying to add an album
      if (event.target.classList.contains("plus")) {
        var whichAlbum  = event.target.previousElementSibling.value, // string name of album
            whichArtist = event.currentTarget.id,
            notAdded;

        notAdded = thisArtist.albums.every(function(album, index, array) {
          return (album !== whichAlbum);
        });

        if (notAdded) {
          thisArtist.albums.push(whichAlbum);
          RCApp.renderAlbums();
          RCApp.renderArtists();
        }
      }
    }, false);

    return artistNode;
  },
  renderAlbums: function() {
    var albumNode = document.createElement("ul"),
        albumSel  = document.createElement("li"); // takes the albumSel form


    this.albums.forEach(function (album, index, array) {
      var albumli = document.createElement("li");
      albumli.innerHTML = album; // these are just strings here
      albumNode.appendChild(albumli);
    });

    // add an album <select> and a plus button to add albums
    albumSel.appendChild(RCApp.htmlEls.albumSel());
    albumSel.appendChild(RCApp.htmlEls.plusBtn.cloneNode());

    albumNode.appendChild(albumSel);

    return albumNode;
  },
  htmlElements: {
    header: function() {
      var h3 = document.createElement("h3"),
          button = RCApp.htmlEls.deleteBtn;

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
