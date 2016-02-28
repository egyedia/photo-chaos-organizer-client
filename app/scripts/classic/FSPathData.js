function FSPathData() {
  this.entryList = null;
  this.entryMap = null;
  this.requestedLocation = null
  this.locationIsRoot = false;
  this.parentPath = null;
  this.parentList = null;
  Object.preventExtensions(this);
}