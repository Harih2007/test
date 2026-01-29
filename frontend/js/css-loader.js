/**
 * CSS Loader - Fallback for deferred CSS loading
 * Ensures non-critical CSS loads even without JavaScript
 */
(function() {
    'use strict';
    
    // Load deferred stylesheets
    const loadDeferredStyles = () => {
        const addStylesNode = document.getElementById('deferred-styles');
        if (addStylesNode) {
            const replacement = document.createElement('div');
            replacement.innerHTML = addStylesNode.textContent;
            document.body.appendChild(replacement);
            addStylesNode.parentElement.removeChild(addStylesNode);
        }
    };
    
    // Load on idle or after 1 second
    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadDeferredStyles);
    } else {
        setTimeout(loadDeferredStyles, 1000);
    }
})();
