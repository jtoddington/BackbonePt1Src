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
		
		//Views replace controllers in some respects
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
		
		window.LibraryView = Backbone.View.extend({
			tagName: 'section',
			className: 'library',

			initialize: function(){
				_.bindAll(this, 'render');
				this.template = _.template($('#library-template').html());
				this.collection.bind('reset', this.render);
			},
			
			render: function(){
				//iterate over each album
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
		

		//window.library = new Books(); //can instantiate with data here too!
		//library.fetch()
		//library

		//this.libraryView = new LibraryView({collection: window.library});

		//var $container = $('#container');
		//$container.empty();	
		//$container.append(libraryView.render().el);		

	});
	
})(jQuery);