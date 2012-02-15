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

		window.Books = Backbone.Collection.extend({
			model:Book,
			url:'books.json',
		});
		
		//window.book = new Book({title:'test title', author:'test auth'});
		//book.get('title');
		//book.set({title:'new title'});
		//book.save();
		
		//window.library = new Books(); //can instantiate with data here too!
		//library.fetch()
		//library
		//library.forEach(function(it){console.log(it);})
		
		
		
	});
	
})(jQuery);