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
  artists: [],
  albums:  []
};
