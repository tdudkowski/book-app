# Book app README

## About app

Final project in JS backend course [MegaK](https://www.megak.pl/). First working stage.

Simple CRUD fullstack book managing app. Slow develop type. Main plan is to make an app to manage lists of books & movies with notes, rank, progress status and other features. Second one is a Library app (Rental App to manage resources, and clients).

Main rules:

- minimalism
- delayed optimization
- as few techniques / libraries as possible, low code
- best practices, and standards, it's a learning experiment
- accessibility and usability
- documentation

Stack, now:

- Database: MongoDB (on my hosting at [MyDevil.net](https://www.mydevil.net/))
- Backend: Node.JS + mongodb and dotenv libraries (same as above)
- Frontend: React + gh-pages on GitHub ([Live Demo](https://tdudkowski.github.io/book-app/)).

## HOWTO

One can add book both ways. Validation of input data isn't finished yet.

1. Textarea, data should be in proper JSON format as presented on the example, and the GH site [benoitvallon / 100-best-books](https://github.com/benoitvallon/100-best-books/blob/master/books.json).
2. Form with separate fields.

All items can be edited and deleted, changes are implemented immediately.

## TODO

- TypeScript
- Testing
- Correct data input with validation
- Search
- Notes