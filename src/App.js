import { useState, useEffect } from "react";
import ListComponent from "./ListComponent";
import FormComponent from "./FormComponent"
import "./App.css"

function App() {

  const jsondata = {
    "author": "Dante Alighieri",
    "country": "Italy",
    "imageLink": "images/the-divine-comedy.jpg",
    "language": "Italian",
    "link": "https://en.wikipedia.org/wiki/Divine_Comedy\n",
    "pages": 928,
    "title": "The Divine Comedy",
    "year": 1315
  }

  // const url = 'http://127.0.0.1:3002/api'
  const url = 'https://node.tdudkowski.usermd.net/api'

  const [data, setData] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [textareaAdd, setTextareaAdd] = useState("");
  
  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => setData(data))
   }, [data]);

  // ADD ITEM
  const handleItemCreate = async (e) => {
    e.preventDefault()

    if (textareaAdd && (typeof JSON.parse(textareaAdd) == "object")) {
      try {
        let res = await fetch(url, {
          method: "POST",      
          body: JSON.stringify(textareaAdd),
        })  
        if (res.status === 200) {
          setTextareaAdd("")
          setOpenAdd(false)
          return res;
        } else {
          console.log("Some error occured " + res.status);
        }
      } catch (err) {
        console.log(err);
      }
    }

    else {
           const newElement = { 
        "author":e.target[1].value,
        "country": e.target[2].value,
        "imageLink": e.target[3].value,
        "language": e.target[4].value,
        "link": e.target[5].value,
        "pages": e.target[6].value,
        "title": e.target[7].value,
        "year": e.target[8].value
      }
      try {
        let res = await fetch(url, {
          method: "POST",      
          body: JSON.stringify(newElement),
        })  
        if (res.status === 200) {
          setTextareaAdd("")
          setOpenAdd(false)
          return res;
        } else {
          console.log("Some error occured " + res.status);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="App">
      <h1>Book App</h1>

      <h2>About app</h2>

      <p>Final project in JS backend course <a href="https://www.megak.pl/">MegaK</a>. First working stage.</p>

<p>Simple CRUD fullstack book managing app. Slow develop type. Main plan is to make an app to manage lists of books & movies with notes, rank, progress status and other features. Second one is a Library app (Rental App to manage resources, and clients).</p>

<p>Main rules:</p>

<ul>
  <li>minimalism</li>
  <li>delayed optimisation</li>
  <li>as few techniques / libraries as possible, low code</li>
  <li>best practices, and standards, it's a learning experiment</li>
  <li>accessibility and usability</li>
  <li>documentation</li>
</ul>

<p>Stack, now:</p>

<ul>
  <li>Database: MongoDB (on my hosting at <a href="https://www.mydevil.net/">MyDevil.net</a>)</li>
  <li>Backend: Node.JS + mongodb and dotenv libraries (as above)</li>
  <li>Frontend: React + gh-pages on GitHub (<a href="https://github.com/tdudkowski/book-app/tree/main">repo</a>).</li>
</ul>
      
      <h2>Add a Book</h2>
      
      <p>Here one can add book both ways. Validation of input data isn't finished yet.</p>
      <ol>
        <li>Textarea: data should be a JSON formatted like items in book list in this page <a href="https://github.com/benoitvallon/100-best-books/blob/master/books.json">benoitvallon / 100-best-books</a>.<br />Example:
        
  <pre>{JSON.stringify(jsondata, null, 2)}</pre>
        </li>
        <li>Form with separate fields.</li>
      </ol>

{openAdd ? <div>
  <form onSubmit={(e) => handleItemCreate(e)}>
  <label><h3>Textarea</h3>
  <textarea  rows="10" cols="80" value={textareaAdd} onChange={(e) => setTextareaAdd(e.target.value)}></textarea>
  </label>
  <label><h3>Form</h3>
  <FormComponent openUpdateTrue />
  </label>
  <button type="submit">Add new book</button> | <button onClick={() => setOpenAdd(false)}>Close panel</button>
  </form></div> : <div><button onClick={() => setOpenAdd(true)}>Open panel to add a book</button></div>}
      

      <h2>Book List</h2>

      {data ?  <ul>
        {data.map(el => (<ListComponent key={el._id} id={el._id} data={data} />)) }
        </ul> : "not loaded yet"}

      <hr />
      <p>Tadeusz Dudkowski @ 2022. My homepage: <a href="https://dygresje.info/">dygresje.info</a></p>
      </div>
  );
}

export default App;
