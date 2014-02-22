// RCApp is defined in RCApp.js
RCApp.album = function(title, year, artistuid) {
  if (title.length === 0) {
    throw new Error("Album must have title");
  }
  this.title       = title;
  this.year        = year;
  this.uid         = RCApp.uid("album");
  //this.artists    = [artist]; // String list of artists
  this.collection  = [];
  this.collectType = "artists";
};

RCApp.album.prototype = {
  renderSelf: function() {
    var albumNode  = document.createElement("div"),
        headerNode = this.htmlElements.header.bind(this)(), // h3 with title
        detailNode = this.htmlElements.detail.bind(this)(), // h4 with description
        thisAlbum = this;

    albumNode.setAttribute("id", "album_" + this.uid);
    albumNode.classList.add("album-card");
    albumNode.appendChild(headerNode);

    detailNode.appendChild(RCApp.renderCollection("albums", this.uid));
    albumNode.appendChild(detailNode);

    albumNode.addEventListener("click", function(event) {
      // if clicked on plus user is trying to add an album
      if (event.target.classList.contains("plus")) {
        var clickedArtistId = parseInt(event.target.previousElementSibling.value), // uid of artist dropdown
            // whichArtistId   = event.currentTarget.id, // uid of the artist to add to
            notInCollection;

        // every returns true if there is not a matching album in collection already
        notInCollection = thisAlbum.collection.every(function(artistuid, index, array) {
          return (artistuid !== clickedArtistId);
        });

        if (notInCollection) {
          RCApp.updateCollection("albums", thisAlbum.uid, "artists", clickedArtistId);
          RCApp.updateCollection("artists", clickedArtistId, "albums", thisAlbum.uid)
          RCApp.renderLists("albums");
          RCApp.renderLists("artists");
        }
      }
    }, false);
    return albumNode;
  },
  // renderSelf: function() {
  //   var albumNode  = document.createElement("div"),
  //       detailNode = this.htmlElements.detail.bind(this)(),
  //       thisAlbum  = this,
  //       myArtists;

  //   albumNode.setAttribute("id", "album_" + this.uid);
  //   albumNode.appendChild(this.htmlElements.header.bind(this)());

  //   // renderArtists() and tack onto detailNode
  //   myArtists = this.renderArtists();
  //   detailNode.appendChild(myArtists);

  //   albumNode.appendChild(detailNode);
  //   albumNode.addEventListener("click", function(event) {
  //     if (event.target.classList.contains("plus")) {
  //       var whichArtist  = event.target.previousElementSibling.value,
  //           whichAlbum = event.currentTarget.id,
  //           notAdded;

  //       notAdded = thisAlbum.artists.every(function(artist, index, array) {
  //         return (artist !== whichArtist)
  //       });

  //       if (notAdded) {
  //         thisAlbum.artists.push(whichArtist);
  //         RCApp.renderAlbums();
  //         RCApp.renderArtists();
  //       }
  //     }
  //   });
  //   return albumNode;
  // },
  renderArtists: function() {
    var artistNode = document.createElement("ul"),
        artistSel  = document.createElement("li"); // takes the artistSel form

    this.artists.forEach(function (artist, index, array) {
        var artistli = document.createElement("li");
        artistli.innerHTML = artist; // remember these are just strings
        artistNode.appendChild(artistli);
    });

    // add an artist <select> and a plus button to add artists
    artistSel.appendChild(RCApp.htmlEls.artistSel());
    artistSel.appendChild(RCApp.htmlEls.plusBtn.cloneNode());

    artistNode.appendChild(artistSel);

    return artistNode;
  },
  htmlElements: {
    header: function() {
      var h3 = document.createElement("h3"),
          button = RCApp.htmlEls.deleteBtn;

      button.setAttribute("id", "delalbum_" + this.uid);
      h3.className = "album-header"
      h3.appendChild(button);
      h3.innerHTML += this.title
      return h3;
    },
    detail: function() {
      var detailNode = document.createElement("div");
      detailNode.className = "desc";
      detailNode.innerHTML = "<h4>" + this.year + "</h4>";
      return detailNode;
    }
  }
}
