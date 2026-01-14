import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const About = () => {
    const location = useLocation();

    useEffect(() => {
      if (location.hash) {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, [location]);

  return (
    <section className="py-5 md:py-8 lg:py-10">
      <title>Style Decor | About Us</title>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            About StyleDecor
            <div className="border-b-5 border-[#577F84] max-w-55 mx-auto mt-5"></div>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            A modern appointment and service management system designed to
            transform how local decoration businesses operate.
          </p>
        </div>

        {/* What is StyleDecor */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-5">
            <h3 className="text-2xl font-semibold">What is StyleDecor?</h3>
            <p className="text-gray-600 leading-relaxed">
              StyleDecor is a modern appointment management system for a local
              decoration company that offers both in-studio consultations and
              on-site decoration services for homes and ceremonies.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Customers can explore decoration packages, check decorator
              availability, select a date and time, choose a service mode, make
              secure payments, and track their service status — all from one
              seamless platform.
            </p>
          </div>

          <div className="bg-linear-to-br from-[#FCFAE0] via-[#F3E8FF] to-purple-100 rounded-2xl p-8 shadow-sm">
            <ul className="space-y-4 text-gray-700">
              <li>✔ Online package exploration</li>
              <li>✔ Smart date & time scheduling</li>
              <li>✔ In-studio & on-site services</li>
              <li>✔ Secure online payments</li>
              <li>✔ Real-time service tracking</li>
            </ul>
          </div>
        </div>

        {/* Why Develop */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-4xl font-semibold mb-8 text-center">
            Why Develop This System?
            <div className="border-b-5 border-[#577F84] max-w-55 mx-auto mt-5"></div>
          </h3>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Problems */}
            <div className="bg-red-50 rounded-2xl p-8">
              <h4 className="text-xl font-semibold mb-4 text-red-600">
                Problems Faced by Local Decoration Businesses
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li>• Walk-in crowds & long waiting times</li>
                <li>• No online booking system</li>
                <li>• Poor decorator availability management</li>
                <li>• Difficulty handling on-site service coordination</li>
              </ul>
            </div>

            {/* Solutions */}
            <div className="bg-green-50 rounded-2xl p-8">
              <h4 className="text-xl font-semibold mb-4 text-green-600">
                How StyleDecor Solves It
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li>• Smart appointment scheduling</li>
                <li>• Decorator specialty & availability management</li>
                <li>• On-site service coordination workflow</li>
                <li>• Real-time project status updates</li>
                <li>• Integrated payment system</li>
                <li>• Dashboard & analytics for business insights</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pb-10">
          <h3 className="text-3xl font-bold mb-4">
            Simplifying Decoration Services, Digitally
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            StyleDecor bridges the gap between customers and decorators with
            technology-driven solutions that save time, reduce confusion, and
            enhance service quality.
          </p>
        </div>

        <div className="border-t-2 border-gray-300/55">
          <section id="terms" className="py-10 scroll-mt-20 max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-primary">Terms & Conditions</h2>

            <p className="mb-4">
              By accessing and using StyleDecor’s services, you agree to comply
              with and be bound by these Terms & Conditions. Our services
              include in-studio consultations, on-site decoration, and event
              styling.
            </p>

            <p className="mb-4">
              Clients must provide accurate event details, including location,
              timing, and requirements. Any changes should be communicated at
              least 48 hours before the scheduled service.
            </p>

            <p>
              StyleDecor reserves the right to refuse service in cases of unsafe
              environments, unethical requests, or non-compliance with company
              policies.
            </p>
          </section>

          <section id="privacy" className="py-10 scroll-mt-20 max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-primary">Privacy Policy</h2>

            <p className="mb-4">
              StyleDecor respects your privacy and is committed to protecting
              your personal information. We collect basic details such as name,
              phone number, email, and event information for service purposes
              only.
            </p>

            <p className="mb-4">
              Your data is never sold to third parties. Information is used
              strictly for communication, booking, and service improvement.
            </p>

            <p>
              By using our website and services, you consent to our data
              collection and usage policies.
            </p>
          </section>

          <section id="refund" className="py-10 scroll-mt-20 max-w-5xl mx-auto px-4">
            <h2 className="text-3xl text-primary font-bold mb-4">
              Refund & Cancellation Policy
            </h2>

            <p className="mb-4">
              Clients may cancel bookings up to 72 hours before the event for a
              partial refund. Cancellations made within 72 hours are
              non-refundable due to preparation costs.
            </p>

            <p className="mb-4">
              Refunds will be processed within 7–10 business days via the
              original payment method.
            </p>

            <p>
              In rare cases of service failure, StyleDecor may offer
              compensation or service rescheduling.
            </p>
          </section>

          <section id="service" className="py-10 scroll-mt-20 max-w-5xl mx-auto px-4">
            <h2 className="text-3xl text-primary font-bold mb-4">Service Agreement</h2>

            <p className="mb-4">
              StyleDecor agrees to provide professional decoration services
              according to the client’s selected package and preferences.
            </p>

            <p className="mb-4">
              Clients agree to provide safe access to the venue, necessary
              permissions, and timely cooperation.
            </p>

            <p>
              Any additional requests outside the original agreement may result
              in extra charges.
            </p>
          </section>

          <section id="compliance" className="py-10 scroll-mt-20 max-w-5xl mx-auto px-4">
            <h2 className="text-3xl text-primary font-bold mb-4">Compliance & Safety</h2>

            <p className="mb-4">
              StyleDecor follows local safety regulations and event compliance
              standards. All materials used are inspected for safety and
              quality.
            </p>

            <p className="mb-4">
              Our team ensures proper electrical, structural, and fire safety
              measures during setup and teardown.
            </p>

            <p>
              Client cooperation is required to maintain a safe and secure event
              environment.
            </p>
          </section>
        </div>

      </div>
    </section>
  );
};

export default About;
