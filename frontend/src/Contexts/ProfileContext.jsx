// // src/contexts/ProfileContext.jsx
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';

// const ProfileContext = createContext();

// export const ProfileProvider = ({ children }) => {
//   const [profiles, setProfiles] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedProfile, setSelectedProfile] = useState(null);

//   useEffect(() => {
//     fetchProfiles();
//   }, []);

//   const fetchProfiles = async () => {
//     try {
//       const response = await axios.get('/api/auth/profiles');
//       setProfiles(response.data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des profils:', error);
//     }
//   };

//   const addProfile = async (newProfile) => {
//     try {
//       await axios.post('/api/auth/profiles', newProfile);
//       fetchProfiles();
//     } catch (error) {
//       console.error('Erreur lors de l\'ajout du profil:', error);
//     }
//   };

//   const updateProfile = async (id, updatedProfile) => {
//     try {
//       await axios.put(`/api/auth/profiles/${id}`, updatedProfile);
//       fetchProfiles();
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du profil:', error);
//     }
//   };

//   const deleteProfile = async (id) => {
//     try {
//       await axios.delete(`/api/auth/profiles/${id}`);
//       fetchProfiles();
//     } catch (error) {
//       console.error('Erreur lors de la suppression du profil:', error);
//     }
//   };

//   return (
//     <ProfileContext.Provider
//       value={{
//         profiles,
//         showAddModal,
//         setShowAddModal,
//         showEditModal,
//         setShowEditModal,
//         selectedProfile,
//         setSelectedProfile,
//         addProfile,
//         updateProfile,
//         deleteProfile
//       }}
//     >
//       {children}
//     </ProfileContext.Provider>
//   );
// };

// export const useProfileContext = () => useContext(ProfileContext);

// export default ProfileContext;







import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('/api/auth/profiles');
      setProfiles(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des profils:', error);
    }
  };

  const addProfile = async (newProfile) => {
    try {
      await axios.post('/api/auth/profiles', newProfile);
      fetchProfiles();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du profil:', error);
    }
  };

  const updateProfile = async (id, updatedProfile) => {
    try {
      await axios.put(`/api/auth/profiles/${id}`, updatedProfile);
      fetchProfiles();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
  };

  const deleteProfile = async (id) => {
    try {
      await axios.delete(`/api/auth/profiles/${id}`);
      fetchProfiles();
    } catch (error) {
      console.error('Erreur lors de la suppression du profil:', error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        showAddModal,
        setShowAddModal,
        showEditModal,
        setShowEditModal,
        selectedProfile,
        setSelectedProfile,
        addProfile,
        updateProfile,
        deleteProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);

export default ProfileContext;
