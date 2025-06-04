export type Language = "en" | "lt" | "ru"

export type TranslationKey =
  | "dashboard"
  | "properties"
  | "clients"
  | "calendar"
  | "messages"
  | "analytics"
  | "settings"
  | "profile"
  | "subscription"
  | "searchProperties"
  | "propertyListings"
  | "viewDetails"
  | "euro"
  | "welcome"
  | "totalProperties"
  | "activeClients"
  | "monthlyRevenue"
  | "recentActivity"
  | "viewAll"
  | "addNew"
  | "edit"
  | "delete"
  | "save"
  | "cancel"
  | "loading"
  | "error"
  | "success"
  | "login"
  | "logout"
  | "signup"
  | "email"
  | "password"
  | "name"
  | "phone"
  | "address"
  | "price"
  | "bedrooms"
  | "bathrooms"
  | "area"
  | "type"
  | "status"
  | "featured"
  | "new"
  | "sold"
  | "pending"
  | "home"
  | "bookAppointment"
  | "contactUs"
  | "services"
  | "aboutUs"
  | "blog"
  | "testimonials"
  | "privacyPolicy"
  | "gdpr"

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    dashboard: "Dashboard",
    properties: "Properties",
    clients: "Clients",
    calendar: "Calendar",
    messages: "Messages",
    analytics: "Analytics",
    settings: "Settings",
    profile: "Profile",
    subscription: "Subscription",
    searchProperties: "Search properties...",
    propertyListings: "Property Listings",
    viewDetails: "View Details",
    euro: "€",
    welcome: "Welcome",
    totalProperties: "Total Properties",
    activeClients: "Active Clients",
    monthlyRevenue: "Monthly Revenue",
    recentActivity: "Recent Activity",
    viewAll: "View All",
    addNew: "Add New",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    login: "Login",
    logout: "Logout",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    name: "Name",
    phone: "Phone",
    address: "Address",
    price: "Price",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    area: "Area",
    type: "Type",
    status: "Status",
    featured: "Featured",
    new: "New",
    sold: "Sold",
    pending: "Pending",
    home: "Home",
    bookAppointment: "Book Appointment",
    contactUs: "Contact Us",
    services: "Services",
    aboutUs: "About Us",
    blog: "Blog",
    testimonials: "Testimonials",
    privacyPolicy: "Privacy Policy",
    gdpr: "GDPR",
  },
  lt: {
    dashboard: "Valdymo skydas",
    properties: "Nekilnojamasis turtas",
    clients: "Klientai",
    calendar: "Kalendorius",
    messages: "Žinutės",
    analytics: "Analitika",
    settings: "Nustatymai",
    profile: "Profilis",
    subscription: "Prenumerata",
    searchProperties: "Ieškoti nekilnojamojo turto...",
    propertyListings: "Nekilnojamojo turto sąrašas",
    viewDetails: "Žiūrėti detaliau",
    euro: "€",
    welcome: "Sveiki",
    totalProperties: "Iš viso objektų",
    activeClients: "Aktyvūs klientai",
    monthlyRevenue: "Mėnesio pajamos",
    recentActivity: "Paskutinė veikla",
    viewAll: "Žiūrėti visus",
    addNew: "Pridėti naują",
    edit: "Redaguoti",
    delete: "Ištrinti",
    save: "Išsaugoti",
    cancel: "Atšaukti",
    loading: "Kraunama...",
    error: "Klaida",
    success: "Sėkmė",
    login: "Prisijungti",
    logout: "Atsijungti",
    signup: "Registruotis",
    email: "El. paštas",
    password: "Slaptažodis",
    name: "Vardas",
    phone: "Telefonas",
    address: "Adresas",
    price: "Kaina",
    bedrooms: "Miegamieji",
    bathrooms: "Vonios kambariai",
    area: "Plotas",
    type: "Tipas",
    status: "Būsena",
    featured: "Rekomenduojamas",
    new: "Naujas",
    sold: "Parduotas",
    pending: "Laukiantis",
    home: "[LT] Home",
    bookAppointment: "[LT] Book Appointment",
    contactUs: "[LT] Contact Us",
    services: "[LT] Services",
    aboutUs: "[LT] About Us",
    blog: "[LT] Blog",
    testimonials: "[LT] Testimonials",
    privacyPolicy: "[LT] Privacy Policy",
    gdpr: "[LT] GDPR",
  },
  ru: {
    dashboard: "Панель управления",
    properties: "Недвижимость",
    clients: "Клиенты",
    calendar: "Календарь",
    messages: "Сообщения",
    analytics: "Аналитика",
    settings: "Настройки",
    profile: "Профиль",
    subscription: "Подписка",
    searchProperties: "Поиск недвижимости...",
    propertyListings: "Список недвижимости",
    viewDetails: "Посмотреть детали",
    euro: "€",
    welcome: "Добро пожаловать",
    totalProperties: "Всего объектов",
    activeClients: "Активные клиенты",
    monthlyRevenue: "Месячный доход",
    recentActivity: "Последняя активность",
    viewAll: "Посмотреть все",
    addNew: "Добавить новый",
    edit: "Редактировать",
    delete: "Удалить",
    save: "Сохранить",
    cancel: "Отмена",
    loading: "Загрузка...",
    error: "Ошибка",
    success: "Успех",
    login: "Войти",
    logout: "Выйти",
    signup: "Регистрация",
    email: "Эл. почта",
    password: "Пароль",
    name: "Имя",
    phone: "Телефон",
    address: "Адрес",
    price: "Цена",
    bedrooms: "Спальни",
    bathrooms: "Ванные комнаты",
    area: "Площадь",
    type: "Тип",
    status: "Статус",
    featured: "Рекомендуемый",
    new: "Новый",
    sold: "Продан",
    pending: "В ожидании",
    home: "[RU] Home",
    bookAppointment: "[RU] Book Appointment",
    contactUs: "[RU] Contact Us",
    services: "[RU] Services",
    aboutUs: "[RU] About Us",
    blog: "[RU] Blog",
    testimonials: "[RU] Testimonials",
    privacyPolicy: "[RU] Privacy Policy",
    gdpr: "[RU] GDPR",
  },
}
