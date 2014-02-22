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
        userYear      = document.getElementById("newalbum-year"),
        artistuid     = document.getElementById("newalbum-artist"),
        newAlbum;

    newAlbum = new RCApp.album(userAlbum.value, userYear.value,
                               parseInt(artistuid.value));
    RCApp.albums.push(newAlbum);

    // Link the artist and album
    RCApp.updateCollection("albums", newAlbum.uid, "artists",
                           parseInt(artistuid.value));
    RCApp.updateCollection("artists", parseInt(artistuid.value), "albums",
                           newAlbum.uid);

    userAlbum.value    = "";
    userYear.value     = "";
    artistuid.value = "";
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
  toggleAlbumShow: function(event) {
    if (event.target.className === "album-header") {
      var albumDesc = event.target.nextSibling;
      if (albumDesc.classList.contains("hidden")) {
        albumDesc.classList.remove("hidden");
      } else {
        albumDesc.classList.add("hidden");
      }
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
    })("delete btn btn-danger glyphicon glyphicon-remove"),

    plusBtn: (function(classes) {
      var button = document.createElement("button");
      button.className = classes;
      return button;
    })("plus btn btn-danger glyphicon glyphicon-plus"),

    selDropdown: function(showType) { // "artists" or "albums"
      var dropdown      = document.createElement("select"),
          optionList    = RCApp[showType],
          numOptions    = optionList.length;

      for(var i = 0; i < numOptions; i++) {
        newOption = document.createElement("option");
        newOption.innerHTML = optionList[i].name || optionList[i].title;
        newOption.value     = optionList[i].uid;
        dropdown.appendChild(newOption);
      }
      dropdown.className = "dropdown form-control";
      return dropdown;
    }
  },
  artists: [],
  albums:  []
};

RCApp.updateCollection = function(parentType, parentId, addType, addId) {
  var parentItem,
      addItem;

  parentItem  = RCApp.findById(parentType, parentId);
  addItem     = RCApp.findById(addType, addId);

  parentItem.collection.push(addItem);
};

RCApp.findById = function(itemType, itemId) {
  var collection = RCApp[itemType], // artists or albums
      foundItem;
  collection.some(function(obj, index, array) {
    if (obj.uid === itemId) {
      foundItem = obj;
      return true;
    }
  });
  return foundItem;
};

// Renders the sublist of albums under an artist or vice versa
RCApp.renderCollection = function(itemType, itemId) {
  var item = RCApp.findById(itemType, itemId);

  var itemNode  = document.createElement("ul"),
      selectli  = document.createElement("li"), // houses the dropdown to attach artist/album
      selectForm;

  itemNode.classList.add("inner-list");

  item.collection.forEach(function (obj, index, array) {
    var collectionli = document.createElement("li");
    collectionli.innerHTML = obj.title || obj.name;
    itemNode.appendChild(collectionli);
  });

  // Get the right dropdown (assign artists to albums, vice versa)
  selectForm = RCApp.htmlEls.selDropdown(itemType);

  selectli.appendChild(selectForm);
  selectli.appendChild(RCApp.htmlEls.plusBtn.cloneNode());

  itemNode.appendChild(selectli);
  return itemNode;
};

// RCApp.htmlEls.selDropdown = function(showType) { // "artists" or "albums"
//   var dropdown      = document.createElement("select"),
//       optionList    = RCApp[showType],
//       numOptions    = optionList.length;

//   for(var i = 0; i < numOptions; i++) {
//     newOption = document.createElement("option");
//     newOption.innerHTML = optionList[i].name || optionList[i].title;
//     newOption.value     = optionList[i].uid;
//     dropdown.appendChild(newOption);
//   }
//   dropdown.className = "dropdown form-control";
//   return dropdown;
// };

// Render the macro level lists
RCApp.renderLists = function(listType) { // "artists" or "albums"
  var listNode = document.getElementById(listType + "-list"),
      itemList = RCApp[listType],
      // these are used to update the artist dropdown beneath the create album form
      albumsDiv,
      existingDropdown,
      updatedDropdown;

  if (listType === "albums") { // if we're rendering albums, update the artist dropdown
    albumsDiv         = document.getElementById("albums"),
    existingDropdown  = document.getElementById("newalbum-artist"),
    updatedDropdown   = RCApp.htmlEls.selDropdown("artists");

    updatedDropdown.setAttribute("id", "newalbum-artist");
    albumsDiv.replaceChild(updatedDropdown, existingDropdown);
  }

  listNode.innerHTML = "";

  itemList.forEach(function(obj, index, array) {
    var itemNode = obj.renderSelf();
    itemNode.insertAdjacentHTML("beforebegin", "<li>");
    itemNode.insertAdjacentHTML("afterend", "</li>");
    itemList.appendChild(itemNode);
  });
}

