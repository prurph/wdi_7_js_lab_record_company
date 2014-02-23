RCApp.artist = function(name, desc) {
  if (name.length === 0) {
    throw new Error("Artist must have name");
  }
  this.name           = name;
  this.desc           = desc || "No Description";
  this.uid            = RCApp.uid("artist");
  this.collection     = []; // albumuids
  this.collectionType = "albums";
  this.header         = RCApp.makeHeader(this, "artist");
  this.detail         = RCApp.makeDetail(this);
};

RCApp.artist.prototype = {
  renderSelf: function() {
    var headerNode  = this.header,
        detailNode  = this.detail,
        thisArtist  = this;
    return RCApp.renderCard("artists", headerNode, detailNode, thisArtist);
  },
  inMyCollection: function(clickedId) {
    this.collection.every(function(objuid, index, array) {
      return (objuid !== clickedId);
    }
  )}
}
