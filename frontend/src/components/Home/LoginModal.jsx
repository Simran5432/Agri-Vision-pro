import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X, User, Mail, Lock, Phone, CreditCard, Sprout } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LoginModal = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSignup, setIsSignup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    farmerId: '',
    password: '',
  });

  useEffect(() => {
    if (searchParams.get('login') === 'true') {
      setIsOpen(true);
    }
  }, [searchParams]);

  const closeModal = () => {
    setIsOpen(false);
    searchParams.delete('login');
    setSearchParams(searchParams);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo login - just close modal
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-600 to-agri-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {isSignup ? t('createAccount') : t('welcomeBack')}
                </h2>
                <p className="text-sm text-agri-100 opacity-90">
                  {isSignup ? t('signupDesc') : t('loginDesc')}
                </p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-sm font-medium text-agri-800 mb-1.5">
                  {t('name')}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-agri-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-agri-200 focus:border-agri-500 focus:ring-2 focus:ring-agri-200 outline-none transition-all text-sm"
                    placeholder="John Singh"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-agri-800 mb-1.5">
                  {t('phone')}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-agri-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-agri-200 focus:border-agri-500 focus:ring-2 focus:ring-agri-200 outline-none transition-all text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-agri-800 mb-1.5">
                  {t('farmerId')}
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-agri-400" />
                  <input
                    type="text"
                    name="farmerId"
                    value={formData.farmerId}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-agri-200 focus:border-agri-500 focus:ring-2 focus:ring-agri-200 outline-none transition-all text-sm"
                    placeholder="FH-2024-XXXXX"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-agri-800 mb-1.5">
              {t('email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-agri-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-agri-200 focus:border-agri-500 focus:ring-2 focus:ring-agri-200 outline-none transition-all text-sm"
                placeholder="farmer@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-agri-800 mb-1.5">
              {t('password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-agri-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-agri-200 focus:border-agri-500 focus:ring-2 focus:ring-agri-200 outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {!isSignup && (
            <div className="flex justify-end">
              <button type="button" className="text-sm text-agri-600 hover:text-agri-800">
                {t('forgotPassword')}
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-agri-600 text-white font-semibold rounded-xl hover:bg-agri-700 active:bg-agri-800 transition-colors shadow-md"
          >
            {isSignup ? t('signupBtn') : t('loginBtn')}
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="w-full py-3 bg-agri-50 text-agri-700 font-medium rounded-xl hover:bg-agri-100 transition-colors"
          >
            {t('guestBtn')}
          </button>

          <p className="text-center text-sm text-agri-600">
            {isSignup ? (
              <>
                {t('haveAccount')}{' '}
                <button
                  type="button"
                  onClick={() => setIsSignup(false)}
                  className="font-semibold text-agri-800 hover:underline"
                >
                  {t('login')}
                </button>
              </>
            ) : (
              <>
                {t('noAccount')}{' '}
                <button
                  type="button"
                  onClick={() => setIsSignup(true)}
                  className="font-semibold text-agri-800 hover:underline"
                >
                  {t('signup')}
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
