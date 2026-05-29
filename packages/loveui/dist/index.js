#!/usr/bin/env node
import{spawnSync as gt}from"child_process";import{existsSync as d}from"fs";import{cp as ft,mkdir as D,readdir as nt,readFile as m,writeFile as F}from"fs/promises";import st from"os";import o from"path";import{createInterface as pt}from"readline/promises";import{pathToFileURL as ht,fileURLToPath as mt}from"url";var yt=o.dirname(mt(import.meta.url)),V=o.resolve(yt,".."),G=o.join(V,"packages"),U=o.join(V,"registry"),bt=o.join(V,"skills"),rt=new Set([".ts",".tsx",".cts",".mts",".js",".jsx",".css",".scss",".sass",".mdx",".md"]),X=new Set(["node_modules","dist",".turbo",".next","build",".cache"]),ot=new Set(["accordion","alert","alert-dialog","autocomplete","avatar","badge","breadcrumb","button","card","checkbox","checkbox-group","collapsible","combobox","command","dialog","empty","field","fieldset","form","frame","group","input","input-group","label","menu","meter","number-field","pagination","popover","preview-card","progress","radio-group","scroll-area","select","separator","sheet","skeleton","slider","switch","table","tabs","textarea","toast","toggle","toggle-group","toolbar","tooltip"]),it=new Map([["auth-one",{sourceDir:"auth1",targetBase:"components/blocks/auth/one"}],["auth-two",{sourceDir:"auth2",targetBase:"components/blocks/auth/two"}],["auth-three",{sourceDir:"auth3",targetBase:"components/blocks/auth/three"}]]),kt=[".ts",".tsx",".js",".jsx"],lt=/(^|\/)lib\/utils(?:\.[a-z]+)?$/i,wt=/@loveui\/ui\/lib\/utils|@loveui\/shadcn-ui\/lib\/utils|@love-ui\/shadcn-ui\/lib\/utils|@\/lib\/utils|~\/lib\/utils|(?:\.\.\/)+ui\/src\/lib\/utils/,vt=`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,$t="love-ui globals",xt=`/* love-ui globals */
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
`;function C(t){if(!t)return t;let s=t.split("/");return s[s.length-1]||t}function at(t){let s=t.trim();return s&&((s.startsWith("@/")||s.startsWith("~/"))&&(s=`src/${s.slice(2)}`),s.startsWith("/")&&(s=s.slice(1)),s=s.replace(/^\.\//,""),s=s.replace(/\/+$/,""),s)}function jt(t){return t.trim().replace(/\/+$/,"")}function R(t){return t.replace(/\.(?:ts|tsx|js|jsx)$/i,"")}function Q(t){let s=R(t);return kt.map(n=>`${s}${n}`)}function Pt(t){let s=t.replace(/\/+$/,"");return s==="src"||s.startsWith("src/")?"src":s==="app"||s.startsWith("app/")?"app":null}function ct(t){let s=C(t);return s==="ui"?"love-ui":s}function St(t){let s=t.loveui??{},n=typeof s.target=="string"?s.target.trim():"",e=s.category;if(n){let l=typeof s.includePackageName=="boolean"?s.includePackageName:!1;return{base:n.replace(/\/+$/,""),includePackageName:l}}return e==="feature"?{base:"components",includePackageName:!0}:e==="block"?{base:"components/blocks",includePackageName:!0}:{base:"components/ui",includePackageName:!0}}function Tt(t,s,n){let e=t.startsWith("src/")?t.slice(4):t;if(!s.includePackageName){let u=s.base.split("/").filter(Boolean),a=u[u.length-1];a&&e.startsWith(`${a}/`)&&(e=e.slice(a.length+1))}let i=`${(s.includePackageName?`${s.base}/${n}`:s.base).replace(/\/+/g,"/")}/${e}`.replace(/\/+/g,"/");return{cleanedPath:e,target:i}}async function Rt(t){let s=o.join(t,"components.json");try{let n=await m(s,"utf8");return JSON.parse(n).aliases??null}catch{return null}}async function Ft(t){let s=["tsconfig.json","jsconfig.json"].map(n=>o.join(t,n)).find(n=>d(n));if(!s)return null;try{let n=await m(s,"utf8"),l=JSON.parse(n).compilerOptions?.paths;return!l||typeof l!="object"?null:l}catch{return null}}function Dt(t,s){if(typeof t=="string"){if(t.trim().startsWith("~/"))return"~/";if(t.trim().startsWith("@/"))return"@/"}if(s){if(Object.prototype.hasOwnProperty.call(s,"~/*"))return"~/";if(Object.prototype.hasOwnProperty.call(s,"@/*"))return"@/"}return"@/"}async function Ut(t,s,n){if(s&&s.length>0)return s;let e=["src/components/ui","app/components/ui","components/ui"];for(let r of e)if(d(o.join(t,r)))return r.replace(/\/ui$/,"");let l=["src/components","app/components","components"];for(let r of l)if(d(o.join(t,r)))return r;if(n){let r=n["@/*"]??n["~/*"]??[];if(Array.isArray(r)&&r.some(i=>/^\.?\/?src\//.test(i)))return"src/components";if(Array.isArray(r)&&r.some(i=>/^\.?\/?app\//.test(i)))return"app/components"}return d(o.join(t,"src"))?"src/components":d(o.join(t,"app"))?"app/components":"components"}async function Lt(t,s,n,e){let l=e?.utils??(e?.lib?`${e.lib.replace(/\/+$/,"")}/utils`:void 0);if(l&&l.trim().length>0){let a=R(jt(l)),g=R(at(l));for(let p of Q(g))if(d(o.join(t,p)))return{utilsImportPath:a,utilsFilePath:p};return{utilsImportPath:a,utilsFilePath:`${g}.ts`}}let r=Pt(s),i=r?`${r}/lib/utils`:"lib/utils",u=Array.from(new Set([i,"src/lib/utils","app/lib/utils","lib/utils"]));for(let a of u)for(let g of Q(a))if(d(o.join(t,g)))return{utilsImportPath:`${n}lib/utils`,utilsFilePath:g};return{utilsImportPath:`${n}lib/utils`,utilsFilePath:`${i}.ts`}}function Z(t,s,n){let e=i=>{let u=i.startsWith("/"),a=i.endsWith("/"),g=i.split("/").filter(Boolean),p=[];for(let x of g)p[p.length-1]!==x&&p.push(x);let w=p.join("/");return`${u?"/":""}${w}${a?"/":""}`},l=s.replace(/\/+$/,""),r=t.replace(/^\.?\//,"");if(lt.test(r))return e(n);if(r.startsWith("components/")){let i=r.slice(10);return e(`${l}${i}`.replace(/^\//,""))}if(r.startsWith("lib/")){if(l.startsWith("src/"))return e(`src/${r}`);if(l.startsWith("app/"))return e(`app/${r}`)}if(r.startsWith("hooks/")){if(l.startsWith("src/"))return e(`src/${r}`);if(l.startsWith("app/"))return e(`app/${r}`)}return r.startsWith("ui/")?e(`${l}/${r}`):e(r)}function L(t,s){let n=s.startsWith("~/")?"~/":"@/",e=t;return e=e.replace(/@\/registry\/default\/components\//g,`${n}components/`),e=e.replace(/@\/registry\/default\/ui\//g,`${n}components/ui/`),e=e.replace(/@\/registry\/default\/hooks\//g,`${n}hooks/`),e=e.replace(/@\/registry\/default\/lib\//g,`${n}lib/`),e=e.replace(/@loveui\/ui\/ui\//g,`${n}components/ui/`),e=e.replace(/@loveui\/ui\/lib\//g,`${n}lib/`),e=e.replace(/@\/ui\//g,`${n}components/ui/`),e=e.replace(/@\/registry\/building-blocks\/default\/components\//g,`${n}components/`),e=e.replace(/@\/registry\/building-blocks\/default\/ui\//g,`${n}components/ui/`),e=e.replace(/@\/registry\/building-blocks\/default\/lib\//g,`${n}lib/`),e=e.replace(/@\/registry\/building-blocks\/default\/hooks\//g,`${n}hooks/`),e=e.replace(/@\/registry\/default\/components\//g,`${n}components/`),e=e.replace(/@\/registry\/default\/ui\//g,`${n}components/ui/`),e=e.replace(/@\/registry\/default\/lib\//g,`${n}lib/`),e=e.replace(/@\/registry\/default\/hooks\//g,`${n}hooks/`),e=e.replace(/from\s+["']@loveui\/ui\/lib\/utils["']/g,`from "${s}"`),e=e.replace(/from\s+["']@loveui\/shadcn-ui\/lib\/utils["']/g,`from "${s}"`),e=e.replace(/from\s+["']@love-ui\/shadcn-ui\/lib\/utils["']/g,`from "${s}"`),e=e.replace(/from\s+["']@\/lib\/utils["']/g,`from "${s}"`),e=e.replace(/from\s+["']~\/lib\/utils["']/g,`from "${s}"`),e=e.replace(/from\s+["'](?:\.\.\/)+ui\/src\/lib\/utils["']/g,`from "${s}"`),e}async function Ct(t,s){if(d(o.join(t,s)))return!1;let n=vt,e=o.join(G,"love-ui","src","lib","utils.ts");if(d(e))try{n=await m(e,"utf8")}catch{}return await z(s,t),await F(o.join(t,s),n,"utf8"),!0}async function Et(t){let n=["app/globals.css","app/global.css","src/app/globals.css","src/app/global.css","styles/globals.css","src/styles/globals.css","globals.css","global.css"].find(a=>d(o.join(t,a)));n||(d(o.join(t,"src","app"))?n="src/app/globals.css":d(o.join(t,"app"))?n="app/globals.css":d(o.join(t,"src"))?n="src/styles/globals.css":n="globals.css");let e=o.join(t,n),l=d(e),r=l?await m(e,"utf8"):"",i=!1;/@import\s+["']tailwindcss["']/.test(r)||(r=`@import "tailwindcss";
${r?`
${r}`:""}`,i=!0),r.includes($t)||(r=`${r.trimEnd()}

${xt}`,i=!0),(!l||i)&&(await z(n,t),await F(e,r,"utf8"));let u=await It(t,n);return{path:n,created:!l,updated:i,imported:u}}async function It(t,s){let e=["app/layout.tsx","app/layout.jsx","src/app/layout.tsx","src/app/layout.jsx"].find(a=>d(o.join(t,a)));if(!e)return!1;let l=o.join(t,e),r=await m(l,"utf8"),i=At(o.dirname(e),s);if(r.includes(`"${i}"`)||r.includes(`'${i}'`))return!1;let u=`import "${i}";
${r}`;return await F(l,u,"utf8"),!0}function At(t,s){let n=o.posix.relative(t||".",s);return n.startsWith(".")||(n=`./${n}`),n}async function z(t,s){let n=o.dirname(o.join(s,t));await D(n,{recursive:!0})}async function Ot(t,s){let n=o.join(t,"package.json"),e={};try{let a=await m(n,"utf8");e=JSON.parse(a)}catch{}let l=St(e),r=C(s),i=[];async function u(a,g){let p=await nt(a,{withFileTypes:!0});for(let w of p){if(X.has(w.name))continue;let x=o.join(a,w.name);if(w.isDirectory()){await u(x,g);continue}let S=o.extname(w.name);if(!rt.has(S)||w.name==="package.json")continue;let P=o.relative(g,x).split(o.sep).join("/"),{target:j}=Tt(P,l,r),b=await m(x,"utf8");i.push({path:P,target:j,content:b})}}return await u(t,t),i}async function _t(t,s){let n=it.get(t);if(!n)return null;let e=o.join(U,"default","blocks",n.sourceDir);if(!d(e))return null;try{let l=[],r=[],i=new Set;async function u(a){let g=await nt(a,{withFileTypes:!0});for(let p of g){if(X.has(p.name))continue;let w=o.join(a,p.name);if(p.isDirectory()){await u(w);continue}let x=o.extname(p.name);if(!rt.has(x))continue;let S=o.relative(e,w).split(o.sep).join("/"),P=await m(w,"utf8");for(let j of P.matchAll(/@\/registry\/default\/ui\/([^"']+)/g)){let b=j[1];b&&i.add(b)}r.push({path:`default/blocks/${n.sourceDir}/${S}`,target:`${n.targetBase}/${S}`,content:P})}}await u(e);for(let a of Array.from(i).sort((g,p)=>g.localeCompare(p))){let g=await J(a,s);g&&l.push(...g)}return l.push(...r),l}catch(l){return console.warn(`Warning: unable to read ${t} from bundled blocks`,l),null}}async function J(t,s){let n=o.join(U,"default","ui",`${t}.tsx`);if(d(n))try{let r=L(await m(n,"utf8"),s),i=[{path:`default/ui/${t}.tsx`,target:`components/ui/${t}.tsx`,content:r}];if(t==="toast"){let u=["toast-gooey.tsx","toast-gooey-renderer.tsx","toast-gooey-icons.tsx","toast-gooey-types.ts","toast-gooey.css"];for(let a of u){let g=o.join(U,"default","ui",a);d(g)&&i.push({path:`default/ui/${a}`,target:`components/ui/${a}`,content:await m(g,"utf8")})}}return i}catch(r){console.warn(`Warning: unable to read ${t} from bundled registry`,r)}let e=o.join(G,"love-ui"),l=o.join(e,"src","ui",`${t}.tsx`);if(!d(l))return null;try{let r=[],i=await m(l,"utf8");i=L(i,s),r.push({path:`src/ui/${t}.tsx`,target:`components/ui/${t}.tsx`,content:i});let u=o.join(e,"src","lib","utils.ts");if(d(u)){let a=await m(u,"utf8");r.push({path:"src/lib/utils.ts",target:"lib/utils.ts",content:a})}return r}catch(r){return console.warn(`Warning: unable to read ${t} component`,r),null}}async function Wt(t,s){if(ot.has(t))return await J(t,s);let n=o.join(U,"default","examples",`${t}.tsx`);if(d(n))try{let i=await m(n,"utf8"),u=[],a=Array.from(new Set([...i.matchAll(/@\/registry\/default\/ui\/([^"']+)/g)].map(g=>g[1]).filter(Boolean)));for(let g of a){let p=await J(g,s);p&&u.push(...p)}return u.push({path:`default/examples/${t}.tsx`,target:`components/${t}.tsx`,content:L(i,s)}),u}catch(i){return console.warn(`Warning: unable to read ${t} from bundled registry examples`,i),null}let e=await _t(t,s);if(e)return e;let l=ct(t),r=o.join(G,l);if(!d(r))return null;try{return await Ot(r,t)}catch(i){return console.warn(`Warning: unable to read bundled sources for ${t}`,i),null}}async function ut(t){let s=o.join(bt,C(t));return!d(s)||!d(o.join(s,"SKILL.md"))?null:s}var M=["codex","claude","cursor","github"],tt=new Set(M);function Bt(){let t=process.env.CODEX_HOME?.trim();return t||o.join(st.homedir(),".codex")}function Mt(){let t=process.env.CLAUDE_HOME?.trim();return t||o.join(st.homedir(),".claude")}async function W(t,s){let n=await ut(t);if(!n)throw new Error(`Bundled skill "${t}" was not found in this love-ui package.`);return await D(o.dirname(s),{recursive:!0}),d(s)?"exists":(await ft(n,s,{recursive:!0,force:!1,filter:e=>{let l=o.basename(e);return!X.has(l)}}),"installed")}async function et(t,s){return await D(o.dirname(t),{recursive:!0}),d(t)?"exists":(await F(t,s,"utf8"),"installed")}function zt(t){return`---
description: Use LoveUI Skills when building, reviewing, or polishing LoveUI interfaces.
globs: "**/*.{ts,tsx,js,jsx,css,md,mdx}"
alwaysApply: false
---

Use the LoveUI skill pack in \`.cursor/loveui-skills\` for LoveUI UI work.

Start with \`.cursor/loveui-skills/SKILL.md\`, then read the matching files in \`.cursor/loveui-skills/references\` and \`.cursor/loveui-skills/skills\`.

For component installs, use \`npx love-ui add <component>\`. Do not install internal \`@loveui/*\`, \`@love-ui/*\`, or \`@repo/*\` packages directly.

Installed skill pack: ${t}
`}function Gt(t){return`---
applyTo: "**/*.{ts,tsx,js,jsx,css,md,mdx}"
---

# LoveUI Skills

Use the LoveUI skill pack in \`.github/loveui-skills\` when building, reviewing, or polishing LoveUI interfaces.

Start with \`.github/loveui-skills/SKILL.md\`, then read the matching files in \`.github/loveui-skills/references\` and \`.github/loveui-skills/skills\`.

For component installs, use \`npx love-ui add <component>\`. Do not install internal \`@loveui/*\`, \`@love-ui/*\`, or \`@repo/*\` packages directly.

Installed skill pack: ${t}
`}async function Ht(t,s,n){let e=C(t);if(s==="codex"){let i=o.join(Bt(),"skills",e);return[{label:"Codex skill",path:i,status:await W(t,i)}]}if(s==="claude"){let i=o.join(Mt(),"skills",e);return[{label:"Claude skill",path:i,status:await W(t,i)}]}if(s==="cursor"){let i=o.join(n,".cursor","loveui-skills"),u=o.join(n,".cursor","rules","loveui-skills.mdc");return[{label:"Cursor skill files",path:i,status:await W(t,i)},{label:"Cursor rule",path:u,status:await et(u,zt(t))}]}let l=o.join(n,".github","loveui-skills"),r=o.join(n,".github","instructions","loveui-skills.instructions.md");return[{label:"GitHub skill files",path:l,status:await W(t,l)},{label:"GitHub Copilot instructions",path:r,status:await et(r,Gt(t))}]}function Kt(t){let s=new Set;for(let n=0;n<t.length;n++){let e=t[n];if(e){if(e==="--target"||e==="--agent"||e==="-t"){let l=t[n+1];if(n++,!l)throw new Error(`Missing value for ${e}. Use one of: codex, claude, cursor, github, all.`);B(l,s);continue}if(e.startsWith("--target=")){B(e.slice(9),s);continue}if(e.startsWith("--agent=")){B(e.slice(8),s);continue}B(e,s)}}return[...s]}function B(t,s){let n=t.trim().toLowerCase();if(n==="all"){for(let e of tt)s.add(e);return}if(!tt.has(n))throw new Error(`Unknown skill target "${t}". Use one of: codex, claude, cursor, github, all.`);s.add(n)}async function Jt(){if(!process.stdin.isTTY||!process.stdout.isTTY)throw new Error("Missing skill target. Use one of: codex, claude, cursor, github, all.");let t=[...M.map((n,e)=>({label:n,number:String(e+1),targets:[n]})),{label:"all",number:String(M.length+1),targets:[...M]}];console.log(`
Which AI tool should LoveUI Skills target?
`);for(let n of t)console.log(`  ${n.number}. ${n.label}`);let s=pt({input:process.stdin,output:process.stdout});try{for(;;){let n=(await s.question(`
Select a target: `)).trim().toLowerCase(),e=t.find(l=>l.number===n||l.label===n);if(e)return e.targets;console.log("Please choose codex, claude, cursor, github, all, or a number from the list.")}}finally{s.close()}}async function Vt(t,s){let n="loveui-skills",e=Kt(t),l=e.length>0?e:await Jt();if(!await ut(n))throw new Error("The loveui-skills pack is missing from this love-ui package. Try updating to the latest version.");console.log(`
Adding ${n} for ${l.join(", ")}...`);for(let r of l){let i=await Ht(n,r,s);for(let u of i){let a=u.status==="installed"?"Installed":"Already exists";console.log(`\u2713 ${a}: ${u.label} at ${u.path}`)}}console.log(`
\u2713 Done! Restart or reload your AI tool so it can pick up the new instructions.`)}var Xt={"@base-ui-components/react":"1.0.0-beta.4","class-variance-authority":"^0.7.1",clsx:"^2.1.1","lucide-react":"^1.16.0","tailwind-merge":"^3.3.1"};async function Yt(t){if(ot.has(t)||d(o.join(U,"default","examples",`${t}.tsx`))||it.has(t))return{...Xt};let s=ct(t),n=o.join(G,s,"package.json");try{let e=await m(n,"utf8");return JSON.parse(e).dependencies??{}}catch{return{}}}async function Nt(t){return d(o.join(t,"bun.lockb"))?"bun":d(o.join(t,"pnpm-lock.yaml"))?"pnpm":d(o.join(t,"yarn.lock"))?"yarn":"npm"}async function qt(t,s,n){let e=Object.entries(t);if(e.length===0)return!0;console.log(`
Installing dependencies...`);let l=e.map(([u,a])=>`${u}@${a}`),r;switch(s){case"bun":r=`bun add ${l.join(" ")}`;break;case"pnpm":r=`pnpm add ${l.join(" ")}`;break;case"yarn":r=`yarn add ${l.join(" ")}`;break;default:r=`npm install ${l.join(" ")}`}let i=gt(r,{stdio:"inherit",shell:!0,cwd:n});return i.error||i.status!==0?(console.warn(`
Failed to install dependencies. You may need to install them manually:`),console.warn(`  ${l.join(`
  `)}`),!1):(console.log(`Dependencies installed successfully!
`),!0)}async function Qt(t=process.argv.slice(2)){if((t.length===0||t.length===1&&(t[0]==="--version"||t[0]==="-v"))&&(console.log("love-ui version 1.1.9"),process.exit(0)),(t.length<2||t[0]!=="add")&&(console.log("Usage: npx love-ui add [...packages]"),console.log("       npx love-ui add loveui-skills [codex|claude|cursor|github|all]"),console.log("       npx love-ui add loveui-skills --agent codex"),console.log("       npx love-ui --version"),process.exit(1)),C(t[1]??"")==="loveui-skills"){await Vt(t.slice(2),process.cwd());return}let s=t.slice(1),n=process.cwd(),e=await Rt(n),l=await Ft(n),r=e?.components?at(e.components):null,i=await Ut(n,r,l),u=Dt(e?.components,l),{utilsImportPath:a,utilsFilePath:g}=await Lt(n,i,u,e),p=await Nt(n),w=i.endsWith("/ui")?i:`${i}/ui`,x=!1,S=!1,P=!1,j={};for(let b of s){if(!b.trim())continue;if(console.log(`
Adding ${b}...`),x||(await D(o.join(n,i),{recursive:!0}),await D(o.join(n,w),{recursive:!0}),x=!0),!P){let c=await Et(n);c.created?console.log(`\u2713 Created ${c.path}`):c.updated&&console.log(`\u2713 Updated ${c.path}`),c.imported&&console.log(`\u2713 Imported ${c.path} from app layout`),P=!0}S=!0;let h=null,Y=null;if(b.startsWith("http://")||b.startsWith("https://")){let c=b;c.includes("/building-blocks/r/")&&(c=c.replace("/building-blocks/r/","/building-blocks/"),console.log(`Auto-corrected URL to: ${c}`));try{let f=await fetch(c);f.ok?h=await f.json():console.warn(`Failed to fetch ${c}: HTTP ${f.status}`)}catch(f){console.warn(`Failed to fetch from ${c}:`,f)}}else{let c=new URL(`r/${b}.json`,"https://www.loveui.dev/");try{let f=await fetch(c);f.ok&&(h=await f.json())}catch{}Y=await Wt(b,a)}let T=Y??h?.files??[];T=T.map(c=>{let f=c.target||c.path;return f.startsWith("registry/default/")&&(f=f.replace("registry/default/","")),{...c,target:f}});let E=T.find(c=>c.target.match(/^components\/comp-\d+\.tsx$/));if(E){let c=T.filter(f=>f.target.match(/^components\/[^/]+\//)&&f.target!==E.target);if(c.length>0&&c[0]){let f=c[0].target.match(/^components\/([^/]+)\//);if(f&&f[1]){let y=f[1];E.target=`components/${y}-demo.tsx`}}else if(h?.meta?.tags&&Array.isArray(h.meta.tags)&&h.meta.tags.length>0){let y=h.meta.tags.slice(0,2).filter(v=>v.length>0);if(y.length>0){let v=y.join("-").toLowerCase().replace(/\s+/g,"-");E.target=`components/${v}.tsx`}}}if(!T.length){console.warn(`Component "${b}" not found. Available components can be found at https://loveui.dev`);continue}T.some(c=>lt.test(c.target)||typeof c.content=="string"&&wt.test(c.content))&&await Ct(n,g);let I=0,A=0;for(let c of T){if(!c.content)continue;let f=Z(c.target,i,g),y=o.join(n,f),v=d(y);if(R(f)===R(g)&&v)continue;let _=L(c.content,a);if(v)try{if(await m(y,"utf8")===_)continue}catch{}await z(f,n),await F(y,_,"utf8"),v?A++:I++}if(I>0&&console.log(`\u2713 Created ${I} file${I>1?"s":""}`),A>0&&console.log(`\u2713 Updated ${A} file${A>1?"s":""}`),h?.registryDependencies&&h.registryDependencies.length>0){console.log(`
Installing ${h.registryDependencies.length} required component${h.registryDependencies.length>1?"s":""}...`);for(let c of h.registryDependencies){let f=c;c.startsWith("https://loveui.dev/building-blocks/r/")&&(f=`https://ui.loveui.dev/ui/r/${c.split("/").pop()}`);try{let y=await fetch(f);if(y.ok){let v=await y.json(),_=(v?.files??[]).map(k=>{let $=k.target||k.path;return $.startsWith("registry/default/")&&($=$.replace("registry/default/","")),{...k,target:$}});for(let k of _){if(!k.content)continue;let $=Z(k.target,i,g),K=o.join(n,$),N=d(K);if(R($)===R(g)&&N)continue;let q=L(k.content,a);if(N)try{if(await m(K,"utf8")===q)continue}catch{}await z($,n),await F(K,q,"utf8")}let H=["@loveui/shadcn-ui","jotai","lucide-react","react","react-dom"];if(v?.dependencies)if(Array.isArray(v.dependencies))v.dependencies.forEach(k=>{H.includes(k)||(j[k]="latest")});else{let k=v.dependencies;Object.keys(k).forEach($=>{!H.includes($)&&k[$]&&(j[$]=k[$])})}}else console.warn(`  \u2717 Failed to fetch ${f}: HTTP ${y.status}`)}catch(y){console.warn(`  \u2717 Failed to install ${f}:`,y.message)}}console.log("\u2713 Installed registry dependencies")}let O={};h?.dependencies?Array.isArray(h.dependencies)?h.dependencies.forEach(c=>{O[c]="latest"}):O=h.dependencies:O=await Yt(b),Object.assign(j,O)}Object.keys(j).length>0&&await qt(j,p,n),console.log(S?`
\u2713 Done! You can now import and use the components in your app.`:`
\u2713 Done! Skill installation complete.`)}var Zt=process.argv[1]&&(import.meta.url===ht(process.argv[1]).href||process.argv[1].includes("love-ui")||process.argv[1].includes("loveui"));Zt&&Qt().catch(t=>{console.error(t),process.exit(1)});export{Qt as run};
