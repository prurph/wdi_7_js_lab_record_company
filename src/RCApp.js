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
    this.artists.push(newArtist);

    userArtist.value = "";
    userDesc.value   = "";
    this.renderArtists();
  },
  toggleArtistShow: function(event) {
    var artistDesc;
    if (event.target.className === "artist-header") {
      var artistDesc = event.target.nextSibling;
      // parentNode.getElementsByClassName("desc");
      if (artistDesc.classList.contains("hidden")) {
        artistDesc.classList.remove("hidden");
      } else {
        artistDesc.classList.add("hidden");
      };
    }
    // var clickedArtistNode = event.currentTarget.
    // var artistClickedId = parseInt(this.id.slice(7)), //convert artist_0 to 0
    //     artistNode      = document.getElementById("artistClickedId"),
    //     artistDesc;
    // if event.target.nodeName;

    // artistDesc = artistNode;
  },
  renderArtists: function() {
    var artistsList = document.getElementById("artists-list");
    artistsList.innerHTML = "";

    this.artists.forEach(function(artist, index, array) {
      var artistNode = artist.renderSelf();
      artistNode.insertAdjacentHTML("beforebegin", "<li>");
      artistNode.insertAdjacentHTML("afterend", "</li>");
      artistsList.appendChild(artist.renderSelf());
    });
  },
  buttons: {
    delete: (function(glyphicon, classes) {
      var button = document.createElement("button");
      button.className = classes;
      button.innerHTML = "<span class='glyphicon " + glyphicon + "'></span>";
      return button;
    })("glyphicon-ok", "delete btn btn-danger")
  },
  artists: [],
  albums:  []
};
