import axios from 'axios';

export const getMe = async () => {
  const { data } = await axios.get(
    `http://${process.env.REACT_APP_SERVER_URL}/users`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  );
  return data;
};

export const getPlayerInfo = async () => {
  const { data } = await axios.get(
    `http://${process.env.REACT_APP_SERVER_URL}/users/infos`,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  );
  return data;
};
