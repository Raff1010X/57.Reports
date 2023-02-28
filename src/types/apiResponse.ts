export interface IApiResponse {
    status: 'succes' | 'fail' | 'error';
    message: string;
    data?: {}; 
}