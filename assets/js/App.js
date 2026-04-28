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
    this.board.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
            <span class="text-success small fw-bold">● API CONNECTION SUCCESS</span>
            <span class="badge bg-secondary">Objects: ${json.data.length}</span>
        </div>
        <pre style="color: #bd93f9; line-height: 1.4;">${JSON.stringify(json, null, 4)}</pre>
    `;
}
}