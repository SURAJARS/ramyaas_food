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
          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="RAMYAAS Logo" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-ramyaas-700">
                {gettext('ramyaas', language)}
              </h1>
              <p className="text-xs text-gray-500">
                {gettext('tagline', language)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* ✅ FIXED: Cart link */}
            <Link
              to="/cart"
              className="relative px-4 py-2 rounded-lg hover:bg-gray-100 transition-smooth"
            >
              <span className="text-2xl">🛒</span>
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-ramyaas-100 text-ramyaas-700 rounded-lg font-semibold hover:bg-ramyaas-200 transition-smooth"
            >
              {language === 'ta' ? 'EN' : 'TA'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Navigation = () => {
  const { language } = useLanguage();

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'snacks', path: '/snacks' },
    { key: 'menu', path: '/menu' },
    { key: 'reels', path: '/reels' },
    { key: 'contact', path: '/contact' },
    { key: 'bulkOrders', path: '/bulk-orders' },
    { key: 'catering', path: '/catering' },
    // ❌ HIDDEN: Admin section removed from navigation
    // Accessible via direct URL: /#/admin
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-8 overflow-x-auto py-3">
          {navItems.map(item => (
            /* ✅ FIXED: NavLink instead of <a> */
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium whitespace-nowrap transition-smooth ${
                  isActive
                    ? 'text-ramyaas-700 font-bold'
                    : 'text-gray-600 hover:text-ramyaas-600'
                }`
              }
            >
              {gettext(item.key, language)}
            </NavLink>
          ))}
        </div>
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
      contentEN: `
Terms and Conditions

1. Acceptance of Terms
By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.

2. Use License
Permission is granted to temporarily download one copy of the materials (information or software) from our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
- Modifying or copying the materials
- Using the materials for any commercial purpose or for any public display
- Attempting to decompile or reverse engineer any software contained on the website
- Removing any copyright or other proprietary notations from the materials
- Transferring the materials to another person or "mirroring" the materials on any other server

3. Disclaimer
The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

4. Limitations
In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.

5. Accuracy of Materials
The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.

6. Links
We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.

7. Modifications
We may revise these terms and conditions for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms and conditions.

8. Governing Law
These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
      `,
      contentTA: `
விதிமுறைகள் மற்றும் நிபந்தனைகள்

1. விதிமுறைகளை ஏற்றுக்கொள்ளுதல்
இந்த வெப்சைட்டை அணுகி பயன்படுத்துவதன் மூலம், நீங்கள் இந்த ஒப்பந்தத்தின் விதிமுறைகளைப் பற்றி ஏற்றுக்கொள்ளுகிறீர்கள்.

2. பயன்பாட்டு உரிமம்
எங்கள் வெப்சைட்டிலிருந்து தற்காலிகமாக ஒரு நகலை ব்যক்তிগত, வணிக சாரற்ற பார்வைக்கு மாத்திரம் பதிவிறக்ക அனுமதி வழங்கப்படுகிறது.

3. உத்தரவாதம் மறுப்பு
எங்கள் வெப்சைட்டில் உள்ள பொருட்கள் 'உள்ளபடியே' வழங்கப்படுகின்றன. நாங்கள் எந்தவொரு உத்தரவாதத்தையும் அளிக்கவில்லை.

4. வரம்புகள்
எங்கள் நிறுவனம் அல்லது அதன் சরবரાহகாரர்கள் எந்த சிதைவையும் (தரவு இழப்பு அல்லது லாভம் இழப்பு உட்பட) பொறுப்பாக இருக்க மாட்டார்கள்.

5. பொருட்களின் துல்லியத்தன்மை
எங்கள் வெப்சைட்டில் தோன்றும் பொருட்களில் தொழில்நுட்ப, உண்ணச்சொல், அல்லது ஆப்டிக்கல் பிழைகள் இருக்கலாம்.

6. இணைப்புகள்
நாங்கள் எங்கள் வெப்சைட்டுடன் இணைந்துள்ள அனைத்து தளங்களையும் மராய்ச்சி செய்யவில்லை.

7. மாற்றங்கள்
நாங்கள் எங்கள் வெப்சைட்டின் விதிமுறை மற்றும் நிபந்தனைகளை எப்போது வேண்டுமென்றாலும் திருத்தலாம்.

8. பொருந்தக்கூடிய சட்டம்
இந்த விதிமுறைகள் மற்றும் நிபந்தனைகள் இந்தியா சட்டங்களால் நிறுவப்பட்டுள்ளன.
      `
    },
    {
      id: 'privacy',
      titleEN: 'Privacy Policy',
      titleTA: 'ரகசிய கொள்கை',
      contentEN: `
Privacy Policy

1. Information We Collect
We may collect information about you when you visit our website, including your name, email address, phone number, and any messages you send us through the contact form.

2. How We Use Your Information
We use the information we collect to:
- Process your orders and inquiries
- Send you updates about your orders
- Respond to your messages and requests
- Improve our website and services
- Send promotional materials (if you opt-in)

3. Protection of Your Information
We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.

4. Third-Party Disclosure
We do not sell, trade, or rent your personal information to third parties without your consent. However, we may share information with our trusted partners who assist us in operating our website and conducting our business.

5. Cookies
Our website may use cookies to enhance your browsing experience. Cookies are small files stored on your device that help us remember your preferences.

6. External Links
Our website contains links to external sites. We are not responsible for the privacy practices or content of these external sites.

7. Your Rights
You have the right to access, update, or delete your personal information at any time by contacting us.

8. Changes to Privacy Policy
We may update this privacy policy periodically. We will notify you of any significant changes by posting the new policy on our website.

9. Contact Us
If you have any questions about our privacy policy, please contact us at: ramyakumar031998@gmail.com
      `,
      contentTA: `
ரகசிய கொள்கை

1. நாங்கள் சேகரிக்கும் தகவல்
நீங்கள் எங்கள் வெப்சைட்டை பார்வையிடும்போது, நாங்கள் உங்கள் பெயர், மின்னஞ்சல், தொலைபேசி எண் போன்ற தகவல்களைச் சேகரிக்கலாம்.

2. நாங்கள் உங்கள் தகவலை எவ்வாறு பயன்படுத்துகிறோம்
- உங்கள் ஆர்டர்கள் மற்றும் விசாரணைகளைச் செயல்படுத்த
- ஆர்டர் புதுப்பிப்புகள் அனுப்ப
- உங்கள் செய்திகள் மற்றும் கோரிக்கைகளுக்கு பதிலளிக்க
- எங்கள் வெப்சைட் மற்றும் சேவைகளை மேம்படுத்த

3. உங்கள் தகவலின் பாதுகாப்பு
நாங்கள் உங்கள் ব்যক்তிগত தகவலைப் பாதுகாக்க பொருத்தமான பாதுகாப்பு நடவடிக்கைகளை செயல்படுத்துகிறோம்.

4. மூன்றாம் পक্ష প্രকাশம்
நாங்கள் உங்கள் ஒப்புதல் இல்லாமல் உங்கள் ব்যक்திগத தகவலை விற்கவோ, வர்த்தகம் செய்யவோ அல்லது வாடகைக்கு விடவோ இல்லை.

5. குக்கீஸ்
எங்கள் வெப்சைட் உங்கள் உலாவல் அனுபவத்தை மேம்படுத்த குக்கீஸ் பயன்படுத்தலாம்.

6. வெளிப்புற இணைப்புகள்
எங்கள் வெப்சைட் வெளிப்புற தளங்களுடன் இணைப்புகளைக் கொண்டுள்ளது. இந்த வெளிப்புற தளங்களின் ரகசியத்ता நடைமுறை அல்லது உள்ளடக்கத்திற்கு நாங்கள் பொறுப்பாக இல்லை.

7. உங்கள் உரிமைகள்
உங்கள் ব்যক்திগத தகவலை அணுக, புதுப்பிக்க அல்லது நீக்க உங்களுக்கு உரிமை உள்ளது.

8. ரகசிய கொள்கை மாற்றங்கள்
இந்த கொள்கையில் எதிர்காலத்தில் மாற்றங்கள் ஏற்படலாம்.

9. எங்களைத் தொடர்பு கொள்ளவும்
ஏதேனும் கேள்விகள் இருந்தால் ramyakumar031998@gmail.com என்ற மின்னஞ்சலுக்கு தொடர்பு கொள்ளவும்.
      `
    },
    {
      id: 'return',
      titleEN: 'Return Policy',
      titleTA: 'திரும்பப் பெறும் கொள்கை',
      contentEN: `
Return Policy

1. Return Period
We offer a 7-day return period from the date of purchase for all products.

2. Condition of Products
Products must be unopened, unused, and in their original packaging to be eligible for return.

3. Return Process
To initiate a return:
- Contact us via email at ramyakumar031998@gmail.com or WhatsApp at +91 7373105165
- Provide your order number and reason for return
- Wait for return authorization
- Ship the product back to us in its original packaging (shipping costs may apply)

4. Refund Timeline
Once we receive and inspect your returned product:
- If approved, refunds will be processed within 5-7 business days
- Refunds will be credited to your original payment method

5. Non-Returnable Items
The following items cannot be returned:
- Opened or partially used products
- Damaged products due to customer mishandling
- Products without original packaging
- Customized or special order items

6. Damaged or Defective Products
If you receive a damaged or defective product, please contact us immediately with photos. We will replace the product or issue a refund at our discretion.

7. Return Shipping
- Return shipping costs are the responsibility of the customer unless the return is due to our error or defective product
- For defective products, we may provide a prepaid return label

8. Exceptions
We reserve the right to refuse returns that do not meet the conditions outlined in this policy.

9. Contact Us
For any return-related queries, contact us at:
Email: ramyakumar031998@gmail.com
WhatsApp: +91 7373105165
      `,
      contentTA: `
திரும்பப் பெறும் கொள்கை

1. திரும்பப்பெறும் காலம்
வாங்குதலின் தேதியிலிருந்து 7 நாட்களுக்குள் எல்லா பொருட்களையும் திரும்பப் பெற முடியும்.

2. பொருட்களின் நிலை
பொருட்கள் திறக்கப்படாத, பயன்படுத்தப்படாத, மற்றும் அசலான பொதி இல்லையாய் திரும்பப்பெறக்கூடியதாக இருக்க வேண்டும்.

3. திரும்பப்பெறும் செயல்முறை
திரும்பப் பெறுவதைத் தொடங்க:
- ramyakumar031998@gmail.com அல்லது +91 7373105165 என்ற WhatsApp-க்கு எங்களைத் தொடர்பு கொள்ளவும்
- உங்கள் ஆர்டர் எண் மற்றும் திரும்பப்பெறக் காரணம் வழங்கவும்
- திரும்பப்பெறுவதற்கான அங்கீகாரம் பெறவும்
- பொருளை அசலான பொதிபுக்குள் எங்களுக்கு மீண்டும் அனுப்பவும் (ஷிப்பிங் செலவுகள் பொருந்தலாம்)

4. நிதி திரும்பப்பெறுவதின் உடன்நடை
நாங்கள் உங்கள் திரும்பப்பெறப்பட்ட பொருளைப் பெற்று ஆய்வு செய்த பிறகு:
- ஒப்புக்கொண்டால், நிதி 5-7 வேலை நாட்களுக்குள் செயல்படுத்தப்படும்
- நிதி உங்கள் அசல் பணம் செலுத்த முறைக்கு வரவு செய்யப்படும்

5. திரும்பப்பெற முடியாத பொருட்கள்
பின்வரும் பொருட்களை திரும்பப் பெற முடியாது:
- திறந்த அல்லது பகுதியாகப் பயன்படுத்தப்பட்ட பொருட்கள்
- வாடிக்கையாளர் கோளாறு காரணமாக சேதமடைந்த பொருட்கள்
- அசலான பொதி இல்லாத பொருட்கள்
- தனிப்பயனாக்கப்பட்ட அல்லது சிறப்பு ஆர்டர் பொருட்கள்

6. சேதமடைந்த அல்லது குறைபாடுள்ள பொருட்கள்
சேதமடைந்த அல்லது குறைபாடுள்ள பொருளைப் பெற்றிருந்தால், உடனடியாக நாங்களைத் தொடர்பு கொள்ளவும். நாங்கள் பொருளை மாற்றுவோம் அல்லது நிதி திரும்பப் பெறுவோம்.

7. திரும்பப்பெறுவதற்கான ஷிப்பிங்
- திரும்பப்பெறுவதற்கான ஷிப்பிங் செலவு வாடிக்கையாளரின் பொறுப்பு (நமது பிழை அல்லது குறைபாடுள்ள பொருளுக்கு தவிர)

8. தொடர்பு கொள்ளவும்
திரும்பப்பெற பற்றிய கேள்விகளுக்கு:
மின்னஞ்சல்: ramyakumar031998@gmail.com
WhatsApp: +91 7373105165
      `
    },
    {
      id: 'shipping',
      titleEN: 'Shipping Policy',
      titleTA: 'ஷிப்பிங் கொள்கை',
      contentEN: `
Shipping Policy

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
Orders are processed within 24-48 hours after payment confirmation. Processing time does not include weekends and public holidays.

5. Shipping Address
Please ensure your shipping address is clear, complete, and accurate. We are not responsible for delayed or failed deliveries due to incorrect address information.

6. Tracking Information
Once your order is shipped, you will receive a tracking number via email. You can use this to track your package.

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
Certain areas may have shipping restrictions or additional charges. We will inform you during checkout if your location has any special shipping conditions.

11. Custom Orders
Custom or bulk orders may have different shipping timelines. Please contact us for specific details.

12. Free Shipping
Free shipping is applicable on orders above ₹500 for standard delivery within India.
      `,
      contentTA: `
ஷிப்பிங் கொள்கை

1. ஷிப்பிங் இருப்பிடங்கள்
நாங்கள் தற்போது இந்தியாவில் மட்டுமே அனுப்பி வைக்கிறோம்.

2. ஷிப்பிங் கட்டணங்கள்
- சாதாரண ஷிப்பிங்: ₹500க்கு மேல் உள்ள ஆர்டருக்கு இலவசம்
- ₹500க்குக் குறைவான ஆர்டர்: ₹50 ஷிப்பிங் கட்டணம்
- எக்ஸ்ப்ரெஸ் ஷிப்பிங்: வேகமான டெலிவரிக்கு ₹100 (2-3 நாட்கள்)

3. டெலிவரி நாட்කணக்கு
- சாதாரண டெலிவரி: 5-7 வேலை நாட்கள்
- எக்ஸ்ப்ரெஸ் டெலிவரி: 2-3 வேலை நாட்கள்
- ஆர்டர் உறுதிப்படுத்தலின் பிறகு இருந்து கணக்கிடப்படுகிறது

4. ஆர்டர் செயல்படுத்தல்
ஆர்டர்கள் பணம் செலுத்தல் உறுதிப்படுத்தலின் பிறகு 24-48 மணிநேரத்துக்குள் செயல்படுத்தப்படுகிறது.

5. ஷிப்பிங் முகவரி
உங்கள் ஷிப்பிங் முகவரி தெளிவாக, முழுமையாக, மற்றும் துல்லியமாக இருப்பதை உறுதிப்படுத்தவும்.

6. ট்র்যাக்கிங் தகவல்
உங்கள் ஆர்டர் அனுப்பப்பட்ட பிறகு, நீங்கள் மின்னஞ்சலின் மூலம் ட்র்যாக்கிங் எண்ணைப் பெறுவீர்கள்.

7. டிரানজிট்டின் போது சேதம்
உங்கள் பொருண்டை சேதமடைந்து வந்தால்:
- சேதமடைந்த பொருண்டு மற்றும் உள்ளடக்கத்தின் புகைப்படங்கள் எடுக்கவும்
- உடனடியாக நாங்களைத் தொடர்பு கொள்ளவும்
- நாங்கள் மாற்றுக் பொருண்டு அல்லது நிதி திரும்பப்பெற ஏற்பாடு செய்வோம்

8. இழந்த பொருண்டுகள்
பொருண்டு டிரানজிட்டில் இழந்திருந்தால்:
- ட்র்যாக்கிங் எண் மற்றும் புகைப்படங்களுடன் நாங்களைத் தொடர்பு கொள்ளவும்
- நாங்கள் கூரியரிடம் கோரிக்கை தாக்கல் செய்வோம்
- கோரிக்கை தீர்க்கப்பட்ட பிறகு மாற்றுக் பொருண்டு அல்லது நிதி வழங்கப்படும்

9. டெலிவரி சிக்கல்கள்
டெலிவரி சம்பந்தமான ஏதேனும் சிக்கலுக்கு:
மின்னஞ்சல்: ramyakumar031998@gmail.com
WhatsApp: +91 7373105165
தொலைபேசி: +91 8248125388
      `
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
              {language === 'ta' ? 'சামাजिक মাध्যमে আমাদের সাথে যোগাযোগ করুন' : 'Connect with us on social media'}
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
            {language === 'ta' ? 'নীতি' : 'Policy'}
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
            © 2024 RAMYAAS. {language === 'ta' ? 'அனைத்து உரிமைகளும் সংরক্ষিত।' : 'All rights reserved.'}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {language === 'ta' ? 'வெப்சைடு ডিজাইন করেছেন Ramya & Team' : 'Website designed by Ramya & Team'}
          </p>
        </div>
      </div>
    </footer>
  );
};
