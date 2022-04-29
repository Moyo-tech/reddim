import axios from 'axios';
import backendUrl from '../backendUrl';
import { token } from './auth';

const baseUrl = `${backendUrl}/api/reddim/users`;

// eslint-disable-next-line
const setConfig = () => {
    return {
        headers: { 'x-auth-token': token },
    };
};

const getUser = async(username, limit, page) => {
    const response = await axios.get(
        `${baseUrl}/${username}/?limit=${limit}&page=${page}`
    );
    return response.data;
};

const userService = { getUser };

export default userService;