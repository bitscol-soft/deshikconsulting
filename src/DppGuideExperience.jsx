import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, Download, RotateCcw, ScanLine } from 'lucide-react';
import { draftT, translateDeep, useLanguage } from './i18n.jsx';
import './dpp-guide-experience.css';

const flow = [
  { title: 'Product scope', short: 'Define the product and destination market', detail: 'Choose the product family and market before assuming that a particular passport rule applies. Record the product identifier and version that teams actually use.' },
  { title: 'Source data', short: 'Find the record, owner and version', detail: 'Locate attributes in ERP, PLM, supplier files and quality records. Note who maintains them and which value is authoritative when systems disagree.' },
  { title: 'Supplier evidence', short: 'Link declarations to the right product', detail: 'Agree what evidence is requested, its date and which material, order or lot it supports. Missing or conflicting information should remain visible for review.' },
  { title: 'Governance', short: 'Review access, change and accountability', detail: 'Define review roles, update triggers, version history and appropriate access levels. A visible code must not become a shortcut around evidence control.' },
  { title: 'Pilot record', short: 'Test one product-data journey', detail: 'Try one limited product group, then change an attribute and follow it to the published view. Document what broke, who fixed it and what must happen before scaling.' },
];
const questions = [
  { title: 'Have you defined the product family and destination market?', detail: 'Start with a limited scope; applicability depends on product-specific requirements.', action: 'List one product family, its destination markets and the applicable-rule questions for specialist review.' },
  { title: 'Can your team identify data sources and owners?', detail: 'Think of product attributes across ERP, PLM, spreadsheets and quality files.', action: 'Create a source-and-owner map for a single representative product.' },
  { title: 'Can suppliers provide evidence tied to the right product?', detail: 'Check identifiers, versions, dates and a way to resolve gaps.', action: 'Ask a small supplier group for a defined evidence set and log exceptions.' },
  { title: 'Do you have a limited pilot and review owner?', detail: 'A pilot should test data quality, updates and decisions, not just a screen.', action: 'Name a pilot owner, review checkpoint and criteria for a scale-or-stop decision.' },
];
const options = [
  { id: 'yes', title: 'Yes, with an owner' },
  { id: 'some', title: 'Partly / in progress' },
  { id: 'unknown', title: 'Not sure yet' },
];
const faqs = [
  ['Does every garment need a Digital Product Passport now?', 'No universal garment DPP requirement or single 2027 deadline should be inferred from the EU framework. Textiles are prioritized in EU policy work, but specific applicability, information fields and timing depend on adopted product-specific measures. Verify the applicable rules with a qualified specialist.'],
  ['Is a QR code the same thing as a passport?', 'No. A code may be an access mechanism, but the underlying work includes product identity, trustworthy information, access rights, evidence, maintenance and system connections. A visual label cannot resolve missing source data.'],
  ['What data should we gather first?', 'Begin with one product family: identifiers, destination markets, existing product attributes, supplier information, evidence locations and the person responsible for each. Do not assume this orientation list is the final legal field list.'],
  ['Do we need a new platform before a pilot?', 'Not necessarily. First map the current systems and handoffs, then test one product record and its update workflow. Platform selection should follow an understanding of scope, access, ownership and integration.'],
  ['Can this wizard confirm our compliance status?', 'No. It is a self-guided planning tool, not a legal determination, audit, certification or submission to Deshik. It stores no answers on a server.'],
  ['Who should participate in a first working session?', 'Bring someone from product or merchandising, supplier or sourcing management, quality or sustainability, and the team responsible for data systems. Assign a decision owner and specialist legal review where regulatory interpretation is required.'],
];

function Infographic() {
  const lang = useLanguage();
  const [active, setActive] = useState(0);
  const step = translateDeep(flow[active], lang);
  return <section className="dpp-flow" aria-labelledby="dpp-flow-heading"><div className="dpp-flow-head"><span className="eyebrow dark">{draftT('INFOGRAPHIC / PRODUCT DATA JOURNEY')}</span><h2 id="dpp-flow-heading">{draftT('A passport begins long before the scan.')}</h2><p>{draftT('Explore five connected layers of a maintainable product record. This is a conceptual process diagram, not a prescribed EU data model.')}</p></div><div className="dpp-flow-graphic"><svg className="dpp-flow-svg" viewBox="0 0 960 125" preserveAspectRatio="none" aria-hidden="true"><path d="M45 62 H915" stroke="#ae9cbc" strokeWidth="2" strokeDasharray="8 9" fill="none"/><path d="M45 62 H240" stroke="#8fc543" strokeWidth="4" fill="none"/><circle cx="45" cy="62" r="11" fill="#8fc543"/><circle cx="262" cy="62" r="11" fill="#c9bcd5"/><circle cx="480" cy="62" r="11" fill="#c9bcd5"/><circle cx="698" cy="62" r="11" fill="#c9bcd5"/><circle cx="915" cy="62" r="11" fill="#fa5c42"/></svg><div className="dpp-flow-steps">{flow.map((item, index) => <button type="button" key={item.title} aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span><strong>{draftT(item.title)}</strong><small>{draftT(item.short)}</small></button>)}</div></div><div className="dpp-flow-detail" aria-live="polite"><ScanLine size={25} /><div><span>{draftT('LAYER')} 0{active + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></div></div><p className="dpp-flow-note">{draftT('Regulatory scope and fields require product-specific review. A schematic is not a compliance specification.')}</p></section>;
}
function Wizard() {
  const lang = useLanguage();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState('');
  const question = translateDeep(questions[step], lang);
  const completed = Object.keys(answers).length === questions.length;
  function choose(choice) { setAnswers(prev => ({ ...prev, [step]: choice })); setStatus(''); if (step < questions.length - 1) setStep(step + 1); else setStep(questions.length); }
  function reset() { setStep(0); setAnswers({}); setStatus(''); }
  function download() {
    const heading = `${draftT('Deshik Consulting — DPP orientation notes')}\n${draftT('Planning guide only. Not legal or compliance advice.')}\n\n`;
    const items = questions.map((q, i) => {
      const local = translateDeep(q, lang);
      const selected = options.find(item => item.id === answers[i]);
      return `${i + 1}. ${local.title}\n${draftT('Answer')}: ${selected ? draftT(selected.title) : draftT('Not answered')}\n${draftT('Suggested action')}: ${local.action}\n`;
    }).join('\n');
    const file = new Blob([heading + items + `\n${draftT('Official ESPR framework')}: https://eur-lex.europa.eu/eli/reg/2024/1781/oj\n`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a'); link.href = url; link.download = 'deshik-dpp-orientation.txt'; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(draftT('Checklist downloaded. Your answers were not sent to Deshik.'));
  }
  const gaps = questions.map((q, i) => ({ ...q, answer: answers[i] })).filter(x => x.answer !== 'yes');
  return <section className="dpp-wizard" id="dpp-wizard" aria-labelledby="dpp-wizard-heading"><div className="dpp-wizard-intro"><span className="eyebrow dark">{draftT('INTERACTIVE / READINESS ORIENTATION')}</span><h2 id="dpp-wizard-heading">{draftT('Turn five questions into a first action.')}</h2><p>{draftT('This four-step wizard helps you organize the five questions in the article below. It is not a legal or compliance assessment. Answers remain in this browser tab unless you download your own notes.')}</p><div className="dpp-wizard-progress" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={step} aria-label={draftT('Wizard progress')}>{questions.map((q, i) => <span key={q.title} className={i <= step ? 'filled' : ''} />)}</div><span className="dpp-wizard-count">{draftT('STEP')} {Math.min(step + 1, questions.length)} / {questions.length}</span></div><div className="dpp-wizard-panel" aria-live="polite">{step < questions.length ? <><span className="dpp-wizard-tag">{draftT('YOUR READINESS QUESTION')}</span><h3>{question.title}</h3><p>{question.detail}</p><div className="dpp-wizard-choices">{options.map(item => <button type="button" key={item.id} aria-pressed={answers[step] === item.id} onClick={() => choose(item.id)}><span>{draftT(item.title)}</span><ArrowRight size={17} /></button>)}</div>{step > 0 && <button type="button" className="dpp-wizard-back" onClick={() => setStep(step - 1)}><ChevronLeft size={16} /> {draftT('Previous question')}</button>}</> : <div className="dpp-wizard-results"><span className="dpp-wizard-tag"><Check size={16} /> {draftT('YOUR FIRST ACTION PLAN')}</span><h3>{draftT('A clearer place to begin.')}</h3><p>{completed ? draftT('Use these prompts for a working session. They are not a pass/fail score or a compliance decision.') : draftT('Review the questions before continuing.')}</p><div className="dpp-wizard-priority"><strong>{gaps.length ? draftT('Priorities to clarify') : draftT('Next: test one limited product record')}</strong><ul>{(gaps.length ? gaps : questions.slice(-1)).map(x => <li key={x.title}><Check size={16} />{draftT(x.action)}</li>)}</ul></div><div className="dpp-wizard-actions"><button type="button" onClick={download}><Download size={17} /> {draftT('Download my checklist')}</button><button type="button" onClick={reset}><RotateCcw size={16} /> {draftT('Start again')}</button></div><span role="status">{status}</span><p className="dpp-wizard-disclaimer">{draftT('No answers are uploaded, stored on a server, or shared with Deshik. Verify legal applicability with a qualified specialist.')}</p></div>}</div></section>;
}
function Faq() {const lang = useLanguage();return <section className="dpp-faq" id="dpp-faq"><div><span className="eyebrow dark">{draftT('FAQ / DPP READINESS')}</span><h2>{draftT('Questions worth asking early.')}</h2><p>{draftT('Practical orientation, not a substitute for reviewing current product-specific measures and your obligations.')}</p><a href="https://eur-lex.europa.eu/eli/reg/2024/1781/oj" target="_blank" rel="noopener noreferrer">{draftT('Read the official EU ESPR framework')} <ArrowUpRight size={16} /></a></div><div className="dpp-faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{draftT(q, lang)}</summary><p>{draftT(a, lang)}</p></details>)}</div></section>;}
export default function DppGuideExperience() {return <><div className="dpp-article-nav"><a href="#dpp-flow-heading">{draftT('Explore the infographic')} <ArrowUpRight size={16} /></a><a href="#dpp-wizard">{draftT('Start the four-step guide')} <ArrowUpRight size={16} /></a><a href="#dpp-faq">{draftT('Read the FAQs')} <ArrowUpRight size={16} /></a></div><Infographic /><Wizard /><Faq /></>;}
