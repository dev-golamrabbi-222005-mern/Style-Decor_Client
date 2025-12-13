const TrustStats = () => {

  return (
    <section className="py-10 md:py-15 lg:py-22 bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <h3 className="text-4xl font-bold text-primary">500+</h3>
          <p className="text-gray-600">Successful Projects</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-primary">50+</h3>
          <p className="text-gray-600">Expert Decorators</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-primary">1K+</h3>
          <p className="text-gray-600">Happy Clients</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-primary">24/7</h3>
          <p className="text-gray-600">Support Access</p>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;