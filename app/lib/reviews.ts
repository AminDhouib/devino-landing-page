

export interface Review {
    name: string;
    position: string;
    company: string;
    companyLogo?: string;
    profileImage?: string;
    rating: number;
    comment: string;
    companyLink?: string;
    isFeatured?: boolean;
    source: 'Google' | 'Upwork';
    link?: string;
}

const reviews: Review[] = [
    {
        name: "Samira Ismail",
        position: "Mechanical Engineer",
        company: "New Motion Labs",
        companyLogo: "/reviews/companies/nml.png",
        rating: 5,
        comment: "Devino was great to work with throughout our project.They have great attention to detail when it comes to both the frontend design and UI/UX and the backend functionality. They were always ready to address our concerns and requirements as they were added and updated us regularly on the progress of the work. They're highly recommended for projects where time is of the essence or have tight deadlines and yet still require top notch standard.",
        companyLink: "https://www.newmotionlabs.com",
        isFeatured: true,
        source: "Google",
        link: "https://g.co/kgs/HGjW3X7"
    },
    // Add more reviews here...
];

export default reviews;
