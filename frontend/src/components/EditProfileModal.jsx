import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useProfileContext } from '../Contexts/ProfileContext';

const EditProfileModal = () => {
  const { showEditModal, setShowEditModal, selectedProfile, updateProfile } = useProfileContext();
  const [editedProfile, setEditedProfile] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    city: '',
    email: ''
  });

  useEffect(() => {
    if (selectedProfile) {
      setEditedProfile({
        firstName: selectedProfile.firstName,
        lastName: selectedProfile.lastName,
        address: selectedProfile.address,
        phone: selectedProfile.phone,
        city: selectedProfile.city,
        email: selectedProfile.email
      });
    }
  }, [selectedProfile]);

  const handleChange = e => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    updateProfile(selectedProfile._id, editedProfile);
    setShowEditModal(false);
  };

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier le Profil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label>Prénom</Form.Label>
            <Form.Control type="text" name="firstName" value={editedProfile.firstName} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="lastName" value={editedProfile.lastName} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Adresse</Form.Label>
            <Form.Control type="text" name="address" value={editedProfile.address} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control type="text" name="phone" value={editedProfile.phone} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label>Ville</Form.Label>
            <Form.Control type="text" name="city" value={editedProfile.city} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={editedProfile.email} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>Fermer</Button>
        <Button variant="primary" onClick={handleSubmit}>Enregistrer</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
