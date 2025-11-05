Hospital Management System ERP - MVP Todo List
Overview
A modern, responsive Hospital Management System UI with healthcare theme (blue/white colors), smooth transitions, and charts.

File Structure (8 files max)
1. src/App.tsx (Update)
Add routing for all pages
Include theme provider for light/dark mode
2. src/pages/Login.tsx (New)
Login and Register forms with tabs
Hospital logo
Clean authentication UI
3. src/pages/Dashboard.tsx (New)
Overview cards: Total Patients, Doctors, Appointments, Available Beds
Quick stats with icons
Recent activity section
4. src/pages/Patients.tsx (New)
Patient list table with search/filter
View, Edit, Delete action buttons
Patient details modal
5. src/pages/Doctors.tsx (New)
Doctor list with departments
Schedule information
Action buttons
6. src/pages/Appointments.tsx (New)
Appointment booking form
Calendar view of appointments
Status indicators
7. src/pages/Billing.tsx (New)
Bills/invoices table
Payment status badges
Invoice details
8. src/pages/Reports.tsx (New)
Charts for hospital performance (using recharts)
Patient flow analytics
Revenue trends
9. src/pages/Settings.tsx (New)
Profile settings
Notification preferences
Theme toggle (light/dark)
10. src/components/Layout.tsx (New)
Main layout with sidebar navigation
Header with user profile
Responsive design
11. index.html (Update)
Update title to “Hospital Management System”
Design Guidelines
Primary color: Blue (#3B82F6)
Secondary color: White
Use shadcn/ui components
Smooth transitions with Tailwind animations
Lucide React icons
Recharts for analytics
Responsive design (mobile-first)
Dependencies to Add
recharts (for charts)
date-fns (for date handling)
Implementation Order
Update App.tsx with routes
Create Layout component with sidebar
Create Login page
Create Dashboard page
Create Patients page
Create Doctors page
Create Appointments page
Create Billing page
Create Reports page
Create Settings page
Update index.html
Run lint and build checks