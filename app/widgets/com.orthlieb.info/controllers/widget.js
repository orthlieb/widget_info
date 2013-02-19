exports.init = function(args) {
    if (!args.parent) {
        Ti.API.error("InfoButton: missing required parameter \'parent\'.");
    }

    if (OS_IOS) {
        // Use the supplied icon if there is one.
        if (args.systemButton) 
            $.button.systemButton = args.systemButton;
        else if (args.icon) 
            $.button.image = args.icon;
        else
            $.button.systemButton = Ti.UI.iPhone.SystemButton.INFO_LIGHT;         
    
        $.button.on('click', function (e) {
            $.trigger('click', e);
        });
    
        // Info button: we remove it from it's parent and add to the right nav.
        args.parent.remove($.button);
        args.parent.rightNavButton = $.button;
    } else if (OS_ANDROID) {
        // On Android, this is an info menu item.
        $.button.visible = false;
        var temp = args.parent.activity.onCreateOptionsMenu;
        args.parent.activity.onCreateOptionsMenu = function (e) {
            var menu = e.menu;
            var menuItem = menu.add({
                title : "Info",
                itemId : 7144
            });
            menuItem.setIcon(args.icon ? args.icon : WPATH('Info.png'));
            menuItem.addEventListener('click', function (e) {
                $.trigger('click', e);
            });
            if (temp) 
                temp(e);    // Chain the parent, if it exists.
        }
    }
};
