"""Build the supplied student PDFs from rendered React sheets; requires weasyprint/lxml."""
from pathlib import Path
from lxml import html
from weasyprint import HTML
source=Path('/tmp/social-starter-render')
output=Path('public/printables/social-studies'); output.mkdir(parents=True,exist_ok=True)
style='''@page {size:Letter; margin:.6in; @bottom-right{content:counter(page);font-size:10pt}}
body{font-family:DejaVu Sans,sans-serif;font-size:12pt;line-height:1.4;color:#000}h3{font-size:19pt}h4{font-size:14pt}small{font-size:10pt}a{color:#000;text-decoration:underline;overflow-wrap:anywhere}p{margin:.4em 0 .7em}article{border:1px solid #000;padding:10pt;margin:0 0 10pt;break-inside:avoid}header{margin-bottom:14pt}.ss-starter-tools{display:none}.ss-response{break-before:page}.ss-response>div{break-inside:avoid}.ss-writing-space{height:1.55in;border-bottom:1px solid #777}'''
for path in sorted(source.glob('*.html')):
 root=html.fromstring(path.read_text())
 sheet=root.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," ss-starter-sheet ")]')[0]
 # Preserve the cross-pack source direction in PDFs rather than a relative interactive link.
 for p in sheet.xpath('.//*[@class="ss-starter-tools"]'):
  p.set('class','source-note')
  for a in p.xpath('.//a'):
   href=a.get('href','')
   if href.startswith('/'): a.set('href','https://dlwyatt-eng.github.io/teacher-hub'+href)
 content=html.tostring(sheet,encoding='unicode')
 for large in [False,True]:
  css=style+('body{font-size:16pt}h3{font-size:22pt}h4{font-size:18pt}small{font-size:12pt}.ss-response{break-before:auto;margin-top:20pt}' if large else '')
  name=path.stem+('-large' if large else '')+'.pdf'
  doc=HTML(string='<!doctype html><html lang="en"><meta charset="utf-8"><title>'+path.stem+'</title><style>'+css+'</style><body>'+content+'</body></html>').render()
  doc.write_pdf(output/name)
  print(name,len(doc.pages),'pages')
