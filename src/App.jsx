import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

export default function DentalPromptGenerator() {
  const [formData, setFormData] = useState({
    doctorName: '',
    country: 'مصر',
    specialty: 'طبيب أسنان عام',
    goal: 'زيادة الوعي',
    audience: 'كلاهما',
    platform: 'Instagram',
    contentType: 'بوست نصي',
    presentationType: 'بوست نصي عادي',
    tone: 'رسمي / موثوق / تعليمي',
    length: 'متوسط (100-250 كلمة)',
    language: 'عربي عامي',
    topic: '',
    addExample: 'لا',
    exampleDetails: '',
    visualElements: '',
    hashtags: '',
    autoHashtags: true,
    previousContent: '',
    notes: ''
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const countries = ['مصر', 'السعودية', 'الإمارات', 'الكويت', 'الأردن', 'لبنان', 'أخرى'];
  const specialties = ['طبيب أسنان عام', 'تقويم', 'جراحة فموية', 'تجميل الأسنان', 'علاج الجذور', 'أسنان الأطفال', 'زراعة الأسنان'];
  
  const goals = [
    { value: 'زيادة الوعي', desc: 'تعريف المرضى بالخدمات أو معلومات صحية مهمة' },
    { value: 'تشجيع التفاعل', desc: 'جذب المرضى للتفاعل (لايك، تعليق، مشاركة)' },
    { value: 'جذب المرضى / حجز مواعيد', desc: 'تحويل المتابعين إلى مرضى فعليين' },
    { value: 'بناء الثقة / المصداقية', desc: 'إظهار احترافية العيادة والخبرة الطبية' },
    { value: 'توجيه لموقع أو محتوى إضافي', desc: 'جذب المرضى لزيارة الموقع أو مقالات تعليمية' }
  ];

  const audiences = ['رجال', 'نساء', 'كلاهما', 'الأطفال (للأهل)', 'الشباب (18-35)', 'كبار السن (50+)'];
  
  const platforms = ['Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'X / Twitter', 'YouTube', 'Snapchat'];
  
  const contentTypes = [
    { value: 'بوست نصي', platforms: ['Instagram', 'Facebook', 'LinkedIn', 'X / Twitter'] },
    { value: 'صورة / تصميم بصري', platforms: ['Instagram', 'Facebook', 'Pinterest'] },
    { value: 'قصة Story', platforms: ['Instagram', 'Facebook', 'Snapchat'] },
    { value: 'فيديو قصير', platforms: ['Instagram', 'TikTok', 'YouTube', 'Facebook'] },
    { value: 'Carousel / Slides', platforms: ['Instagram', 'Facebook', 'LinkedIn'] },
    { value: 'Reel', platforms: ['Instagram', 'Facebook'] }
  ];

  const presentationTypes = {
    'بوست نصي': ['بوست نصي عادي', 'بوست مع سؤال للجمهور', 'بوست تعليمي مع نقاط'],
    'صورة / تصميم بصري': ['صورة واحدة مع نص', 'Quote / اقتباس مصمم', 'انفوجرافيك بسيط'],
    'قصة Story': ['Story نصية', 'Story تفاعلية (Poll/Quiz)', 'Story بصرية مع نص قصير'],
    'فيديو قصير': ['فيديو تعليمي (30-60 ثانية)', 'فيديو قبل وبعد', 'فيديو توضيحي للخدمة'],
    'Carousel / Slides': ['سلايدات تعليمية (5-10 سلايد)', 'قبل وبعد متعدد', 'خطوات أو نصائح متسلسلة'],
    'Reel': ['Reel سريع (15-30 ثانية)', 'Reel تعليمي', 'Reel ترفيهي/مرح']
  };

  const tones = ['رسمي / موثوق / تعليمي', 'ودّي / مرح / محفّز', 'قصصي / تجربة قبل وبعد', 'تحفيزي / تشجيعي'];
  const lengths = ['قصير (50-100 كلمة)', 'متوسط (100-250 كلمة)', 'طويل (250+ كلمة)'];
  const languages = ['عربي عامي', 'عربي فصحى', 'مزيج (فصحى مع عامية خفيفة)'];

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Reset presentation type when content type changes
      if (field === 'contentType') {
        updated.presentationType = presentationTypes[value]?.[0] || '';
      }
      
      return updated;
    });
  };

  const generatePrompt = () => {
    const goalInfo = goals.find(g => g.value === formData.goal);
    
    const prompt = `تصرف كخبير محتوى سوشيال ميديا محترف لأطباء الأسنان في الوطن العربي.

# معلومات المشروع:
- التخصص: ${formData.specialty}
- الدولة: ${formData.country}
- المنصة المستهدفة: ${formData.platform}
${formData.doctorName ? `- اسم العيادة/الطبيب: ${formData.doctorName}` : ''}

# تفاصيل المحتوى المطلوب:

## الموضوع:
"${formData.topic || 'الموضوع المحدد'}"

## نوع المحتوى والعرض:
- نوع المحتوى: ${formData.contentType}
- طريقة العرض: ${formData.presentationType}
- المنصة: ${formData.platform}

## الهدف الأساسي:
${formData.goal} - ${goalInfo?.desc || ''}

## الجمهور المستهدف:
${formData.audience}

## الأسلوب والنبرة:
- النبرة: ${formData.tone}
- اللغة: ${formData.language}
- الطول المطلوب: ${formData.length}

${formData.addExample === 'نعم' && formData.exampleDetails ? `
## مثال أو قصة واقعية:
${formData.exampleDetails}
استخدم هذا المثال أو القصة لتوضيح الفائدة أو المشكلة بشكل عملي ومؤثر.
` : ''}

${(formData.contentType === 'صورة / تصميم بصري' || formData.contentType === 'فيديو قصير' || formData.contentType === 'Reel' || formData.contentType === 'قصة Story') && formData.visualElements ? `
## العناصر البصرية المطلوبة:
${formData.visualElements}
` : ''}

# المتطلبات التفصيلية:

1. **البداية:**
   ${formData.contentType === 'بوست نصي' ? '- ابدأ بجملة قوية تلفت الانتباه خلال 3 ثوان' : ''}
   ${formData.contentType === 'فيديو قصير' || formData.contentType === 'Reel' ? '- ابدأ بهوك مرئي قوي في أول 2 ثانية' : ''}
   ${formData.contentType === 'قصة Story' ? '- اجعل أول Story جذابة بصرياً مع نص قصير مثير للفضول' : ''}

2. **المحتوى:**
   - استخدم أسلوب ${formData.tone}
   - اجعل المحتوى مناسب لـ ${formData.country} (الثقافة، اللهجة، العادات)
   - ${formData.contentType === 'بوست نصي' ? 'استخدم emojis بشكل معتدل ومناسب' : ''}
   - ${formData.contentType === 'Carousel / Slides' ? 'قسم المحتوى على 5-8 سلايدات، كل سلايد فكرة واحدة واضحة' : ''}
   - ${formData.contentType === 'فيديو قصير' || formData.contentType === 'Reel' ? 'اكتب سكريبت واضح مع توقيت كل جزء (ثانية/ثانيتين)' : ''}

3. **الدعوة لاتخاذ إجراء (Call-to-Action):**
   ${formData.goal === 'جذب المرضى / حجز مواعيد' ? '- أضف CTA واضح ومباشر للحجز (مثل: "احجز الآن عبر الرابط في البايو")' : ''}
   ${formData.goal === 'تشجيع التفاعل' ? '- اطلب من الجمهور التفاعل (مثل: "شاركنا تجربتك في التعليقات")' : ''}
   ${formData.goal === 'زيادة الوعي' ? '- شجع على المشاركة (مثل: "شارك هذا المنشور لتفيد غيرك")' : ''}
   ${formData.goal === 'توجيه لموقع أو محتوى إضافي' ? '- وجه للرابط بشكل واضح (مثل: "اقرأ المزيد على موقعنا")' : ''}

4. **الهاشتاجات:**
   ${formData.hashtags ? `- استخدم الهاشتاجات التالية: ${formData.hashtags}` : ''}
   ${formData.autoHashtags ? `- اقترح 5-7 هاشتاجات إضافية مناسبة لـ ${formData.platform} والجمهور المستهدف` : ''}

${(formData.contentType === 'صورة / تصميم بصري' || formData.contentType === 'فيديو قصير' || formData.contentType === 'Reel') ? `
5. **وصف العناصر البصرية:**
   - اكتب وصفاً تفصيلياً للصورة/الفيديو المطلوب
   - حدد الألوان، الخطوط، الحركة (إن وجدت)
   - اقترح أفكار إبداعية للتصميم البصري
` : ''}

${formData.previousContent ? `
# أسلوبي في الكتابة (للمحاكاة):
"${formData.previousContent.substring(0, 400)}${formData.previousContent.length > 400 ? '...' : ''}"

استخدم نفس الأسلوب واللهجة والـ Tone الموجود في المحتوى السابق.
` : ''}

${formData.notes ? `
# ملاحظات إضافية:
${formData.notes}
` : ''}

# تنسيق الإخراج:
${formData.contentType === 'بوست نصي' ? 'قدم البوست كاملاً جاهز للنسخ واللصق مباشرة.' : ''}
${formData.contentType === 'Carousel / Slides' ? 'قدم محتوى كل سلايد على حدة، مرقم ومنسق.' : ''}
${formData.contentType === 'فيديو قصير' || formData.contentType === 'Reel' ? 'قدم السكريبت كاملاً مع التوقيت والوصف البصري لكل مشهد.' : ''}
${formData.contentType === 'قصة Story' ? 'قدم محتوى كل Story على حدة مع الوصف البصري.' : ''}
${formData.contentType === 'صورة / تصميم بصري' ? 'قدم النص المصاحب للصورة + وصف تفصيلي للتصميم المطلوب.' : ''}

اجعل كل شيء احترافي، جذاب، ومناسب لـ ${formData.platform}.`;

    setGeneratedPrompt(prompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">مولد البرومبتات الذكي</h1>
          </div>
          <p className="text-gray-600 text-sm md:text-base">للدكاترة - احصل على برومبت احترافي مخصص لمحتواك في دقائق</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="space-y-6">
            {/* Level 1: Basic Info */}
            <div className="pb-6 border-b-2 border-blue-100">
              <h2 className="text-xl font-bold text-blue-600 mb-4">📋 المعلومات الأساسية</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">اسم الطبيب / العيادة (اختياري)</label>
                  <input
                    type="text"
                    value={formData.doctorName}
                    onChange={(e) => handleChange('doctorName', e.target.value)}
                    placeholder="د. أحمد أو عيادة النور"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">الدولة</label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">التخصص</label>
                    <select
                      value={formData.specialty}
                      onChange={(e) => handleChange('specialty', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الهدف الأساسي من المحتوى</label>
                  <select
                    value={formData.goal}
                    onChange={(e) => handleChange('goal', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    {goals.map(g => (
                      <option key={g.value} value={g.value}>
                        {g.value} - {g.desc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الجمهور المستهدف</label>
                  <select
                    value={formData.audience}
                    onChange={(e) => handleChange('audience', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    {audiences.map(aud => <option key={aud} value={aud}>{aud}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">المنصة المستهدفة</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => handleChange('platform', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    {platforms.map(plat => <option key={plat} value={plat}>{plat}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Level 2: Content & Style */}
            <div className="pb-6 border-b-2 border-teal-100">
              <h2 className="text-xl font-bold text-teal-600 mb-4">✍️ المحتوى والأسلوب</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">موضوع المحتوى (المطلوب) *</label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => handleChange('topic', e.target.value)}
                    placeholder="مثال: أهمية تنظيف الأسنان اليومي"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">نوع المحتوى</label>
                    <select
                      value={formData.contentType}
                      onChange={(e) => handleChange('contentType', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                    >
                      {contentTypes.map(ct => (
                        <option key={ct.value} value={ct.value}>{ct.value}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">طريقة العرض / السياق</label>
                    <select
                      value={formData.presentationType}
                      onChange={(e) => handleChange('presentationType', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                    >
                      {(presentationTypes[formData.contentType] || []).map(pt => (
                        <option key={pt} value={pt}>{pt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">النبرة / الأسلوب</label>
                    <select
                      value={formData.tone}
                      onChange={(e) => handleChange('tone', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                    >
                      {tones.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">طول المحتوى</label>
                    <select
                      value={formData.length}
                      onChange={(e) => handleChange('length', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                    >
                      {lengths.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">اللغة</label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                  >
                    {languages.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">هل تريد إضافة مثال أو قصة واقعية؟</label>
                  <select
                    value={formData.addExample}
                    onChange={(e) => handleChange('addExample', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none mb-2"
                  >
                    <option value="لا">لا</option>
                    <option value="نعم">نعم - أريد إضافة مثال محدد</option>
                  </select>
                  {formData.addExample === 'نعم' && (
                    <textarea
                      value={formData.exampleDetails}
                      onChange={(e) => handleChange('exampleDetails', e.target.value)}
                      placeholder="مثال: مريض كان يعاني من تسوس شديد، بعد العلاج أصبح يبتسم بثقة..."
                      rows="3"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
                    />
                  )}
                </div>

                {(formData.contentType === 'صورة / تصميم بصري' || 
                  formData.contentType === 'فيديو قصير' || 
                  formData.contentType === 'Reel' ||
                  formData.contentType === 'قصة Story') && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      وصف العناصر البصرية المطلوبة
                    </label>
                    <textarea
                      value={formData.visualElements}
                      onChange={(e) => handleChange('visualElements', e.target.value)}
                      placeholder="مثال: صورة لطبيب يبتسم مع مريض، خلفية بيضاء نظيفة، ألوان أزرق وأبيض، إضاءة ساطعة..."
                      rows="3"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الهاشتاجات (اختياري)</label>
                  <input
                    type="text"
                    value={formData.hashtags}
                    onChange={(e) => handleChange('hashtags', e.target.value)}
                    placeholder="#طب_الأسنان #عيادة_الأسنان"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
                  />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.autoHashtags}
                      onChange={(e) => handleChange('autoHashtags', e.target.checked)}
                      className="w-4 h-4 text-teal-500"
                    />
                    <span className="text-sm text-gray-600">اقترح هاشتاجات إضافية</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Level 3: Advanced */}
            <div>
              <h2 className="text-xl font-bold text-purple-600 mb-4">⚙️ تخصيص متقدم (اختياري)</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    مثال من محتواك السابق (لمحاكاة أسلوبك)
                  </label>
                  <textarea
                    value={formData.previousContent}
                    onChange={(e) => handleChange('previousContent', e.target.value)}
                    placeholder="الصق هنا مثال لبوست سابق كتبته..."
                    rows="3"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ملاحظات إضافية</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="أي تفاصيل إضافية أو نقاط تريد التركيز عليها..."
                    rows="2"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePrompt}
            disabled={!formData.topic}
            className="w-full mt-8 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold py-4 rounded-xl hover:from-blue-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            توليد البرومبت الآن
          </button>
        </div>

        {/* Generated Prompt */}
        {generatedPrompt && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">🎯 البرومبت الجاهز</h2>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'تم النسخ!' : 'نسخ'}
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{generatedPrompt}</pre>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-sm text-blue-800 font-semibold">📝 الخطوة التالية:</p>
              <ol className="text-sm text-blue-700 mt-2 space-y-1 mr-4">
                <li>1. اضغط على "نسخ" لنسخ البرومبت</li>
                <li>2. افتح ChatGPT (أو أي AI tool)</li>
                <li>3. الصق البرومبت واضغط Enter</li>
                <li>4. احصل على محتوى احترافي جاهز للنشر! 🎉</li>
              </ol>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>صُنع بـ ❤️ لمساعدة الدكاترة في صناعة محتوى احترافي</p>
        </div>
      </div>
    </div>
  );
}