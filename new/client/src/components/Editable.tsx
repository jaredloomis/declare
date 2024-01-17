import React from 'react';
import { HiPencil } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';

interface EditableProps {
  children: React.ReactNode;
  edit: React.ReactNode;
}

export function Editable({ children, edit }: EditableProps) {
  const [editing, setEditing] = React.useState(false);
  const loc = useLocation();

  return (
    <div>
      {!editing && children}
      {editing && edit}
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
