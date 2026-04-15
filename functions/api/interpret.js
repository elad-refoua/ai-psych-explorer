export async function onRequestPost(context) {
  const GEMINI_KEY = context.env.GEMINI_API_KEY;
  if (!GEMINI_KEY) {
    return new Response(JSON.stringify({error: 'API key not configured'}), {
      status: 503,
      headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
    });
  }

  try {
    const body = await context.request.json();
    const statsText = body.stats || '';
    const mode = body.mode || 'general';

    const prompt = `You are a research psychologist interpreting statistical findings from a study about AI use for mental health among Israeli adults.

Given these statistical results:
${statsText}

Write a clear, concise interpretation in ENGLISH (3-5 sentences) that:
1. States the key finding in plain language anyone can understand
2. Explains what it means practically for AI mental health use
3. Notes whether effects are significant or not — never exaggerate non-significant findings
4. If relevant, mentions effect sizes and clinical meaningfulness
5. Ends with one brief limitation or caveat

Style: Write like a research summary for an educated non-statistician. Be precise but accessible.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          contents: [{parts: [{text: prompt}]}],
          generationConfig: {temperature: 0.3, maxOutputTokens: 500}
        })
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No interpretation generated.';

    return new Response(JSON.stringify({interpretation: text}), {
      headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
    });
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), {
      status: 500,
      headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
