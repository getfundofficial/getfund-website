interface ContactSectionProps {
  className?: string;
}

export default function ContactSection({ className = '' }: ContactSectionProps) {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Get in Touch
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
          We'd love to hear from you. Whether you're an individual donor, corporate partner, or organization interested in supporting education in Ghana, our team is ready to connect and explore meaningful ways to collaborate.
        </p>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">Email:</span>
            <a
              href="mailto:fundraising@getfund.gov.gh"
              className="text-getfund-primary hover:text-getfund-red transition-colors font-medium"
            >
              fundraising@getfund.gov.gh
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">Contact Number:</span>
            <span className="text-gray-700">[To be added]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
