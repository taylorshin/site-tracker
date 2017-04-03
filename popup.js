// Given an array of URLs, build a DOM list of these URLs in the browser action popup.
function buildPopupDom() {
  var popupDiv = document.getElementById('visited_div');
  var ol = popupDiv.appendChild(document.createElement('ol'));

  chrome.storage.local.get(null, function(items) {
      for(key in items) {
          var li = ol.appendChild(document.createElement('li'));
          var a = li.appendChild(document.createElement('a'));
          var h = li.appendChild(document.createElement('h4'));
          a.href = key;
          a.appendChild(document.createTextNode(key));
          h.appendChild(document.createTextNode(items[key]));
      }
  })
}

document.addEventListener('DOMContentLoaded', function() {
    // Build the popup
    buildPopupDom();
    var button = document.querySelector('#clrBtn');
    button.addEventListener('click', function() {
        buildPopupDom();
        chrome.storage.local.clear(function() {
            console.log('Cleared storage.');
        });
    });
});

// chrome.storage.onChanged.addListener(function(changes, namespace) {
//     for (key in changes) {
//         var storageChange = changes[key];
//         console.log('Storage key "%s" in namespace "%s" changed. ' +
//                       'Old value was "%s", new value is "%s".',
//                       key,
//                       namespace,
//                       storageChange.oldValue,
//                       storageChange.newValue);
//     }
// });
