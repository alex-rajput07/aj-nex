// app/privacy-policy/page.tsx
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function PrivacyPolicyPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Privacy Policy</h1>
                    <p className="mt-6 text-xl text-muted-foreground">
                        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
                    </p>
                    <div className="mt-10 prose prose-lg text-muted-foreground max-w-none">
                        <h2>1. Information We Collect</h2>
                        <p>
                            We collect information you provide directly to us, such as when you create an account, update your profile, or use the interactive features of our service. This may include your name, email address, role (student, teacher, etc.), and any other information you choose to provide.
                        </p>
                        <h2>2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services. This includes:
                        </p>
                        <ul>
                            <li>Authenticating users and providing access to role-based dashboards.</li>
                            <li>Displaying academic information such as grades, attendance, and schedules.</li>
                            <li>Facilitating communication between users.</li>
                            <li>Processing payments for school fees.</li>
                        </ul>
                        <h2>3. Data Security</h2>
                        <p>
                            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access. We use Supabase for our backend, which provides a secure environment for your data, including row-level security (RLS) to ensure users can only access data they are permitted to see.
                        </p>
                        <h2>4. Your Choices</h2>
                        <p>
                            You may update, correct, or delete information about you at any time by logging into your account. If you wish to delete your account, please contact us, but note that we may retain certain information as required by law or for legitimate business purposes.
                        </p>
                        <h2>5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at privacy@ajschoolerp.com.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}