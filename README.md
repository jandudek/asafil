This is a Chrome plugin that allows filtering in an Asana board. It's basically a hack which traverses the DOM and displays/hides story cards.

Download into a directory, go to chrome://extensions/ , turn on "Developer mode", then "Load unpacked" and load the directory.

Then open an Asana board and use the extension to filter out columns / cards from the board.

# FAQ
Q: Instead of avatars and abbreviations, I want to see full names in the users filter section.

A: Unfortunately the full name info is not available in the Asana board DOM (at least I didn't find it there). Hence the extension uses just what's available there: avatar for users with a configured avatar pic and the abbreviation for the rest of them.

Q: When I open the extension for a second time, the checkboxes are not set to the correct state corresponding with the state of the board. Why?

A: Because I haven't implemented yet. This is going to be in the next update.
