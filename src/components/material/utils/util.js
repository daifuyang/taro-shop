export var getPrevPath = function getPrevPath(item) {
  var prevPath = item === null || item === void 0 ? void 0 : item.src;
  if (prevPath) {
    prevPath = "" + item._BASE_URL + item.src;
  }
  return prevPath;
};