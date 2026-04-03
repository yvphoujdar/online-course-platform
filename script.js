const courses = [
    { 
        id: 1, title: "Java Architecture & Design", category: "Programming", 
        modules: ["JVM Internals", "Multithreading", "Spring Boot Integration"] 
    },
    { 
        id: 2, title: "Growth Marketing & SEO", category: "Marketing", 
        modules: ["Search Algorithms", "Conversion Rate Optimization", "Email Automations"] 
    },
    { 
        id: 3, title: "Predictive AI Models", category: "Data Science", 
        modules: ["Regression Analysis", "TensorFlow Basics", "Ethics in AI"] 
    },
    { 
        id: 4, title: "Advanced Business Analysis", category: "Business", 
        modules: ["Gap Analysis", "Stakeholder Matrix", "Agile Product Backlogs"] 
    },
    { 
        id: 5, title: "Social Media ROI Strategy", category: "Marketing", 
        modules: ["Paid Ad Funnels", "Influencer Partnerships", "Analytics Dashboards"] 
    },
    { 
        id: 6, title: "Full Stack Development", category: "Programming", 
        modules: ["React Hooks", "Node.js Streams", "NoSQL Database Design"] 
    }
];
let savedCount = 0;
function displayCourses(filter = "all", searchTerm = "") {
    const grid = document.getElementById('courseGrid');
    grid.innerHTML = "";
    const filtered = courses.filter(c => {
        const matchesCat = filter === "all" || c.category === filter;
        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCat && matchesSearch;
    });
    filtered.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <span class="category-tag">${course.category}</span>
            <h3>${course.title}</h3>
            <details>
                <summary>Curriculum Details</summary>
                <ul>
                    ${course.modules.map(m => `<li>${m}</li>`).join('')}
                </ul>
            </details>
            <button class="enroll-btn" onclick="openModal()">Enroll Now</button>
            <button style="background:none; border:none; color:#6366f1; cursor:pointer; width:100%; margin-top:10px; font-weight:600" onclick="saveCourse()">
                Save for later
            </button>
        `;
        grid.appendChild(card);
    });
}
document.getElementById('categoryFilter').addEventListener('change', (e) => {
    displayCourses(e.target.value, document.getElementById('searchInput').value);
});
document.getElementById('searchInput').addEventListener('input', (e) => {
    displayCourses(document.getElementById('categoryFilter').value, e.target.value);
});
const modal = document.getElementById('enrollModal');
function openModal() { modal.style.display = "block"; }
document.querySelector('.close-btn').onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }
function saveCourse() {
    savedCount++;
    document.getElementById('savedCount').innerText = savedCount;
}
document.getElementById('enrollForm').onsubmit = (e) => {
    e.preventDefault();
    alert("Thank you for enrolling! Our coordinators will contact you soon.");
    modal.style.display = "none";
};
displayCourses();
