import { Button } from "@/components/ui/button";

export function ContactCTASection() {
  return (
    <section id="contact" className="w-full bg-black py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-2xl md:text-4xl text-white">Ready to get started?</h2>
        <p className="text-neutral-400 mt-3">
          Share your goals and I’ll reply with a quick plan and timeline.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            className="bg-lime-500 text-black hover:bg-lime-500/90"
            onClick={() => (window.location.href = 'mailto:hello@example.com?subject=Website inquiry')}
          >
            Email me
          </Button>
          <Button
            variant="outline"
            className="border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800"
            onClick={() => (window.location.href = '#designs')}
          >
            Browse designs
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ContactCTASection;
