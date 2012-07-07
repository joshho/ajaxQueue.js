# ajaxQueue.js #
---

### Usage ###
Just throw add <script src="ajaxQueue.js"></script> and declare a variable:
``` javascript
var ajaxQueue1 = $.ajaxQueue();
ajaxQueue1.add({
	url: "http://url.com",
	type: "GET"
});
```


###Program Notes###
  Due to the inherent limitation of javascript single threaded-ness,
  your browser at times will fire off ajax requests at poorly timed intervals.
  There is a todo to investigate how web workers can solve this issue.

### Author Notes ###
  My first plugin, I needed an ajax queue-r for pages with thousands of ajax requests.
  
### License ###
http://creativecommons.org/licenses/by-nc-sa/3.0/

### TODO ###
  Investigate how web workers can improve the performance.
