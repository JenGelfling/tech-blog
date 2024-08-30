
document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const url = `https://www.omdbapi.com/?t=${title}&apikey=4e8db45b`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data.Error) {
            document.getElementById('results').innerHTML = `<p>${data.Error}</p>`;
        } else { 
            document.getElementById('results').innerHTML = `
                <h2>${data.Title} (${data.Year})</h2>
                <p><strong>Director:</strong> ${data.Director}</p>
                <p><strong>Cast:</strong> ${data.Actors}</p>
                <p><strong>Writer:</strong> ${data.Writer}</p>
                <p><strong>Rated:</strong> ${data.Rated}</p>
                <p><strong>Plot:</strong> ${data.Plot}</p>
                <img src="${data.Poster}" alt="${data.Title} Poster" style="width:200px;">
                </br>
            `;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('results').innerHTML = '<p>There was an error fetching the data.</p>';
    }
});

