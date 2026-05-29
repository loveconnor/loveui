#!/usr/bin/env node
import{spawnSync as fe}from"child_process";import{existsSync as d}from"fs";import{cp as pe,mkdir as F,readdir as se,readFile as m,writeFile as R}from"fs/promises";import ne from"os";import r from"path";import{createInterface as he}from"readline/promises";import{pathToFileURL as me,fileURLToPath as be}from"url";var ye=r.dirname(be(import.meta.url)),V=r.resolve(ye,".."),G=r.join(V,"packages"),U=r.join(V,"registry"),ke=r.join(V,"skills"),re=new Set([".ts",".tsx",".cts",".mts",".js",".jsx",".css",".scss",".sass",".mdx",".md"]),X=new Set(["node_modules","dist",".turbo",".next","build",".cache"]),ie=new Set(["accordion","alert","alert-dialog","autocomplete","avatar","badge","breadcrumb","button","card","checkbox","checkbox-group","collapsible","combobox","command","dialog","empty","field","fieldset","form","frame","group","input","input-group","label","menu","meter","number-field","pagination","popover","preview-card","progress","radio-group","scroll-area","select","separator","sheet","skeleton","slider","switch","table","tabs","textarea","toast","toggle","toggle-group","toolbar","tooltip"]),ae=new Map([["auth-one",{sourceDir:"auth1",targetBase:"components/blocks/auth/one"}],["auth-two",{sourceDir:"auth2",targetBase:"components/blocks/auth/two"}],["auth-three",{sourceDir:"auth3",targetBase:"components/blocks/auth/three"}],["header-one",{sourceDir:"header1",targetBase:"components/blocks/header/one"}],["header-two",{sourceDir:"header2",targetBase:"components/blocks/header/two"}],["header-three",{sourceDir:"header3",targetBase:"components/blocks/header/three",dependencies:{"@base-ui/react":"^1.5.0"}}],["footer-one",{sourceDir:"footer1",targetBase:"components/blocks/footer/one"}],["footer-two",{sourceDir:"footer2",targetBase:"components/blocks/footer/two"}],["footer-three",{sourceDir:"footer3",targetBase:"components/blocks/footer/three",dependencies:{motion:"^12.40.0"}}],["footer-four",{sourceDir:"footer4",targetBase:"components/blocks/footer/four"}],["footer-five",{sourceDir:"footer5",targetBase:"components/blocks/footer/five"}],["footer-six",{sourceDir:"footer6",targetBase:"components/blocks/footer/six",dependencies:{motion:"^12.40.0"}}],["logo-cloud-one",{sourceDir:"logo-cloud-1",targetBase:"components/blocks/logo-cloud/one"}],["logo-cloud-two",{sourceDir:"logo-cloud-2",targetBase:"components/blocks/logo-cloud/two",dependencies:{"class-variance-authority":"^0.7.1"}}],["logo-cloud-three",{sourceDir:"logo-cloud-3",targetBase:"components/blocks/logo-cloud/three",dependencies:{motion:"^12.40.0","react-use-measure":"^2.1.7"}}],["logo-cloud-four",{sourceDir:"logo-cloud-4",targetBase:"components/blocks/logo-cloud/four",dependencies:{motion:"^12.40.0","react-use-measure":"^2.1.7"}}],["logo-cloud-five",{sourceDir:"logo-cloud-5",targetBase:"components/blocks/logo-cloud/five"}],["hero-one",{sourceDir:"hero1",targetBase:"components/blocks/hero/one",dependencies:{motion:"^12.40.0","react-use-measure":"^2.1.7"}}],["hero-two",{sourceDir:"hero2",targetBase:"components/blocks/hero/two",dependencies:{"class-variance-authority":"^0.7.1",motion:"^12.40.0","react-use-measure":"^2.1.7"}}],["hero-three",{sourceDir:"hero3",targetBase:"components/blocks/hero/three",dependencies:{motion:"^12.40.0","react-use-measure":"^2.1.7"}}],["features-one",{sourceDir:"features1",targetBase:"components/blocks/features/one"}],["features-two",{sourceDir:"features2",targetBase:"components/blocks/features/two",dependencies:{"class-variance-authority":"^0.7.1"}}],["features-three",{sourceDir:"features3",targetBase:"components/blocks/features/three"}],["features-four",{sourceDir:"features4",targetBase:"components/blocks/features/four",dependencies:{"class-variance-authority":"^0.7.1"}}],["features-five",{sourceDir:"features5",targetBase:"components/blocks/features/five"}],["features-six",{sourceDir:"features6",targetBase:"components/blocks/features/six",dependencies:{cobe:"^2.0.1"}}]]),we=[".ts",".tsx",".js",".jsx"],le=/(^|\/)lib\/utils(?:\.[a-z]+)?$/i,ve=/@loveui\/ui\/lib\/utils|@loveui\/shadcn-ui\/lib\/utils|@love-ui\/shadcn-ui\/lib\/utils|@\/lib\/utils|~\/lib\/utils|(?:\.\.\/)+ui\/src\/lib\/utils/,$e=`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,xe="love-ui globals",je=`/* love-ui globals */
@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.21 0.006 285.885);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.21 0.006 285.885);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.21 0.006 285.885);
  --primary: oklch(0.274 0.006 286.033);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0 0 0 / 4%);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --muted: oklch(0 0 0 / 4%);
  --muted-foreground: oklch(0.442 0.017 285.786);
  --accent: oklch(0 0 0 / 4%);
  --accent-foreground: oklch(0.21 0.006 285.885);
  --destructive: oklch(0.637 0.237 25.331);
  --destructive-foreground: oklch(0.505 0.213 27.518);
  --info: oklch(0.623 0.214 259.815);
  --info-foreground: oklch(0.488 0.243 264.376);
  --success: oklch(0.696 0.17 162.48);
  --success-foreground: oklch(0.508 0.118 165.612);
  --warning: oklch(0.769 0.188 70.08);
  --warning-foreground: oklch(0.555 0.163 48.998);
  --border: oklch(0 0 0 / 10%);
  --input: oklch(0 0 0 / 10%);
  --ring: oklch(0.705 0.015 286.067);
}

.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.967 0.001 286.375);
  --card: color-mix(in srgb, oklch(0.21 0.006 285.885) 80%, oklch(0.141 0.005 285.823));
  --card-foreground: oklch(0.967 0.001 286.375);
  --popover: oklch(0.21 0.006 285.885);
  --popover-foreground: oklch(0.967 0.001 286.375);
  --primary: oklch(0.967 0.001 286.375);
  --primary-foreground: oklch(0.21 0.006 285.885);
  --secondary: oklch(1 0 0 / 6%);
  --secondary-foreground: oklch(0.967 0.001 286.375);
  --muted: oklch(1 0 0 / 6%);
  --muted-foreground: oklch(0.705 0.015 286.067);
  --accent: oklch(1 0 0 / 6%);
  --accent-foreground: oklch(0.967 0.001 286.375);
  --destructive: oklch(0.637 0.237 25.331);
  --destructive-foreground: oklch(0.704 0.191 22.216);
  --info: oklch(0.623 0.214 259.815);
  --info-foreground: oklch(0.707 0.165 254.624);
  --success: oklch(0.696 0.17 162.48);
  --success-foreground: oklch(0.765 0.177 163.223);
  --warning: oklch(0.769 0.188 70.08);
  --warning-foreground: oklch(0.828 0.189 84.429);
  --border: oklch(1 0 0 / 12%);
  --input: oklch(1 0 0 / 12%);
  --ring: oklch(0.552 0.016 285.938);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
}
`;function C(e){if(!e)return e;let o=e.split("/");return o[o.length-1]||e}function ce(e){let o=e.trim();return o&&((o.startsWith("@/")||o.startsWith("~/"))&&(o=`src/${o.slice(2)}`),o.startsWith("/")&&(o=o.slice(1)),o=o.replace(/^\.\//,""),o=o.replace(/\/+$/,""),o)}function Pe(e){return e.trim().replace(/\/+$/,"")}function T(e){return e.replace(/\.(?:ts|tsx|js|jsx)$/i,"")}function Q(e){let o=T(e);return we.map(s=>`${o}${s}`)}function Se(e){let o=e.replace(/\/+$/,"");return o==="src"||o.startsWith("src/")?"src":o==="app"||o.startsWith("app/")?"app":null}function ue(e){let o=C(e);return o==="ui"?"love-ui":o}function De(e){let o=e.loveui??{},s=typeof o.target=="string"?o.target.trim():"",t=o.category;if(s){let i=typeof o.includePackageName=="boolean"?o.includePackageName:!1;return{base:s.replace(/\/+$/,""),includePackageName:i}}return t==="feature"?{base:"components",includePackageName:!0}:t==="block"?{base:"components/blocks",includePackageName:!0}:{base:"components/ui",includePackageName:!0}}function Te(e,o,s){let t=e.startsWith("src/")?e.slice(4):e;if(!o.includePackageName){let u=o.base.split("/").filter(Boolean),l=u[u.length-1];l&&t.startsWith(`${l}/`)&&(t=t.slice(l.length+1))}let a=`${(o.includePackageName?`${o.base}/${s}`:o.base).replace(/\/+/g,"/")}/${t}`.replace(/\/+/g,"/");return{cleanedPath:t,target:a}}async function Re(e){let o=r.join(e,"components.json");try{let s=await m(o,"utf8");return JSON.parse(s).aliases??null}catch{return null}}async function Fe(e){let o=["tsconfig.json","jsconfig.json"].map(s=>r.join(e,s)).find(s=>d(s));if(!o)return null;try{let s=await m(o,"utf8"),i=JSON.parse(s).compilerOptions?.paths;return!i||typeof i!="object"?null:i}catch{return null}}function Ue(e,o){if(typeof e=="string"){if(e.trim().startsWith("~/"))return"~/";if(e.trim().startsWith("@/"))return"@/"}if(o){if(Object.prototype.hasOwnProperty.call(o,"~/*"))return"~/";if(Object.prototype.hasOwnProperty.call(o,"@/*"))return"@/"}return"@/"}async function Le(e,o,s){if(o&&o.length>0)return o;let t=["src/components/ui","app/components/ui","components/ui"];for(let n of t)if(d(r.join(e,n)))return n.replace(/\/ui$/,"");let i=["src/components","app/components","components"];for(let n of i)if(d(r.join(e,n)))return n;if(s){let n=s["@/*"]??s["~/*"]??[];if(Array.isArray(n)&&n.some(a=>/^\.?\/?src\//.test(a)))return"src/components";if(Array.isArray(n)&&n.some(a=>/^\.?\/?app\//.test(a)))return"app/components"}return d(r.join(e,"src"))?"src/components":d(r.join(e,"app"))?"app/components":"components"}async function Ce(e,o,s,t){let i=t?.utils??(t?.lib?`${t.lib.replace(/\/+$/,"")}/utils`:void 0);if(i&&i.trim().length>0){let l=T(Pe(i)),g=T(ce(i));for(let p of Q(g))if(d(r.join(e,p)))return{utilsImportPath:l,utilsFilePath:p};return{utilsImportPath:l,utilsFilePath:`${g}.ts`}}let n=Se(o),a=n?`${n}/lib/utils`:"lib/utils",u=Array.from(new Set([a,"src/lib/utils","app/lib/utils","lib/utils"]));for(let l of u)for(let g of Q(l))if(d(r.join(e,g)))return{utilsImportPath:`${s}lib/utils`,utilsFilePath:g};return{utilsImportPath:`${s}lib/utils`,utilsFilePath:`${a}.ts`}}function Z(e,o,s){let t=a=>{let u=a.startsWith("/"),l=a.endsWith("/"),g=a.split("/").filter(Boolean),p=[];for(let x of g)p[p.length-1]!==x&&p.push(x);let w=p.join("/");return`${u?"/":""}${w}${l?"/":""}`},i=o.replace(/\/+$/,""),n=e.replace(/^\.?\//,"");if(le.test(n))return t(s);if(n.startsWith("components/")){let a=n.slice(10);return t(`${i}${a}`.replace(/^\//,""))}if(n.startsWith("lib/")){if(i.startsWith("src/"))return t(`src/${n}`);if(i.startsWith("app/"))return t(`app/${n}`)}if(n.startsWith("hooks/")){if(i.startsWith("src/"))return t(`src/${n}`);if(i.startsWith("app/"))return t(`app/${n}`)}return n.startsWith("ui/")?t(`${i}/${n}`):t(n)}function L(e,o){let s=o.startsWith("~/")?"~/":"@/",t=e;return t=t.replace(/@\/registry\/default\/components\//g,`${s}components/`),t=t.replace(/@\/registry\/default\/ui\//g,`${s}components/ui/`),t=t.replace(/@\/registry\/default\/hooks\//g,`${s}hooks/`),t=t.replace(/@\/registry\/default\/lib\//g,`${s}lib/`),t=t.replace(/@loveui\/ui\/ui\//g,`${s}components/ui/`),t=t.replace(/@loveui\/ui\/lib\//g,`${s}lib/`),t=t.replace(/@\/ui\//g,`${s}components/ui/`),t=t.replace(/@\/registry\/building-blocks\/default\/components\//g,`${s}components/`),t=t.replace(/@\/registry\/building-blocks\/default\/ui\//g,`${s}components/ui/`),t=t.replace(/@\/registry\/building-blocks\/default\/lib\//g,`${s}lib/`),t=t.replace(/@\/registry\/building-blocks\/default\/hooks\//g,`${s}hooks/`),t=t.replace(/@\/registry\/default\/components\//g,`${s}components/`),t=t.replace(/@\/registry\/default\/ui\//g,`${s}components/ui/`),t=t.replace(/@\/registry\/default\/lib\//g,`${s}lib/`),t=t.replace(/@\/registry\/default\/hooks\//g,`${s}hooks/`),t=t.replace(/from\s+["']@loveui\/ui\/lib\/utils["']/g,`from "${o}"`),t=t.replace(/from\s+["']@loveui\/shadcn-ui\/lib\/utils["']/g,`from "${o}"`),t=t.replace(/from\s+["']@love-ui\/shadcn-ui\/lib\/utils["']/g,`from "${o}"`),t=t.replace(/from\s+["']@\/lib\/utils["']/g,`from "${o}"`),t=t.replace(/from\s+["']~\/lib\/utils["']/g,`from "${o}"`),t=t.replace(/from\s+["'](?:\.\.\/)+ui\/src\/lib\/utils["']/g,`from "${o}"`),t}async function Be(e,o){if(d(r.join(e,o)))return!1;let s=$e,t=r.join(G,"love-ui","src","lib","utils.ts");if(d(t))try{s=await m(t,"utf8")}catch{}return await z(o,e),await R(r.join(e,o),s,"utf8"),!0}async function Ee(e){let s=["app/globals.css","app/global.css","src/app/globals.css","src/app/global.css","styles/globals.css","src/styles/globals.css","globals.css","global.css"].find(l=>d(r.join(e,l)));s||(d(r.join(e,"src","app"))?s="src/app/globals.css":d(r.join(e,"app"))?s="app/globals.css":d(r.join(e,"src"))?s="src/styles/globals.css":s="globals.css");let t=r.join(e,s),i=d(t),n=i?await m(t,"utf8"):"",a=!1;/@import\s+["']tailwindcss["']/.test(n)||(n=`@import "tailwindcss";
${n?`
${n}`:""}`,a=!0),n.includes(xe)||(n=`${n.trimEnd()}

${je}`,a=!0),(!i||a)&&(await z(s,e),await R(t,n,"utf8"));let u=await Ie(e,s);return{path:s,created:!i,updated:a,imported:u}}async function Ie(e,o){let t=["app/layout.tsx","app/layout.jsx","src/app/layout.tsx","src/app/layout.jsx"].find(l=>d(r.join(e,l)));if(!t)return!1;let i=r.join(e,t),n=await m(i,"utf8"),a=Ae(r.dirname(t),o);if(n.includes(`"${a}"`)||n.includes(`'${a}'`))return!1;let u=`import "${a}";
${n}`;return await R(i,u,"utf8"),!0}function Ae(e,o){let s=r.posix.relative(e||".",o);return s.startsWith(".")||(s=`./${s}`),s}async function z(e,o){let s=r.dirname(r.join(o,e));await F(s,{recursive:!0})}async function Oe(e,o){let s=r.join(e,"package.json"),t={};try{let l=await m(s,"utf8");t=JSON.parse(l)}catch{}let i=De(t),n=C(o),a=[];async function u(l,g){let p=await se(l,{withFileTypes:!0});for(let w of p){if(X.has(w.name))continue;let x=r.join(l,w.name);if(w.isDirectory()){await u(x,g);continue}let S=r.extname(w.name);if(!re.has(S)||w.name==="package.json")continue;let P=r.relative(g,x).split(r.sep).join("/"),{target:j}=Te(P,i,n),y=await m(x,"utf8");a.push({path:P,target:j,content:y})}}return await u(e,e),a}async function _e(e,o){let s=ae.get(e);if(!s)return null;let t=r.join(U,"default","blocks",s.sourceDir);if(!d(t))return null;try{let i=[],n=[],a=new Set;async function u(l){let g=await se(l,{withFileTypes:!0});for(let p of g){if(X.has(p.name))continue;let w=r.join(l,p.name);if(p.isDirectory()){await u(w);continue}let x=r.extname(p.name);if(!re.has(x))continue;let S=r.relative(t,w).split(r.sep).join("/"),P=await m(w,"utf8");for(let j of P.matchAll(/@\/registry\/default\/ui\/([^"']+)/g)){let y=j[1];y&&a.add(y)}n.push({path:`default/blocks/${s.sourceDir}/${S}`,target:`${s.targetBase}/${S}`,content:P})}}await u(t);for(let l of Array.from(a).sort((g,p)=>g.localeCompare(p))){let g=await J(l,o);g&&i.push(...g)}return i.push(...n),i}catch(i){return console.warn(`Warning: unable to read ${e} from bundled blocks`,i),null}}async function J(e,o){let s=r.join(U,"default","ui",`${e}.tsx`);if(d(s))try{let n=L(await m(s,"utf8"),o),a=[{path:`default/ui/${e}.tsx`,target:`components/ui/${e}.tsx`,content:n}];if(e==="toast"){let u=["toast-gooey.tsx","toast-gooey-renderer.tsx","toast-gooey-icons.tsx","toast-gooey-types.ts","toast-gooey.css"];for(let l of u){let g=r.join(U,"default","ui",l);d(g)&&a.push({path:`default/ui/${l}`,target:`components/ui/${l}`,content:await m(g,"utf8")})}}return a}catch(n){console.warn(`Warning: unable to read ${e} from bundled registry`,n)}let t=r.join(G,"love-ui"),i=r.join(t,"src","ui",`${e}.tsx`);if(!d(i))return null;try{let n=[],a=await m(i,"utf8");a=L(a,o),n.push({path:`src/ui/${e}.tsx`,target:`components/ui/${e}.tsx`,content:a});let u=r.join(t,"src","lib","utils.ts");if(d(u)){let l=await m(u,"utf8");n.push({path:"src/lib/utils.ts",target:"lib/utils.ts",content:l})}return n}catch(n){return console.warn(`Warning: unable to read ${e} component`,n),null}}async function We(e,o){if(ie.has(e))return await J(e,o);let s=r.join(U,"default","examples",`${e}.tsx`);if(d(s))try{let a=await m(s,"utf8"),u=[],l=Array.from(new Set([...a.matchAll(/@\/registry\/default\/ui\/([^"']+)/g)].map(g=>g[1]).filter(Boolean)));for(let g of l){let p=await J(g,o);p&&u.push(...p)}return u.push({path:`default/examples/${e}.tsx`,target:`components/${e}.tsx`,content:L(a,o)}),u}catch(a){return console.warn(`Warning: unable to read ${e} from bundled registry examples`,a),null}let t=await _e(e,o);if(t)return t;let i=ue(e),n=r.join(G,i);if(!d(n))return null;try{return await Oe(n,e)}catch(a){return console.warn(`Warning: unable to read bundled sources for ${e}`,a),null}}async function de(e){let o=r.join(ke,C(e));return!d(o)||!d(r.join(o,"SKILL.md"))?null:o}var M=["codex","claude","cursor","github"],ee=new Set(M);function Me(){let e=process.env.CODEX_HOME?.trim();return e||r.join(ne.homedir(),".codex")}function ze(){let e=process.env.CLAUDE_HOME?.trim();return e||r.join(ne.homedir(),".claude")}async function _(e,o){let s=await de(e);if(!s)throw new Error(`Bundled skill "${e}" was not found in this love-ui package.`);return await F(r.dirname(o),{recursive:!0}),d(o)?"exists":(await pe(s,o,{recursive:!0,force:!1,filter:t=>{let i=r.basename(t);return!X.has(i)}}),"installed")}async function te(e,o){return await F(r.dirname(e),{recursive:!0}),d(e)?"exists":(await R(e,o,"utf8"),"installed")}function Ge(e){return`---
description: Use LoveUI Skills when building, reviewing, or polishing LoveUI interfaces.
globs: "**/*.{ts,tsx,js,jsx,css,md,mdx}"
alwaysApply: false
---

Use the LoveUI skill pack in \`.cursor/loveui-skills\` for LoveUI UI work.

Start with \`.cursor/loveui-skills/SKILL.md\`, then read the matching files in \`.cursor/loveui-skills/references\` and \`.cursor/loveui-skills/skills\`.

For component installs, use \`npx love-ui add <component>\`. Do not install internal \`@loveui/*\`, \`@love-ui/*\`, or \`@repo/*\` packages directly.

Installed skill pack: ${e}
`}function He(e){return`---
applyTo: "**/*.{ts,tsx,js,jsx,css,md,mdx}"
---

# LoveUI Skills

Use the LoveUI skill pack in \`.github/loveui-skills\` when building, reviewing, or polishing LoveUI interfaces.

Start with \`.github/loveui-skills/SKILL.md\`, then read the matching files in \`.github/loveui-skills/references\` and \`.github/loveui-skills/skills\`.

For component installs, use \`npx love-ui add <component>\`. Do not install internal \`@loveui/*\`, \`@love-ui/*\`, or \`@repo/*\` packages directly.

Installed skill pack: ${e}
`}async function Ke(e,o,s){let t=C(e);if(o==="codex"){let a=r.join(Me(),"skills",t);return[{label:"Codex skill",path:a,status:await _(e,a)}]}if(o==="claude"){let a=r.join(ze(),"skills",t);return[{label:"Claude skill",path:a,status:await _(e,a)}]}if(o==="cursor"){let a=r.join(s,".cursor","loveui-skills"),u=r.join(s,".cursor","rules","loveui-skills.mdc");return[{label:"Cursor skill files",path:a,status:await _(e,a)},{label:"Cursor rule",path:u,status:await te(u,Ge(e))}]}let i=r.join(s,".github","loveui-skills"),n=r.join(s,".github","instructions","loveui-skills.instructions.md");return[{label:"GitHub skill files",path:i,status:await _(e,i)},{label:"GitHub Copilot instructions",path:n,status:await te(n,He(e))}]}function Je(e){let o=new Set;for(let s=0;s<e.length;s++){let t=e[s];if(t){if(t==="--target"||t==="--agent"||t==="-t"){let i=e[s+1];if(s++,!i)throw new Error(`Missing value for ${t}. Use one of: codex, claude, cursor, github, all.`);W(i,o);continue}if(t.startsWith("--target=")){W(t.slice(9),o);continue}if(t.startsWith("--agent=")){W(t.slice(8),o);continue}W(t,o)}}return[...o]}function W(e,o){let s=e.trim().toLowerCase();if(s==="all"){for(let t of ee)o.add(t);return}if(!ee.has(s))throw new Error(`Unknown skill target "${e}". Use one of: codex, claude, cursor, github, all.`);o.add(s)}async function Ve(){if(!process.stdin.isTTY||!process.stdout.isTTY)throw new Error("Missing skill target. Use one of: codex, claude, cursor, github, all.");let e=[...M.map((s,t)=>({label:s,number:String(t+1),targets:[s]})),{label:"all",number:String(M.length+1),targets:[...M]}];console.log(`
Which AI tool should LoveUI Skills target?
`);for(let s of e)console.log(`  ${s.number}. ${s.label}`);let o=he({input:process.stdin,output:process.stdout});try{for(;;){let s=(await o.question(`
Select a target: `)).trim().toLowerCase(),t=e.find(i=>i.number===s||i.label===s);if(t)return t.targets;console.log("Please choose codex, claude, cursor, github, all, or a number from the list.")}}finally{o.close()}}async function Xe(e,o){let s="loveui-skills",t=Je(e),i=t.length>0?t:await Ve();if(!await de(s))throw new Error("The loveui-skills pack is missing from this love-ui package. Try updating to the latest version.");console.log(`
Adding ${s} for ${i.join(", ")}...`);for(let n of i){let a=await Ke(s,n,o);for(let u of a){let l=u.status==="installed"?"Installed":"Already exists";console.log(`\u2713 ${l}: ${u.label} at ${u.path}`)}}console.log(`
\u2713 Done! Restart or reload your AI tool so it can pick up the new instructions.`)}var oe={"@base-ui-components/react":"1.0.0-beta.4","class-variance-authority":"^0.7.1",clsx:"^2.1.1","lucide-react":"^1.16.0","tailwind-merge":"^3.3.1"};async function Ye(e){if(ie.has(e)||d(r.join(U,"default","examples",`${e}.tsx`)))return{...oe};let o=ae.get(e);if(o)return{...oe,..."dependencies"in o?o.dependencies:{}};let s=ue(e),t=r.join(G,s,"package.json");try{let i=await m(t,"utf8");return JSON.parse(i).dependencies??{}}catch{return{}}}async function Ne(e){return d(r.join(e,"bun.lockb"))?"bun":d(r.join(e,"pnpm-lock.yaml"))?"pnpm":d(r.join(e,"yarn.lock"))?"yarn":"npm"}async function qe(e,o,s){let t=Object.entries(e);if(t.length===0)return!0;console.log(`
Installing dependencies...`);let i=t.map(([u,l])=>`${u}@${l}`),n;switch(o){case"bun":n=`bun add ${i.join(" ")}`;break;case"pnpm":n=`pnpm add ${i.join(" ")}`;break;case"yarn":n=`yarn add ${i.join(" ")}`;break;default:n=`npm install ${i.join(" ")}`}let a=fe(n,{stdio:"inherit",shell:!0,cwd:s});return a.error||a.status!==0?(console.warn(`
Failed to install dependencies. You may need to install them manually:`),console.warn(`  ${i.join(`
  `)}`),!1):(console.log(`Dependencies installed successfully!
`),!0)}async function Qe(e=process.argv.slice(2)){if((e.length===0||e.length===1&&(e[0]==="--version"||e[0]==="-v"))&&(console.log("love-ui version 1.1.9"),process.exit(0)),(e.length<2||e[0]!=="add")&&(console.log("Usage: npx love-ui add [...packages]"),console.log("       npx love-ui add loveui-skills [codex|claude|cursor|github|all]"),console.log("       npx love-ui add loveui-skills --agent codex"),console.log("       npx love-ui --version"),process.exit(1)),C(e[1]??"")==="loveui-skills"){await Xe(e.slice(2),process.cwd());return}let o=e.slice(1),s=process.cwd(),t=await Re(s),i=await Fe(s),n=t?.components?ce(t.components):null,a=await Le(s,n,i),u=Ue(t?.components,i),{utilsImportPath:l,utilsFilePath:g}=await Ce(s,a,u,t),p=await Ne(s),w=a.endsWith("/ui")?a:`${a}/ui`,x=!1,S=!1,P=!1,j={};for(let y of o){if(!y.trim())continue;if(console.log(`
Adding ${y}...`),x||(await F(r.join(s,a),{recursive:!0}),await F(r.join(s,w),{recursive:!0}),x=!0),!P){let c=await Ee(s);c.created?console.log(`\u2713 Created ${c.path}`):c.updated&&console.log(`\u2713 Updated ${c.path}`),c.imported&&console.log(`\u2713 Imported ${c.path} from app layout`),P=!0}S=!0;let h=null,Y=null;if(y.startsWith("http://")||y.startsWith("https://")){let c=y;c.includes("/building-blocks/r/")&&(c=c.replace("/building-blocks/r/","/building-blocks/"),console.log(`Auto-corrected URL to: ${c}`));try{let f=await fetch(c);f.ok?h=await f.json():console.warn(`Failed to fetch ${c}: HTTP ${f.status}`)}catch(f){console.warn(`Failed to fetch from ${c}:`,f)}}else{let c=new URL(`r/${y}.json`,"https://www.loveui.dev/");try{let f=await fetch(c);f.ok&&(h=await f.json())}catch{}Y=await We(y,l)}let D=Y??h?.files??[];D=D.map(c=>{let f=c.target||c.path;return f.startsWith("registry/default/")&&(f=f.replace("registry/default/","")),{...c,target:f}});let B=D.find(c=>c.target.match(/^components\/comp-\d+\.tsx$/));if(B){let c=D.filter(f=>f.target.match(/^components\/[^/]+\//)&&f.target!==B.target);if(c.length>0&&c[0]){let f=c[0].target.match(/^components\/([^/]+)\//);if(f&&f[1]){let b=f[1];B.target=`components/${b}-demo.tsx`}}else if(h?.meta?.tags&&Array.isArray(h.meta.tags)&&h.meta.tags.length>0){let b=h.meta.tags.slice(0,2).filter(v=>v.length>0);if(b.length>0){let v=b.join("-").toLowerCase().replace(/\s+/g,"-");B.target=`components/${v}.tsx`}}}if(!D.length){console.warn(`Component "${y}" not found. Available components can be found at https://loveui.dev`);continue}D.some(c=>le.test(c.target)||typeof c.content=="string"&&ve.test(c.content))&&await Be(s,g);let E=0,I=0;for(let c of D){if(!c.content)continue;let f=Z(c.target,a,g),b=r.join(s,f),v=d(b);if(T(f)===T(g)&&v)continue;let O=L(c.content,l);if(v)try{if(await m(b,"utf8")===O)continue}catch{}await z(f,s),await R(b,O,"utf8"),v?I++:E++}if(E>0&&console.log(`\u2713 Created ${E} file${E>1?"s":""}`),I>0&&console.log(`\u2713 Updated ${I} file${I>1?"s":""}`),h?.registryDependencies&&h.registryDependencies.length>0){console.log(`
Installing ${h.registryDependencies.length} required component${h.registryDependencies.length>1?"s":""}...`);for(let c of h.registryDependencies){let f=c;c.startsWith("https://loveui.dev/building-blocks/r/")&&(f=`https://ui.loveui.dev/ui/r/${c.split("/").pop()}`);try{let b=await fetch(f);if(b.ok){let v=await b.json(),O=(v?.files??[]).map(k=>{let $=k.target||k.path;return $.startsWith("registry/default/")&&($=$.replace("registry/default/","")),{...k,target:$}});for(let k of O){if(!k.content)continue;let $=Z(k.target,a,g),K=r.join(s,$),N=d(K);if(T($)===T(g)&&N)continue;let q=L(k.content,l);if(N)try{if(await m(K,"utf8")===q)continue}catch{}await z($,s),await R(K,q,"utf8")}let H=["@loveui/shadcn-ui","jotai","lucide-react","react","react-dom"];if(v?.dependencies)if(Array.isArray(v.dependencies))v.dependencies.forEach(k=>{H.includes(k)||(j[k]="latest")});else{let k=v.dependencies;Object.keys(k).forEach($=>{!H.includes($)&&k[$]&&(j[$]=k[$])})}}else console.warn(`  \u2717 Failed to fetch ${f}: HTTP ${b.status}`)}catch(b){console.warn(`  \u2717 Failed to install ${f}:`,b.message)}}console.log("\u2713 Installed registry dependencies")}let A={};h?.dependencies?Array.isArray(h.dependencies)?h.dependencies.forEach(c=>{A[c]="latest"}):A=h.dependencies:A=await Ye(y),Object.assign(j,A)}Object.keys(j).length>0&&await qe(j,p,s),console.log(S?`
\u2713 Done! You can now import and use the components in your app.`:`
\u2713 Done! Skill installation complete.`)}var Ze=process.argv[1]&&(import.meta.url===me(process.argv[1]).href||process.argv[1].includes("love-ui")||process.argv[1].includes("loveui"));Ze&&Qe().catch(e=>{console.error(e),process.exit(1)});export{Qe as run};
