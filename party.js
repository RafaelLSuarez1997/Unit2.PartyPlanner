// JavaScript (party.js)

const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events";
const partyForm = document.getElementById("party-form");
const partyList = document.getElementById("party-list");


// Function to fetch parties from the API and display them in the list
// Function to fetch parties from the API and display them in the list
async function fetchParties() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const parties = await response.json();
        partyList.innerHTML = "";
        if (Array.isArray(parties)) {
            parties.forEach(party => {
            });
        } else {
            console.error('Invalid response from the server:', parties);
        }
    } catch (error) {
        console.error("Error fetching parties:", error);
    }
}


// Function to add a new party
async function addParty() {
    const partyName = document.getElementById("party-name").value;
    const partyDate = document.getElementById("party-date").value;
    const partyTime = document.getElementById("party-time").value;
    const partyLocation = document.getElementById("party-location").value;
    const partyDescription = document.getElementById("party-description").value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: partyName,
                description: partyDescription,
                date: `${partyDate}T${partyTime}:00.000Z`,
                location: partyLocation
            })
        });
        await response.json();
        fetchParties(); // Fetch and display updated parties after adding a new party
        partyForm.reset(); // Clear the form fields
    } catch (error) {
        console.error("Error adding party:", error);
    }
}

// Function to delete a party
async function deleteParty(partyId) {
    try {
        await fetch(`${API_URL}/${partyId}`, {
            method: "DELETE"
        });
        fetchParties(); // Fetch and display updated parties after deleting a party
    } catch (error) {
        console.error(`Error deleting party with ID ${partyId}:`, error);
    }
}

// Fetch parties when the page loads
fetchParties();
