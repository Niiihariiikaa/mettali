import Head from "next/head";
import Link from "next/link";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | METTALI</title>
        <meta
          name="description"
          content="Mettali crafts premium aluminium furniture and home decor — where industrial strength meets refined elegance."
        />
      </Head>

      <main className="min-h-screen bg-[#E4E3DF]">
        <Header />

        {/* Hero */}
        <div className="pt-36 pb-16 text-center px-6">
          <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Our Story</p>
          <h1 className="text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">About Us</h1>
          <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">
            Premium aluminium furniture and home decor for modern living.
          </p>
        </div>

        {/* Story */}
        <div className="px-6 pb-16 md:px-12 lg:px-20">
          <div className="mx-auto max-w-3xl space-y-6 text-lg md:text-xl leading-relaxed text-smoked-bronze font-space-mono">
            <p>
              Mettali began with a simple idea — to see metal differently. What started as a passion project
              slowly turned into a journey of creating pieces that feel both functional and personal for
              everyday spaces.
            </p>
            <p>
              Over the last two years, we have explored aluminum in ways that feel lighter, softer, and more
              creative than people usually imagine. From flower vases and shelves to wine holders, shoe racks,
              cup holders, and small organisers, every piece is designed to blend into real homes and real
              routines with ease.
            </p>
            <p>
              At its core, Mettali is about creating objects that are minimal, thoughtful, and made to last —
              designs that quietly become a part of your everyday life.
            </p>
          </div>
        </div>

        {/* Design Philosophy */}
        <div className="px-6 pb-24 md:px-12 lg:px-20">
          <h2 className="text-2xl md:text-3xl text-mulled-iron font-horizon uppercase tracking-wide text-center mb-8">
            Our Design Philosophy
          </h2>
          <div className="mx-auto max-w-3xl space-y-6 text-lg md:text-xl leading-relaxed text-smoked-bronze font-space-mono">
            <p>
              At Mettali, we like being involved in every step of the process. From the first design sketch to
              laser cutting, bending, assembling, finishing, painting, and packaging — everything is done
              in-house by our team.
            </p>
            <p>
              Working this way helps us pay attention to the small details, take our time with the process, and
              make sure every piece feels right before it reaches you. For us, it's not just about making
              products — it's about creating pieces that people genuinely enjoy living with.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-border px-6 py-16 text-center md:px-12 lg:px-20">
          <h2 className="text-2xl md:text-3xl text-mulled-iron font-horizon uppercase tracking-wide">
            Built for Every Room.
          </h2>
          <Link
            href="#reserve"
            className="mt-8 inline-block border border-mulled-iron/60 px-8 py-3 text-xs uppercase tracking-widest text-mulled-iron font-space-mono hover:bg-mulled-iron hover:text-white transition-colors duration-200"
          >
            Shop Now
          </Link>
        </div>

        {/* Video */}
        <div className="px-6 pb-24 md:px-12 lg:px-20">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-video object-cover"
          >
            <source src="/images/about%20us%20video.mp4" type="video/mp4" />
          </video>
        </div>

        <FooterSection />
      </main>
    </>
  );
}
