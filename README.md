# JavaScript Record Company

We're going to use JavaScript to create an application that will allow a record company to manage their artists and albums. 

## Main page (dashboard)

This page will show the 'Dashboard' for a specific record company. It will contain a list of Artists and Albums. 

The Record Company *may* have one or more Artists.

The Record Company *may* have one or more Albums.

An Artist *may* have played on one or more albums.

An Album *must* have one or more Artists.

## Artist management

1. A User can add an Artist with a name and description. After creation the Artist name will be shown in the list of artists.
2. A User can delete a a specific Artist from the list of artists.
3. A User can show or hide each Artist's details (description and a list of all the Albums the artist has played on).
4. A User can add Albums that an Artist has played on within each Artist's detail view.

## Album management

1. A User can create an Album with a name, band name, and year released. After creation the Album name will be shown in the list of Albums.
2. A User can delete a specific Album from the list of albums.
3. A User can show or hide each Album's details (band name, year released, and a list of all Artists on the album).

## Technical constraints

* Use JavaScript classes to represent the Record Company, Artists, and Albums.

* All classes and functions should be namespaced under 'RCApp'.

* Individual Albums and Artists should *not* have event handlers for show, hide, and delete. The handlers should be attached to the appropriate lists.

* Individual Artists *may* have event handlers for selecting which albums they have played on.

* No inline event handlers in the HTML.

* JavaScript tags must be in the head of the document (use `window.onload`).

* Each Artist and Album list element *must* have a unique `id`.

* Not much styling is required, but knock yourself out if you'd like.

* Don't reference any hard-coded values in your JavaScript classes to identify an element.

* Use CSS classes to hide or show individual Artist or Albums.
