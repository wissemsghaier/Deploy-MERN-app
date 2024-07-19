import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useProfileContext } from "../Contexts/ProfileContext";

const ProfileList = () => {
  const { profiles, deleteProfile, setSelectedProfile } = useProfileContext();

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Adresse</th>
          <th>Téléphone</th>
          <th>Ville</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {profiles.map(profile => (
          <tr key={profile._id}>
            <td>{profile.lastName}</td>
            <td>{profile.firstName}</td>
            <td>{profile.address}</td>
            <td>{profile.phone}</td>
            <td>{profile.city}</td>
            <td>{profile.email}</td>
            <td>
              <Button variant="info" onClick={() => setSelectedProfile(profile)}>Modifier</Button>{' '}
              <Button variant="danger" onClick={() => deleteProfile(profile._id)}>Supprimer</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProfileList;
