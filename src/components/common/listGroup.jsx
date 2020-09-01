import React from "react";

const ListGroup = ({
  items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem,
}) => {
  return items.map((item) => (
    <ul className="list-group">
      <li
        key={item[valueProperty]}
        onClick={() => onItemSelect(item)}
        className={
          selectedItem._id === item._id
            ? "list-group-item active"
            : "list-group-item"
        }
      >
        {item[textProperty]}
      </li>
    </ul>
  ));
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
