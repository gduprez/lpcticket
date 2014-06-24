cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.statusbar/www/statusbar.js",
        "id": "org.apache.cordova.statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.mirasense.scanditsdk.plugin": "1.1.0",
    "org.apache.cordova.console": "0.2.8",
    "org.apache.cordova.device": "0.2.9",
    "org.apache.cordova.statusbar": "0.1.3"
}
// BOTTOM OF METADATA
});