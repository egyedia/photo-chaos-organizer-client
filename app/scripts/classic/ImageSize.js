function ImageSize(width, height) {
  this.width = width;
  this.height = height;
  this.orientation = 0;
  this.getRatio = function() {
    return this.width / this.height;
  };
  Object.preventExtensions(this);
}