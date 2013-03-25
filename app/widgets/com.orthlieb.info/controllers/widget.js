var args = _.defaults(arguments[0], { });

// Property: systemButton
Object.defineProperty($, "systemButton", {
    get: function() { 
        return $._systemButton; 
    },
    set: function(systemButton) { 
        $._systemButton = systemButton;
        $.button.systemButton = $.systemButton;
    }
});

// Property: icon
Object.defineProperty($, "icon", {
    get: function() { 
        return $._icon; 
    },
    set: function(icon) { 
        $._icon = icon;
        $.button.image = $.icon;
    }
});

// Property: text (creation time only)
Object.defineProperty($, "text", {
    get: function() { 
        return $._text; 
    },
    set: function(text) { 
        $._text = text;
    }
});

// Apply any supplied properties to the object.
_.extend($, args);

// Method: init
exports.init = function(parentWindow) {
    if (!parentWindow) {
        Ti.API.error("InfoButton: missing required parameter \'parent\'.");
    }

    if (OS_IOS) {   
        if (!$.systemButton && !$.icon)
            $.systemButton = Ti.UI.iPhone.SystemButton.INFO_LIGHT;
         
        // Info button: we remove it from it's parent and add to the right nav.
        parentWindow.remove($.button);
        parentWindow.rightNavButton = $.button;
        
        // Register events
        $.button.addEventListener('click', function (e) {
            $.trigger('click', e);
        });
    } else if (OS_ANDROID) {
        // On Android, this is an info menu item.
        $.button.visible = false;
        var temp = parentWindow.activity.onCreateOptionsMenu;
        parentWindow.activity.onCreateOptionsMenu = function (e) {
            var menu = e.menu;
            var menuItem = menu.add({
                title : $.text,
                itemId : 7144,
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
            });
            if ($.icon)
                menuItem.setIcon($.icon);
              
            menuItem.addEventListener('click', function (e) {
                $.trigger('click', e);
            });
            if (temp) 
                temp(e);    // Chain the parent, if it exists.
        }
    }
};
