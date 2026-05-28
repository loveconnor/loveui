#!/usr/bin/env node
import{spawnSync as rt}from"child_process";import{existsSync as d}from"fs";import{cp as ot,mkdir as A,readdir as it,readFile as y,writeFile as C}from"fs/promises";import at from"os";import o from"path";import{pathToFileURL as lt,fileURLToPath as ct}from"url";var ut=o.dirname(ct(import.meta.url)),q=o.resolve(ut,".."),E=o.join(q,"packages"),_=o.join(q,"registry"),dt=new Set([".ts",".tsx",".cts",".mts",".js",".jsx",".css",".scss",".sass",".mdx",".md"]),Q=new Set(["node_modules","dist",".turbo",".next","build",".cache"]),Z=new Set(["accordion","alert","alert-dialog","autocomplete","avatar","badge","breadcrumb","button","card","checkbox","checkbox-group","collapsible","combobox","command","dialog","empty","field","fieldset","form","frame","group","input","label","menu","meter","number-field","pagination","popover","preview-card","progress","radio-group","scroll-area","select","separator","sheet","skeleton","slider","switch","table","tabs","textarea","toast","toggle","toggle-group","toolbar","tooltip"]),gt=[".ts",".tsx",".js",".jsx"],tt=/(^|\/)lib\/utils(?:\.[a-z]+)?$/i,pt=/@loveui\/ui\/lib\/utils|@loveui\/shadcn-ui\/lib\/utils|@love-ui\/shadcn-ui\/lib\/utils|@\/lib\/utils|~\/lib\/utils|(?:\.\.\/)+ui\/src\/lib\/utils/,ft=`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,mt="love-ui globals",ht=`/* love-ui globals */
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
`;function z(t){if(!t)return t;let n=t.split("/");return n[n.length-1]||t}function et(t){let n=t.trim();return n&&((n.startsWith("@/")||n.startsWith("~/"))&&(n=`src/${n.slice(2)}`),n.startsWith("/")&&(n=n.slice(1)),n=n.replace(/^\.\//,""),n=n.replace(/\/+$/,""),n)}function yt(t){return t.trim().replace(/\/+$/,"")}function R(t){return t.replace(/\.(?:ts|tsx|js|jsx)$/i,"")}function X(t){let n=R(t);return gt.map(s=>`${n}${s}`)}function bt(t){let n=t.replace(/\/+$/,"");return n==="src"||n.startsWith("src/")?"src":n==="app"||n.startsWith("app/")?"app":null}function N(t){let n=z(t);return n==="ui"?"love-ui":n}function kt(t){let n=t.loveui??{},s=typeof n.target=="string"?n.target.trim():"",e=n.category;if(s){let a=typeof n.includePackageName=="boolean"?n.includePackageName:!1;return{base:s.replace(/\/+$/,""),includePackageName:a}}return e==="feature"?{base:"components",includePackageName:!0}:e==="block"?{base:"components/blocks",includePackageName:!0}:{base:"components/ui",includePackageName:!0}}function $t(t,n,s){let e=t.startsWith("src/")?t.slice(4):t;if(!n.includePackageName){let g=n.base.split("/").filter(Boolean),c=g[g.length-1];c&&e.startsWith(`${c}/`)&&(e=e.slice(c.length+1))}let i=`${(n.includePackageName?`${n.base}/${s}`:n.base).replace(/\/+/g,"/")}/${e}`.replace(/\/+/g,"/");return{cleanedPath:e,target:i}}async function wt(t){let n=o.join(t,"components.json");try{let s=await y(n,"utf8");return JSON.parse(s).aliases??null}catch{return null}}async function vt(t){let n=["tsconfig.json","jsconfig.json"].map(s=>o.join(t,s)).find(s=>d(s));if(!n)return null;try{let s=await y(n,"utf8"),a=JSON.parse(s).compilerOptions?.paths;return!a||typeof a!="object"?null:a}catch{return null}}function xt(t,n){if(typeof t=="string"){if(t.trim().startsWith("~/"))return"~/";if(t.trim().startsWith("@/"))return"@/"}if(n){if(Object.prototype.hasOwnProperty.call(n,"~/*"))return"~/";if(Object.prototype.hasOwnProperty.call(n,"@/*"))return"@/"}return"@/"}async function jt(t,n,s){if(n&&n.length>0)return n;let e=["src/components/ui","app/components/ui","components/ui"];for(let r of e)if(d(o.join(t,r)))return r.replace(/\/ui$/,"");let a=["src/components","app/components","components"];for(let r of a)if(d(o.join(t,r)))return r;if(s){let r=s["@/*"]??s["~/*"]??[];if(Array.isArray(r)&&r.some(i=>/^\.?\/?src\//.test(i)))return"src/components";if(Array.isArray(r)&&r.some(i=>/^\.?\/?app\//.test(i)))return"app/components"}return d(o.join(t,"src"))?"src/components":d(o.join(t,"app"))?"app/components":"components"}async function Pt(t,n,s,e){let a=e?.utils??(e?.lib?`${e.lib.replace(/\/+$/,"")}/utils`:void 0);if(a&&a.trim().length>0){let c=R(yt(a)),p=R(et(a));for(let w of X(p))if(d(o.join(t,w)))return{utilsImportPath:c,utilsFilePath:w};return{utilsImportPath:c,utilsFilePath:`${p}.ts`}}let r=bt(n),i=r?`${r}/lib/utils`:"lib/utils",g=Array.from(new Set([i,"src/lib/utils","app/lib/utils","lib/utils"]));for(let c of g)for(let p of X(c))if(d(o.join(t,p)))return{utilsImportPath:`${s}lib/utils`,utilsFilePath:p};return{utilsImportPath:`${s}lib/utils`,utilsFilePath:`${i}.ts`}}function K(t,n,s){let e=i=>{let g=i.startsWith("/"),c=i.endsWith("/"),p=i.split("/").filter(Boolean),w=[];for(let x of p)w[w.length-1]!==x&&w.push(x);let v=w.join("/");return`${g?"/":""}${v}${c?"/":""}`},a=n.replace(/\/+$/,""),r=t.replace(/^\.?\//,"");if(tt.test(r))return e(s);if(r.startsWith("components/")){let i=r.slice(10);return e(`${a}${i}`.replace(/^\//,""))}if(r.startsWith("lib/")){if(a.startsWith("src/"))return e(`src/${r}`);if(a.startsWith("app/"))return e(`app/${r}`)}if(r.startsWith("hooks/")){if(a.startsWith("src/"))return e(`src/${r}`);if(a.startsWith("app/"))return e(`app/${r}`)}return r.startsWith("ui/")?e(`${a}/${r}`):e(r)}function D(t,n){let s=n.startsWith("~/")?"~/":"@/",e=t;return e=e.replace(/@\/registry\/default\/components\//g,`${s}components/`),e=e.replace(/@\/registry\/default\/ui\//g,`${s}components/ui/`),e=e.replace(/@\/registry\/default\/hooks\//g,`${s}hooks/`),e=e.replace(/@\/registry\/default\/lib\//g,`${s}lib/`),e=e.replace(/@loveui\/ui\/ui\//g,`${s}components/ui/`),e=e.replace(/@loveui\/ui\/lib\//g,`${s}lib/`),e=e.replace(/@\/ui\//g,`${s}components/ui/`),e=e.replace(/@\/registry\/building-blocks\/default\/components\//g,`${s}components/`),e=e.replace(/@\/registry\/building-blocks\/default\/ui\//g,`${s}components/ui/`),e=e.replace(/@\/registry\/building-blocks\/default\/lib\//g,`${s}lib/`),e=e.replace(/@\/registry\/building-blocks\/default\/hooks\//g,`${s}hooks/`),e=e.replace(/@\/registry\/default\/components\//g,`${s}components/`),e=e.replace(/@\/registry\/default\/ui\//g,`${s}components/ui/`),e=e.replace(/@\/registry\/default\/lib\//g,`${s}lib/`),e=e.replace(/@\/registry\/default\/hooks\//g,`${s}hooks/`),e=e.replace(/from\s+["']@loveui\/ui\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["']@loveui\/shadcn-ui\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["']@love-ui\/shadcn-ui\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["']@\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["']~\/lib\/utils["']/g,`from "${n}"`),e=e.replace(/from\s+["'](?:\.\.\/)+ui\/src\/lib\/utils["']/g,`from "${n}"`),e}async function Rt(t,n){if(d(o.join(t,n)))return!1;let s=ft,e=o.join(E,"love-ui","src","lib","utils.ts");if(d(e))try{s=await y(e,"utf8")}catch{}return await I(n,t),await C(o.join(t,n),s,"utf8"),!0}async function Ft(t){let s=["app/globals.css","app/global.css","src/app/globals.css","src/app/global.css","styles/globals.css","src/styles/globals.css","globals.css","global.css"].find(c=>d(o.join(t,c)));s||(d(o.join(t,"src","app"))?s="src/app/globals.css":d(o.join(t,"app"))?s="app/globals.css":d(o.join(t,"src"))?s="src/styles/globals.css":s="globals.css");let e=o.join(t,s),a=d(e),r=a?await y(e,"utf8"):"",i=!1;/@import\s+["']tailwindcss["']/.test(r)||(r=`@import "tailwindcss";
${r?`
${r}`:""}`,i=!0),r.includes(mt)||(r=`${r.trimEnd()}

${ht}`,i=!0),(!a||i)&&(await I(s,t),await C(e,r,"utf8"));let g=await Ct(t,s);return{path:s,created:!a,updated:i,imported:g}}async function Ct(t,n){let e=["app/layout.tsx","app/layout.jsx","src/app/layout.tsx","src/app/layout.jsx"].find(c=>d(o.join(t,c)));if(!e)return!1;let a=o.join(t,e),r=await y(a,"utf8"),i=Dt(o.dirname(e),n);if(r.includes(`"${i}"`)||r.includes(`'${i}'`))return!1;let g=`import "${i}";
${r}`;return await C(a,g,"utf8"),!0}function Dt(t,n){let s=o.posix.relative(t||".",n);return s.startsWith(".")||(s=`./${s}`),s}async function I(t,n){let s=o.dirname(o.join(n,t));await A(s,{recursive:!0})}async function Et(t,n){let s=o.join(t,"package.json"),e={};try{let c=await y(s,"utf8");e=JSON.parse(c)}catch{}let a=kt(e),r=z(n),i=[];async function g(c,p){let w=await it(c,{withFileTypes:!0});for(let v of w){if(Q.has(v.name))continue;let x=o.join(c,v.name);if(v.isDirectory()){await g(x,p);continue}let T=o.extname(v.name);if(!dt.has(T)||v.name==="package.json")continue;let F=o.relative(p,x).split(o.sep).join("/"),{target:j}=$t(F,a,r),m=await y(x,"utf8");i.push({path:F,target:j,content:m})}}return await g(t,t),i}async function Y(t,n){let s=o.join(_,"default","ui",`${t}.tsx`);if(d(s))try{let r=D(await y(s,"utf8"),n),i=[{path:`default/ui/${t}.tsx`,target:`components/ui/${t}.tsx`,content:r}];if(t==="toast"){let g=["toast-gooey.tsx","toast-gooey-renderer.tsx","toast-gooey-icons.tsx","toast-gooey-types.ts","toast-gooey.css"];for(let c of g){let p=o.join(_,"default","ui",c);d(p)&&i.push({path:`default/ui/${c}`,target:`components/ui/${c}`,content:await y(p,"utf8")})}}return i}catch(r){console.warn(`Warning: unable to read ${t} from bundled registry`,r)}let e=o.join(E,"love-ui"),a=o.join(e,"src","ui",`${t}.tsx`);if(!d(a))return null;try{let r=[],i=await y(a,"utf8");i=D(i,n),r.push({path:`src/ui/${t}.tsx`,target:`components/ui/${t}.tsx`,content:i});let g=o.join(e,"src","lib","utils.ts");if(d(g)){let c=await y(g,"utf8");r.push({path:"src/lib/utils.ts",target:"lib/utils.ts",content:c})}return r}catch(r){return console.warn(`Warning: unable to read ${t} component`,r),null}}async function Tt(t,n){if(Z.has(t))return await Y(t,n);let s=o.join(_,"default","examples",`${t}.tsx`);if(d(s))try{let r=await y(s,"utf8"),i=[],g=Array.from(new Set([...r.matchAll(/@\/registry\/default\/ui\/([^"']+)/g)].map(c=>c[1]).filter(Boolean)));for(let c of g){let p=await Y(c,n);p&&i.push(...p)}return i.push({path:`default/examples/${t}.tsx`,target:`components/${t}.tsx`,content:D(r,n)}),i}catch(r){return console.warn(`Warning: unable to read ${t} from bundled registry examples`,r),null}let e=N(t),a=o.join(E,e);if(!d(a))return null;try{return await Et(a,t)}catch(r){return console.warn(`Warning: unable to read bundled sources for ${t}`,r),null}}async function St(t){let n=N(t),s=o.join(E,n);return!d(s)||!d(o.join(s,"SKILL.md"))?null:s}function nt(){let t=process.env.CODEX_HOME?.trim();return t||o.join(at.homedir(),".codex")}async function Ut(t){let n=await St(t);if(!n)return"missing";let s=nt(),e=o.join(s,"skills"),a=z(t),r=o.join(e,a);return await A(e,{recursive:!0}),d(r)?"exists":(await ot(n,r,{recursive:!0,force:!1,filter:i=>{let g=o.basename(i);return!Q.has(g)}}),"installed")}var Ot={"@base-ui-components/react":"1.0.0-beta.4","class-variance-authority":"^0.7.1",clsx:"^2.1.1","lucide-react":"^1.16.0","tailwind-merge":"^3.3.1"};async function Wt(t){if(Z.has(t)||d(o.join(_,"default","examples",`${t}.tsx`)))return{...Ot};let n=N(t),s=o.join(E,n,"package.json");try{let e=await y(s,"utf8");return JSON.parse(e).dependencies??{}}catch{return{}}}async function Lt(t){return d(o.join(t,"bun.lockb"))?"bun":d(o.join(t,"pnpm-lock.yaml"))?"pnpm":d(o.join(t,"yarn.lock"))?"yarn":"npm"}async function At(t,n,s){let e=Object.entries(t);if(e.length===0)return!0;console.log(`
Installing dependencies...`);let a=e.map(([g,c])=>`${g}@${c}`),r;switch(n){case"bun":r=`bun add ${a.join(" ")}`;break;case"pnpm":r=`pnpm add ${a.join(" ")}`;break;case"yarn":r=`yarn add ${a.join(" ")}`;break;default:r=`npm install ${a.join(" ")}`}let i=rt(r,{stdio:"inherit",shell:!0,cwd:s});return i.error||i.status!==0?(console.warn(`
Failed to install dependencies. You may need to install them manually:`),console.warn(`  ${a.join(`
  `)}`),!1):(console.log(`Dependencies installed successfully!
`),!0)}async function _t(t=process.argv.slice(2)){(t.length===0||t.length===1&&(t[0]==="--version"||t[0]==="-v"))&&(console.log("love-ui version 1.1.9"),process.exit(0)),(t.length<2||t[0]!=="add")&&(console.log("Usage: npx love-ui add [...packages]"),console.log("       npx love-ui --version"),process.exit(1));let n=t.slice(1),s=process.cwd(),e=await wt(s),a=await vt(s),r=e?.components?et(e.components):null,i=await jt(s,r,a),g=xt(e?.components,a),{utilsImportPath:c,utilsFilePath:p}=await Pt(s,i,g,e),w=await Lt(s),v=i.endsWith("/ui")?i:`${i}/ui`,x=!1,T=!1,F=!1,j={};for(let m of n){if(!m.trim())continue;console.log(`
Adding ${m}...`);let G=await Ut(m);if(G==="installed"){console.log(`\u2713 Installed skill "${m}" to ${o.join(nt(),"skills",z(m))}`),console.log("Restart Codex to pick up new skills.");continue}if(G==="exists"){console.log(`\u2713 Skill "${m}" is already installed.`),console.log("Restart Codex if you do not see it yet.");continue}if(x||(await A(o.join(s,i),{recursive:!0}),await A(o.join(s,v),{recursive:!0}),x=!0),!F){let l=await Ft(s);l.created?console.log(`\u2713 Created ${l.path}`):l.updated&&console.log(`\u2713 Updated ${l.path}`),l.imported&&console.log(`\u2713 Imported ${l.path} from app layout`),F=!0}T=!0;let f=null,J=null;if(m.startsWith("http://")||m.startsWith("https://")){let l=m;l.includes("/building-blocks/r/")&&(l=l.replace("/building-blocks/r/","/building-blocks/"),console.log(`Auto-corrected URL to: ${l}`));try{let u=await fetch(l);u.ok?f=await u.json():console.warn(`Failed to fetch ${l}: HTTP ${u.status}`)}catch(u){console.warn(`Failed to fetch from ${l}:`,u)}}else{let l=new URL(`r/${m}.json`,"https://www.loveui.dev/");try{let u=await fetch(l);u.ok&&(f=await u.json())}catch{}J=await Tt(m,c)}let P=J??f?.files??[];P=P.map(l=>{let u=l.target||l.path;return u.startsWith("registry/default/")&&(u=u.replace("registry/default/","")),{...l,target:u}});let S=P.find(l=>l.target.match(/^components\/comp-\d+\.tsx$/));if(S){let l=P.filter(u=>u.target.match(/^components\/[^/]+\//)&&u.target!==S.target);if(l.length>0&&l[0]){let u=l[0].target.match(/^components\/([^/]+)\//);if(u&&u[1]){let h=u[1];S.target=`components/${h}-demo.tsx`}}else if(f?.meta?.tags&&Array.isArray(f.meta.tags)&&f.meta.tags.length>0){let h=f.meta.tags.slice(0,2).filter(k=>k.length>0);if(h.length>0){let k=h.join("-").toLowerCase().replace(/\s+/g,"-");S.target=`components/${k}.tsx`}}}if(!P.length){console.warn(`Component "${m}" not found. Available components can be found at https://loveui.dev`);continue}P.some(l=>tt.test(l.target)||typeof l.content=="string"&&pt.test(l.content))&&await Rt(s,p);let U=0,O=0;for(let l of P){if(!l.content)continue;let u=K(l.target,i,p),h=o.join(s,u),k=d(h);if(R(u)===R(p)&&k)continue;let L=D(l.content,c);if(k)try{if(await y(h,"utf8")===L)continue}catch{}await I(u,s),await C(h,L,"utf8"),k?O++:U++}if(U>0&&console.log(`\u2713 Created ${U} file${U>1?"s":""}`),O>0&&console.log(`\u2713 Updated ${O} file${O>1?"s":""}`),f?.registryDependencies&&f.registryDependencies.length>0){console.log(`
Installing ${f.registryDependencies.length} required component${f.registryDependencies.length>1?"s":""}...`);for(let l of f.registryDependencies){let u=l;l.startsWith("https://loveui.dev/building-blocks/r/")&&(u=`https://ui.loveui.dev/ui/r/${l.split("/").pop()}`);try{let h=await fetch(u);if(h.ok){let k=await h.json(),L=(k?.files??[]).map(b=>{let $=b.target||b.path;return $.startsWith("registry/default/")&&($=$.replace("registry/default/","")),{...b,target:$}});for(let b of L){if(!b.content)continue;let $=K(b.target,i,p),M=o.join(s,$),H=d(M);if(R($)===R(p)&&H)continue;let V=D(b.content,c);if(H)try{if(await y(M,"utf8")===V)continue}catch{}await I($,s),await C(M,V,"utf8")}let B=["@loveui/shadcn-ui","jotai","lucide-react","react","react-dom"];if(k?.dependencies)if(Array.isArray(k.dependencies))k.dependencies.forEach(b=>{B.includes(b)||(j[b]="latest")});else{let b=k.dependencies;Object.keys(b).forEach($=>{!B.includes($)&&b[$]&&(j[$]=b[$])})}}else console.warn(`  \u2717 Failed to fetch ${u}: HTTP ${h.status}`)}catch(h){console.warn(`  \u2717 Failed to install ${u}:`,h.message)}}console.log("\u2713 Installed registry dependencies")}let W={};f?.dependencies?Array.isArray(f.dependencies)?f.dependencies.forEach(l=>{W[l]="latest"}):W=f.dependencies:W=await Wt(m),Object.assign(j,W)}Object.keys(j).length>0&&await At(j,w,s),console.log(T?`
\u2713 Done! You can now import and use the components in your app.`:`
\u2713 Done! Skill installation complete.`)}var It=process.argv[1]&&(import.meta.url===lt(process.argv[1]).href||process.argv[1].includes("love-ui")||process.argv[1].includes("loveui"));It&&_t().catch(t=>{console.error(t),process.exit(1)});export{_t as run};
