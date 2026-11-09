from pathlib import Path
import cairosvg
from PIL import Image

ROOT = Path(__file__).parent
OUT = ROOT / 'assets' / 'lembar-f4'
OUT.mkdir(parents=True, exist_ok=True)
W, H = 816, 1247

NAVY = '#14233B'
BLUE = '#2563EB'
CYAN = '#0EA5A4'
GOLD = '#F2B84B'
INK = '#1F2937'
MUTED = '#64748B'
PALE = '#F3F7FC'
LINE = '#D9E2EF'
WHITE = '#FFFFFF'


def base_svg(kicker, title, subtitle, page_no):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="216mm" height="330mm" viewBox="0 0 {W} {H}">
    <defs>
      <linearGradient id="head" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{NAVY}"/><stop offset="1" stop-color="#244B7A"/></linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{BLUE}"/><stop offset="1" stop-color="{CYAN}"/></linearGradient>
    </defs>
    <rect width="{W}" height="{H}" fill="#FFFFFF"/>
    <rect x="26" y="26" width="764" height="1195" rx="22" fill="none" stroke="{LINE}" stroke-width="2"/>
    <rect x="42" y="42" width="732" height="214" rx="18" fill="url(#head)"/>
    <rect x="42" y="42" width="10" height="214" rx="5" fill="{GOLD}"/>
    <text x="76" y="88" fill="#BFD6F5" font-size="17" font-weight="700" letter-spacing="2" font-family="Arial, sans-serif">{kicker}</text>
    <text x="76" y="145" fill="#FFFFFF" font-size="36" font-weight="800" font-family="Arial, sans-serif">{title}</text>
    <text x="76" y="184" fill="#E3EEFC" font-size="19" font-family="Arial, sans-serif">{subtitle}</text>
    <rect x="76" y="210" width="126" height="7" rx="3.5" fill="url(#accent)"/>
    <rect x="640" y="66" width="98" height="42" rx="21" fill="#FFFFFF" fill-opacity=".12" stroke="#FFFFFF" stroke-opacity=".35"/>
    <text x="689" y="93" text-anchor="middle" fill="#FFFFFF" font-size="17" font-weight="700" font-family="Arial, sans-serif">F4 • {page_no}/3</text>
    <text x="58" y="1200" fill="{MUTED}" font-size="13" font-family="Arial, sans-serif">MPI TRIGONOMETRI • LITERASI NUMERASI KELAS X</text>
    <text x="758" y="1200" text-anchor="end" fill="{MUTED}" font-size="13" font-family="Arial, sans-serif">IDA YUNIAR TRYASTUTI, S.Pd.</text>
    '''

def txt(x,y,s,size=18,fill=INK,weight='400',anchor='start'):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" font-weight="{weight}" text-anchor="{anchor}" font-family="Arial, sans-serif">{s}</text>'

def lines(x,y,arr,size=17,fill=INK,lh=25,weight='400'):
    t=f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" font-weight="{weight}" font-family="Arial, sans-serif">'
    for i,s in enumerate(arr): t += f'<tspan x="{x}" dy="{0 if i==0 else lh}">{s}</tspan>'
    return t+'</text>'

def card(x,y,w,h,fill=PALE,stroke=LINE,r=15):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>'

def response_lines(x,y,width,count=2,gap=31):
    s=''
    for i in range(count):
        yy=y+i*gap
        s+=f'<line x1="{x}" y1="{yy}" x2="{x+width}" y2="{yy}" stroke="{LINE}" stroke-width="1.5" stroke-dasharray="4 4"/>'
    return s

def identity_block():
    s=card(58,277,700,76,'#F8FAFD',LINE,12)
    s+=txt(78,307,'NAMA:',15,MUTED,'700')+ '<line x1="139" y1="310" x2="400" y2="310" stroke="#9AAAC0" stroke-width="1.4"/>'
    s+=txt(425,307,'KELAS:',15,MUTED,'700')+ '<line x1="490" y1="310" x2="565" y2="310" stroke="#9AAAC0" stroke-width="1.4"/>'
    s+=txt(590,307,'TANGGAL:',15,MUTED,'700')+ '<line x1="670" y1="310" x2="735" y2="310" stroke="#9AAAC0" stroke-width="1.4"/>'
    s+=txt(78,337,'Tuliskan jawaban ringkas di sini; rincian perhitungan dapat dilanjutkan di buku.',14,MUTED)
    return s

def label_bar(x,y,w,label,color=BLUE):
    return f'<rect x="{x}" y="{y}" width="{w}" height="34" rx="9" fill="{color}"/><text x="{x+14}" y="{y+23}" font-size="16" font-weight="700" fill="#FFFFFF" font-family="Arial, sans-serif">{label}</text>'

# PAGE 1: flag pole
s=base_svg('STUDI KASUS 01 • SUDUT ELEVASI','Seberapa tinggi tiang bendera?','Gunakan sudut elevasi dan jarak untuk memperkirakan tinggi objek.',1)
s+=identity_block()
s+=card(58,375,700,147,'#F8FBFF',LINE,15)
s+=label_bar(76,392,165,'SITUASI',BLUE)
s+=lines(78,451,[
 'Tim numerasi mengukur tinggi tiang bendera sekolah tanpa memanjatnya.',
 'Pengamat berdiri pada jarak mendatar 12 m dari kaki tiang. Sudut elevasi',
 'dari tinggi mata pengamat ke puncak tiang adalah 38°. Tinggi mata 1,5 m.'
],17,INK,26)
# diagram panel
s+=card(58,540,700,264,'#F6FAFE',LINE,15)
s+=label_bar(76,557,200,'MODEL PENGUKURAN',CYAN)
# ground and pole
s+='<line x1="105" y1="755" x2="690" y2="755" stroke="#64748B" stroke-width="3"/>'
s+='<rect x="594" y="600" width="22" height="155" rx="4" fill="#2563EB"/>'
s+='<path d="M605 600 L605 575 L625 586 L605 597" fill="#F2B84B" stroke="#C98B14" stroke-width="1.5"/>'
s+='<circle cx="605" cy="575" r="4" fill="#F2B84B"/>'
# eye and sightline
s+='<circle cx="154" cy="710" r="10" fill="#0EA5A4"/>'
s+='<path d="M154 720 L154 751 M154 729 L139 742 M154 729 L169 742" stroke="#0EA5A4" stroke-width="6" stroke-linecap="round"/>'
s+='<line x1="164" y1="710" x2="605" y2="600" stroke="#F59E0B" stroke-width="3" stroke-dasharray="9 7"/>'
s+='<line x1="164" y1="755" x2="605" y2="755" stroke="#64748B" stroke-width="2"/>'
s+='<line x1="164" y1="710" x2="164" y2="755" stroke="#0EA5A4" stroke-width="2" stroke-dasharray="4 4"/>'
s+='<path d="M205 710 A42 42 0 0 0 204 700" fill="none" stroke="#F59E0B" stroke-width="2.5"/>'
s+=txt(224,695,'38°',18,'#B45309','700')+txt(382,778,'12 m (jarak mendatar)',16,MUTED,'700','middle')
s+=txt(628,640,'Puncak',15,BLUE,'700')+txt(628,661,'tiang',15,BLUE,'700')
s+=txt(117,684,'Mata',14,CYAN,'700')+txt(117,702,'1,5 m',14,CYAN,'700')
s+=txt(606,788,'Kaki tiang',14,MUTED,'700','middle')
# table block
s+=card(58,822,700,156,'#FFFFFF',LINE,15)
s+=label_bar(76,839,210,'DATA PENGAMATAN',BLUE)
# table
x0,y0=78,883
col=[0,180,390,650]
for xx in [x0,x0+180,x0+390,x0+650]: s+=f'<line x1="{xx}" y1="{y0}" x2="{xx}" y2="{y0+57}" stroke="{LINE}" stroke-width="1.4"/>'
s+=f'<line x1="{x0}" y1="{y0}" x2="{x0+650}" y2="{y0}" stroke="{LINE}" stroke-width="1.4"/><line x1="{x0}" y1="{y0+28}" x2="{x0+650}" y2="{y0+28}" stroke="{LINE}" stroke-width="1.4"/><line x1="{x0}" y1="{y0+57}" x2="{x0+650}" y2="{y0+57}" stroke="{LINE}" stroke-width="1.4"/>'
s+=txt(90,903,'Titik',14,MUTED,'700')+txt(270,903,'Jarak',14,MUTED,'700')+txt(480,903,'Sudut elevasi',14,MUTED,'700')
s+=txt(90,930,'A',16,INK,'700')+txt(270,930,'12 m',16,INK)+txt(480,930,'38°',16,INK)
s+=txt(90,959,'B',16,INK,'700')+txt(270,959,'10 m',16,INK)+txt(480,959,'43°',16,INK)
# questions
s+=label_bar(58,982,700,'TANTANGAN NUMERASI • TULISKAN LANGKAH PERHITUNGAN',NAVY)
qs=[
 ('1','Pilih rasio untuk menghubungkan tinggi relatif, jarak 12 m, dan sudut 38°.'),
 ('2','Hitung selisih tinggi puncak tiang terhadap mata pengamat. Bulatkan ke 0,1 m.'),
 ('3','Hitung tinggi tiang dengan menambahkan tinggi mata pengamat, yaitu 1,5 m.'),
 ('4','Titik B: 10 m dan 43°. Apakah hasilnya mendukung pengukuran A? Jelaskan.'),
]
y=1030
for n,q in qs:
    s+=f'<circle cx="76" cy="{y-5}" r="14" fill="#E8F0FF"/><text x="76" y="{y}" text-anchor="middle" font-size="15" font-weight="700" fill="{BLUE}" font-family="Arial, sans-serif">{n}</text>'
    s+=txt(102,y,q,13,INK,'500')
    s+=response_lines(102,y+23,626,1,27)
    y+=44 if n!='4' else 0
s+= '</svg>'
(OUT/'kasus-01-tiang-bendera.svg').write_text(s,encoding='utf-8')
cairosvg.svg2png(bytestring=s.encode(),write_to=str(OUT/'kasus-01-tiang-bendera.png'),output_width=2551,output_height=3898)

# PAGE 2: ramp
s=base_svg('STUDI KASUS 02 • KEMIRINGAN','Rancangan jalur menuju perpustakaan','Gunakan tangen, sudut, dan panjang sisi untuk membandingkan rancangan.',2)
s+=identity_block()
s+=card(58,375,700,145,'#F8FBFF',LINE,15)
s+=label_bar(76,392,165,'SITUASI',BLUE)
s+=lines(78,451,[
 'Sekolah merancang jalur miring untuk menghubungkan halaman dengan teras',
 'perpustakaan. Ketinggian teras 0,72 m di atas halaman. Tim membuat dua',
 'pilihan panjang mendatar: Rancangan A = 6 m dan Rancangan B = 8 m.'
],17,INK,26)
# diagram comparison
s+=card(58,538,700,276,'#F6FAFE',LINE,15)
s+=label_bar(76,555,220,'DUA RANCANGAN JALUR',CYAN)
# A triangle
s+='<path d="M112 748 L355 748 L355 675 Z" fill="#DBEAFE" stroke="#2563EB" stroke-width="3"/>'
s+='<line x1="112" y1="748" x2="355" y2="675" stroke="#2563EB" stroke-width="5" stroke-linecap="round"/>'
s+='<line x1="355" y1="748" x2="355" y2="675" stroke="#2563EB" stroke-width="3"/>'
s+='<line x1="112" y1="748" x2="355" y2="748" stroke="#64748B" stroke-width="2.5"/>'
s+=txt(225,776,'A • 6 m',16,BLUE,'700','middle')+txt(367,711,'0,72 m',14,BLUE,'700')
s+=txt(228,644,'A',20,BLUE,'800','middle')
# B triangle
s+='<path d="M432 748 L704 748 L704 675 Z" fill="#CCFBF1" stroke="#0F9D91" stroke-width="3"/>'
s+='<line x1="432" y1="748" x2="704" y2="675" stroke="#0F9D91" stroke-width="5" stroke-linecap="round"/>'
s+='<line x1="704" y1="748" x2="704" y2="675" stroke="#0F9D91" stroke-width="3"/>'
s+='<line x1="432" y1="748" x2="704" y2="748" stroke="#64748B" stroke-width="2.5"/>'
s+=txt(568,776,'B • 8 m',16,CYAN,'700','middle')+txt(715,711,'0,72 m',14,CYAN,'700')
s+=txt(568,644,'B',20,CYAN,'800','middle')
s+=txt(407,800,'Sketsa tidak dibuat berdasarkan skala.',13,MUTED,'400','middle')
# table
s+=card(58,832,700,146,'#FFFFFF',LINE,15)
s+=label_bar(76,848,205,'DATA RANCANGAN',BLUE)
# table columns
x0,y0=78,891
widths=[0,185,365,650]
for xx in widths: s+=f'<line x1="{x0+xx}" y1="{y0}" x2="{x0+xx}" y2="{y0+76}" stroke="{LINE}" stroke-width="1.4"/>'
for yy in [y0,y0+25,y0+50,y0+76]: s+=f'<line x1="{x0}" y1="{yy}" x2="{x0+650}" y2="{yy}" stroke="{LINE}" stroke-width="1.4"/>'
s+=txt(90,909,'Pilihan',13,MUTED,'700')+txt(273,909,'Naik vertikal',13,MUTED,'700')+txt(450,909,'Jarak mendatar',13,MUTED,'700')
s+=txt(90,934,'A',15,BLUE,'700')+txt(273,934,'0,72 m',15,INK)+txt(450,934,'6 m',15,INK)
s+=txt(90,960,'B',15,CYAN,'700')+txt(273,960,'0,72 m',15,INK)+txt(450,960,'8 m',15,INK)
# questions
s+=label_bar(58,982,700,'TANTANGAN NUMERASI • GUNAKAN DATA UNTUK MEMUTUSKAN',NAVY)
qs=[
 ('1','Hitung persentase kemiringan A: (naik ÷ mendatar) × 100%.'),
 ('2','Pilihan mana lebih landai? Bandingkan kenaikan dengan jarak mendatar.'),
 ('3','Hitung panjang permukaan jalur A menggunakan Teorema Pythagoras.'),
 ('4','Batas jarak mendatar 7 m. Pilihan mana yang muat? Jelaskan komprominya.'),
]
y=1030
for n,q in qs:
    s+=f'<circle cx="76" cy="{y-5}" r="14" fill="#E8F0FF"/><text x="76" y="{y}" text-anchor="middle" font-size="15" font-weight="700" fill="{BLUE}" font-family="Arial, sans-serif">{n}</text>'
    s+=txt(102,y,q,13,INK,'500')
    s+=response_lines(102,y+23,626,1,27)
    y+=44
s+='</svg>'
(OUT/'kasus-02-jalur-miring.svg').write_text(s,encoding='utf-8')
cairosvg.svg2png(bytestring=s.encode(),write_to=str(OUT/'kasus-02-jalur-miring.png'),output_width=2551,output_height=3898)

# PAGE 3: guy wire
s=base_svg('STUDI KASUS 03 • SINUS &amp; KOSINUS','Menguatkan tiang jaringan sekolah','Gunakan panjang kabel dan sudut terhadap tanah untuk menentukan kebutuhan.',3)
s+=identity_block()
s+=card(58,375,700,145,'#F8FBFF',LINE,15)
s+=label_bar(76,392,165,'SITUASI',BLUE)
s+=lines(78,451,[
 'Teknisi memasang kabel penyangga dari puncak tiang jaringan menuju pasak',
 'di tanah. Panjang satu kabel 15 m dan sudut kabel terhadap permukaan tanah',
 'adalah 52°. Terdapat tiga kabel identik yang akan dipasang.'
],17,INK,26)
# diagram
s+=card(58,538,700,279,'#F6FAFE',LINE,15)
s+=label_bar(76,555,265,'MODEL KABEL PENYANGGA',CYAN)
s+='<line x1="130" y1="762" x2="690" y2="762" stroke="#64748B" stroke-width="3"/>'
s+='<rect x="563" y="602" width="18" height="160" rx="4" fill="#2563EB"/>'
s+='<line x1="145" y1="762" x2="572" y2="602" stroke="#F59E0B" stroke-width="5" stroke-linecap="round"/>'
s+='<circle cx="145" cy="762" r="7" fill="#F59E0B"/><circle cx="572" cy="602" r="6" fill="#2563EB"/>'
s+='<path d="M195 762 A50 50 0 0 0 192 744" fill="none" stroke="#0EA5A4" stroke-width="3"/>'
s+=txt(219,746,'52°',18,CYAN,'700')
s+=txt(347,654,'Kabel 15 m',17,'#B45309','700','middle')
s+=txt(594,641,'Titik ikat',14,BLUE,'700')+txt(594,661,'pada tiang',14,BLUE,'700')
s+=txt(357,790,'Jarak pasak dari kaki tiang',15,MUTED,'700','middle')
s+=txt(569,785,'Tiang',14,BLUE,'700','middle')
s+=txt(145,785,'Pasak',14,CYAN,'700','middle')
# data card
s+=card(58,834,700,128,'#FFFFFF',LINE,15)
s+=label_bar(76,850,160,'DATA PEKERJAAN',BLUE)
s+=card(78,893,196,52,'#F3F7FC',LINE,10)+card(291,893,196,52,'#F3F7FC',LINE,10)+card(504,893,230,52,'#F3F7FC',LINE,10)
s+=txt(176,914,'Panjang kabel',13,MUTED,'700','middle')+txt(176,936,'15 m',19,NAVY,'800','middle')
s+=txt(389,914,'Sudut terhadap tanah',13,MUTED,'700','middle')+txt(389,936,'52°',19,NAVY,'800','middle')
s+=txt(619,914,'Jumlah kabel',13,MUTED,'700','middle')+txt(619,936,'3 buah',19,NAVY,'800','middle')
# questions
s+=label_bar(58,982,700,'TANTANGAN NUMERASI • HITUNG, TAFSIRKAN, DAN RENCANAKAN',NAVY)
qs=[
 ('1','Pilih rasio untuk menentukan tinggi titik ikat dari kabel 15 m dan sudut 52°.'),
 ('2','Hitung tinggi titik ikat dari tanah. Bulatkan ke 0,01 m.'),
 ('3','Hitung jarak mendatar dari kaki tiang ke pasak. Bulatkan ke 0,01 m.'),
 ('4','Tiga kabel dipasang dengan cadangan 8%. Berapa total kabel minimal yang disiapkan?'),
]
y=1030
for n,q in qs:
    s+=f'<circle cx="76" cy="{y-5}" r="14" fill="#E8F0FF"/><text x="76" y="{y}" text-anchor="middle" font-size="15" font-weight="700" fill="{BLUE}" font-family="Arial, sans-serif">{n}</text>'
    s+=txt(102,y,q,13,INK,'500')
    s+=response_lines(102,y+23,626,1,27)
    y+=44
s+='</svg>'
(OUT/'kasus-03-kabel-penyangga.svg').write_text(s,encoding='utf-8')
cairosvg.svg2png(bytestring=s.encode(),write_to=str(OUT/'kasus-03-kabel-penyangga.png'),output_width=2551,output_height=3898)

print('Generated F4 worksheet images:')
for p in sorted(OUT.glob('*.png')):
    with Image.open(p) as image:
        image.save(p, format='PNG', dpi=(300, 300), optimize=True)
    print(p.name, p.stat().st_size)
