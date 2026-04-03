const courses = [
    { id: 1, title: "Java Systems Architecture", category: "Programming", modules: ["JVM Internals", "Spring Boot", "Microservices"] },
    { id: 2, title: "Growth Marketing 101", category: "Marketing", modules: ["SEO Mastery", "Ad Funnels", "Viral Loops"] },
    { id: 3, title: "Predictive AI & Python", category: "Data Science", modules: ["TensorFlow", "Neural Networks", "Data Cleaning"] },
    { id: 4, title: "Certified Business Analyst", category: "Business", modules: ["Agile Scrum", "User Stories", "Gap Analysis"] },
    { id: 5, title: "Social Media Strategy", category: "Marketing", modules: ["ROI Analytics", "Influencer Outreach", "Content Calendars"] },
    { id: 6, title: "Full Stack Web Dev", category: "Programming", modules: ["React.js", "Node.js", "MongoDB"] }
];
const categoryData = {
    "Programming": { title: "Dev Center", desc: "Build scalable software with expert-led engineering tracks." },
    "Marketing": { title: "Marketing & Growth Lab", desc: "Master the data-driven strategies that scale startups to millions." },
    "Data Science": { title: "AI & Intelligence Hub", desc: "Explore the future of machine learning and predictive modeling." },
    "Business": { title: "Business Analysis Suite", desc: "Bridging the gap between stakeholders and technical teams." }
};
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
            <h3 style="margin:15px 0">${course.title}</h3>
            <details style="margin-bottom:15px">
                <summary style="cursor:pointer; font-size:0.9rem; color:#64748b">View Modules</summary>
                <ul style="padding-left:20px; font-size:0.85rem; color:#475569">${course.modules.map(m => `<li>${m}</li>`).join('')}</ul>
            </details>
            <button class="enroll-btn" onclick="openModal()">Enroll Now</button>
            <button style="background:none; border:none; color:var(--primary); cursor:pointer; width:100%; margin-top:10px; font-weight:600" onclick="saveCourse()">Save for later</button>
        `;
        grid.appendChild(card);
    });
}
function updateUI(filter) {
    const mainHero = document.getElementById('mainHero');
    const catHeader = document.getElementById('categoryHeader');
    if (filter === "all") {
        mainHero.style.display = "block";
        catHeader.style.display = "none";
    } else {
        mainHero.style.display = "none";
        catHeader.style.display = "block";
        document.getElementById('catTitle').innerText = categoryData[filter].title;
        document.getElementById('catDesc').innerText = categoryData[filter].desc;
    }
}
document.getElementById('categoryFilter').addEventListener('change', (e) => {
    updateUI(e.target.value);
    displayCourses(e.target.value, document.getElementById('searchInput').value);
});
document.getElementById('searchInput').addEventListener('input', (e) => {
    displayCourses(document.getElementById('categoryFilter').value, e.target.value);
});
function resetView() {
    document.getElementById('categoryFilter').value = "all";
    updateUI("all");
    displayCourses("all");
}
const modal = document.getElementById('enrollModal');
function openModal() { modal.style.display = "block"; }
document.querySelector('.close-btn').onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }
function saveCourse() {
    savedCount++;
    document.getElementById('savedCount').innerText = savedCount;
}
document.getElementById('enrollForm').onsubmit = (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.innerText = "Processing...";
    btn.disabled = true;
    setTimeout(() => {
        alert("Welcome to EduStream! Enrollment successful.");
        modal.style.display = "none";
        btn.innerText = "Access Curriculum";
        btn.disabled = false;
        e.target.reset();
    }, 1500);
};
displayCourses();
