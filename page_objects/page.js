let fs = require('fs');
let replaceExt = require('replace-ext');
export default class Page {
  open (path) {
    browser.url(path);
    browser.windowHandleMaximize();
  }

  close(){
  }
}