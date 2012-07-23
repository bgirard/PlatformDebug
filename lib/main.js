const widgets = require("widget");
const tabs = require("tabs");

var debugMenus = [
  {
    type: "menu",
    label: "Graphics",
    items: [
      {
        type: "pref_wrapper",
        label: "Force Layers Acceleration",
        pref: "layers.acceleration.force-enabled"
      },
      {
        type: "pref_wrapper",
        label: "FPS Counter",
        pref: "layers.acceleration.draw-fps"
      },
      {
        type: "pref_wrapper",
        label: "ICC Color Management v4",
        pref: "gfx.color_management.enablev4"
      },
      {
        type: "pref_wrapper",
        label: "Use OpenGL Driver Workarounds",
        pref: "gfx.work-around-driver-bugs"
      },
      {
        type: "menu",
        label: "Off-main-thread-compositing",
        items: [
          {
            type: "pref_wrapper",
            label: "Async video",
            pref: "layers.async-video.enabled"
          },
          {
            type: "pref_wrapper",
            force: true,
            label: "OMTC Enabled",
            pref: "layers.offmainthreadcomposition.enabled"
          },
        ],
      },
      {
        type: "menu",
        label: "Canvas",
        items: [
          {
            type: "pref_wrapper",
            label: "Use Azure",
            pref: "gfx.canvas.azure.enabled"
          },
          {
            type: "pref_wrapper",
            label: "Use Acceleration",
            pref: "gfx.content.azure.enabled"
          },
        ],
      },
    ],
  },
  {
    type: "menu",
    label: "Layout",
    items: [
      {
        type: "pref_wrapper",
        label: "Paint Flashing",
        pref: "nglayout.debug.paint_flashing"
      },
    ],
  }
];

function convert_label_to_id(str) {
  return str.toLowerCase();
}

function processItem(menu, menuParent) {
  dump("Adding: " + menu.label + "\n");
  var menuitem = null;
  menu.onCommand = menu.onCommand || function () {};

  function update_status() {
    menuitem.checked = require("preferences-service").get(menu.pref);
  }

  if (menu.type === "pref_wrapper") {
    if (!menu.force && !require("preferences-service").has(menu.pref)) {
      dump("Skipping since the preference does not exist in the profile\n");
      return;
    }
    menu.onCommand = function(event) {
      require("preferences-service").set(menu.pref, !require("preferences-service").get(menu.pref));
      menuitem.checked = require("preferences-service").get(menu.pref);
    };
    require("simple-prefs").on(menu.pref, function(){dump("change\n\n");});
  }

  menuitem = require("menuitems").Menuitem({
    id: convert_label_to_id(menu.label),
    menuid: [menuParent + "_popup"],
    label: menu.label,
    isMenu: menu.type === "menu",
    onCommand: menu.onCommand,
    insertbefore: menu.insertbefore || "amenu_pageInfo",
  });

  if (menu.type === "menu") {
    for(var i = 0; i < menu.items.length; i++) {
      processItem(menu.items[i], convert_label_to_id(menu.label));
    }
  } else if (menu.type === "pref_wrapper") {
    update_status();
  } else {
    dump("Bad menu type: " + menu.type + "\n");
  }
}

var menuitem = require("menuitems").Menuitem({
  id: "debugmenu",
  menuid: ["helpMenu"],
  label: "Debug",
  isMenu: true,
  isTopLevelMenu: true,
  onCommand: function() {
  },
  insertbefore: null,
});

for(var i = 0; i < debugMenus.length; i++) {
  processItem(debugMenus[i], "debugmenu");
}

/*
var menuitem = require("menuitems").Menuitem({
  id: "clickme",
  menuid: ["menu_ToolsPopup"],
  label: "Click Me!",
  isMenu: true,
  onCommand: function() {
    console.log("clicked");
  },
  insertbefore: "amenu_pageInfo"
});

var menuitem = require("menuitems").Menuitem({
  id: "clickme2",
  menuid: ["clickme_popup"],
  label: "Click Me 2!",
  isMenu: true,
  onCommand: function() {
    console.log("clicked");
  },
  insertbefore: "amenu_pageInfo"
});

dump("init\n");
*/
