import React from "react";
import "./card.css";
import UserIcon from "./UserIcon";
import { LuMoreHorizontal } from "react-icons/lu";
import { getPriorityIcon, getStatusIcon } from "./utils/helper.jsx";

function Card({ ticket, userData, hideStatusIcon, hideProfileIcon }) {
  return (
    <div className="custom-card">
      <div className="card-header">
        <div className="ticket-id">{ticket.id}</div>
        {hideProfileIcon ? null : (
          <UserIcon name={userData.name} available={userData.available} />
        )}
      </div>
      <div className="card-body">
        {hideStatusIcon ? null : getStatusIcon(ticket.status)}
        <div className="title">{ticket.title}</div>
      </div>
      <div className="card-footer">
        <div className="more-icon-container">
          <LuMoreHorizontal color="#797d84" />
        </div>
        {ticket.tag.map((t) => (
          <div key={t} className="tag-container">
            <div className="tag-icon"></div>
            <div className="tag-text">{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
