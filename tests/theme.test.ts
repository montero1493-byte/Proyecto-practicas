import { test, expect } from '@playwright/test';

test('cambiar de tema', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Entrar como invitado' }).click();
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - text: Home / posts
    - textbox "Buscar por título"
    - heading "sunt aut facere repellat provident occaecati excepturi optio reprehenderit" [level=3]
    - paragraph: "ID: 1"
    - heading "qui est esse" [level=3]
    - paragraph: "ID: 2"
    - heading "ea molestias quasi exercitationem repellat qui ipsa sit aut" [level=3]
    - paragraph: "ID: 3"
    - heading "eum et est occaecati" [level=3]
    - paragraph: "ID: 4"
    - heading "nesciunt quas odio" [level=3]
    - paragraph: "ID: 5"
    - heading "dolorem eum magni eos aperiam quia" [level=3]
    - paragraph: "ID: 6"
    - heading "magnam facilis autem" [level=3]
    - paragraph: "ID: 7"
    - heading "dolorem dolore est ipsam" [level=3]
    - paragraph: "ID: 8"
    - heading "nesciunt iure omnis dolorem tempora et accusantium" [level=3]
    - paragraph: "ID: 9"
    - heading "optio molestias id quia eum" [level=3]
    - paragraph: "/ID: \\\\d+/"
    - button "Anterior" [disabled]
    - text: /1 - \\d+/
    - button "Siguiente"
    `);
  await page.getByTestId('theme-toggle').click();
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - text: Home / posts
    - textbox "Buscar por título"
    - heading "sunt aut facere repellat provident occaecati excepturi optio reprehenderit" [level=3]
    - paragraph: "ID: 1"
    - heading "qui est esse" [level=3]
    - paragraph: "ID: 2"
    - heading "ea molestias quasi exercitationem repellat qui ipsa sit aut" [level=3]
    - paragraph: "ID: 3"
    - heading "eum et est occaecati" [level=3]
    - paragraph: "ID: 4"
    - heading "nesciunt quas odio" [level=3]
    - paragraph: "ID: 5"
    - heading "dolorem eum magni eos aperiam quia" [level=3]
    - paragraph: "ID: 6"
    - heading "magnam facilis autem" [level=3]
    - paragraph: "ID: 7"
    - heading "dolorem dolore est ipsam" [level=3]
    - paragraph: "ID: 8"
    - heading "nesciunt iure omnis dolorem tempora et accusantium" [level=3]
    - paragraph: "ID: 9"
    - heading "optio molestias id quia eum" [level=3]
    - paragraph: "/ID: \\\\d+/"
    - button "Anterior" [disabled]
    - text: /1 - \\d+/
    - button "Siguiente"
    `);
  await page.getByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderitID:').click();
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - paragraph: "ID: 1"
    - heading "sunt aut facere repellat provident occaecati excepturi optio reprehenderit" [level=1]
    - text: quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto
    `);
  await page.getByTestId('theme-toggle').click();
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - paragraph: "ID: 1"
    - heading "sunt aut facere repellat provident occaecati excepturi optio reprehenderit" [level=1]
    - text: quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto
    `);
});