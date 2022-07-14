import { useState  } from "react";
import FormComponent from "./FormComponent"
// const url = 'http://127.0.0.1:3001/api'
const url = 'http://127.0.0.1:3002/api'

const ListComponent = (props) => {

    const thisElement = props.data.filter(el =>  el._id === props.id)
    const thisElementArr = []
    Object.entries(thisElement[0]).map(el => thisElementArr.push(el))
    
    const [openDelete, setOpenUDelete] = useState(false);
    const [content, setContent] = useState(thisElement[0]);
    const [openUpdate, setOpenUpdate] = useState(false);

  // ITEM UPDATE
  const handleItemUpdate = async () => {
    try {
        const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(content)
    });
    if (res.status === 201) {
    setOpenUpdate(false)
    setContent(content)
    return res;
  } else {
    console.log("Some error occured " + res.status);
  }
} catch (err) {
    console.log("ERR!");
  console.log(err);
} 
}
 
// ITEM DELETE
    const handleItemDelete = async (elid) => {
    try {
      const res = await fetch(url, {
        method: "DELETE",      
        body: JSON.stringify(elid),
      });
      if (res.status === 200) {
        setOpenUDelete(false);
        return res;
      } else { console.log("Some error occured " + res.status); }
    } catch (err) { console.log(err); } 
  }

    return (
      <li className="bookListElement">
      {thisElement[0].author} <em>"{thisElement[0].title}"</em> ({thisElement[0].year})
     
      {openUpdate ? <div>
        <FormComponent props={content} setOpenUpdate={setOpenUpdate} handleItemUpdate={handleItemUpdate} />           
        <button onClick={() => handleItemUpdate(content)}>Update book data (your changes saving)</button> | <button onClick={() => setOpenUpdate(false)}>Close update panel</button></div> :  <div><button onClick={() => setOpenUpdate(true)}>Open update panel</button></div>}

        {openDelete ? <div>Do you want to delete this item? <button onClick={() => handleItemDelete(thisElement[0]['_id'])}>Delete</button> | <button onClick={() => setOpenUDelete(false)}>Close delete panel</button></div> :  <div><button onClick={() => setOpenUDelete(true)}>Open delete panel</button></div>}
        
      </li>
    )
  }

export default ListComponent;