import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EcosystemBanner from "@/components/sections/EcosystemBanner";
import SponsorsSection from "@/components/sections/SponsorsSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
    return (
        <>
            <Hero />
            <ServicesSection variant="home" />
            <ProjectsSection variant="home" />
            <EcosystemBanner />
            <SponsorsSection />
            <CTASection />
        </>
    );
}
