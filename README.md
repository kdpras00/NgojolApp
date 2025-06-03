# NgojolApp - Reorganized Codebase

This repository contains the reorganized codebase for NgojolApp, with separated HTML, CSS, and JavaScript files following clean code principles.

## Structure

```
NgojolApp/
├── index.html
├── news.html
├── pendaftaran-driver-baru.html
├── offline.html
├── manifest.json
├── service-worker.js
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── components/
│   │   │   ├── buttons.css
│   │   │   ├── cards.css
│   │   │   ├── forms.css
│   │   │   ├── navbar.css
│   │   │   └── animations.css
│   │   └── pages/
│   │       ├── home.css
│   │       ├── news.css
│   │       └── registration.css
│   ├── js/
│   │   ├── main.js
│   │   ├── config/
│   │   │   └── tailwind.config.js
│   │   ├── components/
│   │   │   ├── navbar.js
│   │   │   ├── darkMode.js
│   │   │   ├── slider.js
│   │   │   └── forms.js
│   │   ├── utils/
│   │   │   ├── helpers.js
│   │   │   └── validation.js
│   │   └── pages/
│   │       ├── home.js
│   │       ├── news.js
│   │       └── registration.js
│   └── img/
└── node_modules/
```

## Key Improvements

1. **Separated Concerns**:
   - HTML files now contain only markup
   - CSS organized by components and pages
   - JavaScript organized by functionality

2. **Reduced Repetition**:
   - Common components extracted to reusable files
   - Shared styles and scripts centralized

3. **Clean Code Principles**:
   - Single Responsibility Principle for each file
   - DRY (Don't Repeat Yourself) implementation
   - Consistent naming conventions

## Usage

1. Open index.html in your browser to view the homepage
2. All functionality remains identical to the original implementation 