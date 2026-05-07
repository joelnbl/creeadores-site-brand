"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { LandingFooter } from "@/components/landing/landing-footer";
import type { Locale } from "@/lib/i18n";

type PrivacySection = {
  title: string;
  paragraphs?: string[];
  intro?: string;
  items?: string[];
  emphasis?: string;
  contactPrefix?: string;
  groups?: { title: string; items: string[] }[];
};

type PrivacyContent = {
  title: string;
  lastUpdated: string;
  sections: PrivacySection[];
};

const CONTACT_EMAIL = "info@creeadores.com";

function getPrivacyContent(locale: Locale): PrivacyContent {
  const lang = locale.startsWith("pt") ? "pt" : locale.startsWith("en") ? "en" : "es";

  const content: Record<string, PrivacyContent> = {
    es: {
      title: "Política de Privacidad",
      lastUpdated: "Última actualización: 16 de enero de 2026",
      sections: [
        {
          title: "1. Introducción",
          paragraphs: [
            "Esta Política de Privacidad explica cómo CREEADORES recopila, utiliza y protege tu información personal cuando usás nuestra Plataforma.",
          ],
        },
        {
          title: "2. Información que recopilamos",
          groups: [
            {
              title: "2.1 Información que proporcionás",
              items: [
                "Nombre, email y nombre de usuario",
                "Información de perfil (bio, redes sociales)",
                "Información de pago (procesada por proveedores externos)",
                "Mensajes y comunicaciones relacionadas con campañas",
              ],
            },
            {
              title: "2.2 Información recopilada automáticamente",
              items: [
                "Datos de dispositivo y uso",
                "Dirección IP",
                "Interacciones dentro de la app y analítica",
              ],
            },
          ],
        },
        {
          title: "3. Cómo usamos la información",
          intro: "Usamos tu información para:",
          items: [
            "Operar y mejorar la Plataforma",
            "Facilitar campañas y pagos",
            "Comunicarnos con usuarios",
            "Asegurar cumplimiento y prevenir fraude",
            "Brindar soporte",
          ],
        },
        {
          title: "4. Pagos",
          paragraphs: [
            "La información de pago es procesada de forma segura por procesadores de pago de terceros.",
            "No almacenamos datos completos de tarjetas o cuentas bancarias.",
          ],
        },
        {
          title: "5. Compartir información",
          intro: "Podemos compartir información con:",
          items: [
            "Otros usuarios, cuando sea necesario para campañas",
            "Procesadores de pago",
            "Proveedores de analítica e infraestructura",
            "Autoridades legales cuando la ley lo requiera",
          ],
          emphasis: "No vendemos datos personales.",
        },
        {
          title: "6. Retención de datos",
          intro: "Conservamos datos personales el tiempo necesario para:",
          items: [
            "Prestar la Plataforma",
            "Cumplir obligaciones legales",
            "Resolver disputas",
          ],
        },
        {
          title: "7. Tus derechos",
          intro: "Dependiendo de tu jurisdicción, podés tener derecho a:",
          items: [
            "Acceder a tus datos",
            "Corregir datos inexactos",
            "Solicitar la eliminación de tus datos",
            "Optar por no recibir ciertas comunicaciones",
          ],
          contactPrefix: "Podés hacer solicitudes en",
        },
        {
          title: "8. Seguridad",
          paragraphs: [
            "Implementamos medidas técnicas y organizacionales razonables para proteger tus datos.",
            "Sin embargo, ningún sistema es 100% seguro.",
          ],
        },
        {
          title: "9. Privacidad de menores",
          paragraphs: [
            "La Plataforma no está destinada a usuarios menores de 18 años.",
            "No recopilamos deliberadamente datos de menores.",
          ],
        },
        {
          title: "10. Usuarios internacionales",
          paragraphs: [
            "Tus datos pueden procesarse y almacenarse en países fuera del tuyo. Al usar la Plataforma, consentís esta transferencia.",
          ],
        },
        {
          title: "11. Cambios a esta política",
          paragraphs: [
            "Podemos actualizar esta Política de Privacidad periódicamente. El uso continuo de la Plataforma constituye aceptación de esos cambios.",
          ],
        },
        {
          title: "12. Contacto",
          paragraphs: ["Para consultas relacionadas con privacidad, escribinos a:"],
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: January 16, 2026",
      sections: [
        {
          title: "1. Introduction",
          paragraphs: [
            "This Privacy Policy explains how CREEADORES collects, uses, and protects your personal information when you use our Platform.",
          ],
        },
        {
          title: "2. Information We Collect",
          groups: [
            {
              title: "2.1 Information You Provide",
              items: [
                "Name, email, username",
                "Profile information (bio, social links)",
                "Payment information (processed by third-party providers)",
                "Messages and campaign-related communications",
              ],
            },
            {
              title: "2.2 Automatically Collected Information",
              items: [
                "Device and usage data",
                "IP address",
                "App interactions and analytics",
              ],
            },
          ],
        },
        {
          title: "3. How We Use Information",
          intro: "We use your information to:",
          items: [
            "Operate and improve the Platform",
            "Facilitate campaigns and payments",
            "Communicate with users",
            "Ensure compliance and prevent fraud",
            "Provide customer support",
          ],
        },
        {
          title: "4. Payments",
          paragraphs: [
            "Payment information is processed securely by third-party payment processors.",
            "We do not store full credit card or banking details.",
          ],
        },
        {
          title: "5. Sharing of Information",
          intro: "We may share information with:",
          items: [
            "Other users (as required for campaigns)",
            "Payment processors",
            "Analytics and infrastructure providers",
            "Legal authorities when required by law",
          ],
          emphasis: "We do not sell personal data.",
        },
        {
          title: "6. Data Retention",
          intro: "We retain personal data as long as necessary to:",
          items: [
            "Provide the Platform",
            "Comply with legal obligations",
            "Resolve disputes",
          ],
        },
        {
          title: "7. Your Rights",
          intro: "Depending on your jurisdiction, you may have the right to:",
          items: [
            "Access your data",
            "Correct inaccurate data",
            "Request deletion of your data",
            "Opt out of certain communications",
          ],
          contactPrefix: "Requests can be made at",
        },
        {
          title: "8. Security",
          paragraphs: [
            "We implement reasonable technical and organizational measures to protect your data.",
            "However, no system is 100% secure.",
          ],
        },
        {
          title: "9. Children's Privacy",
          paragraphs: [
            "The Platform is not intended for users under 18.",
            "We do not knowingly collect data from minors.",
          ],
        },
        {
          title: "10. International Users",
          paragraphs: [
            "Your data may be processed and stored in countries outside your own. By using the Platform, you consent to this transfer.",
          ],
        },
        {
          title: "11. Changes to Privacy Policy",
          paragraphs: [
            "We may update this Privacy Policy periodically. Continued use of the Platform constitutes acceptance of the changes.",
          ],
        },
        {
          title: "12. Contact",
          paragraphs: ["For privacy-related inquiries, contact:"],
        },
      ],
    },
    pt: {
      title: "Política de Privacidade",
      lastUpdated: "Última atualização: 16 de janeiro de 2026",
      sections: [
        {
          title: "1. Introdução",
          paragraphs: [
            "Esta Política de Privacidade explica como a CREEADORES coleta, usa e protege suas informações pessoais quando você utiliza nossa Plataforma.",
          ],
        },
        {
          title: "2. Informações que coletamos",
          groups: [
            {
              title: "2.1 Informações fornecidas por você",
              items: [
                "Nome, email e nome de usuário",
                "Informações de perfil (bio, links sociais)",
                "Informações de pagamento (processadas por provedores terceiros)",
                "Mensagens e comunicações relacionadas a campanhas",
              ],
            },
            {
              title: "2.2 Informações coletadas automaticamente",
              items: [
                "Dados de dispositivo e uso",
                "Endereço IP",
                "Interações no app e analítica",
              ],
            },
          ],
        },
        {
          title: "3. Como usamos as informações",
          intro: "Usamos suas informações para:",
          items: [
            "Operar e melhorar a Plataforma",
            "Facilitar campanhas e pagamentos",
            "Nos comunicar com usuários",
            "Garantir conformidade e prevenir fraude",
            "Oferecer suporte",
          ],
        },
        {
          title: "4. Pagamentos",
          paragraphs: [
            "As informações de pagamento são processadas com segurança por processadores de pagamento de terceiros.",
            "Não armazenamos dados completos de cartão de crédito ou bancários.",
          ],
        },
        {
          title: "5. Compartilhamento de informações",
          intro: "Podemos compartilhar informações com:",
          items: [
            "Outros usuários, quando necessário para campanhas",
            "Processadores de pagamento",
            "Provedores de infraestrutura e analítica",
            "Autoridades legais quando exigido por lei",
          ],
          emphasis: "Não vendemos dados pessoais.",
        },
        {
          title: "6. Retenção de dados",
          intro: "Mantemos dados pessoais pelo tempo necessário para:",
          items: [
            "Fornecer a Plataforma",
            "Cumprir obrigações legais",
            "Resolver disputas",
          ],
        },
        {
          title: "7. Seus direitos",
          intro: "Dependendo da sua jurisdição, você pode ter o direito de:",
          items: [
            "Acessar seus dados",
            "Corrigir dados incorretos",
            "Solicitar a exclusão dos seus dados",
            "Cancelar determinadas comunicações",
          ],
          contactPrefix: "As solicitações podem ser feitas em",
        },
        {
          title: "8. Segurança",
          paragraphs: [
            "Implementamos medidas técnicas e organizacionais razoáveis para proteger seus dados.",
            "No entanto, nenhum sistema é 100% seguro.",
          ],
        },
        {
          title: "9. Privacidade de menores",
          paragraphs: [
            "A Plataforma não se destina a usuários menores de 18 anos.",
            "Não coletamos conscientemente dados de menores.",
          ],
        },
        {
          title: "10. Usuários internacionais",
          paragraphs: [
            "Seus dados podem ser processados e armazenados em países fora do seu. Ao usar a Plataforma, você consente com essa transferência.",
          ],
        },
        {
          title: "11. Alterações nesta política",
          paragraphs: [
            "Podemos atualizar esta Política de Privacidade periodicamente. O uso contínuo da Plataforma constitui aceitação dessas mudanças.",
          ],
        },
        {
          title: "12. Contato",
          paragraphs: ["Para dúvidas relacionadas à privacidade, entre em contato em:"],
        },
      ],
    },
  };

  return content[lang]!;
}

function SectionRenderer({ section }: { section: PrivacySection }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h2>

      {section.paragraphs?.map((p, i) => (
        <p key={i} className="text-gray-600 text-sm leading-relaxed mb-2">
          {p}
        </p>
      ))}

      {section.groups?.map((group, i) => (
        <div key={i} className="mb-4">
          <h3 className="text-sm font-medium text-gray-800 mb-2">{group.title}</h3>
          <ul className="list-disc pl-5 space-y-1">
            {group.items.map((item, j) => (
              <li key={j} className="text-gray-600 text-sm leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      ))}

      {section.intro && (
        <p className="text-gray-600 text-sm leading-relaxed mb-2">{section.intro}</p>
      )}

      {section.items && (
        <ul className="list-disc pl-5 space-y-1">
          {section.items.map((item, i) => (
            <li key={i} className="text-gray-600 text-sm leading-relaxed">{item}</li>
          ))}
        </ul>
      )}

      {section.emphasis && (
        <p className="text-gray-800 text-sm font-medium mt-3">{section.emphasis}</p>
      )}

      {section.contactPrefix && (
        <p className="text-gray-600 text-sm mt-3">
          {section.contactPrefix}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0019DA] hover:underline font-medium">
            {CONTACT_EMAIL}
          </a>
        </p>
      )}

      {section.title.startsWith("12") && (
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0019DA] hover:underline text-sm font-medium">
          {CONTACT_EMAIL}
        </a>
      )}
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const { locale } = useLanguage();
  const content = getPrivacyContent(locale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          {locale.startsWith("pt") ? "Voltar" : locale.startsWith("en") ? "Back" : "Volver"}
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
          <h1
            className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #0019DA, #db2777)" }}
          >
            {content.title}
          </h1>
          <p className="text-gray-400 text-xs mb-8">{content.lastUpdated}</p>

          {content.sections.map((section, i) => (
            <SectionRenderer key={i} section={section} />
          ))}
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}
