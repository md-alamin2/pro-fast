import React, { use } from "react";

const faqPromise=fetch("/data/faq.json").then(res=>res.json())

const FAQ = () => {
  const faqData = use(faqPromise)

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-secondary text-center mb-6">
        Frequently Asked Question (FAQ)
      </h2>
      <p className="text-center max-w-2xl mx-auto">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
      <div className="space-y-4 mt-20">
        {faqData.map((item, index) => (
          <div key={index} className="collapse collapse-arrow bg-primary border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">
              {item.question}
            </div>
            <div className="collapse-content text-sm">
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
