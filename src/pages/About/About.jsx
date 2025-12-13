const About = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About StyleDecor
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

          <div className="bg-gradient-to-br from-[#FCFAE0] via-[#F3E8FF] to-purple-100 rounded-2xl p-8 shadow-sm">
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
          <h3 className="text-3xl font-semibold mb-8 text-center">
            Why Develop This System?
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
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">
            Simplifying Decoration Services, Digitally
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            StyleDecor bridges the gap between customers and decorators with
            technology-driven solutions that save time, reduce confusion, and
            enhance service quality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
