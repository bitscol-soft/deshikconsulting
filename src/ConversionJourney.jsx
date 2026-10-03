import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Compass, RotateCcw } from 'lucide-react';
import { useLanguage, draftT, translateDeep } from './i18n.jsx';
import './conversion-journey.css';

const goals = [
  { id: 'product', title: 'Prepare product information', detail: 'Traceability, suppliers and export-market questions.' },
  { id: 'factory', title: 'Improve factory performance', detail: 'Visibility, downtime, quality and operational signals.' },
  { id: 'direction', title: 'Set a clearer direction', detail: 'Strategy, growth and transformation priorities.' },
  { id: 'technology', title: 'Explore emerging technology', detail: 'AI, clean mobility, microelectronics or robotics.' },
];
const contexts = [
  { id: 'garments', title: 'Garments & textiles' },
  { id: 'manufacturing', title: 'Industrial manufacturing' },
  { id: 'other', title: 'Another organization or sector' },
];
const stages = [
  { id: 'exploring', title: 'Exploring the question' },
  { id: 'mapping', title: 'Mapping what we have' },
  { id: 'pilot', title: 'Ready to scope a pilot' },
];
const routes = {
  dpp: { label: 'Digital Product Passport', url: '/services/digital-product-passport/', topic: 'dpp', why: 'Start with product categories, markets, information owners and supplier-data gaps.', first: 'Choose one product group and map where its information is created and maintained.' },
  rmg: { label: 'RMG product-data readiness', url: '/services/digital-product-passport/rmg-bangladesh/', topic: 'rmg', why: 'For garment exporters, product records depend on coordinated handoffs across materials, suppliers and production.', first: 'Trace one garment style from its source data to the information a buyer might request.' },
  automation: { label: 'Industrial Automation', url: '/services/industrial-automation/', topic: 'automation', why: 'Connect a measurable operating problem to the signals, people and systems already in place.', first: 'Select one production issue, its baseline and a process owner.' },
  strategy: { label: 'Strategy & Growth', url: '/services/strategy-growth/', topic: 'strategy', why: 'Put the decision, trade-offs and organizational priorities ahead of a predetermined solution.', first: 'Write down the decision that must change and the evidence needed to make it.' },
  digital: { label: 'Digital Transformation', url: '/services/digital-transformation/', topic: 'digital', why: 'Understand how existing information and workflows can support a better operating model.', first: 'Map one frustrating workflow and the systems involved before choosing tools.' },
  ai: { label: 'Data & Artificial Intelligence', url: '/services/data-artificial-intelligence/', topic: 'ai', why: 'Explore a useful data or AI question without assuming a model is the answer.', first: 'Identify a decision and check whether trustworthy data is available to support it.' },
};
function match(goal, context, stage) {
  if (goal === 'product') return context === 'garments' ? ['rmg', 'dpp'] : ['dpp', 'digital'];
  if (goal === 'factory') return ['automation', stage === 'exploring' ? 'strategy' : 'digital'];
  if (goal === 'direction') return ['strategy', 'digital'];
  return ['ai', context === 'manufacturing' ? 'automation' : 'strategy'];
}
export default function ConversionJourney({ compact = false }) {
  const lang = useLanguage();
  const [goal, setGoal] = useState('');
  const [context, setContext] = useState('');
  const [stage, setStage] = useState('');
  const [step, setStep] = useState(0);
  const groups = [goals, contexts, stages];
  const labels = ['Your priority', 'Your context', 'Your starting point'];
  const choices = [goal, context, stage];
  const setters = [setGoal, setContext, setStage];
  const result = match(goal, context, stage).map((key) => routes[key]);
  function select(id) { setters[step](id); if (step < 2) setStep(step + 1); else setStep(3); }
  function reset() { setGoal(''); setContext(''); setStage(''); setStep(0); }
  return <section className={'conversion-journey' + (compact ? ' conversion-journey-compact' : '')} aria-labelledby="journey-title">
    <div className="conversion-journey-intro"><span className="eyebrow dark"><Compass size={16} /> {draftT('FIND YOUR STARTING POINT')}</span><h2 id="journey-title">{draftT('The right next step starts with a better question.')}</h2><p>{draftT('Three quick choices. A relevant place to begin. No account, scoring or information sent to us.')}</p><div className="journey-steps" aria-label={draftT('Guide progress')}>{labels.map((label, i) => <button key={label} type="button" disabled={i > step || step === 3 && i > 2} className={i === step ? 'active' : ''} onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined}><span>{i + 1}</span>{draftT(label)}</button>)}</div></div>
    <div className="conversion-journey-panel" aria-live="polite">{step < 3 ? <><div className="journey-panel-heading"><span>0{step + 1} / 03</span><h3>{draftT(['What are you trying to move forward?', 'Where does this question show up?', 'How far along are you?'][step])}</h3><p>{draftT(['Choose the closest fit. You can change it later.', 'This helps us suggest a more useful entry point.', 'This is an orientation, not an assessment.'][step])}</p></div><div className="journey-options">{groups[step].map((item) => {const translated = translateDeep(item, lang);return <button type="button" key={item.id} className={choices[step] === item.id ? 'selected' : ''} onClick={() => select(item.id)}><span className="journey-option-icon">{choices[step] === item.id ? <Check size={18} /> : <ArrowUpRight size={18} />}</span><strong>{translated.title}</strong>{translated.detail && <small>{translated.detail}</small>}</button>;})}</div>{step > 0 && <button type="button" className="journey-back" onClick={() => setStep(step - 1)}>← {draftT('Previous question')}</button>}</> : <div className="journey-result"><span className="journey-result-kicker"><Check size={16} /> {draftT('A suggested starting point')}</span><h3>{draftT(result[0].label)}</h3><p>{draftT(result[0].why)}</p><div className="journey-first"><span>{draftT('TRY THIS FIRST')}</span><p>{draftT(result[0].first)}</p></div><div className="journey-result-links"><a className="journey-primary" href={result[0].url}>{draftT('Explore this service')} <ArrowUpRight size={18} /></a><a className="journey-secondary" href={'/contact/?topic=' + result[0].topic}>{draftT('Discuss this direction')} <ArrowRight size={17} /></a></div><div className="journey-alternative"><span>{draftT('Another path to consider')}</span><a href={result[1].url}>{draftT(result[1].label)} <ArrowUpRight size={16} /></a></div><button className="journey-back" type="button" onClick={reset}><RotateCcw size={15} /> {draftT('Start again')}</button><p className="journey-disclaimer">{draftT('This guide uses simple predefined rules. It does not provide legal, technical or compliance advice. Your choices stay in this browser tab.')}</p></div>}</div>
  </section>;
}
