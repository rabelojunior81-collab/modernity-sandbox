// Tessy Fenix / Codex · 2026-09-29. QA da apresentação de teste público.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('../../../modernity-group/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  const report = {author:'Tessy Fenix / Codex',timestamp:new Date().toISOString(),method:'servidor local com catálogo versionado, Chromium',viewports:[]};
  try {
    for (const width of [375,1440]) {
      const context = await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1,isMobile:width===375});
      const page = await context.newPage();
      const failures = [];
      page.on('requestfailed',request=>failures.push(request.url()));
      await page.goto('http://127.0.0.1:8765/',{waitUntil:'domcontentloaded'});
      await page.locator('.peca').first().waitFor({state:'visible',timeout:15000});
      assert.equal(await page.locator('.peca').count(),9);
      assert.equal(await page.locator('.peca__aviso-integracao').count(),9);
      await page.locator('.peca').first().scrollIntoViewIfNeeded();
      await page.waitForFunction(() => {
        const card = document.querySelector('.peca');
        const image = card?.querySelector('img.is-ativa');
        return card && card.classList.contains('is-in') && Number(getComputedStyle(card).opacity) > .99
          && image && image.complete && image.naturalWidth > 0;
      });
      await page.screenshot({path:path.join(__dirname,`catalogo-${width}.png`)});
      await page.locator('.peca').first().click();
      await page.locator('.lente__aviso-integracao').waitFor({state:'visible'});
      assert.match(await page.locator('.lente__aviso-integracao').innerText(),/Confirme preço, estoque e disponibilidade/);
      const metrics = await page.evaluate(() => ({viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,
        actionVisible:(()=>{const r=document.querySelector('.lente__acao a')?.getBoundingClientRect();return !!r && r.top>=0 && r.bottom<=innerHeight;})()}));
      assert.ok(metrics.documentWidth<=width+1,'overflow horizontal');
      assert.ok(metrics.actionVisible,'ação da lente fora do viewport');
      assert.deepEqual(failures,[],'recurso falhou');
      await page.screenshot({path:path.join(__dirname,`ficha-${width}.png`)});
      report.viewports.push({width,cards:9,notes:9,modalNote:true,metrics,requestFailures:failures,screenshots:[`catalogo-${width}.png`,`ficha-${width}.png`]});
      await context.close();
    }
  } finally { await browser.close(); }
  fs.writeFileSync(path.join(__dirname,'qa-public.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report));
})().catch(error=>{console.error(error);process.exitCode=1});
