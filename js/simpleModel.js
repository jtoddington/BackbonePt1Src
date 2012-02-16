/*namespace jquery*/
(function($) {
	/*
		Wait for the document to load before running the Backbone code, this is optional but probably the best thing to do as 
		in certain circumstances we might want to get hold of a view Template before the Router starts the app and DOM might not be loaded!
		See simpleView.js
	*/
	$(document).ready(function(){

		/*Create a new Model*/
		window.Book = Backbone.Model.extend({
			url:'book', //This is the url used for getting/saving data
			defaults:{  //set any default properties for our domain objects.
				pages:0	
			},
			
			getTitleAndAuthor: function(){ //Sample method. 
				 return this.title + ':' + this.author
			}
			
			/*
				We can also declare an initialize and validate function in our Model if we needed to,
				Initialize is called and passed any params that the Model is created with.
				Validate is called before the instance is saved.
			*/
			
		});

		/**
		 * Run the following code in the browser console to create an instance and manipulate.
		 **/
		
		//window.book = new Book({title:'test title', author:'test auth'});
		
		//book.get('title');
		
		//book.set({title:'new title'});
		
		/*Look for the HTTP post after this call.*/
		//book.save(); 
		
	});
	
})(jQuery);
