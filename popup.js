// Select the download button and add a click event listener
const downloadButton = document.getElementById('download-button');
downloadButton.addEventListener('click', downloadFile);

// Select the cancel button and add a click event listener
const cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener('click', cancelDownload);

// Variable to store the download ID
let downloadId;

function downloadFile() {
    // Get the browser history
    chrome.history.search({text: '', maxResults: 100000, startTime : 0}, function(historyItems) {
        // Extract the unique domains from the history
        const domains = new Set();
        for (let i = 0; i < historyItems.length; i++) {
            const url = new URL(historyItems[i].url);
            const hostname = url.hostname.split('.');
            domains.add(hostname.slice(-2).join('.'));
        }
        // Convert the set to an array and join it into a string
        const domainString = Array.from(domains).sort().join('\n');
        // Create a Blob with the file contents
        const file = new Blob([domainString], {type: 'text/plain'});
        // Create a URL for the file
        const fileUrl = URL.createObjectURL(file);
        // Download the file
        chrome.downloads.download({
            url: fileUrl,
            filename: 'domains.txt',
            saveAs: true
        });
    });
}





