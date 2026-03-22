// ═══════════════════════════════════════════════════
// ① CORE DATA
// ═══════════════════════════════════════════════════

// GPX-Track (374 Punkte, direkt aus GPX-Datei)
const TRACK = [[49.10957,10.75452],[49.10424,10.73844],[49.09868,10.73313],[49.09434,10.73338],[49.0842,10.73765],[49.08053,10.73328],[49.07198,10.73457],[49.06915,10.72872],[49.06554,10.7287],[49.05915,10.71755],[49.05353,10.72577],[49.04792,10.71908],[49.04713,10.71731],[49.04657,10.71273],[49.04373,10.71586],[49.04405,10.71883],[49.04501,10.72461],[49.04252,10.7334],[49.04187,10.7381],[49.03859,10.74341],[49.03714,10.74805],[49.03509,10.75292],[49.036,10.75983],[49.03678,10.76565],[49.03409,10.77099],[49.02533,10.7665],[49.02486,10.7693],[49.02436,10.77118],[49.02347,10.77588],[49.02271,10.78164],[49.0215,10.77658],[49.01884,10.78266],[49.01583,10.78106],[49.01413,10.78568],[49.01288,10.79075],[49.0103,10.78881],[49.00956,10.78577],[49.0063,10.78649],[49.0036,10.79481],[49.00004,10.80277],[49.0001,10.80707],[48.99361,10.81302],[48.99167,10.80717],[48.99012,10.81206],[48.98681,10.81427],[48.9838,10.81496],[48.98159,10.81557],[48.97727,10.81982],[48.97655,10.81679],[48.97318,10.81287],[48.9698,10.81111],[48.9679,10.81031],[48.96414,10.81559],[48.96059,10.82304],[48.95867,10.82518],[48.95559,10.82965],[48.9562,10.83284],[48.95863,10.84745],[48.95743,10.85803],[48.95089,10.86912],[48.9469,10.87022],[48.94758,10.8764],[48.94922,10.88751],[48.95051,10.89124],[48.95467,10.89588],[48.95579,10.90037],[48.95487,10.9079],[48.9538,10.91146],[48.9528,10.91547],[48.95053,10.91841],[48.94985,10.92428],[48.94736,10.92288],[48.94841,10.927],[48.94419,10.93282],[48.94542,10.93622],[48.94573,10.94086],[48.94437,10.93951],[48.94165,10.93978],[48.94103,10.95006],[48.9395,10.95767],[48.94019,10.96149],[48.93969,10.96726],[48.93749,10.97299],[48.93488,10.97452],[48.92912,10.97492],[48.92741,10.97519],[48.92844,10.98203],[48.92508,10.99028],[48.92238,10.98917],[48.92141,10.98803],[48.91571,10.98673],[48.91524,10.99146],[48.9091,10.99526],[48.9061,10.99972],[48.90293,10.99674],[48.89882,10.99417],[48.89588,10.99603],[48.89562,11.00184],[48.89527,11.00485],[48.8957,11.01322],[48.89166,11.01864],[48.88952,11.0197],[48.88774,11.01818],[48.88661,11.0125],[48.88627,11.00855],[48.88468,11.00347],[48.8834,11.00486],[48.88096,11.00731],[48.87422,11.00903],[48.87157,11.0048],[48.87053,11.00403],[48.86973,11.00684],[48.86881,11.0059],[48.86756,11.00645],[48.86637,11.00937],[48.86438,11.01057],[48.86293,11.01054],[48.86411,11.01461],[48.86588,11.02379],[48.87008,11.02433],[48.87257,11.0248],[48.87573,11.02694],[48.874,11.03162],[48.87286,11.035],[48.87518,11.03782],[48.88305,11.03898],[48.88925,11.04544],[48.88825,11.05176],[48.88669,11.05176],[48.88492,11.05262],[48.88126,11.06017],[48.87931,11.06368],[48.87689,11.07054],[48.87676,11.07346],[48.87912,11.07971],[48.87552,11.08391],[48.86938,11.09456],[48.8736,11.09844],[48.87862,11.09714],[48.88162,11.0978],[48.88798,11.09842],[48.89133,11.10026],[48.89553,11.10518],[48.89712,11.1137],[48.89732,11.12375],[48.89462,11.13395],[48.89551,11.13841],[48.8965,11.14266],[48.89738,11.1496],[48.89698,11.15642],[48.89852,11.16088],[48.89979,11.15993],[48.9005,11.16025],[48.9036,11.16357],[48.90464,11.16947],[48.90423,11.17503],[48.90396,11.17624],[48.90092,11.18194],[48.89909,11.18446],[48.89746,11.18403],[48.89618,11.18496],[48.8947,11.18622],[48.89415,11.18669],[48.89249,11.18875],[48.89207,11.19673],[48.89271,11.20206],[48.89582,11.20919],[48.89434,11.21683],[48.89102,11.22616],[48.8877,11.23338],[48.88675,11.23586],[48.8871,11.24517],[48.88959,11.25097],[48.89161,11.25671],[48.89328,11.25879],[48.89591,11.25331],[48.90276,11.26373],[48.90678,11.26772],[48.91066,11.26845],[48.91271,11.27109],[48.91111,11.27665],[48.91138,11.28157],[48.91278,11.28633],[48.91554,11.29035],[48.91775,11.29241],[48.92026,11.29579],[48.92461,11.29852],[48.92699,11.30061],[48.92966,11.30056],[48.9335,11.30247],[48.93618,11.30591],[48.93738,11.30769],[48.93754,11.31463],[48.94139,11.31817],[48.94173,11.32063],[48.93922,11.32706],[48.9366,11.33325],[48.94048,11.33576],[48.93735,11.33747],[48.93407,11.33893],[48.93198,11.3392],[48.92805,11.34482],[48.9298,11.3457],[48.93189,11.34755],[48.92988,11.34998],[48.92819,11.35687],[48.92667,11.3627],[48.92648,11.36807],[48.92822,11.37183],[48.92825,11.37713],[48.93138,11.37837],[48.93426,11.37948],[48.93519,11.37741],[48.93732,11.37298],[48.9376,11.36984],[48.93857,11.3651],[48.94044,11.36621],[48.94219,11.36806],[48.94728,11.36604],[48.94986,11.37175],[48.95158,11.36779],[48.95095,11.37631],[48.951,11.37709],[48.95113,11.38057],[48.9527,11.38351],[48.95683,11.3919],[48.96049,11.39148],[48.96287,11.39062],[48.96638,11.38457],[48.96871,11.37901],[48.97405,11.36726],[48.98014,11.36694],[48.98537,11.36844],[48.99,11.36916],[48.99528,11.37404],[48.99786,11.3774],[49.0,11.38096],[48.9999,11.38555],[49.00025,11.38974],[48.99779,11.38859],[48.9918,11.39178],[48.99143,11.39742],[48.9894,11.40471],[48.98925,11.41158],[48.98864,11.41501],[48.98596,11.41696],[48.98598,11.42125],[48.98665,11.42623],[48.9873,11.43188],[48.98863,11.43425],[48.98981,11.4344],[48.99441,11.44553],[49.00316,11.45259],[49.00479,11.44755],[49.00553,11.44332],[49.00675,11.44186],[49.01334,11.44273],[49.01715,11.44482],[49.01914,11.44398],[49.02522,11.44365],[49.02843,11.44609],[49.03185,11.44843],[49.0362,11.45497],[49.03792,11.45464],[49.03966,11.4605],[49.04272,11.45947],[49.04335,11.461],[49.04501,11.46385],[49.04574,11.46575],[49.04209,11.4696],[49.0397,11.47333],[49.03867,11.4768],[49.03713,11.4783],[49.03677,11.48006],[49.03312,11.48303],[49.02988,11.49012],[49.02956,11.50783],[49.02786,11.51871],[49.02474,11.53232],[49.02074,11.54002],[49.02104,11.54597],[49.01861,11.54716],[49.02098,11.55736],[49.02435,11.55824],[49.02106,11.56253],[49.02201,11.56634],[49.02142,11.56989],[49.02527,11.57765],[49.02252,11.58071],[49.01924,11.58435],[49.01763,11.58868],[49.01549,11.59444],[49.01291,11.60018],[49.01322,11.60344],[49.01196,11.61101],[49.00859,11.6189],[49.00301,11.62517],[49.00055,11.62386],[48.99328,11.62364],[48.99182,11.61957],[48.98885,11.62006],[48.98708,11.62371],[48.98457,11.61741],[48.98335,11.61063],[48.98129,11.60987],[48.98117,11.61759],[48.98484,11.62396],[48.98289,11.62893],[48.97719,11.63905],[48.97575,11.63975],[48.97218,11.64398],[48.97149,11.64879],[48.97136,11.65412],[48.9698,11.65792],[48.97227,11.66407],[48.97612,11.6636],[48.98158,11.6698],[48.98866,11.67768],[48.99119,11.67465],[48.99286,11.6769],[48.99442,11.6806],[48.99426,11.6892],[48.99138,11.69503],[48.99017,11.69975],[48.98803,11.69903],[48.98192,11.70072],[48.97649,11.69897],[48.97376,11.69505],[48.97269,11.69615],[48.9709,11.69576],[48.97022,11.69175],[48.96811,11.68896],[48.96477,11.6867],[48.96077,11.68519],[48.95809,11.68763],[48.955,11.70329],[48.95211,11.71879],[48.94985,11.72735],[48.94851,11.73264],[48.94762,11.73301],[48.94637,11.73617],[48.94641,11.73749],[48.94573,11.74058],[48.94889,11.74023],[48.95072,11.74047],[48.95086,11.74411],[48.9475,11.7479],[48.94707,11.75402],[48.94492,11.76071],[48.94188,11.76723],[48.94195,11.76952],[48.94139,11.77562],[48.93965,11.78255],[48.93707,11.78283],[48.93362,11.78567],[48.92777,11.79283],[48.92439,11.79652],[48.92227,11.80265],[48.92507,11.81369],[48.92454,11.8196],[48.92301,11.82372],[48.91908,11.82535],[48.9171,11.82909],[48.91175,11.82487],[48.90852,11.82424],[48.90508,11.82487],[48.90036,11.82418],[48.90071,11.83116],[48.90366,11.83696],[48.90519,11.84103],[48.9056,11.84785],[48.91295,11.8522],[48.91647,11.85748],[48.91854,11.87221]];

// Höhenprofil (151 Punkte, aus GPX)
const ELEV = [[0,408],[2.28,417],[4.54,446],[6.92,461],[9.51,481],[10.87,545],[11.97,596],[13.41,618],[14.52,610],[15.79,605],[17.65,516],[18.46,588],[19.75,596],[20.86,527],[22.08,505],[23.16,605],[24.65,619],[26.4,618],[27.48,574],[28.7,495],[29.89,613],[31.25,617],[32.51,582],[34.46,515],[36.67,494],[38.13,483],[39.67,430],[40.93,409],[41.87,457],[43.16,404],[44.55,481],[45.64,496],[47.09,477],[48.2,416],[49.52,449],[51.06,458],[52.19,463],[53.58,477],[54.77,442],[55.85,454],[57.32,416],[58.11,401],[59.39,517],[60.47,545],[61.55,415],[62.14,454],[63.13,509],[64.1,468],[65.61,405],[66.62,432],[68.35,440],[69.98,474],[71.35,422],[72.71,398],[74.1,432],[76.22,455],[77.43,440],[78.66,419],[80.75,440],[82.21,526],[83.47,404],[84.03,466],[85.26,516],[86.32,506],[86.88,444],[87.48,409],[88.68,498],[90.51,491],[91.92,433],[93.44,424],[94.63,518],[96.63,468],[97.8,444],[98.89,463],[99.88,501],[101.01,482],[102.27,386],[104.06,378],[105.03,389],[106.24,478],[107.36,418],[108.5,413],[109.64,454],[110.79,396],[111.77,406],[112.64,491],[113.45,444],[114.32,380],[115.75,489],[116.63,465],[118.12,482],[119.17,464],[121.31,510],[122.88,459],[124.27,373],[125.33,375],[126.57,497],[127.96,550],[128.88,505],[129.96,516],[130.9,384],[133.15,372],[134.05,393],[135.4,382],[136.78,512],[138.06,494],[139.34,462],[140.09,369],[141.14,371],[141.84,385],[143.15,490],[145.57,500],[147.64,504],[149.28,430],[150.64,361],[151.83,411],[152.97,408],[154.29,365],[155.82,353],[157.61,403],[159.14,480],[160.64,480],[161.98,385],[163.55,377],[165.18,473],[166.11,476],[167.48,357],[169.48,355],[170.35,391],[171.8,530],[173.03,522],[174.28,493],[175.15,502],[176.23,350],[178.16,389],[180.27,481],[180.93,426],[181.74,363],[182.89,483],[184.3,456],[185.65,365],[186.83,348],[188.71,367],[190.18,370],[191.43,390],[192.5,473],[193.91,431],[195.39,443],[196.66,354],[198.88,339],[199.46,349]];

// Schwierigkeitsgrade
const DIFF = {
  leicht:      {col:'#27ae60', label:'🟢 Leicht',      desc:'Wenig Höhenmeter, kurze Distanz'},
  mittel:      {col:'#e67e22', label:'🟡 Mittel',      desc:'Moderate Steigungen & Distanz'},
  schwer:      {col:'#e74c3c', label:'🔴 Schwer',      desc:'Viele Höhenmeter (>600 m↑)'},
  anspruchsvoll:{col:'#8e44ad',label:'🟣 Anspruchsvoll',desc:'Längste Etappe + viele Höhenmeter'},
  genuss:      {col:'#c97d2a', label:'✨ Genusstag',   desc:'Kein Wandern – Erholen & Genießen'}
};

function getDiff(s) {
  if (s.type === 'rest') return 'genuss';
  // Kombinierter Score: Distanz + Höhenmeter (Höhe gewichtet 1.5×)
  const kmPts   = s.km < 10 ? 0 : s.km < 13 ? 1 : s.km < 16 ? 2 : 3;
  const elevPts = s.ascent < 300 ? 0 : s.ascent < 450 ? 1 : s.ascent < 600 ? 2 : s.ascent < 720 ? 3 : 4;
  const score   = kmPts + elevPts * 1.5;
  if (score >= 6.0) return 'anspruchsvoll'; // z.B. 15km + 619m↑ = 2+4.5
  if (score >= 4.0) return 'schwer';        // z.B. 15km + 509m↑ = 2+3
  if (score >= 2.0) return 'mittel';        // z.B. 11km + 295m↑ = 1+0 → leicht
  return 'leicht';
}

// GPX-Strecke in Etappen-Segmente aufteilen (einmalig beim Laden)
const STAGE_SEGS = (function(){
  // Kumulative Distanz (km) für jeden TRACK-Punkt berechnen
  const cum = [0];
  for (let i = 1; i < TRACK.length; i++){
    const [la1,ln1] = TRACK[i-1], [la2,ln2] = TRACK[i];
    cum.push(cum[i-1] + Math.hypot((la2-la1)*111.32, (ln2-ln1)*111.32*Math.cos(la1*Math.PI/180)));
  }
  const scale = 199.46 / cum[cum.length-1];
  const kms = cum.map(d => d * scale);
  // Etappen-Grenzen in km (keine Ruhetage, da keine Distanz)
  const bounds = [
    {day:1, a:0,    b:11},  {day:2, a:11,   b:26},  {day:3, a:26,   b:41},
    {day:4, a:41,   b:56},  {day:5, a:56,   b:64},  {day:6, a:64,   b:77},
    {day:7, a:77,   b:91},  {day:9, a:91,   b:106}, {day:10,a:106,  b:121},
    {day:11,a:121,  b:136}, {day:13,a:136,  b:151}, {day:14,a:151,  b:169},
    {day:15,a:169,  b:184}, {day:16,a:184,  b:199.46}
  ];
  return bounds.map(({day, a, b}) => ({
    day,
    pts: TRACK.filter((_,i) => kms[i] >= a - 0.4 && kms[i] <= b + 0.4)
  }));
})();

// Etappen-Daten
const STAGES = [
  {day:1,date:"Mo, 13.04.",from:"Gunzenhausen",to:"Spielberg",km:11,type:"normal",ascent:295,descent:172,lat:49.04695,lng:10.71304,
   highlights:[{ico:"🏛️",txt:"<b>Archäologisches Museum</b> Gunzenhausen"},{ico:"🌊",txt:"Blick auf den <b>Altmühlsee</b>"},{ico:"⛰️",txt:"Aufstieg <b>Hahnenkamm</b>"}],
   hotel:"Gasthof Gentner Spielberg",hotel_note:"ab 94 € · Slowfood-Küche"},
  {day:2,date:"Di, 14.04.",from:"Spielberg",to:"Auernheim",km:15,type:"normal",ascent:619,descent:541,lat:48.99195,lng:10.8074,
   highlights:[{ico:"👁️",txt:"Aussichtspunkt <b>Gelber Berg</b>"},{ico:"🪨",txt:"<b>Steinerne Rinne</b> – Bach fließt bergauf!"}],
   hotel:"Gasthof Zur Sonne Auernheim",hotel_note:"ab 70 € · Fränkische Küche"},
  {day:3,date:"Mi, 15.04.",from:"Auernheim",to:"Treuchtlingen",km:15,type:"therm",ascent:354,descent:566,lat:48.95312,lng:10.91493,
   highlights:[{ico:"♨️",txt:"<b>Altmühltherme</b> – Heilwasser aus 800 m Tiefe · ~29 €"},{ico:"🌄",txt:"Panoramablicke beim Abstieg"}],
   hotel:"Hotel Adler Treuchtlingen",hotel_note:"ab 108 € · Direkt am Bahnhof"},
  {day:4,date:"Do, 16.04.",from:"Treuchtlingen",to:"Pappenheim",km:15,type:"normal",ascent:509,descent:487,lat:48.89527,lng:11.00485,
   highlights:[{ico:"🏰",txt:"<b>Burg Pappenheim</b> – Ruine mit Museum & Kräutergarten"},{ico:"🏘️",txt:"Historische Altstadt Pappenheim"}],
   hotel:"Hotel-Gasthof Zur Sonne Pappenheim",hotel_note:"ab 90 € · Top Küche, Wellness"},
  {day:5,date:"Fr, 17.04.",from:"Pappenheim",to:"Solnhofen",km:8,type:"dino",ascent:397,descent:366,lat:48.86448,lng:11.01509,
   highlights:[{ico:"🦕",txt:"<b>Museum Solnhofen</b> – 3 Archaeopteryx-Originale · ~6 €"},{ico:"🔨",txt:"<b>Hobbysteinbruch</b> – selbst klopfen · ~9 € Kombi"}],
   hotel:"Gasthof Zum Verkauften Großvater ⭐",hotel_note:"ab 65 € · Legendäres Frühstück!"},
  {day:6,date:"Sa, 18.04.",from:"Solnhofen",to:"Dollnstein",km:13,type:"normal",ascent:507,descent:547,lat:48.885,lng:11.09827,
   highlights:[{ico:"🗿",txt:"<b>Zwölf Apostel</b> – spektakuläre Kalksteinfelsen"},{ico:"🌿",txt:"Wacholderheiden – schönste Etappe!"}],
   hotel:"Gasthof Zur Post Dollnstein",hotel_note:"ab 70 € · zentral"},
  {day:7,date:"So, 19.04.",from:"Dollnstein",to:"Eichstätt",km:14,type:"normal",ascent:755,descent:677,lat:48.89034,lng:11.22861,
   highlights:[{ico:"🪨",txt:"<b>Burgsteinfelsen</b> mit Panoramablick"},{ico:"🏛️",txt:"Ankunft in <b>Eichstätt</b> – Barock-Bischofsstadt"}],
   hotel:"Hotel Café Fuchs Eichstätt",hotel_note:"ab 66 € · 2 Nächte (19+20.04.)"},
  {day:8,date:"Mo, 20.04.",from:"Eichstätt",to:"Eichstätt",km:0,type:"rest",ascent:0,descent:0,lat:48.89034,lng:11.22861,
   highlights:[{ico:"🦕",txt:"<b>Jura-Museum Willibaldsburg</b> · ~6 €"},{ico:"🎨",txt:"<b>Museum Konkrete Kunst</b> + Skulpturengarten"},{ico:"👩‍👩‍👧",txt:"<b>Franziska besuchen</b> &amp; gemeinsam essen"}],
   hotel:"Hotel Café Fuchs Eichstätt",hotel_note:"ab 66 € · 2. Nacht"},
  {day:9,date:"Di, 21.04.",from:"Eichstätt",to:"Walting/Pfünz",km:15,type:"normal",ascent:606,descent:624,lat:48.94015,lng:11.33512,
   highlights:[{ico:"🦣",txt:"<b>Mammuthöhle Buchenhüll</b>"},{ico:"🏛️",txt:"Opt.: <b>Römerkastell Vetoniana</b> (+1,5 km)"}],
   hotel:"Gasthof Pfünzer Hof",hotel_note:"ab 70 € · bayerische Küche"},
  {day:10,date:"Mi, 22.04.",from:"Walting",to:"Kipfenberg",km:15,type:"normal",ascent:752,descent:712,lat:48.97405,lng:11.36726,
   highlights:[{ico:"🦇",txt:"<b>Arndthöhle</b> – Tropfsteinhöhle direkt am Weg"},{ico:"🏰",txt:"<b>Römer- & Bajuwarenmuseum</b> Burg Kipfenberg"},{ico:"📍",txt:"Geografische <b>Mitte Bayerns</b>!"}],
   hotel:"Gasthof Zum Blauen Hecht ⭐",hotel_note:"ab 80 € · Familienbetrieb"},
  {day:11,date:"Do, 23.04.",from:"Kipfenberg",to:"Beilngries",km:15,type:"normal",ascent:497,descent:549,lat:49.02329,lng:11.44496,
   highlights:[{ico:"🚗",txt:"<b>Technikmuseum Kratzmühle</b> – Oldtimer"},{ico:"🏰",txt:"Ankunft <b>Beilngries</b> – Mittelalterliche Altstadt"},{ico:"🛁",txt:"Check-in <b>Hotel Die Gams</b> – Spa!"}],
   hotel:"Hotel Die Gams ⭐⭐",hotel_note:"ab 116 € · 2 Nächte · Spa inklusive!"},
  {day:12,date:"Fr, 24.04.",from:"Beilngries",to:"Beilngries",km:0,type:"rest",ascent:0,descent:0,lat:49.02329,lng:11.44496,
   highlights:[{ico:"♨️",txt:"<b>Spa House Die Gams</b> – Pool, Sauna, Dampfbad (inkl.!)"},{ico:"🏰",txt:"<b>Altstadt Beilngries</b> – Stadtmauer & Türme"},{ico:"🦕",txt:"Opt.: Dinosaurier Museum Denkendorf (Bus)"}],
   hotel:"Hotel Die Gams ⭐⭐",hotel_note:"ab 116 € · Spa-Tag"},
  {day:13,date:"Sa, 25.04.",from:"Beilngries",to:"Dietfurt",km:15,type:"normal",ascent:434,descent:522,lat:49.02159,lng:11.57021,
   highlights:[{ico:"⛵",txt:"Am <b>Main-Donau-Kanal</b>"},{ico:"🦶",txt:"<b>Barfußpark Dietfurt</b> für müde Füße!"}],
   hotel:"Gasthof Meier Griesstetten",hotel_note:"ab 78 € · Biergarten"},
  {day:14,date:"So, 26.04.",from:"Dietfurt",to:"Riedenburg",km:18,type:"long",ascent:741,descent:754,lat:48.98762,lng:11.67528,
   highlights:[{ico:"⚠️",txt:"<b>Längste Etappe</b> – früh starten!"},{ico:"🦅",txt:"<b>Rosenburg &amp; Falkenhof</b> – Greifvogel-Flugshow"},{ico:"💎",txt:"<b>Kristallmuseum</b> – größte Bergkristall-Gruppe"}],
   hotel:"Tachensteiner Hof Riedenburg",hotel_note:"ab 64 € · Frühstücksbuffet"},
  {day:15,date:"Mo, 27.04.",from:"Riedenburg",to:"Essing",km:15,type:"normal",ascent:768,descent:678,lat:48.94655,lng:11.75443,
   highlights:[{ico:"🏰",txt:"<b>Burg Prunn ⭐</b> – Nibelungenlied gefunden!"},{ico:"🦇",txt:"<b>Tropfsteinhöhle Schulerloch</b> – ~40 min"},{ico:"🌉",txt:"<b>Tatzlwurm-Holzbrücke</b> Essing"}],
   hotel:"Brauereigasthof Schneider ⭐",hotel_note:"ab 72 € · Privatbrauerei!"},
  {day:16,date:"Di, 28.04.",from:"Essing",to:"Kelheim",km:12,type:"finale",ascent:421,descent:496,lat:48.90512,lng:11.84066,
   highlights:[{ico:"🏔️",txt:"<b>Weltenburger Enge</b> – UNESCO-Kandidat"},{ico:"⛪",txt:"<b>Kloster Weltenburg</b> – älteste Klosterbrauerei"},{ico:"🚢",txt:"<b>Schifffahrt</b> Weltenburg → Kelheim"},{ico:"🎉",txt:"<b>Befreiungshalle</b> Kelheim – Finales Highlight!"}],
   hotel:"Pension Carlbauer Kelheim",hotel_note:"ab 56 € · zentral"}
];

// Sehenswürdigkeiten
const SIGHTS = [
  {cat:"dino",ico:"🦕",name:"Museum Solnhofen",stars:"⭐⭐⭐",day:5,price:"~6 €",open:"10–17 Uhr",desc:"3 originale Archaeopteryx-Skelette + Sciurumimus. Absolutes Highlight!",lat:48.8892,lng:11.0396},
  {cat:"dino",ico:"🔨",name:"Hobbysteinbruch Solnhofen",stars:"⭐⭐⭐",day:5,price:"~9 € Kombi",open:"10–17 Uhr",desc:"Selbst Fossilien klopfen! Werkzeug leihbar.",lat:48.888,lng:11.035},
  {cat:"dino",ico:"🦖",name:"Jura-Museum Willibaldsburg",stars:"⭐⭐⭐",day:8,price:"~6 €",open:"10–17 Uhr",desc:"Archaeopteryx-Original, Juravenator, Korallenriff-Aquarium auf der Burg.",lat:48.8893,lng:11.1804},
  {cat:"burg",ico:"🏰",name:"Burg Pappenheim",stars:"⭐⭐",day:4,price:"frei",open:"tägl.",desc:"Ruine mit Museum & Kräutergarten, Panoramablick.",lat:48.9268,lng:10.9700},
  {cat:"burg",ico:"🏰",name:"Burg Kipfenberg",stars:"⭐⭐",day:10,price:"inkl.",open:"tägl.",desc:"Römer- & Bajuwarenmuseum + Geografische Mitte Bayerns!",lat:48.9744,lng:11.3670},
  {cat:"burg",ico:"🏰",name:"Burg Prunn",stars:"⭐⭐⭐",day:15,price:"~4 €",open:"ab 9h",desc:"Nibelungenlied-Handschrift C hier gefunden! Postkarten-Burg auf Kalkfelsen.",lat:48.9490,lng:11.7413},
  {cat:"burg",ico:"🦅",name:"Rosenburg & Falkenhof",stars:"⭐⭐",day:14,price:"~8 €",open:"saisonal",desc:"Mittelalterliche Burg mit Greifvogel-Flugshow.",lat:48.9875,lng:11.6718},
  {cat:"therm",ico:"♨️",name:"Altmühltherme Treuchtlingen",stars:"⭐⭐⭐",day:3,price:"~29 €",open:"tägl.",desc:"Heilwasser aus 800 m Tiefe, Saunalandschaft – nur 700 m vom Bahnhof!",lat:48.9569,lng:10.9108},
  {cat:"therm",ico:"🛁",name:"Hotel Die Gams – Spa House",stars:"⭐⭐⭐",day:12,price:"inkl.",open:"tägl.",desc:"Indoor-Pool, Sauna, Dampfbad, Infrarot, Wasserbetten – alles inklusive.",lat:49.0334,lng:11.4758},
  {cat:"natur",ico:"🗿",name:"Zwölf Apostel",stars:"⭐⭐⭐",day:6,price:"frei",open:"immer",desc:"Spektakuläre Kalksteinfelsen – Highlight der schönsten Etappe!",lat:48.878,lng:11.050},
  {cat:"natur",ico:"⛰️",name:"Weltenburger Enge",stars:"⭐⭐⭐",day:16,price:"frei",open:"immer",desc:"Donaudurchbruch mit 70 m Felswänden – UNESCO-Welterbe-Kandidat.",lat:48.9048,lng:11.7887},
  {cat:"natur",ico:"🦇",name:"Tropfsteinhöhle Schulerloch",stars:"⭐⭐",day:15,price:"~6 €",open:"Führungen",desc:"Schauhöhle mit Tropfsteinformationen, Führungen ~40 Min.",lat:48.9557,lng:11.7212},
  {cat:"natur",ico:"🦇",name:"Arndthöhle Kipfenberg",stars:"⭐⭐",day:10,price:"frei",open:"immer",desc:"Tropfsteinhöhle direkt am Wanderweg.",lat:48.960,lng:11.370},
  {cat:"natur",ico:"🌊",name:"Steinerne Rinne Wolfsbronn",stars:"⭐⭐",day:2,price:"frei",open:"immer",desc:"Naturdenkmal – Bach fließt auf Kalktuffdamm bergaufwärts!",lat:49.010,lng:10.790},
  {cat:"natur",ico:"🦶",name:"Barfußpark Dietfurt",stars:"⭐",day:13,price:"frei",open:"immer",desc:"Sinneserlebnis für müde Wanderfüße.",lat:49.0758,lng:11.5856},
  {cat:"kultur",ico:"⛪",name:"Kloster Weltenburg",stars:"⭐⭐⭐",day:16,price:"frei",open:"tägl.",desc:"Älteste Klosterbrauerei der Welt (seit 1050!). Biergarten an der Donau.",lat:48.9048,lng:11.7887},
  {cat:"kultur",ico:"🏛️",name:"Befreiungshalle Kelheim",stars:"⭐⭐",day:16,price:"~4 €",open:"tägl.",desc:"Monumentalbau auf dem Michelsberg von Leo von Klenze.",lat:48.9121,lng:11.8698},
  {cat:"kultur",ico:"🌉",name:"Tatzlwurm-Holzbrücke Essing",stars:"⭐⭐",day:15,price:"frei",open:"immer",desc:"Zweitlängste Holzbrücke Europas.",lat:48.9462,lng:11.7582},
  {cat:"kultur",ico:"🎨",name:"Museum für Konkrete Kunst",stars:"⭐⭐",day:8,price:"~5 €",open:"Di–So",desc:"Mit Skulpturengarten in Eichstätt.",lat:48.8920,lng:11.1800},
  {cat:"kultur",ico:"💎",name:"Kristallmuseum Riedenburg",stars:"⭐",day:14,price:"~5 €",open:"tägl.",desc:"Größte Bergkristallgruppe der Welt.",lat:48.9870,lng:11.6750}
];

// Restaurants (Karten-Layer)
const RESTAURANTS = [
  {name:"Gasthof Verkaufter Großvater ⭐",day:5,lat:48.8892,lng:11.0393,desc:"Legendäres Frühstück · böhmisch-fränkische Küche · Dino-Deko"},
  {name:"Zum Mühlenwirt Solnhofen",day:5,lat:48.887,lng:11.037,desc:"Biergarten an der Altmühl · Google 4.7/5"},
  {name:"Hotel-Gasthof Zur Sonne Pappenheim",day:4,lat:48.926,lng:10.970,desc:"Gehobene fränkische Küche · Biergarten"},
  {name:"Braugasthof Trompeter Eichstätt",day:7,lat:48.892,lng:11.179,desc:"Hauseigenes Bier · deftige bayerische Küche"},
  {name:"Gasthof Zum Blauen Hecht",day:10,lat:48.974,lng:11.367,desc:"Familienbetrieb · bayerische Gastlichkeit · ab 17h"},
  {name:"Restaurant Hotel Die Gams",day:11,lat:49.033,lng:11.476,desc:"Regionale & int. Küche · Perlhuhn · Frühstücksbuffet"},
  {name:"Brauereigasthof Schneider ⭐",day:15,lat:48.946,lng:11.754,desc:"Privatbrauerei · zwischen Fels & Fluss · Hausbier!"},
  {name:"Klosterschenke Weltenburg ⭐⭐",day:16,lat:48.905,lng:11.789,desc:"Älteste Klosterbrauerei · Dunkles Bier im Biergarten"},
  {name:"Weisses Brauhaus Kelheim",day:16,lat:48.917,lng:11.873,desc:"Schneider Weisse Heimat · Biergarten"}
];

// Packliste
const PACK_DATA = [
  {cat:"👟 Kleidung & Schuhe",items:[
    {txt:"Wanderschuhe (gut eingelaufen!)",sub:"Mindestens 2 Wochen vorher einlaufen"},
    {txt:"Wandersocken (5–6 Paar)",sub:"Merino oder synthetisch, keine Baumwolle"},
    {txt:"Wanderhose (1–2)",sub:"Schnelltrocknend, Zip-Off praktisch"},
    {txt:"Funktions-T-Shirts (3–4)"},{txt:"Fleece-Pullover / Midlayer"},
    {txt:"Regenjacke",sub:"Wasserdicht & windabweisend – unverzichtbar!"},
    {txt:"Regenhose",sub:"April = Regen möglich"},
    {txt:"Wechsel-Outfit für Abend"},{txt:"Unterwäsche (4–5 Paar)"},
    {txt:"Mütze & Handschuhe",sub:"April-Morgen können kalt sein"},
    {txt:"Sonnenhut / Schirmmütze"},{txt:"Badebekleidung",sub:"Für Therme & Spa Die Gams"}
  ]},
  {cat:"🎒 Ausrüstung",items:[
    {txt:"Rucksack (25–35 L)",sub:"Hüftgurt wichtig!"},{txt:"Rucksack-Regenhülle"},
    {txt:"Wanderstöcke",sub:"Schonen Knie bei Abstiegen"},
    {txt:"Trinkflasche (1,5–2 L)"},{txt:"Stirnlampe + Ersatzbatterien"},{txt:"Kleines Taschenmesser"}
  ]},
  {cat:"🩹 Gesundheit",items:[
    {txt:"Blasenpflaster Compeed",sub:"Viele! Das Wichtigste für Wanderer"},
    {txt:"Erste-Hilfe-Set klein"},{txt:"Ibuprofen",sub:"Muskelkater, Knieschmerzen"},
    {txt:"Sonnencreme LSF 30+"},{txt:"Insektenspray",sub:"April: erste Mücken & Zecken"},
    {txt:"Fußcreme / Vaseline",sub:"Täglich einreiben gegen Blasen!"},
    {txt:"Elektrolyt-Tabletten"},{txt:"Knie-Tape",sub:"Besonders Tag 14 (18 km)"},
    {txt:"Pinzette (Zecken!)",sub:"April = Zeckensaison"}
  ]},
  {cat:"📱 Technik",items:[
    {txt:"Smartphone + Ladekabel"},
    {txt:"Powerbank (min. 10.000 mAh)",sub:"Für mehrtägige Nutzung"},
    {txt:"Offline-Karte laden",sub:"Google Maps Offline oder Maps.me"},
    {txt:"Rother Wanderführer",sub:"15 Etappen mit GPS-Tracks – bestellen!"},
    {txt:"Reiseführer (diese Datei!) 😉",sub:"Offline auf Handy speichern"}
  ]},
  {cat:"📄 Dokumente & Geld",items:[
    {txt:"Personalausweis"},{txt:"Krankenversicherungskarte"},
    {txt:"Buchungsbestätigungen (Screenshot)"},
    {txt:"Bargeld (~200 €)",sub:"Viele Gasthöfe nur Bar"},{txt:"EC-Karte / Kreditkarte"},
    {txt:"Wanderpass Altmühltal",sub:"Stempel sammeln → Urkunde"}
  ]},
  {cat:"🦕 Dino-Spezial",items:[
    {txt:"Schutzbrille",sub:"Für Hobbysteinbruch – Steinspäne!"},
    {txt:"Kleiner Hammer",sub:"Optional – Werkzeug leihbar (~1 €)"},
    {txt:"Tüten / Zeitungspapier",sub:"Fossilien-Schätze einwickeln"}
  ]},
  {cat:"🍫 Snacks",items:[
    {txt:"Energieriegel (10–15 Stück)"},{txt:"Nüsse & Trockenfrüchte"},
    {txt:"Traubenzucker"},{txt:"Lunch-Snacks für 1–2 Tage",sub:"Für Etappen ohne Einkehr"}
  ]}
];

// Restaurants (Listenansicht)
const ESSEN_DATA = {
  highlights:[
    {name:"Gasthof Zum Verkauften Großvater ⭐",day:"Tag 5 · Solnhofen",stars:"⭐⭐⭐",desc:"Legendäres Frühstück, böhmisch-fränkische Küche, Dino-Deko! Wirt Günther ist ein Original."},
    {name:"Brauereigasthof Schneider ⭐",day:"Tag 15 · Essing",stars:"⭐⭐⭐",desc:"Privatbrauerei zwischen Fels und Fluss. Hauseigenes Bier, deftige Küche."},
    {name:"Klosterschenke Weltenburg ⭐⭐",day:"Tag 16 · Kelheim",stars:"⭐⭐⭐",desc:"Dunkles Weltenburger im Biergarten – DAS Abschlussessen!"},
    {name:"Hotel-Gasthof Zur Sonne Pappenheim",day:"Tag 4",stars:"⭐⭐",desc:"Gehobene fränkische Küche, Biergarten, Menüs mit regionalen Zutaten."},
    {name:"Gasthof Zum Blauen Hecht Kipfenberg",day:"Tag 10",stars:"⭐⭐",desc:"Familienbetrieb mit bayerischer Gastlichkeit. Mo+Mi–Sa ab 17h, So ab 10h."},
    {name:"Restaurant Hotel Die Gams",day:"Tag 11+12",stars:"⭐⭐",desc:"Regionale & internationale Küche, Perlhuhn wird gelobt, gutes Frühstücksbuffet."},
    {name:"Zum Mühlenwirt Solnhofen",day:"Tag 5",stars:"⭐⭐",desc:"Biergarten an der Altmühl, fränkische Klassiker, auch vegetarisch. Google 4.7/5."}
  ],
  trail:[
    {ico:"🥜",txt:"Nüsse & Trockenfrüchte – kalorienreich, leicht, haltbar"},
    {ico:"🍫",txt:"Riegel (Clif, Corny) – Energie für die Mittagspause"},
    {ico:"🫙",txt:"Knäckebrot + Aufschnitt – Reste vom Frühstück einpacken"},
    {ico:"💧",txt:"Wasser: min. 1,5 L pro Etappe. Brunnen & Gasthöfe auf dem Weg"},
    {ico:"☕",txt:"Thermosflasche Kaffee/Tee – Belebung am Morgen"},
    {ico:"🧂",txt:"Salzige Snacks (Brezeln) – gegen Krämpfe bei Schwitzen"},
    {ico:"🛒",txt:"Supermärkte in: Treuchtlingen, Eichstätt, Beilngries, Kelheim"}
  ]
};

// Tipps
const TIPPS_DATA = [
  {title:"👟 Füße & Schuhe",items:[
    {ico:"1️⃣",txt:"<b>Schuhe einlaufen</b> – min. 2 Wochen vor der Tour täglich tragen"},
    {ico:"🩹",txt:"<b>Compeed-Pflaster</b> sofort bei ersten Rötungen – nicht warten!"},
    {ico:"🧴",txt:"<b>Vaseline/Fußcreme</b> morgens auf Fersen – verhindert Blasen"},
    {ico:"💧",txt:"<b>Abends Füße hochlegen</b> und kühlen"}
  ]},
  {title:"🎒 Gepäck & Gewicht",items:[
    {ico:"⚖️",txt:"<b>Ziel: max. 10–12 kg</b> Gesamtgewicht. Jedes Kilo kostet Energie!"},
    {ico:"🚌",txt:"<b>Gepäcktransport</b> – viele Wanderwirte organisieren Shuttle. Nachfragen!"},
    {ico:"📦",txt:"<b>Frühzeitig buchen</b> – Hotel Die Gams & Brauereigasthof Schneider jetzt anfragen!"}
  ]},
  {title:"🌤️ Wetter & Sicherheit April",items:[
    {ico:"🌡️",txt:"<b>8–16°C</b> tagsüber, morgens oft kälter. Lagen-Prinzip!"},
    {ico:"🌧️",txt:"<b>Regen einplanen</b> – Regenjacke immer griffbereit, nicht unten im Rucksack"},
    {ico:"🦟",txt:"<b>Zecken!</b> April = Zeckensaison. Abends absuchen, DEET-Spray"}
  ]},
  {title:"🚶 Unterwegs",items:[
    {ico:"⏰",txt:"<b>Früh starten</b> – besonders Tag 14 (18 km!). Vor 9 Uhr los"},
    {ico:"🗺️",txt:"<b>Wanderpass</b> an möglichst vielen Stationen stempeln"},
    {ico:"📸",txt:"<b>Zwölf Apostel (Tag 6)</b> morgens fotografieren – nachmittags Gegenlicht"}
  ]},
  {title:"🚂 An- & Abreise",items:[
    {ico:"🚉",txt:"<b>Hinfahrt:</b> Dortmund → Nürnberg → Gunzenhausen (RE). ~4–5h"},
    {ico:"🚌",txt:"<b>Rückreise:</b> Kelheim → Bus nach Regensburg → ICE nach Dortmund"},
    {ico:"🎟️",txt:"<b>Tickets früh buchen!</b> Osterferien in Bayern = voll"}
  ]}
];

const HOTELS_DATA = [
  {day:1,ort:"Spielberg",name:"Gasthof Gentner",preis:"ab 94 € DZ",note:"Slowfood-zertifiziert",stars:"⭐⭐"},
  {day:2,ort:"Auernheim",name:"Gasthof Zur Sonne",preis:"ab 70 € DZ",note:"Fränkische Küche, Biergarten",stars:"⭐⭐"},
  {day:3,ort:"Treuchtlingen",name:"Gasthof Via Vita",preis:"ab 87 € DZ",note:"Zentral, nahe Therme",stars:"⭐⭐"},
  {day:4,ort:"Pappenheim",name:"Hotel-Gasthof Zur Sonne",preis:"ab 90 € DZ",note:"Top Küche, Wellnessangebote",stars:"⭐⭐⭐"},
  {day:5,ort:"Solnhofen",name:"Gasthof Verkaufter Großvater",preis:"ab 65 € DZ",note:"Dino-Deko, legendäres Frühstück – anfragen!",stars:"⭐⭐⭐"},
  {day:6,ort:"Dollnstein",name:"Gasthof Zur Post",preis:"ab 70 € DZ",note:"Zentral, bürgerliche Küche",stars:"⭐⭐"},
  {day:7,ort:"Eichstätt",name:"Hotel Café Fuchs",preis:"ab 66 € DZ",note:"2 Nächte (7+8), zentral",stars:"⭐⭐"},
  {day:9,ort:"Walting/Pfünz",name:"Gasthof Pfünzer Hof",preis:"ab 70 € DZ",note:"Direkt am Weg",stars:"⭐⭐"},
  {day:10,ort:"Kipfenberg",name:"Gasthof Zum Blauen Hecht",preis:"ab 80 € DZ",note:"Familienbetrieb, Angelgewässer",stars:"⭐⭐⭐"},
  {day:11,ort:"Beilngries",name:"Hotel Die Gams",preis:"ab 116 € DZ",note:"2 Nächte (11+12), Spa House inkl.! seit 1794",stars:"⭐⭐⭐⭐"},
  {day:13,ort:"Dietfurt",name:"Gasthof Meier Griesstetten",preis:"ab 78 € DZ",note:"Biergarten, Balkon",stars:"⭐⭐"},
  {day:14,ort:"Riedenburg",name:"Tachensteiner Hof",preis:"ab 64 € DZ",note:"Frühstücksbuffet, ruhige Lage",stars:"⭐⭐"},
  {day:15,ort:"Essing",name:"Brauereigasthof Schneider",preis:"ab 72 € DZ",note:"Privatbrauerei! anfragen",stars:"⭐⭐⭐"},
  {day:16,ort:"Kelheim",name:"Pension Carlbauer",preis:"ab 56 € DZ",note:"Zentral, beliebt bei Wanderern",stars:"⭐⭐"}
];

