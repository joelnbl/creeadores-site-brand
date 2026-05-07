"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { LandingFooter } from "@/components/landing/landing-footer";
import type { Locale } from "@/lib/i18n";

type TermsContent = {
  title: string;
  lastUpdated: string;
  sections: {
    introduction: { title: string; welcome: string; description: string; agreement: string };
    eligibility: { title: string; ageRequirement: string; legalCapacity: string };
    accounts: { title: string; accountCreation: string; youAgree: string; provideAccurate: string; maintainSecurity: string; acceptResponsibility: string; rightToSuspend: string };
    marketplace: { title: string; brands: { title: string; may: string; createCampaigns: string; defineDeliverables: string; reviewAndHire: string; payCreators: string }; creators: { title: string; may: string; applyToCampaigns: string; submitContent: string; receivePayment: string } };
    payments: { title: string; allPayments: string; serviceFees: string; paymentRelease: string; notABank: string };
    content: { title: string; userContent: { title: string; creatorsRetain: string; licenseGrant: string }; platformContent: { title: string; ownership: string } };
    prohibited: { title: string; youAgreeNotTo: string; violateLaws: string; postMisleading: string; circumventPayment: string; harassAbuse: string; scrapeReverse: string };
    disputes: { title: string; resolution: string };
    termination: { title: string; rightToTerminate: string; uponTermination: string; outstandingObligations: string; accessRevoked: string };
    disclaimer: { title: string; asIs: string; noWarranties: string };
    limitation: { title: string; maximumExtent: string };
    governingLaw: { title: string; argentinaLaw: string };
    changes: { title: string; mayUpdate: string };
    contact: { title: string; questions: string; email: string };
  };
};

function getTermsContent(locale: Locale): TermsContent {
  const lang = locale.startsWith("pt") ? "pt" : locale.startsWith("en") ? "en" : "es";

  const content: Record<string, TermsContent> = {
    en: {
      title: "Terms of Service",
      lastUpdated: "Last updated: January 16, 2026",
      sections: {
        introduction: {
          title: "1. Introduction",
          welcome: 'Welcome to CREEADORES ("Company", "we", "us", or "our").',
          description: 'CREEADORES is a marketplace that connects brands ("Brands") with user-generated content creators ("Creators") to collaborate on marketing campaigns, including the creation and delivery of UGC. Payments are facilitated through the Platform.',
          agreement: "By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree, do not use the Platform.",
        },
        eligibility: {
          title: "2. Eligibility",
          ageRequirement: "You must be at least 18 years old to use the Platform.",
          legalCapacity: "By using the Platform, you represent and warrant that you have the legal capacity to enter into these Terms.",
        },
        accounts: {
          title: "3. Accounts",
          accountCreation: "To use certain features, you must create an account.",
          youAgree: "You agree to:",
          provideAccurate: "Provide accurate and complete information",
          maintainSecurity: "Maintain the security of your account credentials",
          acceptResponsibility: "Accept responsibility for all activity under your account",
          rightToSuspend: "We reserve the right to suspend or terminate accounts that violate these Terms.",
        },
        marketplace: {
          title: "4. Marketplace Overview",
          brands: {
            title: "4.1 Brands",
            may: "Brands may:",
            createCampaigns: "Create campaigns",
            defineDeliverables: "Define deliverables, timelines, and compensation",
            reviewAndHire: "Review and hire Creators",
            payCreators: "Pay Creators through the Platform",
          },
          creators: {
            title: "4.2 Creators",
            may: "Creators may:",
            applyToCampaigns: "Apply to campaigns",
            submitContent: "Submit content according to campaign requirements",
            receivePayment: "Receive payment through the Platform upon completion and approval",
          },
        },
        payments: {
          title: "5. Payments & Fees",
          allPayments: "All payments must be made through the Platform.",
          serviceFees: "We may charge service or transaction fees, which will be disclosed prior to payment.",
          paymentRelease: "Payments to Creators are released once deliverables are submitted and approved, subject to campaign terms.",
          notABank: "We are not a bank or escrow service, but we facilitate payments via third-party payment providers.",
        },
        content: {
          title: "6. Content & Intellectual Property",
          userContent: {
            title: "6.1 User Content",
            creatorsRetain: "Creators retain ownership of the content they create unless otherwise agreed in the campaign terms.",
            licenseGrant: "By submitting content through the Platform, Creators grant Brands a license as defined in the campaign (e.g., usage rights, duration, platforms).",
          },
          platformContent: {
            title: "6.2 Platform Content",
            ownership: "All Platform software, branding, and design are owned by CREEADORES and may not be copied or used without permission.",
          },
        },
        prohibited: {
          title: "7. Prohibited Conduct",
          youAgreeNotTo: "You agree not to:",
          violateLaws: "Violate any applicable laws or regulations",
          postMisleading: "Post misleading, fraudulent, or illegal content",
          circumventPayment: "Circumvent the Platform's payment system",
          harassAbuse: "Harass, abuse, or exploit other users",
          scrapeReverse: "Attempt to scrape or reverse-engineer the Platform",
        },
        disputes: {
          title: "8. Disputes Between Users",
          resolution: "Disputes between Brands and Creators should be resolved directly. We may, at our discretion, assist with mediation but are not responsible for outcomes.",
        },
        termination: {
          title: "9. Termination",
          rightToTerminate: "We may suspend or terminate your access at any time if you violate these Terms or misuse the Platform.",
          uponTermination: "Upon termination:",
          outstandingObligations: "Outstanding obligations remain enforceable",
          accessRevoked: "Access to your account and content may be revoked",
        },
        disclaimer: {
          title: "10. Disclaimer of Warranties",
          asIs: 'The Platform is provided "as is" and "as available".',
          noWarranties: "We make no warranties regarding campaign success, creator performance, or earnings.",
        },
        limitation: {
          title: "11. Limitation of Liability",
          maximumExtent: "To the maximum extent permitted by law, CREEADORES shall not be liable for indirect, incidental, or consequential damages, including lost profits or data.",
        },
        governingLaw: {
          title: "12. Governing Law",
          argentinaLaw: "These Terms shall be governed by the laws of Argentina, without regard to conflict of law principles.",
        },
        changes: {
          title: "13. Changes to Terms",
          mayUpdate: "We may update these Terms from time to time. Continued use of the Platform constitutes acceptance of the updated Terms.",
        },
        contact: {
          title: "14. Contact",
          questions: "For questions or concerns, contact us at:",
          email: "info@creeadores.com",
        },
      },
    },
    es: {
      title: "Términos y Condiciones",
      lastUpdated: "Última actualización: 16 de enero de 2026",
      sections: {
        introduction: {
          title: "1. Introducción",
          welcome: 'Bienvenido a CREEADORES ("Compañía", "nosotros", "nos" o "nuestro").',
          description: 'CREEADORES es un marketplace que conecta marcas ("Marcas") con creadores de contenido generado por usuarios ("Creadores") para colaborar en campañas de marketing, incluyendo la creación y entrega de UGC. Los pagos se facilitan a través de la Plataforma.',
          agreement: "Al acceder o usar la Plataforma, aceptás estar sujeto a estos Términos. Si no estás de acuerdo, no uses la Plataforma.",
        },
        eligibility: {
          title: "2. Elegibilidad",
          ageRequirement: "Debés tener al menos 18 años para usar la Plataforma.",
          legalCapacity: "Al usar la Plataforma, declarás y garantizás que tenés la capacidad legal para celebrar estos Términos.",
        },
        accounts: {
          title: "3. Cuentas",
          accountCreation: "Para usar ciertas funciones, debés crear una cuenta.",
          youAgree: "Aceptás:",
          provideAccurate: "Proporcionar información precisa y completa",
          maintainSecurity: "Mantener la seguridad de las credenciales de tu cuenta",
          acceptResponsibility: "Aceptar la responsabilidad por toda la actividad bajo tu cuenta",
          rightToSuspend: "Nos reservamos el derecho de suspender o terminar cuentas que violen estos Términos.",
        },
        marketplace: {
          title: "4. Resumen del Marketplace",
          brands: {
            title: "4.1 Marcas",
            may: "Las Marcas pueden:",
            createCampaigns: "Crear campañas",
            defineDeliverables: "Definir entregables, plazos y compensación",
            reviewAndHire: "Revisar y contratar Creadores",
            payCreators: "Pagar a los Creadores a través de la Plataforma",
          },
          creators: {
            title: "4.2 Creadores",
            may: "Los Creadores pueden:",
            applyToCampaigns: "Aplicar a campañas",
            submitContent: "Enviar contenido según los requisitos de la campaña",
            receivePayment: "Recibir pago a través de la Plataforma una vez completado y aprobado",
          },
        },
        payments: {
          title: "5. Pagos y Tarifas",
          allPayments: "Todos los pagos deben realizarse a través de la Plataforma.",
          serviceFees: "Podemos cobrar tarifas de servicio o transacción, que se divulgarán antes del pago.",
          paymentRelease: "Los pagos a los Creadores se liberan una vez que se envían y aprueban los entregables, sujeto a los términos de la campaña.",
          notABank: "No somos un banco ni un servicio de depósito en garantía, pero facilitamos pagos a través de proveedores de pago de terceros.",
        },
        content: {
          title: "6. Contenido y Propiedad Intelectual",
          userContent: {
            title: "6.1 Contenido del Usuario",
            creatorsRetain: "Los Creadores conservan la propiedad del contenido que crean a menos que se acuerde lo contrario en los términos de la campaña.",
            licenseGrant: "Al enviar contenido a través de la Plataforma, los Creadores otorgan a las Marcas una licencia según se define en la campaña (por ejemplo, derechos de uso, duración, plataformas).",
          },
          platformContent: {
            title: "6.2 Contenido de la Plataforma",
            ownership: "Todo el software, marca y diseño de la Plataforma son propiedad de CREEADORES y no pueden copiarse o usarse sin permiso.",
          },
        },
        prohibited: {
          title: "7. Conducta Prohibida",
          youAgreeNotTo: "Aceptás no:",
          violateLaws: "Violar cualquier ley o regulación aplicable",
          postMisleading: "Publicar contenido engañoso, fraudulento o ilegal",
          circumventPayment: "Eludir el sistema de pago de la Plataforma",
          harassAbuse: "Acosar, abusar o explotar a otros usuarios",
          scrapeReverse: "Intentar extraer o hacer ingeniería inversa de la Plataforma",
        },
        disputes: {
          title: "8. Disputas Entre Usuarios",
          resolution: "Las disputas entre Marcas y Creadores deben resolverse directamente. Podemos, a nuestra discreción, ayudar con la mediación pero no somos responsables de los resultados.",
        },
        termination: {
          title: "9. Terminación",
          rightToTerminate: "Podemos suspender o terminar tu acceso en cualquier momento si violás estos Términos o hacés mal uso de la Plataforma.",
          uponTermination: "Al terminar:",
          outstandingObligations: "Las obligaciones pendientes siguen siendo exigibles",
          accessRevoked: "El acceso a tu cuenta y contenido puede ser revocado",
        },
        disclaimer: {
          title: "10. Exención de Garantías",
          asIs: 'La Plataforma se proporciona "tal cual" y "según disponibilidad".',
          noWarranties: "No ofrecemos garantías con respecto al éxito de la campaña, el rendimiento del creador o las ganancias.",
        },
        limitation: {
          title: "11. Limitación de Responsabilidad",
          maximumExtent: "En la máxima medida permitida por la ley, CREEADORES no será responsable de daños indirectos, incidentales o consecuentes, incluyendo pérdida de ganancias o datos.",
        },
        governingLaw: {
          title: "12. Ley Aplicable",
          argentinaLaw: "Estos Términos se regirán por las leyes de Argentina, sin tener en cuenta los principios de conflicto de leyes.",
        },
        changes: {
          title: "13. Cambios a los Términos",
          mayUpdate: "Podemos actualizar estos Términos de vez en cuando. El uso continuo de la Plataforma constituye la aceptación de los Términos actualizados.",
        },
        contact: {
          title: "14. Contacto",
          questions: "Para preguntas o inquietudes, contactanos en:",
          email: "info@creeadores.com",
        },
      },
    },
    pt: {
      title: "Termos e Condições",
      lastUpdated: "Última atualização: 16 de janeiro de 2026",
      sections: {
        introduction: {
          title: "1. Introdução",
          welcome: 'Bem-vindo ao CREEADORES ("Empresa", "nós", "nos" ou "nosso").',
          description: 'CREEADORES é um marketplace que conecta marcas ("Marcas") com criadores de conteúdo gerado por usuários ("Criadores") para colaborar em campanhas de marketing, incluindo a criação e entrega de UGC. Os pagamentos são facilitados através da Plataforma.',
          agreement: "Ao acessar ou usar a Plataforma, você concorda em estar sujeito a estes Termos. Se você não concordar, não use a Plataforma.",
        },
        eligibility: {
          title: "2. Elegibilidade",
          ageRequirement: "Você deve ter pelo menos 18 anos para usar a Plataforma.",
          legalCapacity: "Ao usar a Plataforma, você declara e garante que tem a capacidade legal para celebrar estes Termos.",
        },
        accounts: {
          title: "3. Contas",
          accountCreation: "Para usar certos recursos, você deve criar uma conta.",
          youAgree: "Você concorda em:",
          provideAccurate: "Fornecer informações precisas e completas",
          maintainSecurity: "Manter a segurança das credenciais da sua conta",
          acceptResponsibility: "Aceitar a responsabilidade por toda a atividade sob sua conta",
          rightToSuspend: "Reservamo-nos o direito de suspender ou encerrar contas que violem estes Termos.",
        },
        marketplace: {
          title: "4. Visão Geral do Marketplace",
          brands: {
            title: "4.1 Marcas",
            may: "As Marcas podem:",
            createCampaigns: "Criar campanhas",
            defineDeliverables: "Definir entregas, prazos e compensação",
            reviewAndHire: "Revisar e contratar Criadores",
            payCreators: "Pagar aos Criadores através da Plataforma",
          },
          creators: {
            title: "4.2 Criadores",
            may: "Os Criadores podem:",
            applyToCampaigns: "Aplicar a campanhas",
            submitContent: "Enviar conteúdo de acordo com os requisitos da campanha",
            receivePayment: "Receber pagamento através da Plataforma após conclusão e aprovação",
          },
        },
        payments: {
          title: "5. Pagamentos e Taxas",
          allPayments: "Todos os pagamentos devem ser feitos através da Plataforma.",
          serviceFees: "Podemos cobrar taxas de serviço ou transação, que serão divulgadas antes do pagamento.",
          paymentRelease: "Os pagamentos aos Criadores são liberados uma vez que as entregas são enviadas e aprovadas, sujeito aos termos da campanha.",
          notABank: "Não somos um banco ou serviço de depósito em garantia, mas facilitamos pagamentos através de provedores de pagamento terceirizados.",
        },
        content: {
          title: "6. Conteúdo e Propriedade Intelectual",
          userContent: {
            title: "6.1 Conteúdo do Usuário",
            creatorsRetain: "Os Criadores mantêm a propriedade do conteúdo que criam, a menos que acordado de outra forma nos termos da campanha.",
            licenseGrant: "Ao enviar conteúdo através da Plataforma, os Criadores concedem às Marcas uma licença conforme definido na campanha (por exemplo, direitos de uso, duração, plataformas).",
          },
          platformContent: {
            title: "6.2 Conteúdo da Plataforma",
            ownership: "Todo o software, marca e design da Plataforma são de propriedade do CREEADORES e não podem ser copiados ou usados sem permissão.",
          },
        },
        prohibited: {
          title: "7. Conduta Proibida",
          youAgreeNotTo: "Você concorda em não:",
          violateLaws: "Violar quaisquer leis ou regulamentos aplicáveis",
          postMisleading: "Publicar conteúdo enganoso, fraudulento ou ilegal",
          circumventPayment: "Contornar o sistema de pagamento da Plataforma",
          harassAbuse: "Assediar, abusar ou explorar outros usuários",
          scrapeReverse: "Tentar extrair ou fazer engenharia reversa da Plataforma",
        },
        disputes: {
          title: "8. Disputas Entre Usuários",
          resolution: "As disputas entre Marcas e Criadores devem ser resolvidas diretamente. Podemos, a nosso critério, ajudar com a mediação, mas não somos responsáveis pelos resultados.",
        },
        termination: {
          title: "9. Rescisão",
          rightToTerminate: "Podemos suspender ou encerrar seu acesso a qualquer momento se você violar estes Termos ou fizer uso indevido da Plataforma.",
          uponTermination: "Ao encerrar:",
          outstandingObligations: "Obrigações pendentes permanecem exigíveis",
          accessRevoked: "O acesso à sua conta e conteúdo pode ser revogado",
        },
        disclaimer: {
          title: "10. Isenção de Garantias",
          asIs: 'A Plataforma é fornecida "como está" e "conforme disponível".',
          noWarranties: "Não oferecemos garantias quanto ao sucesso da campanha, desempenho do criador ou ganhos.",
        },
        limitation: {
          title: "11. Limitação de Responsabilidade",
          maximumExtent: "Na máxima extensão permitida por lei, o CREEADORES não será responsável por danos indiretos, incidentais ou consequenciais, incluindo perda de lucros ou dados.",
        },
        governingLaw: {
          title: "12. Lei Aplicável",
          argentinaLaw: "Estes Termos serão regidos pelas leis da Argentina, sem levar em conta os princípios de conflito de leis.",
        },
        changes: {
          title: "13. Alterações nos Termos",
          mayUpdate: "Podemos atualizar estes Termos de tempos em tempos. O uso continuado da Plataforma constitui aceitação dos Termos atualizados.",
        },
        contact: {
          title: "14. Contato",
          questions: "Para perguntas ou preocupações, entre em contato conosco em:",
          email: "info@creeadores.com",
        },
      },
    },
  };

  return content[lang]!;
}

function TermsSection({ children }: { children: React.ReactNode }) {
  return <div className="mb-8">{children}</div>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold text-gray-900 mb-3">{children}</h2>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600 text-sm leading-relaxed mb-2">{children}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1">
      {items.map((item, i) => (
        <li key={i} className="text-gray-600 text-sm leading-relaxed">{item}</li>
      ))}
    </ul>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-800 mb-2">{title}</h3>
      {children}
    </div>
  );
}

export default function TermsOfServicePage() {
  const { locale } = useLanguage();
  const content = getTermsContent(locale);
  const s = content.sections;

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

          {/* 1. Introduction */}
          <TermsSection>
            <SectionTitle>{s.introduction.title}</SectionTitle>
            <Paragraph>{s.introduction.welcome}</Paragraph>
            <Paragraph>{s.introduction.description}</Paragraph>
            <Paragraph>{s.introduction.agreement}</Paragraph>
          </TermsSection>

          {/* 2. Eligibility */}
          <TermsSection>
            <SectionTitle>{s.eligibility.title}</SectionTitle>
            <BulletList items={[s.eligibility.ageRequirement, s.eligibility.legalCapacity]} />
          </TermsSection>

          {/* 3. Accounts */}
          <TermsSection>
            <SectionTitle>{s.accounts.title}</SectionTitle>
            <Paragraph>{s.accounts.accountCreation}</Paragraph>
            <Paragraph>{s.accounts.youAgree}</Paragraph>
            <BulletList items={[s.accounts.provideAccurate, s.accounts.maintainSecurity, s.accounts.acceptResponsibility]} />
            <p className="text-gray-600 text-sm leading-relaxed mt-3">{s.accounts.rightToSuspend}</p>
          </TermsSection>

          {/* 4. Marketplace */}
          <TermsSection>
            <SectionTitle>{s.marketplace.title}</SectionTitle>
            <SubSection title={s.marketplace.brands.title}>
              <Paragraph>{s.marketplace.brands.may}</Paragraph>
              <BulletList items={[s.marketplace.brands.createCampaigns, s.marketplace.brands.defineDeliverables, s.marketplace.brands.reviewAndHire, s.marketplace.brands.payCreators]} />
            </SubSection>
            <SubSection title={s.marketplace.creators.title}>
              <Paragraph>{s.marketplace.creators.may}</Paragraph>
              <BulletList items={[s.marketplace.creators.applyToCampaigns, s.marketplace.creators.submitContent, s.marketplace.creators.receivePayment]} />
            </SubSection>
          </TermsSection>

          {/* 5. Payments */}
          <TermsSection>
            <SectionTitle>{s.payments.title}</SectionTitle>
            <BulletList items={[s.payments.allPayments, s.payments.serviceFees, s.payments.paymentRelease, s.payments.notABank]} />
          </TermsSection>

          {/* 6. Content */}
          <TermsSection>
            <SectionTitle>{s.content.title}</SectionTitle>
            <SubSection title={s.content.userContent.title}>
              <Paragraph>{s.content.userContent.creatorsRetain}</Paragraph>
              <Paragraph>{s.content.userContent.licenseGrant}</Paragraph>
            </SubSection>
            <SubSection title={s.content.platformContent.title}>
              <Paragraph>{s.content.platformContent.ownership}</Paragraph>
            </SubSection>
          </TermsSection>

          {/* 7. Prohibited Conduct */}
          <TermsSection>
            <SectionTitle>{s.prohibited.title}</SectionTitle>
            <Paragraph>{s.prohibited.youAgreeNotTo}</Paragraph>
            <BulletList items={[s.prohibited.violateLaws, s.prohibited.postMisleading, s.prohibited.circumventPayment, s.prohibited.harassAbuse, s.prohibited.scrapeReverse]} />
          </TermsSection>

          {/* 8. Disputes */}
          <TermsSection>
            <SectionTitle>{s.disputes.title}</SectionTitle>
            <Paragraph>{s.disputes.resolution}</Paragraph>
          </TermsSection>

          {/* 9. Termination */}
          <TermsSection>
            <SectionTitle>{s.termination.title}</SectionTitle>
            <Paragraph>{s.termination.rightToTerminate}</Paragraph>
            <Paragraph>{s.termination.uponTermination}</Paragraph>
            <BulletList items={[s.termination.outstandingObligations, s.termination.accessRevoked]} />
          </TermsSection>

          {/* 10. Disclaimer */}
          <TermsSection>
            <SectionTitle>{s.disclaimer.title}</SectionTitle>
            <Paragraph>{s.disclaimer.asIs}</Paragraph>
            <Paragraph>{s.disclaimer.noWarranties}</Paragraph>
          </TermsSection>

          {/* 11. Limitation */}
          <TermsSection>
            <SectionTitle>{s.limitation.title}</SectionTitle>
            <Paragraph>{s.limitation.maximumExtent}</Paragraph>
          </TermsSection>

          {/* 12. Governing Law */}
          <TermsSection>
            <SectionTitle>{s.governingLaw.title}</SectionTitle>
            <Paragraph>{s.governingLaw.argentinaLaw}</Paragraph>
          </TermsSection>

          {/* 13. Changes */}
          <TermsSection>
            <SectionTitle>{s.changes.title}</SectionTitle>
            <Paragraph>{s.changes.mayUpdate}</Paragraph>
          </TermsSection>

          {/* 14. Contact */}
          <TermsSection>
            <SectionTitle>{s.contact.title}</SectionTitle>
            <Paragraph>{s.contact.questions}</Paragraph>
            <a href={`mailto:${s.contact.email}`} className="text-[#0019DA] hover:underline text-sm font-medium">
              {s.contact.email}
            </a>
          </TermsSection>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}
