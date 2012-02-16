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
		
		/*Same collection as simpleCollection.js*/
		window.Books = Backbone.Collection.extend({
			model:Book,
			url:'books.json',
		});
		
		/*Create a view that will represent each 'Book' model.*/
		window.BookView = Backbone.View.extend({
		
				/*Specify the tag we will render each instance of the view as (default to 'div')*/
				tagName: 'li',
				/*The CSS class to apply*/
				className: 'book',
				/*
					The template to use - declared in simpleView.html. 
					We are using jQuery to look up the template by its ID and then run it through the templating engine provided 
					by underscore.js and assigning to template var.  
					Note there are different ways to assign the template to the view, this method is more efficient as
					the templating engine is only ran once for each view defined, but requires that the DOM be fully loaded before 
					the Backbone code is ran, hence wrapping the code in $(document).ready(function(){ ...
					See the LibraryView for an alternate way. 
				*/
				template: _.template($('#book-template').html()),
		
				/*Initialize the view*/
				initialize: function(){
					/*
						underscore.js utility to make sure all our calls in the instance are ran in the right context.
						All further methods would need to be added e.g: _.bindAll(this, 'render', 'sampleMethod1', 'sampleMethod2');
						see http://documentcloud.github.com/underscore/#bindAll
					*/
					_.bindAll(this, 'render');
					/*Add a listener so that if the book this view is associated with changes we re-render the view.*/
					this.model.bind('change', this.render);
				},
				
				/*Function to render the view*/
				render: function(){
					/*Run the model data through the templating engine as assigned in initialize.*/
					var renderedContent = this.template(this.model.toJSON());
					/*
						The el variable in a View represents the DOM element for the view.
						Populate with the content.
					*/
					$(this.el).html(renderedContent);
					/*Return a ref to the view for convenience. */
					return this;
				}
		});		
		
		/*Create a view that will represent a 'Books' collection*/
		window.LibraryView = Backbone.View.extend({
			tagName: 'section', //HTML5 section tag.
			className: 'library',

			initialize: function(){
				_.bindAll(this, 'render');
				/*
					Alternate way to asign template, this will be done for every instance and may cause probs when extending 
					the view i.e. do it the other way, as detailed above :)
				*/
				this.template = _.template($('#library-template').html());
				/*Bind the collections reset event to re-render the view if the data is re-loaded. */
				this.collection.bind('reset', this.render);
			},
			
			render: function(){
				/*
					Declare vars used in the function
					Use $ prefix to refer to a jQuery object, just convention! 
				*/
				var $books, 
					collection = this.collection;
				/*We don't really need to do this as we are not passing data to the template, but good practice.*/
				$(this.el).html(this.template({}));
				/*Get a ref to the books UL in the library-template*/
				$books = this.$(".books");
				/*Iterate over the books in the collection*/
				collection.each(function(book){
					/*Create an instance of the book view from above, passing it the appropriate model.*/
					var view = new BookView({
						model: book, 
						collection: collection //also pass a ref to the collection in case we need it on the BookView.
					})
					/*Append the rendered BookView in the UL.*/
					$books.append(view.render().el);
				});
				return this;
			}			
		});
		
		/**
		 * Run the following code in the browser console to create an instance and render it.
		 **/
		//window.library = new Books();
		//library.fetch()
		//library

		/*Create the library view passing it the populated collection*/
		//this.libraryView = new LibraryView({collection: window.library});

		/*Grab the container where were going to insert the view in the HTML.*/
		//var $container = $('#container');
		/*Empty it!*/
		//$container.empty();	
		/*Add the rendered view output!*/
		//$container.append(libraryView.render().el);		

	});
	
})(jQuery);