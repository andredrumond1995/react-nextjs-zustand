import { test, expect } from '@playwright/test';

// Alias for BDD style
const it = test;

test.describe('FEATURE: Home Page - User Name Management', () => {
  test.describe('GIVEN: User is on the home page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test.describe('SCENARIO: No user name is set', () => {
      it('THEN: should display welcome message and name input form', async ({ page }) => {
        // Check if the welcome title is visible
        await expect(page.getByText('Welcome to Test App with Next.js & Zustand')).toBeVisible();
        
        // Check if the name input form is visible
        await expect(page.getByLabel('What is your name?')).toBeVisible();
        await expect(page.getByPlaceholder('Enter your name...')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Save Name' })).toBeVisible();
        
        // Check that "Change User" button is not visible initially
        await expect(page.getByRole('button', { name: 'Change User' })).not.toBeVisible();
      });
    });

    test.describe('SCENARIO: User enters a valid name', () => {
      it('THEN: should save user name and display greeting', async ({ page }) => {
        const testName = 'João Silva';
        
        // Fill in the name input
        await page.getByLabel('What is your name?').fill(testName);
        
        // Click save button
        await page.getByRole('button', { name: 'Save Name' }).click();
        
        // Verify the greeting is displayed
        await expect(page.getByText(`Hello, ${testName}! 👋`)).toBeVisible();
        
        // Verify the "Go to Todo List" link is visible
        await expect(page.getByRole('link', { name: 'Go to Todo List' })).toBeVisible();
        
        // Verify the "Change User" button is now visible
        await expect(page.getByRole('button', { name: 'Change User' })).toBeVisible();
      });
    });

    test.describe('SCENARIO: User tries to save empty name', () => {
      it('THEN: should not save empty name and keep form visible', async ({ page }) => {
        // Try to save empty name
        await page.getByRole('button', { name: 'Save Name' }).click();
        
        // Verify the form is still visible (name wasn't saved)
        await expect(page.getByLabel('What is your name?')).toBeVisible();
        await expect(page.getByPlaceholder('Enter your name...')).toBeVisible();
        
        // Verify no greeting is displayed
        await expect(page.getByText(/Hello,/)).not.toBeVisible();
      });
    });

    test.describe('SCENARIO: User enters name with extra spaces', () => {
      it('THEN: should trim whitespace from name input', async ({ page }) => {
        const nameWithSpaces = '  João Silva  ';
        const trimmedName = 'João Silva';
        
        // Fill in name with extra spaces
        await page.getByLabel('What is your name?').fill(nameWithSpaces);
        await page.getByRole('button', { name: 'Save Name' }).click();
        
        // Verify the trimmed name is displayed
        await expect(page.getByText(`Hello, ${trimmedName}! 👋`)).toBeVisible();
      });
    });
  });

  test.describe('GIVEN: User has already set a name', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      // Set initial name
      await page.getByLabel('What is your name?').fill('Initial User');
      await page.getByRole('button', { name: 'Save Name' }).click();
    });

    test.describe('SCENARIO: User wants to change their name', () => {
      it('THEN: should allow changing user name', async ({ page }) => {
        const newName = 'Pedro Costa';
        
        // Click "Change User" button
        await page.getByRole('button', { name: 'Change User' }).click();
        
        // Verify the form is visible again
        await expect(page.getByLabel('What is your name?')).toBeVisible();
        await expect(page.getByPlaceholder('Enter your name...')).toBeVisible();
        
        // Fill in new name
        await page.getByLabel('What is your name?').fill(newName);
        
        // Click save button
        await page.getByRole('button', { name: 'Save Name' }).click();
        
        // Verify new name is displayed
        await expect(page.getByText(`Hello, ${newName}! 👋`)).toBeVisible();
      });
    });

    test.describe('SCENARIO: User starts changing name but cancels', () => {
      it('THEN: should cancel name change and keep original name', async ({ page }) => {
        const originalName = 'Initial User';
        
        // Click "Change User" button
        await page.getByRole('button', { name: 'Change User' }).click();
        
        // Fill in a different name but don't save
        await page.getByLabel('What is your name?').fill('Different Name');
        
        // Click cancel button
        await page.getByRole('button', { name: 'Cancel' }).click();
        
        // Verify original name is still displayed
        await expect(page.getByText(`Hello, ${originalName}! 👋`)).toBeVisible();
      });
    });

    test.describe('SCENARIO: User wants to navigate to todos page', () => {
      it('THEN: should navigate to todos page successfully', async ({ page }) => {
        // Disable CSS animations for this test
        await page.addStyleTag({
          content: `
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          `
        });
        
        // Wait for the link to be visible and clickable
        const todoLink = page.getByRole('link', { name: 'Go to Todo List' });
        await todoLink.waitFor({ state: 'visible' });
        
        // Click on "Go to Todo List" link
        await todoLink.click();
        
        // Verify navigation to todos page
        await expect(page).toHaveURL('/todos');
      });
    });
  });

  test.describe('GIVEN: User is on home page AND has set a name', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.getByLabel('What is your name?').fill('Test User');
      await page.getByRole('button', { name: 'Save Name' }).click();
    });

    test.describe('AND: User clicks on "Go to Todo List"', () => {
      it('THEN: should navigate to todos page', async ({ page }) => {
        // Disable CSS animations for this test
        await page.addStyleTag({
          content: `
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          `
        });
        
        // Wait for the link to be visible and clickable
        const todoLink = page.getByRole('link', { name: 'Go to Todo List' });
        await todoLink.waitFor({ state: 'visible' });
        
        // Click on "Go to Todo List" link
        await todoLink.click();
        
        // Verify navigation to todos page
        await expect(page).toHaveURL('/todos');
      });
    });
  });
}); 