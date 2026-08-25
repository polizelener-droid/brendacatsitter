export const POLI_WHATSAPP = '5491166906291';
export const POLI_PHONE_FORMATTED = '+54 9 11 6690-6291';

export const POLI_WHATSAPP_BASE_MESSAGE =
  'Hola Poli! Me gustaría consultar disponibilidad y tarifas para el cuidado de mi gato';

export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
