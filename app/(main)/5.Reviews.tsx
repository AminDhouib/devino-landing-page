import Image from "next/image";

const reviewsL = [
  {
    image: "/brand/logo.png",
    name: "John Doe1",
    position: "CEO",
    text: `They were professional to the core and ensured that they deliver no matter what.

    NWORX3 design has been a success story. We have deployed NWORX3 at multiple enterprises since the redesign. We have seen a significant decrease in the 'UX friction' feedback from end users. There has been a 200% improvement in the positive anecdotes on the App UI.`,
    company: "Google",
  },
  {
    image: "/brand/logo.png",
    name: "Jane Doe",
    position: "CTO",
    text: `The workflow was very direct and effective.

    They were able to really listen to us and learn about our business, being open to the changes that we brought. Next to the fact that design skills are top-notch.`,
    company: "Facebook",
  },
  {
    image: "/brand/logo.png",
    name: "John Smith",
    position: "COO",
    text: `Devino is very fast and efficient.

    Whenever we ask them for something, they have it ready by the next day. If we can’t provide immediate feedback, they keep working on other things to avoid wasting time waiting.`,
    company: "Amazon",
  },
];

const reviewsR = [
  {
    image: "/brand/logo.png",
    name: "John Doe2",
    position: "CEO",
    text: `The most impressive aspect of this company is the collaboration between the UX engineer and our team.

    So many consulting companies claim they provide fantastic customer support but often find out after the contract is signed that this isn't the case. This is not the situation with Devino. Their engineer and project manager have been easy to get a hold of and have been in constant contact with our team throughout the project.`,
    company: "Google",
  },
  {
    image: "/brand/logo.png",
    name: "Jane Doe",
    position: "CTO",
    text: `The approach to assign one main designer to our project, that worked full-time on it was very unique.

    It allowed them to build a very detailed understanding of our - sometimes a bit complex - product. Essentially having a competent full-time designer on your team was very valuable to us.`,
    company: "Facebook",
  },
  {
    image: "/brand/logo.png",
    name: "John Smith",
    position: "COO",
    text: `The value proposition is very high with Devino — their rates are fair and their team is excellent.

    As a startup, we have been working towards product market fit. This involves demonstrations to potential users and investors. The improvements to our UI have led to new business as well as interest from investors.`,
    company: "Amazon",
  },
];

export default function Reviews() {
  return (
    <section className="grid grid-cols-2 max-w-[min(75rem,96svw)] mx-auto gap-4 pt-[10rem]">
      <div>
        <h1 className="h-max p-4 text-6xl font-semibold pb-20 leading-[4.25rem]">
          We create <br /> business value <br /> with design
        </h1>
        {reviewsL.map((review, i) => (
          <Review key={review.name} review={review} i={i + 1} />
        ))}
      </div>

      <div className="">
        {reviewsR.map((review, i) => (
          <Review key={review.name} review={review} i={i} />
        ))}
        <div className="bg-[#1d1e22] mt-4 rounded-2xl p-8 py-12 text-white flex justify-evenly">
          <p>⭐⭐⭐⭐⭐</p>
          <h1>81 REVIEWS</h1>
        </div>
      </div>
    </section>
  );
}

type Props = {
  review: {
    image: string;
    name: string;
    position: string;
    text: string;
    company: string;
  };
  i: number;
};

const Review = ({ review, i }: Props) => {
  const isEven = i % 2 === 0;
  return (
    <div
      className={`${
        isEven ? "bg-white" : "bg-[#1d1e22] text-[#f6f4f2]"
      } w-full rounded-2xl flex flex-col items-start justify-center font-serif p-8 py-12 text-left font-medium mt-4`}
    >
      <p className="flex flex-col gap-4 pr-8 whitespace-pre-line">
        {review.text}
      </p>

      <div className="flex items-center justify-between w-full pt-8">
        <div className="flex items-center gap-4">
          <Image
            src={review.image}
            alt="quote"
            height={40}
            width={40}
            className="rounded-full"
          />
          <p className="text-[#909090] font-sans">
            {review.name}, {review.position} @ {review.company}
          </p>
        </div>
        <Image
          src="/verified-by-clutch.svg"
          alt="quote"
          height={72}
          width={72}
          className=""
        />
      </div>
    </div>
  );
};
