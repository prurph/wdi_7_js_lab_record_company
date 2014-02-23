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
    RCApp.renderLists("artists");
    RCApp.renderLists("albums");
  },
  createAlbum: function(event) {
    var userAlbum     = document.getElementById("newalbum-name"),
        userYear      = document.getElementById("newalbum-year"),
        artistuid     = parseInt(document.getElementById("newalbum-artist").value),
        newAlbum;

    event.preventDefault();

    newAlbum = new RCApp.album(userAlbum.value, userYear.value, artistuid);
    RCApp.albums.push(newAlbum);

    // Link the artist and album
    RCApp.updateCollection("albums", newAlbum.uid, "artists", artistuid);
    RCApp.updateCollection("artists", artistuid, "albums", newAlbum.uid);

    userAlbum.value    = "";
    userYear.value     = "";
    artistuid.value    = "";
    RCApp.renderLists("artists");
    RCApp.renderLists("albums");
  },
  toggleShow: function(name) {
    var targetedDesc = event.target.nextSibling;

    if (event.target.classList.contains("artist-header") ||
        event.target.classList.contains("album-header")) {
      if (targetedDesc.classList.contains("hideme")) {
        targetedDesc.classList.remove("hideme");
      } else {
        targetedDesc.classList.add("hideme");
      }
    }
  },
  deleteItem: function(event) {
    if (event.target.classList.contains("delete")) {
      var targetNode = event.target.parentNode.parentNode, // button > h3 > div with thing_uid
          targetHTMLId   = targetNode.id, // artist_# or album_#
          targetType,
          targetuid;

      targetHTMLId = targetHTMLId.split("_")
      targetType = targetHTMLId[0] + "s"
      targetuid  = parseInt(targetHTMLId[1])

      RCApp[targetType].some(function(obj, index, array) {
        if (obj.uid === targetuid) {
          RCApp[targetType].splice(index, 1);
          return true;
        }
      });
      RCApp.renderLists("artists");
      RCApp.renderLists("albums");
    }
  },
  htmlEls: { // buttons and dropdown
    deleteBtn: (function(classes) {
      var button = document.createElement("button");
      button.className = classes;
      return button;
    })("delete float-right btn btn-danger glyphicon glyphicon-remove"),

    plusBtn: (function(classes) {
      var button = document.createElement("button");
      button.className = classes;
      return button;
    })("plus btn btn-success glyphicon glyphicon-plus"),

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
      dropdown.className = "dropdown float-right form-control";
      if (numOptions === 0) {
        dropdown.disabled = "disabled" // disable if no options (fresh page)
      }
      return dropdown;
    }
  },
  artists: [],
  albums:  []
};

// If user adds an artist to an album (or vice versa), make sure that album gets
// added to the artist as well
RCApp.updateCollection = function(parentType, parentId, addType, addId) {
  var parentItem,
      addItem;

  parentItem  = RCApp.findById(parentType, parentId);
  addItem     = RCApp.findById(addType, addId);

  parentItem.collection.push(addItem.uid);
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
    listNode.appendChild(itemNode);
  });
}
// Render a single "card" (artist or album): renderSelf() for each just calls this)
// type is "albums" or "artists"
RCApp.renderCard = function(type, headerNode, detailNode, thisObj) {
  var cardNode = document.createElement("div"),
      idType;

  idType = (type === "albums") ? "album_" : "artist_";

  cardNode.setAttribute("id", idType + thisObj.uid);
  cardNode.classList.add("card");
  cardNode.appendChild(headerNode);

  detailNode.appendChild(RCApp.renderCollection(type, thisObj.uid))
  cardNode.appendChild(detailNode);

  cardNode.addEventListener("click", function(event) {
    if (event.target.classList.contains("plus")) {
      var clickedId = parseInt(event.target.previousElementSibling.value),
      notInCollection;

      notInCollection = thisObj.collection.every(function(collobjuid, index, array){
        return (collobjuid != clickedId);
      });

      if (notInCollection) {
        RCApp.updateCollection(type, thisObj.uid, thisObj.collectionType, clickedId);
        RCApp.updateCollection(thisObj.collectionType, clickedId, type, thisObj.uid);
        RCApp.renderLists("albums");
        RCApp.renderLists("artists");
      }
    }
  }, false);
  return cardNode;
}
// Renders the sublist of albums under an artist or vice versa
// itemType is that of the thing that owns the collection (not what it is collection of)
RCApp.renderCollection = function(itemType, itemId) {
  var item = RCApp.findById(itemType, itemId),
      itemNode  = document.createElement("ul"),
      selectli  = document.createElement("li"), // houses the dropdown to attach artist/album
      selectForm,
      collectionType;

  collectionType = item.collectionType;
  itemNode.classList.add("inner-list");

  item.collection.forEach(function (objuid, index, array) {
    var collectionli = document.createElement("li"),
        obj = RCApp.findById(collectionType, objuid);

    if (typeof obj === "undefined") {
      // if object isn't found it was deleted, so remove from the collection
      array.splice(index, 1)
    } else {
      collectionli.innerHTML = obj.name || obj.title + " (" + obj.year + ")"
      itemNode.appendChild(collectionli);
    }
  });

  // Get the right dropdown (assign artists to albums, vice versa)
  selectForm = RCApp.htmlEls.selDropdown(collectionType);
  selectli.innerHTML = "Add association";
  selectli.appendChild(selectForm);
  selectli.appendChild(RCApp.htmlEls.plusBtn.cloneNode());

  itemNode.appendChild(selectli);
  return itemNode;
};
