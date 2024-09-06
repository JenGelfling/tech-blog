document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.getElementById("comment-form");

  if (commentForm) {
    commentForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const commentContent = document.getElementById("comment-content").value;
      const postId = window.location.pathname.split("/").pop();

      fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: commentContent }),
      })
        .then((response) => {
          if (response.ok) {
            console.log(response);
            return response.json();
          } else {
            return response.json().then((errorData) => {
              alert(
                `Comment submission didn't work: ${
                  errorData.message || "Unknown error"
                }`
              );
            });
          }
        })
        .then((data) => {
          console.log("Comment submitted successfully:", data);

          const commentsDiv = document.querySelector("h4");
          const newCommentDiv = document.createElement("div");
          newCommentDiv.innerHTML = `<p>${
            data.content
          } - by You on ${new Date().toLocaleDateString()}</p>`;
          commentsDiv.appendChild(newCommentDiv);

          document.getElementById("comment-content").value = "";
        })
        .catch((error) => {
          console.log(error);
          alert("Comment submission failed. Please try again.");
        });
    });
  }
});
