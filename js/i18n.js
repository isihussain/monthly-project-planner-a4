/**
 * Localization dictionaries for A4 Monthly Project & Calendar Planner.
 * Supports: Turkish (TR), English (EN), German (DE), Russian (RU), Azerbaijani (AZ).
 */

const I18N = {
  tr: {
    appTitle: "A4 Planlayıcı",
    portrait: "Dikey (Portrait)",
    landscape: "Yatay (Landscape)",
    period: "Dönem:",
    prevMonth: "Önceki Ay",
    nextMonth: "Sonraki Ay",
    clearNumbers: "Tarihleri Temizle",
    sampleData: "Örnek Doldur",
    reset: "Şablonu Sıfırla",
    print: "Yazdır (A4)",
    save: "Kaydet",
    export: "Dışa Aktar",
    import: "İçe Aktar",
    toastSaved: "Plan tarayıcıya kaydedildi",
    toastImported: "Plan başarıyla yüklendi",
    months: ["OCAK", "ŞUBAT", "MART", "NİSAN", "MAYIS", "HAZİRAN", "TEMMUZ", "AĞUSTOS", "EYLÜL", "EKİM", "KASIM", "ARALIK"],
    monthsSelect: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
    days: ["PAZARTESİ", "SALI", "ÇARŞAMBA", "PERŞEMBE", "CUMA", "CUMARTESİ", "PAZAR"],
    daysShort: ["PZT", "SAL", "ÇAR", "PER", "CUM", "CMT", "PAZ"],
    mainTitle: "AYLIK PROJE & ZAMAN PLANI",
    subTitle: "YÜKSEK ÖNCELİKLİ HEDEFLER & GELECEK YOL HARİTASI",
    monthLabel: "AY",
    yearLabel: "YIL",
    focusLabel: "🎯 AYIN ANA HEDEFİ:",
    focusPlaceholder: "Bu ay tamamlanması gereken en kritik sonuç veya ana çıktı...",
    calTitle: "Aylık Takvim & Teslim Tarihleri",
    calTag: "Zaman Çizelgesi",
    curTitle: "Şimdiki Projeler (Aktif & Devam Eden)",
    curTag: "Bu Ay Teslim",
    futTitle: "Gelecek Projeler (Yol Haritası & Sıradakiler)",
    futTag: "Pipeline",
    notesTitle: "Kritik Notlar, Engeller & Bekleyen Kararlar",
    notesTag: "Risk & Takip",
    duePrefix: "Bitiş:",
    targetPrefix: "Hedef:",
    prereqLabel: "Ön Koşul:",
    priorityLabel: "Öncelik:",
    resourceLabel: "Kaynak:",
    statuses: ["Başladı", "%50", "Testte", "Bitti"],
    samples: {
      focus: "Müşteri paneli lansmanını tamamlamak ve ödeme sistemini canlıya almak.",
      current: [
        {
          title: "Web Sitesi Yenileme & Lansman",
          due: "15 Kasım",
          tasks: ["Kullanıcı arayüz testleri ve mobil kontroller", "Ödeme sistemi entegrasyonu ve onay", "Canlı ortama geçiş ve ilk yedekleme"]
        },
        {
          title: "Mobil Uygulama v2.0 Güncellemesi",
          due: "24 Kasım",
          tasks: ["Bildirim servisi hata ayıklaması", "App Store & Play Store inceleme gönderimi", "Kullanıcı kılavuzu ve sürüm notları yayını"]
        },
        {
          title: "Müşteri Veritabanı Optimizasyonu",
          due: "28 Kasım",
          tasks: ["İndekslerin ve sorgu sürelerinin analizi", "Eski logların arşivlenmesi ve temizliği", "Performans raporunun hazırlanması"]
        },
        {
          title: "Q4 Finansal ve Bütçe Planlaması",
          due: "30 Kasım",
          tasks: ["Hizmet ve sunucu giderlerinin dökümü", "Gelecek çeyrek yatırım kalemlerinin netleşmesi"]
        }
      ],
      future: [
        {
          title: "Otomasyon & CRM Entegrasyonu",
          target: "Aralık 2026",
          prereq: "Mevcut API anahtarları ve webhook rotaları hazır olmalı.",
          priority: "Yüksek",
          resource: "Dahili Ekip"
        },
        {
          title: "Yapay Zeka Destek Botu",
          target: "Ocak 2027",
          prereq: "Sık sorulan soruların ve dokümantasyonun güncellenmesi.",
          priority: "Orta",
          resource: "Ar-Ge"
        },
        {
          title: "Çok Dilli İçerik ve Küresel Açılım",
          target: "Q1 2027",
          prereq: "Çeviri altyapısı ve yerelleştirme şablonu.",
          priority: "Beklemede",
          resource: "Dış Destek"
        },
        {
          title: "Güvenlik Denetimi & Penetrasyon Testi",
          target: "Q1 2027",
          prereq: "Kod dondurma (code freeze) tarihi belirlenecek.",
          priority: "Yüksek",
          resource: "Güvenlik Uzmanı"
        }
      ],
      notes: [
        "3. taraf servis sağlayıcı sözleşme yenilemesi takip edilecek.",
        "Sunucu kapasite artırımı için onay bekleyen talep.",
        "Takım içi haftalık sprint değerlendirme toplantısı (Her Pazartesi)."
      ]
    }
  },
  en: {
    appTitle: "A4 Planner",
    portrait: "Portrait",
    landscape: "Landscape",
    period: "Period:",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    clearNumbers: "Clear Dates",
    sampleData: "Fill Samples",
    reset: "Reset Template",
    print: "Print (A4)",
    save: "Save Plan",
    export: "Export JSON",
    import: "Import JSON",
    toastSaved: "Plan saved locally",
    toastImported: "Plan loaded successfully",
    months: ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
    monthsSelect: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"],
    daysShort: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    mainTitle: "MONTHLY PROJECT & SCHEDULE PLANNER",
    subTitle: "HIGH-PRIORITY TARGETS & FUTURE ROADMAP",
    monthLabel: "MONTH",
    yearLabel: "YEAR",
    focusLabel: "🎯 MAIN FOCUS OF THE MONTH:",
    focusPlaceholder: "Primary outcome or milestone to achieve this month...",
    calTitle: "Monthly Calendar & Deadlines",
    calTag: "Timeline",
    curTitle: "Current Projects (Active & In Progress)",
    curTag: "Due This Month",
    futTitle: "Upcoming Projects (Roadmap & Pipeline)",
    futTag: "Pipeline",
    notesTitle: "Critical Notes, Blockers & Decisions",
    notesTag: "Risk & Action",
    duePrefix: "Due:",
    targetPrefix: "Target:",
    prereqLabel: "Prerequisite:",
    priorityLabel: "Priority:",
    resourceLabel: "Resource:",
    statuses: ["Started", "50%", "In Review", "Done"],
    samples: {
      focus: "Ship the refreshed client portal and enable Stripe billing.",
      current: [
        {
          title: "Website Redesign & Production Launch",
          due: "Nov 15",
          tasks: ["Run UI/UX audits and cross-device responsive checks", "Payment gateway integration & webhook tests", "Production migration and initial backup verification"]
        },
        {
          title: "Mobile App v2.0 Release",
          due: "Nov 24",
          tasks: ["Fix push notification delivery race condition", "Submit build to App Store & Google Play review", "Publish changelog and user onboarding documentation"]
        },
        {
          title: "Database Indexing & Query Tuning",
          due: "Nov 28",
          tasks: ["Audit slow queries and re-index transaction tables", "Archive obsolete log partitions", "Generate post-tuning performance benchmark report"]
        },
        {
          title: "Q4 Budgeting & Infrastructure Forecast",
          due: "Nov 30",
          tasks: ["Itemize cloud compute and SaaS vendor invoices", "Estimate next quarter compute and hiring budgets"]
        }
      ],
      future: [
        {
          title: "Automated CRM & Webhook Integration",
          target: "Dec 2026",
          prereq: "API keys generated and rate limits confirmed.",
          priority: "High",
          resource: "Core Team"
        },
        {
          title: "AI Support Assistant & Knowledge Base",
          target: "Jan 2027",
          prereq: "Update support docs and FAQ articles.",
          priority: "Medium",
          resource: "R&D"
        },
        {
          title: "Multi-Language Localization",
          target: "Q1 2027",
          prereq: "Extract i18n JSON strings and set up translation workflow.",
          priority: "Planned",
          resource: "Vendor"
        },
        {
          title: "Annual Security Audit & Penetration Test",
          target: "Q1 2027",
          prereq: "Enforce code freeze on core microservices.",
          priority: "High",
          resource: "Security"
        }
      ],
      notes: [
        "Contract renewal pending with cloud hosting provider.",
        "Hardware token replacement for infrastructure admins.",
        "Weekly sprint retro and release alignment every Monday."
      ]
    }
  },
  de: {
    appTitle: "A4 Planer",
    portrait: "Hochformat (Portrait)",
    landscape: "Querformat (Landscape)",
    period: "Zeitraum:",
    prevMonth: "Vorheriger Monat",
    nextMonth: "Nächster Monat",
    clearNumbers: "Tage leeren",
    sampleData: "Beispieldaten",
    reset: "Zurücksetzen",
    print: "Drucken (A4)",
    save: "Speichern",
    export: "Exportieren",
    import: "Importieren",
    toastSaved: "Plan lokal gespeichert",
    toastImported: "Plan erfolgreich geladen",
    months: ["JANUAR", "FEBRUAR", "MÄRZ", "APRIL", "MAI", "JUNI", "JULI", "AUGUST", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DEZEMBER"],
    monthsSelect: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    days: ["MONTAG", "DIENSTAG", "MITTWOCH", "DONNERSTAG", "FREITAG", "SAMSTAG", "SONNTAG"],
    daysShort: ["MO", "DI", "MI", "DO", "FR", "SA", "SO"],
    mainTitle: "MONATLICHER PROJEKT- & ZEITPLAN",
    subTitle: "HOHE PRIORITÄT & MEILENSTEIN-ROADMAP",
    monthLabel: "MONAT",
    yearLabel: "JAHR",
    focusLabel: "🎯 MONATLICHER FOKUS:",
    focusPlaceholder: "Das wichtigste Ergebnis oder Hauptziel für diesen Monat...",
    calTitle: "Monatskalender & Fristen",
    calTag: "Zeitplan",
    curTitle: "Aktuelle Projekte (In Bearbeitung)",
    curTag: "Lieferung diesen Monat",
    futTitle: "Zukünftige Projekte (Roadmap & Pipeline)",
    futTag: "Pipeline",
    notesTitle: "Kritische Notizen, Risiken & Hindernisse",
    notesTag: "Risiko & Nachverfolgung",
    duePrefix: "Frist:",
    targetPrefix: "Ziel:",
    prereqLabel: "Voraussetzung:",
    priorityLabel: "Priorität:",
    resourceLabel: "Ressource:",
    statuses: ["Gestartet", "50%", "Im Test", "Erledigt"],
    samples: {
      focus: "Abschluss des Kundenportals und Einführung des automatisierten Abrechnungssystems.",
      current: [
        {
          title: "Relaunch der Unternehmens-Website",
          due: "15. November",
          tasks: ["UI- und Usability-Tests auf Mobilgeräten", "Zahlungs-Gateway-Integration und Verifizierung", "Produktions-Deployment und DNS-Umschaltung"]
        },
        {
          title: "Mobile App v2.0 Release",
          due: "24. November",
          tasks: ["Behebung von Push-Notification-Latenzen", "App Store & Play Store Übermittlung", "Aktualisierung der Release Notes und Dokumentation"]
        },
        {
          title: "Datenbank-Performance-Optimierung",
          due: "28. November",
          tasks: ["Index-Analyse und Slow-Query-Refactoring", "Archivierung historischer Audit-Logs", "Erstellung des Auslastungsberichts"]
        },
        {
          title: "Budget- und Ressourcenplanung Q4",
          due: "30. November",
          tasks: ["Kostenübersicht für Cloud- und SaaS-Infrastruktur", "Definition der Investitionsschwerpunkte für das nächste Quartal"]
        }
      ],
      future: [
        {
          title: "CRM- und Workflow-Automatisierung",
          target: "Dezember 2026",
          prereq: "Vorbereitung der internen REST-API-Schnittstellen.",
          priority: "Hoch",
          resource: "Core Team"
        },
        {
          title: "KI-Support-Assistent Integration",
          target: "Januar 2027",
          prereq: "Aktualisierung der Wissensdatenbank und FAQs.",
          priority: "Mittel",
          resource: "DevOps"
        },
        {
          title: "ISO 27001 Sicherheits-Audit",
          target: "Februar 2027",
          prereq: "Abschluss der internen Penetrationstests.",
          priority: "Kritisch",
          resource: "Security"
        },
        {
          title: "Design System 3.0 Komponenten",
          target: "März 2027",
          prereq: "Freigabe der Figma UI-Token.",
          priority: "Niedrig",
          resource: "UI/UX"
        }
      ],
      notes: [
        "Wöchentliches Architektur-Sync jeden Dienstag um 10:00 Uhr.",
        "Wartungsfenster für DB-Cluster am 20. November von 02:00 bis 04:00 Uhr.",
        "Freigabe der Marketing-Assets bis spätestens 12. November erforderlich."
      ]
    }
  },
  ru: {
    appTitle: "A4 Планировщик",
    portrait: "Вертикальный",
    landscape: "Горизонтальный",
    period: "Период:",
    prevMonth: "Предыдущий месяц",
    nextMonth: "Следующий месяц",
    clearNumbers: "Очистить даты",
    sampleData: "Пример данных",
    reset: "Сбросить шаблон",
    print: "Печать (A4)",
    save: "Сохранить",
    export: "Экспорт JSON",
    import: "Импорт JSON",
    toastSaved: "План сохранен локально",
    toastImported: "План успешно загружен",
    months: ["ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ"],
    monthsSelect: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    days: ["ПОНЕДЕЛЬНИК", "ВТОРНИК", "СРЕДА", "ЧЕТВЕРГ", "ПЯТНИЦА", "СУББОТА", "ВОСКРЕСЕНЬЕ"],
    daysShort: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
    mainTitle: "ЕЖЕМЕСЯЧНЫЙ ПЛАН ПРОЕКТОВ И КАЛЕНДАРЬ",
    subTitle: "ПРИОРИТЕТНЫЕ ЦЕЛИ И ПЕРСПЕКТИВНЫЙ ПЛАН",
    monthLabel: "МЕСЯЦ",
    yearLabel: "ГОД",
    focusLabel: "🎯 ГЛАВНЫЙ ФОКУС МЕСЯЦА:",
    focusPlaceholder: "Ключевой результат или цель, которую необходимо закрыть...",
    calTitle: "Календарь на месяц и дедлайны",
    calTag: "Таймлайн",
    curTitle: "Текущие проекты (Активные и в работе)",
    curTag: "Сдача в этом месяце",
    futTitle: "Будущие проекты (План и дорожная карта)",
    futTag: "Очередь",
    notesTitle: "Важные заметки, блокеры и решения",
    notesTag: "Риски и контроль",
    duePrefix: "Срок:",
    targetPrefix: "План:",
    prereqLabel: "Условие:",
    priorityLabel: "Приоритет:",
    resourceLabel: "Ресурс:",
    statuses: ["Начат", "50%", "Тест", "Готов"],
    samples: {
      focus: "Завершить релиз клиентского портала и запустить прием платежей.",
      current: [
        {
          title: "Редизайн сайта и запуск в продакшн",
          due: "15 ноября",
          tasks: ["Тестирование мобильной верстки и UX сценариев", "Интеграция платёжного шлюза и проверка вебхуков", "Миграция базы и контрольный бэкап"]
        },
        {
          title: "Обновление мобильного приложения v2.0",
          due: "24 ноября",
          tasks: ["Исправление сбоев службы push-уведомлений", "Отправка сборки на модерацию в App Store и Play Market", "Публикация документации и списка изменений"]
        },
        {
          title: "Оптимизация базы данных и индексов",
          due: "28 ноября",
          tasks: ["Анализ медленных SQL-запросов и реиндексация", "Архивация устаревших системных логов", "Формирование отчета по производительности"]
        },
        {
          title: "Финансовый план и бюджет на Q4",
          due: "30 ноября",
          tasks: ["Аудит расходов на облачные сервера и сервисы", "Согласование бюджета на следующий квартал"]
        }
      ],
      future: [
        {
          title: "Автоматизация и интеграция с CRM",
          target: "Декабрь 2026",
          prereq: "Выпуск API ключей и настройка вебхуков.",
          priority: "Высокий",
          resource: "Команда разработки"
        },
        {
          title: "ИИ Ассистент службы поддержки",
          target: "Январь 2027",
          prereq: "Актуализация базы знаний и FAQ.",
          priority: "Средний",
          resource: "R&D отдел"
        },
        {
          title: "Мультиязычность и локализация",
          target: "Q1 2027",
          prereq: "Подготовка структуры файлов перевода.",
          priority: "В планах",
          resource: "Аутсорс"
        },
        {
          title: "Аудит безопасности и пентест",
          target: "Q1 2027",
          prereq: "Фиксация стабильной версии (code freeze).",
          priority: "Высокий",
          resource: "Инженер ИБ"
        }
      ],
      notes: [
        "Продление контракта с хостинг-провайдером до конца месяца.",
        "Запрос на расширение серверных мощностей на согласовании.",
        "Еженедельный спринт-митинг каждый понедельник в 10:00."
      ]
    }
  },
  az: {
    appTitle: "A4 Planlaşdırıcı",
    portrait: "Şaquli (Portrait)",
    landscape: "Üfüqi (Landscape)",
    period: "Dövr:",
    prevMonth: "Əvvəlki Ay",
    nextMonth: "Növbəti Ay",
    clearNumbers: "Tarixləri Təmizlə",
    sampleData: "Nümunə Doldur",
    reset: "Şablonu Sıfırla",
    print: "Çap et (A4)",
    save: "Yadda saxla",
    export: "İxrac et",
    import: "İdxal et",
    toastSaved: "Plan brauzerdə saxlanıldı",
    toastImported: "Plan uğurla yükləndi",
    months: ["YANVAR", "FEVRAL", "MART", "APREL", "MAY", "İYUN", "İYUL", "AVQUST", "SENTYABR", "OKTYABR", "NOYABR", "DEKABR"],
    monthsSelect: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"],
    days: ["BAZAR ERTƏSİ", "ÇƏRŞƏNBƏ AXŞAMI", "ÇƏRŞƏNBƏ", "CÜMƏ AXŞAMI", "CÜMƏ", "ŞƏNBƏ", "BAZAR"],
    daysShort: ["B.E", "Ç.A", "ÇƏR", "C.A", "CÜM", "ŞƏN", "BAZ"],
    mainTitle: "AYLIQ LAYİHƏ VƏ ZAMAN PLANI",
    subTitle: "YÜKSƏK PRİORİTETLİ HƏDƏFLƏR VƏ GƏLƏCƏK YOL XƏRİTƏSİ",
    monthLabel: "AY",
    yearLabel: "İL",
    focusLabel: "🎯 AYIN ƏSAS HƏDƏFİ:",
    focusPlaceholder: "Bu ay təhvil verilməli olan ən vacib nəticə və ya məhsul...",
    calTitle: "Aylıq Təqvim və Təhvil Tarixləri",
    calTag: "Zaman Qrafiki",
    curTitle: "Cari Layihələr (Aktiv və Davam Edən)",
    curTag: "Bu Ay Təhvil",
    futTitle: "Gələcək Layihələr (Yol Xəritəsi və Növbədəkilər)",
    futTag: "Pipeline",
    notesTitle: "Kritik Qeydlər, Maneələr və Qərarlar",
    notesTag: "Risk və Nəzarət",
    duePrefix: "Bitmə:",
    targetPrefix: "Hədəf:",
    prereqLabel: "İlkin Şərt:",
    priorityLabel: "Prioritet:",
    resourceLabel: "Resurs:",
    statuses: ["Başladı", "50%", "Testdə", "Bitdi"],
    samples: {
      focus: "Müştəri panelinin təhvil verilməsi və ödəniş sisteminin istifadəyə verilməsi.",
      current: [
        {
          title: "Veb Saytın Yenilənməsi və Buraxılış",
          due: "15 Noyabr",
          tasks: ["İstifadəçi interfeysi sınaqları və mobil uyğunluq", "Ödəniş sistemi inteqrasiyası və təsdiq", "Canlı mühitə keçid və ilkin ehtiyat nüsxəsi"]
        },
        {
          title: "Mobil Tətbiq v2.0 Yeniləməsi",
          due: "24 Noyabr",
          tasks: ["Bildiriş xidməti xətalarının aradan qaldırılması", "App Store və Google Play moderasiyasına göndərilmə", "Dəyişikliklər siyahısı və təlimatın hazırlanması"]
        },
        {
          title: "Məlumat Bazasının Optimizasiyası",
          due: "28 Noyabr",
          tasks: ["Yavaş sorğuların analizi və indeksləşdirmə", "Köhnə loqların arxivləşdirilməsi və təmizlənməsi", "Məhsuldarlıq hesabatının hazırlanması"]
        },
        {
          title: "Q4 Maliyyə və Büdcə Planlaması",
          due: "30 Noyabr",
          tasks: ["Bulud xidmətləri və proqram xərclərinin dökümü", "Növbəti rübün investisiya büdcəsinin təsdiqi"]
        }
      ],
      future: [
        {
          title: "Avtomatlaşdırma və CRM İnteqrasiyası",
          target: "Dekabr 2026",
          prereq: "API açarları və vebhook marşrutları hazır olmalıdır.",
          priority: "Yüksək",
          resource: "Daxili Komanda"
        },
        {
          title: "Süni İntellekt Dəstək Botu",
          target: "Yanvar 2027",
          prereq: "Tez-tez verilən suallar bazasının yenilənməsi.",
          priority: "Orta",
          resource: "Tədqiqat (Ar-Ge)"
        },
        {
          title: "Çoxdilli İnterfeys və Qlobal Yayım",
          target: "Q1 2027",
          prereq: "Tərcümə faylları strukturunun çıxarılması.",
          priority: "Gözləmədə",
          resource: "Xarici Dəstək"
        },
        {
          title: "Təhlükəsizlik Auditi və Sızma Testi",
          target: "Q1 2027",
          prereq: "Əsas kod bazasının dondurulması (code freeze).",
          priority: "Yüksək",
          resource: "İT Təhlükəsizlik"
        }
      ],
      notes: [
        "Server xidmət təminatçısı ilə müqavilənin yenilənməsi.",
        "Server tutumunun artırılması üçün təsdiq gözləyən müraciət.",
        "Hər Bazar ertəsi saat 10:00-da həftəlik sprint toplantısı."
      ]
    }
  }
};
