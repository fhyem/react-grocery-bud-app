import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [{ id: new Date().getTime().toString(), title: "" }];
  }
};

function App() {
  const [input, setInput] = useState("");
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      // Set the alert for not having any setInput
      showAlert(true, "danger", "Please enter value");
    } else if (input && isEditing) {
      // set the edit functionality
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: input };
          }
          return item;
        })
      );
      setInput("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "value Edited");
    } else {
      // set the submit function to the List and show alert
      showAlert(true, "success", "item added to the List");
      const newItem = { id: new Date().getTime().toString(), title: input };

      setList([...list, newItem]);
      setInput("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setInput(specificItem.title);
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
