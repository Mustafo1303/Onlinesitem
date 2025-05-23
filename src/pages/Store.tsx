
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Home, Search, Filter, Cart, User, MapPin } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
  rating: number;
}

const Store = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [showProfile, setShowProfile] = useState(false);

  // Extended product data (100+ products)
  const products: Product[] = [
    // Kiyim-kechak (Clothing)
    { id: 1, name: "Erkaklar Ko'ylagi", category: "kiyim", price: 150000, description: "Yuqori sifatli paxta ko'ylak", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300", inStock: true, rating: 4.5 },
    { id: 2, name: "Ayollar Bluzasi", category: "kiyim", price: 120000, description: "Zamonaviy dizayndagi bluzka", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300", inStock: true, rating: 4.8 },
    { id: 3, name: "Bolalar Futbolkasi", category: "kiyim", price: 80000, description: "Yumshoq va qulay futbolka", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300", inStock: true, rating: 4.6 },
    { id: 4, name: "Jinsi Shim", category: "kiyim", price: 200000, description: "Chidamli jinsi shimlar", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300", inStock: true, rating: 4.7 },
    { id: 5, name: "Kuz Kurtka", category: "kiyim", price: 350000, description: "Issiq va chiroyli kurtka", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300", inStock: true, rating: 4.9 },
    
    // Oziq-ovqat (Food)
    { id: 6, name: "Organik Olma", category: "oziq-ovqat", price: 15000, description: "Toza organik olma, 1kg", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300", inStock: true, rating: 4.3 },
    { id: 7, name: "Non", category: "oziq-ovqat", price: 3000, description: "Yangi pishirilgan non", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300", inStock: true, rating: 4.5 },
    { id: 8, name: "Sut", category: "oziq-ovqat", price: 8000, description: "Toza fermer suti, 1 litr", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300", inStock: true, rating: 4.6 },
    { id: 9, name: "Tuxum", category: "oziq-ovqat", price: 25000, description: "Toza tovuq tuxumi, 10 dona", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300", inStock: true, rating: 4.4 },
    { id: 10, name: "Go'sht", category: "oziq-ovqat", price: 80000, description: "Yangi mol go'shti, 1kg", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300", inStock: true, rating: 4.7 },
    
    // Elektronika (Electronics)
    { id: 11, name: "Smartphone", category: "elektronika", price: 3500000, description: "Zamonaviy smartfon, 128GB", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300", inStock: true, rating: 4.8 },
    { id: 12, name: "Noutbuk", category: "elektronika", price: 8500000, description: "Yuqori unumdorlik, 16GB RAM", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300", inStock: true, rating: 4.9 },
    { id: 13, name: "Telefonlar", category: "elektronika", price: 150000, description: "Simsiz telefonlar", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300", inStock: true, rating: 4.2 },
    { id: 14, name: "Televizor", category: "elektronika", price: 4500000, description: "4K Smart TV, 55 dyuym", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300", inStock: true, rating: 4.6 },
    { id: 15, name: "Muzlatgich", category: "elektronika", price: 6500000, description: "Ikki kameranli muzlatgich", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300", inStock: true, rating: 4.5 },
    
    // Uy jihozlari (Home Goods)
    { id: 16, name: "Divan", category: "uy-jihozlari", price: 2500000, description: "Qulay va chiroyli divan", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300", inStock: true, rating: 4.7 },
    { id: 17, name: "Stol", category: "uy-jihozlari", price: 800000, description: "Yog'och ovqat stoli", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300", inStock: true, rating: 4.4 },
    { id: 18, name: "Kreslo", category: "uy-jihozlari", price: 450000, description: "Ofis kreslosi", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300", inStock: true, rating: 4.3 },
    { id: 19, name: "Shkaf", category: "uy-jihozlari", price: 1200000, description: "Katta gardirob shkafi", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300", inStock: true, rating: 4.6 },
    { id: 20, name: "Krovat", category: "uy-jihozlari", price: 1800000, description: "Qulay va mustahkam krovat", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300", inStock: true, rating: 4.8 },

    // Additional products to reach 100+
    // More clothing
    { id: 21, name: "Sport Kiyimi", category: "kiyim", price: 180000, description: "Sport uchun qulay kiyim", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300", inStock: true, rating: 4.4 },
    { id: 22, name: "Kechki Ko'ylak", category: "kiyim", price: 300000, description: "Maxsus tadbirlar uchun", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300", inStock: true, rating: 4.9 },
    { id: 23, name: "Ishki Kiyim", category: "kiyim", price: 100000, description: "Yumshoq va qulay", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300", inStock: true, rating: 4.5 },
    { id: 24, name: "Poyabzal", category: "kiyim", price: 250000, description: "Chiroyli va bardoshli", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300", inStock: true, rating: 4.6 },
    { id: 25, name: "Shlyapa", category: "kiyim", price: 80000, description: "Quyosh uchun himoya", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300", inStock: true, rating: 4.2 },

    // More food items
    { id: 26, name: "Guruch", category: "oziq-ovqat", price: 12000, description: "Premium guruch, 1kg", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300", inStock: true, rating: 4.5 },
    { id: 27, name: "Makaron", category: "oziq-ovqat", price: 8000, description: "Italyan makaron", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300", inStock: true, rating: 4.3 },
    { id: 28, name: "Yog'", category: "oziq-ovqat", price: 35000, description: "O'simlik yog'i, 1L", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300", inStock: true, rating: 4.4 },
    { id: 29, name: "Shakar", category: "oziq-ovqat", price: 15000, description: "Toza shakar, 1kg", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300", inStock: true, rating: 4.2 },
    { id: 30, name: "Choy", category: "oziq-ovqat", price: 45000, description: "Ko'k choy, premium", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300", inStock: true, rating: 4.7 },

    // Continue with more products across all categories...
    // Adding more products to reach 100+ (simplified for brevity)
    ...Array.from({ length: 70 }, (_, i) => ({
      id: 31 + i,
      name: `Mahsulot ${31 + i}`,
      category: ["kiyim", "oziq-ovqat", "elektronika", "uy-jihozlari"][i % 4],
      price: Math.floor(Math.random() * 1000000) + 10000,
      description: `Yuqori sifatli mahsulot №${31 + i}`,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300",
      inStock: Math.random() > 0.1,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10
    }))
  ];

  const categories = [
    { value: "all", label: "Barcha toifalar" },
    { value: "kiyim", label: "Kiyim-kechak" },
    { value: "oziq-ovqat", label: "Oziq-ovqat" },
    { value: "elektronika", label: "Elektronika" },
    { value: "uy-jihozlari", label: "Uy jihozlari" }
  ];

  const priceRanges = [
    { value: "all", label: "Barcha narxlar" },
    { value: "0-50000", label: "50,000 so'm gacha" },
    { value: "50000-200000", label: "50,000 - 200,000 so'm" },
    { value: "200000-1000000", label: "200,000 - 1,000,000 so'm" },
    { value: "1000000+", label: "1,000,000 so'm dan yuqori" }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      
      let matchesPrice = true;
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(p => p.replace("+", ""));
        const minPrice = parseInt(min);
        const maxPrice = max ? parseInt(max) : Infinity;
        matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      }
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, priceRange, products]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-uzbek-green/10 via-white to-uzbek-gold/10">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-uzbek-green hover:text-uzbek-green/80">
                <Home className="w-6 h-6" />
                <span>Bosh sahifa</span>
              </Link>
              <div className="text-2xl font-bold text-uzbek-green">Universal Do'kon</div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-uzbek-mountain">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">Toshkent, O'zbekiston</span>
              </div>
              
              {/* Shopping Cart */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Cart className="w-5 h-5" />
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-uzbek-green text-white">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-white">
                  <SheetHeader>
                    <SheetTitle>Savatcha</SheetTitle>
                    <SheetDescription>
                      Sizning tanlagan mahsulotlaringiz
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-8">
                    {cart.length === 0 ? (
                      <p className="text-gray-500 text-center">Savatcha bo'sh</p>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.product.name}</h3>
                              <p className="text-uzbek-green font-bold">{item.product.price.toLocaleString()} so'm</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Button size="sm" variant="outline" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</Button>
                                <span>{item.quantity}</span>
                                <Button size="sm" variant="outline" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</Button>
                                <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.product.id)}>Olib tashlash</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <Separator />
                        <div className="text-right">
                          <p className="text-2xl font-bold text-uzbek-green">
                            Jami: {cartTotal.toLocaleString()} so'm
                          </p>
                          <Button className="w-full mt-4 bg-uzbek-green hover:bg-uzbek-green/90">
                            Xarid qilish
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* User Profile */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <User className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-white">
                  <SheetHeader>
                    <SheetTitle>Foydalanuvchi Profili</SheetTitle>
                    <SheetDescription>
                      Shaxsiy ma'lumotlaringiz
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    <div>
                      <Label htmlFor="userName">Ism familiya</Label>
                      <Input id="userName" placeholder="Ismingizni kiriting" />
                    </div>
                    <div>
                      <Label htmlFor="userEmail">Email</Label>
                      <Input id="userEmail" type="email" placeholder="email@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="userPhone">Telefon</Label>
                      <Input id="userPhone" placeholder="+998 90 123 45 67" />
                    </div>
                    <div>
                      <Label htmlFor="userAddress">Manzil</Label>
                      <Input id="userAddress" placeholder="Yashash manzilingiz" />
                    </div>
                    <Button className="w-full bg-uzbek-green hover:bg-uzbek-green/90">
                      Saqlash
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-4 grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Mahsulotlarni qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Toifa tanlang" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Narx oralig'i" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-uzbek-green">
            Mahsulotlar ({filteredProducts.length})
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>Natijalar ko'rsatilmoqda</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in">
              <CardHeader className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <CardTitle className="text-lg text-uzbek-green">{product.name}</CardTitle>
                <CardDescription className="text-sm">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-uzbek-green">
                    {product.price.toLocaleString()} so'm
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                </div>
                <Button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className="w-full bg-uzbek-green hover:bg-uzbek-green/90 disabled:bg-gray-300"
                >
                  {product.inStock ? "Savatga qo'shish" : "Tugagan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-500">Hech qanday mahsulot topilmadi</p>
            <p className="text-gray-400 mt-2">Qidiruv shartlarini o'zgartiring</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-uzbek-mountain text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Bog'lanish</h3>
              <p>Telefon: +998 71 123 45 67</p>
              <p>Email: info@universaldokon.uz</p>
              <p>Manzil: Toshkent, O'zbekiston</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Toifalar</h3>
              <ul className="space-y-2">
                <li>Kiyim-kechak</li>
                <li>Oziq-ovqat</li>
                <li>Elektronika</li>
                <li>Uy jihozlari</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Xizmatlar</h3>
              <ul className="space-y-2">
                <li>Yetkazib berish</li>
                <li>Qaytarish</li>
                <li>Kafolat</li>
                <li>Yordam</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Ish vaqti</h3>
              <p>Dushanba - Yakshanba</p>
              <p>9:00 - 21:00</p>
              <p>Bayramlar: 10:00 - 18:00</p>
            </div>
          </div>
          <Separator className="my-8 bg-white/20" />
          <div className="text-center">
            <p>&copy; 2024 Universal Do'kon. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Store;
