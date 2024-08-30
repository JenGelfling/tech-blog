const getSessionData = () => {
    // This should be replaced with actual logic to retrieve session data
    // For example, it could be an API call or accessing a global variable
    return window.sessionData || null; // Example of accessing global session data
};

const reviewFormHandler = async (event) => {
    event.preventDefault();
    console.log("let's post a review")
  
    const title = document.querySelector('#review-title').value.trim();
    const content = document.querySelector('#review-comments').value.trim();
    const score = document.querySelector('#review-score').value.trim();
    // const author_id = 1

    if (title && content && score) {
        try {
        console.log('sending review data')
        const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify({ title, content, score }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
                document.location.replace('/');
            } else {
                const errorData = await response.json();
                console.error('Failed to post review:', errorData);
                alert('Failed to post review.');
            }
        } catch (error){
            console.error('Error:', error);
            alert(`An error occurred while posting the review.`);
        }
    } else {
            alert('Please log in and fill in all fields');
    }
};

document.querySelector('#review-form').addEventListener('submit', reviewFormHandler);

// document.querySelector('#review-form').addEventListener('submit', reviewFormHandler);
