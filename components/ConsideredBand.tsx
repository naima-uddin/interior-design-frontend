// Olive quote band that separates the hero from the featured pieces —
// "Considered in every detail." Mirrors the reference: left keyword stack,
// centred serif statement, right supporting note.

export default function ConsideredBand() {
  return (
    <section className="bg-[#383927] text-cream-100">
      <div className="mx-auto grid max-w-[1260px] items-center gap-8 px-5 py-6 sm:px-8 md:grid-cols-[auto_1fr_auto] md:gap-12 md:py-8">
        <ul className="eyebrow !text-cream-100/60 flex gap-6 md:flex-col md:gap-2">
          <li>Materials</li>
          <li>People</li>
          <li>Places</li>
        </ul>

        <p className="font-serif text-center text-[1.8rem] font-normal leading-tight tracking-tight text-cream-100 sm:text-4xl md:text-[2.6rem]">
          Considered in every detail.
        </p>

        <div className="text-center md:max-w-[15rem] md:text-right">
          <p className="text-sm font-light leading-relaxed text-cream-100/75">
            Thoughtful design. Lasting materials.
            <br className="hidden md:block" /> A more beautiful everyday.
          </p>
        </div>
      </div>
    </section>
  );
}
