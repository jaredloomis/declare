import React from 'react';
import { HiPencil } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';

interface DropdownProps {
  children: React.ReactNode;
  edit: React.ReactNode;
}

export function Dropdown({ children, edit: editElement }: DropdownProps) {
  const [editing, setEditing] = React.useState(false);
  const loc = useLocation();

  return (
    <div>
      {!editing && children}
      {editing && editElement}
      {!editing && (
        <a href={'#' + loc.pathname} onClick={() => setEditing(true)}>
          <HiPencil />
        </a>
      )}
      {editing && (
        <a href={'#' + loc.pathname} onClick={() => setEditing(false)}>
          Save
        </a>
      )}
    </div>
  );
}
