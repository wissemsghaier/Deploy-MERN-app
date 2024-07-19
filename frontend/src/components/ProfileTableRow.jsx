import React from 'react';
import { Button } from 'react-bootstrap';

const ProfileTableRow = ({ profile, handleEdit, handleDelete }) => {
  return (
    <tr key={profile._id}>
      <td>{profile.lastName}</td>
      <td>{profile.firstName}</td>
      <td>{profile.address}</td>
      <td>{profile.phone}</td>
      <td>{profile.city}</td>
      <td>{profile.email}</td>
      <td>
        <Button variant="info" onClick={() => handleEdit(profile)}>Modifier</Button>{' '}
        <Button variant="danger" onClick={() => handleDelete(profile._id)}>Supprimer</Button>
      </td>
    </tr>
  );
};

export default ProfileTableRow;
