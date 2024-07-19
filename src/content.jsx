import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faServer } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import ItemModal from "./itemModal";

const menuItems = [
  { title: "Label", icon: faServer },
  { title: "Input", icon: faServer },
  { title: "Button", icon: faServer },
];

const Content = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && selectedItem) {
        setModalIsOpen(true);
      }
      if (event.key === "Delete" && selectedItem) {
        handleDeleteItem(selectedItem);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  const handleDeleteItem = (itemToDelete) => {
    const updatedItems = droppedItems.filter((item) => item !== itemToDelete);
    setDroppedItems(updatedItems);
    setSelectedItem(null);
  };

  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        const x = offset.x;
        const y = offset.y;
        const newItem = { ...item, x, y };
        setDroppedItems((prevItems) => [...prevItems, newItem]);
        setSelectedItem(newItem);
        setModalPosition({ x, y });
        setModalIsOpen(true);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  const handleSaveModal = ({ text, x, y, fontSize, fontWeight }) => {
    const updatedItems = droppedItems.map((item) =>
      item.title === selectedItem.title
        ? { ...item, text, x, y, fontSize, fontWeight }
        : item
    );
    setDroppedItems(updatedItems);
  };

  return (
    <div
      ref={drop}
      className={"content"}
      style={{
        backgroundColor: isOver ? "lightgreen" : "white",
        border: "2px dashed #ccc",
        minHeight: "100vh",
        padding: "10px",
        position: "relative",
      }}
    //   onClick={() => setSelectedItem(null)}
    >
      
      {droppedItems.map((item, index) => (
        <div
          key={index}
          className="dropped-item"
          style={{
            position: "absolute",
            left: item.x,
            top: item.y,
            backgroundColor: selectedItem === item ? "lightblue" : "white",
            border: selectedItem === item ? "2px solid red" : "none",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            cursor: "move",
            zIndex: 10,
          }}
        //   onClick={(e) => {
        //     e.stopPropagation();
        //     setSelectedItem(item);
        //   }}
        onClick={() => {
            setSelectedItem(item);
            setModalIsOpen(true);
          }}
        >
          <FontAwesomeIcon
            className={"sidebar__icon"}
            icon={menuItems.find((menuItem) => menuItem.title === item.title).icon}
          />
          <span>{item.text || item.title}</span>
        </div>
      ))}

      {/* Modal for editing items */}
      {selectedItem && (
        <ItemModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          item={selectedItem}
          initialX={modalPosition.x}
          initialY={modalPosition.y}
          onSave={handleSaveModal}
        />
      )}
    </div>
  );
};

export default Content;
