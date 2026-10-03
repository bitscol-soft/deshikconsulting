import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2, Database, FileCheck2, GitBranch, Layers3, ShieldCheck } from 'lucide-react';
import { draftT, useLanguage } from './i18n.jsx';
import './tdg-infographic.css';

const systems = [
  { key:'PLM', name:'Product lifecycle', example:'Style, specification and bill of materials', field:'Product ID + version', owner:'Product / merchandising', question:'Which version of this style is in scope?' },
  { key:'ERP', name:'Enterprise records', example:'Material master and purchase-order references', field:'Material + order ID', owner:'Procurement / finance', question:'Which ordered materials belong to this product?' },
  { key:'MES', name:'Production systems', example:'Production events and material consumption', field:'Batch + production event', owner:'Factory operations', question:'Which lot was actually consumed?' },
  { key:'SCM', name:'Supply chain', example:'Supplier and shipment references', field:'Supplier + shipment ID', owner:'Sourcing / logistics', question:'Who supplied it and when did it move?' },
  { key:'QMS', name:'Quality systems', example:'Inspection results and supporting certificates', field:'Test + evidence ID', owner:'Quality / compliance', question:'What evidence is available and current?' }
];
const phases = [
  { title:'Connect', icon:GitBranch, summary:'Match the records', description:'Agree common product, material and batch identifiers across teams. Record where each field originates and who owns it.', signal:'An identified source and accountable owner', example:'PLM style ID ↔ ERP material reference' },
  { title:'Validate', icon:ShieldCheck, summary:'Show what can be trusted', description:'Check completeness, source, date and format; flag conflicts or missing documents for review instead of silently filling gaps.', signal:'Visible gaps, checks and review status', example:'A test certificate is missing or out of date' },
  { title:'Standardize', icon:Layers3, summary:'Use one governed model', description:'Translate source fields into an agreed, versioned product-data model with access rules and traceable transformations.', signal:'A consistent record with data lineage', example:'Material origin mapped to a defined field' },
  { title:'Exchange', icon:FileCheck2, summary:'Share only what is approved', description:'Prepare a controlled output for an agreed use case. DPP publication depends on the applicable product rules, permissions and further validation.', signal:'A reviewable output, not an automatic compliance pass', example:'An approved view of the product record' }
];
export default function TdgInfographic({ compact=false }) {
  useLanguage();
  const [selected,setSelected]=useState(0);
  const [phase,setPhase]=useState(0);
  const active=systems[selected],current=phases[phase],Icon=current.icon;
  return <section className={'tdg-info '+(compact?'tdg-info-compact':'')} aria-labelledby={compact?'tdg-info-home-title':'tdg-info-title'}>
    <div className="tdg-info-heading"><div><span className="eyebrow dark">{draftT('INTERACTIVE INFOGRAPHIC / TDG DATA JOURNEY')}</span><h2 id={compact?'tdg-info-home-title':'tdg-info-title'}>{draftT('Five sources. One clearer product story.')}</h2></div><p>{draftT('Explore an illustrative apparel product record: select a source to see the information it could contribute, then follow how TDG would prepare that information for a governed output.')}</p></div>
    <div className="tdg-info-canvas">
      <div className="tdg-info-sources" aria-label={draftT('Choose a source system')}><span className="tdg-info-rail-label">{draftT('01 / EXISTING SYSTEMS')}</span>{systems.map((item,i)=><button key={item.key} type="button" aria-pressed={i===selected} onClick={()=>setSelected(i)}><span className="tdg-info-system-icon"><Database size={17}/></span><strong>{item.key}</strong><small>{draftT(item.name)}</small><span className="tdg-info-activity" aria-hidden="true"/></button>)}</div>
      <div className="tdg-info-connector" aria-hidden="true"><span/><ArrowRight size={25}/></div>
      <div className="tdg-info-gateway"><span className="tdg-info-rail-label">{draftT('02 / DATA GATEWAY')}</span><div className="tdg-info-orbit"><div className="tdg-info-core"><span>TDG</span><small>{draftT('TRUSTED DATA GATEWAY')}</small></div></div><div className="tdg-info-phase-tabs" aria-label={draftT('Explore gateway stages')}>{phases.map((item,i)=><button type="button" key={item.title} aria-pressed={phase===i} onClick={()=>setPhase(i)}>{String(i+1).padStart(2,'0')} {draftT(item.title)}</button>)}</div></div>
      <div className="tdg-info-connector" aria-hidden="true"><span/><ArrowRight size={25}/></div>
      <div className="tdg-info-output"><span className="tdg-info-rail-label">{draftT('03 / GOVERNED OUTPUT')}</span><div className="tdg-info-record"><FileCheck2 size={35}/><strong>{draftT('Product record')}</strong><span>{draftT('Source · Owner · Evidence · Version')}</span><i><CheckCircle2 size={15}/>{draftT('Ready for review')}</i></div><small>{draftT('Potential DPP use only after applicable requirements and approval are confirmed.')}</small></div>
    </div>
    <div className="tdg-info-details" aria-live="polite"><article><span className="tdg-info-detail-label">{draftT('SELECTED SOURCE')} / {active.key}</span><h3>{draftT(active.example)}</h3><dl><div><dt>{draftT('Example link')}</dt><dd>{draftT(active.field)}</dd></div><div><dt>{draftT('Likely data owner')}</dt><dd>{draftT(active.owner)}</dd></div></dl><p><strong>{draftT('Question to resolve:')}</strong> {draftT(active.question)}</p></article><article><span className="tdg-info-detail-label">{draftT('TDG STAGE')} / 0{phase+1}</span><h3><Icon size={23}/>{draftT(current.summary)}</h3><p>{draftT(current.description)}</p><div className="tdg-info-check"><strong>{draftT('Working output')}</strong><span>{draftT(current.signal)}</span></div><small>{draftT('Example:')} {draftT(current.example)}</small></article></div>
    <div className="tdg-info-bottom"><p>{draftT('Conceptual architecture, not a live integration, measured result or certification. Actual system connections, fields and passport obligations require discovery and product-specific review.')}</p>{compact&&<a href="/services/trusted-data-gateway/">{draftT('See the full TDG approach')} <ArrowUpRight size={17}/></a>}</div>
  </section>;
}
