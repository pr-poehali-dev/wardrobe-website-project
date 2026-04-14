import { useState } from "react";
import Icon from "@/components/ui/icon";

const HANGER_IMG = "https://cdn.poehali.dev/projects/060e43c7-3815-4533-ad81-7b84750573f0/files/78b9adc8-6823-46b6-bfe7-166a6b7423fd.jpg";
const DRAWER_IMG = "https://cdn.poehali.dev/projects/060e43c7-3815-4533-ad81-7b84750573f0/files/16c50724-9e6d-4f8d-bbef-334fd83dd41e.jpg";
const SHELF_IMG = "https://cdn.poehali.dev/projects/060e43c7-3815-4533-ad81-7b84750573f0/files/2663c753-582e-483b-9569-71462b4c981a.jpg";

type Section = "home" | "hangers" | "drawers" | "shelves" | "deals" | "wishlist";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  color: string;
  colorHex: string;
  size: string;
  style: string;
  img: string;
  isNew?: boolean;
  isDeal?: boolean;
  category: "hangers" | "drawers" | "shelves";
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Вешалка «Нордик»", price: 1490, color: "Белый", colorHex: "#F5F5F5", size: "S", style: "Минимализм", img: HANGER_IMG, isNew: true, category: "hangers" },
  { id: 2, name: "Вешалка «Лофт»", price: 2290, oldPrice: 2890, color: "Чёрный", colorHex: "#1A1A1A", size: "M", style: "Лофт", img: HANGER_IMG, isDeal: true, category: "hangers" },
  { id: 3, name: "Вешалка «Коралл»", price: 1890, color: "Коралловый", colorHex: "#FF4D6D", size: "L", style: "Яркий", img: HANGER_IMG, category: "hangers" },
  { id: 4, name: "Вешалка «Натур»", price: 3200, color: "Бежевый", colorHex: "#D4B896", size: "XL", style: "Скандинав", img: HANGER_IMG, isNew: true, category: "hangers" },
  { id: 5, name: "Ящик «Минт»", price: 2100, color: "Мятный", colorHex: "#00F5C4", size: "S", style: "Яркий", img: DRAWER_IMG, category: "drawers" },
  { id: 6, name: "Ящик «Классик»", price: 1750, oldPrice: 2200, color: "Белый", colorHex: "#F5F5F5", size: "M", style: "Минимализм", img: DRAWER_IMG, isDeal: true, category: "drawers" },
  { id: 7, name: "Ящик «Дуо»", price: 3400, color: "Серый", colorHex: "#6B7280", size: "L", style: "Лофт", img: DRAWER_IMG, category: "drawers" },
  { id: 8, name: "Ящик «Виолет»", price: 2650, color: "Фиолетовый", colorHex: "#BF5AF2", size: "XL", style: "Яркий", img: DRAWER_IMG, isNew: true, category: "drawers" },
  { id: 9, name: "Полка «Скай»", price: 1980, color: "Белый", colorHex: "#F5F5F5", size: "S", style: "Скандинав", img: SHELF_IMG, category: "shelves" },
  { id: 10, name: "Полка «Индастри»", price: 4200, oldPrice: 5100, color: "Чёрный", colorHex: "#1A1A1A", size: "M", style: "Лофт", img: SHELF_IMG, isDeal: true, category: "shelves" },
  { id: 11, name: "Полка «Коралл»", price: 2850, color: "Коралловый", colorHex: "#FF4D6D", size: "L", style: "Яркий", img: SHELF_IMG, isNew: true, category: "shelves" },
  { id: 12, name: "Полка «Натурель»", price: 3600, color: "Бежевый", colorHex: "#D4B896", size: "XL", style: "Минимализм", img: SHELF_IMG, category: "shelves" },
];

const COLORS = ["Все", "Белый", "Чёрный", "Коралловый", "Мятный", "Серый", "Фиолетовый", "Бежевый"];
const SIZES = ["Все", "S", "M", "L", "XL"];
const STYLES = ["Все", "Минимализм", "Лофт", "Яркий", "Скандинав"];
const PRICE_RANGES = ["Все", "до 2000₽", "2000–3000₽", "от 3000₽"];

const COLOR_MAP: Record<string, string> = {
  "Белый": "#F5F5F5", "Чёрный": "#1A1A1A", "Коралловый": "#FF4D6D",
  "Мятный": "#00F5C4", "Серый": "#6B7280", "Фиолетовый": "#BF5AF2", "Бежевый": "#D4B896",
};

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "hangers", label: "Вешалки", icon: "GanttChart" },
  { id: "drawers", label: "Ящики", icon: "Package" },
  { id: "shelves", label: "Полки", icon: "Layers" },
  { id: "deals", label: "Товары дня", icon: "Zap" },
  { id: "wishlist", label: "Мой гардероб", icon: "Heart" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [filterColor, setFilterColor] = useState("Все");
  const [filterSize, setFilterSize] = useState("Все");
  const [filterStyle, setFilterStyle] = useState("Все");
  const [filterPrice, setFilterPrice] = useState("Все");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [raffleEmail, setRaffleEmail] = useState("");
  const [raffleJoined, setRaffleJoined] = useState(false);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const filterProducts = (products: Product[]) => {
    return products.filter((p) => {
      const colorOk = filterColor === "Все" || p.color === filterColor;
      const sizeOk = filterSize === "Все" || p.size === filterSize;
      const styleOk = filterStyle === "Все" || p.style === filterStyle;
      const priceOk =
        filterPrice === "Все" ||
        (filterPrice === "до 2000₽" && p.price < 2000) ||
        (filterPrice === "2000–3000₽" && p.price >= 2000 && p.price <= 3000) ||
        (filterPrice === "от 3000₽" && p.price > 3000);
      return colorOk && sizeOk && styleOk && priceOk;
    });
  };

  const getCategoryProducts = (cat: "hangers" | "drawers" | "shelves") =>
    filterProducts(PRODUCTS.filter((p) => p.category === cat));

  const getDeals = () => filterProducts(PRODUCTS.filter((p) => p.isDeal));
  const getWishlistProducts = () => PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background text-foreground font-golos">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-oswald text-2xl font-bold tracking-widest neon-text-coral">WARDRY</span>
            <span className="text-xs text-muted-foreground hidden sm:block">/ организация гардероба</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon} size={14} />
                {item.label}
                {item.id === "deals" && (
                  <span className="bg-neon-yellow text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">HOT</span>
                )}
                {item.id === "wishlist" && wishlist.length > 0 && (
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all">
              <Icon name="ShoppingBag" size={14} />
              Корзина
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-white/5">
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl p-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* ═══ ГЛАВНАЯ ═══ */}
        {activeSection === "home" && (
          <div>
            {/* Заголовок */}
            <section className="relative pt-14 pb-6 text-center">
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/8 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 max-w-2xl mx-auto px-4 animate-fade-in">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-primary/30 rounded-full px-4 py-1.5 text-sm text-primary mb-5">
                  <Icon name="Sparkles" size={13} />
                  Новая коллекция 2026
                </div>
                <h1 className="font-oswald text-5xl md:text-6xl font-bold leading-none mb-3">
                  <span className="text-foreground">ТВОЙ </span>
                  <span className="neon-text-coral">ИДЕАЛЬНЫЙ</span>
                  <span className="text-foreground"> ГАРДЕРОБ</span>
                </h1>
                <p className="text-muted-foreground">Нажми на полку — перейди в категорию</p>
              </div>
            </section>

            {/* Зона шкафа: фильтры по бокам, шкаф по центру */}
            <section className="max-w-6xl mx-auto px-4 pb-10">
              <div className="flex gap-4 items-start justify-center">

                {/* ЛЕВЫЙ ФИЛЬТР: Цвет + Размер */}
                <div className="hidden lg:flex flex-col gap-4 w-52 flex-shrink-0 pt-6">
                  <div className="card-glass rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Palette" size={14} className="text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Цвет</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {COLORS.filter(c => c !== "Все").map((c) => (
                        <button
                          key={c}
                          onClick={() => setFilterColor(filterColor === c ? "Все" : c)}
                          title={c}
                          className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${
                            filterColor === c ? "border-primary shadow-lg shadow-primary/40 scale-110" : "border-transparent"
                          }`}
                          style={{ background: COLOR_MAP[c] }}
                        />
                      ))}
                      {filterColor !== "Все" && (
                        <button onClick={() => setFilterColor("Все")} className="text-[10px] text-muted-foreground hover:text-foreground transition-colors mt-1">
                          сбросить
                        </button>
                      )}
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Ruler" size={13} className="text-primary" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Размер</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {SIZES.map((s) => (
                          <button
                            key={s}
                            onClick={() => setFilterSize(s)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                              filterSize === s
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                            }`}
                          >{s}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ШКАФ ПО ЦЕНТРУ */}
                <div className="flex-shrink-0 w-full max-w-sm">
                  <div className="relative mx-auto" style={{ width: "100%", maxWidth: 360 }}>
                    {/* Корпус шкафа */}
                    <div
                      className="relative rounded-2xl overflow-hidden border-2"
                      style={{
                        background: "linear-gradient(180deg, #1e1a2e 0%, #16121f 100%)",
                        borderColor: "#3d2f5e",
                        boxShadow: "0 0 40px rgba(191,90,242,0.15), inset 0 0 30px rgba(0,0,0,0.4)",
                      }}
                    >
                      {/* Верхняя перекладина */}
                      <div className="h-6 flex items-center justify-center"
                        style={{ background: "linear-gradient(90deg, #2d2045, #3d2f5e, #2d2045)" }}>
                        <div className="w-12 h-1.5 rounded-full" style={{ background: "#BF5AF2", boxShadow: "0 0 8px #BF5AF2" }} />
                      </div>

                      {/* Полки-кнопки */}
                      <div className="flex flex-col gap-0">
                        {[
                          { id: "hangers" as Section, label: "Вешалки", sub: "48 товаров", icon: "GanttChart", img: HANGER_IMG, color: "#FF4D6D", glow: "rgba(255,77,109,0.35)" },
                          { id: "drawers" as Section, label: "Ящики", sub: "36 товаров", icon: "Package", img: DRAWER_IMG, color: "#00F5C4", glow: "rgba(0,245,196,0.25)" },
                          { id: "shelves" as Section, label: "Полки", sub: "52 товара", icon: "Layers", img: SHELF_IMG, color: "#BF5AF2", glow: "rgba(191,90,242,0.3)" },
                          { id: "deals" as Section, label: "Товары дня", sub: "Хиты продаж", icon: "Zap", img: HANGER_IMG, color: "#FFE135", glow: "rgba(255,225,53,0.3)" },
                          { id: "wishlist" as Section, label: "Мой гардероб", sub: `${wishlist.length} избранных`, icon: "Heart", img: SHELF_IMG, color: "#FF4D6D", glow: "rgba(255,77,109,0.25)" },
                        ].map((shelf, idx) => (
                          <div key={shelf.id}>
                            {/* Полка */}
                            <button
                              onClick={() => setActiveSection(shelf.id)}
                              className="group w-full relative flex items-center justify-center gap-3 py-5 px-4 transition-all duration-200 hover:scale-[1.02]"
                              style={{
                                background: activeSection === shelf.id
                                  ? `linear-gradient(90deg, transparent, ${shelf.color}18, transparent)`
                                  : "transparent",
                              }}
                            >
                              {/* Фоновое изображение полки */}
                              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                <img src={shelf.img} className="w-full h-full object-cover" alt="" />
                              </div>
                              {/* Иконка слева */}
                              <div
                                className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                                style={{
                                  background: `${shelf.color}22`,
                                  border: `1.5px solid ${shelf.color}55`,
                                  boxShadow: `0 0 12px ${shelf.glow}`,
                                }}
                              >
                                <Icon name={shelf.icon} size={18} style={{ color: shelf.color }} />
                              </div>
                              {/* Текст по центру */}
                              <div className="relative z-10 text-center flex-1">
                                <div className="font-oswald font-bold text-lg text-foreground group-hover:text-white transition-colors">
                                  {shelf.label}
                                </div>
                                <div className="text-xs" style={{ color: shelf.color }}>{shelf.sub}</div>
                              </div>
                              {/* Стрелка */}
                              <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                              </div>
                              {/* Активный индикатор */}
                              {activeSection === shelf.id && (
                                <div
                                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                                  style={{ background: shelf.color, boxShadow: `0 0 8px ${shelf.color}` }}
                                />
                              )}
                            </button>
                            {/* Разделитель-полка */}
                            {idx < 4 && (
                              <div className="mx-3 h-[3px] rounded-full"
                                style={{ background: "linear-gradient(90deg, transparent, #3d2f5e, #5a3f80, #3d2f5e, transparent)" }}
                              />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Нижняя панель */}
                      <div className="h-5"
                        style={{ background: "linear-gradient(90deg, #2d2045, #3d2f5e, #2d2045)" }} />
                    </div>

                    {/* Ножки шкафа */}
                    <div className="flex justify-around px-8 mt-1">
                      {[0, 1].map((i) => (
                        <div key={i} className="w-3 h-4 rounded-b-md" style={{ background: "#2d2045", border: "1px solid #3d2f5e" }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ПРАВЫЙ ФИЛЬТР: Стиль + Цена */}
                <div className="hidden lg:flex flex-col gap-4 w-52 flex-shrink-0 pt-6">
                  <div className="card-glass rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Tag" size={14} className="text-accent" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Стиль</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {STYLES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setFilterStyle(s)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                            filterStyle === s
                              ? "border-accent text-accent-foreground bg-accent"
                              : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                          }`}
                        >{s}</button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Banknote" size={13} className="text-accent" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Цена</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {PRICE_RANGES.map((p) => (
                          <button
                            key={p}
                            onClick={() => setFilterPrice(p)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border text-left transition-all ${
                              filterPrice === p
                                ? "border-accent text-accent-foreground bg-accent"
                                : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                            }`}
                          >{p}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Мобильные фильтры (под шкафом) */}
              <div className="lg:hidden mt-5 card-glass rounded-2xl p-4 flex flex-wrap gap-4">
                <MiniFilter label="Цвет" items={COLORS} value={filterColor} onChange={setFilterColor} type="color" />
                <MiniFilter label="Размер" items={SIZES} value={filterSize} onChange={setFilterSize} />
                <MiniFilter label="Стиль" items={STYLES} value={filterStyle} onChange={setFilterStyle} />
                <MiniFilter label="Цена" items={PRICE_RANGES} value={filterPrice} onChange={setFilterPrice} />
              </div>
            </section>

            {/* Бегущая строка */}
            <div className="border-y border-border/50 py-3 overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap">
                {Array(2).fill(["ВЕШАЛКИ", "ЯЩИКИ", "ПОЛКИ", "НОВИНКИ", "СКИДКИ ДО 30%", "ДОСТАВКА ЗА 1 ДЕНЬ"]).flat().map((t, i) => (
                  <span key={i} className="font-oswald text-sm tracking-widest text-muted-foreground/50 flex-shrink-0 mx-4">
                    {t} <span className="text-primary/40">◆</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Еженедельный розыгрыш */}
            <section className="max-w-5xl mx-auto px-4 py-14">
              <div
                className="relative rounded-3xl overflow-hidden p-8 md:p-12"
                style={{
                  background: "linear-gradient(135deg, #1e1030 0%, #0f1e2e 50%, #1a0e28 100%)",
                  border: "1px solid rgba(191,90,242,0.3)",
                  boxShadow: "0 0 60px rgba(191,90,242,0.1)",
                }}
              >
                {/* Декоративный фон */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                  style={{ background: "rgba(191,90,242,0.12)" }} />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                  style={{ background: "rgba(255,77,109,0.08)" }} />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  {/* Иконка */}
                  <div className="flex-shrink-0 text-center">
                    <div
                      className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-2"
                      style={{ background: "rgba(191,90,242,0.15)", border: "1.5px solid rgba(191,90,242,0.4)", boxShadow: "0 0 30px rgba(191,90,242,0.3)" }}
                    >
                      <Icon name="Gift" size={44} style={{ color: "#BF5AF2" }} />
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">каждую пятницу</div>
                  </div>

                  {/* Текст */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full"
                      style={{ color: "#BF5AF2", background: "rgba(191,90,242,0.1)", border: "1px solid rgba(191,90,242,0.25)" }}>
                      <Icon name="Trophy" size={11} />
                      Еженедельный розыгрыш
                    </div>
                    <h2 className="font-oswald text-3xl md:text-4xl font-bold text-foreground mb-2">
                      Выиграй организатор<br />
                      <span style={{ color: "#BF5AF2" }}>гардероба</span> бесплатно
                    </h2>
                    <p className="text-muted-foreground text-sm mb-5 max-w-md">
                      Каждую пятницу разыгрываем комплект из вешалок, ящиков и полок на сумму <strong className="text-foreground">15 000₽</strong>. Участвуй — это бесплатно!
                    </p>

                    {raffleJoined ? (
                      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                        style={{ background: "rgba(0,245,196,0.15)", border: "1.5px solid rgba(0,245,196,0.4)", color: "#00F5C4" }}>
                        <Icon name="CheckCircle" size={16} />
                        Ты участвуешь! Удачи в пятницу 🎉
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                        <input
                          type="email"
                          placeholder="Твой email..."
                          value={raffleEmail}
                          onChange={(e) => setRaffleEmail(e.target.value)}
                          className="flex-1 px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-violet-500 transition-colors"
                        />
                        <button
                          onClick={() => raffleEmail && setRaffleJoined(true)}
                          className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 flex-shrink-0"
                          style={{
                            background: "linear-gradient(135deg, #BF5AF2, #9b3dd4)",
                            color: "white",
                            boxShadow: "0 4px 20px rgba(191,90,242,0.4)",
                          }}
                        >
                          Участвовать
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Счётчик участников */}
                  <div className="flex-shrink-0 text-center hidden md:block">
                    <div className="font-oswald text-4xl font-bold text-foreground">1 247</div>
                    <div className="text-xs text-muted-foreground mt-1">участников на этой неделе</div>
                    <div className="mt-3 flex -space-x-2 justify-center">
                      {["#FF4D6D", "#00F5C4", "#BF5AF2", "#FFE135", "#FF4D6D"].map((c, i) => (
                        <div key={i} className="w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[9px] font-bold text-black"
                          style={{ background: c }}>
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Товары дня */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-1.5 text-neon-yellow text-sm font-medium mb-1">
                    <Icon name="Zap" size={13} />
                    ТОЛЬКО СЕГОДНЯ
                  </div>
                  <h2 className="font-oswald text-4xl font-bold">Товары дня</h2>
                </div>
                <button onClick={() => setActiveSection("deals")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  Все акции <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <ProductGrid products={PRODUCTS.filter((p) => p.isDeal)} wishlist={wishlist} onWishlist={toggleWishlist} />
            </section>
          </div>
        )}

        {/* ═══ КАТАЛОГ ═══ */}
        {(activeSection === "hangers" || activeSection === "drawers" || activeSection === "shelves" || activeSection === "deals") && (
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="mb-8">
              <div className="text-primary text-sm font-medium mb-2">КАТАЛОГ</div>
              <h2 className="font-oswald text-4xl font-bold">
                {activeSection === "hangers" && "Вешалки"}
                {activeSection === "drawers" && "Ящики"}
                {activeSection === "shelves" && "Полки"}
                {activeSection === "deals" && (
                  <span className="flex items-center gap-3">
                    Товары дня <Icon name="Zap" size={28} className="text-neon-yellow" />
                  </span>
                )}
              </h2>
            </div>
            <div className="card-glass rounded-2xl p-5 mb-8 flex flex-wrap gap-5">
              <MiniFilter label="Цвет" items={COLORS} value={filterColor} onChange={setFilterColor} type="color" />
              <MiniFilter label="Размер" items={SIZES} value={filterSize} onChange={setFilterSize} />
              <MiniFilter label="Стиль" items={STYLES} value={filterStyle} onChange={setFilterStyle} />
              <MiniFilter label="Цена" items={PRICE_RANGES} value={filterPrice} onChange={setFilterPrice} />
            </div>
            <ProductGrid
              products={activeSection === "deals" ? getDeals() : getCategoryProducts(activeSection as "hangers" | "drawers" | "shelves")}
              wishlist={wishlist}
              onWishlist={toggleWishlist}
            />
          </div>
        )}

        {/* ═══ МОЙ ГАРДЕРОБ (ИЗБРАННОЕ) ═══ */}
        {activeSection === "wishlist" && (
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="mb-8">
              <div className="text-primary text-sm font-medium mb-2">ИЗБРАННОЕ</div>
              <h2 className="font-oswald text-4xl font-bold flex items-center gap-3">
                Мой гардероб
                <Icon name="Heart" size={28} className="text-primary" />
              </h2>
            </div>
            {getWishlistProducts().length === 0 ? (
              <div className="text-center py-32">
                <div
                  className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ background: "rgba(255,77,109,0.1)", border: "1.5px solid rgba(255,77,109,0.2)" }}
                >
                  <Icon name="Heart" size={40} className="text-primary opacity-50" />
                </div>
                <h3 className="font-oswald text-2xl font-bold mb-2">Гардероб пуст</h3>
                <p className="text-muted-foreground mb-6">Добавь товары в избранное — нажми ❤ на карточке</p>
                <button
                  onClick={() => setActiveSection("hangers")}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all"
                >
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-6">{getWishlistProducts().length} товаров в избранном</p>
                <ProductGrid products={getWishlistProducts()} wishlist={wishlist} onWishlist={toggleWishlist} />
              </>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-border/50 mt-10 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-oswald text-xl font-bold neon-text-coral">WARDRY</span>
          <p className="text-muted-foreground text-sm">Организация гардероба с характером</p>
          <div className="flex gap-4">
            {["О нас", "Доставка", "Контакты"].map((link) => (
              <button key={link} className="text-muted-foreground hover:text-foreground transition-colors text-sm">{link}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function MiniFilter({
  label, items, value, onChange, type,
}: {
  label: string; items: string[]; value: string; onChange: (v: string) => void; type?: "color";
}) {
  return (
    <div className="flex-1 min-w-[140px]">
      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              value === item
                ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30"
                : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            {type === "color" && item !== "Все" && (
              <span className="w-3 h-3 rounded-full border border-white/20 flex-shrink-0" style={{ background: COLOR_MAP[item] || "#888" }} />
            )}
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductGrid({
  products, wishlist, onWishlist,
}: {
  products: Product[]; wishlist: number[]; onWishlist: (id: number) => void;
}) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24 text-muted-foreground">
        <Icon name="PackageSearch" size={48} className="mx-auto mb-4 opacity-30" />
        <div className="text-lg">Товары не найдены</div>
        <div className="text-sm mt-1">Попробуй другие фильтры</div>
      </div>
    );
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <div key={product.id} className="group card-glass rounded-2xl overflow-hidden hover-lift border border-border/30">
          <div className="relative aspect-square overflow-hidden bg-muted/20">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wide">Новинка</span>
              )}
              {product.isDeal && (
                <span className="bg-neon-yellow text-black text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wide">Хит дня</span>
              )}
            </div>
            <button
              onClick={() => onWishlist(product.id)}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                wishlist.includes(product.id) ? "bg-primary text-primary-foreground" : "bg-black/30 text-white/70 hover:bg-primary/80 hover:text-white"
              }`}
            >
              <Icon name="Heart" size={14} />
            </button>
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-full bg-primary text-primary-foreground py-2 rounded-xl text-sm font-semibold">В корзину</button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full border border-white/20 flex-shrink-0" style={{ background: product.colorHex }} />
              <span className="text-xs text-muted-foreground">{product.color}</span>
              <span className="text-xs text-muted-foreground ml-auto border border-border/50 px-1.5 py-0.5 rounded">{product.size}</span>
            </div>
            <h3 className="font-semibold text-foreground mb-1 text-sm">{product.name}</h3>
            <div className="text-xs text-muted-foreground mb-3">{product.style}</div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="font-oswald text-lg font-bold text-foreground">{product.price.toLocaleString("ru")}₽</span>
                {product.oldPrice && (
                  <span className="text-xs text-muted-foreground line-through">{product.oldPrice.toLocaleString("ru")}₽</span>
                )}
              </div>
              {product.oldPrice && (
                <span className="text-xs font-bold text-neon-yellow">−{Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
