#!/usr/bin/env node
import{spawnSync as ft}from"child_process";import{existsSync as d}from"fs";import{cp as pt,mkdir as D,readdir as st,readFile as m,writeFile as F}from"fs/promises";import rt from"os";import o from"path";import{createInterface as ht}from"readline/promises";import{pathToFileURL as mt,fileURLToPath as yt}from"url";var bt=o.dirname(yt(import.meta.url)),V=o.resolve(bt,".."),G=o.join(V,"packages"),U=o.join(V,"registry"),kt=o.join(V,"skills"),ot=new Set([".ts",".tsx",".cts",".mts",".js",".jsx",".css",".scss",".sass",".mdx",".md"]),X=new Set(["node_modules","dist",".turbo",".next","build",".cache"]),it=new Set(["accordion","alert","alert-dialog","autocomplete","avatar","badge","breadcrumb","button","card","checkbox","checkbox-group","collapsible","combobox","command","dialog","empty","field","fieldset","form","frame","group","input","input-group","label","menu","meter","number-field","pagination","popover","preview-card","progress","radio-group","scroll-area","select","separator","sheet","skeleton","slider","switch","table","tabs","textarea","toast","toggle","toggle-group","toolbar","tooltip"]),lt=new Map([["auth-one",{sourceDir:"auth1",targetBase:"components/blocks/auth/one"}],["auth-two",{sourceDir:"auth2",targetBase:"components/blocks/auth/two"}],["auth-three",{sourceDir:"auth3",targetBase:"components/blocks/auth/three"}],["header-one",{sourceDir:"header1",targetBase:"components/blocks/header/one"}],["header-two",{sourceDir:"header2",targetBase:"components/blocks/header/two"}],["header-three",{sourceDir:"header3",targetBase:"components/blocks/header/three",dependencies:{"@base-ui/react":"^1.5.0"}}]]),wt=[".ts",".tsx",".js",".jsx"],at=/(^|\/)lib\/utils(?:\.[a-z]+)?$/i,vt=/@loveui\/ui\/lib\/utils|@loveui\/shadcn-ui\/lib\/utils|@love-ui\/shadcn-ui\/lib\/utils|@\/lib\/utils|~\/lib\/utils|(?:\.\.\/)+ui\/src\/lib\/utils/,$t=`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,xt="love-ui globals",jt=`/* love-ui globals */
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
`;function C(t){if(!t)return t;let n=t.split("/");return n[n.length-1]||t}function ct(t){let n=t.trim();return n&&((n.startsWith("@/")||n.startsWith("~/"))&&(n=`src/${n.slice(2)}`),n.startsWith("/")&&(n=n.slice(1)),n=n.replace(/^\.\//,""),n=n.replace(/\/+$/,""),n)}function Pt(t){return t.trim().replace(/\/+$/,"")}function R(t){return t.replace(/\.(?:ts|tsx|js|jsx)$/i,"")}function Q(t){let n=R(t);return wt.map(s=>`${n}${s}`)}function St(t){let n=t.replace(/\/+$/,"");return n==="src"||n.startsWith("src/")?"src":n==="app"||n.startsWith("app/")?"app":null}function ut(t){let n=C(t);return n==="ui"?"love-ui":n}function Tt(t){let n=t.loveui??{},s=typeof n.target=="string"?n.target.trim():"",e=n.category;if(s){let i=typeof n.includePackageName=="boolean"?n.includePackageName:!1;return{base:s.replace(/\/+$/,""),includePackageName:i}}return e==="feature"?{base:"components",includePackageName:!0}:e==="block"?{base:"components/blocks",includePackageName:!0}:{base:"components/ui",includePackageName:!0}}function Rt(t,n,s){let e=t.startsWith("src/")?t.slice(4):t;if(!n.includePackageName){let u=n.base.split("/").filter(Boolean),a=u[u.length-1];a&&e.startsWith(`${a}/`)&&(e=e.slice(a.length+1))}let l=`${(n.includePackageName?`${n.base}/${s}`:n.base).replace(/\/+/g,"/")}/${e}`.replace(/\/+/g,"/");return{cleanedPath:e,target:l}}async function Ft(t){let n=o.join(t,"components.json");try{let s=await m(n,"utf8");return JSON.parse(s).aliases??null}catch{return null}}async function Dt(t){let n=["tsconfig.json","jsconfig.json"].map(s=>o.join(t,s)).find(s=>d(s));if(!n)return null;try{let s=await m(n,"utf8"),i=JSON.parse(s).compilerOptions?.paths;return!i||typeof i!="object"?null:i}catch{return null}}function Ut(t,n){if(typeof t=="string"){if(t.trim().startsWith("~/"))return"~/";if(t.trim().startsWith("@/"))return"@/"}if(n){if(Object.prototype.hasOwnProperty.call(n,"~/*"))return"~/";if(Object.prototype.hasOwnProperty.call(n,"@/*"))return"@/"}return"@/"}async function Lt(t,n,s){if(n&&n.length>0)return n;let e=["src/components/ui","app/components/ui","components/ui"];for(let r of e)if(d(o.join(t,r)))return r.replace(/\/ui$/,"");let i=["src/components","app/components","components"];for(let r of i)if(d(o.join(t,r)))return r;if(s){let r=s["@/*"]??s["~/*"]??[];if(Array.isArray(r)&&r.some(l=>/^\.?\/?src\//.test(l)))return"src/components";if(Array.isArray(r)&&r.some(l=>/^\.?\/?app\//.test(l)))return"app/components"}return d(o.join(t,"src"))?"src/components":d(o.join(t,"app"))?"app/components":"components"}async function Ct(t,n,s,e){let i=e?.utils??(e?.lib?`${e.lib.replace(/\/+$/,"")}/utils`:void 0);if(i&&i.trim().length>0){let a=R(Pt(i)),g=R(ct(i));for(let p of Q(g))if(d(o.join(t,p)))return{utilsImportPath:a,utilsFilePath:p};return{utilsImportPath:a,utilsFilePath:`${g}.ts`}}let r=St(n),l=r?`${r}/lib/utils`:"lib/utils",u=Array.from(new Set([l,"src/lib/utils","app/lib/utils","lib/utils"]));for(let a of u)for(let g of Q(a))if(d(o.join(t,g)))return{utilsImportPath:`${s}lib/utils`,utilsFilePath:g};return{utilsImportPath:`${s}lib/utils`,utilsFilePath:`${l}.ts`}}function Z(t,n,s){let e=l=>{let u=l.startsWith("/"),a=l.endsWith("/"),g=l.split("/").filter(Boolean),p=[];for(let x of g)p[p.length-1]!==x&&p.push(x);let w=p.join("/");return`${u?"/":""}${w}${a?"/":""}`},i=n.replace(/\/+$/,""),r=t.replace(/^\.?\//,"");if(at.test(r))return e(s);if(r.startsWith("components/")){let l=r.slice(10);return e(`${i}${l}`.replace(/^\//,""))}if(r.startsWith("lib/")){if(i.startsWith("src/"))return e(`src/${r}`);if(i.startsWith("app/"))return e(`app/${r}`)}if(r.startsWith("hooks/")){if(i.startsWith("src/"))return e(`src/${r}`);if(i.startsWith("app/"))return e(`app/${r}`)}return r.startsWith("ui/")?e(`${i}/${r}`):e(r)}function L(t,n){let s=n.startsWith("~/")?"~/":"@/",e=t;return e=e.replace(/@\/registry\/default\/components\//g,`${s}components/`),e=e.replace(/@\/registry\/default\/ui\//g,`${s}components/ui/`),e=e.replace(/@\/registry\/default\/hooks\//g,`${s}hooks/`),e=e.replace(/@\/registry\/default\/lib\//g,`${s}lib/`),e=e.replace(/@loveui\/ui\/ui\//g,`${s}components/ui/`),e=e.replace(/@loveui\/ui\/lib\//g,`${s}lib/`),e=e.replace(/@\/ui\//g,`${s}components/ui/`),e=e.replace(/@\/registry\/building-blocks\/default\/components\//g,`${s}components/`),e=e.replace(/@\/registry\/building-blocks\/default\/ui\//g,`${s}components/ui/`),e=e.replace(/@\/registry\/building-blocks\/default\/lib\//g,`${s}lib/`),e=e.replace(/@\/registry\/building-blocks\/default\/hooks\//g,`${s}hooks/`),e=e.replace(/@\/registry\/default\/components\//g,`${s}components/`),e=e.replace(/@\/registry\/default\/ui\//g,`${s}components/ui/`),e=e.replace(/@\/registry\/default\/lib\//g,`${s}lib/`),e=e.replace(/@\/registry\/default\/hooks\//g,`${s}hooks/`),e=e.replace(/from\s+["']@loveui\/ui\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["']@loveui\/shadcn-ui\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["']@love-ui\/shadcn-ui\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["']@\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["']~\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["'](?:\.\.\/)+ui\/src\/lib\/utils["']/g,`from "${n}"`),e}async function Et(t,n){if(d(o.join(t,n)))return!1;let s=$t,e=o.join(G,"love-ui","src","lib","utils.ts");if(d(e))try{s=await m(e,"utf8")}catch{}return await z(n,t),await F(o.join(t,n),s,"utf8"),!0}async function It(t){let s=["app/globals.css","app/global.css","src/app/globals.css","src/app/global.css","styles/globals.css","src/styles/globals.css","globals.css","global.css"].find(a=>d(o.join(t,a)));s||(d(o.join(t,"src","app"))?s="src/app/globals.css":d(o.join(t,"app"))?s="app/globals.css":d(o.join(t,"src"))?s="src/styles/globals.css":s="globals.css");let e=o.join(t,s),i=d(e),r=i?await m(e,"utf8"):"",l=!1;/@import\s+["']tailwindcss["']/.test(r)||(r=`@import "tailwindcss";
${r?`
${r}`:""}`,l=!0),r.includes(xt)||(r=`${r.trimEnd()}

${jt}`,l=!0),(!i||l)&&(await z(s,t),await F(e,r,"utf8"));let u=await At(t,s);return{path:s,created:!i,updated:l,imported:u}}async function At(t,n){let e=["app/layout.tsx","app/layout.jsx","src/app/layout.tsx","src/app/layout.jsx"].find(a=>d(o.join(t,a)));if(!e)return!1;let i=o.join(t,e),r=await m(i,"utf8"),l=Ot(o.dirname(e),n);if(r.includes(`"${l}"`)||r.includes(`'${l}'`))return!1;let u=`import "${l}";
${r}`;return await F(i,u,"utf8"),!0}function Ot(t,n){let s=o.posix.relative(t||".",n);return s.startsWith(".")||(s=`./${s}`),s}async function z(t,n){let s=o.dirname(o.join(n,t));await D(s,{recursive:!0})}async function _t(t,n){let s=o.join(t,"package.json"),e={};try{let a=await m(s,"utf8");e=JSON.parse(a)}catch{}let i=Tt(e),r=C(n),l=[];async function u(a,g){let p=await st(a,{withFileTypes:!0});for(let w of p){if(X.has(w.name))continue;let x=o.join(a,w.name);if(w.isDirectory()){await u(x,g);continue}let S=o.extname(w.name);if(!ot.has(S)||w.name==="package.json")continue;let P=o.relative(g,x).split(o.sep).join("/"),{target:j}=Rt(P,i,r),b=await m(x,"utf8");l.push({path:P,target:j,content:b})}}return await u(t,t),l}async function Wt(t,n){let s=lt.get(t);if(!s)return null;let e=o.join(U,"default","blocks",s.sourceDir);if(!d(e))return null;try{let i=[],r=[],l=new Set;async function u(a){let g=await st(a,{withFileTypes:!0});for(let p of g){if(X.has(p.name))continue;let w=o.join(a,p.name);if(p.isDirectory()){await u(w);continue}let x=o.extname(p.name);if(!ot.has(x))continue;let S=o.relative(e,w).split(o.sep).join("/"),P=await m(w,"utf8");for(let j of P.matchAll(/@\/registry\/default\/ui\/([^"']+)/g)){let b=j[1];b&&l.add(b)}r.push({path:`default/blocks/${s.sourceDir}/${S}`,target:`${s.targetBase}/${S}`,content:P})}}await u(e);for(let a of Array.from(l).sort((g,p)=>g.localeCompare(p))){let g=await J(a,n);g&&i.push(...g)}return i.push(...r),i}catch(i){return console.warn(`Warning: unable to read ${t} from bundled blocks`,i),null}}async function J(t,n){let s=o.join(U,"default","ui",`${t}.tsx`);if(d(s))try{let r=L(await m(s,"utf8"),n),l=[{path:`default/ui/${t}.tsx`,target:`components/ui/${t}.tsx`,content:r}];if(t==="toast"){let u=["toast-gooey.tsx","toast-gooey-renderer.tsx","toast-gooey-icons.tsx","toast-gooey-types.ts","toast-gooey.css"];for(let a of u){let g=o.join(U,"default","ui",a);d(g)&&l.push({path:`default/ui/${a}`,target:`components/ui/${a}`,content:await m(g,"utf8")})}}return l}catch(r){console.warn(`Warning: unable to read ${t} from bundled registry`,r)}let e=o.join(G,"love-ui"),i=o.join(e,"src","ui",`${t}.tsx`);if(!d(i))return null;try{let r=[],l=await m(i,"utf8");l=L(l,n),r.push({path:`src/ui/${t}.tsx`,target:`components/ui/${t}.tsx`,content:l});let u=o.join(e,"src","lib","utils.ts");if(d(u)){let a=await m(u,"utf8");r.push({path:"src/lib/utils.ts",target:"lib/utils.ts",content:a})}return r}catch(r){return console.warn(`Warning: unable to read ${t} component`,r),null}}async function Bt(t,n){if(it.has(t))return await J(t,n);let s=o.join(U,"default","examples",`${t}.tsx`);if(d(s))try{let l=await m(s,"utf8"),u=[],a=Array.from(new Set([...l.matchAll(/@\/registry\/default\/ui\/([^"']+)/g)].map(g=>g[1]).filter(Boolean)));for(let g of a){let p=await J(g,n);p&&u.push(...p)}return u.push({path:`default/examples/${t}.tsx`,target:`components/${t}.tsx`,content:L(l,n)}),u}catch(l){return console.warn(`Warning: unable to read ${t} from bundled registry examples`,l),null}let e=await Wt(t,n);if(e)return e;let i=ut(t),r=o.join(G,i);if(!d(r))return null;try{return await _t(r,t)}catch(l){return console.warn(`Warning: unable to read bundled sources for ${t}`,l),null}}async function dt(t){let n=o.join(kt,C(t));return!d(n)||!d(o.join(n,"SKILL.md"))?null:n}var M=["codex","claude","cursor","github"],tt=new Set(M);function Mt(){let t=process.env.CODEX_HOME?.trim();return t||o.join(rt.homedir(),".codex")}function zt(){let t=process.env.CLAUDE_HOME?.trim();return t||o.join(rt.homedir(),".claude")}async function W(t,n){let s=await dt(t);if(!s)throw new Error(`Bundled skill "${t}" was not found in this love-ui package.`);return await D(o.dirname(n),{recursive:!0}),d(n)?"exists":(await pt(s,n,{recursive:!0,force:!1,filter:e=>{let i=o.basename(e);return!X.has(i)}}),"installed")}async function et(t,n){return await D(o.dirname(t),{recursive:!0}),d(t)?"exists":(await F(t,n,"utf8"),"installed")}function Gt(t){return`---
description: Use LoveUI Skills when building, reviewing, or polishing LoveUI interfaces.
globs: "**/*.{ts,tsx,js,jsx,css,md,mdx}"
alwaysApply: false
---

Use the LoveUI skill pack in \`.cursor/loveui-skills\` for LoveUI UI work.

Start with \`.cursor/loveui-skills/SKILL.md\`, then read the matching files in \`.cursor/loveui-skills/references\` and \`.cursor/loveui-skills/skills\`.

For component installs, use \`npx love-ui add <component>\`. Do not install internal \`@loveui/*\`, \`@love-ui/*\`, or \`@repo/*\` packages directly.

Installed skill pack: ${t}
`}function Ht(t){return`---
applyTo: "**/*.{ts,tsx,js,jsx,css,md,mdx}"
---

# LoveUI Skills

Use the LoveUI skill pack in \`.github/loveui-skills\` when building, reviewing, or polishing LoveUI interfaces.

Start with \`.github/loveui-skills/SKILL.md\`, then read the matching files in \`.github/loveui-skills/references\` and \`.github/loveui-skills/skills\`.

For component installs, use \`npx love-ui add <component>\`. Do not install internal \`@loveui/*\`, \`@love-ui/*\`, or \`@repo/*\` packages directly.

Installed skill pack: ${t}
`}async function Kt(t,n,s){let e=C(t);if(n==="codex"){let l=o.join(Mt(),"skills",e);return[{label:"Codex skill",path:l,status:await W(t,l)}]}if(n==="claude"){let l=o.join(zt(),"skills",e);return[{label:"Claude skill",path:l,status:await W(t,l)}]}if(n==="cursor"){let l=o.join(s,".cursor","loveui-skills"),u=o.join(s,".cursor","rules","loveui-skills.mdc");return[{label:"Cursor skill files",path:l,status:await W(t,l)},{label:"Cursor rule",path:u,status:await et(u,Gt(t))}]}let i=o.join(s,".github","loveui-skills"),r=o.join(s,".github","instructions","loveui-skills.instructions.md");return[{label:"GitHub skill files",path:i,status:await W(t,i)},{label:"GitHub Copilot instructions",path:r,status:await et(r,Ht(t))}]}function Jt(t){let n=new Set;for(let s=0;s<t.length;s++){let e=t[s];if(e){if(e==="--target"||e==="--agent"||e==="-t"){let i=t[s+1];if(s++,!i)throw new Error(`Missing value for ${e}. Use one of: codex, claude, cursor, github, all.`);B(i,n);continue}if(e.startsWith("--target=")){B(e.slice(9),n);continue}if(e.startsWith("--agent=")){B(e.slice(8),n);continue}B(e,n)}}return[...n]}function B(t,n){let s=t.trim().toLowerCase();if(s==="all"){for(let e of tt)n.add(e);return}if(!tt.has(s))throw new Error(`Unknown skill target "${t}". Use one of: codex, claude, cursor, github, all.`);n.add(s)}async function Vt(){if(!process.stdin.isTTY||!process.stdout.isTTY)throw new Error("Missing skill target. Use one of: codex, claude, cursor, github, all.");let t=[...M.map((s,e)=>({label:s,number:String(e+1),targets:[s]})),{label:"all",number:String(M.length+1),targets:[...M]}];console.log(`
Which AI tool should LoveUI Skills target?
`);for(let s of t)console.log(`  ${s.number}. ${s.label}`);let n=ht({input:process.stdin,output:process.stdout});try{for(;;){let s=(await n.question(`
Select a target: `)).trim().toLowerCase(),e=t.find(i=>i.number===s||i.label===s);if(e)return e.targets;console.log("Please choose codex, claude, cursor, github, all, or a number from the list.")}}finally{n.close()}}async function Xt(t,n){let s="loveui-skills",e=Jt(t),i=e.length>0?e:await Vt();if(!await dt(s))throw new Error("The loveui-skills pack is missing from this love-ui package. Try updating to the latest version.");console.log(`
Adding ${s} for ${i.join(", ")}...`);for(let r of i){let l=await Kt(s,r,n);for(let u of l){let a=u.status==="installed"?"Installed":"Already exists";console.log(`\u2713 ${a}: ${u.label} at ${u.path}`)}}console.log(`
\u2713 Done! Restart or reload your AI tool so it can pick up the new instructions.`)}var nt={"@base-ui-components/react":"1.0.0-beta.4","class-variance-authority":"^0.7.1",clsx:"^2.1.1","lucide-react":"^1.16.0","tailwind-merge":"^3.3.1"};async function Yt(t){if(it.has(t)||d(o.join(U,"default","examples",`${t}.tsx`)))return{...nt};let n=lt.get(t);if(n)return{...nt,..."dependencies"in n?n.dependencies:{}};let s=ut(t),e=o.join(G,s,"package.json");try{let i=await m(e,"utf8");return JSON.parse(i).dependencies??{}}catch{return{}}}async function Nt(t){return d(o.join(t,"bun.lockb"))?"bun":d(o.join(t,"pnpm-lock.yaml"))?"pnpm":d(o.join(t,"yarn.lock"))?"yarn":"npm"}async function qt(t,n,s){let e=Object.entries(t);if(e.length===0)return!0;console.log(`
Installing dependencies...`);let i=e.map(([u,a])=>`${u}@${a}`),r;switch(n){case"bun":r=`bun add ${i.join(" ")}`;break;case"pnpm":r=`pnpm add ${i.join(" ")}`;break;case"yarn":r=`yarn add ${i.join(" ")}`;break;default:r=`npm install ${i.join(" ")}`}let l=ft(r,{stdio:"inherit",shell:!0,cwd:s});return l.error||l.status!==0?(console.warn(`
Failed to install dependencies. You may need to install them manually:`),console.warn(`  ${i.join(`
  `)}`),!1):(console.log(`Dependencies installed successfully!
`),!0)}async function Qt(t=process.argv.slice(2)){if((t.length===0||t.length===1&&(t[0]==="--version"||t[0]==="-v"))&&(console.log("love-ui version 1.1.9"),process.exit(0)),(t.length<2||t[0]!=="add")&&(console.log("Usage: npx love-ui add [...packages]"),console.log("       npx love-ui add loveui-skills [codex|claude|cursor|github|all]"),console.log("       npx love-ui add loveui-skills --agent codex"),console.log("       npx love-ui --version"),process.exit(1)),C(t[1]??"")==="loveui-skills"){await Xt(t.slice(2),process.cwd());return}let n=t.slice(1),s=process.cwd(),e=await Ft(s),i=await Dt(s),r=e?.components?ct(e.components):null,l=await Lt(s,r,i),u=Ut(e?.components,i),{utilsImportPath:a,utilsFilePath:g}=await Ct(s,l,u,e),p=await Nt(s),w=l.endsWith("/ui")?l:`${l}/ui`,x=!1,S=!1,P=!1,j={};for(let b of n){if(!b.trim())continue;if(console.log(`
Adding ${b}...`),x||(await D(o.join(s,l),{recursive:!0}),await D(o.join(s,w),{recursive:!0}),x=!0),!P){let c=await It(s);c.created?console.log(`\u2713 Created ${c.path}`):c.updated&&console.log(`\u2713 Updated ${c.path}`),c.imported&&console.log(`\u2713 Imported ${c.path} from app layout`),P=!0}S=!0;let h=null,Y=null;if(b.startsWith("http://")||b.startsWith("https://")){let c=b;c.includes("/building-blocks/r/")&&(c=c.replace("/building-blocks/r/","/building-blocks/"),console.log(`Auto-corrected URL to: ${c}`));try{let f=await fetch(c);f.ok?h=await f.json():console.warn(`Failed to fetch ${c}: HTTP ${f.status}`)}catch(f){console.warn(`Failed to fetch from ${c}:`,f)}}else{let c=new URL(`r/${b}.json`,"https://www.loveui.dev/");try{let f=await fetch(c);f.ok&&(h=await f.json())}catch{}Y=await Bt(b,a)}let T=Y??h?.files??[];T=T.map(c=>{let f=c.target||c.path;return f.startsWith("registry/default/")&&(f=f.replace("registry/default/","")),{...c,target:f}});let E=T.find(c=>c.target.match(/^components\/comp-\d+\.tsx$/));if(E){let c=T.filter(f=>f.target.match(/^components\/[^/]+\//)&&f.target!==E.target);if(c.length>0&&c[0]){let f=c[0].target.match(/^components\/([^/]+)\//);if(f&&f[1]){let y=f[1];E.target=`components/${y}-demo.tsx`}}else if(h?.meta?.tags&&Array.isArray(h.meta.tags)&&h.meta.tags.length>0){let y=h.meta.tags.slice(0,2).filter(v=>v.length>0);if(y.length>0){let v=y.join("-").toLowerCase().replace(/\s+/g,"-");E.target=`components/${v}.tsx`}}}if(!T.length){console.warn(`Component "${b}" not found. Available components can be found at https://loveui.dev`);continue}T.some(c=>at.test(c.target)||typeof c.content=="string"&&vt.test(c.content))&&await Et(s,g);let I=0,A=0;for(let c of T){if(!c.content)continue;let f=Z(c.target,l,g),y=o.join(s,f),v=d(y);if(R(f)===R(g)&&v)continue;let _=L(c.content,a);if(v)try{if(await m(y,"utf8")===_)continue}catch{}await z(f,s),await F(y,_,"utf8"),v?A++:I++}if(I>0&&console.log(`\u2713 Created ${I} file${I>1?"s":""}`),A>0&&console.log(`\u2713 Updated ${A} file${A>1?"s":""}`),h?.registryDependencies&&h.registryDependencies.length>0){console.log(`
Installing ${h.registryDependencies.length} required component${h.registryDependencies.length>1?"s":""}...`);for(let c of h.registryDependencies){let f=c;c.startsWith("https://loveui.dev/building-blocks/r/")&&(f=`https://ui.loveui.dev/ui/r/${c.split("/").pop()}`);try{let y=await fetch(f);if(y.ok){let v=await y.json(),_=(v?.files??[]).map(k=>{let $=k.target||k.path;return $.startsWith("registry/default/")&&($=$.replace("registry/default/","")),{...k,target:$}});for(let k of _){if(!k.content)continue;let $=Z(k.target,l,g),K=o.join(s,$),N=d(K);if(R($)===R(g)&&N)continue;let q=L(k.content,a);if(N)try{if(await m(K,"utf8")===q)continue}catch{}await z($,s),await F(K,q,"utf8")}let H=["@loveui/shadcn-ui","jotai","lucide-react","react","react-dom"];if(v?.dependencies)if(Array.isArray(v.dependencies))v.dependencies.forEach(k=>{H.includes(k)||(j[k]="latest")});else{let k=v.dependencies;Object.keys(k).forEach($=>{!H.includes($)&&k[$]&&(j[$]=k[$])})}}else console.warn(`  \u2717 Failed to fetch ${f}: HTTP ${y.status}`)}catch(y){console.warn(`  \u2717 Failed to install ${f}:`,y.message)}}console.log("\u2713 Installed registry dependencies")}let O={};h?.dependencies?Array.isArray(h.dependencies)?h.dependencies.forEach(c=>{O[c]="latest"}):O=h.dependencies:O=await Yt(b),Object.assign(j,O)}Object.keys(j).length>0&&await qt(j,p,s),console.log(S?`
\u2713 Done! You can now import and use the components in your app.`:`
\u2713 Done! Skill installation complete.`)}var Zt=process.argv[1]&&(import.meta.url===mt(process.argv[1]).href||process.argv[1].includes("love-ui")||process.argv[1].includes("loveui"));Zt&&Qt().catch(t=>{console.error(t),process.exit(1)});export{Qt as run};
