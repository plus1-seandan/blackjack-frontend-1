import axios from 'axios';

export const getMe = async () => {
  const { data } = await axios.get('http://localhost:8081/users', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  return data;
};
