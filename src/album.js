RCApp.album = function(title, year, artistuid) {
  if (title.length === 0) {
    throw new Error("Album must have title");
  }
  this.title          = title;
  this.year           = year;
  this.uid            = RCApp.uid("album");
  this.collection     = []; // artistuids
  this.collectionType = "artists";
  this.header         = RCApp.makeHeader(this, "album");
  this.detail         = RCApp.makeDetail(this);
};

RCApp.album.prototype = {
  renderSelf: function() {
    var headerNode = this.header,
        detailNode = this.detail,
        thisAlbum  = this;
    return RCApp.renderCard("albums", headerNode, detailNode, thisAlbum);
  },
  inMyCollection: function(clickedId) {
    var inCollection;
    inCollection = this.collection.every(function(objuid, index, array) {
      return (objuid !== clickedId);
    });
    return inCollection;
  }
}
