document.addEventListener('DOMContentLoaded', () => {
    const ipDisplay = document.getElementById('client-ip');
    const resultContainer = document.getElementById('result-container');
    const scanBtn = document.getElementById('scan-btn');
    const domainInput = document.getElementById('domain-input');

    // --- PUNTO 7: MOSTRAR IP DEL CLIENTE ---
    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => ipDisplay.textContent = data.ip)
        .catch(() => ipDisplay.textContent = "No disponible");

    // --- PUNTO 6: INTERACTUAR CON LA API DE RAPIDAPI ---
    const scanSubdomains = async () => {
        const domain = domainInput.value.trim();
        if (!domain) return alert("Por favor, ingresa un dominio.");

        resultContainer.innerHTML = "<p>Escaneando... por favor espera.</p>";

        // Configuración basada en tu imagen de RapidAPI
        const url = `https://subdomain-scan1.p.rapidapi.com/?domain=${domain}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'dc1ac5c674msh2f2c581068b09fcp1bd0f6jsncb173bd2f440', // Tu llave de la imagen
                'x-rapidapi-host': 'subdomain-scan1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            // Mostrar el JSON formateado en pantalla
            resultContainer.innerHTML = `
                <p style="color: white; margin-bottom: 10px;">Respuesta de la API para: <strong>${domain}</strong></p>
                <pre>${JSON.stringify(result, null, 2)}</pre>
            `;
        } catch (error) {
            resultContainer.innerHTML = `<p style="color: #ff6b6b;">Error: ${error.message}</p>`;
        }
    };

    scanBtn.addEventListener('click', scanSubdomains);
});