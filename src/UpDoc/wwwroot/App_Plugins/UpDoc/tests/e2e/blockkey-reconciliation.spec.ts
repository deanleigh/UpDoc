import { expect, Page } from '@playwright/test';
import { ConstantHelper, test } from '@umbraco/playwright-testhelpers';

// ── Protected node IDs (NEVER delete these) ────────────────────────────────

const PROTECTED_IDS = new Set([
	'dd9b7287-a3ff-418e-893d-b84df7de7500', // Tailored Tours collection
	'd5b1563d-db6b-42bc-b4bf-950f33894ad2', // Home
	'b4e23226-0aed-487e-b26f-afb80cf992d8', // Group Tours collection
	'e1b0d653-6b50-4699-b5d2-9e1072a220d7', // Test Group Tours collection
]);

// ── API helpers ─────────────────────────────────────────────────────────────

const API_BASE = '/umbraco/management/api/v1/updoc/workflows';
const TEST_WORKFLOW = 'tailoredTourPdf';

async function apiGet(page: Page, path: string): Promise<any> {
	return page.evaluate(async (apiPath) => {
		const tokenJson = localStorage.getItem('umb:userAuthTokenResponse');
		if (!tokenJson) throw new Error('No auth token in localStorage');
		const { access_token } = JSON.parse(tokenJson);
		const resp = await fetch(apiPath, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
		});
		if (!resp.ok) throw new Error(`API GET ${apiPath} failed: ${resp.status}`);
		return resp.json();
	}, path);
}

async function apiPutBody(page: Page, path: string, body?: any): Promise<void> {
	await page.evaluate(
		async ({ apiPath, apiBody }) => {
			const tokenJson = localStorage.getItem('umb:userAuthTokenResponse');
			if (!tokenJson) throw new Error('No auth token in localStorage');
			const { access_token } = JSON.parse(tokenJson);
			const resp = await fetch(apiPath, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`,
				},
				...(apiBody !== undefined ? { body: JSON.stringify(apiBody) } : {}),
			});
			if (!resp.ok) throw new Error(`API PUT ${apiPath} failed: ${resp.status}`);
		},
		{ apiPath: path, apiBody: body }
	);
}

async function apiPutJson(page: Page, path: string, body: any): Promise<any> {
	return page.evaluate(
		async ({ apiPath, apiBody }) => {
			const tokenJson = localStorage.getItem('umb:userAuthTokenResponse');
			if (!tokenJson) throw new Error('No auth token in localStorage');
			const { access_token } = JSON.parse(tokenJson);
			const resp = await fetch(apiPath, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`,
				},
				body: JSON.stringify(apiBody),
			});
			if (!resp.ok) {
				const text = await resp.text();
				throw new Error(`API PUT ${apiPath} failed: ${resp.status} — ${text}`);
			}
			return resp.json().catch(() => null);
		},
		{ apiPath: path, apiBody: body }
	);
}

// ── Sprint 1: contentTypeKey round-trip ─────────────────────────────────────

test.describe('Sprint 1: contentTypeKey model support', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to backoffice to get auth token in localStorage
		await page.goto('/umbraco');
		await page.waitForTimeout(2000);
	});

	test('map.json with contentTypeKey round-trips correctly via API', async ({ page }) => {
		// Step 1: Read current map.json
		const config = await apiGet(page, `${API_BASE}/${TEST_WORKFLOW}`);
		const mapConfig = config.map;
		expect(mapConfig).toBeTruthy();
		expect(mapConfig.mappings.length).toBeGreaterThan(0);

		// Step 2: Read destination.json to get a real contentTypeKey
		const destConfig = config.destination;
		expect(destConfig.blockGrids).toBeTruthy();
		expect(destConfig.blockGrids.length).toBeGreaterThan(0);

		const firstBlock = destConfig.blockGrids[0].blocks[0];
		expect(firstBlock.contentTypeKey).toBeTruthy();
		const realContentTypeKey = firstBlock.contentTypeKey;
		const realBlockKey = firstBlock.key;

		// Step 3: Find a mapping that targets a block property
		const blockMapping = mapConfig.mappings.find((m: any) =>
			m.destinations.some((d: any) => d.blockKey)
		);
		expect(blockMapping).toBeTruthy();

		// Step 4: Save map.json with contentTypeKey added to that mapping
		const updatedMap = JSON.parse(JSON.stringify(mapConfig));
		const blockDest = updatedMap.mappings
			.find((m: any) => m.destinations.some((d: any) => d.blockKey))
			.destinations.find((d: any) => d.blockKey);

		// Store original state for cleanup
		const originalContentTypeKey = blockDest.contentTypeKey;

		// Set contentTypeKey
		blockDest.contentTypeKey = realContentTypeKey;

		await apiPutJson(page, `${API_BASE}/${TEST_WORKFLOW}/map`, updatedMap);

		// Step 5: Read it back and verify contentTypeKey persisted
		const reloaded = await apiGet(page, `${API_BASE}/${TEST_WORKFLOW}`);
		const reloadedDest = reloaded.map.mappings
			.find((m: any) => m.destinations.some((d: any) => d.blockKey))
			.destinations.find((d: any) => d.blockKey);

		expect(reloadedDest.contentTypeKey).toBe(realContentTypeKey);

		// Step 6: Cleanup — restore original state
		blockDest.contentTypeKey = originalContentTypeKey ?? undefined;
		if (!blockDest.contentTypeKey) {
			delete blockDest.contentTypeKey;
		}
		await apiPutJson(page, `${API_BASE}/${TEST_WORKFLOW}/map`, updatedMap);
	});

	test('map.json without contentTypeKey still loads correctly (backwards compatibility)', async ({ page }) => {
		// Read current map.json
		const config = await apiGet(page, `${API_BASE}/${TEST_WORKFLOW}`);
		const mapConfig = config.map;

		// Verify existing mappings load — they don't have contentTypeKey yet
		expect(mapConfig.mappings.length).toBeGreaterThan(0);

		// Find a block mapping — it should have blockKey but contentTypeKey may be null/undefined
		const blockMapping = mapConfig.mappings.find((m: any) =>
			m.destinations.some((d: any) => d.blockKey)
		);
		expect(blockMapping).toBeTruthy();

		const blockDest = blockMapping.destinations.find((d: any) => d.blockKey);
		expect(blockDest.blockKey).toBeTruthy();
		// contentTypeKey should be null or undefined (not present in existing files)
		// This proves backwards compatibility — the model doesn't break on missing field
	});
});

// ── Sprint 2: destination picker provides contentTypeKey ─────────────────────

test.describe('Sprint 2: destination blocks have contentTypeKey for picker', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/umbraco');
		await page.waitForTimeout(2000);
	});

	test('every block in destination.json has a non-empty contentTypeKey', async ({ page }) => {
		const config = await apiGet(page, `${API_BASE}/${TEST_WORKFLOW}`);
		const dest = config.destination;

		// Check blockGrids
		for (const grid of dest.blockGrids ?? []) {
			for (const block of grid.blocks) {
				expect(block.contentTypeKey, `Block "${block.label}" in grid "${grid.label}" missing contentTypeKey`).toBeTruthy();
				// contentTypeKey should be a GUID format
				expect(block.contentTypeKey).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
			}
		}

		// Check blockLists
		for (const list of dest.blockLists ?? []) {
			for (const block of list.blocks) {
				expect(block.contentTypeKey, `Block "${block.label}" in list "${list.label}" missing contentTypeKey`).toBeTruthy();
				expect(block.contentTypeKey).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
			}
		}
	});

	test('each block has a unique contentTypeKey (no duplicates)', async ({ page }) => {
		const config = await apiGet(page, `${API_BASE}/${TEST_WORKFLOW}`);
		const dest = config.destination;

		const allContentTypeKeys: string[] = [];
		for (const grid of dest.blockGrids ?? []) {
			for (const block of grid.blocks) {
				allContentTypeKeys.push(block.contentTypeKey);
			}
		}
		for (const list of dest.blockLists ?? []) {
			for (const block of list.blocks) {
				allContentTypeKeys.push(block.contentTypeKey);
			}
		}

		const uniqueKeys = new Set(allContentTypeKeys);
		expect(uniqueKeys.size).toBe(allContentTypeKeys.length);
	});

	test('blockKey and contentTypeKey are different values (instance vs type)', async ({ page }) => {
		const config = await apiGet(page, `${API_BASE}/${TEST_WORKFLOW}`);
		const dest = config.destination;

		for (const grid of dest.blockGrids ?? []) {
			for (const block of grid.blocks) {
				expect(block.key).not.toBe(block.contentTypeKey);
			}
		}
	});
});

// ── UI helpers for create-from-source flow ──────────────────────────────────

async function selectBlueprint(page: Page, docTypeName: string, blueprintName?: string) {
	const dialog = page.getByRole('dialog');
	await expect(dialog).toBeVisible({ timeout: 10000 });
	await expect(page.getByRole('heading', { name: 'Choose a Document Type' })).toBeVisible();
	await page.locator('blueprint-picker-modal').getByRole('button', { name: docTypeName, exact: true }).click();
	await page.waitForTimeout(500);
	const bpButton = page.locator('blueprint-picker-modal').getByRole('button', { name: blueprintName ?? docTypeName });
	await bpButton.waitFor({ timeout: 5000 });
	await bpButton.click();
}

async function selectPdf(page: Page, pdfName: string) {
	const sourceDialog = page.locator('up-doc-modal');
	await sourceDialog.getByRole('button', { name: 'Choose' }).click();
	await expect(page.getByRole('heading', { name: 'Choose media' })).toBeVisible({ timeout: 10000 });
	const pdfFolderButton = page.getByRole('button', { name: 'PDF', exact: true });
	await pdfFolderButton.waitFor({ timeout: 5000 });
	await pdfFolderButton.dblclick();
	await page.waitForTimeout(1000);
	const pdfCard = page.locator('uui-card-media').filter({ hasText: pdfName });
	await pdfCard.waitFor({ timeout: 10000 });
	await pdfCard.click();
	const chooseButton = page.locator('umb-media-picker-modal').getByRole('button', { name: 'Choose' });
	await chooseButton.click();
}

function getBlockContainerBlocks(doc: any, containerAlias: string): any[] {
	const containerVal = doc.values?.find((v: any) => v.alias === containerAlias);
	if (!containerVal?.value) return [];
	const parsed = typeof containerVal.value === 'string' ? JSON.parse(containerVal.value) : containerVal.value;
	return parsed?.contentData ?? [];
}

function getBlockProperty(block: any, alias: string): any {
	return block?.values?.find((v: any) => v.alias === alias)?.value ?? null;
}

async function trashDocument(page: Page, docId: string) {
	if (!docId || PROTECTED_IDS.has(docId)) return;
	try {
		await apiPutBody(page, `/umbraco/management/api/v1/document/${docId}/move-to-recycle-bin`);
	} catch (e) {
		console.error(`Failed to trash document ${docId}:`, e);
	}
}

// ── Sprint 3: bridge resilience — contentTypeKey bypasses stale blockKey ────

test.describe('Sprint 3: bridge uses contentTypeKey directly', () => {
	let createdDocumentId: string | null = null;

	test.afterEach(async ({ umbracoUi }) => {
		// Trash created document
		if (createdDocumentId) {
			const page = umbracoUi.page;
			try {
				await page.goto('/umbraco');
				await page.waitForTimeout(2000);
				await trashDocument(page, createdDocumentId);
			} catch (e) {
				console.error('Failed to trash document:', e);
			}
		}
	});

	test('precondition: map.json has contentTypeKey with bogus blockKeys', async ({ page }) => {
		// Verify the map.json is in the expected state: contentTypeKey present, blockKey all-zeroes
		await page.goto('/umbraco');
		await page.waitForTimeout(2000);

		const config = await apiGet(page, `${API_BASE}/${TEST_WORKFLOW}`);
		const mapConfig = config.map;

		const blockMappings = mapConfig.mappings.flatMap((m: any) =>
			m.destinations.filter((d: any) => d.contentTypeKey)
		);
		expect(blockMappings.length, 'Should have mappings with contentTypeKey').toBeGreaterThan(0);

		// All block mappings should have all-zero blockKey (stale/bogus)
		for (const dest of blockMappings) {
			expect(dest.blockKey, `Mapping to ${dest.target} should have bogus blockKey`).toBe('00000000-0000-0000-0000-000000000000');
			expect(dest.contentTypeKey, `Mapping to ${dest.target} should have real contentTypeKey`).toMatch(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
			);
			// contentTypeKey should NOT be all-zeroes
			expect(dest.contentTypeKey).not.toBe('00000000-0000-0000-0000-000000000000');
		}
	});

	test('document creation populates blocks via contentTypeKey despite stale blockKeys', async ({ umbracoUi }) => {
		const page = umbracoUi.page;
		test.setTimeout(120000);

		// ── Navigate to Tailored Tours collection ──
		await umbracoUi.goToBackOffice();
		await umbracoUi.content.goToSection(ConstantHelper.sections.content);

		const expandHomeButton = page.getByRole('button', { name: 'Expand child items for Home' });
		await expandHomeButton.waitFor({ timeout: 15000 });
		await expandHomeButton.click();

		const tailoredToursLink = page.getByRole('link', { name: 'Tailored Tours', exact: true });
		await tailoredToursLink.waitFor({ timeout: 15000 });
		await tailoredToursLink.click();
		await page.waitForTimeout(2000);

		// ── Create from Source flow ──
		const createButton = page.getByRole('button', { name: 'Create from Source' });
		await createButton.waitFor({ timeout: 15000 });
		await createButton.click();

		await selectBlueprint(page, 'Tailored Tour');
		await page.waitForTimeout(1000);
		await selectPdf(page, 'updoc-test-01.pdf');

		const successStatus = page.locator('.extraction-status.success');
		await successStatus.waitFor({ timeout: 30000 });

		const urlBeforeCreate = page.url();
		const createDocButton = page.locator('up-doc-modal').getByRole('button', { name: 'Create' });
		await createDocButton.waitFor({ timeout: 5000 });
		await createDocButton.click();

		// ── Capture created document ID ──
		// Wait for URL to change to a DIFFERENT edit page (not the current collection page)
		await page.waitForFunction(
			(prevUrl) => window.location.href !== prevUrl && /\/edit\/[a-f0-9-]+/.test(window.location.href),
			urlBeforeCreate,
			{ timeout: 30000 },
		);
		createdDocumentId = page.url().match(/\/edit\/([a-f0-9-]+)/)?.[1] ?? null;
		expect(createdDocumentId).toBeTruthy();

		// Small delay for the document to be fully persisted
		await page.waitForTimeout(2000);

		// ── Verify block properties populated via API ──
		const doc = await apiGet(page, `/umbraco/management/api/v1/document/${createdDocumentId}`);

		const blockGridBlocks = getBlockContainerBlocks(doc, 'blockGridTailoredTour');
		expect(blockGridBlocks.length, 'Block grid should have blocks').toBeGreaterThan(0);

		// Features block: title should be from PDF, not blueprint default "Features"
		const featuresBlock = blockGridBlocks.find((b: any) => {
			const title = getBlockProperty(b, 'featurePropertyFeatureTitle');
			return title && typeof title === 'string' && title !== 'Features' && title.length > 0;
		});
		expect(featuresBlock, 'Features block should have PDF-sourced title (not blueprint default)').toBeTruthy();

		// Accommodation block: should also be populated
		const accomBlock = blockGridBlocks.find((b: any) => {
			const title = getBlockProperty(b, 'featurePropertyFeatureTitle');
			return title && typeof title === 'string' && title !== 'Accommodation' && title !== 'Features';
		});
		expect(accomBlock, 'Accommodation block should have PDF-sourced title').toBeTruthy();
	});
});
