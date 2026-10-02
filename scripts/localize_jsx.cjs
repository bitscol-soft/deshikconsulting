const fs=require('fs'),parser=require('@babel/parser'),traverse=require('@babel/traverse').default,generator=require('@babel/generator').default,t=require('@babel/types');
const dict=require('../src/draft-locales/fr.json');
for(const file of ['src/Pages.jsx','src/ContentSections.jsx','src/ProofTemplates.jsx','src/EngagementTools.jsx','src/main.jsx','src/HeroSlider.jsx','src/StrategicPages.jsx']){
 const code=fs.readFileSync(file,'utf8');const ast=parser.parse(code,{sourceType:'module',plugins:['jsx']});let n=0;
 traverse(ast,{JSXText(p){const raw=p.node.value;if(typeof raw!=="string")return;const core=raw.trim();if(!core||!dict[core])return;const leading=raw.match(/^\s*/)[0],trailing=raw.match(/\s*$/)[0];let expression=t.callExpression(t.identifier('draftT'),[t.stringLiteral(core)]);if(leading)expression=t.binaryExpression('+',t.stringLiteral(leading),expression);if(trailing)expression=t.binaryExpression('+',expression,t.stringLiteral(trailing));p.replaceWith(t.jsxExpressionContainer(expression));n++}});
 if(n){if(!/import\s*\{[^}]*draftT[^}]*\}\s*from\s*['"]\.\/i18n\.jsx['"]/.test(code))ast.program.body.unshift(t.importDeclaration([t.importSpecifier(t.identifier('draftT'),t.identifier('draftT'))],t.stringLiteral('./i18n.jsx')));fs.writeFileSync(file,generator(ast,{retainLines:true,jsescOption:{minimal:true}},fs.readFileSync(file,'utf8')).code+'\n')};console.log(file,n)
}
