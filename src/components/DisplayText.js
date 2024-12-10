import "../App.css";

function DisplayText(props) {
  const delete_item = () => {
    const result = window.confirm("Are you sure you want to delete this item?");
    if (result) {
      props.handleDelete(props.index);
    }
  };

  return (
    <div className="simpleCard" key={props.index}>
      {/* Render the text of the item */}
      <p>{props.item.text}</p>
      {/* Render the timestamp in a readable format */}
      <small className="text-muted">
        Added on: {new Date(props.item.timestamp).toLocaleString()}
      </small>
      <div className="buttons">
        {/* Edit button */}
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            props.openModel(props.index);
          }}
        >
          Edit
        </button>
        {/* Delete button */}
        <button
          type="button"
          className="btn btn-danger mx-2"
          onClick={delete_item}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DisplayText;
