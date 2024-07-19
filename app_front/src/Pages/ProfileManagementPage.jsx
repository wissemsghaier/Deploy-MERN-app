// // src/components/ProfileManagementPage.jsx
// import React, { useContext, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import ProfileContext, { useProfileContext } from '../Contexts/ProfileContext';
// import ProfileList from '../components/ProfileList';
// import AddProfileModal from '../components/AddProfileModal';
// import EditProfileModal from '../components/EditProfileModal';

// const ProfileManagementPage = () => {
//   const { profiles, fetchProfiles, setShowAddModal } = useProfileContext();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProfiles();
//   }, []);

//   return (
//     <div>
//       <Button variant="primary" onClick={() => setShowAddModal(true)}>Ajouter un Profil</Button>
//       <ProfileList profiles={profiles} />
//       <AddProfileModal />
//       <EditProfileModal />
//     </div>
//   );
// };

// export default ProfileManagementPage;





import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useProfileContext } from '../Contexts/ProfileContext';
import ProfileList from '../components/ProfileList';
import AddProfileModal from '../components/AddProfileModal';
import EditProfileModal from '../components/EditProfileModal';

const ProfileManagementPage = () => {
  const { profiles, fetchProfiles, setShowAddModal } = useProfileContext();

  useEffect(() => {
    try {
      fetchProfiles();
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  }, []);

  const handleAddProfileClick = () => {
    try {
      setShowAddModal(true);
    } catch (error) {
      console.error('Error setting show add modal:', error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleAddProfileClick}>Ajouter un Profil</Button>
      <ProfileList />
      <AddProfileModal />
      <EditProfileModal />
    </div>
  );
};

export default ProfileManagementPage;


