const btn = document.getElementById("btn")
const quesInput = document.getElementById("question");
const result = document.getElementById("result");

const API_URL = "https://phase5-backend.vercel.app/ask"

btn.addEventListener("click", getAnswer);

async function getAnswer() {
    const question = quesInput.value.trim();
    if (!question) {
        result.textContent = "Please enter a question";
        return;
    }

    result.textContent = "Thinking..."
    btn.disabled = true;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({question})
        });
        const data = await response.json();
        if(!response.ok) {
            throw new Error(data.error || "Something went wrong")
        }
        result.innerHTML = marked.parse(data.answer);
    } catch (error) {
        console.log(error);
        result.textContent = error.message || "Unable to connect to the server"
    } finally {
        btn.disabled = false;
    }
}
