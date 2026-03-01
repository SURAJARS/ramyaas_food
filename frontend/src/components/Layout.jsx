import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { gettext } from '../utils/translations';
import logoImage from '../assets/logo.png';

export const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 flex-1">
            <img 
              src={logoImage} 
              alt="RAMYAAS Logo" 
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-ramyaas-700">
                {gettext('ramyaas', language)}
              </h1>
              <p className="text-xs text-gray-500">
                {gettext('tagline', language)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart link */}
            <Link
              to="/cart"
              className="relative p-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-100 transition-smooth"
            >
              <span className="text-2xl">🛒</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            <button
              onClick={toggleLanguage}
              className="px-2 sm:px-4 py-2 bg-ramyaas-100 text-ramyaas-700 rounded-lg font-semibold hover:bg-ramyaas-200 transition-smooth text-sm sm:text-base flex items-center gap-2 group relative"
            >
              <span className="text-xl">🌐</span>
              <span>{language === 'ta' ? 'EN' : 'TA'}</span>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                {language === 'ta' 
                  ? 'Switch to English' 
                  : 'தமிழ்க்கு மாற்றவும்'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Navigation = () => {
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'snacks', path: '/snacks' },
    { key: 'menu', path: '/menu' },
    { key: 'reels', path: '/reels' },
    { key: 'contact', path: '/contact' },
    { key: 'bulkOrders', path: '/bulk-orders' },
    { key: 'catering', path: '/catering' },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 py-3">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium whitespace-nowrap transition-smooth ${
                  isActive
                    ? 'text-ramyaas-700 font-bold border-b-2 border-ramyaas-600'
                    : 'text-gray-600 hover:text-ramyaas-600'
                }`
              }
            >
              {gettext(item.key, language)}
            </NavLink>
          ))}
        </div>

        {/* Mobile Navigation - Hamburger Menu */}
        <div className="md:hidden flex items-center justify-between py-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl text-gray-600 hover:text-ramyaas-600 transition-smooth"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-50 border-t border-gray-200 py-2 px-2 space-y-1 animate-in">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                    isActive
                      ? 'bg-ramyaas-100 text-ramyaas-700 font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {gettext(item.key, language)}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export const Footer = () => {
  const { language } = useLanguage();
  const [expandedPolicy, setExpandedPolicy] = useState(null);

  const policies = [
    {
      id: 'terms',
      titleEN: 'Terms and Conditions',
      titleTA: 'விதிமுறைகள் மற்றும் நிபந்தனைகள்',
      contentEN: `Terms and Conditions

1. Acceptance of Terms
By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.

2. Use License
Permission is granted to temporarily download one copy of the materials (information or software) from our website for personal, non-commercial transitory viewing only.

3. Disclaimer
The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

4. Limitations
In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.

5. Accuracy of Materials
The materials appearing on our website could include technical, typographical, or photographic errors.

6. Links
We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site.

7. Modifications
We may revise these terms and conditions for our website at any time without notice.

8. Governing Law
These terms and conditions are governed by and construed in accordance with the laws of India.`,
      contentTA: `விதிமுறைகள் மற்றும் நிபந்தனைகள்

1. விதிமுறைகளை ஏற்றுக்கொள்ளுதல்
இந்த வெப்சைட்டை அணுகி பயன்படுத்துவதன் மூலம், நீங்கள் இந்த ஒப்பந்தத்தின் விதிமுறைகளைப் பற்றி ஏற்றுக்கொள்ளுகிறீர்கள்.

2. பயன்பாட்டு உரிமம்
எங்கள் வெப்சைட்டிலிருந்து தற்காலிகமாக ஒரு நகலை ஆள்நிலை, வணிக சாரற்ற பார்வைக்கு மாத்திரம் பதிவிறக்க அனுமதி வழங்கப்படுகிறது.

3. உத்தரவாதம் மறுப்பு
எங்கள் வெப்சைட்டில் உள்ள பொருட்கள் 'உள்ளபடியே' வழங்கப்படுகின்றன. நாங்கள் எந்தவொரு உத்தரவாதத்தையும் அளிக்கவில்லை.

4. வரம்புகள்
எங்கள் நிறுவனம் அல்லது அதன் சரபரை வழங்குபவர்கள் எந்த சேதத்தையும் பொறுப்பாக இருக்க மாட்டார்கள்.

5. பொருட்களின் துல்லியத்தன்மை
எங்கள் வெப்சைட்டில் தோன்றும் பொருட்களில் பிழைகள் இருக்கலாம்.

6. இணைப்புகள்
நாங்கள் எங்கள் வெப்சைட்டுடன் இணைந்துள்ள அனைத்து தளங்களையும் மர்ம ய்ச்சி செய்யவில்லை.

7. மாற்றங்கள்
நாங்கள் நாம் மாற்றலாம் உடன் அறிவிப்பு இல்லாமல்.

8. பொருந்தக்கூடிய சட்டம்
இந்த விதிமுறைகள் இந்தியா சட்டங்களால் நிறுவப்பட்டுள்ளன.`
    },
    {
      id: 'privacy',
      titleEN: 'Privacy Policy',
      titleTA: 'ரகசிய கொள்கை',
      contentEN: `Privacy Policy

1. Information We Collect
We may collect information about you when you visit our website, including your name, email address, phone number, and any messages you send us.

2. How We Use Your Information
We use the information we collect to:
- Process your orders and inquiries
- Send you updates about your orders
- Respond to your messages and requests
- Improve our website and services

3. Protection of Your Information
We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.

4. Third-Party Disclosure
We do not sell, trade, or rent your personal information to third parties without your consent.

5. Cookies
Our website may use cookies to enhance your browsing experience.

6. External Links
Our website contains links to external sites. We are not responsible for the privacy practices or content of these external sites.

7. Changes to Privacy Policy
We may update this privacy policy periodically.

8. Contact Us
If you have any questions about our privacy policy, please contact us at: ramyakumar031998@gmail.com`,
      contentTA: `ரகசிய கொள்கை

1. நாங்கள் சேகரிக்கும் தகவல்
நீங்கள் எங்கள் வெப்சைட்டை பார்வையிடும்போது, நாங்கள் உங்கள் பெயர், மின்னஞ்சல், தொலைபேசி எண் போன்ற தகவல்களைச் சேகரிக்கலாம்.

2. நாங்கள் உங்கள் தகவலை எவ்வாறு பயன்படுத்துகிறோம்
- உங்கள் ஆர்டர்கள் மற்றும் விசாரணைகளைச் செயல்படுத்த
- ஆர்டர் புதுப்பிப்புகள் அனுப்ப
- உங்கள் செய்திகள் மற்றும் கோரிக்கைகளுக்கு பதிலளிக்க
- எங்கள் வெப்சைட் மற்றும் சேவைகளை மேம்படுத்த

3. உங்கள் தகவலின் பாதுகாப்பு
நாங்கள் உங்கள் ব்யக்திக்தான தகவலைப் பாதுகாக்க பொருத்தமான பாதுகாப்பு நடவடிக்கைகளை செயல்படுத்துகிறோம்.

4. மூன்றாம் பக்ష பிரகாசனம்
நாங்கள் உங்கள் ஒப்புதல் இல்லாமல் உங்கள் ব்যக்திக்தான தகவலை விற்க வில்லை.

5. குக்கீஸ்
எங்கள் வெப்சைட் உங்கள் உலாவல் அனுபவத்தை மேம்படுத்த குக்கீஸ் பயன்படுத்தலாம்.

6. வெளிப்புற இணைப்புகள்
எங்கள் வெப்சைட் வெளிப்புற தளங்களுடன் இணைப்புகளைக் கொண்டுள்ளது.

7. ரகசிய கொள்கை மாற்றங்கள்
இந்த கொள்கையில் எதிர்காலத்தில் மாற்றங்கள் ஏற்படலாம்.

8. எங்களைத் தொடர்பு கொள்ளவும்
ஏதேனும் கேள்விகள் இருந்தால் ramyakumar031998@gmail.com என்ற மின்னஞ்சலுக்கு தொடர்பு கொள்ளவும்.`
    },
    {
      id: 'shipping',
      titleEN: 'Shipping Policy',
      titleTA: 'ஷிப்பிங் கொள்கை',
      contentEN: `Shipping Policy

1. Shipping Locations
We currently ship within India. International shipping is not available at this time.

2. Shipping Charges
- Standard Shipping: Free for orders above ₹500
- Orders below ₹500: ₹50 shipping charge
- Express Shipping: ₹100 for faster delivery (2-3 days)

3. Delivery Timeline
- Standard Delivery: 5-7 business days
- Express Delivery: 2-3 business days
- Delivery time calculated from order confirmation, excluding weekends and holidays

4. Order Processing
Orders are processed within 24-48 hours after payment confirmation.

5. Shipping Address
Please ensure your shipping address is clear, complete, and accurate.

6. Tracking Information
Once your order is shipped, you will receive a tracking number via email.

7. Damage During Transit
If your package arrives damaged:
- Take photographs of the damaged package and contents
- Contact us immediately with these photos
- We will arrange a replacement or refund

8. Lost Packages
If a package is lost in transit:
- Contact us with tracking number and photos
- We will file a claim with the courier and keep you updated
- Replacement or refund will be issued once claim is resolved

9. Delivery Issues
For any delivery-related issues, contact us:
Email: ramyakumar031998@gmail.com
WhatsApp: +91 7373105165
Phone: +91 8248125388

10. Shipping Restrictions
Certain areas may have shipping restrictions or additional charges.

11. Free Shipping
Free shipping is applicable on orders above ₹500 for standard delivery within India.`,
      contentTA: `ஷிப்பிங் கொள்கை

1. ஷிப்பிங் இருப்பிடங்கள்
நாங்கள் தற்போது இந்தியாவில் மட்டுமே அனுப்பி வைக்கிறோம்.

2. ஷிப்பிங் கட்டணங்கள்
- சாதாரண ஷிப்பிங்: ₹500க்கு மேல் உள்ள ஆர்டருக்கு இலவசம்
- ₹500க்குக் குறைவான ஆர்டர்: ₹50 ஷிப்பிங் கட்டணம்
- எக்ஸ்ப்ரெஸ் ஷிப்பிங்: வேகமான டெலிவரிக்கு ₹100 (2-3 நாட்கள்)

3. டெலிவரி நாட்கணக்கு
- சாதாரண டெலிவரி: 5-7 வேலை நாட்கள்
- எக்ஸ்ப்ரெஸ் டெலிவரி: 2-3 வேலை நாட்கள்
- ஆர்டர் உறுதிப்படுத்தலின் பிறகு இருந்து கணக்கிடப்படுகிறது

4. ஆர்டர் செயல்படுத்தல்
ஆர்டர்கள் பணம் செலுத்தல் உறுதிப்படுத்தலின் பிறகு 24-48 மணிநேரத்துக்குள் செயல்படுத்தப்படுகிறது.

5. ஷிப்பிங் முகவரி
உங்கள் ஷிப்பிங் முகவரி தெளிவாக, முழுமையாக, மற்றும் துல்லியமாக இருப்பதை உறுதிப்படுத்தவும்.

6. ட்ராக்கிங் தகவல்
உங்கள் ஆர்டர் அனுப்பப்பட்ட பிறகு, நீங்கள் மின்னஞ்சலின் மூலம் ட்ராக்கிங் எண்ணைப் பெறுவீர்கள்.

7. டிரানசிட்டின் போது சேதம்
உங்கள் பொருட்கள் சேதமடைந்து வந்தால்:
- சேதமடைந்த பொருட்கள் மற்றும் உள்ளடக்கத்தின் புகைப்படங்கள் எடுக்கவும்
- உடனடியாக எங்களைத் தொடர்பு கொள்ளவும்
- நாங்கள் மாற்றுப் பொருட்கள் அல்லது நிதி திரும்பப் பெற ஏற்பாடு செய்வோம்

8. இழந்த பொருட்கள்
பொருட்கள் ஷிப்பிங்கில் இழந்திருந்தால்:
- ட்ராக்கிங் எண் மற்றும் புகைப்படங்களுடன் எங்களைத் தொடர்பு கொள்ளவும்
- நாங்கள் கூரியரிடம் கோரிக்கை தாக்கல் செய்வோம்
- கோரிக்கை தீர்க்கப்பட்ட பிறகு மாற்றுப் பொருட்கள் அல்லது நிதி வழங்கப்படும்

9. டெலிவரி சிக்கல்கள்
டெலிவரி சம்பந்தமான ஏதேனும் சிக்கலுக்கு:
மின்னஞ்சல்: ramyakumar031998@gmail.com
WhatsApp: +91 7373105165
தொலைபேசி: +91 8248125388`
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg text-ramyaas-700 mb-4">
              {gettext('ramyaas', language)}
            </h3>
            <p className="text-sm text-gray-600">
              {gettext('tagline', language)}
            </p>
            <p className="text-xs text-gray-500 mt-4">
              {language === 'ta' ? 'வீட்டில் தயாரிக்கப்பட்ட, ஆரோக்கியமாக உணவு.' : 'Homemade, healthy food.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">
              {language === 'ta' ? 'விரைவு இணைப்புகள்' : 'Quick Links'}
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <Link to="/" className="hover:text-ramyaas-600 transition-colors">
                  {gettext('home', language)}
                </Link>
              </li>
              <li>
                <Link to="/snacks" className="hover:text-ramyaas-600 transition-colors">
                  {gettext('snacks', language)}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-ramyaas-600 transition-colors">
                  {gettext('contact', language)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">
              {language === 'ta' ? 'தொடர்பு' : 'Contact'}
            </h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <span className="font-medium">{language === 'ta' ? 'மின்னஞ்சல்:' : 'Email:'}</span><br />
                <a href="mailto:ramyakumar031998@gmail.com" className="hover:text-ramyaas-600">
                  ramyakumar031998@gmail.com
                </a>
              </p>
              <p>
                <span className="font-medium">{language === 'ta' ? 'தொலைபேசி:' : 'Phone:'}</span><br />
                <a href="tel:+918248125388" className="hover:text-ramyaas-600">
                  +91 8248125388
                </a>
              </p>
              <p>
                <span className="font-medium">WhatsApp:</span><br />
                <a href="https://wa.me/917373105165" className="hover:text-ramyaas-600" target="_blank" rel="noopener noreferrer">
                  +91 7373105165
                </a>
              </p>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">
              {language === 'ta' ? 'எங்களைப் பின்தொடரவும்' : 'Follow Us'}
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              {language === 'ta' ? 'சமூக ஊடகத்தில் எங்களுடன் தொடர்பு கொள்ளவும்' : 'Connect with us on social media'}
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-ramyaas-600 hover:text-ramyaas-700 text-lg">📱</a>
              <a href="#" className="text-ramyaas-600 hover:text-ramyaas-700 text-lg">📸</a>
              <a href="#" className="text-ramyaas-600 hover:text-ramyaas-700 text-lg">▶️</a>
            </div>
          </div>
        </div>

        {/* Policies Section */}
        <div className="mb-12 border-t border-gray-300 pt-8">
          <h3 className="font-bold text-lg text-ramyaas-700 mb-6">
            {language === 'ta' ? 'கொள்கைகள்' : 'Policies'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policies.map((policy) => (
              <div key={policy.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}
                  className="w-full px-6 py-4 text-left font-semibold text-ramyaas-700 hover:bg-ramyaas-50 transition-colors flex justify-between items-center"
                >
                  {language === 'ta' ? policy.titleTA : policy.titleEN}
                  <span className="text-xl">
                    {expandedPolicy === policy.id ? '−' : '+'}
                  </span>
                </button>
                
                {expandedPolicy === policy.id && (
                  <div className="px-6 py-4 text-sm text-gray-700 border-t border-gray-200 max-h-96 overflow-y-auto bg-gray-50">
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {language === 'ta' ? policy.contentTA : policy.contentEN}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © 2024 RAMYAAS. {language === 'ta' ? 'அனைத்து உரிமைகளும் உள்ளன.' : 'All rights reserved.'}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {language === 'ta' ? 'வெப்சைட் வடிவமைப்பு - Ramya & Team' : 'Website designed by Ramya & Team'}
          </p>
        </div>
      </div>
    </footer>
  );
};
