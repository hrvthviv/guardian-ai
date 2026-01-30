export default async function handler(req, res) {
    const { contract } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    const prompt = `
    Te egy kíméletlen, profi auditor vagy. Elemezd az alábbi szerződést csapdák után kutatva.
    Használd a struktúrát: RISK SCORE, THE TRAPS (magyarázd el egyszerűen), THE REDLINE (mit írjanak át).
    Szerződés szövege: ${contract}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await response.json();
    const analysis = data.candidates[0].content.parts[0].text;

    res.status(200).json({ analysis });
}
