import React from "react";

const ListGroup = ({ items, onItemSelect, textProperty, selectedItem }) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[textProperty]}
          onClick={() => onItemSelect(item)}
          className={
            selectedItem._id === item._id
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
