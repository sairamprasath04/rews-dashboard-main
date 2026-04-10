// Comprehensive pre-build patcher for stale Vercel cached App.js
const fs = require("fs");
const path = require("path");

const appPath = path.join(__dirname, "..", "src", "App.js");
let src = fs.readFileSync(appPath, "utf8");
let changed = false;

// ── 1. Rename API_BASE_URL → BACKEND_URL ─────────────────────────────────────
if (src.includes("API_BASE_URL")) {
  // Replace all occurrences
  src = src.replace(/API_BASE_URL/g, "BACKEND_URL");
  // Fix the value assignment to be safe (no throw)
  src = src.replace(
    /const BACKEND_URL\s*=\s*process\.env\.REACT_APP_API_URL;\s*\n(\s*if\s*\(!BACKEND_URL\)\s*\{[^}]*\}\s*\n)?/g,
    'const BACKEND_URL = process.env.REACT_APP_API_URL || "";\n'
  );
  console.log("fix-app.js: renamed API_BASE_URL → BACKEND_URL");
  changed = true;
}

// ── 2. Remove duplicate const BACKEND_URL declarations ───────────────────────
const dupes = src.match(/const BACKEND_URL\b/g);
if (dupes && dupes.length > 1) {
  let first = true;
  src = src.replace(
    /const BACKEND_URL\s*=\s*[^\n]+\n(\n?if\s*\(!BACKEND_URL\)\s*\{[^}]*\}\n)?/g,
    (match) => {
      if (first) { first = false; return match; }
      return "";
    }
  );
  console.log(`fix-app.js: removed ${dupes.length - 1} duplicate BACKEND_URL declaration(s)`);
  changed = true;
}

// ── 3. Inject Specialist into NAV array if missing ────────────────────────────
if (!src.includes('"specialist"') && !src.includes("'specialist'")) {
  // Add specialist entry before settings in the NAV array
  src = src.replace(
    /(\{id:"settings",icon:"[^"]*",label:"Settings"\})/,
    '{id:"specialist",icon:"🩺",label:"Specialist"},$1'
  );
  // Add to PAGE_TITLES
  src = src.replace(
    /(settings\s*:\s*"Settings")/,
    'specialist:"Specialist Referrals",$1'
  );
  // Add to renderPage switch (before the settings case)
  src = src.replace(
    /(case "settings":)/,
    'case "specialist":return <PageSpecialist addToast={addToast}/>;$1'
  );
  console.log("fix-app.js: injected specialist tab into NAV, PAGE_TITLES, and renderPage");
  changed = true;
}

// ── 4. Inject PageSpecialist component if missing ────────────────────────────
if (!src.includes("function PageSpecialist")) {
  const specialistComponent = `
// ─── Specialist Referrals ─────────────────────────────────────────────────────
function PageSpecialist({addToast}){
  const v=useVisible(50);
  const highRisk=PATIENTS.filter(p=>p.risk_tier==="HIGH");
  const [sent,setSent]=React.useState({});
  function refer(id){
    setSent(s=>({...s,[id]:true}));
    addToast && addToast("Referral sent","success");
  }
  return(
    <div style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      <div style={{marginBottom:20,padding:"16px 20px",background:"#EFF6FF",borderRadius:12,border:"1px solid #BFDBFE",fontSize:13,color:"#1e40af"}}>
        <strong>Specialist Referral Queue</strong> — {highRisk.length} high-risk patients flagged for specialist review.
      </div>
      {highRisk.slice(0,10).map((p,i)=>(
        <div key={p.id} style={{background:"#fff",borderRadius:12,border:"1px solid #e5e7eb",padding:"16px 20px",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between",opacity:v?1:0,transform:v?"translateY(0)":"translateY(10px)",transition:\`opacity 0.4s ease \${i*50}ms,transform 0.4s ease \${i*50}ms\`}}>
          <div>
            <div style={{fontWeight:600,fontSize:14,color:"#111827"}}>{p.name}</div>
            <div style={{fontSize:12,color:"#6b7280",marginTop:2}}>{p.diagnosis} · Age {p.age} · {p.risk_tier} risk</div>
          </div>
          <button onClick={()=>refer(p.id)} disabled={sent[p.id]} style={{padding:"7px 16px",borderRadius:8,border:"none",background:sent[p.id]?"#d1fae5":"#0ea5e9",color:sent[p.id]?"#065f46":"#fff",fontWeight:600,fontSize:13,cursor:sent[p.id]?"default":"pointer"}}>
            {sent[p.id]?"Referred ✓":"Refer"}
          </button>
        </div>
      ))}
    </div>
  );
}

`;
  // Insert before the NAV definition
  src = src.replace(
    /\nconst NAV=\[/,
    specialistComponent + "\nconst NAV=["
  );
  console.log("fix-app.js: injected PageSpecialist component");
  changed = true;
}

if (!changed) {
  console.log("fix-app.js: nothing to patch.");
}

fs.writeFileSync(appPath, src, "utf8");
console.log("fix-app.js: done.");
