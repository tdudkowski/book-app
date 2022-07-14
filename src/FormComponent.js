import { useState  } from "react";

const FormComponent = (props) => {

const starter =  [ {
    "author": "",
    "country": "",
    "imageLink": "",
    "language": "",
    "link": "",
    "pages": "",
    "title": "",
    "year": ""
  }]

let source;
props.props ? source = props.props : source = starter[0];
const [content, setContent] = useState(source);

   // INPUT CHANGE
   const handleInputChange = (e, id) => {
    const keyname = Object.keys(content)[id+1]
    content[keyname] = e.target.value
    setContent(content)
        }

 return (
      <ul>
        {Object.entries(source)
               .filter(el => el[0] !== "_id")
               .map((el, id) =>  <li key={id}><em>{el[0]}: </em> <input defaultValue={el[1]} editable="true" onChange={(e) => handleInputChange(e, id)} /></li>)}
        </ul>)

}

export default FormComponent;