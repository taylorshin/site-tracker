function extractDomain(url) {
    var domain;
    // Find and remove protocol
    if(url.indexOf('://') > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    // Find and remove port number
    domain = domain.split(':')[0];
    // Find and remove www.
    if(domain.indexOf('www.') > -1) {
        domain = domain.replace('www.', '');
    }
    // Find and remove .com
    if(domain.indexOf('.com') > -1) {
        domain = domain.replace('.com', '');
    }

    return domain;
}

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var domain = extractDomain(url);

    // Check if url is already tracked
    chrome.storage.local.get(domain, function(obj) {
        if(Object.keys(obj).length === 0 && obj.constructor === Object) {
            console.log('not found');
            var object = {};
            object[domain] = 1;
            chrome.storage.local.set(object, function(e) {
                // console.log('Data stored: ' + JSON.stringify(e));
            });
        }
        else {
            console.log('seomthing found');
            var object = {};
            console.log('old count: ' + obj[domain]);
            object[domain] = ++(obj[domain]);
            console.log('new count: ' + obj[domain]);
            chrome.storage.local.set(object, function() {
                // message('Data saved!');
            });
        }
    });
});

// Given an array of URLs, build a DOM list of these URLs in the
// browser action popup.
function buildPopupDom(mostVisitedURLs) {
  var popupDiv = document.getElementById('mostVisited_div');
  var ol = popupDiv.appendChild(document.createElement('ol'));

  chrome.storage.local.get(null, function(items) {
      for(key in items) {
          console.log(key);
          var li = ol.appendChild(document.createElement('li'));
          var a = li.appendChild(document.createElement('a'));
          var p = li.appendChild(document.createElement('p'));
          a.href = key;
          a.appendChild(document.createTextNode(key));
          p.appendChild(document.createTextNode(items[key]));
      }
  })
}

chrome.topSites.get(buildPopupDom);

chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
      });

document.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector('#btn');
    button.addEventListener('click', function() {
        chrome.topSites.get(buildPopupDom);
        chrome.storage.local.clear(function() {
            console.log('Cleared.');
        });
    });
    var button2 = document.querySelector('#btn2');
    button2.addEventListener('click', function() {
        chrome.topSites.get(buildPopupDom);
    });
});
