import hero from "../assets/imgs/hero.png"
import React from "react";
import { MapPin, Phone, Mail, Clock, Star, User, Calendar } from "lucide-react";
import { useNavigate } from "react-router";

// UI COMPONENTS
const Card = ({ children, className }) => (
  <div className={`rounded-xl border p-4 ${className || ""}`}>{children}</div>
);

const CardHeader = ({ children, className }) => (
  <div className={`mb-4 ${className || ""}`}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-bold ${className || ""}`}>{children}</h2>
);

const CardContent = ({ children, className }) => (
  <div className={`${className || ""}`}>{children}</div>
);

const CardDescription = ({ children, className }) => (
  <p className={`text-sm text-blue-200 ${className || ""}`}>{children}</p>
);

const Badge = ({ children, className }) => (
  <span className={`inline-block px-2 py-1 rounded-full ${className || ""}`}>
    {children}
  </span>
);

// COMPONENTS
const Header = () => (
  <header className="bg-black/30 backdrop-blur border-b border-yellow-400/20">
    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="text-3xl">🌟</div>
        <div>
          <h1 className="text-xl font-bold text-yellow-300">Kalaga Prasad Astrology</h1>
          <p className="text-sm text-blue-200">Scientific Astrology Expert</p>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <button className="text-white hover:text-yellow-300">Home</button>
        <a href="#services">
          <button className="text-white hover:text-yellow-300">Services</button>
        </a>
        <a href="/booking">
          <button className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-yellow-300" >
            Book Now
        </button>
        </a>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-black/40 border-t border-yellow-400/20 py-12 px-4">
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-blue-200">
      <div>
        <h3 className="text-xl font-bold text-yellow-300 mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-green-400" /><span>+91 (Appointment Only)</span></div>
          <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-blue-400" /><span>kalagaprasadastrology@gmail.com</span></div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-purple-400 mt-1" />
            <div>
              <p>Kalaga Prasad Astrology Center</p>
              <p>Tanuku, Andhra Pradesh</p>
              <a href="#" className="text-yellow-400 hover:text-yellow-300 underline">View on Google Maps</a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-yellow-300 mb-4">Services Areas</h3>
        <p>🏛️ Andhra Pradesh</p>
        <p>🏛️ Telangana</p>
        <p>🏛️ Karnataka</p>
        <p>🏛️ Tamil Nadu</p>
        <p>🏛️ Odisha</p>
        <p>🏛️ Maharashtra</p>
      </div>
      <div>
        <h3 className="text-xl font-bold text-yellow-300 mb-4">Consultation Hours</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-yellow-400" /><div><p>Mon - Sat</p><p>9:00 AM - 6:00 PM</p></div></div>
          <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-yellow-400" /><div><p>Sunday</p><p>By Appointment</p></div></div>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-yellow-400/20 text-center text-blue-200">
      <p>&copy; 2024 Kalaga Prasad Astrology. All rights reserved.</p>
      <p className="mt-2 text-sm">Serving with 30+ years of experience in Scientific Astrology</p>
    </div>
  </footer>
);

const ServiceCard = ({ title, description, icon, features }) => (
  <Card className="bg-white/10 backdrop-blur border-blue-400/30 hover:border-yellow-400/50 transition-all">
    <CardHeader className="text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <CardTitle className="text-white">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2 space-x-2">
        {features.map((feature, index) => (
          <Badge key={index} className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-xs">
            {feature}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const TestimonialCard = ({ name, location, rating, text }) => (
  <Card className="bg-white/10 backdrop-blur border-blue-400/30 hover:border-yellow-400/50 transition-all">
    <CardContent className="p-6">
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
      </div>
      <p className="text-blue-100 mb-4 italic">"{text}"</p>
      <div className="text-center">
        <p className="text-yellow-300 font-semibold">{name}</p>
        <p className="text-blue-300 text-sm">{location}</p>
      </div>
    </CardContent>
  </Card>
);

// STATIC PAGE
const StaticLandingPage = () => {
  const nav = useNavigate()
  const navigateTo = () => {
    nav("/booking")
  }
  const services = [
    {
      title: "Vastu Consultation",
      description: "Scientific Vastu guidance for homes and businesses",
      icon: "🏠",
      features: ["Home Vastu", "Office Vastu", "Plot Selection", "Remedies"]
    },
    {
      title: "Muhurat Selection",
      description: "Auspicious timing for important life events",
      icon: "🕐",
      features: ["Wedding Muhurat", "Griha Pravesh", "Business Launch", "Vehicle Purchase"]
    },  {
      title: "Kundali Analysis",
      description: "Detailed horoscope reading and predictions",
      icon: "📜",
      features: ["Birth Chart", "Dasha Analysis", "Career Guidance", "Marriage Compatibility"]
    },
    {
      title: "Horoscope Guidance",
      description: "Personalized guidance for life decisions",
      icon: "⭐",
      features: ["Life Insights", "Health Precautions", "Spiritual Guidance", "Future Predictions"]
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Hyderabad",
      rating: 5,
      text: "Kalaga Prasad Garu's predictions have been incredibly accurate. His Vastu guidance transformed my business completely."
    },
    {
      name: "Priya Sharma",
      location: "Bangalore",
      rating: 5,
      text: "The muhurat selection was perfect and accurate."
    },
      {
      name: "Priya Sharma",
      location: "Bangalore",
      rating: 5,
      text: "The marriage muhurat selection was perfect. Very satisfied with the detailed consultation and follow-up guidance."
    },   {
      name: "Priya Sharma",
      location: "Bangalore",
      rating: 5,
      text: "30+ years of experience clearly shows in his analysis. Highly recommend for anyone seeking astrological guidance."
    }
  ];
  
  return (
    <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900 min-h-screen text-white">
      {/* <Header /> */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-20">
        <section className="w-full text-white py-16 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center bg-yellow-500/10 text-yellow-300 text-sm px-3 py-1 rounded-full mb-4 font-medium">
                ⭐ 30+ Years of Experience
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-yellow-300 mb-4">
                Kalaga Prasad<br />Astrology
              </h1>
              <p className="text-xl mb-4">Expert in Scientific Astrology</p>
              <p className="text-base text-gray-200 mb-8">
                Serving 2+ lakh clients across Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Odisha, and Maharashtra with accurate predictions and personalized guidance. With 500+ appointments per month and excellent reputation built through great word of mouth spread.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-300">2+ Lakh</div>
                  <div className="text-sm text-blue-200">Clients Served</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-300">500+</div>
                  <div className="text-sm text-blue-200">Monthly Appointments</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-300">30+</div>
                  <div className="text-sm text-blue-200">Years Experience</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-300">7 Days</div>
                  <div className="text-sm text-blue-200">8AM – 8PM</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow hover:from-blue-600 hover:to-purple-600" onClick={()=> navigateTo()}>
                  🔐 Sign In to Book Appointment
                </button>
                <a href="#services">
                <button className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-xl font-semibold shadow hover:bg-yellow-300" >
                    🔍 Our Services
                </button>
                </a>
              </div>
            </div>

            <div className="w-full max-w-sm bg-white/5 rounded-xl border border-white/10 p-6 text-center shadow-xl">
              <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-yellow-400 mb-4">
                <img src={hero} alt="Kalaga Prasad Garu" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-yellow-300 mb-1">Kalaga Prasad Garu</h3>
              <p className="text-sm text-gray-300 mb-4">Scientific Astrology Expert</p>
              <div className="flex justify-center gap-1 mb-2 text-yellow-400 text-lg">
                {"★★★★★"}
              </div>
              <p className="text-sm text-yellow-300 mb-4 font-medium">5.0 Rating</p>
              <div className="text-sm text-gray-300 space-y-1">
                <div>👥 2+ Lakh Clients Served</div>
                <div>📈 Excellent Reputation</div>
                <div>⏰ Available 7 Days | 8AM–8PM</div>
              </div>
            </div>
          </div>
        </section>

        <section id="services">
          <h3 className="text-3xl font-semibold mb-6 text-yellow-300">Our Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 gap-x-2">
            {services.map((service, i) => <ServiceCard key={i} {...service} />)}
          </div>
        </section>

        <section id="testimonials">
          <h3 className="text-3xl font-semibold mb-6 text-yellow-300">Testimonials</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4  gap-6">
            {testimonials.map((testimonial, i) => <TestimonialCard key={i} {...testimonial} />)}
          </div>
        </section>
        <section className="max-w-4xl mx-auto px-4 py-8 text-yellow-500">
          <h1 className="text-3xl font-semibold mb-2">Terms & Conditions</h1>
          <p className="text-sm text-yellow-500 mb-6">Last updated on Jul 17th, 2025</p>

          <p className="mb-4 text-gray-100">
            For the purpose of these Terms and Conditions, the terms <strong>"we"</strong>, <strong>"us"</strong>, <strong>"our"</strong> refer to <strong>Kalaga Prasad Astrology</strong>, whose registered/operational office is <em>Devi Durga Nagar, opposite bus stand, Tanuku, West Godavari, Andhra Pradesh 534211</em>. The terms <strong>"you"</strong>, <strong>"your"</strong>, <strong>"user"</strong>, or <strong>"visitor"</strong> refer to any natural or legal person who is visiting our website and/or agreed to purchase from us.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Usage & Agreement</h2>
          <ul className="list-disc list-inside mb-4 space-y-2 text-gray-100">
            <li>The content of the pages of this website is subject to change without notice.</li>
            <li>We and third parties do not guarantee the accuracy, timeliness, performance, completeness, or suitability of the information and materials found on this website.</li>
            <li>You acknowledge that such information may contain inaccuracies or errors. We exclude liability for these to the fullest extent permitted by law.</li>
            <li>Your use of any information or materials is entirely at your own risk. You must ensure any products/services meet your specific requirements.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">Intellectual Property</h2>
          <ul className="list-disc list-inside mb-4 space-y-2 text-gray-100">
            <li>This website contains material owned by or licensed to us, including design, layout, look, appearance, and graphics.</li>
            <li>Reproduction is prohibited except in accordance with the copyright notice, which is part of these terms.</li>
            <li>All non-owned trademarks used on this website are acknowledged accordingly.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">Restrictions</h2>
          <ul className="list-disc list-inside mb-4 space-y-2 text-gray-100">
            <li>Unauthorized use of any information provided by us may result in a claim for damages and/or be a criminal offense.</li>
            <li>We may include links to other websites for convenience. They do not signify our endorsement.</li>
            <li>You may not link to our website without prior written consent from Kalaga Prasad Astrology.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">Legal Jurisdiction</h2>
          <p className="mb-4 text-gray-100">
            Any dispute arising from the use of this website or purchases made through it is subject to the laws of India.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Payment & Transactions</h2>
          <p className="mb-4 text-gray-100">
            We shall not be liable for any loss or damage arising out of the decline of authorization for any transaction due to the Cardholder having exceeded the preset limit with our acquiring bank.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Disclaimer</h2>
          <p className="text-sm text-gray-100">
            The above content is created at <strong>VENKATA SURYA SESHA DURGA PRASAD KALAGA</strong>'s sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims or liabilities due to the merchant’s non-adherence to it.
          </p>
        </section>

      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default StaticLandingPage;
