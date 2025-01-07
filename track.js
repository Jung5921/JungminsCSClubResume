fetch('http://localhost:4000/track-visit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
})
.then(response => response.json())
.then(data => {console.log("Visit counted:", data);

})
.catch(error => {
    console.error("Error counting visit:", error);
});