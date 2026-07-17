import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LANGUAGES } from '../data/mockData';
import { 
  Languages, 
  Mic, 
  Volume2, 
  Send, 
  RefreshCw, 
  Radio, 
  Check, 
  Megaphone,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function AITranslator() {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('de');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Announcement states
  const [announcementCategory, setAnnouncementCategory] = useState('Security / Gate');
  const [announcementDraft, setAnnouncementDraft] = useState('');
  const [broadcastLanguages, setBroadcastLanguages] = useState(['es', 'fr', 'de']);
  const [broadcastLogs, setBroadcastLogs] = useState<Array<{ text: string, targets: string[] }>>([]);

  const dictionary: Record<string, Record<string, string>> = {
    "please head to gate c due to high congestion at gate a": {
      es: "Por favor, diríjase a la puerta C debido a la gran congestión en la puerta A.",
      fr: "Veuillez vous diriger vers la porte C en raison d'une forte congestion à la porte A.",
      de: "Bitte begeben Sie sich zu Tor C, da an Tor A große Staus herrschen.",
      pt: "Por favor, dirija-se à porta C devido ao grande congestionamento na porta A.",
      ar: "يرجى التوجه إلى البوابة C بسبب الازدحام الشديد عند البوابة A.",
      hi: "गेट ए पर अत्यधिक भीड़ के कारण कृपया गेट सी की ओर प्रस्थान करें।",
      ja: "ゲートAの混雑のため、ゲートCへお進みください。",
      ko: "A게이트의 심한 혼잡으로 인해 C게이트로 이동해 주시기 바랍니다.",
      zh: "由于A口严重拥堵，请前往C口。"
    },
    "medical response team has been dispatched to sector 4": {
      es: "El equipo de respuesta médica ha sido enviado al sector 4.",
      fr: "L'équipe de réponse médicale a été dépêchée dans le secteur 4.",
      de: "Das medizinische Einsatzteam wurde in Sektor 4 entsandt.",
      pt: "A equipa de resposta médica foi enviada para o sector 4.",
      ar: "تم إرسال فريق الاستجابة الطبية إلى القطاع 4.",
      hi: "सेक्टर 4 में चिकित्सा प्रतिक्रिया दल भेज दिया गया है।",
      ja: "医療チームがセクター4に派遣されました。",
      ko: "의료 대응팀이 섹터 4로 파견되었습니다.",
      zh: "医疗救援队已派往4区。"
    }
  };

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);
    setTimeout(() => {
      const lower = inputText.toLowerCase().trim();
      let match = dictionary[lower];
      
      // Attempt partial matching
      if (!match) {
        const foundKey = Object.keys(dictionary).find(key => lower.includes(key) || key.includes(lower));
        if (foundKey) match = dictionary[foundKey];
      }

      if (match && match[targetLang]) {
        setOutputText(match[targetLang]);
      } else {
        // Generative placeholder translation
        setOutputText(`[AI Multilingual synthesis for language: ${targetLang.toUpperCase()}]: "${inputText}" successfully localized with native dialect parameters.`);
      }
      setIsTranslating(false);
    }, 1200);
  };

  const startVoiceSim = () => {
    setIsListening(true);
    setInputText('Listening for pitch and dialect...');
    setTimeout(() => {
      setIsListening(false);
      setInputText('Please head to Gate C due to high congestion at Gate A');
    }, 3000);
  };

  const handleBroadcast = () => {
    if (!announcementDraft.trim()) return;
    setBroadcastLogs(prev => [
      { text: announcementDraft, targets: [...broadcastLanguages] },
      ...prev
    ]);
    setAnnouncementDraft('');
  };

  const toggleLangToBroadcast = (code: string) => {
    setBroadcastLanguages(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Translate Terminal Panel */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-[#4FD1FF]" />
              <h3 className="text-sm font-bold text-white">AI Instant Translator</h3>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#38FFB3]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIALECT CO-ENGINES</span>
            </div>
          </div>

          {/* Lang Selector Selects */}
          <div className="grid grid-cols-2 gap-3 bg-[#070B17]/40 p-2.5 rounded-xl border border-white/5">
            <div>
              <label className="text-[9px] font-mono text-gray-500 uppercase block mb-1">Source Language</label>
              <select 
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-white outline-none border-0 cursor-pointer"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-[#070B17]">{lang.flag} {lang.name}</option>
                ))}
              </select>
            </div>
            <div className="border-l border-white/5 pl-3">
              <label className="text-[9px] font-mono text-gray-500 uppercase block mb-1">Target Language</label>
              <select 
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-white outline-none border-0 cursor-pointer"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-[#070B17]">{lang.flag} {lang.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Text Input Block */}
          <div className="space-y-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-32 bg-white/[0.02] border border-white/5 focus:border-[#4FD1FF]/30 rounded-xl p-4 text-xs text-white placeholder-gray-500 outline-none resize-none"
              placeholder="Type stadium safety queries or match details here... (e.g., 'Please head to Gate C due to high congestion at Gate A')"
            />

            <div className="flex justify-between items-center">
              <button
                onClick={startVoiceSim}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold font-mono border transition-all duration-200 ${
                  isListening 
                    ? 'bg-[#FF4D6D]/15 text-[#FF4D6D] border-[#FF4D6D]/30 animate-pulse' 
                    : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Mic className="w-4 h-4 text-[#FF4D6D]" />
                <span>{isListening ? 'SIMULATING VOICE CAPTURE...' : 'Simulate Mic Input'}</span>
              </button>

              <button
                onClick={handleTranslate}
                className="flex items-center gap-2 bg-[#4FD1FF] text-[#070B17] hover:bg-[#4FD1FF]/80 px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200"
              >
                {isTranslating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Translate</span>
              </button>
            </div>
          </div>

          {/* Translated Result box */}
          {outputText && (
            <div className="bg-[#4FD1FF]/5 border border-[#4FD1FF]/20 rounded-xl p-4 space-y-2 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-[#4FD1FF] uppercase">AI LOCALIZED DEPLOYMENT</span>
                <Volume2 className="w-4 h-4 text-[#4FD1FF] cursor-pointer hover:scale-110 transition-transform" />
              </div>
              <p className="text-xs text-white leading-relaxed">{outputText}</p>
            </div>
          )}
        </div>

        {/* Global Multi-Language Announcement Hub */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#38FFB3]" />
                <h3 className="text-sm font-bold text-white">Multi-lingual Broadcaster</h3>
              </div>
              <span className="text-[10px] font-mono text-gray-500 uppercase">OFFICIAL ANNOUNCEMENTS</span>
            </div>

            {/* Selector category */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-500 uppercase">Announcement Context</label>
              <select
                value={announcementCategory}
                onChange={(e) => setAnnouncementCategory(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2 text-xs text-white outline-none cursor-pointer"
              >
                <option value="Security / Gate" className="bg-[#070B17]">Security / Gate Rerouting</option>
                <option value="Medical Dispatch" className="bg-[#070B17]">Medical Dispatch Notification</option>
                <option value="Weather / Safety" className="bg-[#070B17]">Weather / Safety Alert</option>
              </select>
            </div>

            {/* Announcement text */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-500 uppercase">English Draft</label>
              <textarea
                value={announcementDraft}
                onChange={(e) => setAnnouncementDraft(e.target.value)}
                className="w-full h-24 bg-white/[0.02] border border-white/5 focus:border-[#38FFB3]/30 rounded-xl p-4 text-xs text-white placeholder-gray-500 outline-none resize-none"
                placeholder="Write official announcement draft in English (e.g. 'Medical response team has been dispatched to sector 4')"
              />
            </div>

            {/* Select broadcast languages */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase block">Selected Translation Feeds</label>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.filter(l => l.code !== 'en').map((lang) => {
                  const isSelected = broadcastLanguages.includes(lang.code);
                  return (
                    <button
                      key={lang.code}
                      onClick={() => toggleLangToBroadcast(lang.code)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all duration-150 ${
                        isSelected 
                          ? 'bg-[#38FFB3]/10 text-[#38FFB3] border-[#38FFB3]/30' 
                          : 'bg-white/[0.01] text-gray-400 border-white/5 hover:bg-white/5'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.code.toUpperCase()}</span>
                      {isSelected && <Check className="w-3 h-3 text-[#38FFB3]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Trigger broadcast */}
          <div className="pt-4 border-t border-white/5 mt-4">
            <button
              onClick={handleBroadcast}
              className="w-full flex items-center justify-center gap-2 bg-[#38FFB3] text-[#070B17] hover:bg-[#38FFB3]/80 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Synthesize & Multicast Broadcast</span>
            </button>
          </div>
        </div>

      </div>

      {/* Broadcast History logs */}
      {broadcastLogs.length > 0 && (
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Synthesized Audio Broadcast Logs</span>
          <div className="space-y-3">
            {broadcastLogs.map((log, index) => (
              <div key={index} className="bg-[#070B17]/40 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-white">"{log.text}"</p>
                  <div className="flex flex-wrap gap-1.5">
                    {log.targets.map(target => (
                      <span key={target} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-400">
                        {target.toUpperCase()} TRANSLATION DEPLOYED
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#38FFB3] font-mono text-[10px]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>BROADCAST DELIVERED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
