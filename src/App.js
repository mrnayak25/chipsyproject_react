

import { useEffect, useRef, useState } from 'react';
import './App.css';
import AddText from './components/AddText';
import DisplayText from './components/DisplayText';

function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, [items]);
  const ref=useRef(null);
  const store = () => {
    if (text.trim() !== "") {
      setItems([...items, text]);
      localStorage.setItem("items", JSON.stringify([...items, text]));
      setText('');
    }
  };
  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    console.log(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  }
  const handleUpdate =(index)=>{
    ref.current.click();

  }
  const onChange =(e)=>{
    setText(e.target.value)
  }
  return (
    <>
    <h1 style={{textAlign:'center'}}>To-Do-List</h1>
    <AddText store={store} text={text} setText={setText} />
    <div className='row my-4'>
    {items.map((item, index) => (
   <DisplayText item={item} index={index} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
   ))}
   
   <button ref ={ref} type="button" className="btn btn-primary btn-lg d-none" data-bs-toggle="modal" data-bs-target="#modalId"> Launch </button>

<div className="modal fade" id="modalId" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
<div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document" >
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="modalTitleId"> Updating Note </h5>
      <button  type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
    </div>
      <label htmlFor="desc" className="form-label mx-3">Your Note</label>
      <input type="text" className="form-control mx-3"id="desc" name='desc' onChange={onChange} value={text}/>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> Close </button>
      <button type="button" className="btn btn-primary">Upadte Note</button>
    </div>
  </div>
</div>
</div>
   </div>
    </>
  );
}

export default App;
