import { ApiService } from './ApiService.js';

export class App {
    constructor() {
        this.service = new ApiService();
        this.ipTag = document.getElementById('client-ip');
        this.select = document.getElementById('era-select');
        this.btn = document.getElementById('scan-btn');
        this.board = document.getElementById('result-container');
    }

    async init() {
        // Punto 7: Mostrar IP del cliente
        try {
            this.ipTag.innerText = await this.service.getIP();
        } catch { this.ipTag.innerText = "Error IP"; }
        
        // Punto 12: Control por botón (Regla de negocio)
        this.btn.addEventListener('click', () => this.handleSearch());
    }

    async handleSearch() {
        const era = this.select.value;
        if (!era) return alert("Selecciona un período");

        this.board.innerHTML = '<p class="text-center mt-4">Buscando fósiles...</p>';

        try {
            const result = await this.service.getDinosaurs(era);
            this.render(result);
        } catch (err) {
            this.board.innerHTML = `<p class="text-danger p-3">${err.message}</p>`;
        }
    }

    render(json) {
        // Mostramos el JSON formateado (Punto 6)
        this.board.innerHTML = `
            <div class="d-flex justify-content-between mb-2">
                <span class="badge bg-success">200 OK</span>
                <small class="text-info">Resultados: ${json.data.length}</small>
            </div>
            <pre style="color: #4dfc4d; font-size: 0.8rem;">${JSON.stringify(json, null, 4)}</pre>
        `;
    }
}