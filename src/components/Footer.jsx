import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/Images/logo.png";
// Import icons
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BiHelpCircle, BiStore } from "react-icons/bi";
import { HiOutlineUserGroup, HiOutlineBriefcase } from "react-icons/hi";
import { RiMotorbikeLine } from "react-icons/ri";
import { IoNewspaperOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MdOutlineSecurity, MdOutlineCookie } from "react-icons/md";
import { TbLock } from "react-icons/tb";

function Footer() {
  const [openSection, setOpenSection] = useState('');

  const socialLinks = [
    { name: 'Instagram', icon: <FaInstagram />, url: '#instagram' },
    { name: 'Facebook', icon: <FaFacebook />, url: '#facebook' },
    { name: 'Twitter', icon: <FaTwitter />, url: '#twitter' }
  ];

  const footerLinks = {
    company: [
      { name: "About Us", path: "/about", icon: <HiOutlineUserGroup /> },
      { name: "Careers", path: "/careers", icon: <HiOutlineBriefcase /> }
    ],
    contact: [
      { name: "Help & Support", path: "/help", icon: <BiHelpCircle /> },
      { name: "Partner with us", path: "/partner", icon: <BiStore /> }
    ],
    legal: [
      { name: "Terms & Conditions", path: "/terms", icon: <TbLock /> },
      { name: "Privacy Policy", path: "/privacy", icon: <MdOutlineSecurity /> }
    ],
    delivery: ["Delhi", "Mumbai", "Bangalore"]
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const FooterSection = ({ title, children }) => (
    <div className="border-b border-gray-100 dark:border-gray-800 md:border-none">
      <button
        className="w-full flex justify-between items-center py-4 md:py-0 md:static"
        onClick={() => toggleSection(title)}
      >
        <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500">
          {title}
        </h3>
        <span className="md:hidden">
          {openSection === title ? <IoChevronUp /> : <IoChevronDown />}
        </span>
      </button>
      <div className={`${openSection === title ? 'max-h-48' : 'max-h-0 md:max-h-full'} 
                      overflow-hidden transition-all duration-300 md:block`}>
        {children}
      </div>
    </div>
  );

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-12">
          {/* Brand Section - Always visible */}
          <div className="pb-6 md:pb-0 border-b border-gray-100 dark:border-gray-800 md:border-none">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <img src={logo} alt="Twiggy" className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">Twiggy</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Your favorite food, delivered with love and care.
            </p>
            <div className="flex gap-4 mt-4">
              {socialLinks.map(({ name, icon, url }) => (
                <a key={name} href={url} className="w-8 h-8 rounded-lg bg-gray-50 
                   text-gray-600 dark:bg-gray-800 dark:text-gray-400 flex items-center justify-center hover:bg-primary 
                   hover:text-white transition-all duration-200" aria-label={name}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Collapsible Sections */}
          <FooterSection title="Quick Links">
            <ul className="space-y-3 pb-4 md:pb-0">
              {footerLinks.company.map(({ name, path, icon }) => (
                <li key={name}>
                  <Link to={path} className="text-gray-600 dark:text-gray-400 hover:text-primary 
                    transition-colors text-sm flex items-center gap-2">
                    <span className="text-gray-400 dark:text-gray-500">{icon}</span>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection title="Support">
            <ul className="space-y-3 pb-4 md:pb-0">
              {footerLinks.contact.map(({ name, path, icon }) => (
                <li key={name}>
                  <Link to={path} className="text-gray-600 dark:text-gray-400 hover:text-primary 
                    transition-colors text-sm flex items-center gap-2">
                    <span className="text-gray-400 dark:text-gray-500">{icon}</span>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection title="Available In">
            <div className="flex flex-wrap gap-2 pb-4 md:pb-0">
              {footerLinks.delivery.map(city => (
                <span key={city} className="inline-flex px-2.5 py-1 text-xs 
                  font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {city}
                </span>
              ))}
            </div>
          </FooterSection>
        </div>

        {/* Bottom Bar - Simplified for mobile */}
        <div className="py-4 md:py-6 border-t border-gray-100 dark:border-gray-800 text-center md:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Twiggy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
