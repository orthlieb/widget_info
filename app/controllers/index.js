if (OS_ANDROID) {
    // Shows how the info button chains the existing create options menu.
    $.index.activity.onCreateOptionsMenu = function (e) {
        var menu = e.menu;
        var menuItem = menu.add({
            title : "Ding",
            itemId : 0
        });
        menuItem.addEventListener('click', function (e) {
            alert("Ding Ding Ding");
        });
    };
}

$.info.init({ parent: $.index, systemButton: Ti.UI.iPhone.SystemButton.CAMERA, icon: "star.png" });
$.info.on('click', function (e) { alert("Info button/menu clicked!"); });

if (OS_IOS)
    $.win.open();
else
    $.index.open();
