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
      var artistNode = event.target.parentNode.parentNode; // button > h3 > div with artist_uid
          artistuid  = artistNode.id
      RCApp.artists.some(function(artist, index, array) {
        if ("artist_" + artist.uid === artistuid) { // compare with div id to find artist to remove
          RCApp.artists.splice(index, 1);
          return true;
        }
      })
      RCApp.renderArtists();
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
  buttons: {
    delete: (function(classes) {
      var button = document.createElement("button");
      button.className = classes;
      return button;
    })("delete btn btn-danger glyphicon glyphicon-ok")
  },
  artists: [],
  albums:  []
};
