(() => {
  'use strict';

  const cleanAddress = () => {
    const path = location.pathname.replace(/\/index\.html$/, '/');
    if (path !== location.pathname || location.hash) {
      history.replaceState(history.state, '', path + location.search);
    }
  };

  // Keep native anchor navigation and its focus/scroll behavior, then tidy the URL.
  window.addEventListener('hashchange', cleanAddress);

  const finishLoading = () => {
    let target = null;
    try {
      target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    } catch {
      // An invalid fragment must not prevent the rest of the page from working.
    }
    if (target) target.scrollIntoView();
    cleanAddress();
  };

  if (document.readyState === 'complete') finishLoading();
  else window.addEventListener('load', finishLoading, { once: true });
})();
