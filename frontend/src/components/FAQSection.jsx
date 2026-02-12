import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const FAQSection = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      questionEN: 'What are the ingredients used in your products?',
      questionTA: 'உங்கள் பொருட்களில் பயன்படுத்தப்படும் உপাদानங்கள் என்ன?',
      answerEN: 'All our products are made with pure, natural ingredients without any preservatives, artificial additives, or palm oil. We prioritize quality and health in every product we make.',
      answerTA: 'எங்கள் அனைத்து பொருட்களும் சுத்தமான, இயற்கையான உপाদனங்களுடன் தயாரிக்கப்பட்டுள்ளன. எந்த பாதுகாப்பு, செயற்கை சேர்க்கை அல்லது பாமாயெல்ளை பயன்படுத்தப்படவில்லை।'
    },
    {
      questionEN: 'Do you offer customized catering services?',
      questionTA: 'நீங்கள் தனிப்பயன் கேட்டரிங் சேவைகள் வழங்குகிறீர்களா?',
      answerEN: 'Yes! We offer customized catering services for all types of events including weddings, parties, corporate events, and more. Please contact us via WhatsApp or email to discuss your requirements.',
      answerTA: 'ஆம்! நாங்கள் திருமணங்கள், கட்சிகள், கார்பொரேட் நிகழ்வுகள் மற்றும் பல உட்பட அனைத்து வகையான நிகழ்வுகளுக்கான தனிப்பயன் கேட்டரிங் சேவைகளை வழங்குகிறோம்।'
    },
    {
      questionEN: 'What is your shipping timeline?',
      questionTA: 'உங்கள் ஷிப்பிங் நாட்கணக்கு என்ன?',
      answerEN: 'Standard delivery takes 5-7 business days from order confirmation. We also offer express delivery (2-3 days) for an additional charge of ₹100. Free shipping is available for orders above ₹500.',
      answerTA: 'ஆர்டர் உறுதிப்படுத்தலிலிருந்து சாதாரண டெலிவரি 5-7 வேலை நாட்கள் ஆகும். நாங்கள் ₹100 கூடுதல் கட்டணத்தில் எக்ஸ்ப்ரெஸ் டெலிவரিও வழங்குகிறோம்। ₹500க்கு மேல் ஆர்டருக்கு இலவச ஷிப்பிங் கிடைக்கும்।'
    },
    {
      questionEN: 'Can I place bulk orders?',
      questionTA: 'நான் மொத்த ஆர்டர்கள் வைக்க முடியுமா?',
      answerEN: 'Absolutely! We welcome bulk orders for corporate gifts, resellers, and events. We offer competitive bulk pricing. Please contact us to discuss your specific requirements.',
      answerTA: 'நிச்சயமாக! கார்பொரேட் பரிசுகள், மறுவிற்பனையாளர்கள் மற்றும் நிகழ்வுகளுக்கான மொத்த ஆர்டர்களை நாங்கள் வரவேற்கிறோம்। আমরা போட்டி மொத்த விலை வழங்குகிறோம்।'
    },
    {

      questionEN: 'How do I track my order?',
      questionTA: 'என் ஆர்டரைப் பதிவு செய்வது எப்படி?',
      answerEN: 'Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on the courier website.',
      answerTA: 'உங்கள் ஆர்டர் அனுப்பப்பட்ட பிறகு, நீங்கள் மின்னஞ்சலின் மூலம் ட்র்যாக்கிங் எண்ணைப் பெறுவீர்கள்। கூரியர் வெப்சைட்டில் உங்கள் பொருண்டைப் பதிவு செய்ய இந்த எண்ணைப் பயன்படுத்தலாம்।'
    },
    {
      questionEN: 'What payment methods do you accept?',
      questionTA: 'நீங்கள் எந்த பணம் செலுத்த முறைகளை ஏற்றுக்கொள்கிறீர்கள்?',
      answerEN: 'We accept all major payment methods including credit cards, debit cards, digital wallets, and UPI transfers. All payments are secure and encrypted.',
      answerTA: 'நாங்கள் கிரெடிட் கார்டு, டெபிட் கார்டு, டிজிटல் பணப்பெட்டகம், மற்றும் UPI பரிமாற்றம் உட்பட அனைத்து முக்கிய பணம் செலுத்த முறைகளை ஏற்றுக்கொள்கிறோம்।'
    },
    {
      questionEN: 'Can I cancel or modify my order?',
      questionTA: 'நான் என் ஆர்டரை ரद்து செய்ய அல்லது மாற்ற முடியுமா?',
      answerEN: 'Orders can be cancelled or modified within 2 hours of placement. After that, the order will be in processing. Please contact us immediately if you need to make changes.',
      answerTA: 'ஆர்டர் வைக்கப்பட்ட 2 மணிநேரத்துக்குள் ரத்து அல்லது மாற்றப்படலாம். அதன் பிறகு ஆர்டர் செயல்படுத்தப்படும் நிலையில் இருக்கும்। மாற்றங்கள் தேவைப்பட்டால் உடனடியாக எங்களைத் தொடர்பு கொள்ளவும்।'
    },
    {
      questionEN: 'Do you offer corporate gift packages?',
      questionTA: 'நீங்கள் கார்பொரேட் பரிசு பொதிகளை வழங்குகிறீர்களா?',
      answerEN: 'Yes! We create customized corporate gift packages. Contact us with your requirements, budget, and delivery date, and we will prepare the perfect gift package for your team.',
      answerTA: 'ஆம்! நாங்கள் தனிப்பயன் கார்பொரேட் பரிசு பொதிகளை உருவாக்குகிறோம். உங்கள் தேவைகள், பட்ஜெட், மற்றும் டெலிவரி தேதியுடன் எங்களைத் தொடர்பு கொள்ளவும்।'
    },


  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-ramyaas-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-ramyaas-700 mb-4">
            {language === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-gray-600 text-lg">
            {language === 'ta' ? 'உங்கள் கேள்விகளுக்கு விரைவான பதிலடை' : 'Quick answers to your questions'}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left font-semibold text-ramyaas-700 hover:bg-ramyaas-50 transition-colors flex justify-between items-center gap-4"
              >
                <span className="flex-1">
                  {language === 'ta' ? faq.questionTA : faq.questionEN}
                </span>
                <span className={`text-2xl font-light text-ramyaas-600 transition-transform ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>

              {/* Answer - Collapsible */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 py-4 border-t border-gray-200 bg-ramyaas-50/30 text-gray-700 leading-relaxed">
                  {language === 'ta' ? faq.answerTA : faq.answerEN}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-16 bg-gradient-to-r from-ramyaas-100 to-amber-100 rounded-lg p-8 text-center border border-ramyaas-200">
          <h3 className="text-2xl font-bold text-ramyaas-700 mb-3">
            {language === 'ta' ? 'இன்னும் உதவி தேவையா?' : 'Need More Help?'}
          </h3>
          <p className="text-gray-700 mb-6">
            {language === 'ta' ? 'இன்னும் கேள்விகள் உள்ளதா? எங்கள் குழுவைத் தொடர்பு கொள்ளவும் மற்றும் நாங்கள் உதவ மகிழ்ச்சி கொள்வோம்!' : 'Still have questions? Contact our team and we\'ll be happy to help!'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:ramyakumar031998@gmail.com"
              className="px-6 py-3 bg-ramyaas-600 text-white rounded-lg font-semibold hover:bg-ramyaas-700 transition-colors"
            >
              {language === 'ta' ? 'மின்னஞ்சல் அனுப்பவும்' : 'Email Us'}
            </a>
            <a
              href="https://wa.me/917373105165"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              {language === 'ta' ? 'WhatsApp இல் தொடர்பு கொள்ளவும்' : 'Chat on WhatsApp'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
