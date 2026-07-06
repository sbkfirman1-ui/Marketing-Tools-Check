import React, { useState, useEffect } from 'react';
import { Camera, ClipboardCheck, Trash2, Download, LogOut, Check, X, Maximize2, Sparkles, Filter, Calendar, MapPin, UserCheck, Eye, EyeOff, RotateCcw, Cloud, Save } from 'lucide-react';
import CameraCapture from './CameraCapture';
import { supabase } from '../supabaseClient';

// Full Checklist Data
const checklistData = [
  { id: "ksr1", kategori: "Area Kasir", nama: "Poster Fraud atas kasir ukuran 60cm x 50cm", foto: "Salinan Images/Poster Fraud - Kasir.webp", exceptions: [] },
  { id: "ksr2", kategori: "Area Kasir", nama: "Impra A1 (4 Sekat)", foto: "Salinan Images/Impra A1 Sekat 4 - Kasir.webp", exceptions: [] },
  { id: "ksr3", kategori: "Area Kasir", nama: "Kertas Laminating Penanda Order 10cmx20cm", foto: "Salinan Images/Penanda Order - Kasir.webp", exceptions: [] },
  { id: "ksr4", kategori: "Area Kasir", nama: "Papan Menu Akrilik - A3", foto: "Salinan Images/Papan Menu A3 Akrilik - Kasir.webp", exceptions: [] },
  { id: "ksr5", kategori: "Area Kasir", nama: "Thankscard - A7", foto: "Salinan Images/Thankscard - Baksed.webp", exceptions: [] },

  { id: "din1", kategori: "Area Dine In", nama: "Akrilik Sign Lantai2 Mushola dan Toilet", foto: "Salinan Images/Sign in - Dine in.webp", exceptions: ["Baksed Arcamanik", "Baksed Suci"] },
  { id: "din2", kategori: "Area Dine In", nama: "Striker Glossy Freeice cream 10cmx20cm", foto: "https://placehold.co/400x400/2f4e6f/ffffff?text=Striker+Free+Ice+Cream", exceptions: [] },
  { id: "din3", kategori: "Area Dine In", nama: "Menu Laminating A4 + LTO ditiap Meja", foto: "https://placehold.co/400x400/2f4e6f/ffffff?text=Menu+Meja", exceptions: [] },
  { id: "din4", kategori: "Area Dine In", nama: "Pajangan Playground Lt 2 - Luster A1", foto: "Salinan Images/Playground Lantai 2 - Dine in.webp", exceptions: ["Baksed Arcamanik", "Baksed Suci"] },
  { id: "din5", kategori: "Area Dine In", nama: "Striker Cermin", foto: "Salinan Images/Striker Cermin - DIne in.webp", exceptions: [] },
  { id: "din6", kategori: "Area Dine In", nama: "Striker Pintu Kaca Ojol 15cmx35cm", foto: "Salinan Images/Striker Ojol kaca - Dine in.webp", exceptions: ["Baksed Arcamanik"] },
  { id: "din7", kategori: "Area Dine In", nama: "Striker Pintu Kaca dilarang membawa makanan dari luar 15cm x 35cm", foto: "Salinan Images/Striker Ojol kaca - Dine in.webp", exceptions: ["Baksed Arcamanik"] },
  { id: "din8", kategori: "Area Dine In", nama: "Pajangan Google Review", foto: "Salinan Images/Google Review - LusterA1.webp", exceptions: [] },
  { id: "din9", kategori: "Area Dine In", nama: "Pajangan Kebijakan Halal - A4", foto: "Salinan Images/Kebijakan halal - Dine in.webp", exceptions: [] },
  { id: "din10", kategori: "Area Dine In", nama: "Pajangan Kursi Prioritas - A4", foto: "https://placehold.co/400x400/2f4e6f/ffffff?text=Kursi+Prioritas", exceptions: [] },
  { id: "din11a", kategori: "Area Dine In", nama: "Pajangan - Ap A4 (4 pcs Pak Haji)", foto: "https://placehold.co/400x400/2f4e6f/ffffff?text=Ap+A4+Pak+Haji", exceptions: ["Baksed Arcamanik"] },
  { id: "din11b", kategori: "Area Dine In", nama: "Pajangan - Ap A4 (4 pcsMacan Ternak)", foto: "https://placehold.co/400x400/2f4e6f/ffffff?text=Ap+A4+Macan+Ternak", exceptions: ["Baksed Arcamanik"] },
  { id: "din12", kategori: "Area Dine In", nama: "Pajangan Kebijakan Hilang Barang - Ap A4", foto: "Salinan Images/Bukan TTG Manajemen - Dine in.webp", exceptions: [] },
  { id: "din13", kategori: "Area Dine In", nama: "Pajangan Artikel Sedjahtera - Luster A1", foto: "Salinan Images/Berita Sedjahtera - LusterA1.webp", exceptions: ["Baksed Arcamanik"] },
  { id: "din14", kategori: "Area Dine In", nama: "Pajangan Brand History - Luster A1", foto: "Salinan Images/Brand History Baksed - LusterA1.webp", exceptions: ["Baksed Arcamanik"] },
  { id: "din15", kategori: "Area Dine In", nama: "Pajangan Google Review - Luster A1", foto: "https://placehold.co/400x400/2f4e6f/ffffff?text=Google+Review+A1", exceptions: ["Baksed Arcamanik"] },
  { id: "din16", kategori: "Area Dine In", nama: "Pajangan Keluarga Bahagia - Luster A1", foto: "Salinan Images/Keluarga Bahagia - LusterA1.webp", exceptions: ["Baksed Arcamanik"] },
  { id: "din17", kategori: "Area Dine In", nama: "Pajangan Bakso Series Kumplit - Luster A1", foto: "Salinan Images/Series kumplit - LusterA1.webp", exceptions: ["Baksed Arcamanik"] },
  { id: "din18", kategori: "Area Dine In", nama: "Pajangan Keluarga Bahagia oren - Luster A1", foto: "Salinan Images/Ingat Keluarga Ingat Bakso Sedjahtera - LusterA1.webp", exceptions: ["Baksed Arcamanik"] },

  { id: "kit1", kategori: "Area Kitchen", nama: "Striker Gerobak 157cmx80cm", foto: "Salinan Images/Striker Gerobak 2 - Kitchen.webp", exceptions: ["Baksed Arcamanik", "Baksed Suci"] },
  { id: "kit2", kategori: "Area Kitchen", nama: "Striker Gerobak 50cmx80cm", foto: "Salinan Images/Striker Gerobak 1 - Kitchen.webp", exceptions: ["Baksed Arcamanik", "Baksed Suci"] },
  { id: "kit3", kategori: "Area Kitchen", nama: "Striker Halal Gerobak 62cm x 80cm", foto: "Salinan Images/Striker Gerobak 3 - Kitchen.webp", exceptions: ["Baksed Arcamanik", "Baksed Suci"] },

  { id: "out1", kategori: "Area Outdoor", nama: "Impra Flow Order", foto: "Salinan Images/Flow Order -  Outdoor.webp", exceptions: [] },
  { id: "out2", kategori: "Area Outdoor", nama: "Stand X Banner (1)", foto: "Salinan Images/Stand Banner - Outdoor.webp", exceptions: [] },
  { id: "out3", kategori: "Area Outdoor", nama: "Stand X Banner (2)", foto: "Salinan Images/Stand Banner - Outdoor.webp", exceptions: [] },
  { id: "out4", kategori: "Area Outdoor", nama: "Cetakan X Banner Waiting List", foto: "Salinan Images/Waiting List - Outdoor.webp", exceptions: [] },
  { id: "out5", kategori: "Area Outdoor", nama: "Cetakan X Banner Ops Melambat ketika solat", foto: "https://placehold.co/400x400/2f4e6f/ffffff?text=Ops+Melambat", exceptions: [] },
  { id: "out6", kategori: "Area Outdoor", nama: "Cetakan X banner Promo", foto: "https://placehold.co/400x400/2f4e6f/ffffff?text=Banner+Promo", exceptions: [] },

  { id: "ply1", kategori: "Area Playground", nama: "Impra Aturan Playground 60cmx40cm", foto: "Salinan Images/Aturan Playground - Playground.webp", exceptions: [] },
  { id: "ply2", kategori: "Area Playground", nama: "Striker Buka Sendal playground", foto: "Salinan Images/Sepatu Sendal Lepas - Playground.webp", exceptions: [] },

  { id: "tlt1", kategori: "Area Toilet", nama: "Dilarang membuang sampah ke dalam closet", foto: "Salinan Images/Striker Toilet - WC.webp", exceptions: [] }
];

const compressImage = (base64Str, maxWidth = 800, maxHeight = 800, quality = 0.7) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

export default function ChecklistDashboard({ user, onLogout }) {
  // Auditor Info State
  const [auditorName, setAuditorName] = useState(() => localStorage.getItem('audit_auditor_name') || '');
  const [outletName, setOutletName] = useState(() => localStorage.getItem('audit_outlet_name') || '');
  const [auditDate, setAuditDate] = useState(() => localStorage.getItem('audit_date') || '');

  // Assessment State
  const [presence, setPresence] = useState(() => {
    try {
      const saved = localStorage.getItem('audit_presence');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [condition, setCondition] = useState(() => {
    try {
      const saved = localStorage.getItem('audit_condition');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [uploadedPhotos, setUploadedPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('audit_uploaded_photos');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [customStandardPhotos, setCustomStandardPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('custom_standard_photos');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch all custom standard photos from Supabase on mount
  useEffect(() => {
    const fetchCustomStandardPhotos = async () => {
      try {
        const { data, error } = await supabase
          .from('custom_standard_photos')
          .select('*');
        if (error) throw error;
        if (data) {
          const photoMap = {};
          data.forEach(row => {
            photoMap[row.item_id] = row.photo_base64;
          });
          setCustomStandardPhotos(photoMap);
        }
      } catch (err) {
        console.error('Error fetching custom standard photos:', err);
      }
    };
    fetchCustomStandardPhotos();
  }, []);

  // Fetch audit data from Supabase when selected outlet or date changes
  useEffect(() => {
    const fetchAuditData = async () => {
      if (!outletName || !auditDate) return;
      try {
        const { data, error } = await supabase
          .from('audits')
          .select('*')
          .eq('outlet_name', outletName)
          .eq('audit_date', auditDate)
          .single();
        if (error && error.code !== 'PGRST116') { // PGRST116 is code for "no rows returned"
          throw error;
        }
        if (data) {
          setAuditorName(data.auditor_name || '');
          setPresence(prev => ({ ...prev, [outletName]: data.presence || {} }));
          setCondition(prev => ({ ...prev, [outletName]: data.condition || {} }));
          setUploadedPhotos(prev => ({ ...prev, [outletName]: data.uploaded_photos || {} }));
          setLastSynced(new Date(data.updated_at).toLocaleTimeString());
        } else {
          // If no record exists for this date, load empty checklist answers
          setPresence(prev => ({ ...prev, [outletName]: {} }));
          setCondition(prev => ({ ...prev, [outletName]: {} }));
          setUploadedPhotos(prev => ({ ...prev, [outletName]: {} }));
          setLastSynced(null);
        }
      } catch (err) {
        console.error('Error fetching audit from Supabase:', err);
      }
    };
    fetchAuditData();
  }, [outletName, auditDate]);

  // Debounced auto-save to Supabase
  useEffect(() => {
    if (!auditorName.trim() || !outletName || !auditDate || !isOnline) return;

    const timer = setTimeout(async () => {
      setSyncing(true);
      try {
        const { error } = await supabase
          .from('audits')
          .upsert({
            outlet_name: outletName,
            audit_date: auditDate,
            auditor_name: auditorName,
            presence: presence[outletName] || {},
            condition: condition[outletName] || {},
            uploaded_photos: uploadedPhotos[outletName] || {},
            score_percentage: scorePercentage,
            score_status: scoreStatus,
            updated_at: new Date().toISOString()
          });
        if (error) throw error;
        setLastSynced(new Date().toLocaleTimeString());
      } catch (err) {
        console.error('Autosave error:', err);
      } finally {
        setSyncing(false);
      }
    }, 2000); // Autosave 2 seconds after user stops typing/clicking

    return () => clearTimeout(timer);
  }, [presence, condition, uploadedPhotos, auditorName, outletName, auditDate, isOnline]);

  useEffect(() => {
    try {
      localStorage.setItem('audit_auditor_name', auditorName);
    } catch (e) {
      console.error(e);
    }
  }, [auditorName]);

  useEffect(() => {
    try {
      localStorage.setItem('audit_outlet_name', outletName);
    } catch (e) {
      console.error(e);
    }
  }, [outletName]);

  useEffect(() => {
    try {
      localStorage.setItem('audit_date', auditDate);
    } catch (e) {
      console.error(e);
    }
  }, [auditDate]);

  useEffect(() => {
    try {
      localStorage.setItem('audit_presence', JSON.stringify(presence));
    } catch (e) {
      console.error(e);
    }
  }, [presence]);

  useEffect(() => {
    try {
      localStorage.setItem('audit_condition', JSON.stringify(condition));
    } catch (e) {
      console.error(e);
    }
  }, [condition]);

  useEffect(() => {
    try {
      localStorage.setItem('audit_uploaded_photos', JSON.stringify(uploadedPhotos));
    } catch (e) {
      console.error(e);
    }
  }, [uploadedPhotos]);

  useEffect(() => {
    try {
      localStorage.setItem('custom_standard_photos', JSON.stringify(customStandardPhotos));
    } catch (e) {
      console.error(e);
    }
  }, [customStandardPhotos]);

  // UI Control State
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [activeCameraItem, setActiveCameraItem] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [showAlert, setShowAlert] = useState('');
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Score stats
  const [scorePercentage, setScorePercentage] = useState(0);
  const [scoreStatus, setScoreStatus] = useState('Menunggu Input...');

  // Categories list
  const categories = ['Semua', 'Area Kasir', 'Area Dine In', 'Area Kitchen', 'Area Outdoor', 'Area Playground', 'Area Toilet'];

  // Filtered items based on active category AND outlet exceptions
  const visibleItems = checklistData.filter(item => {
    // Hide if outlet matches item exceptions
    if (outletName && item.exceptions.includes(outletName)) return false;
    // Hide if doesn't match active category
    if (activeCategory !== 'Semua' && item.kategori !== activeCategory) return false;
    return true;
  });

  // Calculate score whenever presence or condition changes
  useEffect(() => {
    calculateScore();
  }, [presence, condition, outletName]);

  const calculateScore = () => {
    let totalChecked = 0;
    let scoreEarned = 0;

    const outletPresence = presence[outletName] || {};
    const outletCondition = condition[outletName] || {};

    checklistData.forEach(item => {
      // Ignore items excluded for the selected outlet
      if (outletName && item.exceptions.includes(outletName)) {
        return;
      }

      const itemPresence = outletPresence[item.id];
      const itemCondition = outletCondition[item.id];

      if (itemPresence === 'Tidak Ada') {
        totalChecked++;
      } else if (itemPresence === 'Ada') {
        if (itemCondition) {
          totalChecked++;
          if (itemCondition === 'Bagus' || itemCondition === 'Masih Bagus') {
            scoreEarned++;
          }
        }
      }
    });

    if (totalChecked === 0) {
      setScorePercentage(0);
      setScoreStatus('Menunggu Input...');
      return;
    }

    const percentage = Math.round((scoreEarned / totalChecked) * 100);
    setScorePercentage(percentage);

    if (percentage >= 80) {
      setScoreStatus('Bagus (Layak)');
    } else if (percentage >= 50) {
      setScoreStatus('Tidak Terlalu Bagus');
    } else {
      setScoreStatus('Tidak Bagus (Perlu Perbaikan)');
    }
  };

  const handlePresenceChange = (itemId, val) => {
    if (!outletName) return;
    setPresence(prev => ({
      ...prev,
      [outletName]: {
        ...(prev[outletName] || {}),
        [itemId]: val
      }
    }));
    // Clear condition if changed to "Tidak Ada"
    if (val === 'Tidak Ada') {
      setCondition(prev => {
        const nextOutletCond = { ...(prev[outletName] || {}) };
        delete nextOutletCond[itemId];
        return {
          ...prev,
          [outletName]: nextOutletCond
        };
      });
    }
  };

  const handleConditionChange = (itemId, val) => {
    if (!outletName) return;
    setCondition(prev => ({
      ...prev,
      [outletName]: {
        ...(prev[outletName] || {}),
        [itemId]: val
      }
    }));
  };

  const capturePhoto = async (itemId, base64Data) => {
    if (!outletName) return;
    const compressed = await compressImage(base64Data);
    setUploadedPhotos(prev => ({
      ...prev,
      [outletName]: {
        ...(prev[outletName] || {}),
        [itemId]: compressed
      }
    }));
    setActiveCameraItem(null);
  };

  const removePhoto = (itemId) => {
    if (!outletName) return;
    setUploadedPhotos(prev => {
      const nextOutletPhotos = { ...(prev[outletName] || {}) };
      delete nextOutletPhotos[itemId];
      return {
        ...prev,
        [outletName]: nextOutletPhotos
      };
    });
  };

  const handleStartCapture = (itemId) => {
    if (!auditorName.trim() || !outletName || !auditDate) {
      setShowAlert("Harap isi Nama Auditor, Lokasi Outlet, dan Tanggal Audit terlebih dahulu.");
      return;
    }
    setActiveCameraItem(itemId);
  };

  const handleStandardPhotoUpload = (itemId, file) => {
    if (!auditorName.trim() || !outletName || !auditDate) {
      setShowAlert("Harap isi Nama Auditor, Lokasi Outlet, dan Tanggal Audit terlebih dahulu.");
      return;
    }
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const compressed = await compressImage(reader.result);
      setCustomStandardPhotos(prev => ({
        ...prev,
        [itemId]: compressed
      }));
      try {
        await supabase
          .from('custom_standard_photos')
          .upsert({ item_id: itemId, photo_base64: compressed });
      } catch (err) {
        console.error('Error saving standard photo to Supabase:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleStandardPhotoDelete = async (itemId) => {
    setCustomStandardPhotos(prev => ({
      ...prev,
      [itemId]: 'deleted'
    }));
    try {
      await supabase
        .from('custom_standard_photos')
        .upsert({ item_id: itemId, photo_base64: 'deleted' });
    } catch (err) {
      console.error('Error deleting standard photo on Supabase:', err);
    }
  };

  const handleStandardPhotoRevert = async (itemId) => {
    setCustomStandardPhotos(prev => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    try {
      await supabase
        .from('custom_standard_photos')
        .delete()
        .eq('item_id', itemId);
    } catch (err) {
      console.error('Error reverting standard photo on Supabase:', err);
    }
  };

  const syncToCloud = async () => {
    if (!auditorName.trim() || !outletName || !auditDate) {
      setShowAlert("Harap isi Nama Auditor, Lokasi Outlet, dan Tanggal Audit terlebih dahulu.");
      return;
    }
    setSyncing(true);
    try {
      const { error } = await supabase
        .from('audits')
        .upsert({
          outlet_name: outletName,
          auditor_name: auditorName,
          audit_date: auditDate,
          presence: presence[outletName] || {},
          condition: condition[outletName] || {},
          uploaded_photos: uploadedPhotos[outletName] || {},
          score_percentage: scorePercentage,
          score_status: scoreStatus,
          updated_at: new Date().toISOString()
        });
      if (error) throw error;
      setLastSynced(new Date().toLocaleTimeString());
      setShowAlert("Laporan audit berhasil disimpan ke database cloud!");
    } catch (err) {
      console.error('Error syncing to Supabase:', err);
      setShowAlert("Gagal menyimpan ke cloud: " + err.message);
    } finally {
      setSyncing(false);
    }
  };

  const handleReset = () => {
    if (outletName) {
      setPresence(prev => {
        const next = { ...prev };
        delete next[outletName];
        return next;
      });
      setCondition(prev => {
        const next = { ...prev };
        delete next[outletName];
        return next;
      });
      setUploadedPhotos(prev => {
        const next = { ...prev };
        delete next[outletName];
        return next;
      });
    }
    setAuditorName('');
    setOutletName('');
    setAuditDate('');
    setShowConfirmReset(false);
  };

  const exportPDF = () => {
    if (!auditorName.trim() || !outletName || !auditDate) {
      setShowAlert("Harap isi Nama Auditor, Lokasi Outlet, dan Tanggal Audit terlebih dahulu.");
      return;
    }
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 px-2 pb-10 overflow-x-hidden">
      
      {/* Top Banner / Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white border border-slate-200/60 p-4 rounded-3xl shadow-sm gap-4">
        <div className="flex items-center gap-3">
          <img 
            src="Salinan Images/Logo Baksed.png" 
            alt="Logo Bakso Sedjahtera" 
            className="h-10 w-auto object-contain shrink-0" 
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x400/2f4e6f/ffffff?text=Baksed';
            }}
          />
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Audit System <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-baksed-dark ml-1 border border-slate-200 capitalize">{user.role} mode</span>
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Form Ceklis Marketing Tools</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-700">Halo, {user.username}</p>
            <p className="text-[9px] text-slate-400">Selamat bekerja!</p>
          </div>
          <button 
            onClick={onLogout}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-xl text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Keluar
          </button>
        </div>
      </div>

      {/* Identitas Form */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/60 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-baksed-blue uppercase tracking-wider flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-baksed-orange" />
            Informasi Auditor & Sesi Kerja
          </h3>
          {syncing && (
            <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
              <div className="w-3 h-3 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              Menyimpan...
            </span>
          )}
          {!syncing && lastSynced && (
            <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
              <Cloud className={`w-3.5 h-3.5 ${isOnline ? 'text-emerald-500' : 'text-rose-500'} ${isOnline ? 'animate-pulse' : ''}`} />
              {isOnline ? `Tersinkronisasi: ${lastSynced}` : 'Offline (Tersimpan Lokal)'}
            </span>
          )}
        </div>
        <div className={`grid grid-cols-1 ${user.role === 'admin' ? 'sm:grid-cols-5' : 'sm:grid-cols-4'} gap-4 items-end`}>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-baksed-dark uppercase tracking-wider flex items-center gap-1">
              Nama Auditor
            </label>
            <input 
              type="text" 
              value={auditorName}
              onChange={(e) => setAuditorName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-baksed-blue focus:border-baksed-blue outline-none transition-all text-xs text-slate-800"
              placeholder="Ketik nama lengkap" 
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-baksed-dark uppercase tracking-wider">
              Lokasi Outlet
            </label>
            <div className="relative">
              <select 
                value={outletName}
                onChange={(e) => setOutletName(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-baksed-blue focus:border-baksed-blue outline-none transition-all text-xs text-slate-800 appearance-none cursor-pointer"
              >
                <option value="" disabled>-- Pilih Outlet --</option>
                <option value="Baksed Cianjur">Baksed Cianjur</option>
                <option value="Baksed Arcamanik">Baksed Arcamanik</option>
                <option value="Baksed Suci">Baksed Suci</option>
                <option value="Baksed Kopo">Baksed Kopo</option>
                <option value="Baksed Gedebage">Baksed Gedebage</option>
                <option value="Baksed Ciwastra">Baksed Ciwastra</option>
                <option value="Baksed Batu Nunggal">Baksed Batu Nunggal</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
                <Filter className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-baksed-dark uppercase tracking-wider">
              Tanggal Audit
            </label>
            <input 
              type="date"
              value={auditDate}
              onChange={(e) => setAuditDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-baksed-blue focus:border-baksed-blue outline-none transition-all text-xs text-slate-800 cursor-pointer" 
            />
          </div>
          <button 
            onClick={syncToCloud}
            disabled={syncing}
            className={`w-full flex items-center justify-center gap-1.5 ${syncing ? 'bg-slate-400' : 'bg-emerald-600 hover:bg-emerald-700'} text-white font-extrabold py-2.5 px-4 rounded-xl shadow-sm text-xs transition-colors h-[42px]`}
          >
            {syncing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {syncing ? 'Menyimpan...' : 'Simpan ke Cloud'}
          </button>
          {user.role === 'admin' && (
            <button 
              onClick={exportPDF}
              className="w-full flex items-center justify-center gap-1.5 bg-baksed-blue hover:bg-baksed-dark text-white font-extrabold py-2.5 px-4 rounded-xl shadow-sm text-xs transition-colors h-[42px]"
            >
              <Download className="w-3.5 h-3.5" />
              Export PDF
            </button>
          )}
        </div>
      </div>

      {/* Sticky Score Card - Admin Only */}
      {user.role === 'admin' && (
        <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-200/60 sticky top-2 z-20">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="text-xs font-bold text-baksed-blue uppercase tracking-wider">Skor Ketersediaan & Kondisi</h3>
              <p className={`text-xs sm:text-sm font-extrabold mt-1 ${
                scorePercentage >= 80 ? 'text-emerald-600' : scorePercentage >= 50 ? 'text-amber-500' : scorePercentage > 0 ? 'text-rose-500' : 'text-slate-500'
              }`}>
                {scoreStatus}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-black text-baksed-dark">{scorePercentage}%</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
            <div 
              className={`h-2 rounded-full progress-bar-fill ${
                scorePercentage >= 80 ? 'bg-emerald-500' : scorePercentage >= 50 ? 'bg-amber-500' : 'bg-[#c74a33]'
              }`}
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Category Tabs Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar scroll-smooth w-full max-w-full">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
              activeCategory === cat 
                ? 'bg-baksed-dark text-white border-baksed-dark shadow-sm'
                : 'bg-white text-slate-500 border-slate-200/60 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Checklist Card Container */}
      <div className="space-y-4">
        {visibleItems.length === 0 ? (
          <div className="bg-white/50 border border-dashed border-slate-200 p-10 rounded-3xl text-center space-y-2">
            <p className="text-slate-400 text-sm font-semibold">Tidak ada item dalam kategori ini.</p>
          </div>
        ) : (
          visibleItems.map(item => {
            const itemPresence = presence[outletName]?.[item.id];
            const isAda = itemPresence === 'Ada';
            const isTdkAda = itemPresence === 'Tidak Ada';
            const itemCondition = condition[outletName]?.[item.id];
            const itemPhoto = uploadedPhotos[outletName]?.[item.id];
            const itemStandardPhoto = customStandardPhotos[item.id] === 'deleted'
              ? null
              : (customStandardPhotos[item.id] || item.foto);

            return (
              <div 
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow duration-300"
              >
                {/* Card Title Header */}
                <div className="mb-4">
                  <span className="text-[9px] font-extrabold text-baksed-orange uppercase tracking-widest bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">{item.kategori}</span>
                  <h4 className="text-sm sm:text-base font-bold text-baksed-dark leading-snug mt-1.5">{item.nama}</h4>
                </div>

                {/* Body Content */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                  
                  {/* Photo Column */}
                  <div className="w-full sm:w-2/5 md:w-1/3 shrink-0 flex gap-2.5">
                    {/* Standar Photo Reference */}
                    <div className="flex-1 flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-slate-400 text-center uppercase tracking-wider">Standar</span>
                      <div className="relative w-full aspect-square">
                        {itemStandardPhoto ? (
                          <div 
                            className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 cursor-pointer group"
                            onClick={() => setLightboxImg(itemStandardPhoto)}
                          >
                            <img 
                              src={itemStandardPhoto} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              alt={item.nama}
                              onError={(e) => {
                                e.target.src = 'https://placehold.co/400x400/2f4e6f/ffffff?text=Baksed+Logo';
                              }}
                            />
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                              <Maximize2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            
                            {/* Admin standard photo upload/delete overlay */}
                            {user.role === 'admin' && (
                              <div 
                                className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <label 
                                  htmlFor={`upload-std-${item.id}`}
                                  className="bg-white/95 backdrop-blur-sm text-slate-700 rounded-lg p-1.5 shadow-sm hover:bg-white transition-colors cursor-pointer flex items-center justify-center"
                                  title="Ganti foto standar"
                                >
                                  <Camera className="w-3.5 h-3.5" />
                                  <input 
                                    type="file" 
                                    id={`upload-std-${item.id}`}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleStandardPhotoUpload(item.id, e.target.files[0])}
                                  />
                                </label>
                                <button 
                                  onClick={() => handleStandardPhotoDelete(item.id)}
                                  className="bg-rose-500/95 backdrop-blur-sm text-white rounded-lg p-1.5 shadow-sm hover:bg-rose-600 transition-colors flex items-center justify-center"
                                  title="Kosongkan foto standar"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                                {customStandardPhotos[item.id] && (
                                  <button 
                                    onClick={() => handleStandardPhotoRevert(item.id)}
                                    className="bg-amber-500/95 backdrop-blur-sm text-white rounded-lg p-1.5 shadow-sm hover:bg-amber-600 transition-colors flex items-center justify-center"
                                    title="Kembalikan ke foto default"
                                  >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center">
                            {user.role === 'admin' ? (
                              <label
                                htmlFor={`upload-std-${item.id}`}
                                className="w-full h-full flex flex-col items-center justify-center transition-all cursor-pointer hover:bg-slate-100/50 rounded-2xl"
                              >
                                <Camera className="w-5 h-5 text-slate-400 mb-1" />
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Upload</span>
                                <input 
                                  type="file" 
                                  id={`upload-std-${item.id}`}
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleStandardPhotoUpload(item.id, e.target.files[0])}
                                />
                              </label>
                            ) : (
                              <>
                                <X className="w-5 h-5 text-slate-350 mb-1" />
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Kosong</span>
                              </>
                            )}
                            {/* Revert option if it was deleted */}
                            {user.role === 'admin' && customStandardPhotos[item.id] === 'deleted' && (
                              <button 
                                onClick={() => handleStandardPhotoRevert(item.id)}
                                className="absolute bottom-2 bg-amber-500/95 backdrop-blur-sm text-white rounded-lg p-1.5 shadow-sm hover:bg-amber-600 transition-colors flex items-center justify-center"
                                title="Kembalikan ke foto default"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                     {/* Actual Upload Photo */}
                    <div className="flex-1 flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-slate-400 text-center uppercase tracking-wider">Aktual</span>
                      <div className="relative w-full aspect-square">
                        {itemPhoto ? (
                          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-200 group bg-black">
                            <img 
                              src={itemPhoto} 
                              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity" 
                              onClick={() => setLightboxImg(itemPhoto)}
                              alt="Actual preview"
                            />
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleStartCapture(item.id)}
                                className="bg-white/95 backdrop-blur-sm text-slate-700 rounded-lg p-1.5 shadow-sm hover:bg-white transition-colors"
                              >
                                <Camera className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => removePhoto(item.id)}
                                className="bg-rose-500/95 backdrop-blur-sm text-white rounded-lg p-1.5 shadow-sm hover:bg-rose-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleStartCapture(item.id)}
                            className="absolute inset-0 rounded-2xl border-2 border-dashed border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 bg-slate-50 flex flex-col items-center justify-center transition-all cursor-pointer"
                          >
                            <Camera className="w-5 h-5 text-slate-400 mb-1" />
                            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Foto</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Input / Control Column */}
                  <div className="flex-1 w-full space-y-4">
                    {user.role === 'admin' ? (
                      <>
                        {/* Presence Radio Group */}
                        <div>
                          <label className="block text-[9px] font-bold text-baksed-blue mb-1.5 uppercase tracking-widest">Ketersediaan Item</label>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handlePresenceChange(item.id, 'Ada')}
                              className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all active:scale-[0.98] ${
                                isAda 
                                  ? 'bg-baksed-blue text-white border-baksed-blue shadow-sm'
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              Tersedia
                            </button>
                            <button
                              onClick={() => handlePresenceChange(item.id, 'Tidak Ada')}
                              className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all active:scale-[0.98] ${
                                isTdkAda 
                                  ? 'bg-slate-200 text-slate-800 border-slate-300'
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              Tidak Ada
                            </button>
                          </div>
                        </div>

                        {/* Condition Radio Group - Collapsed unless "Tersedia" selected */}
                        <div className={`collapse-content ${isAda ? 'active border-t border-slate-100 pt-3' : ''}`}>
                          <label className="block text-[9px] font-bold text-baksed-blue mb-1.5 uppercase tracking-widest">Kondisi Fisik Aktual</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {['Bagus', 'Masih Bagus', 'Tidak Bagus'].map((c) => {
                              const labelMap = {
                                'Bagus': 'Sangat Baik',
                                'Masih Bagus': 'Cukup',
                                'Tidak Bagus': 'Rusak'
                              };
                              const colorMap = {
                                'Bagus': 'peer-checked:border-emerald-600 peer-checked:bg-emerald-50 peer-checked:text-emerald-700',
                                'Masih Bagus': 'peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:text-amber-700',
                                'Tidak Bagus': 'peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:text-rose-700'
                              };
                              return (
                                <div key={c} className="w-full">
                                  <input 
                                    type="radio" 
                                    id={`kon_${c}_${item.id}`} 
                                    name={`kon_${item.id}`} 
                                    checked={itemCondition === c}
                                    onChange={() => handleConditionChange(item.id, c)}
                                    className="peer hidden" 
                                  />
                                  <label 
                                    htmlFor={`kon_${c}_${item.id}`} 
                                    className={`radio-label flex items-center justify-center w-full cursor-pointer py-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-[10px] font-bold text-slate-500 text-center h-full ${colorMap[c]}`}
                                  >
                                    {labelMap[c]}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Crew Mode Information Message */
                      <div className="h-full flex items-center bg-slate-50 border border-slate-200/60 p-4 rounded-2xl">
                        <p className="text-xs text-slate-400 font-bold leading-relaxed">
                          📌 <span className="text-slate-600">Mode Crew</span>: Anda hanya bertugas untuk mengambil/memperbarui foto aktual item di outlet. Penilaian ketersediaan dan kondisi akan diisi oleh pihak Admin/Auditor.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Control Action Buttons */}
      <div className="pt-4">
        <button 
          onClick={() => setShowConfirmReset(true)}
          className="w-full flex items-center justify-center gap-1.5 bg-transparent hover:bg-rose-50 text-baksed-orange font-bold py-3 px-6 rounded-2xl transition-all"
        >
          <Trash2 className="w-4 h-4" />
          Reset Form
        </button>
      </div>

      {/* Camera Modal Overlay */}
      {activeCameraItem && (
        <CameraCapture 
          onCapture={(base64) => capturePhoto(activeCameraItem, base64)} 
          onClose={() => setActiveCameraItem(null)} 
        />
      )}

      {/* Lightbox / Zoom Image Modal */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md cursor-pointer animate-fadeIn"
        >
          <div className="absolute top-4 right-4 text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </div>
          <img 
            src={lightboxImg} 
            alt="Zoom view" 
            className="max-w-[95%] max-h-[85%] rounded-2xl shadow-2xl object-contain animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x400/2f4e6f/ffffff?text=Baksed+Logo';
            }}
          />
        </div>
      )}

      {/* Custom Alert Modal */}
      {showAlert && (() => {
        const isSuccess = showAlert.toLowerCase().includes('berhasil') || showAlert.toLowerCase().includes('sukses');
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center space-y-4">
              <div className={`w-12 h-12 ${isSuccess ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-baksed-orange'} rounded-full flex items-center justify-center mx-auto`}>
                {isSuccess ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">{isSuccess ? 'Berhasil' : 'Perhatian'}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{showAlert}</p>
              </div>
              <button 
                onClick={() => setShowAlert('')}
                className="w-full py-3 bg-baksed-blue hover:bg-baksed-dark text-white rounded-xl font-bold text-xs transition-colors"
              >
                Mengerti
              </button>
            </div>
          </div>
        );
      })()}

      {/* Custom Reset Confirm Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-baksed-orange">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">Reset Data Form?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Semua jawaban ceklis, data auditor, dan foto aktual yang diunggah akan dihapus secara permanen.
              </p>
            </div>
            <div className="flex gap-2.5">
              <button 
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleReset}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs transition-colors"
              >
                Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print-Only Layout */}
      <div className="hidden print:block print-report p-6 space-y-6">
        <div className="text-center pb-4 border-b-2 border-slate-800">
          <img src="Salinan Images/Logo Baksed.png" className="h-24 mx-auto mb-2 object-contain" />
          <h1 className="text-2xl font-black text-slate-900">LAPORAN AUDIT MARKETING TOOLS</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Bakso Sedjahtera</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-xs font-bold my-4">
          <div>Auditor: <span className="font-normal">{auditorName || '-'}</span></div>
          <div>Tanggal Audit: <span className="font-normal">{auditDate || '-'}</span></div>
          <div>Outlet: <span className="font-normal">{outletName || '-'}</span></div>
          <div>Skor Kelayakan: <span className="font-bold text-slate-800">{scorePercentage}% ({scoreStatus})</span></div>
        </div>

        <table className="w-full border-collapse border border-slate-350 text-[10px]">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-350 p-2 text-left">Kategori</th>
              <th className="border border-slate-350 p-2 text-left">Nama Item</th>
              <th className="border border-slate-350 p-2 text-center">Ketersediaan</th>
              <th className="border border-slate-350 p-2 text-center">Kondisi</th>
              <th className="border border-slate-350 p-2 text-center">Foto Aktual</th>
            </tr>
          </thead>
          <tbody>
            {checklistData.map(item => {
              if (outletName && item.exceptions.includes(outletName)) return null;
              const isPresent = presence[outletName]?.[item.id] || '-';
              const isCond = presence[outletName]?.[item.id] === 'Ada' ? (condition[outletName]?.[item.id] || '-') : '-';
              const isPhoto = uploadedPhotos[outletName]?.[item.id];
              return (
                <tr key={item.id}>
                  <td className="border border-slate-350 p-2">{item.kategori}</td>
                  <td className="border border-slate-350 p-2">{item.nama}</td>
                  <td className="border border-slate-350 p-2 text-center">{isPresent}</td>
                  <td className="border border-slate-350 p-2 text-center">{isCond}</td>
                  <td className="border border-slate-350 p-2 text-center">
                    {isPhoto ? (
                      <img src={isPhoto} className="w-16 h-16 mx-auto object-cover rounded-md" />
                    ) : 'Tidak Ada'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
