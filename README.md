# ajaxQueue.js #
---
### About ###
ajaxQueue's main purpose is to limit the number of ajax requests sent at any one moment.
When requests become completed, the next ajax request in the queue will be fired.

### Usage ###
Requires JQuery, tested on 1.7.2, to use, just throw the following script src into your webpage:
``` html
<script src="ajaxQueue.js"></script> 
```

and declare a variable:
``` javascript
var ajaxQueue1 = $.ajaxQueue();
ajaxQueue1.add({
	url: "http://url.com",
	type: "GET"
});
```
Additional examples for initializing
``` javascript
var ajaxQueue1 = $.ajaxQueue({
	max : 5; //Sets the maximum number of in-transit ajax requests
	id : "SOMEID"; //Sets the id of the variable; works with [a-zA-Z0-9]+
	timeout : 50; //Sets how often we should poll the queue for firing out.
});
```

Additional Points:
``` javascript
//ajaxQueue1.add( obj ) and ajaxQueue2.add( obj2 ) will both add to the same queue
var ajaxQueue1 = $.ajaxQueue();
var ajaxQueue2 = $.ajaxQueue(); 

//ajaxQueue3.add( obj ) and ajaxQueue4.add( obj2 ) will both add to the same queue
//as they have the same id.
var ajaxQueue3 = $.ajaxQueue({
	id: "X"
});
var ajaxQueue4 = $.ajaxQueue({
	id: "X"
});
```


###Program Notes###
  Due to the inherent limitation of javascript single threaded-ness,
  browsers may fire off ajax requests at poorly timed intervals.
  There is a todo to investigate how web workers can solve this issue.

### Author Notes ###
  My first plugin, I needed an ajax queuer for pages with thousands of ajax requests.
  
### License ###
http://creativecommons.org/licenses/by-nc-sa/3.0/

### TODO ###
  Investigate how web workers can improve the performance.
