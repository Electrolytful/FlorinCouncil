const button = document.getElementById('reservation-button');

document.addEventListener("DOMContentLoaded", async () => {
    button.addEventListener('click', () => {
        alert(`This book has been reserved for you. Please come to Florin Library within 3 work days to pick it up.`)
    })
});
