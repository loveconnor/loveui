#!/usr/bin/env node
import{spawnSync as ct}from"child_process";import{existsSync as d}from"fs";import{cp as ut,mkdir as F,readdir as dt,readFile as m,writeFile as T}from"fs/promises";import et from"os";import o from"path";import{createInterface as gt}from"readline/promises";import{pathToFileURL as ft,fileURLToPath as pt}from"url";var ht=o.dirname(pt(import.meta.url)),J=o.resolve(ht,".."),G=o.join(J,"packages"),M=o.join(J,"registry"),mt=o.join(J,"skills"),yt=new Set([".ts",".tsx",".cts",".mts",".js",".jsx",".css",".scss",".sass",".mdx",".md"]),nt=new Set(["node_modules","dist",".turbo",".next","build",".cache"]),st=new Set(["accordion","alert","alert-dialog","autocomplete","avatar","badge","breadcrumb","button","card","checkbox","checkbox-group","collapsible","combobox","command","dialog","empty","field","fieldset","form","frame","group","input","label","menu","meter","number-field","pagination","popover","preview-card","progress","radio-group","scroll-area","select","separator","sheet","skeleton","slider","switch","table","tabs","textarea","toast","toggle","toggle-group","toolbar","tooltip"]),bt=[".ts",".tsx",".js",".jsx"],rt=/(^|\/)lib\/utils(?:\.[a-z]+)?$/i,kt=/@loveui\/ui\/lib\/utils|@loveui\/shadcn-ui\/lib\/utils|@love-ui\/shadcn-ui\/lib\/utils|@\/lib\/utils|~\/lib\/utils|(?:\.\.\/)+ui\/src\/lib\/utils/,wt=`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,vt="love-ui globals",$t=`/* love-ui globals */
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
`;function L(t){if(!t)return t;let n=t.split("/");return n[n.length-1]||t}function ot(t){let n=t.trim();return n&&((n.startsWith("@/")||n.startsWith("~/"))&&(n=`src/${n.slice(2)}`),n.startsWith("/")&&(n=n.slice(1)),n=n.replace(/^\.\//,""),n=n.replace(/\/+$/,""),n)}function xt(t){return t.trim().replace(/\/+$/,"")}function S(t){return t.replace(/\.(?:ts|tsx|js|jsx)$/i,"")}function Y(t){let n=S(t);return bt.map(s=>`${n}${s}`)}function jt(t){let n=t.replace(/\/+$/,"");return n==="src"||n.startsWith("src/")?"src":n==="app"||n.startsWith("app/")?"app":null}function it(t){let n=L(t);return n==="ui"?"love-ui":n}function Pt(t){let n=t.loveui??{},s=typeof n.target=="string"?n.target.trim():"",e=n.category;if(s){let i=typeof n.includePackageName=="boolean"?n.includePackageName:!1;return{base:s.replace(/\/+$/,""),includePackageName:i}}return e==="feature"?{base:"components",includePackageName:!0}:e==="block"?{base:"components/blocks",includePackageName:!0}:{base:"components/ui",includePackageName:!0}}function St(t,n,s){let e=t.startsWith("src/")?t.slice(4):t;if(!n.includePackageName){let u=n.base.split("/").filter(Boolean),c=u[u.length-1];c&&e.startsWith(`${c}/`)&&(e=e.slice(c.length+1))}let l=`${(n.includePackageName?`${n.base}/${s}`:n.base).replace(/\/+/g,"/")}/${e}`.replace(/\/+/g,"/");return{cleanedPath:e,target:l}}async function Tt(t){let n=o.join(t,"components.json");try{let s=await m(n,"utf8");return JSON.parse(s).aliases??null}catch{return null}}async function Rt(t){let n=["tsconfig.json","jsconfig.json"].map(s=>o.join(t,s)).find(s=>d(s));if(!n)return null;try{let s=await m(n,"utf8"),i=JSON.parse(s).compilerOptions?.paths;return!i||typeof i!="object"?null:i}catch{return null}}function Ft(t,n){if(typeof t=="string"){if(t.trim().startsWith("~/"))return"~/";if(t.trim().startsWith("@/"))return"@/"}if(n){if(Object.prototype.hasOwnProperty.call(n,"~/*"))return"~/";if(Object.prototype.hasOwnProperty.call(n,"@/*"))return"@/"}return"@/"}async function Ut(t,n,s){if(n&&n.length>0)return n;let e=["src/components/ui","app/components/ui","components/ui"];for(let r of e)if(d(o.join(t,r)))return r.replace(/\/ui$/,"");let i=["src/components","app/components","components"];for(let r of i)if(d(o.join(t,r)))return r;if(s){let r=s["@/*"]??s["~/*"]??[];if(Array.isArray(r)&&r.some(l=>/^\.?\/?src\//.test(l)))return"src/components";if(Array.isArray(r)&&r.some(l=>/^\.?\/?app\//.test(l)))return"app/components"}return d(o.join(t,"src"))?"src/components":d(o.join(t,"app"))?"app/components":"components"}async function Lt(t,n,s,e){let i=e?.utils??(e?.lib?`${e.lib.replace(/\/+$/,"")}/utils`:void 0);if(i&&i.trim().length>0){let c=S(xt(i)),f=S(ot(i));for(let w of Y(f))if(d(o.join(t,w)))return{utilsImportPath:c,utilsFilePath:w};return{utilsImportPath:c,utilsFilePath:`${f}.ts`}}let r=jt(n),l=r?`${r}/lib/utils`:"lib/utils",u=Array.from(new Set([l,"src/lib/utils","app/lib/utils","lib/utils"]));for(let c of u)for(let f of Y(c))if(d(o.join(t,f)))return{utilsImportPath:`${s}lib/utils`,utilsFilePath:f};return{utilsImportPath:`${s}lib/utils`,utilsFilePath:`${l}.ts`}}function q(t,n,s){let e=l=>{let u=l.startsWith("/"),c=l.endsWith("/"),f=l.split("/").filter(Boolean),w=[];for(let x of f)w[w.length-1]!==x&&w.push(x);let $=w.join("/");return`${u?"/":""}${$}${c?"/":""}`},i=n.replace(/\/+$/,""),r=t.replace(/^\.?\//,"");if(rt.test(r))return e(s);if(r.startsWith("components/")){let l=r.slice(10);return e(`${i}${l}`.replace(/^\//,""))}if(r.startsWith("lib/")){if(i.startsWith("src/"))return e(`src/${r}`);if(i.startsWith("app/"))return e(`app/${r}`)}if(r.startsWith("hooks/")){if(i.startsWith("src/"))return e(`src/${r}`);if(i.startsWith("app/"))return e(`app/${r}`)}return r.startsWith("ui/")?e(`${i}/${r}`):e(r)}function U(t,n){let s=n.startsWith("~/")?"~/":"@/",e=t;return e=e.replace(/@\/registry\/default\/components\//g,`${s}components/`),e=e.replace(/@\/registry\/default\/ui\//g,`${s}components/ui/`),e=e.replace(/@\/registry\/default\/hooks\//g,`${s}hooks/`),e=e.replace(/@\/registry\/default\/lib\//g,`${s}lib/`),e=e.replace(/@loveui\/ui\/ui\//g,`${s}components/ui/`),e=e.replace(/@loveui\/ui\/lib\//g,`${s}lib/`),e=e.replace(/@\/ui\//g,`${s}components/ui/`),e=e.replace(/@\/registry\/building-blocks\/default\/components\//g,`${s}components/`),e=e.replace(/@\/registry\/building-blocks\/default\/ui\//g,`${s}components/ui/`),e=e.replace(/@\/registry\/building-blocks\/default\/lib\//g,`${s}lib/`),e=e.replace(/@\/registry\/building-blocks\/default\/hooks\//g,`${s}hooks/`),e=e.replace(/@\/registry\/default\/components\//g,`${s}components/`),e=e.replace(/@\/registry\/default\/ui\//g,`${s}components/ui/`),e=e.replace(/@\/registry\/default\/lib\//g,`${s}lib/`),e=e.replace(/@\/registry\/default\/hooks\//g,`${s}hooks/`),e=e.replace(/from\s+["']@loveui\/ui\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["']@loveui\/shadcn-ui\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["']@love-ui\/shadcn-ui\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["']@\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["']~\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["'](?:\.\.\/)+ui\/src\/lib\/utils["']/g,`from "${n}"`),e}async function Ct(t,n){if(d(o.join(t,n)))return!1;let s=wt,e=o.join(G,"love-ui","src","lib","utils.ts");if(d(e))try{s=await m(e,"utf8")}catch{}return await z(n,t),await T(o.join(t,n),s,"utf8"),!0}async function Et(t){let s=["app/globals.css","app/global.css","src/app/globals.css","src/app/global.css","styles/globals.css","src/styles/globals.css","globals.css","global.css"].find(c=>d(o.join(t,c)));s||(d(o.join(t,"src","app"))?s="src/app/globals.css":d(o.join(t,"app"))?s="app/globals.css":d(o.join(t,"src"))?s="src/styles/globals.css":s="globals.css");let e=o.join(t,s),i=d(e),r=i?await m(e,"utf8"):"",l=!1;/@import\s+["']tailwindcss["']/.test(r)||(r=`@import "tailwindcss";
${r?`
${r}`:""}`,l=!0),r.includes(vt)||(r=`${r.trimEnd()}

${$t}`,l=!0),(!i||l)&&(await z(s,t),await T(e,r,"utf8"));let u=await Dt(t,s);return{path:s,created:!i,updated:l,imported:u}}async function Dt(t,n){let e=["app/layout.tsx","app/layout.jsx","src/app/layout.tsx","src/app/layout.jsx"].find(c=>d(o.join(t,c)));if(!e)return!1;let i=o.join(t,e),r=await m(i,"utf8"),l=It(o.dirname(e),n);if(r.includes(`"${l}"`)||r.includes(`'${l}'`))return!1;let u=`import "${l}";
${r}`;return await T(i,u,"utf8"),!0}function It(t,n){let s=o.posix.relative(t||".",n);return s.startsWith(".")||(s=`./${s}`),s}async function z(t,n){let s=o.dirname(o.join(n,t));await F(s,{recursive:!0})}async function At(t,n){let s=o.join(t,"package.json"),e={};try{let c=await m(s,"utf8");e=JSON.parse(c)}catch{}let i=Pt(e),r=L(n),l=[];async function u(c,f){let w=await dt(c,{withFileTypes:!0});for(let $ of w){if(nt.has($.name))continue;let x=o.join(c,$.name);if($.isDirectory()){await u(x,f);continue}let C=o.extname($.name);if(!yt.has(C)||$.name==="package.json")continue;let R=o.relative(f,x).split(o.sep).join("/"),{target:j}=St(R,i,r),v=await m(x,"utf8");l.push({path:R,target:j,content:v})}}return await u(t,t),l}async function Q(t,n){let s=o.join(M,"default","ui",`${t}.tsx`);if(d(s))try{let r=U(await m(s,"utf8"),n),l=[{path:`default/ui/${t}.tsx`,target:`components/ui/${t}.tsx`,content:r}];if(t==="toast"){let u=["toast-gooey.tsx","toast-gooey-renderer.tsx","toast-gooey-icons.tsx","toast-gooey-types.ts","toast-gooey.css"];for(let c of u){let f=o.join(M,"default","ui",c);d(f)&&l.push({path:`default/ui/${c}`,target:`components/ui/${c}`,content:await m(f,"utf8")})}}return l}catch(r){console.warn(`Warning: unable to read ${t} from bundled registry`,r)}let e=o.join(G,"love-ui"),i=o.join(e,"src","ui",`${t}.tsx`);if(!d(i))return null;try{let r=[],l=await m(i,"utf8");l=U(l,n),r.push({path:`src/ui/${t}.tsx`,target:`components/ui/${t}.tsx`,content:l});let u=o.join(e,"src","lib","utils.ts");if(d(u)){let c=await m(u,"utf8");r.push({path:"src/lib/utils.ts",target:"lib/utils.ts",content:c})}return r}catch(r){return console.warn(`Warning: unable to read ${t} component`,r),null}}async function Ot(t,n){if(st.has(t))return await Q(t,n);let s=o.join(M,"default","examples",`${t}.tsx`);if(d(s))try{let r=await m(s,"utf8"),l=[],u=Array.from(new Set([...r.matchAll(/@\/registry\/default\/ui\/([^"']+)/g)].map(c=>c[1]).filter(Boolean)));for(let c of u){let f=await Q(c,n);f&&l.push(...f)}return l.push({path:`default/examples/${t}.tsx`,target:`components/${t}.tsx`,content:U(r,n)}),l}catch(r){return console.warn(`Warning: unable to read ${t} from bundled registry examples`,r),null}let e=it(t),i=o.join(G,e);if(!d(i))return null;try{return await At(i,t)}catch(r){return console.warn(`Warning: unable to read bundled sources for ${t}`,r),null}}async function lt(t){let n=o.join(mt,L(t));return!d(n)||!d(o.join(n,"SKILL.md"))?null:n}var B=["codex","claude","cursor","github"],Z=new Set(B);function _t(){let t=process.env.CODEX_HOME?.trim();return t||o.join(et.homedir(),".codex")}function Wt(){let t=process.env.CLAUDE_HOME?.trim();return t||o.join(et.homedir(),".claude")}async function _(t,n){let s=await lt(t);if(!s)throw new Error(`Bundled skill "${t}" was not found in this love-ui package.`);return await F(o.dirname(n),{recursive:!0}),d(n)?"exists":(await ut(s,n,{recursive:!0,force:!1,filter:e=>{let i=o.basename(e);return!nt.has(i)}}),"installed")}async function tt(t,n){return await F(o.dirname(t),{recursive:!0}),d(t)?"exists":(await T(t,n,"utf8"),"installed")}function Bt(t){return`---
description: Use LoveUI Skills when building, reviewing, or polishing LoveUI interfaces.
globs: "**/*.{ts,tsx,js,jsx,css,md,mdx}"
alwaysApply: false
---

Use the LoveUI skill pack in \`.cursor/loveui-skills\` for LoveUI UI work.

Start with \`.cursor/loveui-skills/SKILL.md\`, then read the matching files in \`.cursor/loveui-skills/references\` and \`.cursor/loveui-skills/skills\`.

For component installs, use \`npx love-ui add <component>\`. Do not install internal \`@loveui/*\`, \`@love-ui/*\`, or \`@repo/*\` packages directly.

Installed skill pack: ${t}
`}function Mt(t){return`---
applyTo: "**/*.{ts,tsx,js,jsx,css,md,mdx}"
---

# LoveUI Skills

Use the LoveUI skill pack in \`.github/loveui-skills\` when building, reviewing, or polishing LoveUI interfaces.

Start with \`.github/loveui-skills/SKILL.md\`, then read the matching files in \`.github/loveui-skills/references\` and \`.github/loveui-skills/skills\`.

For component installs, use \`npx love-ui add <component>\`. Do not install internal \`@loveui/*\`, \`@love-ui/*\`, or \`@repo/*\` packages directly.

Installed skill pack: ${t}
`}async function zt(t,n,s){let e=L(t);if(n==="codex"){let l=o.join(_t(),"skills",e);return[{label:"Codex skill",path:l,status:await _(t,l)}]}if(n==="claude"){let l=o.join(Wt(),"skills",e);return[{label:"Claude skill",path:l,status:await _(t,l)}]}if(n==="cursor"){let l=o.join(s,".cursor","loveui-skills"),u=o.join(s,".cursor","rules","loveui-skills.mdc");return[{label:"Cursor skill files",path:l,status:await _(t,l)},{label:"Cursor rule",path:u,status:await tt(u,Bt(t))}]}let i=o.join(s,".github","loveui-skills"),r=o.join(s,".github","instructions","loveui-skills.instructions.md");return[{label:"GitHub skill files",path:i,status:await _(t,i)},{label:"GitHub Copilot instructions",path:r,status:await tt(r,Mt(t))}]}function Gt(t){let n=new Set;for(let s=0;s<t.length;s++){let e=t[s];if(e){if(e==="--target"||e==="--agent"||e==="-t"){let i=t[s+1];if(s++,!i)throw new Error(`Missing value for ${e}. Use one of: codex, claude, cursor, github, all.`);W(i,n);continue}if(e.startsWith("--target=")){W(e.slice(9),n);continue}if(e.startsWith("--agent=")){W(e.slice(8),n);continue}W(e,n)}}return[...n]}function W(t,n){let s=t.trim().toLowerCase();if(s==="all"){for(let e of Z)n.add(e);return}if(!Z.has(s))throw new Error(`Unknown skill target "${t}". Use one of: codex, claude, cursor, github, all.`);n.add(s)}async function Ht(){if(!process.stdin.isTTY||!process.stdout.isTTY)throw new Error("Missing skill target. Use one of: codex, claude, cursor, github, all.");let t=[...B.map((s,e)=>({label:s,number:String(e+1),targets:[s]})),{label:"all",number:String(B.length+1),targets:[...B]}];console.log(`
Which AI tool should LoveUI Skills target?
`);for(let s of t)console.log(`  ${s.number}. ${s.label}`);let n=gt({input:process.stdin,output:process.stdout});try{for(;;){let s=(await n.question(`
Select a target: `)).trim().toLowerCase(),e=t.find(i=>i.number===s||i.label===s);if(e)return e.targets;console.log("Please choose codex, claude, cursor, github, all, or a number from the list.")}}finally{n.close()}}async function Kt(t,n){let s="loveui-skills",e=Gt(t),i=e.length>0?e:await Ht();if(!await lt(s))throw new Error("The loveui-skills pack is missing from this love-ui package. Try updating to the latest version.");console.log(`
Adding ${s} for ${i.join(", ")}...`);for(let r of i){let l=await zt(s,r,n);for(let u of l){let c=u.status==="installed"?"Installed":"Already exists";console.log(`\u2713 ${c}: ${u.label} at ${u.path}`)}}console.log(`
\u2713 Done! Restart or reload your AI tool so it can pick up the new instructions.`)}var Jt={"@base-ui-components/react":"1.0.0-beta.4","class-variance-authority":"^0.7.1",clsx:"^2.1.1","lucide-react":"^1.16.0","tailwind-merge":"^3.3.1"};async function Vt(t){if(st.has(t)||d(o.join(M,"default","examples",`${t}.tsx`)))return{...Jt};let n=it(t),s=o.join(G,n,"package.json");try{let e=await m(s,"utf8");return JSON.parse(e).dependencies??{}}catch{return{}}}async function Nt(t){return d(o.join(t,"bun.lockb"))?"bun":d(o.join(t,"pnpm-lock.yaml"))?"pnpm":d(o.join(t,"yarn.lock"))?"yarn":"npm"}async function Xt(t,n,s){let e=Object.entries(t);if(e.length===0)return!0;console.log(`
Installing dependencies...`);let i=e.map(([u,c])=>`${u}@${c}`),r;switch(n){case"bun":r=`bun add ${i.join(" ")}`;break;case"pnpm":r=`pnpm add ${i.join(" ")}`;break;case"yarn":r=`yarn add ${i.join(" ")}`;break;default:r=`npm install ${i.join(" ")}`}let l=ct(r,{stdio:"inherit",shell:!0,cwd:s});return l.error||l.status!==0?(console.warn(`
Failed to install dependencies. You may need to install them manually:`),console.warn(`  ${i.join(`
  `)}`),!1):(console.log(`Dependencies installed successfully!
`),!0)}async function Yt(t=process.argv.slice(2)){if((t.length===0||t.length===1&&(t[0]==="--version"||t[0]==="-v"))&&(console.log("love-ui version 1.1.9"),process.exit(0)),(t.length<2||t[0]!=="add")&&(console.log("Usage: npx love-ui add [...packages]"),console.log("       npx love-ui add loveui-skills [codex|claude|cursor|github|all]"),console.log("       npx love-ui add loveui-skills --agent codex"),console.log("       npx love-ui --version"),process.exit(1)),L(t[1]??"")==="loveui-skills"){await Kt(t.slice(2),process.cwd());return}let n=t.slice(1),s=process.cwd(),e=await Tt(s),i=await Rt(s),r=e?.components?ot(e.components):null,l=await Ut(s,r,i),u=Ft(e?.components,i),{utilsImportPath:c,utilsFilePath:f}=await Lt(s,l,u,e),w=await Nt(s),$=l.endsWith("/ui")?l:`${l}/ui`,x=!1,C=!1,R=!1,j={};for(let v of n){if(!v.trim())continue;if(console.log(`
Adding ${v}...`),x||(await F(o.join(s,l),{recursive:!0}),await F(o.join(s,$),{recursive:!0}),x=!0),!R){let a=await Et(s);a.created?console.log(`\u2713 Created ${a.path}`):a.updated&&console.log(`\u2713 Updated ${a.path}`),a.imported&&console.log(`\u2713 Imported ${a.path} from app layout`),R=!0}C=!0;let p=null,V=null;if(v.startsWith("http://")||v.startsWith("https://")){let a=v;a.includes("/building-blocks/r/")&&(a=a.replace("/building-blocks/r/","/building-blocks/"),console.log(`Auto-corrected URL to: ${a}`));try{let g=await fetch(a);g.ok?p=await g.json():console.warn(`Failed to fetch ${a}: HTTP ${g.status}`)}catch(g){console.warn(`Failed to fetch from ${a}:`,g)}}else{let a=new URL(`r/${v}.json`,"https://www.loveui.dev/");try{let g=await fetch(a);g.ok&&(p=await g.json())}catch{}V=await Ot(v,c)}let P=V??p?.files??[];P=P.map(a=>{let g=a.target||a.path;return g.startsWith("registry/default/")&&(g=g.replace("registry/default/","")),{...a,target:g}});let E=P.find(a=>a.target.match(/^components\/comp-\d+\.tsx$/));if(E){let a=P.filter(g=>g.target.match(/^components\/[^/]+\//)&&g.target!==E.target);if(a.length>0&&a[0]){let g=a[0].target.match(/^components\/([^/]+)\//);if(g&&g[1]){let h=g[1];E.target=`components/${h}-demo.tsx`}}else if(p?.meta?.tags&&Array.isArray(p.meta.tags)&&p.meta.tags.length>0){let h=p.meta.tags.slice(0,2).filter(b=>b.length>0);if(h.length>0){let b=h.join("-").toLowerCase().replace(/\s+/g,"-");E.target=`components/${b}.tsx`}}}if(!P.length){console.warn(`Component "${v}" not found. Available components can be found at https://loveui.dev`);continue}P.some(a=>rt.test(a.target)||typeof a.content=="string"&&kt.test(a.content))&&await Ct(s,f);let D=0,I=0;for(let a of P){if(!a.content)continue;let g=q(a.target,l,f),h=o.join(s,g),b=d(h);if(S(g)===S(f)&&b)continue;let O=U(a.content,c);if(b)try{if(await m(h,"utf8")===O)continue}catch{}await z(g,s),await T(h,O,"utf8"),b?I++:D++}if(D>0&&console.log(`\u2713 Created ${D} file${D>1?"s":""}`),I>0&&console.log(`\u2713 Updated ${I} file${I>1?"s":""}`),p?.registryDependencies&&p.registryDependencies.length>0){console.log(`
Installing ${p.registryDependencies.length} required component${p.registryDependencies.length>1?"s":""}...`);for(let a of p.registryDependencies){let g=a;a.startsWith("https://loveui.dev/building-blocks/r/")&&(g=`https://ui.loveui.dev/ui/r/${a.split("/").pop()}`);try{let h=await fetch(g);if(h.ok){let b=await h.json(),O=(b?.files??[]).map(y=>{let k=y.target||y.path;return k.startsWith("registry/default/")&&(k=k.replace("registry/default/","")),{...y,target:k}});for(let y of O){if(!y.content)continue;let k=q(y.target,l,f),K=o.join(s,k),N=d(K);if(S(k)===S(f)&&N)continue;let X=U(y.content,c);if(N)try{if(await m(K,"utf8")===X)continue}catch{}await z(k,s),await T(K,X,"utf8")}let H=["@loveui/shadcn-ui","jotai","lucide-react","react","react-dom"];if(b?.dependencies)if(Array.isArray(b.dependencies))b.dependencies.forEach(y=>{H.includes(y)||(j[y]="latest")});else{let y=b.dependencies;Object.keys(y).forEach(k=>{!H.includes(k)&&y[k]&&(j[k]=y[k])})}}else console.warn(`  \u2717 Failed to fetch ${g}: HTTP ${h.status}`)}catch(h){console.warn(`  \u2717 Failed to install ${g}:`,h.message)}}console.log("\u2713 Installed registry dependencies")}let A={};p?.dependencies?Array.isArray(p.dependencies)?p.dependencies.forEach(a=>{A[a]="latest"}):A=p.dependencies:A=await Vt(v),Object.assign(j,A)}Object.keys(j).length>0&&await Xt(j,w,s),console.log(C?`
\u2713 Done! You can now import and use the components in your app.`:`
\u2713 Done! Skill installation complete.`)}var qt=process.argv[1]&&(import.meta.url===ft(process.argv[1]).href||process.argv[1].includes("love-ui")||process.argv[1].includes("loveui"));qt&&Yt().catch(t=>{console.error(t),process.exit(1)});export{Yt as run};
