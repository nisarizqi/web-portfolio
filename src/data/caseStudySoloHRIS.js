// src/data/caseStudySoloHRIS.js

export const soloHRISCaseStudy = {
  title: 'SoloHRIS',

  subtitle: 'Enterprise Attendance System',

  tagline:
    'A Flutter-based mobile attendance application built to modernize employee attendance through biometric authentication, facial verification, and GPS validation.',

  role: 'Mobile Application Developer',

  company: 'PT BPR Bank Solo (Perseroda)',

  timeline: 'Nov 2025 – Present',

  platform: 'Android',

  team: '2 Developers',

  heroImage: '/assets/projects/solohris/hero.webp',

  overview:
    'SoloHRIS is an internal attendance application developed to replace the bank’s legacy web-based system. Employees can securely check in, check out, submit leave requests, and manage attendance directly from their mobile devices.',

  challenge:
    'The previous attendance workflow relied on a web-based system that was less practical for daily use. Attendance verification was also vulnerable to inaccurate location reporting and manual administrative processing.',

  solution:
    'Designed and developed a Flutter mobile application integrated with a Laravel REST API, implementing biometric authentication, Google ML Kit facial verification, GPS-based attendance validation, and a streamlined leave management workflow.',

  features: [
    {
      icon: '🔐',
      title: 'Biometric Authentication',
      description:
        'Authenticate employees securely using the device fingerprint or biometric authentication.',
    },
    {
      icon: '🙂',
      title: 'Facial Verification',
      description:
        'Verify employee identity using Google ML Kit before attendance is submitted.',
    },
    {
      icon: '📍',
      title: 'GPS Validation',
      description:
        'Attendance is only accepted when employees are within the predefined office radius.',
    },
    {
      icon: '📅',
      title: 'Leave Management',
      description:
        'Employees can submit leave and permission requests directly from the application.',
    },
  ],

  walkthrough: [
    {
      title: 'Home Dashboard',
      description:
        'Provides employees with quick access to attendance, leave requests, attendance history, and monthly summaries from a single screen.',
      bullets: [
        'Quick attendance actions',
        'Attendance summary',
        'Monthly recap',
      ],
      image: '/assets/projects/solohris/dashboard.webp',
    },
    {
      title: 'Facial Verification',
      description:
        'Employees verify their identity using Google ML Kit before attendance is recorded, adding an extra layer of security.',
      bullets: [
        'Camera preview',
        'Face detection',
        'Identity verification',
      ],
      image: '/assets/projects/solohris/face-verification.webp',
    },
    {
      title: 'GPS Validation',
      description:
        'The application validates the employee location and only accepts attendance within the configured office radius.',
      bullets: [
        'Google Maps integration',
        'Live location',
        'Radius validation',
      ],
      image: '/assets/projects/solohris/maps.webp',
    },
    {
      title: 'Leave Management',
      description:
        'Employees can submit leave requests digitally without manual paperwork, while tracking approval status directly from the app.',
      bullets: [
        'Digital submission',
        'Approval tracking',
        'Simple workflow',
      ],
      image: '/assets/projects/solohris/leave.webp',
    },
  ],

  techStack: [
    'Flutter',
    'Laravel',
    'REST API',
    'Google ML Kit',
    'MySQL',
  ],

  impact: [
    'Replaced the previous web-based attendance workflow.',
    'Reduced manual attendance processing across the organization.',
    'Improved attendance verification through biometric authentication and GPS validation.',
    'Currently used internally by employees at PT BPR Bank Solo (Perseroda).',
  ],

  engineeringChallenges: [
    {
      title: 'Reliable Face Verification',
      description:
        'Integrated Google ML Kit to verify employee identity while maintaining a smooth user experience during attendance.',
    },
    {
      title: 'Location Accuracy',
      description:
        'Implemented GPS validation to ensure attendance is submitted only from authorized locations.',
    },
    {
      title: 'Backend Integration',
      description:
        'Connected the Flutter application with Laravel REST APIs for authentication, attendance management, and leave requests.',
    },
  ],

  gallery: [
    {
      title: 'Home',
      image: '/assets/projects/solohris/home.webp',
    },
    {
      title: 'Attendance',
      image: '/assets/projects/solohris/attendance.webp',
    },
    {
      title: 'Face Verification',
      image: '/assets/projects/solohris/face.webp',
    },
    {
      title: 'GPS Validation',
      image: '/assets/projects/solohris/maps.webp',
    },
    {
      title: 'Leave',
      image: '/assets/projects/solohris/leave.webp',
    },
    {
      title: 'Profile',
      image: '/assets/projects/solohris/profile.webp',
    },
  ],
};