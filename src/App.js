import { useState, useEffect } from "react";
import ListComponent from "./ListComponent";

function App() {

  // const url = 'http://127.0.0.1:3001/api'
  const url = 'http://node.tdudkowski.usermd.net/api'

  const [data, setData] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [textareaAdd, setTextareaAdd] = useState("");

  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => setData(data))
   }, [data]);

  // ADD
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
  }

  return (
    <div className="App">
      <h1>Book App</h1>
      
      <h2>Add a Book</h2>
      
      <p>Here add a book</p>

{openAdd ? <div>
  <form onSubmit={(e) => handleItemCreate(e)}>
  <textarea  rows="10" cols="80" value={textareaAdd} onChange={(e) => setTextareaAdd(e.target.value)}></textarea>
  <hr />
  <button type="submit" onClick={(e) => console.log(textareaAdd)}>Add</button> | <button onClick={() => setOpenAdd(false)}>Close add a book</button>
  </form></div> : <div><button onClick={() => setOpenAdd(true)}>Open to add a book</button></div>}
      

      <h2>Book List</h2>

      {data ?  <ul>
        {data.map(el => (<ListComponent key={el._id} id={el._id} data={data} />)) }
        </ul> : "not loaded yet"}
      
      </div>
  );
}

export default App;
