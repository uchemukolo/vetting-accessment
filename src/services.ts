import axios from 'axios';

const baseUrl = 'https://api.github.com'

export const getAllMembers = () => axios.get(`${baseUrl}/orgs/andela/members`)
export const getSingleMembers = (username: string) => axios.get(`${baseUrl}/users/${username}`)