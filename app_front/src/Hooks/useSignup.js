// import { useState } from "react";
// import { message } from "antd";
// import { useAuth } from "../Contexts/AuthContext.jsx";
// //import { post } from "../../../backend/routes/authRoute.js"



// const useSignup = () => {
//     const { login } = useAuth();
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(null);

//     const registerUser = async (values) => {
//         if (values.password !== values.passwordConfirm) {
//             return setError("Passwords are not the same");
//         }
//         try {
//             setError(null);
//             setLoading(false);
//             const res = await fetch('http://localhost:3003/api/auth/signup', {
//                 method: 'POST',
//                 body:  JSON.stringify(values),
                
//             });
//             const data = await res.json();
//             if (res.status === 201) {
//                 message.success(data.message);
//                 login(data.token, data.user);
//             } 
//             else if (res.status === 400) {
//                 setError(data.message );
//             } else {
//                 message.error( 'Registration failed');
//             }
//         } catch (error) {
            
//             message.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { loading, error, registerUser };
// };

// export default useSignup;



import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../Contexts/AuthContext";

const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirmation) {
      return setError("Passwords do not match");
    }

    try {
      setError(null);
      setLoading(true);

      const res = await fetch('http://localhost:3003/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 201) {
        message.success(data.message);
        login(data.token, data.user);
        return true; // Indicate success
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        message.error('Registration failed');
      }
    } catch (error) {
      message.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerUser };
};

export default useSignup;

