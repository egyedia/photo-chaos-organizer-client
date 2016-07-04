function AppData() {
  this.favorites = null;
  this.favoritesMap = null;
  this.pathData = null;
  this.pathDataSelectedIndex = null;
  this.users = null;
  this.userId = null;
  this.userName = null;
  this.taskTemplates = null;
  this.tasks = null;
  this.task = null;
  this.appModeStack = [];
  this.controller = null;
  this.useExternalVideoPlayer = false;
  this.enableFolderRename = false;
  this.frontendSettings = null;
  Object.preventExtensions(this);
}