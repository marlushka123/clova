import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

// Default images

const DEFAULT_IMAGES = {
  hero: "/images/hero.png",
  clinic: "/images/clinic.png",
  sunscreen: "/images/sunscreen.jpg",
  supplement: "/images/supplement.jpg",
  medicalDevice: "/images/medicalDevice.jpg",
  team: [
    "/images/team_0.jpg",
    "/images/team_1.jpg",
    "/images/team_2.jpg",
    "/images/team_3.jpg",
    "/images/team_4.jpg",
    "/images/team_5.jpg",
  ],
};

// Team data
const teamMembersData = [
  {
    name: "Enkhtsetseg.M",
    role: "CEO",
    title: "Clinical Pharmacist",
    bio: "Leading Clova Med with over a decade of pharmaceutical expertise and a vision for healthcare excellence in Mongolia.",
    imageKey: "team_0",
  },
  {
    name: "Aaj",
    role: "Sales Director",
    title: "Head of Sales",
    bio: "Driving strategic partnerships and market expansion across Mongolia and beyond.",
    imageKey: "team_1",
  },
  {
    name: "Ma",
    role: "Medical Affairs",
    title: "Clinical Manager",
    credentials: "MD, MPH, PhD Student",
    bio: "Ensuring clinical excellence through rigorous training and support programs.",
    imageKey: "team_2",
  },
  {
    name: "Tuya",
    role: "Regulatory Affairs",
    title: "Manager",
    bio: "Navigating complex regulatory landscapes to ensure compliance and market access.",
    imageKey: "team_3",
  },
  {
    name: "Erka",
    role: "Marketing",
    title: "Manager",
    bio: "Crafting compelling brand narratives that resonate with healthcare professionals.",
    imageKey: "team_4",
  },
  {
    name: "Nasaa",
    role: "Quality Assurance",
    title: "Manager",
    credentials: "Clinical Pharmacist",
    bio: "Upholding the highest standards of quality across all products and processes.",
    imageKey: "team_5",
  },
];

// Brand partners data
const brandsData = [
  {
    name: "Tenue Soleil",
    origin: "Netherlands",
    category: "Premium Sunscreen",
    description: "Advanced sun protection with Dutch innovation",
    imageKey: "sunscreen",
  },
  {
    name: "Borealis Pharma",
    origin: "Europe",
    category: "Supplements",
    description: "Science-backed nutritional excellence",
    imageKey: "supplement",
  },
  {
    name: "ADSS",
    origin: "International",
    category: "Medical Devices",
    description: "Cutting-edge aesthetic medical technology",
    imageKey: "medicalDevice",
  },
];

// Products data
const productsData = [
  {
    id: 1,
    name: "MITO DUO (NMN+NAD)",
    price: "720,000 ₮",
    description: `Advanced skin revitalization formula combining NMN + NAD Activator to support cellular energy, skin renewal, and visible radiance. Designed to improve hydration, elasticity, and tired-looking skin for a healthier, more refreshed appearance.

Benefits:
• Deep hydration
• Brighter skin tone
• Improved elasticity
• Smoother texture
• Youthful glow`,
    images: [
      "/images/products/1_mito_duo_web.jpg",
      "/images/products/1_1_mito_duo_web.jpg"
    ]
  },
  {
    id: 2,
    name: "RMDA-S",
    price: "479,000 ₮",
    description: `Advanced regenerative skin booster formulated with PDRN, L-Carnitine, Hyaluronic Acid, Growth Factor(EGF, FGF, Peptide complex), and revitalizing active ingredients to support skin repair, hydration, contour care, and collagen renewal. Designed to improve texture, firmness, and overall skin vitality for a smoother, healthier appearance.

Benefits:
• Skin recovery support
• Deep hydration
• Improved firmness & elasticity
• Smoother skin texture
• Brighter complexion
• Helps refine facial contours`,
    images: ["/images/products/2_rmds_a_web.jpg"]
  },
  {
    id: 3,
    name: "ZISHEL XOMAGE EXOSOME",
    price: "1,090,000 ₮",
    description: `Advanced regenerative exosome formula featuring 10 Billion Exosomes with a synergistic blend of Growth Factors, Peptide Complex, Sodium Hyaluronate, and revitalizing active ingredients to support visible skin renewal, hydration, and scalp vitality.

Developed for face, body, scalp, and hair care, the lyophilized powder formula is designed to help improve skin texture, firmness, brightness, and recovery while supporting healthier-looking skin and hair environments.

Available Variants:
• XOMAGE S – with Panthenol support
• XOMAGE H – with Biotin support

Key Benefits:
• Supports skin rejuvenation & vitality
• Helps brighten dull-looking skin
• Improves firmness & elasticity
• Smooths texture and refines appearance
• Supports post-treatment recovery care
• Helps calm stressed skin appearance
• Supports scalp and hair care routines
• Promotes healthy glow and refreshed look`,
    images: [
      "/images/products/3_xomage_exosome_web.jpg",
      "/images/products/3_1_xomage_exosome_web.jpg"
    ]
  },
  {
    id: 4,
    name: "ZISHEL XOMAGE MASK",
    price: "28,000 ₮",
    description: `Advanced recovery mask powered by Purimasome™ Exosome Technology, PDRN (Sodium DNA), Peptide Complex, Niacinamide, Hyaluronic Acid, CICA, Centella Asiatica, and botanical extracts to support hydration, skin renewal, soothing care, and visible radiance.

Developed for post-treatment recovery and intensive homecare, the formula helps calm sensitivity, replenish moisture, and improve skin vitality while supporting firmness and smoother texture.

Key Benefits:
• Supports skin regeneration & firmness
• Intensive hydration and moisture barrier care
• Helps soothe redness and sensitivity
• Brightens dull, tired-looking skin
• Improves smoothness and elasticity
• Helps reduce appearance of fine lines
• Refreshing recovery care after treatments
• Promotes healthy, radiant glow`,
    images: ["/images/products/4_1_xomage_mask_web.jpg"]
  },
  {
    id: 5,
    name: "XOMAGE BUNDLE",
    price: "1,990,000 ₮",
    description: `Includes: 2 × ZISHEL XOMAGE EXOSOME + 5 × XOMAGE MASK
Retail Value: 2,320,000₮
Bundle Price: 1,990,000₮

Advanced regenerative bundle designed for intensive skin recovery, hydration, and visible rejuvenation. Combines professional-grade exosome care with recovery masks to support smoother texture, brighter tone, and post-treatment comfort. Ideal for clinic recovery programs or premium homecare support.

Benefits:
• Intensive skin renewal support
• Deep hydration & barrier care
• Helps improve firmness & elasticity
• Brighter, healthier-looking tone
• Supports post-treatment recovery
• Helps calm stressed or tired skin
• Enhances glow and smoothness
• Premium value savings package

Best For:
• After aesthetic treatments
• Dull / tired-looking skin
• Dry or stressed skin
• Anti-aging support care`,
    images: ["/images/products/5_xomage_bundle_web.jpg"]
  }
];

// Timeline milestones
const milestones = [
  {
    year: "2018",
    title: "Foundation",
    description: "EMH Outsourcing established in Ulaanbaatar",
  },
  {
    year: "2019",
    title: "First Partnership",
    description: "Secured exclusive distribution rights",
  },
  {
    year: "2020",
    title: "Expansion",
    description: "Expanded product portfolio amid global challenges",
  },
  {
    year: "2022",
    title: "Haku Med Partnership",
    description: "Strategic clinic partnership established",
  },
  {
    year: "2024",
    title: "Market Leader",
    description: "Recognized as premium medical distributor",
  },
  {
    year: "2026",
    title: "Innovation",
    description: "Continuing to elevate healthcare standards",
  },
];
const AppLayout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [hoveredTeamMember, setHoveredTeamMember] = useState<number | null>(
    null,
  );

  // Image state
  const [siteImages] = useState<Record<string, string>>({
    hero: DEFAULT_IMAGES.hero,
    clinic: DEFAULT_IMAGES.clinic,
    sunscreen: DEFAULT_IMAGES.sunscreen,
    supplement: DEFAULT_IMAGES.supplement,
    medicalDevice: DEFAULT_IMAGES.medicalDevice,
    team_0: DEFAULT_IMAGES.team[0],
    team_1: DEFAULT_IMAGES.team[1],
    team_2: DEFAULT_IMAGES.team[2],
    team_3: DEFAULT_IMAGES.team[3],
    team_4: DEFAULT_IMAGES.team[4],
    team_5: DEFAULT_IMAGES.team[5],
  });

  // Removed database image loading for static site conversion
  // Only using local DEFAULT_IMAGES defined above
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = [
        "hero",
        "about",
        "brands",
        "products",
        "partnership",
        "team",
        "contact",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    const brevoApiKey = import.meta.env.VITE_BREVO_API_KEY;
    const recipientEmail = import.meta.env.VITE_RECIPIENT_EMAIL || "odgii405@gmail.com";
    const senderEmail = import.meta.env.VITE_BREVO_SENDER_EMAIL || "no-reply@clovamed.com";
    const senderName = import.meta.env.VITE_BREVO_SENDER_NAME || "Clova Med Contact Form";

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": brevoApiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { 
            name: senderName, 
            email: senderEmail 
          },
          to: [{ email: recipientEmail }],
          subject: `New Inquiry from ${contactForm.name}`,
          htmlContent: `
            <div style="font-family: sans-serif; padding: 20px; color: #1a1a2e;">
              <h2 style="color: #1a1a2e; border-bottom: 2px solid #1a1a2e; padding-bottom: 10px;">New Contact Inquiry</h2>
              <p><strong>Name:</strong> ${contactForm.name}</p>
              <p><strong>Email:</strong> ${contactForm.email}</p>
              <p><strong>Company:</strong> ${contactForm.company || "Not specified"}</p>
              <p><strong>Message:</strong></p>
              <div style="background: #f8f8fa; padding: 15px; border-radius: 10px; margin-top: 10px;">
                ${contactForm.message.replace(/\n/g, '<br/>')}
              </div>
            </div>
          `
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send email");
      }

      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 3000);
      setContactForm({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (err) {
      console.error("Brevo Error:", err);
      alert("Failed to send message. Please check the email configuration.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const navItems = [
    {
      id: "about",
      label: "About",
    },
    {
      id: "brands",
      label: "Brands",
    },
    {
      id: "products",
      label: "Products",
    },
    {
      id: "partnership",
      label: "Partnership",
    },
    {
      id: "team",
      label: "Team",
    },
    {
      id: "contact",
      label: "Contact",
    },
  ];

  // Static Image Component
  const StaticImage = ({
    imageKey,
    alt,
    className,
  }: {
    imageKey: string;
    alt: string;
    className?: string;
  }) => (
    <img
      src={
        siteImages[imageKey] ||
        (DEFAULT_IMAGES[imageKey as keyof typeof DEFAULT_IMAGES] as string)
      }
      alt={alt}
      className={className}
    />
  );

  // Product Card Component
  const ProductCard = ({ product }: { product: typeof productsData[0] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const onSelect = useCallback(() => {
      if (!emblaApi) return;
      setCurrentImageIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
      if (!emblaApi) return;
      onSelect();
      emblaApi.on("select", onSelect);
      emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
      (index: number) => emblaApi && emblaApi.scrollTo(index),
      [emblaApi],
    );

    return (
      <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col border border-gray-100">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
          <div className="h-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full">
              {product.images.map((img, idx) => (
                <div key={idx} className="relative flex-[0_0_100%] min-w-0 h-full">
                  <img
                    src={img}
                    alt={`${product.name} - image ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Image toggles if multiple images exist */}
          {product.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollTo(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === idx 
                      ? "w-6 bg-[#1a1a2e]" 
                      : "bg-gray-300/80 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          <div className="absolute top-6 right-6 z-10">
            <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[#1a1a2e] font-bold text-sm shadow-sm">
              {product.price}
            </span>
          </div>
        </div>
        
        <div className="p-8 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-[#1a1a2e] mb-3 group-hover:text-[#2a2a4e] transition-colors">
            {product.name}
          </h3>
          
          <div 
            className={`text-gray-500 text-sm leading-relaxed mb-4 transition-all duration-500 overflow-hidden ${isExpanded ? "max-h-[1000px]" : "max-h-[72px]"}`}
          >
            <p className={`whitespace-pre-line ${!isExpanded ? "line-clamp-3" : ""}`}>
              {product.description}
            </p>
          </div>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-[#1a1a2e] text-xs font-bold mb-6 hover:opacity-70 transition-opacity"
          >
            {isExpanded ? "Show Less" : "Read More"}
            <svg 
              className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <button 
            onClick={() => scrollToSection("contact")}
            className="w-full py-3 rounded-xl border border-[#1a1a2e] text-[#1a1a2e] font-semibold text-sm hover:bg-[#1a1a2e] hover:text-white transition-all duration-300 mt-auto"
          >
            Inquire Now
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 text-[#1a1a2e] font-sans antialiased">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-xl shadow-sm" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 group">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isScrolled ? "bg-[#1a1a2e]" : "bg-white"}`}
              >
                <span
                  className={`font-bold text-sm ${isScrolled ? "text-white" : "text-[#1a1a2e]"}`}
                >
                  C
                </span>
              </div>
              <span
                className={`font-semibold text-lg tracking-tight transition-colors duration-300 ${isScrolled ? "text-[#1a1a2e]" : "text-white"}`}
              >
                Clova Med
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 hover:opacity-100 ${activeSection === item.id ? "opacity-100" : "opacity-60"} ${isScrolled ? "text-[#1a1a2e]" : "text-white"}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isScrolled ? "bg-[#1a1a2e] text-white hover:bg-[#2a2a4e]" : "bg-white text-[#1a1a2e] hover:bg-white/90"}`}
              >
                Partner With Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""} ${isScrolled ? "bg-[#1a1a2e]" : "bg-white"}`}
                />
                <span
                  className={`block h-0.5 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""} ${isScrolled ? "bg-[#1a1a2e]" : "bg-white"}`}
                />
                <span
                  className={`block h-0.5 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""} ${isScrolled ? "bg-[#1a1a2e]" : "bg-white"}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-[#1a1a2e] font-medium py-2"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full bg-[#1a1a2e] text-white py-3 rounded-full font-medium"
            >
              Partner With Us
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <StaticImage
            imageKey="hero"
            alt="Medical Excellence"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/70 via-[#1a1a2e]/50 to-[#1a1a2e]/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in">
            EMH Outsourcing • Since 2018
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
            Elevating Healthcare
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Standards
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Mongolia's premier distributor of world-class medical devices and
            pharmaceutical products. Partnering with global brands to deliver
            excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 bg-white text-[#1a1a2e] rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              Partner With Us
            </button>
            <button
              onClick={() => scrollToSection("brands")}
              className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Explore Brands
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-4">
                About Us
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-8 leading-tight">
                Your Trusted Partner in
                <br />
                <span className="text-gray-400">Healthcare Distribution</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Since 2018, Clova Med has been at the forefront of medical
                distribution in Mongolia. As EMH Outsourcing, we specialize in
                bringing world-class medicines and medical devices to healthcare
                providers across the nation.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl font-bold text-[#1a1a2e]">8+</p>
                  <p className="text-gray-500">Years of Excellence</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#1a1a2e]">10+</p>
                  <p className="text-gray-500">Global Brand Partners</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#1a1a2e]">100+</p>
                  <p className="text-gray-500">Healthcare Partners</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#1a1a2e]">40+</p>
                  <p className="text-gray-500">Expert Team Members</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <StaticImage
                  imageKey="clinic"
                  alt="Modern Healthcare Facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#1a1a2e] text-white p-8 rounded-2xl max-w-xs">
                <p className="text-3xl font-bold mb-2">2018</p>
                <p className="text-white/70">
                  Year Established in Ulaanbaatar, Mongolia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-24 lg:py-32 bg-[#f8f8fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-4">
              What We Do
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a2e]">
              Our Expertise
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl hover:shadow-xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-[#1a1a2e] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4">
                Medicine Distribution
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Comprehensive pharmaceutical distribution services ensuring
                timely delivery of essential medicines to healthcare providers
                across Mongolia.
              </p>
              <ul className="space-y-3">
                {[
                  "Premium Skincare Products",
                  "Nutritional Supplements",
                  "Pharmaceutical Solutions",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-[#1a1a2e] mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-10 rounded-3xl hover:shadow-xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-[#1a1a2e] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4">
                Medical Device Distribution
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Advanced medical‑grade beauty and aesthetic equipment from top
                global brands, with full training and dedicated post‑purchase
                support.
              </p>
              <ul className="space-y-3">
                {[
                  "Injectables (Fillers & Botox)",
                  "Clinical Support & Training",
                  "Technical Maintenance",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-[#1a1a2e] mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-10 rounded-3xl hover:shadow-xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-[#1a1a2e] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4">
                Aesthetic Medical Devices
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Premium aesthetic medical technology for beauty clinics and
                dermatology centers, delivering cutting-edge solutions for skin
                rejuvenation and body contouring.
              </p>
              <ul className="space-y-3">
                {[
                  "Laser & Light Therapy Systems",
                  "Skin Rejuvenation Equipment",
                  "Body Contouring Devices",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-[#1a1a2e] mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Brands Section */}
      <section id="brands" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-4">
              Exclusive Distribution
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-6">
              Our Brands
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are proud to be the exclusive distributor of these
              world-renowned brands in Mongolia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {brandsData.map((brand, index) => (
              <div
                key={index}
                className="group relative bg-[#f8f8fa] rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-square overflow-hidden">
                  <StaticImage
                    imageKey={brand.imageKey}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xs tracking-[0.2em] text-white/70 uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {brand.origin}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {brand.name}
                  </h3>
                  <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {brand.description}
                  </p>
                  <span className="inline-block mt-4 px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {brand.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 lg:py-32 bg-[#f8f8fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-4">
              Featured Products
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-6">
              Our Medical Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our range of premium pharmaceutical and medical aesthetic products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {productsData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      {/* Partnership Section - Haku Med Clinic */}
      <section
        id="partnership"
        className="py-24 lg:py-32 bg-[#1a1a2e] text-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm tracking-[0.2em] text-white/50 uppercase mb-4">
                Strategic Partnership
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                Haku Med
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500">
                  Clinic
                </span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Our flagship partnership with Haku Med Clinic represents the
                pinnacle of our commitment to healthcare excellence. Together,
                we're setting new standards in patient care and medical
                innovation in Mongolia.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "Integrated Care",
                    desc: "Seamless product-to-patient delivery systems",
                  },
                  {
                    title: "Clinical Excellence",
                    desc: "Joint training and development programs",
                  },
                  {
                    title: "Innovation Hub",
                    desc: "Pioneering new treatment methodologies",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
                <StaticImage
                  imageKey="clinic"
                  alt="Haku Med Clinic"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white text-[#1a1a2e] p-6 rounded-2xl shadow-2xl">
                <p className="text-sm text-gray-500 mb-1">Partnership Since</p>
                <p className="text-3xl font-bold">2022</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Timeline Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-4">
              Our Journey
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a2e]">
              Milestones
            </h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden lg:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div
                    className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}
                  >
                    <div className="bg-[#f8f8fa] p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                      <p className="text-4xl font-bold text-[#1a1a2e] mb-2">
                        {milestone.year}
                      </p>
                      <h3 className="text-xl font-semibold text-[#1a1a2e] mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[#1a1a2e] rounded-full relative z-10 hidden lg:block" />
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section id="team" className="py-24 lg:py-32 bg-[#f8f8fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-4">
              Our People
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-6">
              Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals driving healthcare excellence in
              Mongolia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembersData.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                onMouseEnter={() => setHoveredTeamMember(index)}
                onMouseLeave={() => setHoveredTeamMember(null)}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <StaticImage
                    imageKey={member.imageKey}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/50 to-transparent transition-opacity duration-500 ${hoveredTeamMember === index ? "opacity-90" : "opacity-0"}`}
                />

                {/* Default info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div
                    className={`transition-all duration-500 ${hoveredTeamMember === index ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
                  >
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                      {member.name}
                    </h3>
                    <p className="text-white/80 text-sm drop-shadow-lg">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Hover info */}
                <div
                  className={`absolute inset-0 p-8 flex flex-col justify-end transition-all duration-500 ${hoveredTeamMember === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <p className="text-xs tracking-[0.2em] text-white/60 uppercase mb-2">
                    {member.role}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-1">{member.title}</p>
                  {member.credentials && (
                    <p className="text-white/60 text-xs mb-4">
                      {member.credentials}
                    </p>
                  )}
                  <p className="text-white/70 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-4">
                Get In Touch
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-8 leading-tight">
                Let's Build
                <br />
                <span className="text-gray-400">Together</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                Interested in partnering with Mongolia's leading medical
                distributor? We'd love to hear from you.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#f8f8fa] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[#1a1a2e]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a1a2e] mb-1">
                      Location
                    </h4>
                    <p className="text-gray-600">
                      Akoya Mall-2001
                      <br />
                      Ulaanbaatar, Mongolia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#f8f8fa] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[#1a1a2e]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a1a2e] mb-1">Email</h4>
                    <p className="text-gray-600">business@clovamed.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#f8f8fa] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-[#1a1a2e]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a1a2e] mb-1">
                      Business Hours
                    </h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f8f8fa] p-8 lg:p-12 rounded-3xl">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-10 h-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={contactForm.company}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          company: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a2e] mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your partnership interests..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#1a1a2e] text-white rounded-xl font-semibold hover:bg-[#2a2a4e] transition-all duration-300 hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="font-bold text-sm text-[#1a1a2e]">C</span>
                </div>
                <span className="font-semibold text-lg">Clova Med</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                EMH Outsourcing - Mongolia's premier medical device and
                pharmaceutical distributor since 2018.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {["About", "Brands", "Products", "Partnership", "Team", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <button
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {item}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Our Brands</h4>
              <ul className="space-y-3">
                {brandsData.map((brand) => (
                  <li key={brand.name}>
                    <span className="text-white/60 text-sm">{brand.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li>Akoya Mall-2001</li>
                <li>Ulaanbaatar, Mongolia</li>
                <li>business@clovamed.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © 2026 Clova Med (EMH Outsourcing). All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <button className="text-white/40 hover:text-white transition-colors duration-300 text-sm">
                Privacy Policy
              </button>
              <button className="text-white/40 hover:text-white transition-colors duration-300 text-sm">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default AppLayout;
