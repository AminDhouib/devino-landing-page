export interface Review {
  name: string;
  position?: string;
  company?: string;
  companyLogo?: string;
  profileImage?: string;
  rating: number;
  comment: string;
  companyLink?: string;
  isFeatured?: boolean;
  source: "Google" | "Upwork" | "Contra";
  link?: string;
}

const googleReviewsLink =
  "https://www.google.com/search?q=devino+solutions&sca_esv=3c1a55819b6b7e41&ei=XztZZ6jqIJaiptQPpO-YiAs&ved=0ahUKEwjoldqRlZ-KAxUWkYkEHaQ3BrEQ4dUDCA8&uact=5&oq=devino+solutions&gs_lp=Egxnd3Mtd2l6LXNlcnAiEGRldmlubyBzb2x1dGlvbnMyBRAAGIAEMgYQABgWGB4yCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogQyCBAAGKIEGIkFSI0OUIwDWIwOcAF4AJABAZgBtQKgAfIFqgEHMi4wLjEuMbgBA8gBAPgBAZgCBKACyAPCAg0QABiABBiwAxhDGIoFwgIJEAAYsAMYBxgewgILEAAYsAMYBxgKGB7CAggQABiABBiwA8ICExAuGIAEGLADGEMYyAMYigXYAQHCAhcQLhiwAxgHGMcBGMgDGAoYHhivAdgBAcICDhAuGIAEGLADGMgD2AEBwgIWEC4YgAQYsAMYxwEYyAMYChivAdgBAcICBxAuGIAEGArCAgsQLhiABBjHARivAcICChAAGIAEGEMYigXCAgcQABiABBgKmAMAiAYBkAYTugYGCAEQARgIkgcFMy4wLjGgB70g&sclient=gws-wiz-serp#lrd=0x61d982d544ce5eb3:0xa7a66037b29c5f50,1,,,,";
const linkedinRecommendations =
  "https://www.linkedin.com/in/amin-dhouib/details/recommendations/";
const reviews: Review[] = [
  {
    name: "Zarrah",
    position: "Founder & CEO",
    company: "Syncara",
    companyLink: "https://syncara.ca",
    profileImage: "/reviews/profiles/zarrah.png",
    companyLogo: "/reviews/companies/syncara.png",
    rating: 5,
    comment:
      "I’ve talked to devs who see projects as quick cash grabs. Amin & his team are different - they’re collaborative, strategic, and actually care about the long-term. If you need someone to help build AND grow, I highly recommend this team!",
    isFeatured: true,
    source: "Google",
    link:
      "https://contra.com/p/2WcRg2Lv-syncara-healthcare-solutions-for-canadians?justPublished=false&justUpdated=true&referralExperimentNid=DEFAULT_REFERRAL_PROGRAM&referrerUsername=amin",
  },
  {
    name: "Allison Gaddy",
    position: "Founding Partner & CEO",
    company: "Expert Partners",
    companyLink: "https://expertpartners.com",
    companyLogo: "/reviews/companies/ep.webp",
    profileImage: "/reviews/profiles/allison.png",
    rating: 5,
    comment:
      "Amin was an exceptional developer who was able to complete this critical emergency project within the tight 24-hour deadline. I'm extremely impressed by his skill and professionalism.\n" +
      "\n" +
      "The project involved integrating a Wix form, a PDF Generator API, and the GHL platform - a complex set of integrations that Amin handled with ease.\n" +
      "\n" +
      "Beyond the technical capabilities, Amin also demonstrated excellent project management and communication skills. He provided regular updates, responded promptly to messages, and ensured the project was completed on time and to our full satisfaction.\n" +
      "\n" +
      "I would highly recommend Amin for any complex integration projects, especially those with tight deadlines. His combination of technical skills, problem-solving ability, and client-focused approach make him an invaluable resource. I will definitely work with him again in the future.",
    isFeatured: true,
    source: "Google",
    link: googleReviewsLink,
  },
  {
    name: "Tristan McIntire",
    profileImage: "/reviews/profiles/tristan.png",
    position: "Co-Founder & Product Manager",
    company: "Qreates",
    companyLink: "https://qreates.com",
    companyLogo: "/reviews/companies/qreates.png",
    rating: 5,
    comment:
      "Amin is the bomb. I originally tried hiring him for a specific task but in our intro call he quickly analyzed exactly what my needs were, suggested an alternative solution and helped guide me in a new direction. He spent the time to make sure I understood all aspects of the new solution and went above and beyond to teach me different methods of implementation. He is extremely knowledgable would definitely recommend!",
    isFeatured: true,
    source: "Google",
    link: googleReviewsLink,
  },
  {
    name: "Trevor Arashiro",
    profileImage: "/reviews/profiles/trevor.png",
    position: "CTO/Founder",
    company: "Plutos App",
    companyLink: "https://apps.apple.com/in/app/plutos-data",
    companyLogo: "/reviews/companies/plutos.png",
    rating: 5,
    comment:
      "Great quality work, good communication, very clever SWE and is capable of handling complex tasks with minimal directive.",
    isFeatured: false,
    source: "Google",
  },
  {
    name: "Samira Ismail",
    position: "Mechanical Engineer",
    profileImage: "/reviews/profiles/samira.png",
    company: "New Motion Labs",
    companyLogo: "/reviews/companies/nml.png",
    rating: 5,
    comment:
      "Devino was great to work with throughout our project.They have great attention to detail when it comes to both the frontend design and UI/UX and the backend functionality. They were always ready to address our concerns and requirements as they were added and updated us regularly on the progress of the work. They're highly recommended for projects where time is of the essence or have tight deadlines and yet still require top notch standard.",
    companyLink: "https://www.newmotionlabs.com",
    isFeatured: true,
    source: "Google",
    link: googleReviewsLink,
  },
  {
    name: "Thibeau Maerevoet",
    position: "CEO & Founder",
    company: "Proxyscrape",
    companyLink: "https://proxyscrape.com",
    companyLogo: "/reviews/companies/proxyscrape.png",
    profileImage: "/reviews/profiles/thibeau.png",
    rating: 5,
    comment:
      "Amin was fantastic to work. He delivered professional, high-quality work with our ELK Stack. Highly recommend!",
    isFeatured: true,
    source: "Google",
  },
  {
    name: "Ali Asif",
    position: "Product Advisor & Angel Investor",
    company: "Various Startups",
    profileImage: "/reviews/profiles/ali.png",

    rating: 5,
    comment:
      "Amin & team are a skilled and professional group. Updates were communicated promptly and any adjustments needed to milestones were explained thoroughly. I appreciated the attention to detail and the effort they made to understand the goals of my project as well. Overall, Amin was a delight to work with. At an affordable rate, this team has become a no-brainer for me to collaborate with again.",
    isFeatured: false,
    source: "Google",
  },
  {
    name: "Kaleb Dortono",
    position: "CEO & Founder",
    company: "KickAds Marketing",
    companyLink: "https://explicitadvisory.com/",
    profileImage: "/reviews/profiles/kaleb.png",
    rating: 5,
    comment:
      "Thank you for helping us with everything on the web-dev side! From web development, applications, automations, and dashboards - Amin has been able to help us out in so many areas, and help push our agency forward!",
    isFeatured: false,
    source: "Google",
  },
  {
    name: "Matt Ross",
    position: "Director, Applied Research, Artificial Intelligence and UGC",
    company: "Scribd",
    companyLink: "https://www.scribd.com/",
    companyLogo: "/reviews/companies/scribd.png",
    profileImage: "/reviews/profiles/matt.png",
    rating: 5,
    comment:
      "Amin was incredible to work with. He paid particular attention to my actual business needs. Investigating the larger context as to why this was needed so that he delivered the right solution to us. Would hire again 100%!",
    isFeatured: true,
    source: "Google",
  },
  {
    name: "Jeremy Thiesen",
    position: "CEO & Founder",
    company: "Math Anex",
    companyLink: "https://mathanex.com",
    companyLogo: "/reviews/companies/mathanex.png",
    profileImage: "/reviews/profiles/jeremy.png",
    rating: 5,
    comment:
      "The first thing you'll notice about Amin is his positive energy! He is excited and ready to jump in and get things done, learn or just energize the team. He quickly created good relationships with everyone on the team and was active in trying to help everyone be able to use his code to improve their work, results and experience. Secondly, you'll notice how hard of a worker he is. He is willing to put in the time and effort to get up to speed. You won't see him ducking out early, rather he will stick around until the work he said he would do is done.",
    source: "Google",
    link: linkedinRecommendations,
  },
  {
    name: "Will Evers",
    position: "VP of Engineering",
    company: "RentCheck",
    companyLink: "https://getrentcheck.com",
    companyLogo: "/reviews/companies/rentcheck.png",
    profileImage: "/reviews/profiles/will.png",
    rating: 5,
    comment:
      "Amin was hired for backend projects on our AWS API Gateway/Lambda applications, however, he demonstrated that he was knowledgeable and comfortable with front end development, automated testing, & several other skill domains. He got up to speed on our stack and team culture insanely quick. Aside form his technical skills, Amin is a wonderful person whose positivity, curiosity & willingness to give and receive feedback is remarkable. Amin had a huge impact on our team's culture and energy and is missed by all. If you are looking for a software engineer, I promise you will not be making a mistake by hiring Amin!",
    source: "Google",
    link: linkedinRecommendations,
  },
];

export default reviews;
