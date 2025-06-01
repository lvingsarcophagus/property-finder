export type Language = "en" | "lt" | "ru"

export type TranslationKey =
  | "home"
  | "listings"
  | "dashboard"
  | "login"
  | "signup"
  | "findYourDreamProperty"
  | "viewAllListings"
  | "featuredProperties"
  | "searchProperties"
  | "propertyListings"
  | "searchResults"
  | "backToListings"
  | "forSale"
  | "forRent"
  | "location"
  | "rooms"
  | "area"
  | "heating"
  | "contactBroker"
  | "scheduleViewing"
  | "propertyDetails"
  | "description"
  | "amenities"
  | "floor"
  | "yearBuilt"
  | "type"
  | "city"
  | "cityPart"
  | "street"
  | "houseNumber"
  | "price"
  | "viewDetails"
  | "buildingMaterial"
  | "ownerInfo"
  | "ownerName"
  | "ownerPhone"
  | "ownerDescription"
  | "invoiceInfo"
  | "ownerInvoice"
  | "renterInvoice"
  | "addPhotos"
  | "uploadPhotos"
  | "myAccount"
  | "myProfile"
  | "logout"
  | "quickLinks"
  | "contact"
  | "followUs"
  | "findYourDreamPropertyWithEase"
  | "allRightsReserved"
  // New keys for subscriptions page
  | "subscriptionsTitle"
  | "subscriptionsSubtitle"
  | "freePlanName"
  | "freePlanDescription"
  | "freePlanPrice"
  | "priceMonth"
  | "freePlanFeature1"
  | "freePlanFeature2"
  | "freePlanFeature3"
  | "getStarted"
  | "basicPlanName"
  | "basicPlanDescription"
  | "basicPlanPrice"
  | "basicPlanFeature1"
  | "basicPlanFeature2"
  | "basicPlanFeature3"
  | "basicPlanFeature4"
  | "upgradeToBasic"
  | "premiumPlanName"
  | "premiumPlanDescription"
  | "premiumPlanPrice"
  | "premiumPlanFeature1"
  | "premiumPlanFeature2"
  | "premiumPlanFeature3"
  | "premiumPlanFeature4"
  | "premiumPlanFeature5"
  | "upgradeToPremium"
  | "currentPlanBadge"
  | "manageSubscriptionButton"
  | "chooseYourPlanTitle"
  | "chooseYourPlanSubtitle"
  | "subscribeButton"
  | "currentPlanButton"
  | "trialInfo"
  | "contactSalesLinkText"
  // Missing keys from previous attempt
  | "authenticationRequired"
  | "loginToSubscribe"
  | "subscriptionActivatedTitle"
  | "subscriptionActivatedDescription"
  | "needCustomPlanPrompt"
  | "subscriptionsTab"
  | "manageYourSubscriptionPrompt"
  | "goToSubscriptionsPageButton";

export const translations: Record<Language, Record<TranslationKey, string>> = {  en: {
    home: "Home",
    listings: "Listings",
    dashboard: "Dashboard",
    login: "Login",
    signup: "Sign Up",
    findYourDreamProperty: "Find Your Dream Property",
    viewAllListings: "View All Listings",
    featuredProperties: "Featured Properties",
    searchProperties: "Search Properties",
    propertyListings: "Property Listings",
    searchResults: "Search Results",
    backToListings: "Back to Listings",
    forSale: "For Sale",
    forRent: "For Rent",
    location: "Location",
    rooms: "Rooms",
    area: "Area",
    heating: "Heating",
    contactBroker: "Contact Broker",
    scheduleViewing: "Schedule Viewing",
    propertyDetails: "Property Details",
    description: "Description",
    amenities: "Amenities",
    floor: "Floor",
    yearBuilt: "Year Built",
    type: "Type",
    city: "City",
    cityPart: "City Part",
    street: "Street",
    houseNumber: "House Number",
    price: "Price",
    viewDetails: "View Details",
    buildingMaterial: "Building Material",
    ownerInfo: "Owner Information",
    ownerName: "Owner Name",
    ownerPhone: "Phone Number",
    ownerDescription: "Owner Description",
    invoiceInfo: "Invoice Information",
    ownerInvoice: "Invoice from owner",
    renterInvoice: "Invoice from renters",
    addPhotos: "Add Photos",
    uploadPhotos: "Upload Photos",    myAccount: "My Account",
    myProfile: "My Profile",
    logout: "Logout",
    quickLinks: "Quick Links",
    contact: "Contact",
    followUs: "Follow Us",
    findYourDreamPropertyWithEase: "Find your dream property with ease.",
    allRightsReserved: "All rights reserved.",
    // Subscriptions Page Translations
    subscriptionsTitle: "Choose Your Plan",
    subscriptionsSubtitle: "Select the perfect plan for your real estate business. All plans include access to our core features.",
    freePlanName: "Free",
    freePlanDescription: "Basic features for individuals starting out.",
    freePlanPrice: "€0",
    priceMonth: "month",
    freePlanFeature1: "Up to 5 listings",
    freePlanFeature2: "Basic analytics",
    freePlanFeature3: "Email support",
    getStarted: "Get Started",
    basicPlanName: "Basic",
    basicPlanDescription: "Perfect for individual agents",
    basicPlanPrice: "€9.99",
    basicPlanFeature1: "Up to 10 listings",
    basicPlanFeature2: "Basic analytics",
    basicPlanFeature3: "Email support",
    basicPlanFeature4: "Standard visibility",
    upgradeToBasic: "Upgrade to Basic",
    premiumPlanName: "Professional",
    premiumPlanDescription: "For growing real estate businesses",
    premiumPlanPrice: "€24.99",
    premiumPlanFeature1: "Up to 50 listings",
    premiumPlanFeature2: "Advanced analytics",
    premiumPlanFeature3: "Priority support",
    premiumPlanFeature4: "Featured listings",
    premiumPlanFeature5: "Property insights",
    upgradeToPremium: "Upgrade to Professional",
    currentPlanBadge: "Current Plan",
    manageSubscriptionButton: "Manage Subscription",
    chooseYourPlanTitle: "Choose Your Plan", // Already in use by existing page, but good to have a specific key
    chooseYourPlanSubtitle: "Select the perfect plan for your real estate business. All plans include access to our core features.", // Same as above
    subscribeButton: "Subscribe",
    currentPlanButton: "Current Plan",
    trialInfo: "All plans include a 14-day free trial. Cancel anytime.",
    contactSalesLinkText: "Contact our sales team",
    // Missing keys from previous attempt
    authenticationRequired: "Authentication required",
    loginToSubscribe: "Please log in to subscribe to a plan",
    subscriptionActivatedTitle: "Subscription activated",
    subscriptionActivatedDescription: "You are now subscribed to the", // Plan name will be appended
    needCustomPlanPrompt: "Need a custom plan?",
    subscriptionsTab: "Subscriptions",
    manageYourSubscriptionPrompt: "Review your current subscription details, manage your billing, or explore other plans.", // Updated text
    goToSubscriptionsPageButton: "Manage Subscription & Plans", // Updated text
  },  lt: {
    home: "Pagrindinis",
    listings: "Skelbimai",
    dashboard: "Valdymo Skydelis",
    login: "Prisijungti",
    signup: "Registruotis",
    findYourDreamProperty: "Raskite savo svajonių būstą",
    viewAllListings: "Peržiūrėti visus skelbimus",
    featuredProperties: "Rekomenduojami būstai",
    searchProperties: "Ieškoti būstų",
    propertyListings: "Nekilnojamojo turto skelbimai",
    searchResults: "Paieškos rezultatai",
    backToListings: "Grįžti į skelbimus",
    forSale: "Parduodama",
    forRent: "Nuomojama",
    location: "Vieta",
    rooms: "Kambariai",
    area: "Plotas",
    heating: "Šildymas",
    contactBroker: "Susisiekti su brokeriu",
    scheduleViewing: "Suplanuoti apžiūrą",
    propertyDetails: "Būsto informacija",
    description: "Aprašymas",
    amenities: "Patogumai",
    floor: "Aukštas",
    yearBuilt: "Statybos metai",
    type: "Tipas",
    city: "Miestas",
    cityPart: "Miesto dalis",
    street: "Gatvė",
    houseNumber: "Namo/buto numeris",
    price: "Kaina",
    viewDetails: "Peržiūrėti detaliau",
    buildingMaterial: "Statybinė medžiaga",
    ownerInfo: "Savininko informacija",
    ownerName: "Savininko vardas",
    ownerPhone: "Telefono numeris",
    ownerDescription: "Savininko aprašymas",
    invoiceInfo: "Sąskaitų informacija",
    ownerInvoice: "Sąskaita iš savininko",
    renterInvoice: "Sąskaita iš nuomininkų",
    addPhotos: "Pridėti nuotraukas",
    uploadPhotos: "Įkelti nuotraukas",    myAccount: "Mano paskyra",
    myProfile: "Mano profilis",
    logout: "Atsijungti",
    quickLinks: "Greitos nuorodos",
    contact: "Kontaktai",
    followUs: "Sekite mus",
    findYourDreamPropertyWithEase: "Lengvai raskite savo svajonių būstą.",
    allRightsReserved: "Visos teisės saugomos.",
    // Subscriptions Page Translations (Lithuanian)
    subscriptionsTitle: "Pasirinkite savo planą",
    subscriptionsSubtitle: "Pasirinkite idealų planą savo nekilnojamojo turto verslui. Visi planai apima prieigą prie mūsų pagrindinių funkcijų.",
    freePlanName: "Nemokamas",
    freePlanDescription: "Pagrindinės funkcijos pradedantiesiems.",
    freePlanPrice: "€0",
    priceMonth: "mėn.",
    freePlanFeature1: "Iki 5 skelbimų",
    freePlanFeature2: "Pagrindinė analitika",
    freePlanFeature3: "Pagalba el. paštu",
    getStarted: "Pradėti",
    basicPlanName: "Pagrindinis",
    basicPlanDescription: "Puikiai tinka individualiems agentams",
    basicPlanPrice: "€9.99",
    basicPlanFeature1: "Iki 10 skelbimų",
    basicPlanFeature2: "Pagrindinė analitika",
    basicPlanFeature3: "Pagalba el. paštu",
    basicPlanFeature4: "Standartinis matomumas",
    upgradeToBasic: "Atnaujinti į Pagrindinį",
    premiumPlanName: "Profesionalus",
    premiumPlanDescription: "Augantiems nekilnojamojo turto verslams",
    premiumPlanPrice: "€24.99",
    premiumPlanFeature1: "Iki 50 skelbimų",
    premiumPlanFeature2: "Išplėstinė analitika",
    premiumPlanFeature3: "Prioritetinė pagalba",
    premiumPlanFeature4: "Rekomenduojami skelbimai",
    premiumPlanFeature5: "Nuosavybės įžvalgos",
    upgradeToPremium: "Atnaujinti į Profesionalų",
    currentPlanBadge: "Dabartinis planas",
    manageSubscriptionButton: "Tvarkyti prenumeratą",
    chooseYourPlanTitle: "Pasirinkite savo planą",
    chooseYourPlanSubtitle: "Pasirinkite idealų planą savo nekilnojamojo turto verslui. Visi planai apima prieigą prie mūsų pagrindinių funkcijų.",
    subscribeButton: "Prenumeruoti",
    currentPlanButton: "Dabartinis planas",
    trialInfo: "Visi planai apima 14 dienų nemokamą bandomąjį laikotarpį. Atšaukti bet kada.",
    contactSalesLinkText: "Susisiekite su mūsų pardavimų komanda",
    // Missing keys from previous attempt (Lithuanian)
    authenticationRequired: "Reikalinga autentifikacija",
    loginToSubscribe: "Norėdami prenumeruoti planą, prisijunkite",
    subscriptionActivatedTitle: "Prenumerata aktyvuota",
    subscriptionActivatedDescription: "Jūs sėkmingai prenumeravote", // Plan name will be appended
    needCustomPlanPrompt: "Reikia individualaus plano?",
    subscriptionsTab: "Prenumeratos",
    manageYourSubscriptionPrompt: "Peržiūrėkite dabartinio prenumeratos plano informaciją, tvarkykite sąskaitas arba naršykite kitus planus.", // Updated text
    goToSubscriptionsPageButton: "Tvarkyti prenumeratą ir planus", // Updated text
  },  ru: {
    home: "Главная",
    listings: "Объявления",
    dashboard: "Панель управления",
    login: "Войти",
    signup: "Регистрация",
    findYourDreamProperty: "Найдите недвижимость своей мечты",
    viewAllListings: "Просмотреть все объявления",
    featuredProperties: "Рекомендуемые объекты",
    searchProperties: "Поиск недвижимости",
    propertyListings: "Объявления о недвижимости",
    searchResults: "Результаты поиска",
    backToListings: "Вернуться к объявлениям",
    forSale: "Продажа",
    forRent: "Аренда",
    location: "Местоположение",
    rooms: "Комнаты",
    area: "Площадь",
    heating: "Отопление",
    contactBroker: "Связаться с брокером",
    scheduleViewing: "Назначить просмотр",
    propertyDetails: "Сведения о недвижимости",
    description: "Описание",
    amenities: "Удобства",
    floor: "Этаж",
    yearBuilt: "Год постройки",
    type: "Тип",
    city: "Город",
    cityPart: "Район города",
    street: "Улица",
    houseNumber: "Номер дома",
    price: "Цена",
    viewDetails: "Посмотреть подробнее",
    buildingMaterial: "Материал здания",
    ownerInfo: "Информация о владельце",
    ownerName: "Имя владельца",
    ownerPhone: "Номер телефона",
    ownerDescription: "Описание владельца",
    invoiceInfo: "Информация о счетах",
    ownerInvoice: "Счет от владельца",
    renterInvoice: "Счет от арендаторов",
    addPhotos: "Добавить фотографии",
    uploadPhotos: "Загрузить фотографии",    myAccount: "Мой аккаунт",
    myProfile: "Мой профиль",
    logout: "Выйти",
    quickLinks: "Быстрые ссылки",
    contact: "Контакты",
    followUs: "Подписаться на нас",
    findYourDreamPropertyWithEase: "Легко найдите недвижимость своей мечты.",
    allRightsReserved: "Все права защищены.",
    // Subscriptions Page Translations (Russian)
    subscriptionsTitle: "Выберите свой план",
    subscriptionsSubtitle: "Выберите идеальный план для вашего бизнеса в сфере недвижимости. Все планы включают доступ к нашим основным функциям.",
    freePlanName: "Бесплатный",
    freePlanDescription: "Основные функции для начинающих.",
    freePlanPrice: "€0",
    priceMonth: "месяц",
    freePlanFeature1: "До 5 объявлений",
    freePlanFeature2: "Базовая аналитика",
    freePlanFeature3: "Поддержка по электронной почте",
    getStarted: "Начать",
    basicPlanName: "Базовый",
    basicPlanDescription: "Идеально подходит для индивидуальных агентов",
    basicPlanPrice: "€9.99",
    basicPlanFeature1: "До 10 объявлений",
    basicPlanFeature2: "Базовая аналитика",
    basicPlanFeature3: "Поддержка по электронной почте",
    basicPlanFeature4: "Стандартная видимость",
    upgradeToBasic: "Перейти на Базовый",
    premiumPlanName: "Профессиональный",
    premiumPlanDescription: "Для растущего бизнеса в сфере недвижимости",
    premiumPlanPrice: "€24.99",
    premiumPlanFeature1: "До 50 объявлений",
    premiumPlanFeature2: "Расширенная аналитика",
    premiumPlanFeature3: "Приоритетная поддержка",
    premiumPlanFeature4: "Рекомендуемые объявления",
    premiumPlanFeature5: "Аналитика недвижимости",
    upgradeToPremium: "Перейти на Профессиональный",
    currentPlanBadge: "Текущий план",
    manageSubscriptionButton: "Управлять подпиской",
    chooseYourPlanTitle: "Выберите свой план",
    chooseYourPlanSubtitle: "Выберите идеальный план для вашего бизнеса в сфере недвижимости. Все планы включают доступ к нашим основным функциям.",
    subscribeButton: "Подписаться",
    currentPlanButton: "Текущий план",
    trialInfo: "Все планы включают 14-дневный бесплатный пробный период. Отменить в любое время.",
    contactSalesLinkText: "Свяжитесь с нашим отделом продаж",
    // Missing keys from previous attempt (Russian)
    authenticationRequired: "Требуется аутентификация",
    loginToSubscribe: "Пожалуйста, войдите, чтобы подписаться на план",
    subscriptionActivatedTitle: "Подписка активирована",
    subscriptionActivatedDescription: "Вы успешно подписались на", // Plan name will be appended
    needCustomPlanPrompt: "Нужен индивидуальный план?",
    subscriptionsTab: "Подписки",
    manageYourSubscriptionPrompt: "Просмотрите сведения о текущей подписке, управляйте выставлением счетов или ознакомьтесь с другими планами.", // Updated text
    goToSubscriptionsPageButton: "Управление подпиской и планами", // Updated text
  },
}

