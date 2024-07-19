import React, { useState } from "react";
import { useDrag } from "react-dnd";
// import { CSSTransition } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";

const menuItems = [
  { title: "Label", icon: faServer },
  { title: "Input", icon: faServer },
  { title: "Button", icon: faServer },
];

const DraggableItem = ({ item }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "ITEM",
      item: { title: item.title },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
        <div
          ref={drag}
          className={cx("sidebar__listItem", { dragging: isDragging })}
          style={{ opacity: isDragging ? 0.5 : 1 }}
        >
          <FontAwesomeIcon className={"sidebar__icon"} icon={item.icon} />
          <CSSTransition
            in={true}
            timeout={200}
            classNames={"fade"}
            unmountOnExit
          >
            <span>{item.title}</span>
          </CSSTransition>
        </div>
      );
    };
    
    const Sidebar = () => {
      const [isOpen, setIsOpen] = useState(true);
    
      return (
        <div className={cx("sidebar", { "sidebar-closed": !isOpen })}>
          <button className={"sidebar__button"} onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
            <span className="blocks">BLOCKS</span>
          <ul>
            {menuItems.map((item) => (
              <li key={item.title}>
                <DraggableItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      );
    };

export default Sidebar;
