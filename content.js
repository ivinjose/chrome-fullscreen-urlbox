/**
 * Developed by,
 * @author: 	Ivin Jose
 * @contact: 	ivinjose@gmail.com
 * @webpage: 	http://picaflicka.com
 * Licensed under Apache v2.0 license.
 */

 /**
  * On recieving message from background.js (i.e., when user calls the extension), do the following steps:
  * 01: Remove any previous occurances of urlbox.
  * 02: Create new urlbox and set id and width.
  *	03: Attach onBlur event handler to remove the urlbox on focusOut.
  * 04: Attach onKeypress event handler to perform query processing.
  * 05: Append urlbox to the body.
  * 06: Get reference to newly added urlbox.
  * 07: Set focus onto it.
  */

chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
	if(request.clicked==1){

		/* Remove any previous occurances of urlbox */
		var urlbox = document.getElementById('chrome-fullscreen-urlbox');
		if(urlbox){
			urlbox.parentNode.removeChild(urlbox);
		}

		/* Create new urlbox and set id and properties */
		urlbox = document.createElement('input');
		urlbox.id = 'chrome-fullscreen-urlbox';
		urlbox.style.width = (window.innerWidth*3/4)+'px';
		urlbox.style.border = '1px solid #000'
		urlbox.style.borderRadius = '3px';
		urlbox.style.boxShadow = '1px 1px 15px 2px rgba(0,0,0,0.4)';
		urlbox.style.fontSize = '14px';
		urlbox.style.top = '20px';
		urlbox.style.left = '12%';
		urlbox.style.padding = '10px';
		urlbox.style.position = 'fixed';
		urlbox.style.zIndex = '2147483647';

		/* On lostFocus remove the urlbox */
		urlbox.onblur = function(){
			urlbox.parentNode.removeChild(urlbox);
		}

		/* On keypress perform search or url redirect */
		urlbox.onkeypress = function(e){
			if(e.keyCode==13){
				/* Default case is where user enters a search query indicated by queryType=s */
				var queryType = 's';
				var query = urlbox.value;

				/* For going to a URL, user is required to add a ~ sign before the URL */
				if( query[0]=='~' ){
					query = query.substring(1).toLowerCase().replace('http://','').replace('wwww.','');

					/* Then we add only the http part, assuming that http will get redirected to https automatically */
					query = "http://" + query;
					queryType = 'g';
				}
				/* Fire away the query and queryType as message to background.js */
				chrome.extension.sendMessage({text:query,kind:queryType});
			}
		}

		/* Append the urlbox to body */
		document.getElementsByTagName('body')[0].appendChild(urlbox);

		/* Get a reference to newly added urlbox and setFocus on it */
		urlbox = document.getElementById('chrome-fullscreen-urlbox');
		urlbox.focus();
	}
});