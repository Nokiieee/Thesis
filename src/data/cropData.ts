// src/data/cropData.ts

export type CropItem = {
  title: {
    en: string;
    tl: string;
  };

  steps: {
    en: string[];
    tl: string[];
  };
};

export const cropData: Record<string, CropItem> = {
  eggplant: {
    title: {
      en: "Eggplant",
      tl: "Talong",
    },

    steps: {
      en: [
        "Eggplant (Solanum melongena esculentum) is rich in potassium, iron, protein, and vitamins A and B. Its skin contains nasunin, an antioxidant that helps protect cells.",
        "It grows best in sandy loam or clay loam soil at a temperature of 21 to 30°C.",
        "Plow and harrow the field 2 to 3 times, digging 15 to 20 cm deep to allow proper root development.",
        "About 100 grams of seeds are needed per hectare. Start seeds in a seedbed or seedling trays.",
        "For trays, mix compost, carbonized rice hull, and sterilized garden soil. Sterilize garden soil using heat or boiling water.",
        "Soak seeds in water overnight, then plant one seed per hole.",
        "Provide a shade structure about 120 cm high on the east side and 60 cm on the west to protect young seedlings.",
        "Ten days after germination, apply a starter fertilizer solution such as urea or ammonium sulfate.",
        "One week before transplanting, harden seedlings by exposing them to more sunlight and reducing water.",
        "Set plants in furrows or raised beds. Plastic mulch may be used with the silver side facing up to control weeds and retain moisture.",
        "Mix chicken manure and complete fertilizers into the soil before transplanting. Transplant seedlings at 30 to 35 days old with 3 to 4 true leaves.",
        "Transplant late in the afternoon to reduce stress. If plastic mulch is used, water beds two days before planting to cool the soil.",
        "During the dry season, water at 7, 21, and 30 days after transplanting, then every 10 days afterward.",
        "Remove lower lateral branches below the main stem split to improve air circulation and reduce disease.",
        "Harvesting starts 46 to 50 days after transplanting. Pick fruits twice a week in the early morning using pruning shears.",
        "Pack eggplants in plastic bags with two small pin holes per kilogram to allow airflow and keep them fresh.",
      ],

      tl: [
        "Ang talong (Solanum melongena esculentum) ay mayaman sa potasa, bakal, protina, at mga bitamina A at B. Ang balat nito ay naglalaman ng nasunin, isang antioxidant na tumutulong protektahan ang mga selula.",
        "Mas mainam itong tumubo sa mabuhanging loam o clay loam na lupa sa temperaturang 21 hanggang 30°C.",
        "Araruhin at suyurin ang bukid nang 2 hanggang 3 beses, at hukayin nang 15 hanggang 20 cm ang lalim upang magkaroon ng maayos na pag-unlad ang mga ugat.",
        "Humigit-kumulang 100 gramo ng binhi ang kailangan bawat ektarya. Simulan ang pagpapatubo ng binhi sa punlaan o seedling trays.",
        "Para sa trays, paghaluin ang compost, carbonized rice hull, at isterilisadong garden soil. Maaaring isterilisahin ang garden soil gamit ang init o kumukulong tubig.",
        "Ibabad ang mga binhi sa tubig magdamag, pagkatapos ay magtanim ng tig-iisang binhi sa bawat butas.",
        "Maglagay ng lilim na istruktura na may taas na humigit-kumulang 120 cm sa silangang bahagi at 60 cm sa kanlurang bahagi upang maprotektahan ang mga batang punla.",
        "Sampung araw matapos tumubo ang mga binhi, maglagay ng starter fertilizer solution tulad ng urea o ammonium sulfate.",
        "Isang linggo bago ilipat-tanim, sanayin ang mga punla sa mas maraming sikat ng araw at bawasan ang pagdidilig.",
        "Itanim ang mga halaman sa mga tudling o raised beds. Maaaring gumamit ng plastic mulch na nakaharap pataas ang kulay pilak upang makontrol ang damo at mapanatili ang halumigmig ng lupa.",
        "Ihalo ang dumi ng manok at complete fertilizers sa lupa bago maglipat-tanim. Ilipat ang mga punla kapag 30 hanggang 35 araw na at may 3 hanggang 4 na tunay na dahon.",
        "Maglipat-tanim sa hapon upang mabawasan ang stress ng halaman. Kung gumagamit ng plastic mulch, diligan ang mga taniman dalawang araw bago magtanim upang mapalamig ang lupa.",
        "Sa tag-init o tagtuyot, diligan sa ika-7, ika-21, at ika-30 araw matapos ilipat-tanim, pagkatapos ay bawat ika-10 araw.",
        "Alisin ang mababang mga sanga sa gilid sa ibaba ng pangunahing hati ng tangkay upang mapabuti ang daloy ng hangin at mabawasan ang sakit.",
        "Nagsisimula ang pag-aani 46 hanggang 50 araw matapos ilipat-tanim. Mamitas ng bunga dalawang beses isang linggo sa maagang umaga gamit ang pruning shears.",
        "Ilagay ang mga talong sa plastic bags na may tig-dalawang maliit na butas bawat kilo upang magkaroon ng daloy ng hangin at mapanatiling sariwa ang mga ito.",
      ],
    },
  },

  ampalaya: {
    title: {
      en: "Ampalaya",
      tl: "Ampalaya",
    },

    steps: {
      en: [
        "Ampalaya (bitter gourd) is a healthy climbing vine rich in vitamins and known for helping regulate blood sugar.",
        "It grows best in sandy or clay loam soil with a pH of 6 to 6.7. It can be planted year-round, but October to February is ideal.",
        "Plow and harrow the soil twice with a 7-day interval to make it soft and suitable for planting.",
        "Construct a trellis made of bamboo or wood to support upward growth.",
        "Clip the tips of the seeds, then soak for 24 hours and wrap in a damp cloth until they sprout.",
        "Plant one seed per hill with a spacing of 30 to 50 cm, or start seeds in trays and transplant after 15 days.",
        "Apply organic fertilizer before planting, followed by complete fertilizer and urea as the plants grow.",
        "Water plants as needed while avoiding flooding. Remove weeds and maintain proper drainage.",
        "Trim lower leaves and excess vines, keeping 1 to 2 main stems for better growth.",
        "Keep the area clean to prevent pests such as fruit flies and diseases.",
        "Harvest fruits 18 to 20 days after flowering while still young and firm.",
        "Sort and pack fresh ampalaya properly for the market.",
      ],

      tl: [
        "Ang ampalaya (bitter gourd) ay isang masustansyang gumagapang na halaman na mayaman sa bitamina at kilala sa pagtulong sa pagkontrol ng blood sugar.",
        "Mas mainam itong tumubo sa mabuhangin o clay loam na lupa na may pH na 6 hanggang 6.7. Maaari itong itanim buong taon, ngunit pinakamainam mula Oktubre hanggang Pebrero.",
        "Araruhin at suyurin ang lupa nang dalawang beses na may pagitan na 7 araw upang maging malambot at angkop sa pagtatanim.",
        "Gumawa ng trellis na yari sa kawayan o kahoy upang masuportahan ang pataas na paglago ng halaman.",
        "Putulan nang bahagya ang dulo ng mga binhi, pagkatapos ay ibabad sa loob ng 24 oras at balutin sa mamasa-masang tela hanggang sa ito ay sumibol.",
        "Magtanim ng tig-iisang binhi sa bawat tundos na may pagitan na 30 hanggang 50 cm, o magpunla muna sa trays at ilipat-tanim pagkalipas ng 15 araw.",
        "Maglagay ng organikong pataba bago magtanim, kasunod ang complete fertilizer at urea habang lumalaki ang mga halaman.",
        "Diligan ang mga halaman kung kinakailangan habang iniiwasan ang pagbaha. Alisin ang mga damo at panatilihing maayos ang daluyan ng tubig.",
        "Putulin ang mababang mga dahon at sobrang baging, at mag-iwan ng 1 hanggang 2 pangunahing tangkay para sa mas magandang paglaki.",
        "Panatilihing malinis ang paligid upang maiwasan ang mga peste tulad ng fruit flies at mga sakit ng halaman.",
        "Anihin ang mga bunga 18 hanggang 20 araw matapos mamulaklak habang bata pa at matigas pa ang bunga.",
        "Paghiwa-hiwalayin ayon sa kalidad at maayos na iimpake ang sariwang ampalaya para sa pamilihan.",
      ],
    },
  },

  okra: {
    title: {
      en: "Okra",
      tl: "Okra",
    },

    steps: {
      en: [
        "Okra is a vegetable crop known for its edible green pods. It is rich in nutrients and commonly used in many dishes.",
        "Okra grows best in a warm, sunny climate with a long growing season. It prefers soft, sandy soil that drains water well.",
        "Plow and harrow the field 2 to 3 times with a one-week interval between each. Till the soil about 15 to 20 cm deep.",
        "One day before planting, make furrows in straight rows with a spacing of 75 cm between lines.",
        "Apply complete fertilizer and organic fertilizer into the furrows and lightly cover with soil before planting.",
        "About 30 days after planting, apply urea to support plant growth.",
        "Soak seeds in water overnight to improve germination before planting.",
        "Plant 2 to 3 seeds per hole, spaced 30 cm apart. Replant missing plants after 3 days if needed.",
        "Water every 7 to 14 days. At 15 days old, remove weak seedlings, leaving only the strongest two per hill.",
        "At 15 days, do off-barring by gently cultivating soil away from the plants. After one month, hill up by pushing soil back to support the base.",
        "Remove weeds manually to prevent competition for nutrients and water.",
        "Monitor for pests like stink bugs and diseases. Remove and bury infected plants and keep the field clean.",
        "Okra starts flowering after 40 to 75 days. Fruits are ready for harvest 4 to 6 days after flowering.",
        "Harvest in the morning or late afternoon when pods are 3 to 4 inches long.",
        "Select good pods and pack in baskets or boxes lined with banana leaves or paper to avoid bruising.",
        "After harvest, cut the main stem about one foot above the ground, then fertilize and water. New shoots will grow for another round of production.",
      ],

      tl: [
        "Ang okra ay isang halamang gulay na kilala sa nakakain nitong berdeng bunga. Ito ay mayaman sa sustansya at karaniwang ginagamit sa maraming putahe.",
        "Mas mainam tumubo ang okra sa mainit at maaraw na klima na may mahabang panahon ng pagtatanim. Gusto nito ang malambot at mabuhanging lupa na may maayos na daluyan ng tubig.",
        "Araruhin at suyurin ang bukid nang 2 hanggang 3 beses na may pagitan na isang linggo bawat isa. Bungkalin ang lupa nang 15 hanggang 20 cm ang lalim.",
        "Isang araw bago magtanim, gumawa ng mga tudling na tuwid ang hanay na may pagitan na 75 cm bawat linya.",
        "Maglagay ng complete fertilizer at organikong pataba sa mga tudling at tabunan nang bahagya ng lupa bago magtanim.",
        "Mga 30 araw matapos magtanim, maglagay ng urea upang masuportahan ang paglaki ng halaman.",
        "Ibabad ang mga binhi sa tubig magdamag upang mapabuti ang pagsibol bago itanim.",
        "Magtanim ng 2 hanggang 3 binhi bawat butas na may pagitan na 30 cm. Magtanim muli sa mga nawawalang halaman pagkalipas ng 3 araw kung kinakailangan.",
        "Diligan bawat 7 hanggang 14 araw. Kapag 15 araw na ang mga punla, alisin ang mahihinang punla at iwan lamang ang dalawang pinakamalalakas sa bawat tundos.",
        "Sa ika-15 araw, gawin ang off-barring sa pamamagitan ng marahang pagbungkal ng lupa palayo sa halaman. Pagkaraan ng isang buwan, gawin ang hilling up sa pamamagitan ng pagtatambak muli ng lupa sa paligid ng puno upang masuportahan ang ugat.",
        "Manwal na alisin ang mga damo upang maiwasan ang kompetisyon sa sustansya at tubig.",
        "Bantayan ang mga peste tulad ng stink bugs at mga sakit ng halaman. Alisin at ibaon ang mga nahawaang halaman at panatilihing malinis ang bukid.",
        "Nagsisimulang mamulaklak ang okra pagkalipas ng 40 hanggang 75 araw. Handa nang anihin ang bunga 4 hanggang 6 na araw matapos mamulaklak.",
        "Mag-ani sa umaga o huling bahagi ng hapon kapag ang mga bunga ay may habang 3 hanggang 4 pulgada.",
        "Pumili ng magagandang bunga at ilagay sa mga basket o kahon na may sapin na dahon ng saging o papel upang maiwasan ang pagkakapasa.",
        "Pagkatapos ng anihan, putulin ang pangunahing tangkay nang mga isang talampakan mula sa lupa, pagkatapos ay lagyan ng pataba at diligan. Tutubo muli ang mga bagong sanga para sa panibagong produksyon.",
      ],
    },
  },

  tomato: {
    title: {
      en: "Tomato",
      tl: "Kamatis",
    },

    steps: {
      en: [
        "Tomatoes (Lycopersicum esculentum Miller) are a popular vegetable crop rich in Vitamin A, Vitamin C, and lycopene, an antioxidant that supports heart health.",
        "Tomatoes grow best in cool and dry conditions with an ideal temperature of 21 to 24°C. Off-season varieties planted from May to September can provide better market value.",
        "Plow and harrow the field 2 to 3 times, reaching a depth of 15 to 20 cm to create soft soil for better root development.",
        "Clean the seedbed to eliminate weeds and pests. Spread rice hull or straw (3 to 5 cm thick) and burn slowly to sterilize the soil. Plant only after the soil cools.",
        "Soak seeds in clean water overnight, then sow in shallow rows and lightly cover with fine soil.",
        "For the first 3 days, water frequently to ensure germination. Afterward, reduce watering. At 7 to 14 days, apply a starter fertilizer solution (urea mixed with water).",
        "Harden seedlings by gradually reducing water and exposing them to more sunlight before transplanting.",
        "Prepare raised beds and cover with plastic mulch with the silver side facing up to control weeds and maintain soil moisture.",
        "Space plants 0.5 meters apart. Cut holes in the plastic mulch in an 'X' shape. Transplant late in the afternoon to avoid heat stress.",
        "Install support sticks about 15 days after planting to help the plants grow upright.",
        "Remove excess side shoots to improve airflow and fruit development. Prune in the morning to allow faster healing.",
        "Avoid overwatering since tomatoes are sensitive to flooding. Maintain moist soil, especially during flowering.",
        "Harvesting starts 55 to 65 days after planting. For long-distance transport, pick at the Mature Green stage. For nearby markets, harvest at the Pink Breaker stage.",
        "Sort tomatoes by size, color, and quality. Remove damaged fruits, wash and gently wipe them.",
        "Pack good-quality tomatoes in strong boxes or baskets lined with newspaper or protective material to prevent damage during transport.",
      ],

      tl: [
        "Ang kamatis (Lycopersicum esculentum Miller) ay isang tanyag na halamang gulay na mayaman sa Bitamina A, Bitamina C, at lycopene, isang antioxidant na nakatutulong sa kalusugan ng puso.",
        "Mas mainam tumubo ang kamatis sa malamig at tuyong kondisyon na may angkop na temperaturang 21 hanggang 24°C. Ang mga off-season na uri na itinatanim mula Mayo hanggang Setyembre ay maaaring magbigay ng mas mataas na halaga sa pamilihan.",
        "Araruhin at suyurin ang bukid nang 2 hanggang 3 beses, na may lalim na 15 hanggang 20 cm upang makagawa ng malambot na lupa para sa mas magandang pag-unlad ng ugat.",
        "Linisin ang punlaan upang maalis ang mga damo at peste. Ikalat ang ipa o dayami na may kapal na 3 hanggang 5 cm at dahan-dahang sunugin upang ma-sterilize ang lupa. Magtanim lamang kapag malamig na ang lupa.",
        "Ibabad ang mga binhi sa malinis na tubig magdamag, pagkatapos ay itanim sa mabababaw na hanay at tabunan nang bahagya ng pinong lupa.",
        "Sa unang 3 araw, diligan nang madalas upang matiyak ang pagsibol. Pagkatapos nito, bawasan ang pagdidilig. Sa ika-7 hanggang ika-14 araw, maglagay ng starter fertilizer solution (urea na hinalo sa tubig).",
        "Sanayin ang mga punla bago ilipat-tanim sa pamamagitan ng unti-unting pagbabawas ng tubig at paglalantad sa mas maraming sikat ng araw.",
        "Maghanda ng raised beds at takpan ng plastic mulch na nakaharap pataas ang kulay pilak upang makontrol ang damo at mapanatili ang halumigmig ng lupa.",
        "Maglaan ng pagitan na 0.5 metro bawat halaman. Gumawa ng butas sa plastic mulch na hugis 'X'. Maglipat-tanim sa huling bahagi ng hapon upang maiwasan ang stress dulot ng init.",
        "Maglagay ng mga tukod mga 15 araw matapos magtanim upang masuportahan ang patayong paglaki ng halaman.",
        "Alisin ang sobrang mga sanga sa gilid upang mapabuti ang daloy ng hangin at pagbuo ng bunga. Magputol ng sanga sa umaga upang mas mabilis maghilom ang halaman.",
        "Iwasan ang sobrang pagdidilig dahil sensitibo ang kamatis sa pagbaha. Panatilihing mamasa-masa ang lupa lalo na habang namumulaklak.",
        "Nagsisimula ang pag-aani 55 hanggang 65 araw matapos magtanim. Para sa malalayong biyahe, anihin sa Mature Green stage. Para sa malalapit na pamilihan, anihin sa Pink Breaker stage.",
        "Paghiwa-hiwalayin ang mga kamatis ayon sa laki, kulay, at kalidad. Alisin ang mga sirang bunga, hugasan, at marahang punasan.",
        "Ilagay ang mga de-kalidad na kamatis sa matitibay na kahon o basket na may sapin na diyaryo o proteksiyon na materyal upang maiwasan ang pagkasira habang dinadala.",
      ],
    },
  },

  sitaw: {
    title: {
      en: "Sitaw",
      tl: "Sitaw",
    },

    steps: {
      en: [
        "Sitaw is a fast-growing vegetable legume. It is rich in protein and helps improve the soil by adding nitrogen.",
        "It can grow all year round and prefers a temperature of 20 to 35°C with well-drained soil.",
        "Plow the soil deeply and harrow 2 to 3 times. Make furrows with proper spacing depending on the type of sitaw.",
        "Mix organic compost and complete fertilizer into the soil before planting.",
        "Plant seeds using the drill or hill method and cover with soil. During the rainy season, plant on raised ridges.",
        "Water plants when needed, especially when they begin to wilt.",
        "Set up a trellis early so the vines can climb properly (for pole type).",
        "Remove weaker plants early and control weeds to support healthy growth.",
        "Add soil around the base of the plants to support their growth (hilling-up).",
        "Monitor plants for pests and diseases, especially during early growth stages.",
        "Harvest young pods regularly while they are still green and tender.",
        "For seed production, allow pods to turn brown, then dry and store them properly.",
      ],

      tl: [
        "Ang sitaw ay isang mabilis lumaking halamang gulay na kabilang sa mga legume. Ito ay mayaman sa protina at nakatutulong pagandahin ang lupa sa pamamagitan ng pagdaragdag ng nitrogen.",
        "Maaari itong tumubo buong taon at mas gusto nito ang temperaturang 20 hanggang 35°C at lupang may maayos na daluyan ng tubig.",
        "Araruhin nang malalim ang lupa at suyurin ito nang 2 hanggang 3 beses. Gumawa ng mga tudling na may tamang pagitan depende sa uri ng sitaw.",
        "Ihalo ang organikong compost at complete fertilizer sa lupa bago magtanim.",
        "Itanim ang mga binhi gamit ang drill o hill method at tabunan ng lupa. Sa panahon ng tag-ulan, magtanim sa mga nakaangat na tudling.",
        "Diligan ang mga halaman kung kinakailangan, lalo na kapag nagsisimula itong malanta.",
        "Maglagay agad ng trellis upang maayos na makaakyat ang mga baging (para sa pole type na sitaw).",
        "Alisin agad ang mahihinang halaman at kontrolin ang mga damo upang masuportahan ang malusog na paglaki.",
        "Tambakan ng lupa ang paligid ng puno upang masuportahan ang paglaki nito (hilling-up).",
        "Bantayan ang mga halaman laban sa mga peste at sakit, lalo na sa mga unang yugto ng paglaki.",
        "Regular na anihin ang mga murang bunga habang ito ay berde pa at malambot.",
        "Para sa produksyon ng binhi, hayaang maging kulay kayumanggi ang mga bunga, pagkatapos ay patuyuin at itago nang maayos.",
      ],
    },
  },

  squash: {
    title: {
      en: "Squash",
      tl: "Kalabasa",
    },

    steps: {
      en: [
        "Squash (kalabasa) is rich in vitamins and antioxidants that support overall health.",
        "It grows best in a warm, dry climate with well-drained sandy loam soil. Plant from October to December in lowlands, or May to July in highlands.",
        "Plow and harrow the soil 2 to 3 times. Create furrows and drainage canals during the rainy season to prevent flooding.",
        "Plant pre-germinated seeds directly into the soil, one per hill, with proper spacing. During the wet season, plant on raised areas to avoid rotting.",
        "Alternatively, grow seedlings in pots and transplant after 15 days, preferably in the late afternoon.",
        "Mix organic manure into the soil before planting. Add urea when vines start to grow, followed by potash and solophos after two weeks.",
        "Water plants regularly, but reduce or stop watering when fruits reach the mature green stage to improve taste.",
        "Remove weeds early. If necessary, hand-pollinate flowers in the morning.",
        "Remove damaged fruits and place straw underneath healthy fruits to prevent rotting.",
        "Protect plants from pests such as aphids, beetles, and viruses.",
        "Harvest squash 30 to 40 days after pollination using a sharp knife.",
        "For seed production, allow squash to fully mature until it develops a hard rind and orange color.",
      ],

      tl: [
        "Ang kalabasa (squash) ay mayaman sa bitamina at antioxidants na nakatutulong sa pangkalahatang kalusugan.",
        "Mas mainam itong tumubo sa mainit at tuyong klima na may mabuhanging loam na lupa na may maayos na daluyan ng tubig. Magtanim mula Oktubre hanggang Disyembre sa mababang lugar, o Mayo hanggang Hulyo sa matataas na lugar.",
        "Araruhin at suyurin ang lupa nang 2 hanggang 3 beses. Gumawa ng mga tudling at kanal para sa daluyan ng tubig lalo na sa panahon ng tag-ulan upang maiwasan ang pagbaha.",
        "Itanim nang direkta sa lupa ang mga pinasibol na binhi, tig-iisa bawat tundos, na may tamang pagitan. Sa panahon ng tag-ulan, magtanim sa nakaangat na bahagi upang maiwasan ang pagkabulok.",
        "Maaari ring magpunla sa mga paso at ilipat-tanim pagkalipas ng 15 araw, mas mainam sa huling bahagi ng hapon.",
        "Ihalo ang organikong pataba sa lupa bago magtanim. Maglagay ng urea kapag nagsisimula nang gumapang ang mga baging, kasunod ang potash at solophos makalipas ang dalawang linggo.",
        "Diligan nang regular ang mga halaman, ngunit bawasan o ihinto ang pagdidilig kapag ang mga bunga ay nasa mature green stage na upang mapaganda ang lasa.",
        "Alisin agad ang mga damo. Kung kinakailangan, magsagawa ng hand-pollination ng mga bulaklak sa umaga.",
        "Alisin ang mga sirang bunga at maglagay ng dayami sa ilalim ng malulusog na bunga upang maiwasan ang pagkabulok.",
        "Protektahan ang mga halaman laban sa mga peste tulad ng aphids, beetles, at mga virus.",
        "Anihin ang kalabasa 30 hanggang 40 araw matapos ang polinasyon gamit ang matalim na kutsilyo.",
        "Para sa produksyon ng binhi, hayaang ganap na mahinog ang kalabasa hanggang magkaroon ito ng matigas na balat at kulay kahel.",
      ],
    },
  },

  upo: {
    title: {
      en: "Upo",
      tl: "Upo",
    },

    steps: {
      en: [
        "Upo (bottle gourd) is a versatile plant. Its fruits, shoots, and seeds can be eaten, and its dried shell can be used for tools and crafts.",
        "Plow and harrow the soil 2 to 3 times until it becomes soft and well-aerated.",
        "Soak seeds in water for 24 hours, then wrap in a moist cloth until they sprout.",
        "Plant seeds directly in the soil with about 1 meter spacing. During the rainy season, plant on raised ridges.",
        "Alternatively, grow seedlings in pots and transplant after 15 days, preferably in the afternoon.",
        "Build a strong trellis to support upward growth since upo is a climbing plant.",
        "Pinch the tips of the vines to encourage more branches and fruit production.",
        "Apply fertilizer during planting, followed by organic fertilizer, urea, and potash as the plant grows.",
        "Water regularly but not excessively. Ensure proper drainage and use mulch to maintain moisture.",
        "Hill up soil early and carefully remove weeds during fruiting without disturbing the roots.",
        "Protect plants from pests such as beetles and diseases. Avoid applying pesticide late in the day.",
        "Harvest fruits about 15 days after they form. Cut the stem carefully and pack fruits properly to keep them fresh.",
      ],

      tl: [
        "Ang upo (bottle gourd) ay isang maraming gamit na halaman. Ang bunga, usbong, at mga buto nito ay maaaring kainin, at ang tuyong balat nito ay maaaring gamitin sa paggawa ng mga kasangkapan at handicrafts.",
        "Araruhin at suyurin ang lupa nang 2 hanggang 3 beses hanggang ito ay maging malambot at may maayos na pagpasok ng hangin.",
        "Ibabad ang mga binhi sa tubig sa loob ng 24 oras, pagkatapos ay balutin sa mamasa-masang tela hanggang sa ito ay sumibol.",
        "Itanim nang direkta sa lupa ang mga binhi na may humigit-kumulang 1 metrong pagitan. Sa panahon ng tag-ulan, magtanim sa nakaangat na tudling.",
        "Maaari ring magpunla sa mga paso at ilipat-tanim pagkalipas ng 15 araw, mas mainam sa hapon.",
        "Gumawa ng matibay na trellis upang masuportahan ang pataas na paglaki dahil ang upo ay isang gumagapang na halaman.",
        "Kurutin o putulin ang dulo ng mga baging upang makahikayat ng mas maraming sanga at bunga.",
        "Maglagay ng pataba habang nagtatanim, kasunod ang organikong pataba, urea, at potash habang lumalaki ang halaman.",
        "Diligan nang regular ngunit huwag sosobrahan. Siguraduhing maayos ang daluyan ng tubig at gumamit ng mulch upang mapanatili ang halumigmig.",
        "Tambakan agad ng lupa ang paligid ng puno at maingat na alisin ang mga damo habang namumunga nang hindi naaabala ang mga ugat.",
        "Protektahan ang mga halaman laban sa mga peste tulad ng beetles at mga sakit. Iwasang mag-spray ng pesticide sa huling bahagi ng araw.",
        "Anihin ang mga bunga mga 15 araw matapos mabuo ang mga ito. Maingat na putulin ang tangkay at maayos na iimpake ang mga bunga upang mapanatiling sariwa.",
      ],
    },
  },

  patola: {
    title: {
      en: "Patola",
      tl: "Patola",
    },

    steps: {
      en: [
        "Patola (luffa gourd) is a vegetable eaten when young. When dried, it becomes a natural loofah.",
        "It grows best in warm, humid climates with rich soil and good drainage.",
        "Plow and harrow the soil 2 to 3 times to make it soft. Make wide furrows about 2.5 to 3 meters apart.",
        "Build a strong overhead trellis to support proper growth since patola is a climbing vine.",
        "Soak seeds overnight before planting.",
        "Plant 1 to 2 seeds per hill during the dry season, or 2 to 3 seeds on ridges during the wet season.",
        "After a few weeks, remove weaker plants and keep the strongest one. Guide vines to climb the trellis.",
        "Apply compost and fertilizer to provide the necessary nutrients.",
        "Water plants regularly, about once a week, to keep the soil moist.",
        "Cut weeds carefully without disturbing the roots, as patola roots are sensitive.",
        "Monitor for pests such as fruit flies and diseases like downy mildew.",
        "Harvest fruits a few days after they form using a sharp knife.",
        "Pack fresh patola carefully to maintain good condition for the market.",
      ],

      tl: [
        "Ang patola (luffa gourd) ay isang gulay na kinakain habang bata pa ang bunga. Kapag natuyo, ito ay nagiging natural na loofah o panghilod.",
        "Mas mainam itong tumubo sa mainit at mahalumigmig na klima na may matabang lupa at maayos na daluyan ng tubig.",
        "Araruhin at suyurin ang lupa nang 2 hanggang 3 beses upang maging malambot. Gumawa ng malalapad na tudling na may pagitan na humigit-kumulang 2.5 hanggang 3 metro.",
        "Gumawa ng matibay na overhead trellis upang masuportahan ang tamang paglaki dahil ang patola ay isang gumagapang na baging.",
        "Ibabad ang mga binhi magdamag bago itanim.",
        "Magtanim ng 1 hanggang 2 binhi bawat tundos sa panahon ng tag-init, o 2 hanggang 3 binhi sa mga tudling kapag tag-ulan.",
        "Pagkalipas ng ilang linggo, alisin ang mahihinang halaman at iwan ang pinakamalakas. Gabayan ang mga baging upang makaakyat sa trellis.",
        "Maglagay ng compost at pataba upang maibigay ang kinakailangang sustansya.",
        "Diligan nang regular, mga isang beses bawat linggo, upang mapanatiling mamasa-masa ang lupa.",
        "Maingat na putulin ang mga damo nang hindi naaabala ang mga ugat dahil sensitibo ang mga ugat ng patola.",
        "Bantayan ang mga peste tulad ng fruit flies at mga sakit gaya ng downy mildew.",
        "Anihin ang mga bunga ilang araw matapos mabuo gamit ang matalim na kutsilyo.",
        "Maingat na iimpake ang sariwang patola upang mapanatili ang magandang kalidad nito para sa pamilihan.",
      ],
    },
  },

  "hot-pepper": {
    title: {
      en: "Hot Pepper",
      tl: "Siling Maanghang",
    },

    steps: {
      en: [
        "Hot peppers (Capsicum annuum L.) are nutritious crops rich in Vitamin C, provitamin A, and iron. Their leaves contain calcium, and the fruits have medicinal properties that may help relieve arthritis pain and reduce the risk of diabetes.",
        "They grow best in sunny environments. Plant from May to September (wet season) or October to February (dry season). They prefer sandy loam or clay loam soil.",
        "Plow and harrow the field 2 to 3 times until the soil becomes fine and loose. Make furrows 80 cm apart, or use a double-row system to protect fruits from sun scalding.",
        "About 100 grams of seeds are needed per hectare. Start seeds in a seedbed by burning rice straw to sterilize the soil, or use seedling trays.",
        "For trays, prepare medium by mixing 1 part compost, 1 part carbonized rice hull, and 1 part sterilized garden soil.",
        "Soak seeds in clean water overnight before sowing.",
        "Water seedlings in the morning to prevent damping-off. Thin after developing 2 pairs of true leaves. Apply starter fertilizer 10 days after germination.",
        "One week before transplanting, harden seedlings by reducing water and exposing them to direct sunlight.",
        "Transplant seedlings at 28 to 42 days old, spaced 30 cm apart. Transplant on cloudy days or late afternoon to reduce wilting.",
        "Apply complete fertilizer and ammonium phosphate as basal fertilizer. Add more fertilizer at 10, 30, and 50 days after transplanting. Avoid excess nitrogen.",
        "Water at transplanting, then at 14, 30, and 50 days after. Do off-barring at 10 days and hill-up at 30 days to control weeds and support growth.",
        "Monitor for pests such as aphids and spider mites, and diseases like bacterial wilt.",
        "Begin harvesting 60 to 75 days after transplanting when fruits are mature green, full-sized, and shiny.",
        "Harvest fruits by twisting the pedicel upward or cutting with a sharp knife.",
        "Remove damaged fruits and pack good-quality peppers in polyethylene plastic bags or boxes for storage and transport.",
      ],

      tl: [
        "Ang siling labuyo (Capsicum annuum L.) ay isang masustansyang pananim na mayaman sa Bitamina C, provitamin A, at bakal. Ang mga dahon nito ay may calcium, at ang mga bunga ay may katangiang medikal na maaaring makatulong sa pagpapagaan ng pananakit dulot ng arthritis at pagbawas ng panganib ng diabetes.",
        "Mas mainam itong tumubo sa maaraw na kapaligiran. Magtanim mula Mayo hanggang Setyembre (tag-ulan) o Oktubre hanggang Pebrero (tag-init). Mas gusto nito ang mabuhanging loam o clay loam na lupa.",
        "Araruhin at suyurin ang bukid nang 2 hanggang 3 beses hanggang maging pino at maluwag ang lupa. Gumawa ng mga tudling na may pagitan na 80 cm, o gumamit ng double-row system upang maprotektahan ang mga bunga laban sa sun scalding.",
        "Humigit-kumulang 100 gramo ng binhi ang kailangan bawat ektarya. Magpunla sa seedbed sa pamamagitan ng pagsusunog ng dayami upang ma-sterilize ang lupa, o gumamit ng seedling trays.",
        "Para sa trays, maghanda ng medium sa pamamagitan ng paghahalo ng 1 bahagi compost, 1 bahagi carbonized rice hull, at 1 bahagi isterilisadong garden soil.",
        "Ibabad ang mga binhi sa malinis na tubig magdamag bago itanim.",
        "Diligan ang mga punla sa umaga upang maiwasan ang damping-off. Bawasan ang mga punla kapag mayroon nang 2 pares ng tunay na dahon. Maglagay ng starter fertilizer 10 araw matapos sumibol.",
        "Isang linggo bago ilipat-tanim, sanayin ang mga punla sa pamamagitan ng pagbabawas ng tubig at paglalantad sa direktang sikat ng araw.",
        "Ilipat-tanim ang mga punla kapag 28 hanggang 42 araw na, na may pagitan na 30 cm bawat halaman. Maglipat-tanim sa maulap na araw o huling bahagi ng hapon upang mabawasan ang pagkalanta.",
        "Maglagay ng complete fertilizer at ammonium phosphate bilang basal fertilizer. Magdagdag pa ng pataba sa ika-10, ika-30, at ika-50 araw matapos ilipat-tanim. Iwasan ang sobrang nitrogen.",
        "Diligan sa oras ng paglipat-tanim, pagkatapos ay sa ika-14, ika-30, at ika-50 araw. Gawin ang off-barring sa ika-10 araw at hill-up sa ika-30 araw upang makontrol ang damo at masuportahan ang paglaki.",
        "Bantayan ang mga peste tulad ng aphids at spider mites, at mga sakit gaya ng bacterial wilt.",
        "Magsimulang mag-ani 60 hanggang 75 araw matapos ilipat-tanim kapag ang mga bunga ay mature green, sapat ang laki, at makintab.",
        "Anihin ang mga bunga sa pamamagitan ng pag-ikot pataas sa pedicel o pagputol gamit ang matalim na kutsilyo.",
        "Alisin ang mga sirang bunga at ilagay ang mga de-kalidad na sili sa polyethylene plastic bags o kahon para sa imbakan at transportasyon.",
      ],
    },
  },
};

export default cropData;
