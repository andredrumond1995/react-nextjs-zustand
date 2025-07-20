# 🚀 Test App with Next.js, Zustand & Tailwind

Welcome to the **Test App**! This is a beautiful, modern Todo List built with Next.js, Zustand, and Tailwind CSS, fully integrated with a robust backend API.

---

## ✨ Features

- Next.js 15 (App Router, SSR, TypeScript)
- Zustand for global state management
- Tailwind CSS for modern, responsive UI
- Axios for API requests
- Modular, scalable folder structure
- Pagination, filtering, CRUD, and soft delete
- Beautiful UI/UX with accessibility in mind
- **Playwright E2E Testing** with BDD methodology

---

## 📦 Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) (TypeScript, App Router)
  - [Zustand](https://zustand-demo.pmnd.rs/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Axios](https://axios-http.com/)
- **Testing:**
  - [Playwright](https://playwright.dev/) v1.54.1 (E2E Testing)
  - BDD (Behavior Driven Development) methodology
- **Backend:**
  - [NestJS](https://nestjs.com/) + [Mongoose](https://mongoosejs.com/) + Clean Architecture
  - OData v4 query support

---

## 🛠️ Getting Started

### 1. Clone and Run the Backend

You **must** have the backend running locally for this app to work:

```bash
git clone https://github.com/andredrumond1995/nestjs-mongoose-clean-arch.git
cd nestjs-mongoose-clean-arch
docker compose up --build
```

The API will be available at: `http://localhost:3000/v1/todos`

### 2. Clone and Run the Frontend

```bash
git clone <este-repositorio>
cd <este-repositorio>
npm install
npm run dev
```

Open: [http://localhost:4000](http://localhost:4000)

---

## 📋 Requirements

- Node.js 18+
- Docker (for backend)

---

## 🧪 E2E Testing with Playwright

This project includes comprehensive end-to-end testing using **Playwright v1.54.1** with **BDD (Behavior Driven Development)** methodology.

### 🎯 Test Structure

Tests are organized using BDD patterns:
- **FEATURE**: High-level functionality being tested
- **GIVEN**: Preconditions and setup
- **SCENARIO**: Specific test scenarios
- **AND**: Additional conditions
- **THEN**: Expected outcomes and assertions

### 📁 Test Files

- `playwright/tests/home.spec.ts` - Home page user name management tests
- `playwright.config.ts` - Playwright configuration

### 🚀 Available Test Scripts

#### **Run All Tests**
```bash
# Run all tests in headless mode
npm run test:e2e

# Run all tests with browser visible
npm run test:e2e:headed

# Run tests with Playwright UI
npm run test:e2e:ui

# Run tests in debug mode (pauses on each action)
npm run test:e2e:debug
```

#### **Run Specific Tests**
```bash
# Run tests by name pattern
npm run test:e2e:grep "should save user name" -- --headed

# Run tests by file
npm run test:e2e:file playwright/tests/home.spec.ts -- --headed

# Run only failed tests from last run
npm run test:e2e -- --last-failed
```

#### **Run Tests by BDD Pattern**
```bash
# Run all "GIVEN" scenarios
npm run test:e2e:grep "GIVEN:" -- --headed

# Run all "SCENARIO" tests
npm run test:e2e:grep "SCENARIO:" -- --headed

# Run specific feature tests
npm run test:e2e:grep "THEN: should save user name and display greeting" -- --headed
```

### 🧩 Test Coverage

#### **Home Page Tests** (`home.spec.ts`)

**FEATURE: Home Page - User Name Management**

1. **GIVEN: User is on the home page**
   - ✅ **SCENARIO: No user name is set**
     - THEN: should display welcome message and name input form
   - ✅ **SCENARIO: User enters a valid name**
     - THEN: should save user name and display greeting
   - ✅ **SCENARIO: User tries to save empty name**
     - THEN: should not save empty name and keep form visible
   - ✅ **SCENARIO: User enters name with extra spaces**
     - THEN: should trim whitespace from name input

2. **GIVEN: User has already set a name**
   - ✅ **SCENARIO: User wants to change their name**
     - THEN: should allow changing user name
   - ✅ **SCENARIO: User starts changing name but cancels**
     - THEN: should cancel name change and keep original name
   - ✅ **SCENARIO: User wants to navigate to todos page**
     - THEN: should navigate to todos page successfully

3. **GIVEN: User is on home page AND has set a name**
   - ✅ **AND: User clicks on "Go to Todo List"**
     - THEN: should navigate to todos page

### 🔧 Configuration

- **Port**: Tests run on port 4000
- **Browsers**: Chromium, Firefox, WebKit
- **Workers**: 1 (sequential execution for better debugging)
- **Timeout**: 30 seconds per test
- **Retries**: 2 retries on CI only

### 📊 Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

### 🛠️ Adding New Tests

1. Create new test file in `playwright/tests/`
2. Follow BDD structure with `describe` and `it`
3. Use semantic selectors (getByRole, getByLabel, etc.)
4. Add appropriate assertions

Example:
```typescript
test.describe('FEATURE: New Feature', () => {
  test.describe('GIVEN: Precondition', () => {
    test.describe('SCENARIO: Specific scenario', () => {
      it('THEN: Expected outcome', async ({ page }) => {
        // Test implementation
      });
    });
  });
});
```

---

## 📚 API Reference

See the backend documentation for endpoint details: [nestjs-mongoose-clean-arch](https://github.com/andredrumond1995/nestjs-mongoose-clean-arch)

Main endpoints:
- `GET /v1/todos` — List todos (OData v4: `$filter`, `$top`, `$skip`, etc)
- `POST /v1/todos` — Create todo
- `PUT /v1/todos/:id` — Update todo
- `DELETE /v1/todos/:id` — Soft delete todo

---

## 👤 Author

**Andre Drumond**

- [LinkedIn](https://www.linkedin.com/in/andre-drumond/)
- [GitHub](https://github.com/andredrumond1995)
- [YouTube](https://www.youtube.com/@drumonddev)

---

## 🖌️ Screenshots

![Home page screenshot](public/screenshots/home-screenshot.png)

> Home screen of the Test App with Next.js, Zustand, and Tailwind CSS.

---

## 📄 License

MIT
