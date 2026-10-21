const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5011";

export const USER_API_ENDPOINT = `${BACKEND_URL}/api/users`;
export const JOB_API_ENDPOINT = `${BACKEND_URL}/api/job`;
export const APPLICATION_API_ENDPOINT = `${BACKEND_URL}/api/application`;
export const COMPANY_API_ENDPOINT = `${BACKEND_URL}/api/company`;
