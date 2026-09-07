"""Review built assets, not the source alone. No live video playback is claimed."""
import functools, http.server, json, os, pathlib, tempfile, threading
from playwright.sync_api import sync_playwright
hub = os.environ.get('GITHUB_REPOSITORY', 'dlwyatt-eng/teacher-hub').split('/')[-1]
root = pathlib.Path(tempfile.mkdtemp(prefix='earth-web-'))
(root / hub).symlink_to(pathlib.Path('pages-dist').resolve(), target_is_directory=True)
server = http.server.ThreadingHTTPServer(('127.0.0.1', 8765), functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(root)))
threading.Thread(target=server.serve_forever, daemon=True).start()
out = pathlib.Path('earth-review'); out.mkdir(exist_ok=True)
errors=[]; checks=[]
with sync_playwright() as p:
    browser=p.chromium.launch()
    page=browser.new_page(viewport={'width':1440,'height':1000})
    page.on('pageerror', lambda e: errors.append(str(e)))
    base=f'http://127.0.0.1:8765/{hub}/'
    page.goto(base, wait_until='domcontentloaded')
    page.locator('h1').first.wait_for()
    page.screenshot(path=str(out/'hub-entry.png'), full_page=True)
    if hub=='equity-hub':
        page.locator('.earth-hub-entry summary').click()
        assert page.locator('.earth-hub-entry nav a').count()==4
        page.screenshot(path=str(out/'earth-entry-expanded.png'),full_page=True)
        for href in page.locator('.earth-hub-entry nav a').evaluate_all('(els)=>els.map(e=>e.href)'):
            assert '/equity-hub/earth-stuff-fairness/?band=' in href
        checks.append({'equityEntry':True,'fourGradeLinks':True})
    if hub=='learn':
        assert page.locator('.earth-family-entry').count()==0
        page.goto(base+'#families',wait_until='domcontentloaded')
        page.locator('.earth-family-entry a').wait_for()
        page.screenshot(path=str(out/'family-entry.png'),full_page=True)
        assert '/learn/earth-stuff-fairness/' in page.locator('.earth-family-entry a').get_attribute('href')
        checks.append({'familyEntry':True,'openingNowUnchanged':True})
    page.goto(base+'earth-stuff-fairness/', wait_until='load')
    if hub=='learn':
        assert page.locator('h1').inner_text()=='Earth, Stuff & Fairness'
        assert page.locator('#pack-data').count()==0
        assert 'Suggested placements' not in page.locator('body').inner_text()
        page.screenshot(path=str(out/'family-companion.png'),full_page=True)
        checks.append({'familyCompanion':True,'noTeacherData':True})
    else:
        for band, count in [('K–2',4),('3–5',4),('6–8',6),('9–12',6)]:
            page.locator('#band').select_option(band)
            assert page.locator('[data-activity]').count()==count
            ids=page.locator('[data-activity]').evaluate_all('(els)=>els.map(e=>e.dataset.activity)')
            for aid in ids:
                page.locator(f'[data-activity="{aid}"]').click()
                assert page.locator('#main .steps .step').count()>=3
                assert 'undefined' not in page.locator('#main').inner_text()
                page.locator('#project').click()
                assert page.locator('#main .steps .step').count()==1
                page.locator('#next').click()
                assert page.locator('#activity-cards .card').count()==1
                page.locator('#card-next').click()
                assert page.locator('#activity-cards .card').count()==1
                assert page.locator('#main details.plan').first.is_hidden()
                page.keyboard.press('Escape')
                page.emulate_media(media='print')
                assert page.locator('#main .worksheet').is_visible()
                assert page.locator('#main details.plan').first.is_hidden()
                page.emulate_media(media='screen')
                checks.append({'band':band,'activity':aid,'projection':True,'print':True})
        page.locator('#band').select_option('6–8')
        page.locator('[data-activity="change"]').click()
        page.locator('#project').click(); page.locator('#next').click()
        page.screenshot(path=str(out/'projector.png'),full_page=True)
        page.keyboard.press('Escape')
        # Explicit media selection is essential after earlier screen emulation.
        page.emulate_media(media='print')
        page.pdf(path=str(out/'student-print-sample.pdf'),format='Letter',print_background=False,prefer_css_page_size=True)
        page.emulate_media(media='screen')
        page.locator('#band').select_option('K–2')
        assert page.locator('#library .film-card').count()==0
    page.set_viewport_size({'width':390,'height':844})
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
    page.screenshot(path=str(out/'mobile.png'),full_page=True)
    browser.close()
server.shutdown()
(out/'checks.json').write_text(json.dumps({'hub':hub,'checks':checks,'javascriptErrors':errors,'limits':['No classroom trial','Streaming and caption accuracy require teacher preview','Existing individual lessons were not all visually rehearsed']},indent=2))
assert not errors, errors
print(f'PASS: {hub}, {len(checks)} route checks, no JavaScript exceptions')
