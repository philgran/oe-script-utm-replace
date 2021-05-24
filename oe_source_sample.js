

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        window.aff_clicks_number = 0;

function getMobileOperatingSystem () {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

function isFacebookApp () {
    let ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}

window.bindAffiliateLinks = function  () {  
  let affiliate_links = document.querySelectorAll("a[href*='o/ASIN/']:not(.bound), a[href*='gp/product']:not(.bound)");
  let dataURL = new URL(window.location.href);
  const mobileOS = getMobileOperatingSystem();

  for (const alink of affiliate_links) {
    let elLI = alink.closest('.rebellt-item'),
    	href = alink.getAttribute('href');

    if ( dataURL.searchParams.get('azo') ) {
      let new_href = href.replace(/\/([^\/]*)-20\//g, "/" + dataURL.searchParams.get('azo') + "/");
      alink.setAttribute('href', new_href);
      // @NOTE: need to merge with the logic above
      let changedTag = new_href.replace(href.split('tag=')[1], dataURL.searchParams.get('azo'));
      alink.setAttribute('href', changedTag);
      // @NOTE: refactor and use alink.getAttribute('href') everywhere instead of update `href`
      href = changedTag;
    }
    
    // from GTM
    if (href.includes('ASIN/')) {
      let azoTag = href.split('ASIN/')[1].split('/')[1];
      let reFormatedTag = href.replace('o/ASIN/', 'gp/product/').replace(azoTag + '/', '').replace('ref=nosim/', '') + '?tag=' + azoTag;

      alink.setAttribute('href', reFormatedTag);
      href = reFormatedTag;
    }
	var fb_id = null
    if ((dataURL.searchParams.get('fbclid')) & (dataURL.searchParams.get('utm_campaign') == 'aff2-23846034672170155')) {
      fb_id = dataURL.searchParams.get('fbclid');
    }
    else if (dataURL.searchParams.get('utm_campaign') == 'aff2-23846034672170155') {
      fb_id = document.cookie.split('fbp=')[1].split(';')[0];
    }
	if (fb_id != null) {
    alink.setAttribute('href',alink.getAttribute('href').replace('gp/product/','gp/product/' + fb_id + '/'))
    }

    alink.classList.add('bound');

    if ( mobileOS !== "unknown" ) {
      alink.setAttribute('target', '_self');
    }
    
    alink.addEventListener('click', (e) => {
      console.log('aff click', e.currentTarget.href)
      // check if we have `fbq` -- it will raise a warning in fb pixel
      fbq('trackCustom', 'affiliate_click', {
        affiliate: alink.getAttribute('href'),
        session_clicks: ++window.aff_clicks_number,
      });
      
	  // keywee pixel tracking
      fbq("trackSingleCustom", "1585131574918168", "affiliate_click");

      if (alink.querySelector('img.rm-shortcode')) {
        window.ga('b.send', 'event', { eventCategory: 'afftrack', eventAction: 'image click', nonInteraction: 0, eventLabel: e.currentTarget.href, eventValue: elLI.dataset.galleryItem || elLI.dataset.id});
      } else if (alink.classList.contains('rebellt-ecommerce--btn')) {
        window.ga('b.send', 'event', {eventCategory: 'afftrack', eventAction: 'button click', nonInteraction: 0, eventLabel: e.currentTarget.href, eventValue: elLI.dataset.galleryItem || elLI.dataset.id});
      } else if (alink.parentNode.nodeName === "H3") {
        window.ga('b.send', 'event', {eventCategory: 'afftrack', eventAction: 'title click', nonInteraction: 0, eventLabel: e.currentTarget.href, eventValue: elLI.dataset.galleryItem || elLI.dataset.id});
      } else {
        window.ga('b.send', 'event', { eventCategory: 'afftrack', eventAction: 'link click', nonInteraction: 0, eventLabel: e.currentTarget.href, eventValue: elLI.dataset.galleryItem || elLI.dataset.id});
      }
      
      // open AMZ App
      if ( mobileOS === "Android" && isFacebookApp() && href.includes('amazon') ) {

            function fallbackToStore(url, startTime) {
                let endTime = Date.now(),
                    onAppTime = endTime - startTime;
                if (onAppTime < 1500 && document.hidden == false) {
                    window.location.href = url;
                }
            }
            function openApp(url) {
                let Asin = url.match("(?:[/dp/]|$)([A-Z0-9]{10})")[0].replace('/', '');
                let tag = url.split('?')[1].split('tag=')[1];
				let domain = url.split('.')[1].split('/')[0];
                if (fb_id != null) {
                var new_url = ("intent://#Intent;scheme=com.amazon.mobile.shopping.web://amazon." + domain + "/o/ASIN/" + Asin + "/" + tag + "/" + fb_id + "/ref=nosim//;end");
                }
                else {
                var new_url = ("intent://#Intent;scheme=com.amazon.mobile.shopping.web://amazon." + domain + "/o/ASIN/" + Asin + "/" + tag + "/ref=nosim//;end");
                }
                window.location.href = new_url
            }

            let originalUrl = href,
                startTime = Date.now();

            openApp(href);
            setTimeout(function(){ fallbackToStore(originalUrl, startTime); }, 500);
      }
      
    });

  }
}

window.bindAffiliateLinks();

window.REBELMOUSE_STDLIB && 
    window.REBELMOUSE_STDLIB.createElementChangeListener(".lazy-load-next-article", (nextArticle) => {
		window.bindAffiliateLinks();
	});
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1969338,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        (function(){
window._pxAppId = 'PX3CVQBi14';
// Custom parameters
// window._pxParam1 = "<param1>";
var p = document.getElementsByTagName('script')[0],
s = document.createElement('script');
s.async = 1;
s.src = '/static/clients/twentytwowords/3CVQBi14_init.js';
p.parentNode.insertBefore(s,p);
}());
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        /* 
  GA events
  source: https://developers.google.com/analytics/devguides/collection/analyticsjs/events
  example: ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
*/

	// Global Vars
	// NOTE: move them to a separate place
	window.vpps = 1;

	// GLOBAL
	// menu open -- tracks when someone opens the menu
	let menuBtn = document.querySelector(".rebelbar__menu-toggle");
	menuBtn &&
	menuBtn.addEventListener("click", e => {
        if ( !e.currentTarget.classList.contains("js--active") ) {
        	// raise GA event
            window.ga('b.send', 'event', 'menu', 'open');
        }
    });

    // POSTS
    // slideshow-next-button -- tracks the number of times someone clicks through to a slideshow article (also tracks which paginated page that button click is on)
	if ( typeof window.REBELMOUSE_STDLIB === "undefined" ) {
      // social ux app
      let listiclePageButtons = document.querySelectorAll(".js-listicle-switch-page");
	  listiclePageButtons.length &&
	    listiclePageButtons.forEach((pageButton) => {
		  pageButton.addEventListener("click", e => {
			if (e.currentTarget.classList.contains("post-pager__btn--next-page")) {
				//slideshow-next-button
				window.ga('b.send', 'event', 'slideshow-next-button', e.currentTarget.href);
			} else if (e.currentTarget.classList.contains("post-pager__btn--prev-page")) {
				//slideshow-prev-button
				window.ga('b.send', 'event', 'slideshow-prev-button', e.currentTarget.href);
			}
		  });
	    });
    } else {
        // new light js app
	    window.REBELMOUSE_STDLIB.createElementChangeListener(".post-pager__btn--next-page", (btn) => {
    	    btn.addEventListener("click", e => window.ga('b.send', 'event', 'slideshow-next-button', e.currentTarget.href));
	    });
	    window.REBELMOUSE_STDLIB.createElementChangeListener(".post-pager__btn--prev-page", (btn) => {
    	    btn.addEventListener("click", e => window.ga('b.send', 'event', 'slideshow-prev-button', e.currentTarget.href));
	    });
    }

	// share post
	document.addEventListener('rebelmouse.postShared', function(e) {
		window.ga('b.send', 'event', 'share', e.detail.provider, e.detail.url);
	});

	// share FB
	if ( typeof window.REBELMOUSE_STDLIB !== "undefined" ) {
	    window.REBELMOUSE_STDLIB.createElementChangeListener(".share-panel .share-fb", (btn) => {
            btn.href = `${btn.href}%3D%3Futm_source%3Darticle-share%26utm_medium%3Dfacebook`;
    	    btn.addEventListener("click", (e) => {window.ga('b.send', 'event', 'social', 'share article', 'facebook: article header', e.currentTarget.href); return false;});
	    });
    }

	// scrolled article
	document.addEventListener('rebelmouse.urlScrolled', function(e) {
		window.ga('b.send', 'event', 'scroll', 'article completed', e.detail.headline);
	});
	// fallback
	window.REBELMOUSE_STDLIB && window.REBELMOUSE_STDLIB.onElementInViewport({
          selector: `.post-page-content span[data-post-url$="${window.location.pathname}"]`,
          oneTime: true,
          onIntersect(entry) {
            const { elid, postUrl, headline } = entry.target.dataset;
          	window.ga('b.send', 'event', 'scroll', 'article completed', headline);
            console.log('raising article completed', entry);
          }
    });

    // Infinite Scroll pageview event every 5x LI
/*
    document.addEventListener('rebelmouse.urlChange', function(event) {
		let particleEl = document.querySelector(`[data-href="${event.detail.url}"]`);
		if (!particleEl) return;
		let parricleId = parseInt(particleEl.dataset.id);

		if ( parricleId % 5 === 0 ) {
        	let pageView = location.protocol + '//' + location.host + location.pathname + '/' + (1 + (parricleId / 5));
			window.ga('b.send', 'pageview', pageView);
   		}
	});
*/

q
	/* BIDS */
    window.getAllHighestBids = function() {
        var highestBidsData = localStorage.getItem('rev_highest_bids') || '';
        if (highestBidsData.length > 0) {
            var parsedData = JSON.parse(highestBidsData);
            if (parsedData.hasOwnProperty('bids')) {
                return parsedData.bids;
            }
        }
        return {};
    }
    window.getHighestBidsRevenue = function() {
        var highestBidsData = window.getAllHighestBids() || {};
        if (Object.keys(highestBidsData).length > 0) {
            var _tmp = [];
            Object.keys(highestBidsData).map(function(e) {
                Object.keys(highestBidsData[e]).map(function(pl) {
                    _tmp.push(highestBidsData[e][pl]);
                });
            });
            if (_tmp.length > 0) {
                return _tmp.reduce(function(a, b) {
                    return a + b;
                }, 0) / 1000;
            }
        }
        return 0;
    }
    window.getHighestBidsAvgCpm = function() {
        var highestBidsRevenue = window.getHighestBidsRevenue() || 0;
        if (highestBidsRevenue > 0) {
            var bidsKey = JSON.parse(localStorage.getItem('rev_highest_bids')) || {};
            if (bidsKey.hasOwnProperty('units')) {
                return (highestBidsRevenue / bidsKey.units) * 1000;
            }
        }
    }

    /* FB Tracking */
    function sendFBQR10() {
        var totalRevenue = window.getHighestBidsRevenue();
        console.log('[R10] Total Revenue sent: ', totalRevenue)
        if (totalRevenue > 0) {
            fbq('trackSingleCustom', '2153144925001636', 'R10', { value: totalRevenue, currency: 'USD' }); 
            // @NOTE: check if we use tracker in the future
            //tracker && tracker.sentFBQ('R10');
            // window.fbBQ(totalRevenue, 'ss_R10');
        }
    }
    function sendFBQC10() {
        var avgCPM = window.getHighestBidsAvgCpm();
        console.log('[C10] AVG CPM sent: ', avgCPM)
        if (avgCPM > 0) {
            fbq('trackSingleCustom', '2153144925001636', 'C10', { value: avgCPM, currency: 'USD' }); 
            // @NOTE: check if we use tracker in the future
            //tracker && tracker.sentFBQ('C10');
            // window.fbBQ(avgCPM, 'ss_C10');
        }
    }
    function sendFBQR15() {
        var totalRevenue = window.getHighestBidsRevenue();
        console.log('[R15] Total Revenue sent: ', totalRevenue)
        if (totalRevenue > 0) {
            fbq('trackSingleCustom', '2153144925001636', 'R15', { value: totalRevenue , currency: 'USD' });
            // @NOTE: check if we use tracker in the future
            // tracker && tracker.sentFBQ('R15');
            // window.fbBQ(totalRevenue, 'ss_R15');
        } 
    }
    function sendFBQR30() {
        var totalRevenue = window.getHighestBidsRevenue();
        console.log('[R30] Total Revenue sent: ', totalRevenue)
        if (totalRevenue > 0) {
            fbq('trackSingleCustom', '2153144925001636', 'R30', { value: totalRevenue , currency: 'USD' });
            // @NOTE: check if we use tracker in the future
            // tracker && tracker.sentFBQ('R30');
            // window.fbBQ(totalRevenue, 'ss_R30');
        } 
    }

      window.REBELMOUSE_STDLIB && window.REBELMOUSE_STDLIB.onElementInViewport({
          selector: ".rebellt-item[data-href]",
          oneTime: false,
          onIntersect(entry) {
              const { id, href, postId, basename } = entry.target.dataset;
              const isRelatedArticle = !!entry.target.closest(".js--is-related-article");
              const articleHref = `${location.protocol}//${location.host}${location.pathname}`;
              const articlePathname = window.location.pathname;
              let particleId = ([...entry.target.closest(".body-description").children].filter(el => el.classList.contains("rebellt-item")).indexOf(entry.target) + 1) || Number(id);

              // @NOTE: we need to combine views for related article
              if ( isRelatedArticle ) {
                  particleId += document.querySelectorAll(`[data-href^="${articleHref}"]`).length;
              }

              if ( particleId % 5 === 0 ) {
                  let pageId =  1 + (particleId / 5);
                  let pageView = `${articleHref}${pageId}`;
                  let pageViewGA = `${articlePathname}${pageId}`;
                  let queryParams = new URLSearchParams(window.location.search);
                
                  window.vpps = pageId;

                  if (queryParams.get('utm_source') && (queryParams.get('utm_source') === 'fb-aff-vs' || queryParams.get('utm_source') === 'facebook-aff-vs') || queryParams.get('utm_source') === 'facebook-vs') {
                      fbq('trackSingle', '2682424372012779', 'Page', {
                          pagenum: pageId
                      });
                      typeof tracker !== "undefined" && tracker.sentFBQ('Page');
                      console.log('raising trackSingle Page for FBQ', pageView);
                  }
                  window.ga('b.send', 'pageview', pageViewGA);
                  console.log('raising virtual pageview for', pageView, entry);
              }
            
              // @NOTE: sending fbq
              if ( particleId === 10 ) {
                if (!window.has_sent_R10) {
                    window.has_sent_R10 = true;
                    sendFBQR10();
                    sendFBQC10();
                    console.log('raising FBQR10 and FBQC10');
                }
              } else if ( particleId === 15 ) {
                  if (!window.has_sent_R15) {
				    window.has_sent_R15 = true;
                    sendFBQR15();
                  }
              } else if ( particleId === 30 ) {
                if (!window.has_sent_R30) {
                  window.has_sent_R30 = true;
                  sendFBQR30();
                }           
              }
          }
      });
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
    window.REBELMOUSE_STDLIB.loadExternalScript("//d1n090xwbccnsl.cloudfront.net/script.js", function() {
        
    });
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
    window.REBELMOUSE_STDLIB.loadExternalScript("https://z-na.associates-amazon.com/onetag/v2?MarketPlace=US&amp;instanceId=8b5e0f02-52ad-46d5-b67c-9d17ce262fd4", function() {
        
    });
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        (function () {
  let sites = document.querySelectorAll("a[href*='togetherapart']:not(.utm_added), a[href*='isolation-fitness']:not(.utm_added), a[href*='bluekazoo']:not(.utm_added)");
  let utmTerms = window.location.href.split('?');
  if (utmTerms.length == 2) {
      sites.forEach(function(site) {
          let newUrl,
              oldUrl = site.getAttribute('href');
              lastChar = oldUrl[oldUrl.length - 1];
          if (oldUrl.includes('?') & !oldUrl.includes('/?')) {
            oldUrl = oldUrl.replace('?','/?');
            newUrl = oldUrl + "&" + utmTerms[1];
          }
          else if (oldUrl.includes('/?')) {
            newUrl = oldUrl + "&" + utmTerms[1];
          }
          else if (lastChar == "/") {
            newUrl = site.getAttribute('href') + "?" + utmTerms[1];
          }
          else {
            newUrl = site.getAttribute('href') + "/?" + utmTerms[1];
          }
          site.setAttribute('href', newUrl);
          site.setAttribute('target', '_blank');
          site.classList.add('utm_added');
      });
  }
  else {
    sites.forEach(site => site.setAttribute('target', '_blank'));
  }
})();
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        (function(a,b){a.kwa||(a.kwa=function(){(a.kwa.q=a.kwa.q||[]).push(arguments)});se=b.createElement("script");fs=b.scripts[0];se.src="//cdn.keywee.co/dist/analytics.min.js";fs.parentNode.insertBefore(se,fs)})(window,document);kwa("initialize",557);
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
    window.REBELMOUSE_STDLIB.loadExternalScript("//s.ntv.io/serve/load.js", function() {
        
        // move it to Ad Manager and load it on demand
let ntvPlaceholderCounter = 1;
let LIElements = document.querySelectorAll('.current-post .widget__body .body-description > .rebellt-item h3');

for (let i=0; i < LIElements.length; i++) {
  if ( (i+1) % 5 !== 0) { continue; }
  if (ntvPlaceholderCounter > 7) { break; }
  let ntvPlaceholder = document.createElement("div");
  ntvPlaceholder.id = `nativo${++ntvPlaceholderCounter}`;
  ntvPlaceholder.className = "nativo-unit";
  let targetEl = LIElements[i].parentElement.querySelector("small.image-media") ? LIElements[i].nextElementSibling.nextElementSibling : LIElements[i].nextElementSibling;

  targetEl.insertAdjacentElement('afterend', ntvPlaceholder);
}
        
    });
    

});