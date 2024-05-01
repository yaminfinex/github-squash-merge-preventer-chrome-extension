function checkBranch() {
    chrome.storage.sync.get(({ branchesList: [] }), (data) => {  
        const targetBranch = document.querySelector("span.commit-ref span.css-truncate-target").innerText;
        if (data.branchesList.includes(targetBranch)) {
            const selectItem = document.querySelector("button.js-merge-box-button-squash");
            const mergeButton = document.querySelector("button.btn-group-squash");

            if (selectItem && mergeButton) {
                selectItem.disabled = true;
                mergeButton.disabled = true;
            }
        }    
    });
}


window.onload = function() {
    if (window.location.href.includes("github.com") && window.location.href.includes("/pull/")) {
        // Needs to be an interval instead of just set timeouts until disable because
        //   a rerender on the page can flip it back.
        setInterval(checkBranch, 500);
    }
}
