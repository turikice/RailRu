Promise.resolve({
  "content": {
    "title": "Свяжитесь с нами удобным для вас способом",
    "description": "Берём на себя комплексную организацию перевозки: от выбора вагона и маршрута до контроля местоположения и технического состояния состава.",
    "phone": "+7 812 241 00 29",
    "officeAddress": "Санкт-Петербург,\nул. Беринга, 1",
    "officeAddressEn": "1 Beringa Street\nSt. Petersburg, Russia",
    "titleEn": "Get in touch in the way that suits you",
    "descriptionEn": "We manage transport end to end: from selecting railcars and routes to tracking locations and monitoring rolling stock condition.",
    "companyName": "Общество с ограниченной ответственностью «РЭЙЛРУ»",
    "companyNameEn": "RailRu Limited Liability Company",
    "inn": "7801559192",
    "kpp": "780101001",
    "ogrn": "1117847458508",
    "legalAddress": "199406, Санкт-Петербург, вн. тер. г. муниципальный округ Гавань, ул. Беринга, д. 1, литера А, помещ. 48-Н",
    "legalAddressEn": "1 Beringa Street, building A, premises 48-N, Gavan Municipal District, St. Petersburg, 199406, Russia",
    "mapCoordinates": "59.9356884, 30.2491797"
  }
})
    .then(({content}) => {
      const english = document.documentElement.lang === 'en';
      const set = (selector, value) => {
        if (typeof value !== 'string') return;
        document.querySelectorAll(selector).forEach(el => { el.textContent = value; });
      };
      const localized = key => content[english ? `${key}En` : key];
      set('[data-contact="title"]', localized('title'));
      set('[data-contact="description"]', localized('description'));
      set('[data-contact="officeAddress"], .site-footer__address address', localized('officeAddress'));
      set('[data-contact="legalAddress"]', localized('legalAddress'));
      set('[data-contact="legalInfo"]', english
        ? `${content.companyNameEn || 'RailRu Limited Liability Company'}\nTax ID (INN) ${content.inn}\nTax registration code (KPP) ${content.kpp}\nRegistration number (OGRN) ${content.ogrn}`
        : `${content.companyName}\nИНН ${content.inn}\nКПП ${content.kpp}\nОГРН ${content.ogrn}`);
      set('[data-contact="phone"], .site-footer__contact a', content.phone);
      document.querySelectorAll('a[href^="tel:"]').forEach(el => { el.href = `tel:${content.phone.replace(/[^+\d]/g, '')}`; });
      const map = document.querySelector('.contacts-map iframe');
      if (map && content.mapCoordinates) {
        const [lat, lon] = content.mapCoordinates.split(',').map(Number);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
        const params = new URLSearchParams({
          bbox: [lon - .006, lat - .003, lon + .006, lat + .003].join(','),
          layer: 'mapnik',
          marker: [lat, lon].join(','),
        });
        map.src = `https://www.openstreetmap.org/export/embed.html?${params}`;
        map.title = `${english ? 'RailRu office' : 'Расположение офиса RailRu'}: ${localized('officeAddress').replaceAll('\n', ', ')}`;
        document.querySelector('.contacts-map__link').href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`;
      }
    })
    .catch(() => { /* Keep the original contact details when the content service is unavailable. */ });
