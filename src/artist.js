// RCApp is defined in RCApp.js
RCApp.artist = function(name, desc) {
  if (name.length === 0) {
    throw new Error("Artist must have name");
  }
  this.name        = name;
  this.desc        = desc || "No Description";
  this.uid         = RCApp.uid("artist");
  this.collection  = []; // albumuids
  this.collectionType = "albums";
  this.header      = RCApp.makeHeader(this, "artist");
  this.detail      = RCApp.makeDetail(this);
};

RCApp.artist.prototype = {
  renderSelf: function() {
    var headerNode  = this.header, //this.htmlElements.header.bind(this)(),
        detailNode  = this.detail, //this.htmlElements.detail.bind(this)(),
        thisArtist  = this;
    return RCApp.renderCard("artists", headerNode, detailNode, thisArtist);
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
