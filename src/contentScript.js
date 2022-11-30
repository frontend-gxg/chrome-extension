'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(
  `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
);

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  (response) => {
    console.log(response.message);
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    console.log(`Current count is ${request.payload.count}`);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});


function getCode(element) {
  var es = pre.getElementsByClassName("hljs-ln-code");
  var codes = [];
  for (let e of es) {
    codes.push(e.textContent);
  }
  return codes.join("\n");
}

var preList = document.getElementsByTagName("pre");
var pre = preList[0];
pre.addEventListener('contextmenu', (event) => {
  var path = event.path;
  for (let p of path) {
    if (p.tagName === "PRE") {
      var textarea = document.createElement('textarea');
      textarea.setAttribute("readonly", true);
      textarea.value = getCode(p);
      document.body.appendChild(textarea);
      textarea.setSelectionRange(0, textarea.value.length);
      textarea.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log('复制成功');
      }
      document.body.removeChild(textarea);
    }
  }
});
