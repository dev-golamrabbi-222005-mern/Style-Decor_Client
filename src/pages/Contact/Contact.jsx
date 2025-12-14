const Contact = () => {
    return (
      <section className="bg-gradient-to-br from-[#FCFAE0] via-[#F3E8FF] to-purple-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-2xl md:text-4xl font-semibold mb-4">
              Contact Us
              <div className="border-b-5 border-[#577F84] max-w-55 mx-auto mt-5"></div>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or want to book a decoration service? Reach out to
              StyleDecor — we’re here to help you every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-8 shadow-md space-y-6">
              <h2 className="text-2xl font-semibold">Get in Touch</h2>

              <div>
                <h3 className="font-medium text-lg">Business Hours</h3>
                <p className="text-gray-600">
                  9:00 AM – 9:00 PM (Saturday – Thursday)
                </p>
                <p className="text-red-500">Friday: Closed (Holiday)</p>
              </div>

              <div>
                <h3 className="font-medium text-lg">Address</h3>
                <p className="text-gray-600 leading-relaxed">
                  StyleDecor Studio <br />
                  House 18, Road 12, Sector 4 <br />
                  Uttara, Dhaka 1230 <br />
                  Bangladesh
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg">Phone</h3>
                <p className="text-gray-600">
                  <a href="tel:+8801700000000" className="link link-hover">
                    +880 1700-000000
                  </a>
                  <br />
                  <a href="tel:+8801900000000" className="link link-hover">
                    +880 1900-000000
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg">Email</h3>
                <p className="text-gray-600">
                  <a
                    href="mailto:support@styledecor.com"
                    className="link link-hover"
                  >
                    support@styledecor.com
                  </a>
                  <br />
                  <a
                    href="mailto:booking@styledecor.com"
                    className="link link-hover"
                  >
                    booking@styledecor.com
                  </a>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="input input-bordered bg-[#FCFAE0] w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="input input-bordered bg-[#FCFAE0] w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Write your message here..."
                    className="textarea textarea-bordered bg-[#FCFAE0] w-full"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Contact;