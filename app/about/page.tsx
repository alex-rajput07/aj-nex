// app/about/page.tsx
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">About AJ School ERP</h1>
                    <p className="mt-6 text-xl text-muted-foreground">
                        Founded in 2025 by Ajeet Singh (AJ), our mission is to provide an affordable, powerful, and user-friendly ERP system for educational institutions of all sizes. We believe in the power of technology to transform education and foster connected communities.
                    </p>
                    <div className="mt-10 prose prose-lg text-muted-foreground max-w-none">
                        <p>
                            AJ School ERP was born from a simple idea: school management software should be elegant, intuitive, and accessible to everyone. We saw too many schools struggling with outdated, complex systems that created more work instead of reducing it. We knew there had to be a better way.
                        </p>
                        <p>
                            Our team is composed of passionate educators, developers, and designers dedicated to building a platform that addresses the real-world challenges faced by schools today. From seamless administrative workflows to real-time communication channels, every feature is designed with the user in mind.
                        </p>
                        <blockquote>
                            <p>Our vision is a world where technology empowers educators to focus on what they do best: teaching and inspiring the next generation.</p>
                        </blockquote>
                        <p>
                            We are committed to continuous improvement and innovation, working closely with our partner schools to ensure AJ School ERP not only meets but exceeds their expectations. Thank you for being a part of our journey.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}