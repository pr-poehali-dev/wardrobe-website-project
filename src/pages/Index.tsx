import { useState } from "react";
import Icon from "@/components/ui/icon";

const HANGER_IMG = "https://cdn.poehali.dev/projects/060e43c7-3815-4533-ad81-7b84750573f0/files/78b9adc8-6823-46b6-bfe7-166a6b7423fd.jpg";
const DRAWER_IMG = "https://cdn.poehali.dev/projects/060e43c7-3815-4533-ad81-7b84750573f0/files/16c50724-9e6d-4f8d-bbef-334fd83dd41e.jpg";
const SHELF_IMG = "https://cdn.poehali.dev/projects/060e43c7-3815-4533-ad81-7b84750573f0/files/2663c753-582e-483b-9569-71462b4c981a.jpg";

type Section = "home" | "hangers" | "drawers" | "shelves" | "deals";

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

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "hangers", label: "Вешалки", icon: "GanttChart" },
  { id: "drawers", label: "Ящики", icon: "Package" },
  { id: "shelves", label: "Полки", icon: "Layers" },
  { id: "deals", label: "Товары дня", icon: "Zap" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [filterColor, setFilterColor] = useState("Все");
  const [filterSize, setFilterSize] = useState("Все");
  const [filterStyle, setFilterStyle] = useState("Все");
  const [filterPrice, setFilterPrice] = useState("Все");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-background text-foreground font-golos">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-oswald text-2xl font-bold tracking-widest neon-text-coral">WARDRY</span>
            <span className="text-xs text-muted-foreground font-golos hidden sm:block">/ организация гардероба</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
                {item.id === "deals" && (
                  <span className="ml-1 bg-neon-yellow text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">HOT</span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
              <Icon name="Heart" size={20} className="text-muted-foreground" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all">
              <Icon name="ShoppingBag" size={15} />
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
        {activeSection === "home" && (
          <div>
            <section className="relative overflow-hidden min-h-[90vh] flex items-center">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
              </div>

              <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="animate-fade-in">
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-primary/30 rounded-full px-4 py-2 text-sm text-primary mb-6">
                    <Icon name="Sparkles" size={14} />
                    Новая коллекция 2026
                  </div>
                  <h1 className="font-oswald text-5xl md:text-7xl font-bold leading-none mb-6">
                    <span className="text-foreground">ТВОЙ</span><br />
                    <span className="neon-text-coral">ИДЕАЛЬНЫЙ</span><br />
                    <span className="text-foreground">ГАРДЕРОБ</span>
                  </h1>
                  <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
                    Стильные вешалки, ящики и полки для организации пространства. Качество, которое видно сразу.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setActiveSection("hangers")}
                      className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-base hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-lg shadow-primary/30"
                    >
                      Смотреть каталог
                    </button>
                    <button
                      onClick={() => setActiveSection("deals")}
                      className="border border-neon-yellow/50 text-neon-yellow px-8 py-4 rounded-xl font-semibold text-base hover:bg-neon-yellow/10 transition-all"
                    >
                      <Icon name="Zap" size={16} className="inline mr-2" />
                      Товары дня
                    </button>
                  </div>
                  <div className="flex items-center gap-8 mt-10">
                    {[["500+", "товаров"], ["4.9★", "рейтинг"], ["1 день", "доставка"]].map(([val, label]) => (
                      <div key={label}>
                        <div className="font-oswald text-xl font-bold text-foreground">{val}</div>
                        <div className="text-xs text-muted-foreground">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative animate-slide-up hidden md:block">
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                    <img src={HANGER_IMG} alt="Гардероб" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 card-glass rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground">Хит продаж</div>
                          <div className="font-semibold text-foreground">Вешалка «Лофт»</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs line-through text-muted-foreground">2 890₽</div>
                          <div className="font-oswald text-xl font-bold neon-text-coral">2 290₽</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-neon-yellow text-black font-oswald font-bold text-sm px-3 py-2 rounded-xl rotate-6">
                    −21%
                  </div>
                </div>
              </div>
            </section>

            <div className="border-y border-border/50 py-4 overflow-hidden bg-white/2">
              <div className="flex animate-marquee whitespace-nowrap gap-12">
                {["ВЕШАЛКИ", "ЯЩИКИ", "ПОЛКИ", "НОВИНКИ", "СКИДКИ ДО 30%", "БЫСТРАЯ ДОСТАВКА", "ВЕШАЛКИ", "ЯЩИКИ", "ПОЛКИ", "НОВИНКИ", "СКИДКИ ДО 30%", "БЫСТРАЯ ДОСТАВКА"].map((t, i) => (
                  <span key={i} className="font-oswald text-sm tracking-widest text-muted-foreground/60 flex-shrink-0">
                    {t} <span className="text-primary/60 mx-4">◆</span>
                  </span>
                ))}
              </div>
            </div>

            <section className="max-w-7xl mx-auto px-4 py-20">
              <div className="mb-10">
                <div className="text-primary text-sm font-medium mb-2">РАЗДЕЛЫ</div>
                <h2 className="font-oswald text-4xl font-bold">Категории</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { id: "hangers" as Section, label: "Вешалки", sub: "Металл, дерево, пластик", img: HANGER_IMG, count: 48 },
                  { id: "drawers" as Section, label: "Ящики", sub: "Модульные системы", img: DRAWER_IMG, count: 36 },
                  { id: "shelves" as Section, label: "Полки", sub: "Открытые и закрытые", img: SHELF_IMG, count: 52 },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveSection(cat.id)}
                    className="group relative rounded-2xl overflow-hidden aspect-[4/3] text-left hover-lift cursor-pointer"
                  >
                    <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-xs text-muted-foreground mb-1">{cat.count} товаров</div>
                      <div className="font-oswald text-2xl font-bold text-foreground mb-1">{cat.label}</div>
                      <div className="text-sm text-muted-foreground">{cat.sub}</div>
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="ArrowRight" size={14} />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

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

            <div className="card-glass rounded-2xl p-5 mb-8 flex flex-wrap gap-6">
              <FilterGroup label="Цвет" items={COLORS} value={filterColor} onChange={setFilterColor} type="color" />
              <FilterGroup label="Размер" items={SIZES} value={filterSize} onChange={setFilterSize} />
              <FilterGroup label="Стиль" items={STYLES} value={filterStyle} onChange={setFilterStyle} />
              <FilterGroup label="Цена" items={PRICE_RANGES} value={filterPrice} onChange={setFilterPrice} />
            </div>

            <ProductGrid
              products={
                activeSection === "deals"
                  ? getDeals()
                  : getCategoryProducts(activeSection as "hangers" | "drawers" | "shelves")
              }
              wishlist={wishlist}
              onWishlist={toggleWishlist}
            />
          </div>
        )}
      </main>

      <footer className="border-t border-border/50 mt-20 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-oswald text-xl font-bold neon-text-coral">WARDRY</span>
          <p className="text-muted-foreground text-sm">Организация гардероба с характером</p>
          <div className="flex gap-4">
            {["О нас", "Доставка", "Контакты"].map((link) => (
              <button key={link} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function FilterGroup({
  label,
  items,
  value,
  onChange,
  type,
}: {
  label: string;
  items: string[];
  value: string;
  onChange: (v: string) => void;
  type?: "color";
}) {
  const COLOR_MAP: Record<string, string> = {
    "Белый": "#F5F5F5", "Чёрный": "#1A1A1A", "Коралловый": "#FF4D6D",
    "Мятный": "#00F5C4", "Серый": "#6B7280", "Фиолетовый": "#BF5AF2", "Бежевый": "#D4B896",
  };

  return (
    <div className="flex-1 min-w-[160px]">
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
              <span
                className="w-3 h-3 rounded-full border border-white/20 flex-shrink-0"
                style={{ background: COLOR_MAP[item] || "#888" }}
              />
            )}
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductGrid({
  products,
  wishlist,
  onWishlist,
}: {
  products: Product[];
  wishlist: number[];
  onWishlist: (id: number) => void;
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
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wide">
                  Новинка
                </span>
              )}
              {product.isDeal && (
                <span className="bg-neon-yellow text-black text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wide">
                  Хит дня
                </span>
              )}
            </div>
            <button
              onClick={() => onWishlist(product.id)}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                wishlist.includes(product.id)
                  ? "bg-primary text-primary-foreground"
                  : "bg-black/30 text-white/70 hover:bg-primary/80 hover:text-white"
              }`}
            >
              <Icon name="Heart" size={14} />
            </button>
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-full bg-primary text-primary-foreground py-2 rounded-xl text-sm font-semibold">
                В корзину
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-3 h-3 rounded-full border border-white/20 flex-shrink-0"
                style={{ background: product.colorHex }}
              />
              <span className="text-xs text-muted-foreground">{product.color}</span>
              <span className="text-xs text-muted-foreground ml-auto border border-border/50 px-1.5 py-0.5 rounded">
                {product.size}
              </span>
            </div>
            <h3 className="font-semibold text-foreground mb-1 text-sm">{product.name}</h3>
            <div className="text-xs text-muted-foreground mb-3">{product.style}</div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="font-oswald text-lg font-bold text-foreground">
                  {product.price.toLocaleString("ru")}₽
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {product.oldPrice.toLocaleString("ru")}₽
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <span className="text-xs font-bold text-neon-yellow">
                  −{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
