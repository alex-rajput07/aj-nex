import React from 'react';
import { School } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          <School className="text-blue-600" size={32} />
          <h1 className="text-xl font-bold ml-2">AJ School ERP System</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;