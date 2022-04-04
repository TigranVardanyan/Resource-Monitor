# Resource monitor

This project was Tigran Vardanyan

[Repository on Github](https://github.com/TigranVardanyan/Resource-Monitor)

---
### Get started
```
- download project to your computer
- run npm install command in project folder
- open extensions page in browser
- enable developer mode
- press to Load unpacked button and select project folder
- for a better user experience, pin the extension to the quickbar
```
---
### User guide
```
- The extension allows you to track the amount of RAM
- You can simply click on the extension icon to see the available RAM
- There is also an extended view
    * You can track available RAM capacity over time
    * Set you own options (RAM load level)
    * Export data to CSV file
```
---
### Compatibility
```
Compatible with Google Chrome browser
```
---
### Known bugs
```
- This request exceeds the MAX_WRITE_OPERATIONS_PER_HOUR quota.
extension use chrome storage and it have limit on write operations per hour

Solution - remove extension from browser, rename project folder, upload by Load unpacked again

Also fixes any unexpected termination of the extension
```

### Changelog
* [1.0.0](https://github.com/TigranVardanyan/Resource-Monitor)
* * Stable version
* [1.0.1](https://github.com/TigranVardanyan/Resource-Monitor)
* * UI improvements
* * Refactoring
* * Added roadmap
* [1.0.2](https://github.com/TigranVardanyan/Resource-Monitor)
* * Bug fixes
* * Chart switcher
* * UI improvements
* * Refactoring

# Roadmap
* Interactive icon for extension - [1.1.0](https://github.com/TigranVardanyan/Resource-Monitor/issues/2)
* CPU usage monitoring  - [1.2.0](https://github.com/TigranVardanyan/Resource-Monitor/issues/1)