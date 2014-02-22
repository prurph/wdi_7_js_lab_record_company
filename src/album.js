// RCApp is defined in RCApp.js
RCApp.album = function(title, year, artistuid) {
  if (title.length === 0) {
    throw new Error("Album must have title");
  }
  this.title       = title;
  this.year        = year;
  this.uid         = RCApp.uid("album");
  this.collection  = [];
  this.collectionType = "artists";
};

RCApp.album.prototype = {
  renderSelf: function() {
    var headerNode = this.htmlElements.header.bind(this)(),
        detailNode = this.htmlElements.detail.bind(this)(),
        thisAlbum  = this;
    return RCApp.renderCard("albums", headerNode, detailNode, thisAlbum);
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
