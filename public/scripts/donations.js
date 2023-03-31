const button = document.getElementById('rec-reservation-button');

document.addEventListener("DOMContentLoaded", async () => {
    button.addEventListener('click', () => {
        alert(`This item has been reserved for you. Please come to Florin Recycling Center within 3 work days to pick it up.`)
    })
});