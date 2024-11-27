// Funkcija za učitavanje poteza iz fajla
export const loadMovesFromFile = async (file) => {
    try {
        const text = await file.text(); // Pročitaj sadržaj fajla kao tekst
        const moves = text
            .split('\n') // Razdvajanje linija
            .map(line => line.trim()) // Uklanjanje praznina
            .filter(line => line !== '') // Ignoriši prazne linije
            .map(Number); // Konvertuj u brojeve
        return moves;
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        return [];
    }
};

// Funkcija za zapisivanje poteza u fajl
export const saveMovesToFile = (moves) => {
    const blob = new Blob([moves.join('\n')], { type: 'text/plain' }); // Kreiraj tekstualni fajl
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'played_moves.txt'; // Ime fajla
    link.click(); // Automatski preuzmi fajl
};
