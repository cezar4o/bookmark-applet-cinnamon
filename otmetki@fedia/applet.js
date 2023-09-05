const Applet = imports.ui.applet;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const PopupMenu = imports.ui.popupMenu;

class BookmarkApplet extends Applet.TextIconApplet {
    constructor(metadata, orientation, panelHeight, instanceId) {
        super(orientation, panelHeight, instanceId);
        this.set_applet_icon_name("starred");
        this.set_applet_label("Bookmarks");
        this.set_applet_tooltip(_("Click here to see your bookmarks"));

        this.menuManager = new PopupMenu.PopupMenuManager(this);
        this.menu = new Applet.AppletPopupMenu(this, orientation);
        this.menuManager.addMenu(this.menu);
    }

    on_applet_clicked(event) {
        this.menu.removeAll();
        this._loadBookmarks();
        this.menu.toggle();
    }

    _loadBookmarks() {
        let filePath = GLib.get_home_dir() + "/bookmarks.txt";
        let categories = {};

        if (GLib.file_test(filePath, GLib.FileTest.EXISTS)) {
            let fileContent = GLib.file_get_contents(filePath)[1].toString();
            let lines = fileContent.split("\n");

            for (let line of lines) {
                let parts = line.split(",");
                if (parts.length === 3) {
                    let category = parts[0].trim();
                    let shortName = parts[1].trim();
                    let url = parts[2].trim();

                    if (!categories[category]) {
                        categories[category] = [];
                    }
                    categories[category].push({ name: shortName, url: url });
                }
            }

            for (let category in categories) {
                let subMenu = new PopupMenu.PopupSubMenuMenuItem(category);
                this.menu.addMenuItem(subMenu);

                for (let bookmark of categories[category]) {
                    let item = new PopupMenu.PopupMenuItem(bookmark.name);
                    item.connect('activate', () => {
                        GLib.spawn_command_line_async(`xdg-open ${bookmark.url}`);
                    });
                    subMenu.menu.addMenuItem(item);
                }
            }
        } else {
            let item = new PopupMenu.PopupMenuItem("No bookmarks found.");
            this.menu.addMenuItem(item);
        }
    }
}

function main(metadata, orientation, panelHeight, instanceId) {
    return new BookmarkApplet(metadata, orientation, panelHeight, instanceId);
}

