import { expect } from '@playwright/test';
import { ConstantHelper, test } from '@umbraco/playwright-testhelpers';

/**
 * Tests for the Transformed tab in the workflow workspace.
 * Verifies that ungrouped rules show role name as box title with content below,
 * and grouped rules show group name as box title with sub-labeled parts.
 */
test.describe('Transformed View', () => {
	test.beforeEach(async ({ umbracoUi }) => {
		const page = umbracoUi.page;

		// Navigate to Settings → UpDoc
		await umbracoUi.goToBackOffice();
		await umbracoUi.settings.goToSection(ConstantHelper.sections.settings);

		// Expand UpDoc tree and click the workflow
		const expandUpDoc = page.getByRole('button', { name: 'Expand child items for UpDoc' });
		await expandUpDoc.waitFor({ timeout: 15000 });
		await expandUpDoc.click();

		// Click "Tailored Tour Pdf" workflow (or first available workflow)
		const workflowLink = page.getByRole('link', { name: /tailored.tour.*pdf/i });
		await workflowLink.waitFor({ timeout: 10000 });
		await workflowLink.click();

		// Wait for workspace to load, then click the Source tab
		await page.waitForTimeout(2000);
		const sourceTab = page.locator('uui-tab').filter({ hasText: 'Source' });
		await sourceTab.waitFor({ timeout: 10000 });
		await sourceTab.click();
		await page.waitForTimeout(1000);

		// Click the Transformed inner tab
		const transformedTab = page.locator('uui-tab').filter({ hasText: 'Transformed' });
		await transformedTab.waitFor({ timeout: 10000 });
		await transformedTab.click();
		await page.waitForTimeout(2000);
	});

	test('Ungrouped rule: box title is role name, no duplicate inside content', async ({ umbracoUi }) => {
		const page = umbracoUi.page;

		// Find the "Organisation" section box
		const orgBox = page.locator('uui-box[headline="Organisation"]');
		await expect(orgBox).toBeVisible({ timeout: 10000 });

		// The box title should be "Organisation"
		await expect(orgBox).toHaveAttribute('headline', 'Organisation');

		// Content should contain the actual matched text
		const content = orgBox.locator('.md-section-content');
		await expect(content).toContainText('Art Fund');

		// The word "Organisation" should NOT appear inside the content area
		// (it should only be the box headline, not repeated inside)
		const partContent = orgBox.locator('.md-part-content');
		const partText = await partContent.textContent();
		expect(partText).not.toMatch(/^Organisation\s*Organisation/);
	});

	test('Ungrouped rule: no sub-labels present', async ({ umbracoUi }) => {
		const page = umbracoUi.page;

		// Find the "Organisation" section box
		const orgBox = page.locator('uui-box[headline="Organisation"]');
		await expect(orgBox).toBeVisible({ timeout: 10000 });

		// Should NOT have section-label sub-labels (those are for grouped only)
		const labels = orgBox.locator('.section-label');
		await expect(labels).toHaveCount(0);
	});

	test('Grouped rule: box title is group name, not instance title', async ({ umbracoUi }) => {
		const page = umbracoUi.page;

		// Find a grouped section — should use group name as headline, not "Features"
		const groupBox = page.locator('uui-box[headline="Tour Details - Section"]').first();
		await expect(groupBox).toBeVisible({ timeout: 10000 });

		// Should NOT have a box with headline "Features" (that's the old broken behavior)
		const featuresBox = page.locator('uui-box[headline="Features"]');
		await expect(featuresBox).toHaveCount(0);
	});

	test('Grouped rule: has sub-labels for title and content parts', async ({ umbracoUi }) => {
		const page = umbracoUi.page;

		// Find the first grouped section box
		const groupBox = page.locator('uui-box[headline="Tour Details - Section"]').first();
		await expect(groupBox).toBeVisible({ timeout: 10000 });

		// Should have sub-labels
		const labels = groupBox.locator('.section-label');
		const labelCount = await labels.count();
		expect(labelCount).toBeGreaterThanOrEqual(2); // At least Title + Content

		// First label should be the title sub-label
		await expect(labels.first()).toContainText('Title');

		// Should contain a content sub-label
		const contentLabel = groupBox.locator('.section-label').filter({ hasText: 'Content' });
		await expect(contentLabel).toBeVisible();
	});

	test('Grouped rule: title part contains actual heading text', async ({ umbracoUi }) => {
		const page = umbracoUi.page;

		// Find the first grouped section box
		const groupBox = page.locator('uui-box[headline="Tour Details - Section"]').first();
		await expect(groupBox).toBeVisible({ timeout: 10000 });

		// The first md-part-content should contain the instance title (e.g., "Features")
		const firstPartContent = groupBox.locator('.md-part-content').first();
		const text = await firstPartContent.textContent();

		// Should be one of the known Tour Details section titles
		const knownTitles = ['Features', 'What We Will See', 'Optional', 'Accommodation', 'Extras To Your Tour'];
		const matchesKnownTitle = knownTitles.some((t) => text?.includes(t));
		expect(matchesKnownTitle).toBe(true);
	});
});
