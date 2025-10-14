import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-gray-700">
        <p>Welcome to AJ School ERP. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our software.</p>
        
        <h2 className="text-2xl font-semibold pt-4">1. Information We Collect</h2>
        <p>We may collect personal identification information (Name, email address, phone number, etc.) and non-personal identification information (browser name, type of computer, etc.).</p>

        <h2 className="text-2xl font-semibold pt-4">2. How We Use Your Information</h2>
        <p>We use the information we collect to operate and maintain our ERP system, to improve our services, to understand how our users use the services, and to communicate with you.</p>

        <h2 className="text-2xl font-semibold pt-4">3. Sharing Your Information</h2>
        <p>We do not sell, trade, or rent users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers.</p>

        <h2 className="text-2xl font-semibold pt-4">4. Security</h2>
        <p>We use administrative, technical, and physical security measures to help protect your personal information.</p>

        <h2 className="text-2xl font-semibold pt-4">Contact Us</h2>
        <p>If you have questions or comments about this Privacy Policy, please contact us.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;