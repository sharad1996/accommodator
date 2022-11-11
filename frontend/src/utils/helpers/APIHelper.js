import { API_BASE_URL } from '../constants/APIConstants';
import _ from 'lodash';

export const requestToAPI = async (body, urlPath, method = 'GET') => {
  try {
    let resultData = null;
    let response = null;
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: getAccessToken(),
    };

    if (method === 'GET' || method === 'DELETE') {
      response = await fetch(`${API_BASE_URL}${urlPath}`, {
        method,
        headers,
      });
    } else {
      response = await fetch(`${API_BASE_URL}${urlPath}`, {
        method,
        headers,
        body: JSON.stringify(body),
      });
    }
    resultData = await response.json();
    if (!response.ok) {
      let msg = 'Some error occurred';
      if (_.has(resultData, 'message') && !_.isEmpty(resultData.message)) {
        msg = resultData.message;
      }
      throw new Error(msg);
    }
    return resultData;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  return `Bearer ${accessToken}`;
};
