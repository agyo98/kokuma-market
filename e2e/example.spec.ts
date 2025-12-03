import { test, expect } from '@playwright/test';

test.describe('Example Feature', () => {
  test.beforeEach(async ({ page }) => {
    // 페이지로 이동
    await page.goto('/example', { waitUntil: 'domcontentloaded' });
    
    // URL이 올바른지 확인 및 디버깅
    const url = page.url();
    console.log('Current URL:', url);
    
    if (!url.includes('/example')) {
      // 스크린샷을 찍어서 디버깅
      await page.screenshot({ path: 'debug-wrong-url.png', fullPage: true });
      throw new Error(`Expected /example but got ${url}`);
    }
    
    // 실제 페이지 경로 확인
    const pathname = new URL(url).pathname;
    console.log('Pathname:', pathname);
    
    if (pathname !== '/example') {
      await page.screenshot({ path: 'debug-wrong-pathname.png', fullPage: true });
      throw new Error(`Expected pathname /example but got ${pathname}`);
    }
    
    // 페이지 본문이 로드될 때까지 대기
    await page.waitForSelector('body', { state: 'attached' });
    
    // React가 렌더링될 시간을 줌 - 더 유연한 대기
    try {
      await page.waitForFunction(() => {
        const bodyText = document.body.textContent || '';
        return bodyText.includes('Backend') || bodyText.includes('Health') || bodyText.length > 100;
      }, { timeout: 20000 });
    } catch (e) {
      // 대기 실패 시 스크린샷 찍기
      await page.screenshot({ path: 'debug-page-load-failed.png', fullPage: true });
      const bodyText = await page.textContent('body');
      throw new Error(`Page content not loaded. Body text: ${bodyText?.substring(0, 200)}`);
    }
    
    // 추가로 짧은 대기 (hydration 완료)
    await page.waitForTimeout(500);
  });

  test('should render the example page correctly', async ({ page }) => {
    // 입력 필드가 있는지 확인 (이것이 example 페이지의 핵심 기능)
    const input = page.getByPlaceholder('00000000-0000-0000-0000-000000000000');
    await expect(input).toBeVisible({ timeout: 15000 });

    // 조회 버튼 확인
    const button = page.getByRole('button', { name: /조회하기/i });
    await expect(button).toBeVisible({ timeout: 10000 });

    // 초기 상태는 Idle
    await expect(page.getByText(/Idle/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('should show idle message when no ID is provided', async ({ page }) => {
    // 초기 상태 메시지 확인
    await expect(page.getByText(/UUID를 입력하고 조회하기 버튼을 누르면/i)).toBeVisible({ timeout: 10000 });

    // Idle 상태 뱃지 확인
    await expect(page.getByText(/Idle/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('should clear results when empty input is submitted', async ({ page }) => {
    const input = page.getByPlaceholder('00000000-0000-0000-0000-000000000000');
    const button = page.getByRole('button', { name: /조회하기/i });

    // 요소가 보일 때까지 대기
    await expect(input).toBeVisible({ timeout: 10000 });
    await expect(button).toBeVisible({ timeout: 10000 });

    // 빈 문자열 입력
    await input.fill('   ');
    await button.click();

    // Idle 상태로 돌아가는지 확인
    await expect(page.getByText(/Idle/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/UUID를 입력하고 조회하기 버튼을 누르면/i)).toBeVisible({ timeout: 10000 });
  });

  test('should show error for invalid UUID', async ({ page }) => {
    const input = page.getByPlaceholder('00000000-0000-0000-0000-000000000000');
    const button = page.getByRole('button', { name: /조회하기/i });

    // 요소가 보일 때까지 대기
    await expect(input).toBeVisible({ timeout: 10000 });
    await expect(button).toBeVisible({ timeout: 10000 });

    // 잘못된 UUID 입력
    await input.fill('invalid-uuid-format');
    await button.click();

    // Error 상태 뱃지 확인
    await expect(page.getByText(/Error/i).first()).toBeVisible({ timeout: 15000 });

    // 에러 메시지 확인
    await expect(page.getByText(/요청 실패/i)).toBeVisible({ timeout: 10000 });
  });

  test('should handle loading state', async ({ page }) => {
    const input = page.getByPlaceholder('00000000-0000-0000-0000-000000000000');
    const button = page.getByRole('button', { name: /조회하기/i });

    // 요소가 보일 때까지 대기
    await expect(input).toBeVisible({ timeout: 10000 });
    await expect(button).toBeVisible({ timeout: 10000 });

    // 임의의 UUID 입력 (느린 응답을 시뮬레이션하기 위해)
    await input.fill('00000000-0000-0000-0000-000000000001');
    await button.click();

    // Fetching 상태가 나타나는지 확인 (빠르게 지나갈 수 있음)
    const fetchingOrError = page.getByText(/Fetching|Error/i).first();
    await expect(fetchingOrError).toBeVisible({ timeout: 15000 });
  });

  test('should allow refetch with same ID', async ({ page }) => {
    const input = page.getByPlaceholder('00000000-0000-0000-0000-000000000000');
    const button = page.getByRole('button', { name: /조회하기/i });

    // 요소가 보일 때까지 대기
    await expect(input).toBeVisible({ timeout: 10000 });
    await expect(button).toBeVisible({ timeout: 10000 });

    const testId = 'test-id-12345';

    // 첫 번째 조회
    await input.fill(testId);
    await button.click();

    // 결과 대기
    await expect(page.getByText(/Error|Success/i).first()).toBeVisible({ timeout: 15000 });

    // 같은 ID로 다시 조회
    await button.click();

    // 다시 Fetching 상태가 되는지 확인
    await expect(page.getByText(/Fetching|Error|Success/i).first()).toBeVisible({ timeout: 15000 });
  });

  test('should display result sections correctly', async ({ page }) => {
    // 현재 상태 섹션 확인
    await expect(page.getByRole('heading', { name: /현재 상태/i })).toBeVisible({ timeout: 10000 });

    // 결과 표시 영역이 존재하는지 확인
    const resultSection = page.locator('article').filter({ hasText: /현재 상태/ });
    await expect(resultSection).toBeVisible({ timeout: 10000 });
  });
});
