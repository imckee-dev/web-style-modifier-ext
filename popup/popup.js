
document.getElementById('applyCss').addEventListener('click', () => {
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.scripting.executeScript({
            target: {tabId:tab.id, allFrames:true},
            func: apply_changes
          });
        });
      });
  });


function apply_changes () {

    const linkMatchesNodeList = document.querySelectorAll('link[rel="stylesheet"]');

    if (linkMatchesNodeList.length) {

        //create our element to later add to document
        const linkForCss = document.createElement('link');
        linkForCss.setAttribute('rel', 'stylesheet');

        const userStylePath = chrome.runtime.getURL('user/user_styles.css');
        linkForCss.setAttribute('href', userStylePath);

        //move it to the end, after the last link
        const lastLink = linkMatchesNodeList[linkMatchesNodeList.length - 1]
        lastLink.insertAdjacentElement('afterend', linkForCss);


    }

}
