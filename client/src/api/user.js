import axios from './axios';


export const register = async (registerData) => {
    try {
        const {data: {msg}, status} = await axios.get('/user/register', registerData);

        return msg;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to let the component handle it
    }
};

export const login = async (identifier, password) => {
    try {
        const {data, status} = await axios.get('/user/login', {identifier, password});
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to let the component handle it
    }
};

export const refreshToken = async () => {
    try {
        const {data, status} = await axios.get('/user/refresh');
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to let the component handle it
    }
};

export const logout = async () => {
    try {
        const {data, status} = await axios.get('/user/login');
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to let the component handle it
    }
};

export const generateOTP = async (email) => {
    try {
        const {data, status} = await axios.get('/user/generate_otp', {email});
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to let the component handle it
    }
};

export const verifyOTP = async (email, otp) => {
    try {
        const {data, status} = await axios.get('/user/verify_otp', {email, otp});
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to let the component handle it
    }
};

export const forgotPassword = async (email, newPassword) => {
    try {
        const {data, status} = await axios.get('/user/forgot_password', {email, newPassword});
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to let the component handle it
    }
};

export const resetPassword = async (currentPassword, newPassword ) => {
    try {
        const token = localStorage.getItem('token');
        const {data, status} = await axios.get('/user/reset_password', {currentPassword, newPassword }, {Authorization: `Bearer ${token}`});
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to let the component handle it
    }
};

export const getAll = async () => {
    try {
        const token = localStorage.getItem('token');
        const {data, status} = await axios.get('/user', {}, {Authorization: `Bearer ${token}`});
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to let the component handle it
    }
};

export const getOne = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const {data, status} = await axios.get(`/user/${userId}`, {}, {Authorization: `Bearer ${token}`});
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to let the component handle it
    }
};

export const updateOne = async (userId, updateData) => {
    try {
        const token = localStorage.getItem('token');
        const {data, status} = await axios.put(`/user/${userId}`, updateData, {Authorization: `Bearer ${token}`});
        return data
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to let the component handle it
    }
};

export const deleteOne = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const {data, status} = await axios.put(`/user/${userId}`, {}, {Authorization: `Bearer ${token}`});
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to let the component handle it
    }
};