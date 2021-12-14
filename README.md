[![Marketplace](https://vsmarketplacebadge.apphb.com/version-short/nkosakul.copy-cat.svg)](https://marketplace.visualstudio.com/items?itemName=nkosakul.copy-cat)
![Installs](https://vsmarketplacebadge.apphb.com/installs/nkosakul.copy-cat.svg)

# Copy Cat

Stores your clipboard to a history and hands it back to you, whenever you want it.

-----------------------------------------------------------------------------------------------------------
## Features

Everytime you copy or cut some code to your clipboard (inside VScode), Copy Cat will store it in a history for you.

The Extension will show you the history (when wanted) and paste it to your clipboard for you to use.

### Show clipboard history
Copy Cat will store max. **15** items to your history (by default).
You can change the history limit in your settings (see the part `Extension Settings` below).

See your clipboard history:
* by pressing `Ctrl+Shift+C` (or `Cmd+Shift+C` on mac)
* by using the command `>Copy Cat: Show History`
* by clicking the `Copy Cat` Icon at the bottom right of you status bar

![screenshot of Copy Cat history](/images/screenshot.png)


### Clear history
You can always clear you clipboard history by using the command `>Copy Cat: Clear History`!

-----------------------------------------------------------------------------------------------------------
## Extension Settings

### History limit
By default, Copy Cat stores **15** items.
You can always change the maximal amount of items stored in the history, in your settings.

```json
"copy-cat.limit": 42
```

### Persist history
By default, Copy Cat will persist history across sessions.
You can turn it off, if you want to clear the history on every new session.

```json
"copy-cat.persistHistory": false
```

-----------------------------------------------------------------------------------------------------------
## Known Issues

Nothing, yet!
[Let me know](https://github.com/nkosakul/copy-cat/issues) if something's not working!

-----------------------------------------------------------------------------------------------------------
## Release Notes

### 1.0.0

Initial release of Copy Cat!

### 1.1.0
* adjust extension descirption
* remove when clause from showHistory command
* immediatly paste selected code from history and make it configurable
* adding badges
* update command copy title
