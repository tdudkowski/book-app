
import { useState  } from "react";

// const url = 'http://127.0.0.1:3001/api'
const url = 'https://node.tdudkowski.usermd.net/api'

const ListComponent = (props) => {


    const thisElement = props.data.filter(el =>  el._id === props.id)
    const thisElementArr = []
    Object.entries(thisElement[0]).map(el => thisElementArr.push(el))

    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenUDelete] = useState(false);
    const [content, setContent] = useState(thisElement[0]);

    // INPUT CHANGE
    const handleInputChange = (e, id) => {
        const keyname = Object.keys(content)[id]
        content[keyname] = e.target.value
        setContent(content)
        console.log(content)
            }

    // ITEM UPDATE
    const handleItemUpdate = async () => {
    try {
        const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(content)
    });
    if (res.status === 201) {
    setOpenUpdate(false)
    console.log(res.body)
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
      <li>
      {thisElement[0].author} "<em>{thisElement[0].title}</em>" ({thisElement[0].year})
      
      {openUpdate ? <div>
                <ul>
                    {Object.entries(thisElement[0]).map((el, id) =>  <li key={id}><em>{el[0]}: </em> <input defaultValue={el[1]} editable="true" onChange={(e) => handleInputChange(e, id)} /></li>)}
                </ul>
        <button onClick={() => handleItemUpdate(content)}>Update</button> | <button onClick={() => setOpenUpdate(false)}>Close update</button></div> :  <div><button onClick={() => setOpenUpdate(true)}>Show update</button></div>}

        {openDelete ? <div>Do you want to delete this item? <button onClick={() => handleItemDelete(thisElement[0]['_id'])}>Delete</button> | <button onClick={() => setOpenUDelete(false)}>Close delete</button></div> :  <div><button onClick={() => setOpenUDelete(true)}>Show delete</button></div>}
      </li>
    )
  }

export default ListComponent;