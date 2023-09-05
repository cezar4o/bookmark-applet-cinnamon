
**Bookmark Applet for Cinnamon**

The Bookmark Applet allows you to access your bookmarks through a drop-down menu on your Cinnamon panel. It reads bookmark data from a file and organizes them in categories.

## Features

* Displays bookmarks in categorized submenus.
* Opens URL addresses using the system's default browser.
* Supports loading bookmarks from a text file.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/cezar4o/bookmark-applet-cinnamon.git
```

2. **Change to the cloned repository directory:**

```bash
cd bookmark-applet-cinnamon
```

3. Copy or move the `otmetki@fedia` folder to the applets directory:

```bash
mv otmetki@fedia ~/.local/share/cinnamon/applets/
```

4. Then, copy or move `bookmarks.txt` to the home directory:

```bash
sudo mv bookmarks.txt /home
```

## Usage

1. Right-click on an empty space in your Cinnamon panel.
2. Click on "Applets".
3. Search for "Bookmark Applet" and click on the "+" button to add it to the panel.

## Restart Cinnamon

Click on Alt+F2 and type "r" in the window. This will restart the graphical environment and the changes will take effect.

## Customization

You can customize the behavior of the Bookmark Applet by editing the code. Here are some areas you may want to adjust:

* Bookmark file path: By default, the applet reads bookmarks from a file named "bookmarks.txt" in the user's home directory. You can change the file path by modifying the `filePath` variable in the `_loadBookmarks()` function.
* Bookmark format: The applet expects bookmarks to be stored in a comma-separated format: `category, name, URL`. If your bookmark file has a different format, you will need to adjust the parsing logic in the `_loadBookmarks()` function accordingly.
* Icons and labels: You can customize the icon, label, and tooltip of the applet by changing the corresponding lines in the `constructor()` function.

## Contributions

Contributions are welcome! 

## License

This project is licensed under the MIT License.
