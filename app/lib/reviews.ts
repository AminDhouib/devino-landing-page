

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
 /*   {
        name: "Allison Gaddy",
        profileImage: "/reviews/profiles/dummy-customer.jpg",
        position: "Position",
        company: "Company",
        rating: 5,
        comment: "Amin was an exceptional developer who was able to complete this critical emergency project within the tight 24-hour deadline. I'm extremely impressed by his skill and professionalism.\n" +
            "\n" +
            "The project involved integrating a Wix form, a PDF Generator API, and the GHL platform - a complex set of integrations that Amin handled with ease.\n" +
            "\n" +
            "Beyond the technical capabilities, Amin also demonstrated excellent project management and communication skills. He provided regular updates, responded promptly to messages, and ensured the project was completed on time and to our full satisfaction.\n" +
            "\n" +
            "I would highly recommend Amin for any complex integration projects, especially those with tight deadlines. His combination of technical skills, problem-solving ability, and client-focused approach make him an invaluable resource. I will definitely work with him again in the future.",
        isFeatured: true,
        source: "Google",
        link: "https://g.co/kgs/BERyRcG"
    },
    {
        name: "Sarah Adi (Peachy Android)",
        profileImage: "/reviews/profiles/sara.png",
        position: "Position",
        company: "Company",
        rating: 5,
        comment: "Amin and his team been amazing to work with. Overall, it was a great experience, and I would come back again for future projects. Highly recommended.",
        isFeatured: true,
        source: "Google",
        link: "https://g.co/kgs/MUyDTR3"
    },
    {
        name: "Tristan .Mc",
        profileImage: "/reviews/profiles/tristan.png",
        position: "Position",
        company: "Company",
        rating: 5,
        comment: "Amin is the bomb is the bomb. I originally tried hiring him for a specific task but in our intro call he quickly analyzed exactly what my needs were, suggested an alternative solution and helped guide me in a new direction. He spent the time to make sure I understood all aspects of the new solution and went above and beyond to teach me different methods of implementation. He is extremely knowledgable would definitely recommend!",
        isFeatured: true,
        source: "Google",
        link: "https://g.co/kgs/iMKFyyP"
    },
    {
        name: "Ray",
        position: "Position",
        company: "Company",
        rating: 5,
        comment: "It was a pleasure working with Devino Solutions. Their expertise was clear as they worked their way through my problem, the work was thorough, and the process was clearly explained. I highly recommend working with them.",
        isFeatured: true,
        source: "Google",
        link: "https://g.co/kgs/Qu6JGQi"
    },
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
    },*/
];

export default reviews;
