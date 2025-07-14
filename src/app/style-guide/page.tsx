// src/app/style-guide/page.tsx
import tailwindConfig from "../../../tailwind.config";
import { JSX } from "react";

// Tailwind renk yapılandırması için tip tanımları
type ColorValue = string;
interface ColorObject {
  [key: string]: ColorValue | ColorObject;
}

// Tek bir renk örneğini gösteren bileşen
const ColorSwatch = ({ name, color }: { name: string; color: string }) => {
  const boxStyle = {
    width: '80px',
    height: '80px',
    backgroundColor: color,
    border: '2px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    flexShrink: 0,
    display: 'block'
  };

  return (
    <div style={{
      marginBottom: '24px',
      padding: '16px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={boxStyle}
          title={`Color: ${color}`}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '4px',
            margin: 0
          }}>
            {name}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            fontFamily: 'monospace',
            marginBottom: '8px',
            margin: '4px 0 8px 0'
          }}>
            {color}
          </p>
          <code style={{
            display: 'inline-block',
            padding: '4px 8px',
            fontSize: '12px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            fontFamily: 'monospace'
          }}>
            bg-{name}
          </code>
        </div>
      </div>
    </div>
  );
};

const StyleGuidePage = () => {
  // Bu sayfanın sadece geliştirme modunda çalışmasını sağla
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  // Tailwind CSS v4'te direkt olarak config'den colors'a erişiyoruz
  const colors = tailwindConfig.theme?.extend?.colors || {};

  // Debug: konsola colors objesini yazdır
  console.log("Colors from config:", colors);

  // Renk objesini alıp ColorSwatch bileşenlerine dönüştüren yardımcı fonksiyon
  const renderColorSwatches = (colorObject: ColorObject, prefix = ""): JSX.Element[] => {
    return Object.entries(colorObject).flatMap(([key, value]) => {
      // Değer bir string ise (örn: '#FFFFFF')
      if (typeof value === "string") {
        const name = prefix ? `${prefix}-${key}`.replace("-DEFAULT", "") : key;
        console.log(`Rendering color: ${name} = ${value}`); // Debug
        return <ColorSwatch key={name} name={name} color={value} />;
      }
      // Değer bir obje ise, fonksiyonu tekrar çağır (recursive)
      if (typeof value === "object" && value !== null) {
        return renderColorSwatches(value, prefix ? `${prefix}-${key}` : key);
      }
      return [];
    });
  };

  const colorSwatches = renderColorSwatches(colors as ColorObject);
  console.log("Generated swatches count:", colorSwatches.length); // Debug

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '32px'
    }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        <header style={{
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '12px',
            margin: '0 0 12px 0'
          }}>
            Yaşayan Stil Rehberi
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280'
          }}>
            Bu stil rehberi, projenin güncel tema yapılandırmasını yansıtır (
            <code style={{
              backgroundColor: '#f3f4f6',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'monospace'
            }}>
              tailwind.config.ts
            </code>
            ).
          </p>
        </header>

        <section>
          <h2 style={{
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '24px',
            margin: '0 0 24px 0'
          }}>
            Renk Paleti
          </h2>
          
          {colorSwatches.length > 0 ? (
            <div>
              {colorSwatches}
            </div>
          ) : (
            <div style={{
              padding: '16px',
              backgroundColor: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '8px'
            }}>
              <p style={{ color: '#92400e' }}>
                Hiç renk bulunamadı. Tailwind yapılandırmanızı kontrol edin.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default StyleGuidePage; 