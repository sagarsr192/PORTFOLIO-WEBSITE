import streamlit as st
from pathlib import Path

st.set_page_config(page_title="SAGAR S R | Portfolio", page_icon="💼", layout="wide")

profile = {
    "name": "SAGAR S R",
    "role": "Full-Stack Web Developer",
    "tagline": "I build clean, scalable, and user-focused web applications using modern frontend and backend technologies.",
    "location": "India",
    "email": "sagarsr9686@gmail.com",
    "github": "https://github.com/sagarsr192",
    "linkedin": "https://www.linkedin.com/in/sagar-s-r-9929262a0",
}

projects = [
    {
        "title": "AI-BASED-MENTAL-HEALTH-ASSESSMENT-USING-NLP",
        "category": "Data App",
        "summary": "An NLP-based project for analyzing text patterns related to mental health assessment.",
        "stack": ["Python", "NLP", "Machine Learning"],
        "repo": "https://github.com/sagarsr192/AI-BASED-MENTAL-HEALTH-ASSESSMENT-USING-NLP",
    },
    {
        "title": "Sales & Demand Forcasting for Businesses",
        "category": "Data App",
        "summary": "A machine learning project focused on experimentation and model development.",
        "stack": ["Python", "Machine Learning", "Data Analysis"],
        "repo": "https://github.com/sagarsr192/FUTURE_ML_01",
    },
    {
        "title": "Support Ticket Classification",
        "category": "Data App",
        "summary": "A machine learning project focused on data preprocessing and predictive modeling.",
        "stack": ["Python", "Machine Learning", "Data Processing"],
        "repo": "https://github.com/sagarsr192/FUTURE_ML_02",
    },
    {
        "title": "Resume / Candidate Screening System",
        "category": "Data App",
        "summary": "A machine learning project built to explore model training and evaluation workflows.",
        "stack": ["Python", "Machine Learning", "Model Evaluation"],
        "repo": "https://github.com/sagarsr192/FUTURE_ML_03",
    },
    {
        "title": "Real-Time-Weather-Data-Collection-and-Visualization",
        "category": "Frontend",
        "summary": "A weather data collection and visualization project with a live dashboard experience.",
        "stack": ["HTML", "JavaScript", "Visualization"],
        "repo": "https://github.com/sagarsr192/Real-Time-Weather-Data-Collection-and-Visualization",
        "live": "https://real-time-weather-data-collection-a.vercel.app",
    },
]

skills = {
    "Frontend": ["HTML5", "CSS3", "JavaScript (ES6+)", "React"],
    "Backend": ["Flask", "FastAPI", "Django"],
    "Database": ["MongoDB", "MySQL"],
    "Tools": ["Git", "GitHub", "VS Code", "Vercel", "Render"],
}

timeline = [
    {
        "title": "Full Stack Web Development Intern",
        "org": "Future Interns",
        "period": "2026",
        "details": "Building real-world web projects and improving production-ready development workflows.",
    },
    {
        "title": "Self-Led Full-Stack Learning Journey",
        "org": "Independent",
        "period": "2024 - Present",
        "details": "Built multiple projects focused on APIs, responsive UI, and clean code practices.",
    },
]

st.markdown("# Professional Portfolio")

left, right = st.columns([3, 2], gap="large")
with left:
    st.subheader(profile["name"])
    st.write(f"### {profile['role']}")
    st.write(profile["tagline"])

    st.markdown("#### Contact")
    st.write(f"Location: {profile['location']}")
    st.write(f"Email: {profile['email']}")
    st.markdown(f"GitHub: [{profile['github']}]({profile['github']})")
    st.markdown(f"LinkedIn: [{profile['linkedin']}]({profile['linkedin']})")

with right:
    image_path = Path("client/public/profile.jpg")
    if image_path.exists():
        st.image(str(image_path), caption="Sagar S R", use_container_width=True)

st.divider()
st.markdown("## Projects")

categories = sorted({project["category"] for project in projects})
selected_category = st.selectbox("Filter by category", ["All"] + categories)

visible_projects = [
    project for project in projects if selected_category == "All" or project["category"] == selected_category
]

for project in visible_projects:
    with st.container(border=True):
        st.markdown(f"### {project['title']}")
        st.caption(project["category"])
        st.write(project["summary"])
        st.write("Stack:", ", ".join(project["stack"]))
        links = [f"[GitHub]({project['repo']})"]
        if project.get("live"):
            links.append(f"[Live Demo]({project['live']})")
        st.markdown(" | ".join(links))

st.divider()
about_col, exp_col = st.columns([1, 1], gap="large")

with about_col:
    st.markdown("## Skills")
    for section, section_skills in skills.items():
        st.markdown(f"**{section}**")
        st.write(", ".join(section_skills))

with exp_col:
    st.markdown("## Experience")
    for item in timeline:
        st.markdown(f"**{item['title']}**")
        st.caption(f"{item['org']} | {item['period']}")
        st.write(item["details"])
