# План разработки нового сайта vdanilov.com

(Версия 1 — 2025-08-21)

Полный маршрут от текущего WordPress сайта к современному сайту на **Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + (Mux/Cloudinary) + Vercel**.

## 0. Цели
- Быстрый (Core Web Vitals зелёные)
- Визуально современный (hero-видео, анимации без перегруза)
- Лёгкое обновление (MDX/JSON, затем опц. CMS)
- Автоматизация публикаций (ORCID)
- Масштабируемая архитектура (Server Components, ISR)

## 1. Аудит текущего сайта (кратко)
| Область | Сейчас | Улучшение |
|---------|--------|-----------|
| Hero | Статичный текст | Короткое петляющее видео + CTA |
| Повтор имени | Дублируется в секциях | Оставить 1–2 логических упоминания |
| Навигация | Повтор ссылок внизу | Чистый footer + sitemap | 
| Numbers Speak | 0% индикаторы | Реальные метрики + анимация | 
| Таймлайн опыта | Длинный текст | Сворачиваемые блоки / интерактив | 
| Портфолио | Без фильтров/видео | Фильтры + модалки + видео-демо | 
| Публикации | Статично | ORCID fetch + ISR кэш | 
| Контакты | Линки | Форма + валидация + защита | 

## 2. Стек (MVP)
- Next.js (App Router)
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui (добавим после scaffold CLI)
- Framer Motion
- Zod (валидация форм/данных)
- ESLint + Prettier + Husky + lint-staged
- Vitest (или Jest) + Playwright (позже)
- Vercel deploy
- (Позже) Mux / Cloudinary, Sanity CMS, Sentry, PostHog

## 3. Архитектура директорий (целевое)
```
app/
  layout.tsx
  page.tsx
  experience/
  education/
  projects/
  publications/
  contact/
  api/
    publications/route.ts
    contact/route.ts
components/
lib/
  orcid/
  utils/
content/
  projects/*.mdx
  references.json
public/
styles/
```

## 4. Итерации (Sprints)
### Sprint 1 — Scaffold & Базовая среда ✅
- [x] Next.js + TS + Tailwind
- [x] ESLint/Prettier/Husky
- [x] Layout (Header/Footer)
- [x] Deploy на Vercel
- [x] Добавить shadcn/ui (минимум: button, card, badge)

### Sprint 2 — Home MVP
- Hero (placeholder image → позже видео)
- Key Facts (3–4) + Logo Cloud (монохром)
- Проекты: 2–3 карточки (mock MDX)
- Метрики (mock)

### Sprint 3 — Анимации & Опыт
- Framer Motion (reveal секции)
- Таймлайн опыта (accordion / expandable)
- Счётчики (IntersectionObserver)
- Темная тема

### Sprint 4 — Публикации & Контакт
- ORCID API fetch (SSR + ISR 1d)
- PublicationList + фильтр по году/типу
- Contact form (Server Action) + email (Resend)
- Antispam (honeypot + минимальный таймер + rate limit)

### Sprint 5 — Видео & Портфолио
- Интеграция Mux или Cloudinary
- Hero видео
- Project modal с видеоплеером
- Категории (query params)

### Sprint 6 — SEO/Schema
- JSON-LD (Person, Article, Project)
- OG/Twitter динамические
- Sitemap/robots
- Lighthouse тюнинг

### Sprint 7 — Качество
- Vitest pure utils
- Playwright smoke
- Analytics события
- Error Boundary + Sentry (опц.)

### Sprint 8 — Дополнительно
- i18n (EN/RU)
- CMS (Sanity)
- OG image generation
- AI demo playground

## 5. Data Layer (первый этап)
- projects: MDX front-matter (`title`, `slug`, `tags`, `summary`, `videoId`, `tech`)
- publications: ORCID fetch → нормализация
- references: JSON массив

## 6. Ключевые компоненты
Hero, MainNav/MobileNav, ThemeToggle, Timeline, MetricsCounter, LogoCloud, ProjectCard/Modal, PublicationList/Filters, TestimonialsCarousel, ContactForm

## 7. Анимации (Guidelines)
- Fade + translateY на вход
- Stagger children (0.05–0.12s)
- Lazy-монтирование модалок и видео

## 8. Метрики успеха
- Lighthouse Perf ≥ 90, Acc ≥ 95
- Главный JS чанк < 180KB gzip
- Strict TS — 0 any в публичном коде
- Тесты: 80% покрытие утилит (к Sprint 7)

## 9. Безопасность форм
- Zod server+client
- Honeypot, min submit time, rate limit
- Sanitize MDX

## 10. CI/CD
- Vercel Preview по PR
- GitHub Actions: lint + typecheck + test
- Авто sitemap обновление

## 11. Будущее / Nice-to-have
- Edge middleware A/B hero
- Feature flags (PostHog)
- Scholar merge публикаций

## 12. Sprint 1 Чеклист (оперативный) ✅
- [x] Node LTS + npm
- [x] Scaffold
- [x] TypeScript
- [x] Base layout
- [x] Content структура
- [x] Dev server working

## 13. Следующий шаг
Запустить dev-сервер и протестировать базовый каркас.

Обновляйте файл после каждого sprint (дата + ретро + гл. выводы).
