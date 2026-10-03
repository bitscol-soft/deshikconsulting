import React, { useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { draftT, translateDeep, useLanguage } from './i18n.jsx';
import './editorial-library.css';

// Editorial explainers, not claims of completed projects or legal/engineering advice.
export const newArticles = {
  '/insights/dpp-data-architecture/': {
    category: 'DPP', tag: 'PRODUCT INTELLIGENCE / EXPLAINER', title: 'A product record is more than a QR code', intro: 'A practical architecture for getting product information into shape before choosing a passport interface.', read: '6 MIN READ',
    sections: [
      ['01 / Begin with the question, not the identifier', 'A visible code may help a reader find information, but it cannot make an incomplete record trustworthy. First establish which products and destination markets are in scope, which information may be needed, and what evidence already exists. Check the applicable product-specific rules with a qualified specialist rather than treating a generic checklist as a legal specification.'],
      ['02 / Draw the source-to-record map', 'A product attribute can originate in a design file, supplier declaration, bill of materials, quality test or production system. Record the system of record, the person accountable for updates, the product identifier used, and whether an attribute is measured, declared or calculated. A map reveals contradictory values before they are packaged for publication.'],
      ['03 / Separate public views from controlled evidence', 'Not every supporting document belongs in a consumer-facing record. Design access levels around the eventual applicable requirements and commercial sensitivity. Keep a traceable link between a displayed statement and the underlying evidence, with timestamps, versioning and a review owner. Avoid uploading confidential supplier information into an unapproved tool.'],
      ['04 / Test one change through the whole chain', 'Choose a limited product family. Change one material or supplier attribute and trace how the record is updated, reviewed and made available. Test the exceptions: missing evidence, an outdated declaration and a product version that has already shipped. A pilot succeeds when the operating process remains workable after the demonstration ends.'],
      ['05 / Decide what to build or buy', 'Only after identifying fields, owners, permissions and integration needs should a team compare platforms. Ask whether existing ERP or PLM systems already cover part of the need, how data will be exported, and who will maintain the record. A passport interface is the last mile of a governed information process—not a substitute for that process.']
    ], note: 'The EU ESPR is a framework. Specific DPP information requirements and application dates depend on product-specific measures. This article is planning guidance, not a compliance determination.', source: 'https://eur-lex.europa.eu/eli/reg/2024/1781/oj', related: '/services/digital-product-passport/', cta: 'Explore DPP consulting'
  },
  '/insights/garment-data-handoffs/': {
    category: 'Garments', tag: 'GARMENTS / PRODUCT DATA', title: 'The garment data handoffs worth mapping first', intro: 'For an export garment team, the hardest information gap may be between two familiar workflows.', read: '7 MIN READ',
    sections: [
      ['01 / Start with one style and one buyer request', 'Choose a representative style rather than cataloguing the entire business. Write down the buyer question, the product version, and the evidence required to answer it. If the question concerns materials, ask whether the information applies to an entire style, a specific order or a production lot. These distinctions change how records need to be linked.'],
      ['02 / Follow information across teams', 'Merchandising may hold a specification, sourcing a supplier declaration, production a lot record, and quality a test result. Interview the owners and sketch the handoffs. Note where people copy values into spreadsheets, rename files or interpret a field differently. This is a process-design exercise as much as a data exercise.'],
      ['03 / Make supplier requests achievable', 'Request a small set of clearly defined fields for a pilot: what is requested, which unit and version applies, when it must be refreshed, and what evidence is acceptable. Consider supplier capacity and confidentiality. Asking for everything at once can produce a large but unreliable folder rather than a usable product record.'],
      ['04 / Reconcile a claim before it travels outward', 'Check that a material or process claim matches the right product, period and evidence. Flag missing or conflicting values for review; do not silently replace them with a plausible default. Maintain an owner for sign-off and a way to correct a record later. A useful system exposes uncertainty instead of hiding it.'],
      ['05 / Turn a handoff map into a pilot', 'Measure how long it takes to answer one recurring product-information request today. Then test a shared source-and-owner map, a small evidence register and an agreed escalation path. Review whether the process saved work, improved confidence or revealed gaps that need deeper discovery.']
    ], note: 'Illustrative planning guidance for garment exporters. It does not imply that every garment currently requires an EU Digital Product Passport or that Deshik has delivered a specific client result.', related: '/services/digital-product-passport/rmg-bangladesh/', cta: 'Explore RMG & DPP'
  },
  '/insights/industrial-data-to-decision/': {
    category: 'Operations', tag: 'INDUSTRIAL AUTOMATION / FIELD GUIDE', title: 'From factory signal to operator decision', intro: 'A useful industrial data pilot begins with a decision on the shop floor, not a dashboard specification.', read: '6 MIN READ',
    sections: [
      ['01 / Name the decision', 'Ask a supervisor or operator what they need to decide during a shift. Is it whether to investigate a recurring stop, adjust a maintenance plan, or confirm a quality trend? Write the decision and its owner down. A stream of sensor readings is not yet an operational improvement.'],
      ['02 / Establish the current baseline', 'Observe how the team currently notices and records the issue. Capture the frequency, duration and variability of the event using a measure the team trusts. If the baseline cannot be reproduced, a polished live screen will not prove that the process has improved.'],
      ['03 / Check the boundary before connecting', 'Map machine interfaces, network zones, permissions and existing safety controls with qualified OT and safety personnel. Do not assume that a machine is safe to connect or that a pilot can write commands back to a controller. Read-only observation may be the right starting boundary.'],
      ['04 / Design for the person responding', 'Agree which signal deserves attention, what context accompanies it, and who can act. Test false positives and shift handovers. An alert that is accurate but unactionable can add workload; an insight should fit the actual operating rhythm.'],
      ['05 / Keep the scale decision explicit', 'After a limited pilot, compare results against the baseline and document maintenance, training, ownership and security implications. Agree whether to scale, revise or stop. This prevents a successful demonstration from becoming an unsupported production dependency.']
    ], note: 'This is a planning guide, not machine-safety or OT engineering advice. Site integration requires approved scope and suitably qualified specialists.', related: '/services/industrial-automation/', cta: 'Explore industrial automation'
  },
  '/insights/drone-use-case-checklist/': {
    category: 'Emerging tech', tag: 'DRONE / USE-CASE GUIDE', title: 'Before a drone pilot, define the ground problem', intro: 'A decision-first checklist for organizations exploring aerial data without assuming a flight is the answer.', read: '5 MIN READ',
    sections: [
      ['01 / Identify the job to be done', 'Is the question about inspecting a difficult location, monitoring a site or collecting a repeatable visual record? Describe the output a decision-maker needs, its required accuracy and how quickly it must arrive. Compare the aerial option with ground-based approaches before commissioning equipment.'],
      ['02 / Set the operating boundary', 'List the location, people affected, weather constraints, airspace, privacy requirements and the organization that would operate the aircraft. Aviation and data rules vary by jurisdiction and operation. Seek authorization and qualified advice before planning any flight.'],
      ['03 / Plan the data lifecycle', 'Decide what will be captured, how it will be checked, who can see it, and when it should be deleted. Raw footage often requires interpretation before it supports a business decision. Sensitive imagery needs appropriate permissions and controls.'],
      ['04 / Choose a measurable pilot', 'A pilot could compare a limited inspection task against the existing method: turnaround time, repeatability, safety exposure, quality of evidence and total operating effort. Include cancellation criteria for unsuitable conditions.'],
      ['05 / Ask what scales', 'Consider operator capability, maintenance, training, insurance, data processing and governance. If the organizational process cannot use the information, more flights will not solve the original problem.']
    ], note: 'Exploratory consulting perspective only. No claim of aviation authorization or completed drone deployments is made.', related: '/services/drone-robotics/', cta: 'Explore drone & robotics'
  },
  '/insights/robotics-workflow-first/': {
    category: 'Emerging tech', tag: 'ROBOTICS / OPERATIONS GUIDE', title: 'Design the workflow before choosing a robot', intro: 'Robotics feasibility starts with variation, safety and the people who own the process.', read: '5 MIN READ',
    sections: [
      ['01 / Observe the real task', 'Record cycle time, part variation, presentation, rework and unexpected interruptions. A task described as repetitive may still require frequent human judgment. Capture the range of normal conditions, not only a best-case demonstration.'],
      ['02 / Define the workcell boundary', 'Map adjacent equipment, access routes, material movement and human interaction. Safety requirements must be assessed by qualified personnel under applicable standards; a website checklist cannot certify a workcell.'],
      ['03 / Compare automation options', 'A better fixture, simpler layout or improved information flow may solve the problem without a robot. If a robotic approach remains promising, identify gripping, sensing, integration and maintenance requirements before selecting a device.'],
      ['04 / Pilot the hard exceptions', 'Test the items that vary most, a missed pick, a blocked path and a shift change. Define what the operator sees and how the system recovers. Throughput matters, but safe and understandable recovery matters too.'],
      ['05 / Plan the ownership model', 'Ask who maintains the process, trains operators, approves changes and tracks performance. The business case should include integration and ongoing support as well as equipment cost.']
    ], note: 'Exploratory perspective only; not a claim of a certified robotics practice or completed installation.', related: '/services/drone-robotics/', cta: 'Explore robotics opportunities'
  },
  '/insights/ai-ready-data/': {
    category: 'Emerging tech', tag: 'DATA & AI / DECISION GUIDE', title: 'Is your data ready for an AI use case?', intro: 'A useful AI conversation begins with a decision, a baseline and a dependable source of information.', read: '6 MIN READ',
    sections: [
      ['01 / Write down the decision', 'Identify the person making a decision and what they do today. Distinguish a forecasting task from document search or workflow automation. If a simple rule or better report already solves the problem, an AI model may add complexity without value.'],
      ['02 / Inventory the evidence', 'Where does the information originate, who can access it, and how often does it change? Sample the data for missing values, duplicate identifiers and inconsistent labels. Do not move confidential records into a public model or unapproved service.'],
      ['03 / Establish a meaningful benchmark', 'Record the current accuracy, time and error cost of the human or conventional process. Agree what a useful result would look like, including acceptable failure modes. A demo that sounds fluent does not demonstrate reliability in the real workflow.'],
      ['04 / Test with human oversight', 'Run a limited trial using authorized data, review outputs with domain specialists and record where the system fails. Keep a clear handoff when the model is uncertain or the outcome is consequential. Include privacy, security and governance review.'],
      ['05 / Decide if it belongs in production', 'Assess monitoring, drift, operational support, training and exit options. Document who remains accountable for decisions. A small pilot can produce value even if it concludes that a different technology is more appropriate.']
    ], note: 'General exploration, not a claim of certified AI systems, guaranteed model performance or legal compliance.', related: '/services/data-artificial-intelligence/', cta: 'Explore Data & AI'
  },
  '/insights/semiconductor-value-chain/': {
    category: 'Emerging tech', tag: 'SEMICONDUCTORS / STRATEGY GUIDE', title: 'Where can a semiconductor opportunity start?', intro: 'A value-chain lens for teams considering partnerships, skills and capability building.', read: '6 MIN READ',
    sections: [
      ['01 / Avoid the factory-or-nothing question', 'Semiconductors involve many distinct activities, from design support and testing to packaging, software, equipment services and supply-chain coordination. A strategic conversation should identify the specific layer under consideration, not assume a complete fabrication facility is the entry point.'],
      ['02 / Inventory relevant strengths', 'Map available engineering skills, research relationships, supplier connections, quality practices and market access. Separate verified capability from ambition. Ask what partners would contribute and what would need to be built locally.'],
      ['03 / Test demand before investment', 'Identify a clear customer problem, required qualifications and credible commercial route. Interview potential partners and buyers before committing to facilities or specialized equipment. Understand lead times and dependencies as part of the business case.'],
      ['04 / Define a learning milestone', 'A practical first phase may be a skills program, design collaboration, test-service assessment or partnership feasibility study. Specify what evidence would justify the next investment decision and what result would lead to stopping.'],
      ['05 / Keep claims proportionate', 'Distinguish exploration from operating capability. Describe the role, partners, limitations and verification needed before presenting a new initiative as a market offering.']
    ], note: 'Strategic exploration only. This article does not imply that Deshik operates a semiconductor facility or has completed a semiconductor client engagement.', related: '/services/semiconductor-microelectronics/', cta: 'Explore microelectronics'
  },
};

export const featuredGuides = [
  { title: 'Five questions to ask before starting a DPP project', path: '/insights/dpp-readiness-questions/', category: 'DPP', read: 'INTERACTIVE GUIDE' },
  ...Object.entries(newArticles).map(([path, article]) => ({ title: article.title, path, category: article.category, read: article.read })),
  { title: 'How to choose an industrial automation pilot', path: '/insights/automation-pilot/', category: 'Operations', read: 'PRACTICAL GUIDE' },
];
const filters = ['All', 'DPP', 'Garments', 'Operations', 'Emerging tech'];
export default function EditorialLibrary() {
  const lang = useLanguage();
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const items = featuredGuides.filter(item => (filter === 'All' || item.category === filter) && (!query || (item.title + ' ' + item.category + ' ' + draftT(item.title, lang) + ' ' + draftT(item.category, lang)).toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())));
  return <section className="editorial-library" id="field-guides" aria-labelledby="library-heading"><div className="editorial-library-head"><div><span className="eyebrow dark">{draftT('FIELD GUIDES / PRACTICAL PERSPECTIVES')}</span><h2 id="library-heading">{draftT('Ideas you can put to work.')}</h2><p>{draftT('Explore product data, garments, industrial operations and emerging technologies. These are editorial starting points, not client results or legal advice.')}</p></div><span>{String(featuredGuides.length).padStart(2, '0')} {draftT('GUIDES')}</span></div><div className="editorial-tools"><div className="editorial-filters" role="group" aria-label={draftT('Filter field guides')}>{filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{draftT(item)}</button>)}</div><label className="editorial-search"><Search size={18} /><span className="sr-only">{draftT('Search guides')}</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={draftT('Search guides')} /></label></div><div className="editorial-results" aria-live="polite">{items.length ? items.map((item, index) => <a key={item.path} href={item.path} className="editorial-card"><span className="editorial-card-no">{String(index + 1).padStart(2, '0')}</span><span className="editorial-card-tag">{draftT(item.category)} / {draftT(item.read)}</span><h3>{draftT(item.title, lang)}</h3><span className="editorial-card-arrow"><ArrowUpRight size={22} /></span></a>) : <p className="editorial-empty">{draftT('No guides match this search. Try another topic or clear the filter.')}</p>}</div></section>;
}
