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
		
		/*Same view as simpleView.js*/
		window.BookView = Backbone.View.extend({
		
				tagName: 'li',
				className: 'book',
				template: _.template($('#book-template').html()),
		
				initialize: function(){
					_.bindAll(this, 'render');
					this.model.bind('change', this.render);
					//this.template = _.template($('#album-template').html());
				},
				
				render: function(){
					var renderedContent = this.template(this.model.toJSON());
					$(this.el).html(renderedContent);
					return this;
				}
		});		
		
		/*Same view as simpleView.js but with added listener*/
		window.LibraryView = Backbone.View.extend({
			tagName: 'section',
			className: 'library',

			initialize: function(){
				_.bindAll(this, 'render');
				this.template = _.template($('#library-template').html());
				this.collection.bind('reset', this.render);
				/* We're also listening for add events to the collection */
				this.collection.bind('add', this.render);
			},
			
			render: function(){
				var $books, 
					collection = this.collection;
				$(this.el).html(this.template({}));
				$books = this.$(".books");
				collection.each(function(book){
					var view = new BookView({
						model: book, 
						collection: collection
					})
					$books.append(view.render().el);
				});
				return this;
			}			
		});


		/*
			Create an instance of our library to use in the router. 
		*/
		window.library = new Books();		
		
		/*
			Define a router to handle the laying out of our application components and hooking up with the data model.
			An application may have many routers handling different logically separated parts of the application.
		*/
		window.BackboneLibrary = Backbone.Router.extend({
			/*
				Declare the routes that this router will handle.
				Key value pairs, where '' is the default route, and map
				to functions declared in the Router.
			*/
			routes:{
				'':'home',
				'blank':'blank',
			},			

			/*
				When the router is created, populate the library and create an instance of its view.
			*/
			initialize: function(){
				window.library.fetch();
				//instantiate root level views, could be many of these!
				this.libraryView = new LibraryView({
					collection: window.library
				});
			},			
			
			/*
				This is run when we hit the '' route
			*/
			home: function(){
				/*Empty the container div in the HTML and populate with the rendered view content.*/
				var $container = $('#container');
				$container.empty();
				$container.append(this.libraryView.render().el);

			},
			
			/*
				Run when we hit our 'blank' route.
			*/
			blank: function(){
				var $container = $('#container');
				$container.empty();
				$container.append("Blank view");
			},			
			
		});		
		
		/*
			Create an instance of our Router and then call Backbone to start our Routers. 
		*/
		$(function(){
			/*
				We can also create the app with the following options
				window.App = new BackboneLibrary({pushState:true, root:"/backbonePres"});
				To enable restful URLs in the router, but the web server needs to be configured
				so all requests map to the root Backbone html file. 
			*/
			window.App = new BackboneLibrary();
			Backbone.history.start();
		})		
		
		/**
		 * Run the following code in the browser console to manipulate the data and observe the view changing.
		 **/		
		/*Add a title and check the view gets updated.*/
		//library.add({title:"test1",author:"test1"})		
		/*Modify a book in the collection and make sure the view updates*/
		//library.at(0).set({author:"Ray Parker, Jr", title:"Goat Rearing"})
		
		/*Navigate to <<serverUrl>>/sampleRouter.html#blank  and check that we hit our 'blank' route */
		/* Do it programatically using the Router object, we can control what gets put in the browsers history here too!*/
		//App.navigate('blank', {trigger: true})
		
		

	});
	
})(jQuery);	