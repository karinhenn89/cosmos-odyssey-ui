
export const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://cosmos-odyseyy-ef9a41470ec5.herokuapp.com' // Heroku URL
    : 'http://localhost:8090'; // Local development URL

export const API = {
    reservationsApi: `${API_BASE_URL}/api/reservations`,
    routesApi: `${API_BASE_URL}/api/routes`
};