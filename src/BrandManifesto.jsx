import React, { useState } from 'react';
import { ArrowUpRight, Check, Compass, ScanLine, Factory, Route } from 'lucide-react';
import { draftT, translateDeep, useLanguage } from './i18n.jsx';
import './brand-manifesto.css';

const moves = [
  { label: 'See the real question', tag: '01 / CLARITY', question: 'Which product information is missing, and who can stand behind it?', idea: 'Begin with one product family, identify information sources, and make uncertainty visible before promising an interface or a compliance outcome.', output: 'A source-and-owner map worth discussing.', url: '/resources/dpp-data-map/', cta: 'Map the product-data question', icon: ScanLine },
  { label: 'Connect the people and signals', tag: '02 / CONTEXT', question: 'What does the factory team need to decide differently?', idea: 'Bring a measurable operating problem, existing signals and the process owner together. Technology should clarify a decision, not add another disconnected screen.', output: 'A bounded pilot question with a baseline.', url: '/experience/factory-operations-studio/', cta: 'Explore a fictional factory scenario', icon: Factory },
  { label: 'Make a measured move', tag: '03 / ACTION', question: 'What small step will teach us whether to go further?', idea: 'Agree the scope, the people responsible, a useful working output and a scale-or-stop checkpoint before committing to a wider programme.', output: 'A practical next-step roadmap.', url: '/approach/consulting-process/', cta: 'See our consulting process', icon: Route },
];

export default function BrandManifesto({ compact = false }) {
  const lang = useLanguage();
  const [active,setActive] = useState(0);
  const selection = translateDeep(moves[active],lang);
  const Icon = moves[active].icon;
  return <section id="brand-perspective" className={'brand-manifesto' + (compact?' brand-manifesto-compact':'')} aria-labelledby="brand-manifesto-heading"><div className="brand-manifesto-intro"><span className="eyebrow dark">{draftT('THE DESHIK PERSPECTIVE')}</span><h2 id="brand-manifesto-heading">{draftT('Tomorrow, made practical.')}</h2><p>{draftT('A new possibility matters only when the next decision becomes clearer. We connect the question, the people and a useful first step—without pretending that a demo is a delivered result.')}</p><div className="brand-manifesto-trace" aria-hidden="true"><span/><span/><span/></div></div><div className="brand-manifesto-explore"><div className="brand-manifesto-tabs" role="group" aria-label={draftT('Choose a practical move')}>{moves.map((move,i)=><button type="button" key={move.tag} aria-pressed={active===i} onClick={()=>setActive(i)}><span>0{i+1}</span><strong>{draftT(move.label,lang)}</strong><ArrowUpRight size={17}/></button>)}</div><div className="brand-manifesto-detail" aria-live="polite"><div className="brand-manifesto-icon"><Icon size={34} strokeWidth={1.2}/></div><span>{selection.tag}</span><h3>{selection.question}</h3><p>{selection.idea}</p><div className="brand-manifesto-output"><Check size={17}/><strong>{draftT('Working output')}:</strong> {selection.output}</div><a href={moves[active].url}>{selection.cta}<ArrowUpRight size={17}/></a></div></div></section>;
}
