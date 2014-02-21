# Javascript Record Company
We're going to use JavaScript to create an application that will allow
a record company to manage their artists and albums. 

## Main Page (Dashboard)
This page will show the 'Dashboard' for a specific record company. It will contain a list of Artists and Albums. 

The Record Company *may* have one or more of Artists.

The Record Company *may* have one or more of Albums.

An Artist *may* have played on one or more albums.

An Album *must* have one or more Artists.



## Artist management
1. A User can create an Artist with a name and description. This Artist's name will be added to the companies list of artists after creation. 
2. A User can delete a a specific Artist from the list of artists.
3. A User can show or hide each Artist's details, name, description and a list of all the Albums the artist has played on.
4. A User can select an Album that the Artist has played on in the Artist detailed view.

## Album management

1. A User can create an Album with a name, band name and year released. After creation the Album name will be shown in the list of Albums.
2. A User can delete a specific Album from the list of albums.
3. A User can show or hide a details view of an album.

## Technical Constraints.
* Use javascript classes to represent a Record Company, Artist and Album.

* Make sure everything is namespaced under 'RCApp'.

* Event handlers for Album/Artist show, hide and delete should be set 
 their respective lists.

* The Album selection handler *may* be attached to a specific instance of an Artist class.

* No inline event handlers.

* Javascript tags must be in the head of the document, _use window.onload_.

* Each Artist and Album list element *must* have an id.

* Each list item, for a specific artist or album, *must* have a unique id.

* Not much styling is required, but knock yourself out if you'd like.

* Don't reference any hard coded values in your javascript classes to identify an element.

* Use CSS classes to hide or show individual Artist or Albums.




