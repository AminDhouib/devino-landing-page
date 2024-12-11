import Image from "next/image";

export default function Privacy() {
  return (
    <section className="pt-[2rem] pb-[6rem] tracking-tighter max-w-[min(75rem,96svw)] sm:max-w-[100%] sm:px-6 mx-auto mb-12 lg:mb-6">
      <div
          className="bg-lightbluehover dark:bg-darkblue dark:text-white bg-opacity-10 rounded-[30px] leading-10 text-xl relative px-12 pt-24 pb-40 lg:text-base lg:leading-8 lg:px-6 lg:pt-12 lg:pb-24 ">
        <p className="mb-8 lg:mb-4">
          This Privacy Policy provides you with information about how we collect, use, and protect your data when you
          visit our website. This website serves as a digital showcase for our consultancy services at Devino.
        </p>
        <p className="mb-8 lg:mb-4">
          <div className="font-bold">Information Collection</div>
          When you visit our website, we automatically collect certain information related to your device and
          interaction with our site. This includes details such as your IP address, browser type, operating system,
          referring URLs, device characteristics, and timestamps. This data is used solely for analytical purposes to
          understand website usage trends and improve your experience.
        </p>
        <p className="mb-8 lg:mb-4">
          <div className="font-bold">Use of Information</div>
          The information we collect is used in aggregate form to analyze how our website is used, such as which pages
          are most frequently visited and how users navigate through our site. This helps us enhance the quality of our
          website and tailor it to better meet our visitors{"'"} needs.
        </p>
        <p className="mb-8 lg:mb-4">
          <div className="font-bold">
            Cookies and Tracking</div>
          We utilize cookies (small data files stored on your device) to enhance your browsing experience. These cookies
          are used to collect information about how you interact with our website. The data gathered through cookies is
          used exclusively for statistical analysis and website improvement purposes.
        </p>
        <p className="mb-8 lg:mb-4">
          <div className="font-bold">
            Data Sharing</div>
          We do not sell, trade, or rent your personal information to third parties. The collected information is used
          solely for the purposes stated herein.
        </p>
        <p className="mb-8 lg:mb-4">
          <div className="font-bold">
            Changes to This Policy</div>
          We may update this Privacy Policy from time to time to reflect changes to our information practices. We
          encourage you to review this page periodically for the latest information on our privacy practices.
        </p>
        <p>
          Your use of our website constitutes your acceptance of this Privacy Policy and your consent to the practices it describes.
        </p>
        <Image
            src={"/icons/privacy-sketch.svg"}
            alt={"arrow icon"}
            height={100}
            width={100}
            className={`h-52 w-52 absolute bottom-[-6rem] left-8 lg:h-36 lg:w-36 lg:bottom-[-4rem] dark:brightness-[100]`}
        />
      </div>
    </section>
  );
}
