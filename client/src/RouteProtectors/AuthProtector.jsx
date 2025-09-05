// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthProtector = ({ children }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem('userType')) {
//       navigate('/', { replace: true });
//     }
//   }, [navigate]);

//   return children;
// };

// export default AuthProtector;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthProtector = ({ children }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('userType')) {
      navigate('/', { replace: true });
    } else {
      setChecked(true);
    }
  }, [navigate]);

  if (!checked) return null; // or a loading spinner

  return children;
};

export default AuthProtector;