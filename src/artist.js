// RCApp is defined in RCApp.js
RCApp.artist = function(name, desc) {
  if (name.length === 0) {
    throw new Error("Artist must have name");
  }
  this.name        = name;
  this.desc        = desc || "No Description";
  this.uid         = RCApp.uid("artist");
  this.albums      = []; // String list of albums
  this.collection  = []; // albumuids
  this.collectType = "albums";
};

RCApp.artist.prototype = {
  renderSelf: function() {
    var artistNode = document.createElement("div"),
        headerNode = this.htmlElements.header.bind(this)(), // h3 with name
        detailNode = this.htmlElements.detail.bind(this)(), // h4 with description
        thisArtist = this;

    artistNode.setAttribute("id", "artist_" + this.uid);
    artistNode.classList.add("artist-card");
    artistNode.appendChild(headerNode);

    detailNode.appendChild(RCApp.renderCollection("artists", this.uid));
    artistNode.appendChild(detailNode);

    artistNode.addEventListener("click", function(event) {
      // if clicked on plus user is trying to add an album
      if (event.target.classList.contains("plus")) {
        var clickedAlbumId = parseInt(event.target.previousElementSibling.value), // uid of album dropdown
            // whichArtistId   = event.currentTarget.id, // uid of the artist to add to
            notInCollection;

        // every returns true if there is not a matching album in collection already
        notInCollection = thisArtist.collection.every(function(albumuid, index, array) {
          return !(albumuid === clickedAlbumId);
        });

        if (notInCollection) {
          RCApp.updateCollection("artists", thisArtist.uid, "albums", clickedAlbumId);
          RCApp.updateCollection("albums", clickedAlbumId, "artists", thisArtist.uid)
          RCApp.renderLists("albums");
          RCApp.renderLists("artists");
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
