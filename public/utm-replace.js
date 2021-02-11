// Put this immediately before the closing </body> tag
(function(){
  function getMobileOperatingSystem () {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Windows Phone must come first because its UA also contains "Android"
    switch(true) {
      case /windows phone/i.test(userAgent):
        return "Windows Phone";
      case /android/i.test(userAgent):
        return "Android";
      case /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream:
        return "iOS";
      default:
        return "unknown";
    }
}

  var term = new URLSearchParams(window.location.search).get('utm_term'); // Get our utm_term from the URL search params
  if (!term) return; // Abort if our URL doesn't have a utm_term

  // Make an array from all the <a> tags on the page and filter them
  var amazonLinks = Array.from(document.querySelectorAll('a')).filter(function(a) {
    // Filter for only amazon links
    return a.href.includes('amazon');
  });
  amazonLinks.forEach(function(link) {
    var url = new URL(link);
    var linkParams = new URLSearchParams(url.searchParams);
    // If tag param exists on link, replace it with our utm_term
    if (linkParams.get('tag')) {
      linkParams.set('tag', term);
      url.search = linkParams.toString();
       // Replace existing link href with updated url containing new params
      link.href = url.toString();
    } else {
      return; // Abort if amazon link has no tag param
    }
    // if uastring includes android, change to android intent link and bind a click handler
    if (getMobileOperatingSystem() === 'Android') {
      var ASIN = url.pathname.match("(?:[/dp/]|$)([A-Z0-9]{10})")[0].replace('/', '');
      // Build new Android deep link url with params from original URL
      url = new URL('intent://#Intent;package=com.amazon.mShop.android.shopping;scheme=com.amazon.mobile.shopping.web://' + url.hostname + '/o/ASIN/' + ASIN + '/' + term + '/ref=nosim//;end');
      link.addEventListener('click', function() {
        // When the link is clicked, set the window location to our Android deep link
        window.location.href = url;
      });
    }
  });
})();