Project Personal Library using Advanced Node Express Chai MongoDB Mongoose

I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id.
I can get /api/books to retrieve an aray of all books containing title, _id, & commentcount.
I can get /api/books/{_id} to retrieve a single object of a book containing title, _id, & an array of comments (empty array if no comments present).
I can post a comment to /api/books/{_id} to add a comment to a book and returned will be the books object similar to get /api/books/{_id}.
I can delete /api/books/{_id} to delete a book from the collection. Returned will be 'delete successful' if successful.
If I try to request a book that doesn't exist I will get a 'no book exists' message.
I can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.

