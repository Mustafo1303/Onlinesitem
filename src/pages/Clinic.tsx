
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Home, MapPin, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const Clinic = () => {
  const [date, setDate] = useState<Date>();
  const [showBooking, setShowBooking] = useState(false);

  const services = [
    {
      title: "Laboratoriya Xizmatlari",
      description: "Zamonaviy uskunalar bilan barcha turdagi tahlillar",
      icon: "🔬",
      price: "50,000 so'm dan"
    },
    {
      title: "Sanatoriya",
      description: "Tog'li hududda dam olish va davolash",
      icon: "🏨",
      price: "200,000 so'm/kun"
    },
    {
      title: "Shifokorlar Konsultatsiyasi",
      description: "Malakali mutaxassislar bilan uchrashuv",
      icon: "👨‍⚕️",
      price: "80,000 so'm"
    },
    {
      title: "Ovqatlanish Xizmati",
      description: "Sog'lom va mazali ovqatlar",
      icon: "🍽️",
      price: "30,000 so'm"
    },
    {
      title: "Fizioterapiya",
      description: "Zamonaviy fizioterapiya usullari",
      icon: "💪",
      price: "60,000 so'm"
    },
    {
      title: "Dam Olish Zonalari",
      description: "Osoyishta muhitda dam olish",
      icon: "🌿",
      price: "25,000 so'm/soat"
    }
  ];

  const doctors = [
    { name: "Dr. Karimov Abdulla", specialty: "Kardiolog", experience: "15 yil" },
    { name: "Dr. Rahimova Nilufar", specialty: "Nevropatolog", experience: "12 yil" },
    { name: "Dr. Toshmatov Bekzod", specialty: "Ortoped", experience: "18 yil" },
    { name: "Dr. Nazarova Dilfuza", specialty: "Ginekolog", experience: "10 yil" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-uzbek-sky via-white to-uzbek-blue/20">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-uzbek-blue hover:text-uzbek-blue/80">
                <Home className="w-6 h-6" />
                <span>Bosh sahifa</span>
              </Link>
              <div className="text-2xl font-bold text-uzbek-blue">Tog'li Tibbiy Markaz</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-uzbek-mountain">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">Chirchiq, Toshkent viloyati</span>
              </div>
              <Button onClick={() => setShowBooking(!showBooking)} className="bg-uzbek-green hover:bg-uzbek-green/90">
                Band qilish
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-uzbek-blue/10 to-uzbek-sky/10">
        <div className="container mx-auto px-4 text-center">
          <img 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=400&fit=crop" 
            alt="Tog'li hudud" 
            className="w-full h-64 object-cover rounded-2xl mb-8 shadow-2xl"
          />
          <h1 className="text-5xl font-bold text-uzbek-blue mb-6 animate-fade-in">
            Tog'li Hududdagi Zamonaviy Tibbiy Markaz
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 animate-fade-in">
            Bizda siz eng yuqori sifatli tibbiy xizmatlar, dam olish imkoniyatlari va 
            professional shifokorlar xizmatidan foydalanishingiz mumkin.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      {showBooking && (
        <section className="py-8 bg-uzbek-blue/5 border-y">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-uzbek-blue flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  Qabulga yozilish
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ism familiya</Label>
                    <Input id="name" placeholder="Ismingizni kiriting" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon raqam</Label>
                    <Input id="phone" placeholder="+998 90 123 45 67" />
                  </div>
                  <div>
                    <Label>Shifokor tanlang</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Shifokorni tanlang" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {doctors.map((doctor, index) => (
                          <SelectItem key={index} value={doctor.name}>
                            {doctor.name} - {doctor.specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Sana tanlang</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Sanani tanlang"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Qo'shimcha ma'lumot</Label>
                    <Textarea id="notes" placeholder="Kasallik tarixi yoki qo'shimcha ma'lumotlar" />
                  </div>
                </div>
                <Button className="w-full mt-6 bg-uzbek-green hover:bg-uzbek-green/90">
                  Qabulga yozilish
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-uzbek-blue mb-12">
            Bizning Xizmatlarimiz
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-uzbek-blue">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-uzbek-green mb-4">{service.price}</div>
                  <Button variant="outline" className="w-full border-uzbek-blue text-uzbek-blue hover:bg-uzbek-blue hover:text-white">
                    Batafsil ma'lumot
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16 bg-uzbek-blue/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-uzbek-blue mb-12">
            Bizning Shifokorlar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto bg-uzbek-blue/10 rounded-full flex items-center justify-center mb-4">
                    <User className="w-10 h-10 text-uzbek-blue" />
                  </div>
                  <CardTitle className="text-lg text-uzbek-blue">{doctor.name}</CardTitle>
                  <CardDescription>{doctor.specialty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    Tajriba: {doctor.experience}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-uzbek-blue mb-12">
            Markaz Galereyasi
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <img 
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop" 
              alt="Tog'li manzara" 
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
            <img 
              src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop" 
              alt="Gullar" 
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
            <img 
              src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop" 
              alt="Tabiat" 
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-uzbek-mountain text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Bog'lanish</h3>
              <p>Telefon: +998 71 123 45 67</p>
              <p>Email: info@togtibbiy.uz</p>
              <p>Manzil: Chirchiq, Toshkent viloyati</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Ish vaqti</h3>
              <p>Dushanba - Juma: 8:00 - 18:00</p>
              <p>Shanba: 9:00 - 15:00</p>
              <p>Yakshanba: Dam olish kuni</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Qo'shimcha</h3>
              <p>Favqulodda vaziyatlar: 103</p>
              <p>Ambulatoriya: +998 71 987 65 43</p>
              <p>Sanatoriya: +998 71 111 22 33</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Clinic;
