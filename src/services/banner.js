import axios from '../helpers/axios';

export const createBanner = (data) => axios.post('/banners', data);

export const getAllBanners = () => axios.get('/banners?type=admin');

export const updateBanner = (id, data) => axios.put(`/banners/${id}`, data);

export const deleteBanner = (id) => axios.delete(`/banners/${id}`);
