import { useEffect } from 'react';
import { useLanguage } from './i18n.jsx';
import { getRoutePathname } from './paths.js';

const specialTitles = {
  '/about/consultants/': 'Our Consultants | Deshik Consulting',
  '/about/work-as-consultant/': 'Work as a Consultant | Deshik Consulting',
  '/about/who-we-are/': 'Who We Are | Deshik Consulting',
  '/about/leadership/': 'Our Leadership | Deshik Consulting',
  '/about/leadership/belal-ahmed/': 'Belal Ahmed | Deshik Consulting',
  '/about/leadership/nizam-farid-ahmed/': 'Nizam Farid Ahmed | Deshik Consulting',
  '/about/leadership/nahid-mustafa/': 'Nahid Mustafa | Deshik Consulting',
  '/about/leadership/alamgir-kabir-roni/': 'Alamgir Kabir Roni | Deshik Consulting',
  '/about/mission/': 'Our Mission | Deshik Consulting',
  '/about/vision/': 'Our Vision & Goals | Deshik Consulting',
  '/about/partners-affiliations/': 'Partners & Affiliations | Deshik Consulting',
  '/about/careers-culture/': 'Careers & Culture | Deshik Consulting',

  '/experience/factory-operations-studio/': 'Fictional Factory Operations Studio | Deshik Consulting',
  '/experience/dpp-product-journey/': 'Fictional DPP Product Journey | Deshik Consulting',
  '/resources/': 'Resource Center | Deshik Consulting',
  '/resources/dpp-data-map/': 'Product-data Source Map | Deshik Consulting',
  '/resources/automation-pilot-canvas/': 'Automation Pilot Canvas | Deshik Consulting',
  '/services/data-artificial-intelligence/': 'Data & Artificial Intelligence | Deshik Consulting',
  '/services/renewable-energy-ev/': 'Renewable Energy & EV | Deshik Consulting',
  '/services/semiconductor-microelectronics/': 'Semiconductor & Microelectronics | Deshik Consulting',
  '/services/drone-robotics/': 'Drone & Robotics | Deshik Consulting',
  '/approach/consulting-process/': 'Our Consulting Process | Deshik Consulting',
  '/approach/service-delivery/': 'Our Service Delivery Process | Deshik Consulting',
  '/services/digital-product-passport/rmg-bangladesh/': 'Bangladesh RMG & Digital Product Passport | Deshik Consulting',
  '/industries/energy-ev/': 'Energy & EV | Deshik Consulting',
  '/industries/electronics-semiconductors/': 'Electronics & Semiconductors | Deshik Consulting',
  '/industries/transport-logistics/': 'Transport & Logistics | Deshik Consulting',
  '/industries/agriculture-food/': 'Agriculture & Food Systems | Deshik Consulting',
  '/insights/rmg-product-story/': 'The Missing Thread — Fictional Story | Deshik Consulting',
  '/insights/factory-signal-story/': 'A Factory Signal — Fictional Story | Deshik Consulting',
};
const descriptions = {
  '/about/consultants/': 'Explore the developing Deshik consultant directory; individual listings await approval.',
  '/about/work-as-consultant/': 'Express interest in collaborating as a consultant using an email-draft form.',
  '/about/who-we-are/': 'Learn about the proposed Deshik Consulting approach: grounded in context, collaborative scope and practical next steps.',
  '/about/leadership/': 'Explore four draft leadership profiles for Deshik Consulting. Names and roles require confirmation before publication.',
  '/about/leadership/belal-ahmed/': 'Draft leadership profile for Belal Ahmed, listed as CEO. Personal biography and details require approval.',
  '/about/leadership/nizam-farid-ahmed/': 'Draft leadership profile for Nizam Farid Ahmed, listed as Principal Consultant. Details require approval.',
  '/about/leadership/nahid-mustafa/': 'Draft leadership profile for Nahid Mustafa, listed as COO in the latest website request. Title requires confirmation.',
  '/about/leadership/alamgir-kabir-roni/': 'Draft leadership profile for Alamgir Kabir Roni, listed as CTO. Details require approval.',
  '/about/mission/': 'Read the proposed Deshik Consulting mission statement and how it connects clarity, collaboration and practical learning.',
  '/about/vision/': 'Explore the proposed Deshik Consulting vision and goals around trust, responsible innovation and useful partnerships.',
  '/about/partners-affiliations/': 'How Deshik Consulting could work with complementary partners, with named affiliations reserved for verified permission.',
  '/about/careers-culture/': 'Learn about the proposed Deshik working culture. No current vacancies or hiring commitments are advertised.',

  '/experience/factory-operations-studio/': 'Explore fictional factory-signal scenarios, operator context, pilot boundaries and a downloadable conceptual brief. No live plant data or safety approval.',
  '/experience/dpp-product-journey/': 'Explore a fictional garment product-data journey, audience views, evidence handoffs and version changes. Not a valid DPP or compliance result.',
  '/resources/': 'Use browser-only planning worksheets and a glossary for product-data and industrial automation conversations.',
  '/resources/dpp-data-map/': 'Map product-information fields, current sources, owners and gaps in a private browser worksheet. Download your own CSV.',
  '/resources/automation-pilot-canvas/': 'Frame an automation pilot with an operating question, baseline, owner, safety boundary and success criteria.',
  '/': 'Tomorrow, made practical. Deshik Consulting connects product intelligence, industrial innovation and strategy to useful next steps.',
  '/services/': 'Explore Deshik Consulting services and use a short guide to find a useful starting point for your organization.',
  '/services/digital-product-passport/': 'Explore Digital Product Passport consulting: product information, supplier data, traceability and readiness questions.',
  '/services/digital-product-passport/rmg-bangladesh/': 'An exporter-focused approach to product-data readiness for Bangladesh garments and textiles. Explore the questions, information owners and possible pilot path.',
  '/services/industrial-automation/': 'Explore industrial automation consulting, from factory visibility and operating questions to a measurable pilot.',
  '/services/data-artificial-intelligence/': 'Explore the decisions, data foundations and governance questions behind practical AI opportunities.',
  '/services/renewable-energy-ev/': 'Explore renewable energy and electric mobility opportunities through a practical consulting lens.',
  '/services/semiconductor-microelectronics/': 'Explore semiconductor and microelectronics opportunities, partnerships and capability questions.',
  '/services/drone-robotics/': 'Explore drone and robotics opportunities with attention to the operating problem, safety and practical adoption.',
  '/work/': 'See how Deshik Consulting approaches collaborative work, delivery processes and illustrative proof concepts.',
  '/approach/consulting-process/': 'Follow the Deshik consulting process from framing the question through evidence, options and a practical roadmap.',
  '/approach/service-delivery/': 'Explore Deshik’s service delivery process, collaborative checkpoints and tangible outputs.',
  '/industries/': 'Explore how product information, industrial systems and strategy meet different industry contexts.',
  '/industries/energy-ev/': 'Explore decision-first questions for renewable energy and electric mobility opportunities, infrastructure and pilot planning.',
  '/industries/electronics-semiconductors/': 'Explore electronics and semiconductor value-chain opportunities, capability assessment and partnership milestones.',
  '/industries/transport-logistics/': 'Explore how shipment handoffs, exceptions and operational data can lead to better transport and logistics decisions.',
  '/industries/agriculture-food/': 'Explore practical questions around product identity, quality information and adoption in agriculture and food systems.',
  '/insights/': 'Read Deshik Consulting perspectives on product data, industrial improvement and decisions about what comes next.',
  '/about/': 'Learn about Deshik Consulting and its practical, collaborative approach to business transformation.',
  '/insights/dpp-readiness-questions/': 'A practical DPP readiness guide with an interactive product-data infographic, a four-step planning wizard and common questions.',
  '/insights/automation-pilot/': 'Five questions for choosing a measured industrial automation pilot, from baseline and safety boundaries to ownership.',
  '/insights/dpp-data-architecture/': 'Why a product record needs source data, owners, evidence and version control before a QR code or passport interface.',
  '/insights/garment-data-handoffs/': 'A practical guide to tracing garment product information across merchandising, suppliers, production and quality teams.',
  '/insights/industrial-data-to-decision/': 'How to turn a factory signal into an actionable operator decision with a baseline, boundaries and a measurable pilot.',
  '/insights/drone-use-case-checklist/': 'A decision-first checklist for exploring drone use cases, operating boundaries, data handling and pilot measures.',
  '/insights/robotics-workflow-first/': 'Explore robotics feasibility by mapping workflow variation, safety, operator recovery and ongoing ownership.',
  '/insights/ai-ready-data/': 'A practical guide to evaluating data readiness, benchmarks and governance before starting an AI use case.',
  '/insights/semiconductor-value-chain/': 'A value-chain lens for exploring semiconductor opportunities, skills, partnerships and a first learning milestone.',
  '/insights/rmg-product-story/': 'A fictional composite story illustrating product-data handoffs in an export garment supply chain. Not a client case study.',
  '/insights/factory-signal-story/': 'A fictional composite story illustrating how factory signals can become more useful operating decisions. Not a client case study.',
  '/contact/': 'Start a conversation with Deshik Consulting about product data, operations, technology or strategy.',
};
const blockedPaths = new Set(['/about/consultants/','/about/work-as-consultant/','/about/who-we-are/','/about/leadership/','/about/leadership/belal-ahmed/','/about/leadership/nizam-farid-ahmed/','/about/leadership/nahid-mustafa/','/about/leadership/alamgir-kabir-roni/','/about/mission/','/about/vision/','/about/partners-affiliations/','/about/careers-culture/','/experience/factory-operations-studio/','/experience/dpp-product-journey/','/insights/rmg-product-story/', '/insights/factory-signal-story/', '/work/demo-product-data-pilot/', '/work/demo-factory-visibility/']);
const fallback = 'Explore practical consulting perspectives on product data, industrial systems and business transformation from Deshik Consulting.';
function updateMeta(selector, attribute, value) {
  let tag = document.head.querySelector(selector);
  if (!tag) { tag = document.createElement('meta'); const match = selector.match(/meta\[(name|property)=\"([^\"]+)\"\]/); if (match) tag.setAttribute(match[1], match[2]); document.head.appendChild(tag); }
  tag.setAttribute(attribute, value);
}
export function useSiteMeta() {
  const language = useLanguage();
  useEffect(() => {
    const route = getRoutePathname();
    const path = route.endsWith('/') ? route : route + '/';
    const description = descriptions[path] || fallback;
    if (specialTitles[path]) document.title = specialTitles[path];
    const production = ['deshikconsulting.com', 'www.deshikconsulting.com'].includes(location.hostname);
    // Editorial demos and unreviewed translation drafts must not appear as approved public proof/copy.
    const indexable = production && language === 'en' && !blockedPaths.has(path);
    updateMeta('meta[name="description"]', 'content', description);
    updateMeta('meta[name="robots"]', 'content', indexable ? 'index, follow' : 'noindex, follow');
    updateMeta('meta[property="og:title"]', 'content', document.title);
    updateMeta('meta[property="og:description"]', 'content', description);
    updateMeta('meta[property="og:type"]', 'content', 'website');
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (indexable) {
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
      canonical.href = 'https://deshikconsulting.com' + path;
    } else canonical?.remove();
  }, [language]);
}
