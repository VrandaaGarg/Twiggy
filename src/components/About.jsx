import React from "react";

function About() {
  const Header = ({ children }) => (
    <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 inline-block">
      {children}
    </h1>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-16 pt-24 pb-11">
      <div className="max-w-4xl mx-auto">
        {/* Main Header */}
        <div className="text-center mb-12">
          <Header>About SmartBite</Header>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Welcome to SmartBite! We are passionate about bringing you a delightful
            culinary experience right to your doorstep.
          </p>
        </div>

        {/* Story Section */}
        <div className="space-y-16">
          <section>
            <Header>Our Story</Header>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Founded with a vision to revolutionize how people enjoy food, [Your Food
              Delivery Website] began its journey with a deep-rooted commitment to
              quality, convenience, and customer satisfaction. We believe that great
              food brings people together and enriches lives, and that belief drives
              everything we do.
            </p>
          </section>

          <section>
            <Header>What We Offer</Header>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              At SmartBite, we curate a diverse selection of cuisines, from hearty Indian
              delicacies to exotic Middle Eastern dishes and everything in between.
              Our menu is carefully crafted to cater to every palate, ensuring there's
              something special for everyone.
            </p>
          </section>

          <section>
            <Header>Why Choose Us?</Header>
            <ul className="space-y-6">
              <li className="text-gray-700 dark:text-gray-300 text-lg">
                <span className="font-semibold text-primary dark:text-primary-light">
                  Quality Assurance:
                </span>{" "}
                We partner with renowned restaurants and chefs who share our passion for excellence, ensuring that every dish meets our high standards.
              </li>
              <li className="text-gray-700 dark:text-gray-300 text-lg">
                <span className="font-semibold text-primary dark:text-primary-light">
                  Convenience:
                </span>{" "}
                Ordering with us is effortless. Simply browse our menu, place your order, and sit back as we handle the rest, delivering your meal promptly to your doorstep.
              </li>
              <li className="text-gray-700 dark:text-gray-300 text-lg">
                <span className="font-semibold text-primary dark:text-primary-light">
                  Customer Care:
                </span>{" "}
                Your satisfaction is our priority. Our dedicated support team is always ready to assist you, whether you have questions about our menu, need assistance with your order, or want to provide feedback.
              </li>
            </ul>
          </section>

          <section>
            <Header>Our Commitment</Header>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              We are committed to sustainability and community. By prioritizing
              eco-friendly practices and supporting local businesses, we strive to
              make a positive impact on both our environment and the communities we
              serve.
            </p>
          </section>

          <section>
            <Header>Connect With Us</Header>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Join us on this culinary journey and experience the joy of good food
              delivered right to you. Follow us on social media for updates, special
              offers, and mouth-watering food inspirations.
              <br />
              <br />
              Thank you for choosing SmartBite. Let's savor the flavors together!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
