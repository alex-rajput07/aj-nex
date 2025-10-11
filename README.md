# AJ ERP - Enterprise School Management System

## Overview
AJ ERP is a comprehensive Enterprise Resource Planning solution designed specifically for school administration. It aims to streamline various administrative processes, enhance communication between stakeholders, and provide real-time insights into academic and financial performance.

## Features
- **Role-Based Access Control**: Tailored interfaces for Admin, Manager, Principal, Teacher, and Parent roles.
- **Student Information System (SIS)**: Manage student data, admissions, and demographics.
- **Fee Collection and Financial Management**: Control fee structures, online payments, and defaulter tracking.
- **Attendance Tracking**: Automated and manual attendance management for students and staff.
- **Examination and Grading**: Tools for scheduling exams, calculating grades, and generating report cards.
- **HR and Payroll Automation**: Manage employee records, recruitment, and payroll processing.
- **Resource Management**: Inventory, asset management, and hostel/mess management.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Supabase account for backend services

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd aj-erp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your Supabase project:
   - Create a new project in Supabase.
   - Obtain your Supabase URL and Anon Key.

4. Configure environment variables:
   - Create a `.env.local` file in the root directory and add the following:
     ```
     NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
     NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
     ```

5. Set up the database:
   - Run the SQL scripts in the `supabase` directory to create the necessary tables and seed data:
     ```
     psql -h YOUR_SUPABASE_HOST -U YOUR_SUPABASE_USER -d YOUR_SUPABASE_DB -f supabase/schema.sql
     psql -h YOUR_SUPABASE_HOST -U YOUR_SUPABASE_USER -d YOUR_SUPABASE_DB -f supabase/rls.sql
     psql -h YOUR_SUPABASE_HOST -U YOUR_SUPABASE_USER -d YOUR_SUPABASE_DB -f supabase/seed.sql
     ```

### Running the Application
To start the development server, run:
```
npm run dev
```
Visit `http://localhost:3000` in your browser to access the application.

## Deployment
For deployment, connect your GitHub repository to Vercel. Ensure that your Supabase environment variables are set in the Vercel project settings.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.