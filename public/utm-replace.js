// Put this immediately before the closing </body> tag
(function(){
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
    } else {
      return; // Abort if amazon link has no tag param
    }
    var ua = new UAParser();
    // if uastring includes android, change to android intent link
    if (ua.getOS().name.toLowerCase() === 'android') {
      // TODO: this URL is brittle, we should probably make it more dynamic pulling the parts we need from other amazon URLs on the page
      url = new URL(`intent://#Intent;package=com.amazon.mShop.android.shopping;scheme=com.amazon.mobile.shopping.web://amazon.com/o/ASIN/B075K7W3BB/${term}/ref=nosim//;end`);
    }
    // Replace existing link href with updated url containing new params
    link.href = url.toString();
  });
})();