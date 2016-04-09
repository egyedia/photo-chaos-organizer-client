function AppData() {
  this.favorites = null;
  this.favoritesMap = null;
  this.pathData = null;
  this.users = null;
  this.userId = null;
  this.userName = null;
  this.taskTemplates = null;
  this.tasks = null;
  this.task = null;
  this.appModeStack = [];
  this.controller = null;
  Object.preventExtensions(this);
}