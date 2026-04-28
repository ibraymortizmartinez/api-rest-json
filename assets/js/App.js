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
        try {
            this.ipTag.innerText = await this.service.getIP();
        } catch { this.ipTag.innerText = "ERROR_OFFLINE"; }
        
        this.btn.addEventListener('click', () => this.handleSearch());
    }

    async handleSearch() {
        const era = this.select.value;
        if (!era) return;

        // Efecto de carga visual
        this.board.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-info" role="status"></div>
                <p class="mt-2 font-monospace" style="color:var(--neon-cyan)">ACCEDIENDO A ARCHIVOS CLASIFICADOS...</p>
            </div>
        `;

        try {
            const result = await this.service.getDinosaurs(era);
            this.renderCards(result.data);
        } catch (err) {
            this.board.innerHTML = `<p class="text-danger p-3">[ERROR_SYSTEM]: ${err.message}</p>`;
        }
    }

    renderCards(dinos) {
        // Limpiamos el contenedor
        this.board.innerHTML = '';
        
        // Contenedor Grid de Bootstrap
        const grid = document.createElement('div');
        grid.className = 'row g-4';

        dinos.forEach(dino => {
            const cardCol = document.createElement('div');
            cardCol.className = 'col-md-6';
            
            // Construcción de la tarjeta con estilo "Ficha de espécimen"
            cardCol.innerHTML = `
                <div class="dino-card p-3 h-100">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h4 class="dino-title m-0">${dino.genus}</h4>
                        <span class="badge-diet">${dino.diet || 'Unknown'}</span>
                    </div>
                    
                    <div class="dino-image-container mb-3">
                        <img src="${dino.image_url || 'https://via.placeholder.com/300x150/000/39ff14?text=NO_IMAGE'}" 
                             alt="${dino.genus}" class="img-fluid rounded border-neon">
                    </div>

                    <div class="dino-info font-monospace small">
                        <p class="mb-1"><span class="text-magenta">ERA:</span> ${dino.period}</p>
                        <p class="mb-2 text-muted" style="font-size: 0.75rem;">${dino.description.substring(0, 120)}...</p>
                        <div class="d-flex justify-content-between border-top border-secondary pt-2 mt-2">
                            <span>MIN_MA: ${dino.min_ma}</span>
                            <span>MAX_MA: ${dino.max_ma}</span>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(cardCol);
        });

        this.board.appendChild(grid);
    }
}