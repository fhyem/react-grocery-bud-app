import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [input, setInput] = useState("");
  const [alert, setAlert] = useState(false);
  // const [success, setSuccess] = useState(false);
  // const [danger, setDanger] = useState(false);
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      const items = [...input];
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
      setList((item) => {
        return [...item, items];
      });

      setInput("");
    } else {
      return null;
    }
  };

  const handleEdit = (item) => {
    // const string = list.filter((i) => i === item);
    setInput((item) => {
      return [...item, item];
    });
    console.log(item);
  };
  return (
    <section className="section-center">
      <form className="grocery-form">
        {alert ? <Alert alert={alert} /> : null}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            onChange={(e) => setInput(e.target.value)}
            value={input}></input>
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
      {list.map((item, index) => (
        <List key={index} item={item} onEdit={() => handleEdit(item)} />
      ))}
    </section>
  );
}

export default App;
