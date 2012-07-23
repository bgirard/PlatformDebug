const widgets = require("widget");
const tabs = require("tabs");

var widget = widgets.Widget({
  id: "mozilla-link",
  label: "Mozilla website",
  contentURL: "http://www.mozilla.org/favicon.ico",
  onClick: function() {
    tabs.open("http://www.mozilla.org/");
  }
});

console.log("The add-on is running.");

var menuitem = require("menuitems").Menuitem({
  id: "clickme",
  menuid: "menu_ToolsPopup",
  label: "Click Me!",
  onCommand: function() {
    console.log("clicked");
  },
  //insertbefore: "menu_pageInfo"
});

dump("init\n");
