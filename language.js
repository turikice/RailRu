// Public pages share the same layout and assets in both languages.
(() => {
  const english = new URLSearchParams(location.search).get('lang') === 'en';
  const language = english ? 'en' : 'ru';
  document.documentElement.lang = language;

  const urlFor = (href, lang) => {
    const url = new URL(href, location.href);
    if (lang === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    return url.href;
  };
  document.querySelectorAll('[data-language]').forEach(link => {
    const lang = link.dataset.language;
    link.href = urlFor(location.href, lang);
    if (lang === language) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  if (!english) return;
  document.querySelectorAll('a[href]').forEach(link => {
    if (link.hasAttribute('data-language')) return;
    if (/^\.\/(index|contacts)\.html(?:[#?]|$)/.test(link.getAttribute('href'))) {
      link.href = urlFor(link.href, 'en');
    }
  });

  const translations = new Map(Object.entries({
    'RailRu организует железнодорожные перевозки по России, в страны СНГ, Иран и Китай.': 'RailRu arranges rail freight across Russia and to the CIS, Iran and China.',
    'RailRu — железнодорожная логистика': 'RailRu — Rail logistics',
    'Контакты RailRu: телефон, адрес офиса, карта проезда и юридические реквизиты.': 'RailRu contacts, office address, directions and company details.',
    'Контакты — RailRu': 'Contacts — RailRu',
    'Перейти к содержимому': 'Skip to content',
    'RailRu — наверх': 'RailRu — back to top',
    'Основная навигация': 'Main navigation',
    'Мобильная навигация': 'Mobile navigation',
    'Навигация в подвале': 'Footer navigation',
    'Услуги': 'Services',
    'Парк вагонов': 'Railcar fleet',
    'География': 'Geography',
    'Компания': 'Company',
    'Подвижной состав': 'Rolling stock',
    'Контакты': 'Contacts',
    'Язык сайта': 'Site language',
    'Открыть меню': 'Open menu',
    'Железнодорожная логистика': 'Rail logistics',
    'Железнодорожные перевозки': 'Rail freight without',
    'без лишних остановок': 'unnecessary stops',
    'Перевозки по России и международным направлениям: подбираем маршрут и вагоны, организуем отправку и контролируем состав.': 'Domestic and international rail freight: we select routes and railcars, arrange dispatch and monitor your rolling stock.',
    'Наши возможности': 'Our capabilities',
    'типов подвижного': 'types of',
    'состава': 'rolling stock',
    'ключевые географии': 'key transport',
    'перевозок': 'regions',
    'формата перевозок:': 'transport options:',
    'РФ и международные': 'domestic & international',
    'Связаться': 'Contact',
    'Мы перевозим': 'We transport',
    'Логистика для сложных': 'Logistics for complex',
    'промышленных задач': 'industrial challenges',
    'Берём на себя комплексную организацию перевозки: от выбора вагона и маршрута до контроля местоположения и технического состояния состава.': 'We manage transport end to end: from selecting railcars and routes to tracking locations and monitoring rolling stock condition.',
    'Лесопромышленные грузы': 'Forest products',
    'Круглый лес, пиломатериалы, щепа, фанера, ДСП, ДВП и другие материалы.': 'Logs, sawn timber, woodchips, plywood, particleboard, fibreboard and more.',
    'Тарно-штучные грузы': 'Packaged cargo',
    'Организация перевозок упакованной продукции и отдельных грузовых единиц.': 'Transport services for packaged products and individual cargo units.',
    'Негабаритные грузы': 'Oversized cargo',
    'Подбор платформы и схемы размещения для грузов нестандартных размеров.': 'Flatcar selection and load planning for cargo with non-standard dimensions.',
    'Сыпучие материалы': 'Bulk materials',
    'Перевозки сырья и материалов в подходящем типе железнодорожного состава.': 'Transport of raw materials and bulk goods using the right rolling stock.',
    'Вагон под любую задачу': 'A railcar for every task',
    'Предоставляем железнодорожный подвижной состав для различных типов грузов и способов погрузки.': 'We supply rolling stock for a wide range of cargo types and loading methods.',
    'Типы вагонов': 'Railcar types',
    'Полувагоны': 'Open-top wagons',
    'Сыпучие и навалочные грузы': 'Loose and bulk cargo',
    'Крытые': 'Covered wagons',
    'Грузы, требующие защиты от осадков': 'Cargo that needs protection from the weather',
    'Техника, оборудование и штучные грузы': 'Machinery, equipment and individual cargo units',
    'Лесовозные платформы': 'Timber flatcars',
    'Круглый лес и пиломатериалы': 'Logs and sawn timber',
    'Рельсы, трубы и длинномерные грузы': 'Rails, pipes and other long loads',
    'Щеповозы': 'Woodchip wagons',
    'Технологическая щепа и древесные отходы': 'Woodchips and wood waste',
    'Фитинговые': 'Container flatcars',
    'Контейнеры ISO, закрепляемые на платформе фитинговыми упорами.': 'ISO containers secured to the flatcar with container locks.',
    'Зерновозы': 'Grain hoppers',
    'Зерно и другие сыпучие сельхозгрузы. Погрузка сверху, выгрузка через нижние люки.': 'Grain and other bulk agricultural cargo. Top loading and bottom discharge.',
    'Объёмная модель лесовозной платформы. Перетащите, чтобы повернуть': '3D model of a timber flatcar. Drag to rotate.',
    '3D-просмотр недоступен': '3D view unavailable',
    '66 т / грузоподъёмность': '66 t / load capacity',
    '109 м³ / объём': '109 m³ / volume',
    'География перевозок': 'Delivery areas',
    'Один партнёр.': 'One partner.',
    'Большой маршрут.': 'Extensive reach.',
    'Организуем железнодорожные перевозки по России и международным направлениям: в страны СНГ, Иран и Китай.': 'We arrange rail freight across Russia and to international destinations in the CIS, Iran and China.',
    'Россия': 'Russia',
    'Страны СНГ': 'CIS countries',
    'Иран': 'Iran',
    'Китай': 'China',
    'Анимированная карта направлений перевозок из Санкт-Петербурга': 'Animated map of freight routes from St. Petersburg',
    'Санкт-Петербург': 'St. Petersburg',
    'для бизнеса': 'for businesses',
    'Перевозим лесопромышленные и сельскохозяйственные грузы, организуем доставку контейнеров и предоставляем пути для отстоя подвижного состава.': 'We move forest products, agricultural goods and containers by rail, and provide tracks for rolling stock storage.',
    'Карточки услуг. На мобильном экране листайте горизонтально': 'Services. Swipe horizontally on mobile.',
    'Железнодорожные перевозки грузов лесопромышленного комплекса': 'Rail freight for the forest products industry',
    'Железнодорожные перевозки контейнеров': 'Container transport by rail',
    'Железнодорожные перевозки агрокомплекса': 'Rail freight for agriculture',
    'Отстой подвижного состава': 'Rolling stock storage',
    'Телефон': 'Phone',
    'Адрес': 'Address',
    'Санкт-Петербург,': 'St. Petersburg, Russia',
    'ул. Беринга, 1': '1 Beringa Street',
    '2026. RailRu. Все права защищены': '2026. RailRu. All rights reserved',
    'Свяжитесь с нами удобным для вас способом': 'Get in touch in the way that suits you',
    'Юридическая информация': 'Company details',
    'Общество с ограниченной ответственностью «РЭЙЛРУ»': 'RailRu Limited Liability Company',
    'ИНН 7801559192': 'Tax ID (INN) 7801559192',
    'КПП 780101001': 'Tax registration code (KPP) 780101001',
    'ОГРН 1117847458508': 'Registration number (OGRN) 1117847458508',
    'Юридический адрес': 'Registered address',
    '199406, Санкт-Петербург, вн. тер. г. муниципальный округ Гавань, ул. Беринга, д. 1, литера А, помещ. 48-Н': '1 Beringa Street, building A, premises 48-N, Gavan Municipal District, St. Petersburg, 199406, Russia',
    'Расположение офиса RailRu: ул. Беринга, 1, Санкт-Петербург': 'RailRu office: 1 Beringa Street, St. Petersburg',
    'Открыть в OpenStreetMap ↗': 'Open in OpenStreetMap ↗',
    'Закрыть': 'Close',
    'Новый маршрут': 'New route',
    'Рассчитать маршрут': 'Get a quote',
    'Расскажите о перевозке, затем позвоните нам для расчёта.': 'Enter your shipment details, then call us for a quote.',
    'Откуда': 'From',
    'Куда': 'To',
    'Груз': 'Cargo',
    'Станция или город отправления': 'Origin station or city',
    'Станция или город назначения': 'Destination station or city',
    'Тип груза': 'Cargo type',
    'Подготовить запрос': 'Prepare request',
    'Позвонить для расчёта': 'Call for a quote',
  }));
  const nodes = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  while (nodes.nextNode()) {
    const node = nodes.currentNode;
    const value = node.data.trim();
    if (translations.has(value)) node.data = node.data.replace(value, translations.get(value));
  }
  for (const attr of ['aria-label', 'alt', 'title', 'placeholder', 'content']) {
    document.querySelectorAll(`[${attr}]`).forEach(element => {
      const value = element.getAttribute(attr);
      if (translations.has(value)) element.setAttribute(attr, translations.get(value));
    });
  }
})();
