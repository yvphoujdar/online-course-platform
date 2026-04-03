const courses = [
    { id: 1, title: "Java Masterclass", category: "Programming", modules: ["Syntax", "OOP", "Collections"] },
    { id: 2, title: "UI/UX Basics", category: "Design", modules: ["Figma", "Color Theory", "Prototyping"] },
    { id: 3, title: "Digital Marketing", category: "Marketing", modules: ["SEO", "Ads", "Analytics"] },
    { id: 4, title: "Python for Data Science", category: "Programming", modules: ["NumPy", "Pandas", "Matplotlib"] }
];
let savedCourses = [];
const courseGrid = document.getElementById('courseGrid');
const categoryFilter = document.getElementById('categoryFilter');
function displayCourses(filter = "all") {
    courseGrid.innerHTML = "";
    const filtered = filter === "all" ? courses : courses.filter(c => c.category === filter);
    filtered.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <h3>${course.title}</h3>
            <p><strong>Category:</strong> ${course.category}</p>
            <details class="modules">
                <summary>View Modules</summary>
                <ul>${course.modules.map(m => `<li>${m}</li>`).join('')}</ul>
            </details>
            <button onclick="openModal()">Enroll</button>
            <button class="save-btn" onclick="saveCourse(${course.id})">Save</button>
        `;
        courseGrid.appendChild(card);
    });
}
categoryFilter.addEventListener('change', (e) => displayCourses(e.target.value));
function saveCourse(id) {
    if (!savedCourses.includes(id)) {
        savedCourses.push(id);
        document.getElementById('savedCount').innerText = `Saved Courses: ${savedCourses.length}`;
        alert("Course saved to your list!");
function openModal() { document.getElementById('enrollModal').style.display = "block"; }
document.querySelector('.close').onclick = () => document.getElementById('enrollModal').style.display = "none";

displayCourses();
