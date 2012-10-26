/**
 * Developed and owned by,
 * @author: 	Ivin Jose
 * @contact: 	ivinjose@gmail.com
 * @webpage: 	http://picaflicka.com
 * Licensed under MIT license.
 */

/* Add a listener for onClicked event of the extension */
chrome.browserAction.onClicked.addListener(function(tab){
	chrome.tabs.sendMessage(tab.id,{clicked:1});
});

/**
 * Add a listener for onMessage recieved event (listen for queries coming from content.js)
 * If queryType=s, which means a search query, google it.
 * If queryType=g, which means a url, update current tab with that url.
 */
chrome.extension.onMessage.addListener(function(response,sender,sendResponse){
	if(response.kind=='s'){
		chrome.tabs.update({"url":"https://www.google.com/search?as_q="+response.text});
	}else{
		chrome.tabs.update({"url":response.text});
	}
});