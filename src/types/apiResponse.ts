export interface IApiResponse {
    status: 'succes' | 'error';
    message: string;
    data?: {}; 
}