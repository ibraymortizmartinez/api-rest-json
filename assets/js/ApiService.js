export class ApiService {
    constructor() {
        this.apiKey = 'dc1ac5c674msh2f2c581068b09fcp1bd0f6jsncb173bd2f440';
        this.host = 'dinosaurs2.p.rapidapi.com';
    }

    async getIP() {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        return data.ip;
    }

    async getDinosaurs(period) {
        // Usamos la URL que probaste con éxito en Thunder Client
        const url = `https://${this.host}/dinosaurs?period=${period}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': this.host
            }
        };
        const res = await fetch(url, options);
        if (!res.ok) throw new Error("Error al consultar la API");
        return await res.json();
    }
}