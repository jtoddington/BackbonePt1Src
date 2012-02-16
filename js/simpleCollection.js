(function($) {

	$(document).ready(function(){

		/*Same model as simpleModel.js*/
		window.Book = Backbone.Model.extend({
			url:'book',
			defaults:{
				pages:0	
			},
			getTitleAndAuthor: function(){
				 return this.title + ':' + this.author
			}
		});

		/*Define a collection called 'Books' - Use conventions for the naming of these.*/
		window.Books = Backbone.Collection.extend({
			model:Book, //This is the type of model that our collection will hold. 
			url:'books.json', //This is the URL to save and load data from/to the collection.
		});
		
		/**
		 * Run the following code in the browser console to create an instance and manipulate.
		 **/		
		
		/*Create an instance of the Books collection called library*/
		//window.library = new Books(); 
		/*Or.. create with data so it doesn't have to be loaded when the page renders: */
		//window.library = new Books({[{title:"titleX", author:"authorX"},{title:"titleY", author:"authorY"},{title:"titleZ", author:"authorZ"}]}); 
		
		/*Make a call to get the data from the server (GET to the url property), inspect the data returned in the console.*/
		//library.fetch()
		
		/*Inspect the contents (expand the models array) to make sure it's there!*/
		//library
		
		/*Try some of the underscore.js functions that we get applied to the collection*/
		/*http://documentcloud.github.com/backbone/#Collection-Underscore-Methods*/
		//library.forEach(function(it){console.log(it);})
		
		
		
	});
	
})(jQuery);