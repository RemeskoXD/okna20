import { MoravaRegion, ServiceItem, DiagnosticHotspot } from '../types';

export const MORAVA_REGIONS: MoravaRegion[] = [
  {
    name: 'Jihomoravský kraj',
    code: 'JMK',
    leadCity: 'Brno',
    cities: ['Brno', 'Blansko', 'Břeclav', 'Hodonín', 'Vyškov', 'Znojmo', 'Kuřim', 'Tišnov', 'Mikulov', 'Rosice', 'Slavkov u Brna', 'Pohořelice'],
    daysInArea: 'Každý všední den (Po - Pá)',
    activeTechCount: 4,
    statusText: 'Mobilní posádky v terénu denně',
  },
  {
    name: 'Moravskoslezský kraj',
    code: 'MSK',
    leadCity: 'Ostrava',
    cities: ['Ostrava', 'Opava', 'Frýdek-Místek', 'Havířov', 'Karviná', 'Nový Jičín', 'Třinec', 'Kopřivnice', 'Bohumín', 'Orlová', 'Frenštát p. Radh.'],
    daysInArea: 'Po, Út, Čt, Pá',
    activeTechCount: 3,
    statusText: 'Dnes volné termíny na kontrolu',
  },
  {
    name: 'Olomoucký kraj',
    code: 'OLK',
    leadCity: 'Olomouc',
    cities: ['Olomouc', 'Prostějov', 'Přerov', 'Šumperk', 'Hranice', 'Zábřeh', 'Šternberk', 'Litovel', 'Mohelnice', 'Uničov'],
    daysInArea: 'Út, St, Pá',
    activeTechCount: 2,
    statusText: 'Pravidelné servisní okruhy',
  },
  {
    name: 'Zlínský kraj',
    code: 'ZLK',
    leadCity: 'Zlín',
    cities: ['Zlín', 'Uherské Hradiště', 'Kroměříž', 'Vsetín', 'Valašské Meziříčí', 'Otrokovice', 'Uherský Brod', 'Holešov', 'Bystřice pod Hostýnem'],
    daysInArea: 'Po, St, Čt, So',
    activeTechCount: 2,
    statusText: 'Dojezd bez příplatku za km',
  },
];

export const DIAGNOSTIC_HOTSPOTS: DiagnosticHotspot[] = [
  {
    id: 'tesneni',
    title: 'Obvodové těsnění křídla a rámu',
    position: { top: '35%', left: '88%' },
    symptom: 'Chladný průvan u okenního rámu, rosení spodního okraje skla, pronikání hluku z ulice.',
    cause: 'Zteřelá pryž po 5–8 letech bez impregnace ztrácí pružnost a vznikají mikromezery.',
    consequence: 'Únik až 25 % drahého tepla z místnosti a riziko vzniku plísní na omítce.',
    solution: 'Instalace prémiového německého EPDM těsnění s dutinkovým profilem a UV ochranou.',
    inspectionFocus: 'Test těsnosti měrkou a měření kompresního přítlaku.',
  },
  {
    id: 'pritlak',
    title: 'Nastavitelné přítlačné čepy (léto / zima)',
    position: { top: '65%', left: '92%' },
    symptom: 'Okenní křídlo nedoléhá stejnoměrně, z jedné strany profukuje i při zavřené klice.',
    cause: 'Čepy jsou v neutrální nebo letní poloze, případně se vibracemi uvolnily.',
    consequence: 'Průvan v zimním období, zbytečné ochlazování interiéru a zatížení topení.',
    solution: 'Přesné seřízení excentrických čepů speciálním klíčem na optimální zimní/celoroční přítlak.',
    inspectionFocus: 'Kontrola záběru čepů do protikusů na rámu okna.',
  },
  {
    id: 'klika',
    title: 'Převodová skříň a čtyřhran kliky',
    position: { top: '50%', left: '84%' },
    symptom: 'Klika se otáčí ztuha, nedotočí se do svislé polohy nebo v ní nepříjemně lupe.',
    cause: 'Vyschlé mazivo v převodovce kování a vniklý prach ze stavebních prací či provozu.',
    consequence: 'Hrozí zlomení vnitřního ozubeného převodu – pak okno nelze otevřít ani zavřít!',
    solution: 'Chemické vyčištění, aplikace tlakového teflonového maziva a dotažení pouzdra.',
    inspectionFocus: 'Měření točivého odporu a kontrola aretace v polohách otevřeno/ventilace/zavřeno.',
  },
  {
    id: 'panty',
    title: 'Spodní a horní ložiskové panty',
    position: { top: '82%', left: '16%' },
    symptom: 'Křídlo při zavírání drhne o spodní rám, musí se přizvedávat silou.',
    cause: 'Vlastní vahou skla dochází po letech k prověšení křídla o několik milimetrů.',
    consequence: 'Deformace plastového rámu, poškození kování a nemožnost bezpečného vyklopení.',
    solution: '3D rektifikace pantů (výškové, stranové a přítlačné nastavení do původní roviny).',
    inspectionFocus: 'Kontrola kolmosti a osového vyvážení okenního křídla.',
  },
  {
    id: 'nuzky',
    title: 'Sklopné nůžky a mikroventilace',
    position: { top: '15%', left: '48%' },
    symptom: 'Při pokusu o vyklopení okno vypadne v obou polohách najednou (otevřeno i ventilačka).',
    cause: 'Špatně seřízená pojistka chybné manipulace nebo opotřebovaný čep horních nůžek.',
    consequence: 'Nebezpečí vypadnutí těžkého okenního křídla na podlahu nebo na člověka.',
    solution: 'Seřízení táhla nůžek, obnova funkce bezpečnostní blokovací pojistky.',
    inspectionFocus: 'Prověření bezpečnostní pojistky proti současnému otevření a vyklopení.',
  },
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'kontrola-zdarma',
    title: 'Kompletní diagnostika a kontrola oken',
    priceTag: '0 Kč (ZDARMA)',
    description: 'Nezávazná vstupní prohlídka vašich oken a dveří naším mobilním technikem přímo u vás doma nebo v provozovně kdekoli na Moravě.',
    popular: true,
    included: [
      'Prověření funkčnosti celoobvodového kování',
      'Kontrola těsnosti a stavu profilového těsnění',
      'Kontrola prověšení křídel a kolmosti vůči rámu',
      'Detekce tahů a rizikových tepelných mostů',
      'Nezávazný protokol s cenovým návrhem oprav (bez závazku)',
    ],
  },
  {
    id: 'serizeni-kridla',
    title: 'Profesionální seřízení okenního křídla',
    priceTag: 'od 180 Kč / křídlo',
    description: 'Přesné seřízení geometrie ve 3 osách pro plynulý chod bez drhnutí a nastavení správného přítlaku k rámu.',
    included: [
      'Výšková a stranová rektifikace spodního pantu',
      'Seřízení horních nůžek a mikroventilace',
      'Nastavení zimního/letního přítlaku čepů',
      'Okamžité lehké a tiché ovládání okna',
    ],
  },
  {
    id: 'vymena-tesneni',
    title: 'Výměna těsnění za prémiové EPDM',
    priceTag: 'od 95 Kč / běžný metr',
    description: 'Demontáž starého ztvrdlého těsnění a osazení nového pryžového těsnění s dutinkou a tvarovou pamětí.',
    popular: true,
    included: [
      'Vyčištění vodicí drážky v profilu rámu i křídla',
      'Kvalitní německé EPDM těsnění s odolností vůči UV a mrazu',
      'Snížení tepelných ztrát až o 25 %',
      'Výrazný útlum venkovního hluku z ulice',
    ],
  },
  {
    id: 'udrzba-kovani',
    title: 'Kompletní servis a mazání kování',
    priceTag: 'od 90 Kč / okno',
    description: 'Vyčištění převodů, impregnace mazivem s PTFE a prodloužení životnosti mechaniky o 10 až 15 let.',
    included: [
      'Odstranění nečistot a starého zatuhlého tuku',
      'Tlaková aplikace speciálního maziva pro okenní kování',
      'Dotažení všech uvolněných montážních vrutů',
      'Ochrana před prasknutím drahých převodovek',
    ],
  },
  {
    id: 'oprava-kovani',
    title: 'Výměna poškozených dílů kování a klik',
    priceTag: 'dle typu dílu',
    description: 'Rychlá výměna prasklých převodovek, rohových vedení, nůžek a klik pro systémy Roto, MACO, Siegenia, Winkhaus, GU.',
    included: [
      'Originální náhradní díly přímo z mobilní dílny',
      'Možnost osazení bezpečnostních uzamykatelných klik',
      'Výměna prasklých balkónových západek a madélek',
      'Záruka 24 měsíců na dodané díly i montáž',
    ],
  },
  {
    id: 'balkony-vstupy',
    title: 'Servis balkónových a vchodových dveří',
    priceTag: 'od 290 Kč / dveře',
    description: 'Speciální seřízení těžkých dveřních křídel, seřízení vícebodových zámků a prahového těsnění.',
    included: [
      'Rektifikace masivních dveřních závěsů',
      'Nastavení dojezdu do dveřního rámu',
      'Oprava a promazání vícebodových lištových zámků',
      'Izolace spodní prahové části proti průvanu',
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ing. Martin Dvořák',
    location: 'Brno – Žabovřesky',
    propertyType: 'Byt 3+1 v cihlovém domě (8 oken)',
    text: 'Z oken do ulice nám v zimě citelně táhlo a hluk tramvají byl nesnesitelný. Využil jsem nabídku kontroly zdarma. Technik pan Král přijel přesně na čas, vysvětlil stav a navrhl výměnu těsnění a seřízení. Rozdíl byl okamžitý – ticho v bytě a na vytápění jsme tuto zimu ušetřili skoro 4 000 Kč. Profesionální přístup!',
    rating: 5,
    outcome: 'Odstraněn průvan · Úspora tepla 22 %',
  },
  {
    id: 2,
    name: 'Jana Navrátilová',
    location: 'Olomouc – Nové Sady',
    propertyType: 'Rodinný dům (14 oken + 2x balkón)',
    text: 'Klika u balkónu se zasekávala a dvě křídla drhla tak, že nešla dovřít. Objednala jsem kontrolu přes online formulář večer, ráno mi volala dispečerka s potvrzením termínu na druhý den. Servisák měl díly přímo v autě, za 2 hodiny bylo vše perfektně seřízeno. Žádné natahování cen, platila jsem přesně tolik, co řekl předem.',
    rating: 5,
    outcome: 'Oprava na místě z vozu · Hladký chod kování',
  },
  {
    id: 3,
    name: 'Petr Holub',
    location: 'Ostrava – Poruba',
    propertyType: 'Bytové družstvo (revize celého vchodu)',
    text: 'V našem domě jsme řešili stížnosti nájemníků na profukování plastových oken starých 12 let. Reno okna udělala prohlídku všech 24 bytů zdarma a připravila přehledný soupis. Realizace proběhla hladce za dva dny. Skvělá domluva pro celou Ostravu a okolí.',
    rating: 5,
    outcome: 'Hromadný servis BD · 100% spokojenost',
  },
  {
    id: 4,
    name: 'Radka a Tomáš Kučerovi',
    location: 'Zlín – Kudlov',
    propertyType: 'Novostavba rodinného domu (velkoformátová okna HS portál)',
    text: 'Báli jsme se, že velká posuvná okna budeme muset draze reklamovat u výrobce. Technik z Reno okna je seřídil do absolutní roviny a vyčistil pojezdy. Jezdí teď jedním prstem. Určitě doporučuji pro každého na Zlínsku a Slovácku.',
    rating: 5,
    outcome: 'Seřízení HS portálu · Dojezd bez příplatku',
  },
];

export const FAQS = [
  {
    question: 'Je kontrola oken na Moravě skutečně zdarma a nezávazná?',
    answer: 'Ano, 100% ano. Náš technik k vám přijede v rámci pravidelných servisních tras po Moravě zcela zdarma. Zkontroluje těsnost, stav kování, pantů a seřízení. Po prohlídce vám sdělí stav oken a pokud je potřeba nějaký zásah, předloží přesný cenový návrh. Pokud se rozhodnete servis neprovádět, neplatíte ani korunu za výjezd ani za kontrolu.',
  },
  {
    question: 'Jak rychle k nám technik na Moravě může dorazit?',
    answer: 'Standardně plánujeme termíny do 24 až 48 hodin od vyplnění formuláře podle vaší lokality. V krajských městech (Brno, Ostrava, Olomouc, Zlín) máme posádky v terénu každý den. V případě havárie (např. okno nejde zavřít a venku mrzne) se snažíme najít řešení ještě týž den.',
  },
  {
    question: 'Jaké typy oken a značky kování servisujete?',
    answer: 'Servisujeme veškerá plastová, dřevěná (eurookna) i hliníková okna a dveře. Naše mobilní dílny jsou vybaveny originálními náhradními díly předních evropských výrobců kování: Roto, MACO, Siegenia-Aubi, Winkhaus, G-U (Gretsch-Unitas), Schüco, Aubi a Romb.',
  },
  {
    question: 'Kolik ušetřím na vytápění po seřízení a výměně těsnění?',
    answer: 'Podle měření termokamerou a energetických auditů uniká špatně seřízenými okny se zteřelým těsněním 15 % až 25 % celkového tepla z interiéru. U běžného rodinného domu představuje nově utěsněné a seřízené okno roční úsporu v rozmezí 4 500 Kč až 9 500 Kč na účtech za plyn, tepelné čerpadlo či dálkové teplo.',
  },
  {
    question: 'Jak dlouho trvá kontrola a následný servis jednoho bytu či domu?',
    answer: 'Vstupní diagnostika běžného bytu (4-8 oken) trvá přibližně 20 až 30 minut. Pokud se na místě domluvíte na provedení servisu (seřízení, promazání, výměna těsnění), kompletní práce u všech oken v bytě zabere obvykle 1 až 2 hodiny. Vše probíhá čistě a bez nepořádku.',
  },
  {
    question: 'Dostanu na provedenou práci a materiál záruku?',
    answer: 'Samozřejmě. Na veškeré nové díly kování, těsnění a kliky poskytujeme záruku 24 měsíců. Na přesné seřízení křídel dáváme garanci spolehlivého chodu. Zákazník vždy obdrží doklad s rozpisem provedených úkonů.',
  },
];
