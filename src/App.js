// App.js
import { useEffect, useRef, useState } from 'react';
import './App.css';
import AddText from './components/AddText';
import DisplayText from './components/DisplayText';

function App() {
  const [text, setText] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [items, setItems] = useState([]);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [filterText, setFilterText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const store = () => {
    if (text.trim() !== '') {
      const newItem = {
        text: text,
        timestamp: new Date().toISOString(),
      };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      localStorage.setItem('items', JSON.stringify(updatedItems));
      setText('');
    }
  };

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(newItems));
    setItems(newItems);
  };

  const openModel = (index) => {
    setUpdateText(items[index].text);
    setUpdateIndex(index);
    ref.current.click();
  };

  const handleUpdate = (updatedText) => {
    const newItems = [...items];
    newItems[updateIndex] = {
      ...newItems[updateIndex],
      text: updatedText,
    };
    localStorage.setItem('items', JSON.stringify(newItems));
    setItems(newItems);
    setUpdateText('');
    closeModal();
  };

  const closeModal = () => {
    const modal = document.getElementById('modalId');
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    const backdrop = document.getElementsByClassName('modal-backdrop')[0];
    if (backdrop) {
      backdrop.parentNode.removeChild(backdrop);
    }
  };

  const handleSort = (option) => {
    let sortedItems;
    if (option === 'alphabetical') {
      sortedItems = [...items].sort((a, b) => a.text.localeCompare(b.text));
    } else if (option === 'time') {
      sortedItems = [...items].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }
    setItems(sortedItems);
    setSortOption(option);
  };

  const filteredItems = items.filter((item) =>
    item.text.toLowerCase().includes(filterText.toLowerCase())
  );

  const onChange = (e) => {
    setUpdateText(e.target.value);
  };

  return (
    <>
      <h1 className='text-center text-5xl font-extrabold mt-2'>To-Do List</h1>
      <AddText store={store} text={text} setText={setText} />
      <div className="my-2 align-middle">
        <div className=' mx-5 flex justify-between'>
        <h1 className="text-3xl font-bold">Your Notes</h1>
        <div className="flex items-center relative">
          <input
            type="text"
            placeholder="Search"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="form-control mr-2 "
          />
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="my-auto p-2 me-5 rounded-lg hover:bg-gray-200"
            >
              <i class="fa-solid fa-filter "></i>
            </button>
            {isMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-52 ring-1 ring-black  bg-white shadow-2xl rounded-md z-10"
              >
                <div className='flex justify-between mx-3 mt-2 align-middle'>
                  <p className='font-bold text-xl '>Filter</p>
                  <i class="fa-solid fa-x text-lg text-red-700"></i>
                </div>
                <div className='space-y-2 my-2'>
                <button
                  onClick={() => handleSort("alphabetical")}
                  className="w-full text-left px-4 py-2  hover:bg-gray-100"
                ><div className='flex justify-between align-middle'>
                  <p className='text-xl'>Sort Alphabetically</p> <i class="fa-solid fa-arrow-down"></i></div>
                </button>
                <button
                  onClick={() => handleSort("time")}
                  className="w-full text-left px-4 py-2  hover:bg-gray-100"
                ><div className='flex justify-between  align-middle'>
                  <p className='text-xl'>Sort by Time</p> <i class="fa-solid fa-arrow-down"></i></div>
                </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='row'>
        {filteredItems.map((item, index) => (
          <DisplayText
            key={index}
            item={item}
            index={index}
            handleDelete={handleDelete}
            openModel={openModel}
          />
        ))}
</div>
        {/* <button
          ref={ref}
          type="button"
          className="btn btn-primary btn-lg d-none"
          data-bs-toggle="modal"
          data-bs-target="#modalId"
        >
          Launch
        </button> */}

        <div
          className="modal fade"
          id="modalId"
          tabIndex="-1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="modalTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalTitleId">
                  Updating Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <label htmlFor="desc" className="form-label mx-3">
                Your Note
              </label>
              <input
                type="text"
                className="form-control mx-3"
                id="desc"
                name="desc"
                onChange={onChange}
                value={updateText}
              />
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleUpdate(updateText)}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
