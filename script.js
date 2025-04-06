async function fetchEtymology() {
  const word = document.getElementById('wordInput').value;
  const output = document.getElementById('output');
  output.textContent = "Thinking...";

  const response = await fetch('/api/etymology', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word })
  });

  const data = await response.json();
  output.textContent = data.result || "No answer found.";
}
