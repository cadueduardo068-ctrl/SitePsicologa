import { test, expect } from '@playwright/test';
for (const width of [360, 390, 768, 1440]) {
 test(`layout and navigation at ${width}px`, async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  await page.setViewportSize({ width, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('acolhimento');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  if (width < 761) {
   await page.getByRole('button', { name: 'Abrir menu' }).click();
   await page.getByRole('navigation', { name: 'Navegação mobile', exact: true }).getByRole('link', { name: 'Dúvidas' }).click();
   await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  }
  const faq = page.getByRole('button', { name: 'O atendimento é presencial ou online?' });
  await faq.click(); await expect(faq).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('region', { name: 'O atendimento é presencial ou online?' })).toContainText('precisam ser confirmadas');
  await faq.click(); await expect(faq).toHaveAttribute('aria-expanded', 'false');
  const contact = page.getByRole('link', { name: /Entrar em contato pelo WhatsApp/ });
  await expect(contact).toHaveAttribute('href', /https:\/\/wa.me\/5514996017595\?text=/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  expect(errors).toEqual([]);
 });
}
test('keyboard and reduced motion', async ({ page }) => {
 await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/');
 await page.keyboard.press('Tab'); await expect(page.getByText('Pular para o conteúdo')).toBeFocused();
 await page.keyboard.press('Enter'); await expect(page).toHaveURL(/#conteudo$/);
 await page.getByRole('button', { name: 'Como saber se há horários disponíveis?' }).focus();
 await page.keyboard.press('Enter');
 await expect(page.getByRole('region', { name: 'Como saber se há horários disponíveis?' })).toBeVisible();
});
