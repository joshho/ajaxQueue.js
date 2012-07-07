/**	Licence: 	http://creativecommons.org/licenses/by-nc-sa/3.0/
 **
 ** Joshua Ho Josh@joshho.com
 ** July 7th, 2012
 ** Version 1.0
 **
 ** Changelog:
 ** 07072012	1.0 - Release
 **
 ** Disclaimer
 ** THIS SOFTWARE IS PROVIDED "AS IS" AND ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 ** THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 ** SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 ** CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 ** DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 ** STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 ** SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 **/
(function ($) {
	
	$.ajaxQueue = function(opts) {
		return new _ajaxQueue(opts);
	}
	
	function _ajaxQueue(opts){
		
		function getLock(self){
			var lock;
			while((lock = self.div.data('lock').pop()) === 'undefined'){
				;
			}
			return lock;
		}
		
		this.add = function(ajaxopts){
			$.extend(ajaxopts, {
				ajaxQueue_id : this.id
			});
			
			var lock = getLock(this);//Lock...
			this.div.data('queue').push(ajaxopts);
			this.div.data('lock').push(lock);//Unlock
		}
		this.clear = function(){
			var lock = getLock(this);//Lock...
			this.div.data('counter', this.div.data('counter')-this.div.data('queue').length);
			this.div.data('queue', []);
			this.div.data('lock').push(lock); //Unlock
		}
		this.destroy = function(){
			this.clear();
			this.destroyMe = true;
		}
		this._run = function(self){
			if(typeof self === "undefined"){
				self = this;
			}
			if(typeof self.destroyMe !== "undefined"){
				return;
			}
			
			var lock = getLock(self);//Lock...
			if(self.div.data('queue').length > 0){
				if(self.div.data('counter') < self.div.data('opts').max){
					self.div.data('counter', self.div.data('counter')+1);
					$.ajax(self.div.data('queue').shift());
					self.div.data('lock').push(lock); //Unlock
					
					setTimeout(function () {
						self._run(self);
					}, 0);
					return;
				}
			}
			self.div.data('lock').push(lock); //Unlock
			
			setTimeout(function () {
				self._run(self);
			}, self.div.data('opts').timeout);
			return;
		}

		//Start of initializing
		opts = $.extend({
			max : 5,
			id : "X",
			timeout : 500,
		},opts);
		
		this.id = opts.id;
		this.div = $('html>div#ajaxQueue-'+this.id+"'");
		if( this.div.length === 0 ){
			$('html').append('<div id="ajaxQueue-'+this.id+'"></div>');
			this.div = $('html>div#ajaxQueue-'+this.id+"'");
			
			this.div.data('counter',0);
			this.div.data('queue',[]);
			this.div.data('lock', []);
			
			this.div.data('opts',opts);
			
			eval("this.div.ajaxComplete(function(event, XMLHttpRequest, ajaxOptions){"+
			"	if(ajaxOptions.ajaxQueue_id === '"+this.id+"'){"+
			"		var lock;"+
			"		while((lock = $(this).data('lock').pop()) === 'undefined'){"+//Lock
			"			;"+
			"		}"+
			"		$(this).data('counter', $(this).data('counter')-1);"+
			"		$(this).data('lock').push(lock);"+//Unlock
			"	}"+
			"});");
			
			this._run();
		}
	}
})(jQuery);
