const API_KEY = 'TU_CLAVE_DE_API'; // Coloca aquí tu clave de API de YouTube

async function searchSongs() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        alert('Por favor, introduce un término de búsqueda.');
        return;
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=6&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            displayResults(data.items);
        } else {
            document.getElementById('recommendations').innerHTML = '<p>No se encontraron resultados.</p>';
        }
    } catch (error) {
        console.error('Error al buscar videos:', error);
        alert('Hubo un error al realizar la búsqueda. Inténtalo nuevamente.');
    }
}

function displayResults(videos) {
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = '';

    videos.forEach(video => {
        const { videoId } = video.id;
        const { title, thumbnails } = video.snippet;

        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <img src="${thumbnails.high.url}" alt="${title}">
            <h3>${title}</h3>
            <button onclick="playVideo('${videoId}')">Reproducir</button>
        `;
        recommendations.appendChild(card);
    });
}

function playVideo(videoId) {
    const player = document.getElementById('player');
    const iframe = document.getElementById('youtubePlayer');

    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    player.style.display = 'block';

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}
