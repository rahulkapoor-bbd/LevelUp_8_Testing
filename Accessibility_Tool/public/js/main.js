const issuesOutput = document.querySelector("#issues");
const issuesCount = document.querySelector("#number");
const alertContainer = document.createElement("article");
const alertMessage = document.createElement("article");
const emptyUrl = document.createElement("article");
const warningMessage = document.createElement("article");
const CsvMessage = document.createElement("article");

// Add classes and roles to the alert messages
alertContainer.className = "alert-container";
alertMessage.className = "alert alert-danger";
alertMessage.setAttribute("role", "alert");
emptyUrl.className = "alert alert-danger";
emptyUrl.setAttribute("role", "alert");
warningMessage.className = "alert alert-warning";
warningMessage.setAttribute("role", "alert");
CsvMessage.className = "alert alert-warning";
CsvMessage.setAttribute("role", "alert");

// Set the text content for the alert messages
alertMessage.textContent = "Something went wrong";
emptyUrl.textContent = "Please add an URL";
warningMessage.textContent = "No issues found";
CsvMessage.textContent = "CSV not available";

// Fetch accessibility issues
const testAccessibility = async (e) => {
  e.preventDefault();
  const url = document.querySelector("#url").value;
  if (url === "") {
    clearAlerts();
    issuesOutput.appendChild(emptyUrl);
  } else {
    setLoading();

    const response = await fetch(`/api/test?url=${url}`);

    if (response.status !== 200) {
      setLoading(false);
      clearAlerts();
      issuesOutput.appendChild(alertMessage);
    } else {
      const { issues } = await response.json();
      addIssuesToDOM(issues);
      setLoading(false);
      document.getElementById("clearResults").classList.remove("hideButton");
      document.getElementById("csvBtn").classList.remove("hideButton");
    }
  }
};

// Download CSV
const csvIssues = async (e) => {
  e.preventDefault();
  const url = document.querySelector("#url").value;
  if (url === "") {
    clearAlerts();
    issuesOutput.appendChild(emptyUrl);
  } else {
    const response = await fetch(`/api/test?url=${url}`);

    if (response.status !== 200) {
      setLoading(false);
      clearAlerts();
      issuesOutput.appendChild(alertMessage);
    } else if (issues.length === 0) {
      clearAlerts();
      issuesOutput.appendChild(CsvMessage);
    } else {
      const { issues } = await response.json();
      const csv = issues
        .map((issue) => {
          return `${issue.code},${issue.message},${issue.context}`;
        })
        .join("\n");

      const csvBlob = new Blob([csv], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvBlob);
      const link = document.createElement("a");
      link.href = csvUrl;
      link.download = "Accessibility_issues_list_" + url.substring(12) + ".csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

// Add issues to DOM
const addIssuesToDOM = (issues) => {
  clearAlerts();
  issuesCount.textContent = "";

  if (issues.length === 0) {
    issuesOutput.appendChild(warningMessage);
  } else {
    issuesCount.textContent = `${issues.length} issues found!`;
    issues.forEach((issue) => {
      const card = document.createElement("div");
      card.className = "card mb-5";
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const h4 = document.createElement("h4");
      h4.textContent = issue.message; // Use textContent directly
      cardBody.appendChild(h4);

      const p1 = document.createElement("p");
      p1.className = "bg-light p-3 my-3";
      p1.textContent = issue.context; // Use textContent directly
      cardBody.appendChild(p1);

      const p2 = document.createElement("p");
      p2.className = "bg-secondary text-light p-2";
      p2.textContent = `CODE: ${issue.code}`;
      cardBody.appendChild(p2);

      card.appendChild(cardBody);
      issuesOutput.appendChild(card);
    });
  }
};

// Set loading state
const setLoading = (isLoading = true) => {
  const loader = document.querySelector(".loader");
  if (isLoading) {
    loader.style.display = "block";
    clearAlerts();
  } else {
    loader.style.display = "none";
  }
};

// Clear alert messages
const clearAlerts = () => {
  const existingAlerts = document.querySelectorAll(".alert-container");
  existingAlerts.forEach((alert) => {
    issuesOutput.removeChild(alert);
  });
};

// Escape HTML
function escapeHTML(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Clear results
const clearResults = (e) => {
  e.preventDefault();
  issuesOutput.textContent = "";
  issuesCount.textContent = "";
  document.querySelector("#url").value = "";
};

document.querySelector("#form").addEventListener("submit", testAccessibility);
document.querySelector("#clearResults").addEventListener("click", clearResults);
document.querySelector("#csvBtn").addEventListener("click", csvIssues);
