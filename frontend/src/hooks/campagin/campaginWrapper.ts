import api from "@/utils/axios";

export const campaginapi  = {
    getall : api.get('/campagins'),
    getMine: api.get('/campagins/my'),
    postcampagin:(formData : FormData) => api.post('/campagins', formData, {
        headers : {"Content-Type": "multipart/form-data"},
    }),
    editCampagin: (id: string, data: any) => api.put(`campagins/${id}`, data),
    deleteCampagin:(id: string, data: any) => api.delete(`campagins/${id}`, data)
}