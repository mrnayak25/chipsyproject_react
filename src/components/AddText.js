//AddText.js

function AddText(props) {
  
  const onchange = (e) => {
    props.setText(e.target.value);
  };
  const clearText = () => {
    props.setText('');
  };

  return (
    <div className="mx-5 my-5">
      <h1 className="font-bold text-3xl">Add Notes</h1>
      <textarea
        id="textbox"
        className="form-control my-3"
        value={props.text}
        type="text"
        placeholder="Enter Your Text"
        aria-label="default input example"
        onChange={onchange}
      />
      <div className="my-3">
        <button type="button" className="btn btn-primary" onClick={props.store}>
          Add
        </button>
        <button
          type="button"
          className="btn btn-secondary mx-5"
          onClick={clearText}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default AddText;
