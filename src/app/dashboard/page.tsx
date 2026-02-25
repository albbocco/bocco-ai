'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState({ balance: 0, monthly_allowance: 0 });
  const [avatars, setAvatars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingAvatar, setCreatingAvatar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Fetch credits
    fetchCredits(parsedUser.id);
    fetchAvatars(parsedUser.id);
    
    setLoading(false);
  }, [router]);

  const fetchCredits = async (userId: string) => {
    const res = await fetch(`/api/credits`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-User-Id': userId,
      },
    });
    const data = await res.json();
    if (data.success) {
      setCredits(data.credits);
    }
  };

  const fetchAvatars = async (userId: string) => {
    const res = await fetch(`/api/avatars?userId=${userId}`);
    const data = await res.json();
    if (data.success) {
      setAvatars(data.avatars);
    }
  };

  const createAvatar = async () => {
    if (!user) return;
    
    setCreatingAvatar(true);
    const res = await fetch('/api/avatar/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        name: 'Mon Avatar',
        prompt: 'Professional portrait photo, high quality, detailed face',
      }),
    });

    const data = await res.json();
    if (data.success) {
      fetchCredits(user.id);
      fetchAvatars(user.id);
      alert('Avatar créé avec succès !');
    } else {
      alert(data.error || 'Erreur lors de la création');
    }
    setCreatingAvatar(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-semibold">bocco.ai</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon espace</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Credits Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Mes crédits</h2>
            <p className="text-3xl font-bold text-gray-900">{credits.balance}</p>
            <p className="text-gray-500 text-sm">crédits disponibles</p>
          </div>

          {/* Avatars Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Mes avatars</h2>
            <p className="text-3xl font-bold text-gray-900">{avatars.length}</p>
            <p className="text-gray-500 text-sm">avatars créés</p>
            <button
              onClick={createAvatar}
              disabled={creatingAvatar || credits.balance < 1}
              className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50"
            >
              {creatingAvatar ? 'Création...' : 'Créer un avatar (1 crédit)'}
            </button>
          </div>

          {/* Videos Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Mes vidéos</h2>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-gray-500 text-sm">vidéos générées</p>
            <button
              disabled={avatars.length === 0 || credits.balance < 1}
              className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50"
            >
              Créer une vidéo (1-2 crédits)
            </button>
          </div>
        </div>

        {/* Avatars List */}
        {avatars.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes avatars</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {avatars.map((avatar: any) => (
                <div key={avatar.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {avatar.image_url ? (
                    <img src={avatar.image_url} alt={avatar.name} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">En cours...</span>
                    </div>
                  )}
                  <div className="p-4">
                    <p className="font-medium text-gray-900">{avatar.name}</p>
                    <p className="text-sm text-gray-500">{avatar.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
