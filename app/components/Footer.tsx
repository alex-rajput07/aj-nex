import React from 'react';
import { CheckCircle, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p className="flex items-center justify-center">
          Developed by Ajeet Singh (AJ)
          <Heart className="text-red-500 mx-1" size={16} fill="red" />
          <a
            href="https://www.instagram.com/ajeet.singh_aj/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:underline ml-1"
          >
            <CheckCircle className="text-blue-500" size={16} />
            <span className="ml-1">Verified on Instagram</span>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;