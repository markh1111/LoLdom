const AIRTABLE_BASE_ID = "appJq4LCFDFejRTO3";
const TABLE_NAME = "data";
const AIRTABLE_TOKEN =
  "patQ805ZM8HymK98F.3ad4e0e20f280fb4480cec073e23147042a5abdeb9b23480339de73330a736d9";

const fetchBtn = document.getElementById("fetchBtn");
const output = document.getElementById("output");

document.getElementById("fetchBtn").addEventListener("click", async () => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}?pageSize=100`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    });

    const data = await response.json();
    console.log("Response JSON:", data);
    const records = data.records;

    const innerHTML = renderOutput(records);
    output.innerHTML = innerHTML;
  } catch (err) {
    console.error("Fetch failed:", err);
    document.getElementById("output").textContent =
      "Fetch error: " + err.message;
  }
});

function renderOutput(records) {
  const random = records[Math.floor(Math.random() * records.length)];
  const name = random.fields.Name;
  const playstyle = random.fields.Class;
  let figure = null;
  if (random.fields["Image"]) {
    const imgSrc = random.fields["Image"][0].url;
    figure = `
<figure>
  <img src = "${imgSrc}" alt = "picture of ${name}">
</figure>
`;
  }

  const innerHTML = `
<header>
  <h2>${name}</h2>
</header>
<style>
p {
font-family: Arial, sans-serif;
font-color: White;
}
</style>
<p>Playstyle:
  <span>${playstyle}</span>
</p>
${figure}
`;

  // output.innerHTML = innerHTML;
  return innerHTML;
}
