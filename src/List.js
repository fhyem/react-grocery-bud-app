import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ item, onEdit }) => {
  return (
    <div className="grocery-container">
      <div className="grocery-list">
        <article className="grocery-item">
          <p className="title">{item}</p>
          <div className="btn-container">
            <button
              type="button"
              className="edit-btn"
              onClick={() => onEdit(item)}>
              <FaEdit />
            </button>
            <button type="button" className="delete-btn">
              <FaTrash />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default List;
