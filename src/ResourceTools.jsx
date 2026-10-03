import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, Download, FileSpreadsheet, Factory, ScanLine, Plus, RotateCcw, Search, Trash2 } from 'lucide-react';
import { draftT, translateDeep, useLanguage } from './i18n.jsx';
import './resource-tools.css';

const glossary = [
  { term: 'Product identifier', category: 'Product data', meaning: 'A stable reference that distinguishes the product record you mean. Check whether it refers to a model, variant, order or individual item.' },
  { term: 'Source of truth', category: 'Product data', meaning: 'The system or owner whose value is authoritative when the same attribute appears in several places. This is an operating decision, not a software feature.' },
  { term: 'Evidence record', category: 'Product data', meaning: 'A traceable document, observation or declaration supporting a statement. Record its date, relevant product version and who reviewed it.' },
  { term: 'Data owner', category: 'Product data', meaning: 'The role accountable for maintaining a field, resolving exceptions and approving updates. One field can involve several contributors but needs a clear review path.' },
  { term: 'DPP applicability', category: 'Product data', meaning: 'Whether a product is covered by relevant product-specific requirements. An exploratory worksheet cannot determine legal obligations or deadlines.' },
  { term: 'Operational baseline', category: 'Operations', meaning: 'A defined measure of current performance, such as time to resolve a recurring stop, before introducing a new process or pilot.' },
  { term: 'Pilot boundary', category: 'Operations', meaning: 'The limited line, workflow, site, permissions and time window within which an idea will be tested and reviewed.' },
  { term: 'OT boundary', category: 'Operations', meaning: 'The separation and controls around operational technology such as machines and control systems. Qualified personnel must assess connections and safety.' },
  { term: 'Exception owner', category: 'Operations', meaning: 'The person or team authorized to respond when data, quality or operation departs from the expected path.' },
];
const mapColumns = [
  { key: 'field', label: 'Information field', prompt: 'e.g. product identifier' },
  { key: 'source', label: 'Where it lives', prompt: 'e.g. product system' },
  { key: 'owner', label: 'Who maintains it', prompt: 'e.g. merchandising' },
];
const statuses = ['Not mapped', 'Partly mapped', 'Source identified', 'Needs review'];
const canvasFields = [
  { key: 'problem', label: 'Operating question', prompt: 'What recurring problem needs a better decision?', hint: 'Describe the work, not a technology you want to buy.' },
  { key: 'baseline', label: 'Current baseline', prompt: 'What do you measure today? Over what period?', hint: 'If the baseline is unknown, write down how you could establish it.' },
  { key: 'signal', label: 'Existing signals and systems', prompt: 'Which equipment, records or people already capture information?', hint: 'Do not connect machines or export data on the basis of this worksheet.' },
  { key: 'owner', label: 'Decision and process owner', prompt: 'Who acts on an insight and maintains the process?', hint: 'Use roles rather than personal names if the worksheet may be shared.' },
  { key: 'boundary', label: 'Pilot boundary and safeguards', prompt: 'One line or workflow, safety review, access and time window', hint: 'Machine safety and OT security require qualified review.' },
  { key: 'success', label: 'Success and stop criteria', prompt: 'What result justifies scaling, revising or stopping?', hint: 'Compare against the current baseline and include operator feedback.' },
];
function downloadFile(filename, content, type = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a'); link.href = url; link.download = filename;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
// Quoting alone does not stop spreadsheet formula execution. Prefix formula-like values before CSV export.
function csvCell(value) {
  const safe = /^[\s]*[=+@\-\t\r]/.test(value) ? "'" + value : value;
  return '"' + safe.replaceAll('"', '""') + '"';
}
const initialMap = () => [
  { id: 1, field: '', source: '', owner: '', status: 'Not mapped' },
  { id: 2, field: '', source: '', owner: '', status: 'Not mapped' },
  { id: 3, field: '', source: '', owner: '', status: 'Not mapped' },
];
function ToolHero({ label, title, intro, icon: Icon }) {return <section className="resource-hero"><div><span className="eyebrow">{label}</span><h1>{title}</h1><p>{intro}</p><a className="button-primary" href="#resource-tool">{draftT('Open the tool')} <ArrowUpRight size={17}/></a></div><div aria-hidden="true"><Icon size={105} strokeWidth={.8}/></div></section>}
function Notice() {return <p className="resource-privacy" role="note"><Check size={17}/>{draftT('This tool runs in your browser. Nothing is uploaded, saved to a server or sent to Deshik. Avoid entering confidential information. A download is stored only where you save it.')}</p>}
export function ResourceHub({ Shell }) {
  const lang = useLanguage();
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const categories = ['All', 'Product data', 'Operations'];
  const items = glossary.filter(x => (category === 'All' || x.category === category) && (!query || [x.term,x.meaning,draftT(x.term,lang),draftT(x.meaning,lang)].join(' ').toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())));
  return <Shell><section className="resource-hero resource-hub-hero"><div><span className="eyebrow">{draftT('DESHIK / RESOURCE CENTER')}</span><h1>{draftT('Start with a useful working document.')}</h1><p>{draftT('Two lightweight tools and a plain-language glossary to help frame product-data and factory-improvement conversations. These are planning aids, not assessments or client deliverables.')}</p><a className="button-primary" href="#resource-tools">{draftT('Explore the tools')} <ArrowUpRight size={18}/></a></div><div aria-hidden="true"><FileSpreadsheet size={105} strokeWidth={.8}/></div></section><section className="resource-hub-tools" id="resource-tools"><div><span className="eyebrow dark">{draftT('PRACTICAL TOOLS / 01—02')}</span><h2>{draftT('From a question to a working draft.')}</h2><p>{draftT('Use these private, browser-only worksheets to organize a first discussion. Download what you create and review it with the appropriate team.')}</p></div><div className="resource-tool-grid"><a href="/resources/dpp-data-map/"><ScanLine size={34}/><span>01 / {draftT('PRODUCT INFORMATION')}</span><h3>{draftT('Product-data source map')}</h3><p>{draftT('List information fields, current sources, owners and gaps for one representative product.')}</p><strong>{draftT('Open worksheet')} <ArrowUpRight size={18}/></strong></a><a href="/resources/automation-pilot-canvas/"><Factory size={34}/><span>02 / {draftT('CONNECTED OPERATIONS')}</span><h3>{draftT('Automation pilot canvas')}</h3><p>{draftT('Frame an operating problem, baseline, decision owner and safe pilot boundary.')}</p><strong>{draftT('Open canvas')} <ArrowUpRight size={18}/></strong></a></div></section><section className="resource-glossary" id="glossary"><div><span className="eyebrow dark">{draftT('PLAIN-LANGUAGE GLOSSARY')}</span><h2>{draftT('Know what the conversation means.')}</h2><p>{draftT('Short working definitions for early-stage planning. Product-specific legal and technical terms still require specialist review.')}</p></div><div className="resource-glossary-controls"><div role="group" aria-label={draftT('Filter glossary terms')}>{categories.map(item=><button type="button" key={item} aria-pressed={category===item} onClick={()=>setCategory(item)}>{draftT(item)}</button>)}</div><label><Search size={18}/><span className="resource-sr-only">{draftT('Search glossary')}</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={draftT('Search glossary')}/></label></div><div className="resource-glossary-list" aria-live="polite">{items.length ? items.map(x=><article key={x.term}><span>{draftT(x.category)}</span><h3>{draftT(x.term,lang)}</h3><p>{draftT(x.meaning,lang)}</p></article>) : <p>{draftT('No terms match. Try another word or clear the filter.')}</p>}</div></section><section className="resource-related"><div><span className="eyebrow dark">{draftT('CONTINUE READING')}</span><h2>{draftT('Questions behind the worksheets.')}</h2></div><a href="/insights/dpp-readiness-questions/">{draftT('DPP readiness guide')} <ArrowUpRight size={19}/></a><a href="/insights/automation-pilot/">{draftT('Automation pilot guide')} <ArrowUpRight size={19}/></a></section></Shell>;
}
export function DppDataMapper({ Shell }) {
  const lang = useLanguage();
  const [rows, setRows] = useState(initialMap);
  const [status, setStatus] = useState('');
  const [nextId, setNextId] = useState(4);
  function edit(id,key,value) {setRows(prev=>prev.map(row=>row.id===id?{...row,[key]:value}:row));setStatus('')}
  function add() {setRows(prev=>[...prev,{id:nextId,field:'',source:'',owner:'',status:'Not mapped'}]);setNextId(n=>n+1)}
  function remove(id) {setRows(prev=>prev.filter(row=>row.id!==id));setStatus('')}
  function reset() {setRows(initialMap());setNextId(4);setStatus(draftT('Worksheet cleared.'))}
  function exportCsv() {
    const header = [...mapColumns.map(x=>draftT(x.label,lang)),draftT('Mapping status')];
    const lines = [header,...rows.filter(row=>row.field||row.source||row.owner).map(row=>[row.field,row.source,row.owner,draftT(row.status,lang)])];
    if (lines.length===1) {setStatus(draftT('Add at least one field before downloading.'));return}
    downloadFile('deshik-product-data-map.csv','\uFEFF'+lines.map(line=>line.map(csvCell).join(',')).join('\r\n'),'text/csv;charset=utf-8');
    setStatus(draftT('CSV downloaded. Check your Downloads folder.'));
  }
  return <Shell><ToolHero label={draftT('RESOURCE / DPP DATA MAP')} title={draftT('Find the data behind the product.')} intro={draftT('A first-pass map of information fields, sources and owners. Start with one representative product—not the entire portfolio or a presumed legal field list.')} icon={ScanLine}/><section className="resource-tool" id="resource-tool"><div className="resource-tool-intro"><span className="eyebrow dark">{draftT('INTERACTIVE WORKSHEET')}</span><h2>{draftT('One row. One source. One owner.')}</h2><p>{draftT('Enter the information you want to investigate. Blank rows are not exported. Status labels are for planning only; this worksheet cannot decide DPP applicability or compliance.')}</p></div><Notice/><div className="resource-map" role="group" aria-label={draftT('Product data mapping rows')}>{rows.map((row,i)=><div className="resource-map-row" key={row.id}><div className="resource-map-row-head"><strong>{draftT('FIELD')} {String(i+1).padStart(2,'0')}</strong><button type="button" onClick={()=>remove(row.id)} aria-label={draftT('Remove row')+' '+(i+1)}><Trash2 size={17}/>{draftT('Remove')}</button></div><div className="resource-map-fields">{mapColumns.map(column=><label key={column.key}>{draftT(column.label)}<input aria-label={draftT(column.label)+" "+(i+1)} maxLength={180} value={row[column.key]} placeholder={draftT(column.prompt)} onChange={e=>edit(row.id,column.key,e.target.value)}/></label>)}<label>{draftT('Mapping status')}<select aria-label={draftT('Mapping status')+" "+(i+1)} value={row.status} onChange={e=>edit(row.id,'status',e.target.value)}>{statuses.map(x=><option value={x} key={x}>{draftT(x,lang)}</option>)}</select></label></div></div>)}</div><div className="resource-tool-actions"><button type="button" onClick={add}><Plus size={17}/>{draftT('Add another field')}</button><button type="button" onClick={exportCsv}><Download size={17}/>{draftT('Download CSV')}</button><button type="button" onClick={reset}><RotateCcw size={16}/>{draftT('Clear worksheet')}</button></div><p className="resource-status" role="status">{status}</p><p className="resource-editorial-note">{draftT('This is an illustrative planning template, not a complete or required DPP data schema. Verify applicable product-specific requirements and evidence needs with a qualified specialist.')}</p></section><section className="resource-related"><div><span className="eyebrow dark">{draftT('NEXT / PRODUCT DATA')}</span><h2>{draftT('Put the map in context.')}</h2></div><a href="/insights/dpp-readiness-questions/#dpp-wizard">{draftT('Try the DPP guide')} <ArrowUpRight size={18}/></a><a href="/services/digital-product-passport/rmg-bangladesh/">{draftT('Explore RMG & DPP')} <ArrowUpRight size={18}/></a></section></Shell>;
}
export function AutomationPilotCanvas({ Shell }) {
  const lang = useLanguage();
  const [draft, setDraft] = useState({});
  const [status,setStatus] = useState('');
  const answered = canvasFields.filter(x=>draft[x.key]?.trim()).length;
  function edit(key,value) {setDraft(prev=>({...prev,[key]:value}));setStatus('')}
  function reset() {setDraft({});setStatus(draftT('Canvas cleared.'))}
  function exportText() {
    if (!answered) {setStatus(draftT('Add at least one note before downloading.'));return}
    const text=[draftT('Deshik Consulting — automation pilot canvas'),draftT('Planning notes only. Not an engineering or safety assessment.'),'',...canvasFields.flatMap((field,i)=>[`${i+1}. ${draftT(field.label,lang)}`,draft[field.key]?.trim()||draftT('Not answered'),'']),draftT('Review machine safety, OT security and site access with qualified personnel before any connection or installation.')].join('\n');
    downloadFile('deshik-automation-pilot-canvas.txt',text);
    setStatus(draftT('Canvas downloaded. Nothing was sent to Deshik.'));
  }
  return <Shell><ToolHero label={draftT('RESOURCE / AUTOMATION PILOT')} title={draftT('Give the pilot a purpose before a platform.')} intro={draftT('Frame a measurable operating problem, the current baseline, the decision owner and a limited technical boundary. This is a conversation canvas—not a controls design.')} icon={Factory}/><section className="resource-tool resource-canvas" id="resource-tool"><div className="resource-tool-intro"><span className="eyebrow dark">{draftT('INTERACTIVE WORKING CANVAS')}</span><h2>{draftT('Make the first conversation useful.')}</h2><p>{draftT('Fill what you know. Leave unknowns visible. Review this draft with operations, safety and technical owners before deciding on a pilot.')}</p><span className="resource-counter">{answered} / {canvasFields.length} {draftT('PROMPTS WITH NOTES')}</span></div><Notice/><div className="resource-canvas-grid">{canvasFields.map((field,i)=><label key={field.key}><span>0{i+1} / {draftT(field.label,lang)}</span><small>{draftT(field.hint,lang)}</small><textarea rows="4" maxLength={1000} value={draft[field.key]||''} onChange={e=>edit(field.key,e.target.value)} placeholder={draftT(field.prompt,lang)}/></label>)}</div><div className="resource-tool-actions"><button type="button" onClick={exportText}><Download size={17}/>{draftT('Download working canvas')}</button><button type="button" onClick={reset}><RotateCcw size={16}/>{draftT('Clear canvas')}</button></div><p className="resource-status" role="status">{status}</p><p className="resource-editorial-note">{draftT('This canvas does not approve a machine connection, safety design or OT architecture. Any on-site technical work requires agreed scope and qualified specialists.')}</p></section><section className="resource-related"><div><span className="eyebrow dark">{draftT('NEXT / OPERATIONS')}</span><h2>{draftT('Explore the operating question.')}</h2></div><a href="/insights/automation-pilot/">{draftT('Read the automation pilot guide')} <ArrowUpRight size={18}/></a><a href="/services/industrial-automation/">{draftT('Explore industrial automation')} <ArrowUpRight size={18}/></a></section></Shell>;
}
