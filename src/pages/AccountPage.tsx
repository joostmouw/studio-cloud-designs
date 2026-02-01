import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  User,
  Package,
  MapPin,
  LogOut,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  Star,
} from 'lucide-react';
import { Address } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const addressSchema = z.object({
  firstName: z.string().min(2, 'Voornaam is verplicht'),
  lastName: z.string().min(2, 'Achternaam is verplicht'),
  street: z.string().min(2, 'Straatnaam is verplicht'),
  houseNumber: z.string().min(1, 'Huisnummer is verplicht'),
  houseNumberAddition: z.string().optional(),
  postalCode: z.string().regex(/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/, 'Ongeldige postcode'),
  city: z.string().min(2, 'Plaats is verplicht'),
  phone: z.string().optional(),
});

type AddressFormData = z.infer<typeof addressSchema>;

const AccountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    isAuthenticated,
    logout,
    updateUser,
    orders,
    addAddress,
    updateAddress,
    deleteAddress,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'orders' || hash === 'addresses' || hash === 'profile') {
      setActiveTab(hash);
    }
  }, [location]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const handleOpenAddressDialog = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      reset(address);
    } else {
      setEditingAddress(null);
      reset({});
    }
    setIsAddressDialogOpen(true);
  };

  const onAddressSubmit = (data: AddressFormData) => {
    if (editingAddress) {
      updateAddress({
        ...editingAddress,
        ...data,
      });
    } else {
      addAddress({
        ...data,
        country: 'Nederland',
      });
    }
    setIsAddressDialogOpen(false);
    reset({});
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 lg:pt-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-light tracking-wide">
                Hallo, {user.firstName}
              </h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="self-start"
            >
              <LogOut size={16} className="mr-2" />
              Uitloggen
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-border mb-8 overflow-x-auto">
            {[
              { id: 'profile', label: 'Profiel', icon: User },
              { id: 'orders', label: 'Bestellingen', icon: Package },
              { id: 'addresses', label: 'Adressen', icon: MapPin },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  navigate(`#${tab.id}`);
                }}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
                {tab.id === 'orders' && orders.length > 0 && (
                  <span className="bg-foreground text-background text-xs px-1.5 py-0.5 rounded-full">
                    {orders.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white border border-border rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Persoonlijke gegevens</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Voornaam</Label>
                    <Input
                      id="firstName"
                      defaultValue={user.firstName}
                      onChange={(e) => updateUser({ firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Achternaam</Label>
                    <Input
                      id="lastName"
                      defaultValue={user.lastName}
                      onChange={(e) => updateUser({ lastName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mailadres</Label>
                    <Input id="email" value={user.email} disabled className="bg-secondary/50" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefoonnummer</Label>
                    <Input
                      id="phone"
                      defaultValue={user.phone || ''}
                      onChange={(e) => updateUser({ phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('orders')}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Package size={20} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium">Bestellingen</p>
                      <p className="text-sm text-muted-foreground">
                        {orders.length} bestelling{orders.length !== 1 ? 'en' : ''}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium">Adressen</p>
                      <p className="text-sm text-muted-foreground">
                        {user.addresses.length} adres{user.addresses.length !== 1 ? 'sen' : ''}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl font-light mb-2">Nog geen bestellingen</h2>
                  <p className="text-muted-foreground mb-6">
                    Je hebt nog geen bestellingen geplaatst.
                  </p>
                  <Button onClick={() => navigate('/')}>Bekijk collectie</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Link
                      key={order.id}
                      to={`/order-confirmation/${order.id}`}
                      className="block border border-border rounded-lg p-4 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{order.orderNumber}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'shipped'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.status === 'confirmed' && 'Bevestigd'}
                              {order.status === 'shipped' && 'Verzonden'}
                              {order.status === 'delivered' && 'Bezorgd'}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString('nl-NL', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex -space-x-2">
                            {order.items.slice(0, 3).map((item, index) => (
                              <div
                                key={index}
                                className="w-10 h-10 rounded-full border-2 border-white"
                                style={{ backgroundColor: item.selectedColor.value }}
                              />
                            ))}
                          </div>
                          <div className="text-right">
                            <p className="font-medium">€{order.total.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.items.length} artikel{order.items.length !== 1 ? 'en' : ''}
                            </p>
                          </div>
                          <ChevronRight size={18} className="text-muted-foreground" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Opgeslagen adressen</h2>
                <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenAddressDialog()}
                    >
                      <Plus size={16} className="mr-2" />
                      Adres toevoegen
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingAddress ? 'Adres bewerken' : 'Nieuw adres toevoegen'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onAddressSubmit)} className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="addr-firstName">Voornaam</Label>
                          <Input
                            id="addr-firstName"
                            {...register('firstName')}
                            className={errors.firstName ? 'border-destructive' : ''}
                          />
                        </div>
                        <div>
                          <Label htmlFor="addr-lastName">Achternaam</Label>
                          <Input
                            id="addr-lastName"
                            {...register('lastName')}
                            className={errors.lastName ? 'border-destructive' : ''}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="addr-street">Straat</Label>
                          <Input
                            id="addr-street"
                            {...register('street')}
                            className={errors.street ? 'border-destructive' : ''}
                          />
                        </div>
                        <div>
                          <Label htmlFor="addr-houseNumber">Huisnr.</Label>
                          <Input
                            id="addr-houseNumber"
                            {...register('houseNumber')}
                            className={errors.houseNumber ? 'border-destructive' : ''}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="addr-postalCode">Postcode</Label>
                          <Input
                            id="addr-postalCode"
                            {...register('postalCode')}
                            placeholder="1234 AB"
                            className={errors.postalCode ? 'border-destructive' : ''}
                          />
                        </div>
                        <div>
                          <Label htmlFor="addr-city">Plaats</Label>
                          <Input
                            id="addr-city"
                            {...register('city')}
                            className={errors.city ? 'border-destructive' : ''}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="addr-phone">Telefoonnummer (optioneel)</Label>
                        <Input id="addr-phone" {...register('phone')} />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setIsAddressDialogOpen(false)}
                        >
                          Annuleren
                        </Button>
                        <Button type="submit" className="flex-1 bg-foreground text-background">
                          Opslaan
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {user.addresses.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-border rounded-lg">
                  <MapPin size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Je hebt nog geen opgeslagen adressen.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => handleOpenAddressDialog()}
                  >
                    <Plus size={16} className="mr-2" />
                    Adres toevoegen
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((address) => (
                    <div
                      key={address.id}
                      className="border border-border rounded-lg p-4 relative"
                    >
                      {address.isDefault && (
                        <span className="absolute top-3 right-3 text-xs bg-foreground text-background px-2 py-0.5 rounded">
                          Standaard
                        </span>
                      )}
                      <p className="font-medium">
                        {address.firstName} {address.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {address.street} {address.houseNumber}
                        {address.houseNumberAddition}<br />
                        {address.postalCode} {address.city}
                      </p>
                      {address.phone && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Tel: {address.phone}
                        </p>
                      )}
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenAddressDialog(address)}
                        >
                          <Pencil size={14} className="mr-1" />
                          Bewerken
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteAddress(address.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Verwijderen
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountPage;
