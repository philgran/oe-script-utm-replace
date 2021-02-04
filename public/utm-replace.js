// Put this immediately before the closing </body> tag
(function(){
  const term = new URLSearchParams(window.location.search).get('utm_term'); // Get our utm_term from the URL search params
  if (!term) return; // Abort if our URL doesn't have a utm_term

  const amazonLinks = Array.from(document.querySelectorAll('a')).filter(a => {
    // Scan all links on page and filter for only amazon.com links
    return a.href.includes('amazon.com')
  })
  amazonLinks.forEach(link => {
    const url = new URL(link);
    let linkParams = new URLSearchParams(url.searchParams)
    // If tag param exists on link, replace it with our utm_term
    if (linkParams.get('tag')) {
      linkParams.set('tag', term)
      url.search = linkParams.toString()
    }
    // Replace existing link href with updated url containing new params
    link.href = url.toString()
  })
})();