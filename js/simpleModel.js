(function($) {

	$(document).ready(function(){


		window.Book = Backbone.Model.extend({
			url:'book',
			defaults:{
				pages:0	
			},
			getTitleAndAuthor: function(){
				 return this.title + ':' + this.author
			}
		});

		window.book = new Book({title:'test title', author:'test auth'});

		//book.get('title');
		//book.set({title:'new title'});
		//book.save();
		
	});
	
})(jQuery);
