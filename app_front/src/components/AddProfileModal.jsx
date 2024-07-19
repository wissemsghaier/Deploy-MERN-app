import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useProfileContext } from "../Contexts/ProfileContext";

const AddProfileModal = () => {
  const { addProfile, showAddModal, setShowAddModal } = useProfileContext();
  const [newProfile, setNewProfile] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    city: '',
    email: ''
  });

  const handleChange = e => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    addProfile(newProfile);
    setNewProfile({
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      city: '',
      email: ''
    });
    setShowAddModal(false);
  };

  return (
    <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un Profil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label>Prénom</Form.Label>
            <Form.Control type="text" name="firstName" value={newProfile.firstName} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="lastName" value={newProfile.lastName} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Adresse</Form.Label>
            <Form.Control type="text" name="address" value={newProfile.address} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control type="text" name="phone" value={newProfile.phone} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label>Ville</Form.Label>
            <Form.Control type="text" name="city" value={newProfile.city} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={newProfile.email} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowAddModal(false)}>Fermer</Button>
        <Button variant="primary" onClick={handleSubmit}>Ajouter</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProfileModal;
