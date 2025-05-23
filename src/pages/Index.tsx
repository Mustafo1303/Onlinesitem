
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-uzbek-sky via-white to-uzbek-green">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-uzbek-blue mb-6">
            Xush kelibsiz
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Bizning tibbiy markaz va do'konimizga tashrif buyuring
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in">
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-uzbek-blue to-uzbek-sky rounded-full flex items-center justify-center">
                <span className="text-3xl">🏥</span>
              </div>
              <CardTitle className="text-2xl text-uzbek-blue">Tibbiy Markaz</CardTitle>
              <CardDescription className="text-lg">
                Tog'li hududdagi zamonaviy tibbiy markaz - barcha turdagi tibbiy xizmatlar
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>🔬 Laboratoriya xizmatlari</li>
                <li>🏨 Sanatoriya va dam olish joylari</li>
                <li>🍽️ Ovqatlanish xizmatlari</li>
                <li>👨‍⚕️ Malakali shifokorlar</li>
                <li>📅 Online band qilish</li>
              </ul>
              <Link to="/clinic">
                <Button className="w-full bg-uzbek-blue hover:bg-uzbek-blue/90 text-lg py-6">
                  Tibbiy Markazga Kirish
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in">
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-uzbek-green to-uzbek-gold rounded-full flex items-center justify-center">
                <span className="text-3xl">🛒</span>
              </div>
              <CardTitle className="text-2xl text-uzbek-green">Universal Do'kon</CardTitle>
              <CardDescription className="text-lg">
                Kiyim-kechak, oziq-ovqat, elektronika va uy jihozlari - hamma narsa bir joyda
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>👕 Kiyim-kechak</li>
                <li>🍎 Oziq-ovqat mahsulotlari</li>
                <li>📱 Elektronika</li>
                <li>🏠 Uy jihozlari</li>
                <li>🔍 Qidirish va filtrlar</li>
              </ul>
              <Link to="/store">
                <Button className="w-full bg-uzbek-green hover:bg-uzbek-green/90 text-lg py-6">
                  Do'konga Kirish
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-uzbek-mountain mb-4">
              Bizning Xizmatlarimiz
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Biz O'zbekistonda eng yaxshi tibbiy xizmatlar va eng keng assortimentdagi 
              do'kon mahsulotlarini taklif etamiz. Bizning maqsadimiz - sizning sog'ligingiz 
              va qulayligingizdir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
