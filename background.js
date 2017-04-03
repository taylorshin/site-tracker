// Global exceptions domain list
var exceptions = ['newtab'];

function getDomain(url) {
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
    if(url.indexOf('www.') > -1) domain = domain.replace('www.', '');
    // Find and remove .com
    if(url.indexOf('.com') > -1) domain = domain.replace('.com', '');
    // Find and remove .org
    if(url.indexOf('.org') > -1) domain = domain.replace('.org', '');
    // Find and remove .net
    if(url.indexOf('.net') > -1) domain = domain.replace('.net', '');

    return domain.toLowerCase();
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status == 'complete') {
        chrome.tabs.get(tabId, function(tab) {
            var url = tab.url;
            var domain = getDomain(url);

            // Exclude domains in exception list
            if(exceptions.indexOf(domain) < 0) {
                // Check if url is already tracked
                chrome.storage.local.get(domain, function(obj) {
                    if(Object.keys(obj).length === 0 && obj.constructor === Object) {
                        var object = {};
                        object[domain] = 1;
                        chrome.storage.local.set(object);
                    }
                    else {
                        var object = {};
                        object[domain] = ++(obj[domain]);
                        chrome.storage.local.set(object);
                    }
                });
            }
        });
    }
});
