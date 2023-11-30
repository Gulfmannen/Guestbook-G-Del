async function saveEntry() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var comment = document.getElementById("comment").value;

  const response = await fetch("/saveEntry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, comment }),
  });

  const data = await response.json();

  if (data.success) {
    var entry = `${name} (${email}): ${comment}`;
    var listItem = document.createElement("li");
    listItem.innerHTML = `<strong>Namn:</strong> ${name}<br><strong>E-post:</strong> ${email}<br><strong>Kommentar:</strong> ${comment}`;
    var entriesList = document.getElementById("entriesList");
    entriesList.appendChild(listItem);
    document.getElementById("commentForm").reset();
  } else {
    console.error(data.error);
  }
}

async function loadEntries() {
  const response = await fetch("/getEntries");
  const data = await response.json();

  if (data.entries && data.entries.length > 0) {
    var entriesList = document.getElementById("entriesList");
    entriesList.innerHTML = "";

    data.entries.forEach((entryObject) => {
      var listItem = document.createElement("li");
      listItem.innerHTML = `<strong>Namn:</strong> ${entryObject.name}<br><strong>E-post:</strong> ${entryObject.email}<br><strong>Kommentar:</strong> ${entryObject.comment}`;
      entriesList.appendChild(listItem);
    });
  }
}

// ... (your existing code)

window.onload = loadEntries;
