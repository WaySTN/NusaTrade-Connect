import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, targetLang } = await req.json();
    if (!text) return NextResponse.json({ text: '' });
    if (targetLang === 'id') return NextResponse.json({ text });

    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
    const data = await response.json();
    
    if (data && data[0]) {
      const translatedText = data[0].map((item: any) => item[0]).join('');
      return NextResponse.json({ text: translatedText });
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ text: 'Error' });
  }
}
