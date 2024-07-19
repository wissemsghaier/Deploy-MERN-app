
import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../Contexts/AuthContext";

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    

    try {
      setError(null);
      setLoading(true);

      const res = await fetch('http://localhost:3003/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) {
        message.success(data.message);
        login(data.token, data.user);
        return true; // Indicate success
      } else if (res.status === 404) {
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

  return { loading, error, loginUser };
};

export default useLogin;