// Sample portfolio data
const portfolios = [
    {
        name: "Kaiden Carr",
        title: "Full Stack Developer",
        bio: "Passionate about building web applications with modern technologies.",
        image: "./assets/images/profile-kaiden-carr.png",
        tags: ["JavaScript", "Python", "React", "HTML", "CSS"],
        portfolioUrl: "/carrkaiden1212"
    },
    {
        name: "Antony Hallick",
        title: "Professional with Diverse Industry Experience",
        bio: "Professional with extensive experience across multiple industries including roofline products, aluminium manufacturing, and furniture.",
        image: "./assets/images/profile-antony-hallick.png",
        tags: ["Manufacturing", "Aluminium", "Technical", "Operations"],
        portfolioUrl: "/Antony_Hallick"
    },
    {
        name: "Mason",
        title: "Discord Design Expert",
        bio: "Ensuring YOUR discord servers are what you need. Top Qualities, Cheap Prices. Specializing in community, design, department, and content creation.",
        image: "./assets/images/profile-mason.png",
        tags: ["Discord", "Design", "Community"],
        portfolioUrl: "/Mason"
    },
    {
        name: "Dudwig",
        title: "Design Specialist",
        bio: "Creative designer specializing in clothing design and Discord embeds with innovative design solutions.",
        image: "./assets/images/profile-dudwig.png",
        tags: ["Design", "Clothing", "Embeds"],
        portfolioUrl: "/Dudwig"
    },
    {
        name: "__nicow",
        title: "Design Specialist",
        bio: "This is your about me",
        image: "./assets/images/__nicow.webp",
        tags: ["Design", "Banners", "Discord"],
        portfolioUrl: "/__nicow"
    },
    {
        name: "Leo Sicolo",
        title: "IT Professional & 3D Printing Enthusiast",
        bio: "Passionate about IT field and 3D printing. Experienced in IT work and camp counseling with relevant qualifications.",
        image: "./assets/images/profile-leo-sicolo.png",
        tags: ["IT", "3D Printing", "Technology"],
        portfolioUrl: "/Leo_Sicolo"
    },
    {
        name: "yescat",
        title: "Design Specialist",
        bio: "Design specialist with extensive experience moderating 5+ servers and building 2 successful Discord communities from the ground up.",
        image: "./assets/images/profile-yescat.png",
        tags: ["Discord", "Design", "Leadership"],
        portfolioUrl: "/yescat"
    },
    {
        name: "myfloweralla",
        title: "Designer & Creative Experimenter",
        bio: "I enjoy designing and experimenting with new things. Creating and discovering new possibilities is what motivates me the most.",
        image: "./assets/images/profile-myfloweralla.png",
        tags: ["Design", "Creative", "Discord"],
        portfolioUrl: "/myfloweralla"
    },
    {
        name: "FluffyChick458",
        title: "Server Owner & Community Manager",
        bio: "Experienced server owner and community manager with a proven track record of building and maintaining successful Discord communities.",
        image: "./assets/images/profile-fluffy.png",
        tags: ["Server Owner", "Management", "Community"],
        portfolioUrl: "/FluffyChick458"
    },
    {
        name: "denji",
        title: "Video & Gameplay Editor",
        bio: "Anime edits, gaming montages, Minecraft server design, and Discord community management.",
        image: "./assets/images/denji.notfound.webp",
        tags: ["Video Editing", "Minecraft", "Discord", "Gaming"],
        portfolioUrl: "/toxiqxprime"
    }
];

// Function to render profiles
function renderProfiles(profiles) {
    const profilesGrid = document.getElementById('profilesGrid');
    const noResults = document.getElementById('noResults');
    
    profilesGrid.innerHTML = '';
    
    if (profiles.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    profiles.forEach(profile => {
        const profileCard = document.createElement('div');
        profileCard.className = 'profile-card';
        profileCard.innerHTML = `
            <a href="${profile.portfolioUrl}" class="profile-link">
                <div class="profile-image">
                    <img src="${profile.image}" alt="${profile.name}">
                </div>
                <div class="profile-content">
                    <h3 class="profile-name">${profile.name}</h3>
                    <p class="profile-title">${profile.title}</p>
                    <p class="profile-bio">${profile.bio}</p>
                    <div class="profile-tags">
                        ${profile.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="profile-arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
            </a>
        `;
        profilesGrid.appendChild(profileCard);
    });
}

// Function to search profiles
function searchProfiles(query) {
    const lowerQuery = query.toLowerCase();
    
    return portfolios.filter(profile => {
        const name = profile.name.toLowerCase();
        const title = profile.title.toLowerCase();
        const bio = profile.bio.toLowerCase();
        const tags = profile.tags.map(tag => tag.toLowerCase()).join(' ');
        
        return name.includes(lowerQuery) || 
               title.includes(lowerQuery) || 
               bio.includes(lowerQuery) || 
               tags.includes(lowerQuery);
    });
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value;
    const results = searchProfiles(query);
    renderProfiles(results);
});

// Initial render
renderProfiles(portfolios);

// ==================== DOM Content Loaded ==================== //
document.addEventListener('DOMContentLoaded', () => {
    // Popup close functionality
    const popupClose = document.getElementById('popupClose');
    if (popupClose) {
        popupClose.addEventListener('click', () => {
            const popup = document.getElementById('bottomPopup');
            popup.style.animation = 'slideOut 0.4s ease forwards';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 400);
        });
    }
});
