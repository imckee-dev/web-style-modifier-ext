document.getElementById('updateMargin').addEventListener('click', () => {
    const margin = document.getElementById('marginValue').value;
    const css = `p { margin: ${margin}%; }`;

    chrome.storage.local.set({ customMargin: css });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: (css) => {
                const style = document.createElement('style');
                style.textContent = css;
                document.head.appendChild(style);
            },
            args: [css]
        });
    });
    window.close();
});