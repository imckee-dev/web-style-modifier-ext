document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('defaultTemplate').addEventListener('click', () => { //Get Element defaultTemplate


        chrome.tabs.query({}, function(tabs) { //function tabs

            tabs.forEach(function(tab) { // for each tab
                chrome.tabs.reload(tab.id);
            });
        });
    });

    //for opening the .css file
    //Right now, it just updates the margin file.
    document.getElementById('applyCss').addEventListener('click', () => { //Get Element applyCss
        chrome.tabs.query({}, function(tabs) { //function tabs
            tabs.forEach(function(tab) { // for each tab

                chrome.scripting.executeScript({ //execute script
                    target: {tabId:tab.id, allFrames:true},
                    func: apply_changes
                });
            });
        });
    });
    //unique vars here: 'applyCss', func: apply_changes.


    //for dropdown list for allow/deny list
    function toggle_dropdown_website_list() {
        document.getElementById("list_options").classList.toggle("show");
    }
    document.querySelector('.dropdown_button').addEventListener('click', toggle_dropdown_website_list);

    //applies the css file
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

    document.getElementById('updateTextSize').addEventListener('click', () => { //Get Element UpdateTextSize from ./index.html
        chrome.tabs.query({}, function(tabs) { //function tabs
            tabs.forEach(function(tab) { // for each tab

            chrome.scripting.executeScript({ //execute script
                target: {tabId:tab.id, allFrames:true},
                func: update_text_size
            });
            });
        });
    });

    function update_text_size() {
        const linkMatchesNodeList = document.querySelectorAll('link[rel="stylesheet"]');

        if (linkMatchesNodeList.length) {

            //create our element to later add to document
            const linkForCss = document.createElement('link');
            linkForCss.setAttribute('rel', 'stylesheet');

            const userStylePath = chrome.runtime.getURL('user/user_text_size.css');
            linkForCss.setAttribute('href', userStylePath);

            //move it to the end, after the last link
            const lastLink = linkMatchesNodeList[linkMatchesNodeList.length - 1]
            lastLink.insertAdjacentElement('afterend', linkForCss);


        }
    }




    /*
    //to update the margin officially
    document.getElementById('updateMargin').addEventListener('click', () => {
        chrome.windows.create({
            url: 'actions/margin_input.html',
            type: 'popup',
            width: 300,
            height: 200
        });
    });
    
    document.getElementById('modifyTextColor').addEventListener('click', () => {
        chrome.windows.create({
            url: 'actions/text_color.html',
            type: 'popup',
            width: 300,
            height: 200
        });
    });
    */

});
