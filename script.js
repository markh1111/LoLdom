const AIRTABLE_BASE_ID = "appJq4LCFDFejRTO3";
const TABLE_NAME = "data";
const AIRTABLE_TOKEN =
  "patQ805ZM8HymK98F.3ad4e0e20f280fb4480cec073e23147042a5abdeb9b23480339de73330a736d9"; // Scoped PAT, not API Key

document.getElementById("fetchBtn").addEventListener("click", async () => {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}?pageSize=100`;

  /* 
https://api.airtable.com/v0/appJq4LCFDFejRTO3/data \

-H "Authorization: Bearer YOUR_SECRET_API_TOKEN"
*/
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    });

    const data = await response.json();
    console.log("Response JSON:", data);
    const records = data.records;
    const random = records[Math.floor(Math.random() * records.length)];

    document.getElementById("output").textContent = `
Name: ${random.fields.Name || "N/A"}
Class: ${random.fields.Class || "N/A"}
`;
  } catch (err) {
    console.error("Fetch failed:", err);
    document.getElementById("output").textContent =
      "Fetch error: " + err.message;
  }
});
