var RCApp = {
  uid: (function(){
    var uidArtist = 0;
    var uidAlbum  = 0;
    return function(type){
      return (type === "artist") ? uidArtist++ : uidAlbum++;
    };
  })(),
  createArtist: function(event) {
    var userArtist = document.getElementById("newartist-name"),
        userDesc   = document.getElementById("newartist-desc"),
        newArtist;

    event.preventDefault();

    newArtist = new RCApp.artist(userArtist.value, userDesc.value);
    RCApp.artists.push(newArtist);

    userArtist.value = "";
    userDesc.value   = "";
    RCApp.renderArtists();
    RCApp.renderAlbums();
  },
  createAlbum: function(event) {
    var userAlbum     = document.getElementById("newalbum-name"),
        albumsArtist  = document.getElementById("newalbum-artist"),
        userYear      = document.getElementById("newalbum-year"),
        newAlbum;

    event.preventDefault();

    newAlbum = new RCApp.album(userAlbum.value, albumsArtist.value, userYear.value);
    RCApp.albums.push(newAlbum);

    userAlbum.value    = "";
    albumsArtist.value = "";
    userYear.value     = "";
    RCApp.renderAlbums();
    RCApp.renderArtists();
  },
  toggleArtistShow: function(event) {
    if (event.target.className === "artist-header") {
      var artistDesc = event.target.nextSibling;
      // parentNode.getElementsByClassName("desc");
      if (artistDesc.classList.contains("hidden")) {
        artistDesc.classList.remove("hidden");
      } else {
        artistDesc.classList.add("hidden");
      };
    }
  },
  deleteArtists: function(event) {
    if (event.target.classList.contains("delete")) {
      var artistNode = event.target.parentNode.parentNode, // button > h3 > div with artist_uid
          artistuid  = artistNode.id;
      RCApp.artists.some(function(artist, index, array) {
        if ("artist_" + artist.uid === artistuid) { // compare with div id to find artist to remove
          RCApp.artists.splice(index, 1);
          return true;
        }
      })
      RCApp.renderArtists();
      RCApp.renderAlbums(); // Refactor these into one
    }
  },
  deleteAlbums: function(event) {
    if (event.target.classList.contains("delete")) {
      var albumNode = event.target.parentNode.parentNode, // button > h3 > div
          albumuid = albumNode.id;
      RCApp.albums.some(function(album, index, array) {
        if ("album_" + album.uid === albumuid) {
          RCApp.albums.splice(index, 1);
          return true;
        }
      });
      RCApp.renderArtists();
      RCApp.renderAlbums();
    }
  },
  renderArtists: function() {
    var artistsList = document.getElementById("artists-list");
    artistsList.innerHTML = "";

    RCApp.artists.forEach(function(artist, index, array) {
      var artistNode = artist.renderSelf();
      artistNode.insertAdjacentHTML("beforebegin", "<li>");
      artistNode.insertAdjacentHTML("afterend", "</li>");
      artistsList.appendChild(artist.renderSelf());
    });
  },
  renderAlbums: function() {
    var albumsList  = document.getElementById("albums-list"),
        albumsDiv   = document.getElementById("albums"),
        newAlbumSel = document.getElementById("newalbum-artist"),
        newField    = RCApp.htmlEls.artistSel();

    // Each time stuff updates, be sure to update the dropdown for new album form
    newField.setAttribute("id", "newalbum-artist");
    albumsDiv.replaceChild(newField, newAlbumSel);

    albumsList.innerHTML = "";

    RCApp.albums.forEach(function(album, index, array) {
      var albumNode = album.renderSelf();
      albumNode.insertAdjacentHTML("beforebegin", "<li>");
      albumNode.insertAdjacentHTML("afterend", "</li>");
      albumsList.appendChild(album.renderSelf());
    });
  },
  htmlEls: {
    deleteBtn: (function(classes) {
      var button = document.createElement("button");
      button.className = classes;
      return button;
    })("delete btn btn-danger glyphicon glyphicon-ok"),
    albumSel: function() {
      var dropdown  = document.createElement("select"),
          numAlbums = RCApp.albums.length;

      for(var i = 0; i < numAlbums; i++) {
        optn = document.createElement("option");
        optn.innerHTML = RCApp.albums[i].title;
        optn.value     = RCApp.albums[i].title; // keep as string for now (artist albums array is strings)
        dropdown.appendChild(optn);
      }
      dropdown.className = "album-dropdown form-control";
      return dropdown;
    },
    artistSel: function() {
      var dropdown   = document.createElement("select"),
          numArtists = RCApp.artists.length;

      for(var i = 0; i < numArtists; i++) {
        optn = document.createElement("option");
        optn.innerHTML = RCApp.artists[i].name;
        optn.value     = RCApp.artists[i].name; // keep as string for now
        dropdown.appendChild(optn);
      }
      dropdown.className = "artist-dropdown form-control";
      return dropdown;
    },
    plusBtn: (function(classes) {
      var button = document.createElement("button");
      button.className = classes;
      return button;
    })("plus btn btn-danger glyphicon glyphicon-plus"),
  },
  artists: [],
  albums:  []
};
