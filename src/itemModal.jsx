import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    maxWidth: "400px",
    width: "100%",
  },
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  backgroundColor: "#007BFF",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const labelStyle = {
  fontWeight: "bold",
  marginBottom: "5px",
  display: "block",
};

const ItemModal = ({ isOpen, closeModal, item, initialX, initialY, onSave }) => {
  const [text, setText] = useState(item?.text || "");
  const [x, setX] = useState(item?.x || initialX);
  const [y, setY] = useState(item?.y || initialY);
  const [fontSize, setFontSize] = useState(item?.fontSize || "16px");
  const [fontWeight, setFontWeight] = useState(item?.fontWeight || "normal");

  const handleSave = () => {
    onSave({ text, x, y, fontSize, fontWeight });
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit Item"
    >
      <h2>Edit Item</h2>
      <div>
        <label htmlFor="text" style={labelStyle}>Text:</label>
        <input
          type="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="x" style={labelStyle}>X:</label>
        <input
          type="number"
          id="x"
          value={x}
          onChange={(e) => setX(parseInt(e.target.value))}
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="y" style={labelStyle}>Y:</label>
        <input
          type="number"
          id="y"
          value={y}
          onChange={(e) => setY(parseInt(e.target.value))}
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="fontSize" style={labelStyle}>Font Size:</label>
        <input
          type="text"
          id="fontSize"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="fontWeight" style={labelStyle}>Font Weight:</label>
        <input
          type="text"
          id="fontWeight"
          value={fontWeight}
          onChange={(e) => setFontWeight(e.target.value)}
          style={inputStyle}
        />
      </div>
      <button onClick={handleSave} style={buttonStyle}>Save Changes</button>
    </Modal>
  );
};

export default ItemModal;
