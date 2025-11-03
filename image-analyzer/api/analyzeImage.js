import Anthropic from "@anthropic-ai/sdk";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { imageBase64, imageType, mode, apiKey } = req.body;

    if (!imageBase64 || !imageType || !mode || !apiKey) {
      return res.status(400).json({
        error: "Faltan parámetros: imageBase64, imageType, mode, apiKey",
      });
    }

    if (!apiKey.startsWith("sk-ant-")) {
      return res.status(400).json({ error: "API key de Anthropic inválida" });
    }

    const client = new Anthropic({
      apiKey: apiKey,
    });

    const prompt =
      mode === "ecommerce"
        ? `Analiza esta imagen de producto y genera una descripción detallada y profesional para un e-commerce. 
           
           Incluye:
           - Descripción visual del producto
           - Materiales visibles
           - Colores y acabados
           - Detalles de construcción
           - Estilo/categoría
           - Dimensiones aproximadas (si se ve a escala)
           - Cualquier distintivo o marca visible
           - Condición del producto
           
           Formatea como un prompt detallado para generación de imágenes de e-commerce optimizado para plataformas como Midjourney o Stable Diffusion.
           
           Ejemplo de formato esperado: "A hyperrealistic product photograph featuring [descripción detallada]... E-commerce photography optimized for online retail. 8K quality, sharp focus, studio lighting --ar 9:16 --raw"`
        : `Analiza esta imagen y genera una descripción editorial creativa y artística.
           
           Incluye:
           - Análisis visual completo
           - Estilo y aesthetic
           - Composición y elementos visuales
           - Mood y atmósfera
           - Detalles de vestuario/styling
           - Contexto y narrativa visual
           - Técnica fotográfica
           - Influencias de estilo
           
           Formatea como un prompt artístico para generación de imágenes de alta calidad.
           
           Ejemplo de formato esperado: "A fashion editorial photograph with [descripción detallada]... Editorial styling, magazine quality, artistic direction --ar 9:16"`;

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: imageType,
                data: imageBase64,
              },
            },
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    });

    const description = response.content[0].text;

    return res.status(200).json({
      success: true,
      description: description,
    });
  } catch (error) {
    console.error("Error:", error);

    if (error.message && error.message.includes("401")) {
      return res.status(401).json({
        error: "API key de Anthropic inválida o expirada",
      });
    }

    if (error.message && error.message.includes("overloaded")) {
      return res.status(429).json({
        error: "Servidor de Anthropic sobrecargado. Intenta más tarde.",
      });
    }

    return res.status(500).json({
      error: error.message || "Error al procesar la imagen",
    });
  }
}
