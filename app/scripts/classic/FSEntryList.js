function FSEntryList() {
  var arr = [];
  arr.push.apply(arr, arguments);
  arr.__proto__ = FSEntryList.prototype;
  return arr;
}

FSEntryList.prototype = new Array;
