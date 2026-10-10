import { PageTransition } from "@/components/fx/PageTransition";
import { DiyaPravah } from "@/components/home/DiyaPravah";
import { Experience } from "@/components/home/Experience";
import { Festivals } from "@/components/home/Festivals";
import { Gallery } from "@/components/home/Gallery";
import { GhatJourney } from "@/components/home/GhatJourney";
import { Hero } from "@/components/home/Hero";
import { Packages } from "@/components/home/Packages";
import { PlanExperience } from "@/components/home/PlanExperience";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Services />
      <Packages />
      <Experience />
      <GhatJourney />
      <Festivals />
      <Gallery />
      <Testimonials />
      <DiyaPravah />
      <PlanExperience />
    </PageTransition>
  );
}
