import { useState, useEffect } from "react";

const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const T = {
  navy:"#0F172A",navyMid:"#1E293B",navyLight:"#334155",
  white:"#FFFFFF",sky:"#0EA5E9",skyLight:"#E0F2FE",
  red:"#EF4444",redLight:"#FEE2E2",amber:"#F59E0B",amberLight:"#FEF3C7",
  green:"#10B981",greenLight:"#D1FAE5",slateBg:"#F1F5F9",
  muted:"#64748B",border:"#E2E8F0",text:"#0F172A",textLight:"#F8FAFC",
};

const PATIENTS = [
  {patient_id:"P001",age:82,diagnosis:"Heart Failure | CKD | Hypertension",smoking_status:"former",num_meds:12,ed_visits:4,missed_appts:3,days_since_gp:145,telehealth_6m:"no",lives_alone:"yes",risk_probability:94.2,risk_tier:"HIGH",recommended_intervention:"Home Visit",phone:"0412 345 001"},
  {patient_id:"P002",age:75,diagnosis:"Type 2 Diabetes | COPD | Depression",smoking_status:"current",num_meds:10,ed_visits:3,missed_appts:4,days_since_gp:112,telehealth_6m:"no",lives_alone:"yes",risk_probability:88.7,risk_tier:"HIGH",recommended_intervention:"Home Visit",phone:"0423 456 002"},
  {patient_id:"P003",age:68,diagnosis:"COPD | Hypertension | Heart Failure",smoking_status:"current",num_meds:9,ed_visits:5,missed_appts:2,days_since_gp:98,telehealth_6m:"no",lives_alone:"no",risk_probability:85.1,risk_tier:"HIGH",recommended_intervention:"Telehealth Consult",phone:"0434 567 003"},
  {patient_id:"P004",age:91,diagnosis:"CKD | Asthma | Type 2 Diabetes | COPD",smoking_status:"never",num_meds:13,ed_visits:2,missed_appts:5,days_since_gp:203,telehealth_6m:"yes",lives_alone:"yes",risk_probability:79.4,risk_tier:"HIGH",recommended_intervention:"Telehealth Consult",phone:"0445 678 004"},
  {patient_id:"P005",age:59,diagnosis:"Depression | Type 2 Diabetes | Heart Failure",smoking_status:"current",num_meds:10,ed_visits:7,missed_appts:2,days_since_gp:300,telehealth_6m:"no",lives_alone:"yes",risk_probability:76.8,risk_tier:"HIGH",recommended_intervention:"Home Visit",phone:"0456 789 005"},
  {patient_id:"P006",age:71,diagnosis:"Hypertension | COPD | Heart Failure | CKD",smoking_status:"current",num_meds:9,ed_visits:1,missed_appts:6,days_since_gp:64,telehealth_6m:"no",lives_alone:"no",risk_probability:72.3,risk_tier:"HIGH",recommended_intervention:"Telehealth Consult",phone:"0467 890 006"},
  {patient_id:"P007",age:64,diagnosis:"Type 2 Diabetes | CKD | Hypertension",smoking_status:"never",num_meds:6,ed_visits:3,missed_appts:4,days_since_gp:72,telehealth_6m:"yes",lives_alone:"no",risk_probability:61.5,risk_tier:"MEDIUM",recommended_intervention:"Telehealth Consult",phone:"0478 901 007"},
  {patient_id:"P008",age:78,diagnosis:"CKD | Depression",smoking_status:"never",num_meds:4,ed_visits:1,missed_appts:0,days_since_gp:10,telehealth_6m:"yes",lives_alone:"yes",risk_probability:54.2,risk_tier:"MEDIUM",recommended_intervention:"Telehealth Consult",phone:"0489 012 008"},
  {patient_id:"P009",age:55,diagnosis:"Asthma | Depression",smoking_status:"former",num_meds:5,ed_visits:2,missed_appts:2,days_since_gp:55,telehealth_6m:"yes",lives_alone:"no",risk_probability:47.8,risk_tier:"MEDIUM",recommended_intervention:"Proactive Phone Call",phone:"0491 123 009"},
  {patient_id:"P010",age:83,diagnosis:"Hypertension | Asthma",smoking_status:"never",num_meds:7,ed_visits:3,missed_appts:1,days_since_gp:78,telehealth_6m:"yes",lives_alone:"yes",risk_probability:44.1,risk_tier:"MEDIUM",recommended_intervention:"Proactive Phone Call",phone:"0402 234 010"},
  {patient_id:"P011",age:42,diagnosis:"Type 2 Diabetes",smoking_status:"never",num_meds:1,ed_visits:1,missed_appts:0,days_since_gp:87,telehealth_6m:"yes",lives_alone:"no",risk_probability:28.3,risk_tier:"LOW",recommended_intervention:"Proactive Phone Call",phone:"0413 345 011"},
  {patient_id:"P012",age:33,diagnosis:"Asthma",smoking_status:"never",num_meds:1,ed_visits:1,missed_appts:1,days_since_gp:76,telehealth_6m:"yes",lives_alone:"yes",risk_probability:18.6,risk_tier:"LOW",recommended_intervention:"Proactive Phone Call",phone:"0424 456 012"},
];

const DEFAULT_APPOINTMENTS = [
  {id:1,date:"2026-04-07",time:"09:00",patient:"P001",type:"Telehealth",tier:"HIGH",clinician:"Dr. Sarah Chen",status:"Confirmed"},
  {id:2,date:"2026-04-07",time:"10:30",patient:"P003",type:"In-Person",tier:"HIGH",clinician:"Dr. James Wu",status:"Scheduled"},
  {id:3,date:"2026-04-08",time:"14:00",patient:"P007",type:"Follow-Up",tier:"MEDIUM",clinician:"Dr. Sarah Chen",status:"Pending"},
  {id:4,date:"2026-04-09",time:"11:00",patient:"P002",type:"Telehealth",tier:"HIGH",clinician:"Dr. Priya Sharma",status:"Scheduled"},
  {id:5,date:"2026-04-10",time:"09:30",patient:"P009",type:"In-Person",tier:"MEDIUM",clinician:"Dr. James Wu",status:"Confirmed"},
  {id:6,date:"2026-04-11",time:"15:00",patient:"P011",type:"Follow-Up",tier:"LOW",clinician:"Dr. Sarah Chen",status:"Scheduled"},
];

const DOCTORS = [
  {id:"D001",name:"Dr. Sarah Chen",specialty:"General Practice",phone:"0411 222 333",email:"s.chen@rews.health.au",available:"Mon–Fri 8am–5pm",avatar:"SC"},
  {id:"D002",name:"Dr. James Wu",specialty:"General Medicine",phone:"0422 333 444",email:"j.wu@rews.health.au",available:"Mon–Thu 9am–4pm",avatar:"JW"},
  {id:"D003",name:"Dr. Priya Sharma",specialty:"Chronic Disease Management",phone:"0433 444 555",email:"p.sharma@rews.health.au",available:"Tue–Sat 8am–6pm",avatar:"PS"},
];

const DEMO_PATIENT_ID = "P001";
const BACKEND_URL = process.env.REACT_APP_API_URL || "";

async function getPrediction(payload) {
  try {
    if (!BACKEND_URL) {
      console.warn("REACT_APP_API_URL not set — prediction unavailable");
      return null;
    }
    const res = await fetch(`${BACKEND_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    console.log("Predict status:", res.status);
    console.log("Predict body:", text);

    if (!res.ok) {
      throw new Error(`Prediction failed: ${res.status} - ${text}`);
    }

    return JSON.parse(text);
  } catch (err) {
    console.error("getPrediction fetch error:", err);
    throw err;
  }
}

function mapYesNo(value) {
  return String(value).toLowerCase() === "yes" ? 1 : 0;
}

function mapSmoking(value) {
  const map = {
    "never": 0,
    "former": 1,
    "current": 2,
  };
  return map[String(value).toLowerCase()] ?? 0;
}

function buildPredictionPayload(me, profile = {}, symptoms = {}) {
  const age = profile?.age || me.age || 0;
  const livesAlone = mapYesNo(profile?.lives_alone || me.lives_alone);
  const smoking = mapSmoking(profile?.smoking_status || me.smoking_status);

  const hasO2 = symptoms.o2_sat !== "" && symptoms.o2_sat !== null && symptoms.o2_sat !== undefined;
  const hasHr = symptoms.heart_rate !== "" && symptoms.heart_rate !== null && symptoms.heart_rate !== undefined;
  const hasBp = symptoms.systolic_bp !== "" && symptoms.systolic_bp !== null && symptoms.systolic_bp !== undefined;

  return {
    age: Number(age),
    lives_alone: Number(livesAlone),

    o2_sat: hasO2 ? Number(symptoms.o2_sat) : 0,
    heart_rate: hasHr ? Number(symptoms.heart_rate) : 0,
    systolic_bp: hasBp ? Number(symptoms.systolic_bp) : 0,

    o2_sat_missing: hasO2 ? 0 : 1,
    heart_rate_missing: hasHr ? 0 : 1,
    systolic_bp_missing: hasBp ? 0 : 1,

    speech_distress: symptoms.speech_distress ? 1 : 0,
    heart_racing: symptoms.heart_racing ? 1 : 0,
    thunderclap_headache: symptoms.thunderclap_headache ? 1 : 0,

    chest_pain: symptoms.chest_pain ? 1 : 0,
    shortness_of_breath: symptoms.shortness_of_breath ? 1 : 0,
    heavy_bleeding: symptoms.heavy_bleeding ? 1 : 0,
    confusion_drowsy: symptoms.confusion_drowsy ? 1 : 0,

    fever: symptoms.fever ? 1 : 0,
    tiredness: symptoms.tiredness ? 1 : 0,

    bowel_change: symptoms.bowel_change ? 1 : 0,
    sugar_imbalance: symptoms.sugar_imbalance ? 1 : 0,
    joint_stiff_swelling: symptoms.joint_stiff_swelling ? 1 : 0,
    skin_rash: symptoms.skin_rash ? 1 : 0,
    low_mood: symptoms.low_mood ? 1 : 0,
    panic_attacks: symptoms.panic_attacks ? 1 : 0,
    sleep_disturb: symptoms.sleep_disturb ? 1 : 0,

    duration_days: Number(symptoms.duration_days || 1),
    smoking: Number(smoking),
    alcohol: 0,
  };
}
// ─── Helpers ─────────────────────────────────────────────────────────────────
function useAnimatedNumber(target,duration=1200,decimals=0){
  const [val,setVal]=useState(0);
  useEffect(()=>{
    let s=0,step=target/(duration/16);
    const t=setInterval(()=>{s+=step;if(s>=target){setVal(target);clearInterval(t);}else setVal(parseFloat(s.toFixed(decimals)));},16);
    return()=>clearInterval(t);
  },[target,duration,decimals]);
  return val;
}

function useVisible(delay=0){
  const [v,setV]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setV(true),delay);return()=>clearTimeout(t);},[delay]);
  return v;
}

const riskColor=t=>t==="HIGH"?T.red:t==="MEDIUM"?T.amber:T.green;
const riskBg=t=>t==="HIGH"?T.redLight:t==="MEDIUM"?T.amberLight:T.greenLight;
const iIcon={"Home Visit":"🏠","Telehealth Consult":"💻","Proactive Phone Call":"📞"};

// ─── Shared Components ────────────────────────────────────────────────────────
function RiskBadge({tier}){
  return <span style={{display:"inline-block",padding:"2px 9px",borderRadius:10,fontSize:11,fontWeight:700,letterSpacing:"0.05em",background:riskBg(tier),color:riskColor(tier)}}>{tier}</span>;
}

function StatCard({label,value,sub,accent,icon,delay=0,prefix="",suffix="",decimals=0}){
  const v=useVisible(delay);
  const n=useAnimatedNumber(typeof value==="number"?value:0,1200,decimals);
  return(
    <div style={{background:T.white,borderRadius:14,padding:"22px 24px",border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",borderTop:`3px solid ${accent}`,opacity:v?1:0,transform:v?"translateY(0)":"translateY(18px)",transition:`opacity 0.5s ease ${delay}ms,transform 0.5s ease ${delay}ms`,cursor:"default"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 6px 28px rgba(0,0,0,0.1)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)";}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div style={{fontSize:12,color:T.muted,fontWeight:500,letterSpacing:"0.04em",textTransform:"uppercase"}}>{label}</div>
        <div style={{fontSize:20}}>{icon}</div>
      </div>
      <div style={{fontSize:36,fontWeight:700,color:T.text,lineHeight:1,marginBottom:4}}>
        {prefix}{typeof value==="number"?n.toLocaleString():value}{suffix}
      </div>
      {sub&&<div style={{fontSize:12,color:T.muted,fontStyle:"italic"}}>{sub}</div>}
    </div>
  );
}

function HBar({label,value,max,color,count,delay=0}){
  const [w,setW]=useState(0);
  useEffect(()=>{setTimeout(()=>setW((value/max)*100),delay);},[value,max,delay]);
  return(
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
        <span style={{fontSize:13,color:T.text,fontWeight:500}}>{label}</span>
        <span style={{fontSize:12,color:T.muted}}>{count}{typeof count==="number"?` (${Math.round(value)}%)`:""}</span>
      </div>
      <div style={{height:8,background:T.slateBg,borderRadius:4,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${w}%`,background:color,borderRadius:4,transition:`width 0.9s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms`}}/>
      </div>
    </div>
  );
}

function RiskRing({pct,size=140,stroke=12,color,animate=true}){
  const r=(size-stroke)/2,circ=2*Math.PI*r;
  const [off,setOff]=useState(circ);
  useEffect(()=>{if(animate)setTimeout(()=>setOff(circ-(pct/100)*circ),200);},[pct,circ,animate]);
  return(
    <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.slateBg} strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" style={{transition:animate?"stroke-dashoffset 1.4s cubic-bezier(0.34,1.56,0.64,1)":"none"}}/>
    </svg>
  );
}

function Modal({title,children,onClose}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.6)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(3px)"}} onClick={onClose}>
      <div style={{background:T.white,borderRadius:18,padding:"32px 36px",width:460,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <div style={{fontSize:17,fontWeight:700,color:T.text}}>{title}</div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:T.muted}}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Toast Notifications ──────────────────────────────────────────────────────
function ToastContainer({toasts}){
  return(
    <div style={{position:"fixed",bottom:28,right:28,zIndex:2000,display:"flex",flexDirection:"column",gap:10,pointerEvents:"none"}}>
      {toasts.map(t=>(
        <div key={t.id} style={{background:t.type==="error"?T.red:t.type==="warn"?T.amber:T.navy,color:T.white,padding:"13px 20px",borderRadius:12,fontSize:13,fontWeight:500,boxShadow:"0 8px 32px rgba(0,0,0,0.18)",maxWidth:340,animation:"toastIn 0.3s ease",display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:16}}>{t.type==="error"?"❌":t.type==="warn"?"⚠️":"✅"}</span>
          <span>{t.msg}</span>
        </div>
      ))}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ─── Login / Registration Page ────────────────────────────────────────────────
function PageLogin({onLogin}){
  const [tab,setTab]=useState("login");
  const [role,setRole]=useState("doctor");
  const [form,setForm]=useState({name:"",email:"",password:""});
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  const DEMO={
    doctor:{email:"doctor@rews.health.au",password:"demo1234",name:"Dr. Sarah Chen"},
    patient:{email:"patient@rews.health.au",password:"demo1234",name:"Pat One"},
  };

  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  function getUsers(){
    try{ return JSON.parse(localStorage.getItem("rews_users")||"[]"); }catch{ return []; }
  }
  function saveUsers(u){ localStorage.setItem("rews_users",JSON.stringify(u)); }

  function handleLogin(e){
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(()=>{
      const users=getUsers();
      // check demo accounts
      const demo=DEMO[role];
      if(form.email===demo.email&&form.password===demo.password){
        const extra=role==="patient"?{patient_id:DEMO_PATIENT_ID}:{};
        onLogin({name:demo.name,email:form.email,role,...extra});
      } else {
        const user=users.find(u=>u.email===form.email&&u.password===form.password&&u.role===role);
        if(user){ onLogin(user); }
        else { setError("Invalid email or password for selected role."); }
      }
      setLoading(false);
    },600);
  }

  function handleRegister(e){
    e.preventDefault();
    setError("");
    if(!form.name||!form.email||!form.password){ setError("All fields are required."); return; }
    if(form.password.length<6){ setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setTimeout(()=>{
      const users=getUsers();
      if(users.find(u=>u.email===form.email)){ setError("An account with this email already exists."); setLoading(false); return; }
      const extra=role==="patient"?{patient_id:DEMO_PATIENT_ID}:{};
      const newUser={name:form.name,email:form.email,password:form.password,role,...extra};
      saveUsers([...users,newUser]);
      onLogin(newUser);
      setLoading(false);
    },600);
  }

  const inp={width:"100%",padding:"11px 14px",borderRadius:9,border:`1.5px solid ${T.border}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box",color:T.text,transition:"border-color 0.15s"};

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg, ${T.navy} 0%, #1a2d4a 60%, #0c1f35 100%)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"DM Sans,sans-serif"}}>
      <div style={{width:420,background:T.white,borderRadius:20,boxShadow:"0 24px 80px rgba(0,0,0,0.35)",overflow:"hidden"}}>
        {/* Header */}
        <div style={{background:T.navy,padding:"32px 36px 28px",textAlign:"center"}}>
          <div style={{fontSize:42,fontWeight:700,color:T.white,letterSpacing:"-0.03em",lineHeight:1}}>TriSyd</div>
          <div style={{fontSize:11,color:T.sky,letterSpacing:"0.14em",textTransform:"uppercase",marginTop:5,fontWeight:500}}>Early Warning System</div>
        </div>
        {/* Tabs */}
        <div style={{display:"flex",borderBottom:`1px solid ${T.border}`}}>
          {["login","register"].map(t=>(
            <button key={t} onClick={()=>{setTab(t);setError("");}} style={{flex:1,padding:"14px",background:"none",border:"none",fontFamily:"inherit",fontSize:14,fontWeight:tab===t?700:400,color:tab===t?T.sky:T.muted,cursor:"pointer",borderBottom:`2px solid ${tab===t?T.sky:"transparent"}`,transition:"all 0.15s"}}>
              {t==="login"?"Sign In":"Create Account"}
            </button>
          ))}
        </div>
        {/* Form */}
        <div style={{padding:"28px 36px 32px"}}>
          {/* Role selector */}
          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,color:T.muted,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:8}}>I am a</div>
            <div style={{display:"flex",gap:10}}>
              {["doctor","patient"].map(r=>(
                <button key={r} onClick={()=>setRole(r)} style={{flex:1,padding:"10px",borderRadius:10,border:`2px solid ${role===r?T.sky:T.border}`,background:role===r?T.skyLight:"none",color:role===r?T.sky:T.muted,fontFamily:"inherit",fontSize:14,fontWeight:role===r?700:400,cursor:"pointer",transition:"all 0.15s"}}>
                  {r==="doctor"?"👨‍⚕️ Doctor":"🧑 Patient"}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={tab==="login"?handleLogin:handleRegister}>
            {tab==="register"&&(
              <div style={{marginBottom:14}}>
                <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:5}}>Full Name</div>
                <input value={form.name} onChange={set("name")} placeholder="Your full name" style={inp}
                  onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
              </div>
            )}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:5}}>Email</div>
              <input type="email" value={form.email} onChange={set("email")} placeholder={DEMO[role].email} style={inp}
                onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
            </div>
            <div style={{marginBottom:20}}>
              <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:5}}>Password</div>
              <input type="password" value={form.password} onChange={set("password")} placeholder="••••••••" style={inp}
                onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
            </div>
            {error&&<div style={{padding:"10px 14px",borderRadius:9,background:T.redLight,color:T.red,fontSize:13,fontWeight:500,marginBottom:16}}>{error}</div>}
            <button type="submit" disabled={loading} style={{width:"100%",padding:"12px",borderRadius:10,background:loading?"#94a3b8":T.sky,border:"none",color:T.white,fontSize:15,fontWeight:700,cursor:loading?"not-allowed":"pointer",fontFamily:"inherit",transition:"background 0.15s"}}>
              {loading?"Please wait…":tab==="login"?"Sign In →":"Create Account →"}
            </button>
          </form>

          {tab==="login"&&(
            <div style={{marginTop:18,padding:"12px 14px",borderRadius:9,background:T.slateBg,fontSize:12,color:T.muted}}>
              <strong style={{color:T.text}}>Demo credentials:</strong><br/>
              Doctor: {DEMO.doctor.email} / demo1234<br/>
              Patient: {DEMO.patient.email} / demo1234
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function PageDashboard({onNavigate}){
  const high=PATIENTS.filter(p=>p.risk_tier==="HIGH").length;
  const med=PATIENTS.filter(p=>p.risk_tier==="MEDIUM").length;
  const low=PATIENTS.filter(p=>p.risk_tier==="LOW").length;
  const avgGP=Math.round(PATIENTS.reduce((s,p)=>s+p.days_since_gp,0)/PATIENTS.length);
  const urgent=PATIENTS.filter(p=>p.risk_tier==="HIGH").slice(0,5);
  const v=useVisible(50);
  const sparkDays=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const sparkData=[{h:8,m:4,l:3},{h:9,m:5,l:2},{h:7,m:6,l:3},{h:10,m:4,l:2},{h:11,m:3,l:2},{h:9,m:5,l:3},{h:high,m:med,l:low}];

  return(
    <div>
      <div style={{marginBottom:28,opacity:v?1:0,transform:v?"translateY(0)":"translateY(12px)",transition:"opacity 0.4s,transform 0.4s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
          <span style={{fontSize:12,color:T.muted,fontWeight:500}}>Quick jump:</span>
          {[{label:"👥 Patients",page:"patients"},{label:"⚠️ Active Alerts",page:"alerts"},{label:"📅 Schedule",page:"schedule"},{label:"📊 Analytics",page:"analytics"}].map(item=>(
            <button key={item.page} onClick={()=>onNavigate(item.page)} style={{padding:"6px 14px",borderRadius:20,border:`1.5px solid ${T.border}`,background:T.white,color:T.text,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}
              onMouseEnter={e=>{e.target.style.borderColor=T.sky;e.target.style.color=T.sky;}}
              onMouseLeave={e=>{e.target.style.borderColor=T.border;e.target.style.color=T.text;}}
            >{item.label}</button>
          ))}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16,marginBottom:28}}>
        <StatCard label="Total Patients" value={PATIENTS.length} icon="👥" accent={T.sky} delay={0} sub="Active monitoring"/>
        <StatCard label="High Risk" value={high} icon="🚨" accent={T.red} delay={80} sub="Urgent outreach needed"/>
        <StatCard label="Assigned Today" value={3} icon="✅" accent={T.green} delay={160} sub="Interventions logged"/>
        <StatCard label="Active Alerts" value={high+Math.floor(med/2)} icon="⚠️" accent={T.amber} delay={240} sub="Requiring action"/>
        <StatCard label="Avg Days Since GP" value={avgGP} icon="📅" accent={T.sky} delay={320} sub="Cohort average"/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr",gap:20}}>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",overflow:"hidden",opacity:v?1:0,transform:v?"translateY(0)":"translateY(18px)",transition:"opacity 0.5s ease 400ms,transform 0.5s ease 400ms"}}>
            <div style={{padding:"16px 22px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:700,fontSize:14,color:T.text}}>🚨 Recent Alerts</div>
              <button onClick={()=>onNavigate("alerts")} style={{fontSize:12,color:T.sky,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>View all →</button>
            </div>
            {urgent.map((p,i)=>(
              <div key={p.patient_id} style={{padding:"14px 22px",borderBottom:i<urgent.length-1?`1px solid ${T.border}`:"none",display:"flex",alignItems:"center",gap:14,opacity:v?1:0,transform:v?"translateX(0)":"translateX(-12px)",transition:`opacity 0.4s ease ${500+i*60}ms,transform 0.4s ease ${500+i*60}ms`}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    <span style={{fontWeight:700,color:T.text,fontSize:14}}>{p.patient_id}</span>
                    <RiskBadge tier={p.risk_tier}/>
                    <span style={{fontSize:11,color:T.muted}}>{p.age}y</span>
                  </div>
                  <div style={{fontSize:12,color:T.muted}}>
                    {p.days_since_gp>90?`No GP contact in ${p.days_since_gp} days`:""}{p.missed_appts>=3?` · ${p.missed_appts} missed appointments`:""}{p.ed_visits>=4?` · ED visit spike (${p.ed_visits}×)`:""}
                  </div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>window.open(`tel:${p.phone.replace(/\s/g,"")}`)} style={{padding:"6px 12px",borderRadius:8,background:T.sky,border:"none",color:T.white,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Contact Now</button>
                  <button onClick={()=>onNavigate("patients")} style={{padding:"6px 12px",borderRadius:8,background:"none",border:`1px solid ${T.border}`,color:T.muted,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>View</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"20px 24px",opacity:v?1:0,transition:"opacity 0.5s ease 600ms"}}>
            <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>7-Day Risk Trend</div>
            <div style={{display:"flex",gap:8,alignItems:"flex-end",height:80}}>
              {sparkData.map((d,i)=>{
                const total=d.h+d.m+d.l;
                return(
                  <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                    <div style={{width:"100%",display:"flex",flexDirection:"column",gap:1,height:64}}>
                      {[{v:d.h,c:T.red},{v:d.m,c:T.amber},{v:d.l,c:T.green}].map((s,j)=>(
                        <div key={j} style={{flex:s.v/total,background:s.c,borderRadius:j===0?"3px 3px 0 0":j===2?"0 0 3px 3px":"0",minHeight:2}}/>
                      ))}
                    </div>
                    <div style={{fontSize:10,color:T.muted,marginTop:4}}>{sparkDays[i]}</div>
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",gap:16,marginTop:12}}>
              {[{c:T.red,l:"HIGH"},{c:T.amber,l:"MEDIUM"},{c:T.green,l:"LOW"}].map(item=>(
                <div key={item.l} style={{display:"flex",alignItems:"center",gap:5}}>
                  <div style={{width:10,height:10,borderRadius:2,background:item.c}}/>
                  <span style={{fontSize:11,color:T.muted}}>{item.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"20px 24px",opacity:v?1:0,transition:"opacity 0.5s ease 480ms"}}>
            <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>Risk Distribution</div>
            <HBar label="HIGH Risk" value={high/PATIENTS.length*100} max={100} color={T.red} count={high} delay={600}/>
            <HBar label="MEDIUM Risk" value={med/PATIENTS.length*100} max={100} color={T.amber} count={med} delay={700}/>
            <HBar label="LOW Risk" value={low/PATIENTS.length*100} max={100} color={T.green} count={low} delay={800}/>
          </div>

          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"20px 24px",opacity:v?1:0,transition:"opacity 0.5s ease 560ms"}}>
            <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:16}}>Quick Actions</div>
            {[{label:"👥 Add New Patient",color:T.sky},{label:"🤖 Run Risk Model",color:T.navy},{label:"📄 Export Report",color:T.green}].map((a,i)=>(
              <button key={i} style={{display:"block",width:"100%",padding:"10px 16px",borderRadius:9,background:a.color,border:"none",color:T.white,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginBottom:i<2?10:0,textAlign:"left",transition:"opacity 0.15s"}}
                onMouseEnter={e=>e.target.style.opacity="0.88"} onMouseLeave={e=>e.target.style.opacity="1"}
              >{a.label}</button>
            ))}
          </div>

          <div style={{background:T.navy,borderRadius:14,padding:"20px 24px",opacity:v?1:0,transition:"opacity 0.5s ease 640ms"}}>
            <div style={{fontWeight:700,fontSize:13,color:T.textLight,marginBottom:14,letterSpacing:"0.05em",textTransform:"uppercase"}}>System Status</div>
            {[{label:"Model",val:"Random Forest"},{label:"AUC Score",val:"0.749"},{label:"Last Run",val:"Today 11:52"},{label:"Data Freshness",val:"✓ Current"},{label:"Patients Scored",val:"500"}].map(item=>(
              <div key={item.label} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid rgba(255,255,255,0.07)`}}>
                <span style={{fontSize:12,color:"rgba(248,250,252,0.5)"}}>{item.label}</span>
                <span style={{fontSize:12,fontWeight:600,color:T.sky}}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Patients ─────────────────────────────────────────────────────────────────
function PagePatients({addToast}){
  const [filter,setFilter]=useState("ALL");
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState(PATIENTS[0]);
  const [assigned,setAssigned]=useState({});
  const [ringKey,setRingKey]=useState(0);
  const v=useVisible(50);
  const filters=["ALL","HIGH","MEDIUM","LOW","Lives Alone"];
  const filtered=PATIENTS.filter(p=>{
    const mt=filter==="ALL"||(filter==="Lives Alone"?p.lives_alone==="yes":p.risk_tier===filter);
    const ms=!search||p.patient_id.toLowerCase().includes(search.toLowerCase())||p.diagnosis.toLowerCase().includes(search.toLowerCase());
    return mt&&ms;
  });
  const handleSelect=(p)=>{setSelected(p);setRingKey(k=>k+1);};
  const risk=selected?parseFloat(selected.risk_probability):0;
  const rc=selected?riskColor(selected.risk_tier):T.sky;

  function handleAssign(){
    setAssigned(a=>({...a,[selected.patient_id]:true}));
    addToast(`Alert sent — ${selected.recommended_intervention} assigned for ${selected.patient_id}. Care team notified.`);
  }

  function handleContactNow(){
    window.open(`tel:${selected.phone.replace(/\s/g,"")}`);
    addToast(`Calling ${selected.patient_id} on ${selected.phone}…`,"info");
  }

  return(
    <div style={{display:"flex",height:"calc(100vh - 60px)",overflow:"hidden",margin:"-32px"}}>
      <div style={{width:320,background:T.white,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"16px 16px 12px",borderBottom:`1px solid ${T.border}`}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search patient or diagnosis…"
            style={{width:"100%",padding:"9px 14px",borderRadius:9,border:`1.5px solid ${T.border}`,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box",color:T.text,transition:"border-color 0.15s"}}
            onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
          <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
            {filters.map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{padding:"4px 10px",borderRadius:14,fontSize:11,fontWeight:filter===f?700:400,border:`1.5px solid ${filter===f?riskColor(f)||T.sky:T.border}`,background:filter===f?riskBg(f)||T.skyLight:"none",color:filter===f?riskColor(f)||T.sky:T.muted,cursor:"pointer",fontFamily:"inherit",transition:"all 0.12s"}}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{overflowY:"auto",flex:1}}>
          {filtered.map((p,i)=>{
            const isSel=selected?.patient_id===p.patient_id;
            const r=parseFloat(p.risk_probability);
            return(
              <div key={p.patient_id} onClick={()=>handleSelect(p)} style={{padding:"13px 16px",borderBottom:`1px solid ${T.border}`,cursor:"pointer",background:isSel?T.skyLight:T.white,borderLeft:`3px solid ${isSel?T.sky:"transparent"}`,transition:"background 0.12s",opacity:v?1:0,transform:v?"translateX(0)":"translateX(-12px)",transitionDelay:`${Math.min(i*25,400)}ms`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{fontWeight:700,color:T.text,fontSize:14}}>{p.patient_id}</span>
                    <span style={{fontSize:11,color:T.muted}}>{p.age}y</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <RiskBadge tier={p.risk_tier}/>
                    <span style={{fontSize:13,fontWeight:700,color:riskColor(p.risk_tier)}}>{p.risk_probability}%</span>
                  </div>
                </div>
                <div style={{fontSize:11,color:T.muted,marginBottom:5,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.diagnosis}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{height:4,flex:1,background:T.slateBg,borderRadius:2,overflow:"hidden",marginRight:10}}>
                    <div style={{height:"100%",width:`${r}%`,background:riskColor(p.risk_tier),borderRadius:2}}/>
                  </div>
                  <span style={{fontSize:10,color:p.days_since_gp>90?T.red:T.muted,fontWeight:p.days_since_gp>90?700:400}}>{p.days_since_gp}d GP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{flex:1,background:T.slateBg,overflowY:"auto",padding:"32px 36px"}}>
        {selected&&(()=>{
          const timeline=[{label:"Last GP Visit",days:selected.days_since_gp,icon:"🏥"},{label:"Last ED Visit",days:selected.ed_visits>0?42:null,icon:"🚑"},{label:"Last Telehealth",days:selected.telehealth_6m==="yes"?18:null,icon:"💻"},{label:"Today",days:0,icon:"📅"}];
          return(
            <div style={{maxWidth:860,margin:"0 auto"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28}}>
                <div style={{display:"flex",alignItems:"center",gap:28}}>
                  <div style={{position:"relative"}}>
                    <RiskRing key={ringKey} pct={risk} size={130} stroke={11} color={rc}/>
                    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
                      <div style={{fontSize:22,fontWeight:700,color:rc,lineHeight:1}}>{selected.risk_probability}%</div>
                      <div style={{fontSize:10,color:T.muted}}>risk</div>
                    </div>
                  </div>
                  <div>
                    <div style={{fontSize:28,fontWeight:700,color:T.text,marginBottom:4}}>{selected.patient_id}</div>
                    <div style={{fontSize:13,color:T.muted,marginBottom:10}}>{selected.age} yrs</div>
                    <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                      {[selected.smoking_status!=="never"&&`🚬 ${selected.smoking_status}`,selected.lives_alone==="yes"&&"👤 Lives alone",selected.telehealth_6m==="yes"&&"💻 Telehealth capable"].filter(Boolean).map((chip,i)=>(
                        <span key={i} style={{padding:"3px 10px",borderRadius:12,fontSize:11,background:T.white,border:`1px solid ${T.border}`,color:T.muted,fontWeight:500}}>{chip}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <RiskBadge tier={selected.risk_tier}/>
              </div>

              <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 26px",marginBottom:20}}>
                <div style={{fontSize:12,color:T.muted,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:16}}>Clinical Profile</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px 24px"}}>
                  {[["Age",`${selected.age} years`],["Diagnosis",selected.diagnosis],["Smoking",selected.smoking_status],["Medications",`${selected.num_meds} active`],["ED Visits (12m)",selected.ed_visits],["Missed Appts",selected.missed_appts],["Days Since GP",selected.days_since_gp],["Telehealth (6m)",selected.telehealth_6m==="yes"?"✓ Yes":"✗ No"],["Lives Alone",selected.lives_alone==="yes"?"Yes":"No"],["Phone",selected.phone]].map(([k,v],i)=>(
                    <div key={i} style={{borderBottom:`1px solid ${T.border}`,paddingBottom:10}}>
                      <div style={{fontSize:11,color:T.muted,marginBottom:3}}>{k}</div>
                      <div style={{fontSize:13,fontWeight:600,color:T.text}}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{background:T.navy,borderRadius:14,padding:"22px 26px",marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:11,color:"rgba(248,250,252,0.5)",letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:8}}>Recommended Intervention</div>
                  <div style={{fontSize:20,fontWeight:700,color:T.white,marginBottom:4}}>{iIcon[selected.recommended_intervention]} {selected.recommended_intervention}</div>
                  <div style={{fontSize:12,color:T.sky}}>Model confidence: {selected.risk_probability}% · AUC 0.749</div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  {assigned[selected.patient_id]?(
                    <div style={{padding:"10px 20px",borderRadius:10,background:T.greenLight,color:T.green,fontWeight:700,fontSize:13}}>✓ Assigned</div>
                  ):(
                    <button onClick={handleAssign} style={{padding:"10px 20px",borderRadius:10,background:T.sky,border:"none",color:T.white,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit",transition:"opacity 0.15s"}}
                      onMouseEnter={e=>e.target.style.opacity="0.85"} onMouseLeave={e=>e.target.style.opacity="1"}>Assign Intervention</button>
                  )}
                  <button onClick={handleContactNow} style={{padding:"10px 20px",borderRadius:10,background:T.green,border:"none",color:T.white,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>📞 Contact Now</button>
                </div>
              </div>

              <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 26px"}}>
                <div style={{fontSize:12,color:T.muted,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:18}}>Patient Timeline</div>
                <div style={{display:"flex",alignItems:"center"}}>
                  {timeline.map((item,i)=>{
                    const c=item.days===0?T.sky:item.days===null?"#CBD5E1":item.days<30?T.green:item.days<90?T.amber:T.red;
                    return(
                      <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>
                        {i>0&&<div style={{position:"absolute",top:18,right:"50%",width:"100%",height:2,background:T.border,zIndex:0}}/>}
                        <div style={{width:36,height:36,borderRadius:"50%",background:c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,zIndex:1}}>{item.icon}</div>
                        <div style={{fontSize:11,color:T.text,fontWeight:600,marginTop:8,textAlign:"center"}}>{item.label}</div>
                        <div style={{fontSize:10,color:c,fontWeight:700,marginTop:2}}>{item.days===0?"Today":item.days===null?"N/A":`${item.days}d ago`}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ─── Active Alerts ────────────────────────────────────────────────────────────
function PageAlerts({onNavigate,addToast}){
  const [modal,setModal]=useState(null);
  const [dismissed,setDismissed]=useState([]);
  const [filter,setFilter]=useState("ALL");
  const v=useVisible(50);
  const alerts=PATIENTS.filter(p=>p.risk_tier==="HIGH"||(p.risk_tier==="MEDIUM"&&p.days_since_gp>90)).filter(p=>!dismissed.includes(p.patient_id)).filter(p=>filter==="ALL"||p.risk_tier===filter).map(p=>({...p,severity:p.risk_probability>=85?"CRITICAL":"HIGH",reason:[p.days_since_gp>90&&`No GP contact in ${p.days_since_gp} days`,p.missed_appts>=3&&`${p.missed_appts} missed appointments`,p.ed_visits>=3&&`ED visit spike (${p.ed_visits}×)`,p.lives_alone==="yes"&&"Lives alone — limited home support"].filter(Boolean).join(" · "),generated:`${Math.floor(Math.random()*5)+1}h ago`}));
  const sevColor=s=>s==="CRITICAL"?T.red:T.amber;

  function handleContactCall(patient){
    window.open(`tel:${patient.phone.replace(/\s/g,"")}`);
    addToast(`Calling ${patient.patient_id} on ${patient.phone}…`);
    setModal(null);
  }

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,opacity:v?1:0,transition:"opacity 0.4s"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:T.red,boxShadow:`0 0 0 3px ${T.redLight}`,animation:"pulse 1.5s infinite"}}/>
          <span style={{fontWeight:700,fontSize:16,color:T.text}}>{alerts.length} Unresolved Alerts</span>
          <style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}`}</style>
        </div>
        <div style={{display:"flex",gap:8}}>
          {["ALL","CRITICAL","HIGH","MEDIUM"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{padding:"6px 14px",borderRadius:16,fontSize:12,fontWeight:600,border:`1.5px solid ${filter===f?sevColor(f)||T.sky:T.border}`,background:filter===f?riskBg(f)||T.skyLight:"none",color:filter===f?sevColor(f)||T.sky:T.muted,cursor:"pointer",fontFamily:"inherit"}}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {alerts.map((a,i)=>(
          <div key={a.patient_id} style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,borderLeft:`4px solid ${sevColor(a.severity)}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"18px 22px",display:"flex",alignItems:"center",gap:20,opacity:v?1:0,transform:v?"translateY(0)":"translateY(16px)",transition:`opacity 0.5s ease ${i*60}ms,transform 0.5s ease ${i*60}ms`}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                <span style={{padding:"3px 9px",borderRadius:8,fontSize:11,fontWeight:700,background:a.severity==="CRITICAL"?T.redLight:T.amberLight,color:sevColor(a.severity)}}>{a.severity}</span>
                <span style={{fontWeight:700,color:T.text,fontSize:15}}>{a.patient_id}</span>
                <span style={{fontSize:12,color:T.muted}}>{a.age}y</span>
                <span style={{fontSize:11,color:T.muted,marginLeft:"auto"}}>{a.generated}</span>
              </div>
              <div style={{fontSize:12,color:T.muted,marginBottom:4}}>{a.diagnosis}</div>
              <div style={{fontSize:12,color:T.text,fontWeight:500}}>{a.reason}</div>
            </div>
            <div style={{display:"flex",gap:8,flexShrink:0}}>
              <button onClick={()=>setModal(a)} style={{padding:"8px 14px",borderRadius:8,background:T.sky,border:"none",color:T.white,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Contact Now</button>
              <button onClick={()=>onNavigate("schedule")} style={{padding:"8px 14px",borderRadius:8,background:T.navy,border:"none",color:T.white,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Schedule</button>
              <button onClick={()=>setDismissed(d=>[...d,a.patient_id])} style={{padding:"8px 14px",borderRadius:8,background:"none",border:`1px solid ${T.border}`,color:T.muted,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Dismiss</button>
            </div>
          </div>
        ))}
      </div>
      {modal&&(
        <Modal title={`Contact ${modal.patient_id}`} onClose={()=>setModal(null)}>
          <div style={{fontSize:13,color:T.muted,marginBottom:20}}>{modal.age}y · {modal.diagnosis}</div>
          <div onClick={()=>handleContactCall(modal)} style={{display:"flex",alignItems:"center",gap:16,padding:"14px 18px",borderRadius:12,border:`1.5px solid ${T.border}`,marginBottom:10,cursor:"pointer",transition:"all 0.15s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.sky;e.currentTarget.style.background=T.slateBg;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background="none"}}>
            <div style={{width:44,height:44,borderRadius:12,background:T.sky,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📞</div>
            <div>
              <div style={{fontWeight:700,color:T.text,fontSize:14}}>Call Patient</div>
              <div style={{fontSize:12,color:T.muted}}>Mobile: {modal.phone}</div>
            </div>
          </div>
          {[{icon:"💻",label:"Start Telehealth",sub:"Video consult via MyHealth",color:T.green},{icon:"📧",label:"Send SMS Reminder",sub:"Appointment reminder template",color:T.navy}].map((opt,i)=>(
            <div key={i} onClick={()=>setModal(null)} style={{display:"flex",alignItems:"center",gap:16,padding:"14px 18px",borderRadius:12,border:`1.5px solid ${T.border}`,marginBottom:10,cursor:"pointer",transition:"all 0.15s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=opt.color;e.currentTarget.style.background=T.slateBg;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background="none";}}>
              <div style={{width:44,height:44,borderRadius:12,background:opt.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{opt.icon}</div>
              <div>
                <div style={{fontWeight:700,color:T.text,fontSize:14}}>{opt.label}</div>
                <div style={{fontSize:12,color:T.muted}}>{opt.sub}</div>
              </div>
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
function PageSchedule({appointments,setAppointments,addToast}){
  const [view,setView]=useState("Month");
  const [selDay,setSelDay]=useState(8);
  const [showForm,setShowForm]=useState(false);
  const [form,setForm]=useState({patient:"P001",date:`2026-04-08`,time:"09:00",clinician:"Dr. Sarah Chen",type:"Telehealth"});
  const v=useVisible(50);
  const daysInMonth=30;
  const typeColor=t=>t==="Telehealth"?T.sky:t==="In-Person"?T.navy:T.amber;
  const statusColor=s=>s==="Confirmed"?T.green:s==="Scheduled"?T.sky:s==="Pending"?T.amber:T.muted;
  const apptDays=appointments.map(a=>parseInt(a.date.split("-")[2]));
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  function handleAddAppointment(e){
    e.preventDefault();
    if(!form.patient||!form.date||!form.time||!form.clinician){ addToast("Please fill in all fields.","error"); return; }
    const patient=PATIENTS.find(p=>p.patient_id===form.patient);
    const newAppt={
      id:Date.now(),
      date:form.date,
      time:form.time,
      patient:form.patient,
      type:form.type,
      tier:patient?patient.risk_tier:"MEDIUM",
      clinician:form.clinician,
      status:"Scheduled",
    };
    setAppointments(a=>[...a,newAppt]);
    setSelDay(parseInt(form.date.split("-")[2]));
    setShowForm(false);
    addToast(`Appointment scheduled for ${form.patient} on ${form.date} at ${form.time}.`);
  }

  const inp={width:"100%",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box",color:T.text,transition:"border-color 0.15s"};

  return(
    <div style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div style={{fontWeight:700,fontSize:16,color:T.text}}>April 2026</div>
        <div style={{display:"flex",gap:4,background:T.slateBg,borderRadius:10,padding:4}}>
          {["Month","Week","Day"].map(vi=>(
            <button key={vi} onClick={()=>setView(vi)} style={{padding:"6px 18px",borderRadius:8,background:view===vi?T.white:"none",border:"none",fontWeight:view===vi?700:400,color:view===vi?T.text:T.muted,cursor:"pointer",fontFamily:"inherit",fontSize:13,boxShadow:view===vi?"0 1px 4px rgba(0,0,0,0.08)":"none"}}>{vi}</button>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:20}}>
        <div>
          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",overflow:"hidden",marginBottom:20}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
                <div key={d} style={{padding:"10px",textAlign:"center",fontSize:12,fontWeight:600,color:T.muted,borderBottom:`1px solid ${T.border}`,background:T.slateBg}}>{d}</div>
              ))}
              {Array.from({length:daysInMonth},(_,i)=>{
                const day=i+1;
                const hasAppt=apptDays.includes(day);
                const isToday=day===8;
                const isSel=day===selDay;
                return(
                  <div key={day} onClick={()=>setSelDay(day)} style={{padding:"10px 8px",minHeight:56,borderBottom:`1px solid ${T.border}`,borderRight:(i+1)%7===0?"none":`1px solid ${T.border}`,background:isToday?T.skyLight:isSel?"#F0F9FF":T.white,cursor:"pointer",transition:"background 0.12s",position:"relative"}}>
                    <div style={{fontSize:13,fontWeight:isToday||isSel?700:400,width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:isToday?T.sky:"none",color:isToday?T.white:isSel?T.navy:T.text}}>{day}</div>
                    {hasAppt&&(
                      <div style={{display:"flex",gap:2,marginTop:3,flexWrap:"wrap"}}>
                        {appointments.filter(a=>parseInt(a.date.split("-")[2])===day).map(a=>(
                          <div key={a.id} style={{width:6,height:6,borderRadius:"50%",background:typeColor(a.type)}}/>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",overflow:"hidden"}}>
            <div style={{padding:"14px 20px",borderBottom:`1px solid ${T.border}`,fontWeight:700,fontSize:13,color:T.text}}>Upcoming Appointments</div>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr style={{background:T.slateBg}}>
                  {["Date","Time","Patient","Type","Risk","Clinician","Status"].map(h=>(
                    <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:11,fontWeight:600,color:T.muted,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appointments.sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time)).map((a,i)=>(
                  <tr key={a.id} style={{borderBottom:i<appointments.length-1?`1px solid ${T.border}`:"none"}}>
                    <td style={{padding:"12px 16px",fontSize:13,color:T.text}}>{a.date.slice(5)}</td>
                    <td style={{padding:"12px 16px",fontSize:13,fontWeight:500,color:T.text}}>{a.time}</td>
                    <td style={{padding:"12px 16px",fontSize:13,fontWeight:700,color:T.text}}>{a.patient}</td>
                    <td style={{padding:"12px 16px"}}><span style={{padding:"3px 9px",borderRadius:8,fontSize:11,fontWeight:600,background:typeColor(a.type)+"22",color:typeColor(a.type)}}>{a.type}</span></td>
                    <td style={{padding:"12px 16px"}}><RiskBadge tier={a.tier}/></td>
                    <td style={{padding:"12px 16px",fontSize:12,color:T.muted}}>{a.clinician}</td>
                    <td style={{padding:"12px 16px"}}><span style={{padding:"3px 9px",borderRadius:8,fontSize:11,fontWeight:600,background:statusColor(a.status)+"22",color:statusColor(a.status)}}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"18px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:13,color:T.text}}>April {selDay}</div>
              <button onClick={()=>setShowForm(f=>!f)} style={{padding:"6px 12px",borderRadius:8,background:T.sky,border:"none",color:T.white,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>+ Add</button>
            </div>
            {appointments.filter(a=>parseInt(a.date.split("-")[2])===selDay).length===0?(
              <div style={{fontSize:12,color:T.muted,fontStyle:"italic",textAlign:"center",padding:"20px 0"}}>No appointments</div>
            ):appointments.filter(a=>parseInt(a.date.split("-")[2])===selDay).map(a=>(
              <div key={a.id} style={{padding:"10px 12px",borderRadius:9,background:T.slateBg,marginBottom:8,borderLeft:`3px solid ${typeColor(a.type)}`}}>
                <div style={{fontWeight:600,fontSize:13,color:T.text}}>{a.time} — {a.patient}</div>
                <div style={{fontSize:11,color:T.muted,marginTop:2}}>{a.type} · {a.clinician}</div>
                <div style={{marginTop:4}}><RiskBadge tier={a.tier}/></div>
              </div>
            ))}
          </div>
          {showForm&&(
            <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"18px 20px"}}>
              <div style={{fontWeight:700,fontSize:13,color:T.text,marginBottom:14}}>New Appointment</div>
              <form onSubmit={handleAddAppointment}>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,color:T.muted,marginBottom:4,fontWeight:500}}>Patient</div>
                  <select value={form.patient} onChange={set("patient")} style={inp}>
                    {PATIENTS.map(p=><option key={p.patient_id} value={p.patient_id}>{p.patient_id} — {p.diagnosis.split(" | ")[0]}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,color:T.muted,marginBottom:4,fontWeight:500}}>Date</div>
                  <input type="date" value={form.date} onChange={set("date")} style={inp}
                    onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,color:T.muted,marginBottom:4,fontWeight:500}}>Time</div>
                  <input type="time" value={form.time} onChange={set("time")} style={inp}
                    onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,color:T.muted,marginBottom:4,fontWeight:500}}>Clinician</div>
                  <select value={form.clinician} onChange={set("clinician")} style={inp}>
                    {["Dr. Sarah Chen","Dr. James Wu","Dr. Priya Sharma"].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:11,color:T.muted,marginBottom:4,fontWeight:500}}>Type</div>
                  <select value={form.type} onChange={set("type")} style={inp}>
                    <option>Telehealth</option><option>In-Person</option><option>Follow-Up</option>
                  </select>
                </div>
                <button type="submit" style={{width:"100%",padding:"10px",borderRadius:9,background:T.sky,border:"none",color:T.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Confirm Appointment</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Analytics ────────────────────────────────────────────────────────────────
function PageAnalytics(){
  const v=useVisible(50);
  const high=PATIENTS.filter(p=>p.risk_tier==="HIGH").length;
  const med=PATIENTS.filter(p=>p.risk_tier==="MEDIUM").length;
  const low=PATIENTS.filter(p=>p.risk_tier==="LOW").length;
  const diagData=["Type 2 Diabetes","Heart Failure","COPD","CKD","Hypertension","Depression","Asthma"].map(d=>({label:d,count:PATIENTS.filter(p=>p.diagnosis.includes(d)).length})).sort((a,b)=>b.count-a.count);
  const predictors=[{label:"Days since GP visit",or:3.41},{label:"ED visits (12m)",or:2.87},{label:"Lives alone",or:2.23},{label:"Polypharmacy (≥5 meds)",or:2.1},{label:"Missed appointments",or:1.96}];
  const adherenceData=[{label:"Fully Adherent",count:PATIENTS.filter(p=>p.risk_tier==="LOW").length,color:T.green},{label:"Partially Adherent",count:PATIENTS.filter(p=>p.risk_tier==="MEDIUM").length,color:T.amber},{label:"Non-Adherent",count:PATIENTS.filter(p=>p.risk_tier==="HIGH").length,color:T.red}];

  return(
    <div style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24}}>
        {[{label:"AUC-ROC",val:"0.749",accent:T.sky,icon:"🎯"},{label:"Sensitivity",val:"81.2%",accent:T.green,icon:"✅"},{label:"Specificity",val:"74.6%",accent:T.navy,icon:"🔍"},{label:"F1 Score",val:"0.73",accent:T.amber,icon:"📊"}].map((m,i)=>(
          <div key={i} style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",borderTop:`3px solid ${m.accent}`,padding:"20px 22px",opacity:v?1:0,transform:v?"translateY(0)":"translateY(14px)",transition:`opacity 0.5s ease ${i*70}ms,transform 0.5s ease ${i*70}ms`}}>
            <div style={{fontSize:12,color:T.muted,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>{m.icon} {m.label}</div>
            <div style={{fontSize:34,fontWeight:700,color:m.accent}}>{m.val}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,marginBottom:20}}>
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 24px"}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>Risk Distribution</div>
          <HBar label="HIGH" value={high/PATIENTS.length*100} max={100} color={T.red} count={high} delay={300}/>
          <HBar label="MEDIUM" value={med/PATIENTS.length*100} max={100} color={T.amber} count={med} delay={400}/>
          <HBar label="LOW" value={low/PATIENTS.length*100} max={100} color={T.green} count={low} delay={500}/>
        </div>
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 24px"}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>Care Plan Adherence</div>
          {adherenceData.map((a,i)=><HBar key={a.label} label={a.label} value={a.count/PATIENTS.length*100} max={100} color={a.color} count={a.count} delay={350+i*80}/>)}
        </div>
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 24px"}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>Appointment Outcomes</div>
          {[{label:"Attended — HIGH risk",v:62,c:T.red},{label:"Attended — MEDIUM risk",v:78,c:T.amber},{label:"Did Not Attend — HIGH",v:38,c:T.navy},{label:"Did Not Attend — MED",v:22,c:T.sky}].map((b,i)=>(
            <HBar key={b.label} label={b.label} value={b.v} max={100} color={b.c} count={`${b.v}%`} delay={400+i*70}/>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:20}}>
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 24px"}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>Diagnosis Prevalence</div>
          {diagData.map((d,i)=><HBar key={d.label} label={d.label} value={d.count/PATIENTS.length*100} max={100} color={T.sky} count={d.count} delay={400+i*60}/>)}
        </div>
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 24px"}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>Top Predictors (Odds Ratios)</div>
          {predictors.map((p,i)=>(
            <div key={i} style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:12,color:T.text,fontWeight:500}}>{p.label}</span>
                <span style={{fontSize:13,fontWeight:700,color:T.navy}}>{p.or}×</span>
              </div>
              <HBar label="" value={(p.or/3.5)*100} max={100} color={T.navy} count="" delay={450+i*70}/>
            </div>
          ))}
          <div style={{marginTop:16,paddingTop:12,borderTop:`1px solid ${T.border}`,fontSize:11,color:T.muted,fontStyle:"italic"}}>Logistic regression trained on synthetic rural cohort. For demonstration purposes.</div>
        </div>
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function PageSettings({addToast}){
  const v=useVisible(50);
  return(
    <div style={{maxWidth:680,opacity:v?1:0,transition:"opacity 0.4s"}}>
      {[{title:"Model Configuration",fields:[["Risk Model","Random Forest (AUC 0.749)"],["Score Threshold (HIGH)","70%"],["Score Threshold (MEDIUM)","40%"],["Retrain Frequency","Weekly"]]},{title:"Notifications",fields:[["Alert Email","coordinator@rews.health.au"],["SMS Alerts","Enabled"],["Daily Report","07:00 AEST"]]},{title:"Data",fields:[["Data Source","patients_500_signal.csv"],["Last Updated","05 Apr 2026 11:52"],["Total Records","500"]]}].map((section,si)=>(
      <div key={si} style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 26px",marginBottom:20,opacity:v?1:0,transform:v?"translateY(0)":"translateY(14px)",transition:`opacity 0.5s ease ${si*100}ms,transform 0.5s ease ${si*100}ms`}}>
          <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:18}}>{section.title}</div>
          {section.fields.map(([k,val])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:`1px solid ${T.border}`}}>
              <span style={{fontSize:13,color:T.muted}}>{k}</span>
              <input defaultValue={val} style={{padding:"6px 12px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:13,fontFamily:"inherit",color:T.text,outline:"none",width:240,transition:"border-color 0.15s"}}
                onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
            </div>
          ))}
        </div>
      ))}
      <button onClick={()=>addToast("Settings saved successfully.")} style={{padding:"12px 28px",borderRadius:10,background:T.sky,border:"none",color:T.white,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Save Settings</button>
    </div>
  );
}

// ─── Patient Onboarding ───────────────────────────────────────────────────────
const CONDITION_OPTIONS=[
  "Type 2 Diabetes","Heart Failure","COPD","Chronic Kidney Disease (CKD)",
  "Hypertension","Depression","Asthma","Atrial Fibrillation","Arthritis","Osteoporosis",
];

function PatientOnboarding({currentUser,onComplete}){
  const [step,setStep]=useState(1);
  const TOTAL=5;
  const [form,setForm]=useState({
    age:"",conditions:[],conditions_other:"",smoking_status:"",
    num_meds:"",telehealth_6m:"",lives_alone:"",
    ed_visits:"",missed_appts:"",days_since_gp:"",
    records:[],
    // AUSDRISK fields
    gender:"",indigenous_descent:"",birth_country:"",
    family_diabetes:"",prior_high_glucose:"",bp_medication:"",
    veg_fruit_daily:"",physical_activity:"",waist_cm:"",
  });
  const [dragging,setDragging]=useState(false);
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  function toggleCondition(c){
    setForm(f=>({...f,conditions:f.conditions.includes(c)?f.conditions.filter(x=>x!==c):[...f.conditions,c]}));
  }

  function handleFiles(files){
    const valid=[...files].filter(f=>f.size<=20*1024*1024);
    const meta=valid.map(f=>({name:f.name,size:f.size,type:f.type,uploaded:new Date().toISOString()}));
    setForm(f=>({...f,records:[...f.records,...meta]}));
  }

  function removeRecord(i){setForm(f=>({...f,records:f.records.filter((_,idx)=>idx!==i)}));}

  function canNext(){
    if(step===1) return form.age&&form.smoking_status&&form.lives_alone;
    if(step===2) return (form.conditions.length>0||form.conditions_other)&&form.num_meds!=="";
    if(step===3) return form.ed_visits!==""&&form.missed_appts!==""&&form.days_since_gp!==""&&form.telehealth_6m;
    if(step===4) return true;
    if(step===5) return form.gender&&form.indigenous_descent&&form.birth_country&&form.family_diabetes&&form.prior_high_glucose&&form.bp_medication&&form.veg_fruit_daily&&form.physical_activity&&form.waist_cm!=="";
    return true;
  }

  function ausdriskScore(){
    let s=0;
    const age=parseInt(form.age)||0;
    if(age>=65) s+=8; else if(age>=55) s+=6; else if(age>=45) s+=4; else if(age>=35) s+=2;
    if(form.gender==="male") s+=3;
    if(form.indigenous_descent==="yes") s+=2;
    if(form.birth_country==="asia_me_nafr_seur") s+=2;
    if(form.family_diabetes==="yes") s+=3;
    if(form.prior_high_glucose==="yes") s+=6;
    if(form.bp_medication==="yes") s+=2;
    if(form.smoking_status==="current") s+=2;
    if(form.veg_fruit_daily==="no") s+=1;
    if(form.physical_activity==="no") s+=2;
    const waist=parseFloat(form.waist_cm)||0;
    if(waist>0){
      const isIndigenousOrAsian=form.indigenous_descent==="yes"||form.birth_country==="asia_me_nafr_seur";
      if(form.gender==="male"){
        if(isIndigenousOrAsian){ if(waist>=100) s+=7; else if(waist>=90) s+=4; }
        else { if(waist>110) s+=7; else if(waist>=102) s+=4; }
      } else {
        if(isIndigenousOrAsian){ if(waist>90) s+=7; else if(waist>=80) s+=4; }
        else { if(waist>100) s+=7; else if(waist>=88) s+=4; }
      }
    }
    return s;
  }

  function handleSubmit(){
    const score=ausdriskScore();
    const profile={
      ...form,
      age:parseInt(form.age)||0,
      num_meds:parseInt(form.num_meds)||0,
      ed_visits:parseInt(form.ed_visits)||0,
      missed_appts:parseInt(form.missed_appts)||0,
      days_since_gp:parseInt(form.days_since_gp)||0,
      waist_cm:parseFloat(form.waist_cm)||0,
      ausdrisk_score:score,
      completedAt:new Date().toISOString(),
    };
    onComplete(profile);
  }

  const inp={width:"100%",padding:"10px 14px",borderRadius:9,border:`1.5px solid ${T.border}`,fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box",color:T.text,transition:"border-color 0.15s",background:T.white};
  const Toggle=({label,field,opt,emoji})=>(
    <button type="button" onClick={()=>setForm(f=>({...f,[field]:opt}))}
      style={{flex:1,padding:"12px 10px",borderRadius:10,border:`2px solid ${form[field]===opt?T.sky:T.border}`,background:form[field]===opt?T.skyLight:T.white,color:form[field]===opt?T.sky:T.muted,fontFamily:"inherit",fontSize:13,fontWeight:form[field]===opt?700:400,cursor:"pointer",transition:"all 0.15s",textAlign:"center"}}>
      {emoji&&<div style={{fontSize:20,marginBottom:4}}>{emoji}</div>}
      <div>{label}</div>
    </button>
  );

  const stepTitles=["Personal & Lifestyle","Medical Profile","Recent History","Medical Records","Diabetes Risk (AUSDRISK)"];
  const stepIcons=["🧑","🩺","📅","📁","🩸"];

  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"DM Sans,sans-serif",padding:"24px"}}>
      <div style={{width:"100%",maxWidth:580,background:T.white,borderRadius:24,boxShadow:"0 32px 80px rgba(0,0,0,0.35)",overflow:"hidden"}}>
        {/* Header */}
        <div style={{background:T.navy,padding:"28px 36px 24px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <div style={{fontSize:28,fontWeight:700,color:T.white,letterSpacing:"-0.02em"}}>TriSyd</div>
            <div style={{fontSize:10,color:T.sky,letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:500,marginTop:2}}>Patient Setup</div>
          </div>
          <div style={{fontSize:13,color:"rgba(248,250,252,0.55)",marginBottom:8}}>Welcome, {currentUser.name.split(" ")[0]} 👋 Let's set up your health profile.</div>
          <div style={{fontSize:18,fontWeight:700,color:T.white,marginBottom:4}}>
            {stepIcons[step-1]} {stepTitles[step-1]}
          </div>
          <div style={{fontSize:13,color:"rgba(248,250,252,0.55)"}}>Step {step} of {TOTAL} — Help us personalise your care</div>
          {/* Progress bar */}
          <div style={{marginTop:16,height:4,background:"rgba(255,255,255,0.12)",borderRadius:2,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${(step/TOTAL)*100}%`,background:T.sky,borderRadius:2,transition:"width 0.4s ease"}}/>
          </div>
          {/* Step dots */}
          <div style={{display:"flex",gap:8,marginTop:10}}>
            {Array.from({length:TOTAL},(_,i)=>(
              <div key={i} style={{height:6,flex:1,borderRadius:3,background:i<step?"rgba(14,165,233,0.8)":"rgba(255,255,255,0.15)",transition:"background 0.3s"}}/>
            ))}
          </div>
        </div>

        {/* Form body */}
        <div style={{padding:"28px 36px 32px"}}>
          {step===1&&(
            <div>
              <div style={{marginBottom:20}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:8}}>Your Age</label>
                <input type="number" min="1" max="120" value={form.age} onChange={set("age")} placeholder="e.g. 65" style={inp}
                  onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
              </div>
              <div style={{marginBottom:20}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:8}}>Smoking Status</label>
                <div style={{display:"flex",gap:10}}>
                  <Toggle field="smoking_status" opt="never"   label="Never Smoked"   emoji="✅"/>
                  <Toggle field="smoking_status" opt="former"  label="Former Smoker"  emoji="🚭"/>
                  <Toggle field="smoking_status" opt="current" label="Current Smoker" emoji="🚬"/>
                </div>
              </div>
              <div style={{marginBottom:8}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:8}}>Living Situation</label>
                <div style={{display:"flex",gap:10}}>
                  <Toggle field="lives_alone" opt="yes" label="I live alone"        emoji="🏠"/>
                  <Toggle field="lives_alone" opt="no"  label="I live with others"  emoji="👨‍👩‍👧"/>
                </div>
              </div>
            </div>
          )}

          {step===2&&(
            <div>
              <div style={{marginBottom:20}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:10}}>Chronic Conditions <span style={{fontWeight:400,textTransform:"none",letterSpacing:0}}>(select all that apply)</span></label>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {CONDITION_OPTIONS.map(c=>{
                    const sel=form.conditions.includes(c);
                    return(
                      <button key={c} type="button" onClick={()=>toggleCondition(c)}
                        style={{padding:"7px 14px",borderRadius:20,border:`1.5px solid ${sel?T.sky:T.border}`,background:sel?T.skyLight:T.white,color:sel?T.sky:T.muted,fontSize:12,fontWeight:sel?700:400,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}>
                        {c}
                      </button>
                    );
                  })}
                </div>
                <div style={{marginTop:10}}>
                  <input value={form.conditions_other} onChange={set("conditions_other")} placeholder="Other conditions (type here)…" style={{...inp,fontSize:13}}
                    onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
                </div>
              </div>
              <div style={{marginBottom:8}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:8}}>Number of Current Medications</label>
                <input type="number" min="0" max="50" value={form.num_meds} onChange={set("num_meds")} placeholder="e.g. 5" style={inp}
                  onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
              </div>
            </div>
          )}

          {step===3&&(
            <div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
                <div>
                  <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:8}}>ED Visits <span style={{fontWeight:400,textTransform:"none"}}>(last 6 months)</span></label>
                  <input type="number" min="0" max="20" value={form.ed_visits} onChange={set("ed_visits")} placeholder="e.g. 2" style={inp}
                    onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
                </div>
                <div>
                  <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:8}}>Missed Appointments</label>
                  <input type="number" min="0" max="20" value={form.missed_appts} onChange={set("missed_appts")} placeholder="e.g. 1" style={inp}
                    onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
                </div>
              </div>
              <div style={{marginBottom:20}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:8}}>Days Since Last GP Visit</label>
                <input type="number" min="0" max="1000" value={form.days_since_gp} onChange={set("days_since_gp")} placeholder="e.g. 45" style={inp}
                  onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
              </div>
              <div style={{marginBottom:8}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:8}}>Telehealth Use</label>
                <div style={{display:"flex",gap:10}}>
                  <Toggle field="telehealth_6m" opt="yes" label="Yes, I use telehealth"    emoji="💻"/>
                  <Toggle field="telehealth_6m" opt="no"  label="No, I haven't used it"    emoji="📵"/>
                </div>
              </div>
            </div>
          )}

          {step===4&&(
            <div>
              <div style={{padding:"12px 16px",borderRadius:10,background:"#EFF6FF",border:"1px solid #BFDBFE",marginBottom:20,display:"flex",gap:10,alignItems:"flex-start"}}>
                <span style={{fontSize:16,flexShrink:0}}>🔒</span>
                <div style={{fontSize:12,color:"#1E40AF",lineHeight:1.5}}>
                  <strong>Your records are private.</strong> Files are encrypted and only visible to you and your assigned care team. They are never shared without your explicit consent.
                </div>
              </div>
              {/* Drop zone */}
              <div
                onDragOver={e=>{e.preventDefault();setDragging(true);}}
                onDragLeave={()=>setDragging(false)}
                onDrop={e=>{e.preventDefault();setDragging(false);handleFiles(e.dataTransfer.files);}}
                style={{border:`2px dashed ${dragging?T.sky:T.border}`,borderRadius:14,padding:"32px 24px",textAlign:"center",background:dragging?T.skyLight:"#FAFBFC",transition:"all 0.2s",marginBottom:16,cursor:"pointer"}}
                onClick={()=>document.getElementById("recordUpload").click()}>
                <div style={{fontSize:36,marginBottom:10}}>📂</div>
                <div style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:4}}>Drop files here or click to browse</div>
                <div style={{fontSize:12,color:T.muted}}>Accepts PDF, images, Word docs · Max 20 MB per file</div>
                <input id="recordUpload" type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{display:"none"}}
                  onChange={e=>handleFiles(e.target.files)}/>
              </div>
              {form.records.length>0&&(
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {form.records.map((r,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:9,background:T.slateBg,border:`1px solid ${T.border}`}}>
                      <span style={{fontSize:18}}>{r.type.includes("pdf")?"📄":r.type.includes("image")?"🖼️":"📝"}</span>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:600,color:T.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.name}</div>
                        <div style={{fontSize:11,color:T.muted}}>{(r.size/1024).toFixed(0)} KB · 🔒 Private</div>
                      </div>
                      <button type="button" onClick={()=>removeRecord(i)} style={{background:"none",border:"none",cursor:"pointer",color:T.muted,fontSize:16,padding:"2px 6px",borderRadius:6,flexShrink:0}}>×</button>
                    </div>
                  ))}
                </div>
              )}
              <div style={{marginTop:16,fontSize:12,color:T.muted,fontStyle:"italic",textAlign:"center"}}>
                This step is optional — you can add records at any time from your Health Summary.
              </div>
            </div>
          )}

          {step===5&&(
            <div>
              <div style={{padding:"10px 14px",borderRadius:10,background:"#EFF6FF",border:"1px solid #BFDBFE",marginBottom:20,fontSize:12,color:"#1E40AF",lineHeight:1.5}}>
                <strong>AUSDRISK</strong> — The Australian Type 2 Diabetes Risk Assessment Tool. Your answers help us estimate your 5-year risk of developing type 2 diabetes.
              </div>

              {/* Q2: Gender */}
              <div style={{marginBottom:18}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:8}}>2. Your gender</label>
                <div style={{display:"flex",gap:10}}>
                  <Toggle field="gender" opt="female" label="Female" emoji="♀️"/>
                  <Toggle field="gender" opt="male"   label="Male"   emoji="♂️"/>
                </div>
              </div>

              {/* Q3a: Indigenous descent */}
              <div style={{marginBottom:18}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:6}}>3a. Are you of Aboriginal, Torres Strait Islander, Pacific Islander or Māori descent?</label>
                <div style={{display:"flex",gap:10}}>
                  <Toggle field="indigenous_descent" opt="no"  label="No"  emoji=""/>
                  <Toggle field="indigenous_descent" opt="yes" label="Yes" emoji=""/>
                </div>
              </div>

              {/* Q3b: Country of birth */}
              <div style={{marginBottom:18}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:6}}>3b. Where were you born?</label>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {[
                    {opt:"australia",label:"Australia"},
                    {opt:"asia_me_nafr_seur",label:"Asia (incl. Indian subcontinent), Middle East, North Africa, Southern Europe"},
                    {opt:"other",label:"Other"},
                  ].map(({opt,label})=>(
                    <button key={opt} type="button" onClick={()=>setForm(f=>({...f,birth_country:opt}))}
                      style={{padding:"10px 14px",borderRadius:10,border:`2px solid ${form.birth_country===opt?T.sky:T.border}`,background:form.birth_country===opt?T.skyLight:T.white,color:form.birth_country===opt?T.sky:T.muted,fontFamily:"inherit",fontSize:13,fontWeight:form.birth_country===opt?700:400,cursor:"pointer",textAlign:"left",transition:"all 0.15s"}}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q4: Family diabetes */}
              <div style={{marginBottom:18}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:6}}>4. Have either of your parents, or any of your brothers or sisters been diagnosed with diabetes (type 1 or 2)?</label>
                <div style={{display:"flex",gap:10}}>
                  <Toggle field="family_diabetes" opt="no"  label="No"  emoji=""/>
                  <Toggle field="family_diabetes" opt="yes" label="Yes" emoji=""/>
                </div>
              </div>

              {/* Q5: Prior high glucose */}
              <div style={{marginBottom:18}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:6}}>5. Have you ever been found to have high blood glucose (e.g. in a health check, during illness, or during pregnancy)?</label>
                <div style={{display:"flex",gap:10}}>
                  <Toggle field="prior_high_glucose" opt="no"  label="No"  emoji=""/>
                  <Toggle field="prior_high_glucose" opt="yes" label="Yes" emoji=""/>
                </div>
              </div>

              {/* Q6: BP medication */}
              <div style={{marginBottom:18}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:6}}>6. Are you currently taking medication for high blood pressure?</label>
                <div style={{display:"flex",gap:10}}>
                  <Toggle field="bp_medication" opt="no"  label="No"  emoji=""/>
                  <Toggle field="bp_medication" opt="yes" label="Yes" emoji=""/>
                </div>
              </div>

              {/* Q8: Veg/fruit */}
              <div style={{marginBottom:18}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:6}}>8. How often do you eat vegetables or fruit?</label>
                <div style={{display:"flex",gap:10}}>
                  <Toggle field="veg_fruit_daily" opt="yes" label="Every day"     emoji="🥦"/>
                  <Toggle field="veg_fruit_daily" opt="no"  label="Not every day" emoji="🚫"/>
                </div>
              </div>

              {/* Q9: Physical activity */}
              <div style={{marginBottom:18}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:6}}>9. Do you do at least 2.5 hours of physical activity per week (e.g. 30 min/day on 5+ days)?</label>
                <div style={{display:"flex",gap:10}}>
                  <Toggle field="physical_activity" opt="yes" label="Yes" emoji="🏃"/>
                  <Toggle field="physical_activity" opt="no"  label="No"  emoji="🛋️"/>
                </div>
              </div>

              {/* Q10: Waist */}
              <div style={{marginBottom:8}}>
                <label style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:6}}>10. Your waist measurement (cm) — measured below the ribs, usually at navel level, while standing</label>
                <input type="number" min="40" max="200" value={form.waist_cm} onChange={set("waist_cm")} placeholder="e.g. 88"
                  style={inp} onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
              </div>

              {/* Live score preview */}
              {form.gender&&form.indigenous_descent&&form.birth_country&&form.family_diabetes&&form.prior_high_glucose&&form.bp_medication&&form.veg_fruit_daily&&form.physical_activity&&form.waist_cm!==""&&(()=>{
                const sc=ausdriskScore();
                const [tier,tierColor,tierBg,desc]=
                  sc>=12?["High Risk","#DC2626","#FEE2E2","Score ≥ 12 — see your doctor about a blood test"]:
                  sc>=6 ?["Intermediate Risk","#D97706","#FEF3C7","Score 6–11 — discuss your result with your doctor"]:
                         ["Low Risk","#059669","#D1FAE5","Score ≤ 5 — continue healthy lifestyle habits"];
                return(
                  <div style={{marginTop:16,padding:"14px 18px",borderRadius:12,background:tierBg,border:`1.5px solid ${tierColor}22`}}>
                    <div style={{fontSize:11,color:tierColor,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:2}}>AUSDRISK Score</div>
                    <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:4}}>
                      <span style={{fontSize:28,fontWeight:800,color:tierColor}}>{sc}</span>
                      <span style={{fontSize:14,fontWeight:700,color:tierColor}}>{tier}</span>
                    </div>
                    <div style={{fontSize:12,color:tierColor,opacity:0.85}}>{desc}</div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Nav buttons */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:28}}>
            {step>1?(
              <button type="button" onClick={()=>setStep(s=>s-1)}
                style={{padding:"10px 22px",borderRadius:10,background:"none",border:`1.5px solid ${T.border}`,color:T.muted,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                ← Back
              </button>
            ):<div/>}
            {step<TOTAL?(
              <button type="button" onClick={()=>setStep(s=>s+1)} disabled={!canNext()}
                style={{padding:"11px 28px",borderRadius:10,background:canNext()?T.sky:"#CBD5E1",border:"none",color:T.white,fontSize:14,fontWeight:700,cursor:canNext()?"pointer":"not-allowed",fontFamily:"inherit",transition:"background 0.15s"}}>
                Continue →
              </button>
            ):(
              <button type="button" onClick={handleSubmit}
                style={{padding:"11px 28px",borderRadius:10,background:T.green,border:"none",color:T.white,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                Complete Setup ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Patient Portal ───────────────────────────────────────────────────────────
// ─── Patient: Diabetes Program ────────────────────────────────────────────────
function PatientDiabetesProgram({me,addToast}){
  const [chatMsg,setChatMsg]=useState("");
  const [chatHistory,setChatHistory]=useState([
    {from:"bot",text:"Hi! I'm your TriSyd health assistant. How are you feeling today? Have you had a chance to do your post-meal walk?"},
  ]);
  const programDay=3;
  const v=useVisible(50);
  const cgmReadings=[95,93,90,88,87,90,108,125,148,165,170,158,145,135,122,115,112,110,118,135,162,178,175,160,148,138,128,122,118,115,124,142,165,170,165,150,138,130,122,118,115,112,108,105,102,100,97,95];
  const cgmPath=cgmReadings.map((v,i)=>{const x=5+(i/(cgmReadings.length-1))*480;const y=105-((v-60)/140)*95;return `${i===0?"M":"L"}${x.toFixed(1)},${y.toFixed(1)}`;}).join(" ");
  function sendChat(){
    if(!chatMsg.trim()) return;
    const msg=chatMsg.trim();
    setChatHistory(h=>[...h,{from:"user",text:msg}]);
    setChatMsg("");
    setTimeout(()=>{
      const m=msg.toLowerCase();
      let reply;
      if(m.match(/hello|hi|hey|good (morning|afternoon|evening)/))
        reply="Hello! How are you feeling today? I'm here to support you through your diabetes program.";
      else if(m.match(/glucose|sugar|reading|cgm|blood sugar/))
        reply="Your current glucose reading is 125 mg/dL — that's within your target range of 70–140 mg/dL. Keep it up!";
      else if(m.match(/medication|meds|medicine|insulin/))
        reply="Please make sure to take your medications at the same time each day. If you have concerns about your medications, contact your care team.";
      else if(m.match(/diet|eat|food|nutrition|meal|carb/))
        reply="Try to eat plenty of vegetables, legumes and wholegrains. Limit foods high in saturated fat, salt and added sugars. Small, regular meals help keep your glucose stable.";
      else if(m.match(/exercise|walk|active|activity|workout|gym/))
        reply="Aim for at least 30 minutes of moderate activity on most days. Even a short walk after meals can help bring your glucose down.";
      else if(m.match(/tired|fatigue|exhausted|sleep/))
        reply="Fatigue can be a sign of blood sugar changes. Aim for 7–8 hours of sleep and try to keep a regular sleep schedule. Let your doctor know if tiredness is persistent.";
      else if(m.match(/pain|hurt|sore|headache/))
        reply="I'm sorry to hear you're in discomfort. If you're experiencing chest pain, difficulty breathing, or sudden severe symptoms, please call 000 immediately. Otherwise, log your symptoms and your care team will follow up.";
      else if(m.match(/stress|anxious|anxiety|worry|depressed|sad|mental/))
        reply="Managing your mental health is just as important as physical health. Stress can affect blood sugar levels. Consider talking to your GP or a counsellor — your care team can help connect you with support.";
      else if(m.match(/appointment|doctor|gp|specialist|visit/))
        reply="Your next appointment is visible in the Appointments tab. If you need to reschedule or have urgent concerns, please contact your care team directly.";
      else if(m.match(/weight|waist|bmi/))
        reply="Maintaining a healthy weight helps improve insulin sensitivity. Even small reductions in weight can have a big impact on your blood sugar control.";
      else if(m.match(/smoke|smoking|cigarette/))
        reply="Smoking significantly increases the risk of diabetes complications. If you'd like support to quit, ask your GP about cessation programs available to you.";
      else if(m.match(/thank|thanks|great|good|awesome|perfect/))
        reply="You're doing great! Staying engaged with your health program makes a real difference. Keep going!";
      else if(m.match(/help|what can you do|support/))
        reply="I can answer questions about your glucose readings, medications, diet, exercise, symptoms, and appointments. What would you like to know?";
      else
        reply="That's a great question to raise with your care team. You can log any concerns using the Report Symptoms button, and a nurse or doctor will follow up with you.";
      setChatHistory(h=>[...h,{from:"bot",text:reply}]);
    },600);
  }
  return(
    <div style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      <div style={{fontSize:20,fontWeight:700,color:T.text,marginBottom:4}}>My Health Programs</div>
      <div style={{fontSize:13,color:T.muted,marginBottom:20}}>Specialist monitoring & lifestyle programs</div>
      {/* Program banner */}
      <div style={{background:`linear-gradient(135deg,${T.navy} 0%,#1a3a5c 100%)`,borderRadius:16,padding:"22px 28px",marginBottom:20,color:T.white}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,color:T.sky,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>🩸 Diabetes Monitoring Program</div>
            <div style={{fontSize:24,fontWeight:700,marginBottom:4}}>Day {programDay} of 14</div>
            <div style={{fontSize:12,color:"rgba(248,250,252,0.65)"}}>Phase 1: Baseline data collection — wear CGM and sync wearable daily</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,color:"rgba(248,250,252,0.5)",marginBottom:4}}>Current Reading</div>
            <div style={{fontSize:32,fontWeight:700,color:T.sky}}>125 <span style={{fontSize:14,fontWeight:400}}>mg/dL</span></div>
            <div style={{fontSize:11,color:T.green}}>✓ In target range</div>
          </div>
        </div>
        <div style={{marginTop:14,background:"rgba(255,255,255,0.08)",borderRadius:8,height:6,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${(programDay/14)*100}%`,background:T.sky,borderRadius:8}}/>
        </div>
      </div>
      {/* CGM chart */}
      <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,padding:"22px 24px",marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontSize:14,fontWeight:700,color:T.text}}>📈 My Glucose — Today</div>
          <span style={{fontSize:11,padding:"3px 10px",borderRadius:8,background:T.greenLight,color:T.green,fontWeight:600}}>● CGM Active</span>
        </div>
        <svg width="100%" viewBox="0 0 490 115" style={{overflow:"visible"}}>
          <rect x="5" y={105-((140-60)/140)*95} width="480" height={((140-70)/140)*95} fill="#D1FAE5" opacity="0.5" rx="3"/>
          {[70,100,140,180].map(g=>{const y=105-((g-60)/140)*95;return(<g key={g}><line x1="5" y1={y} x2="485" y2={y} stroke={T.border} strokeWidth="0.5"/><text x="0" y={y+3} fontSize="9" fill={T.muted}>{g}</text></g>);})}
          <path d={cgmPath} fill="none" stroke={T.sky} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div style={{display:"flex",gap:16,marginTop:6}}>
          <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:14,height:3,background:T.sky,borderRadius:2}}/><span style={{fontSize:11,color:T.muted}}>Blood Glucose (mg/dL)</span></div>
          <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:14,height:8,background:"#D1FAE5",borderRadius:2}}/><span style={{fontSize:11,color:T.muted}}>Target Range (70–140)</span></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:14}}>
          {[{label:"Time in Range",val:"72%",color:T.green},{label:"Time Above",val:"21%",color:T.amber},{label:"Time Below",val:"7%",color:T.red}].map((s,i)=>(
            <div key={i} style={{background:T.slateBg,borderRadius:9,padding:"10px 14px",textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:700,color:s.color}}>{s.val}</div>
              <div style={{fontSize:11,color:T.muted}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Wearable + Nutrition */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,padding:"20px 22px"}}>
          <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:14}}>⌚ Activity & Wearable</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[{icon:"👣",label:"Steps",val:"4,521"},{icon:"🔥",label:"Calories",val:"1,847 kcal"},{icon:"💓",label:"Heart Rate",val:"72 bpm"},{icon:"😴",label:"Sleep",val:"6.8 hrs"}].map((w,i)=>(
              <div key={i} style={{background:T.slateBg,borderRadius:10,padding:"12px"}}>
                <div style={{fontSize:18,marginBottom:4}}>{w.icon}</div>
                <div style={{fontSize:14,fontWeight:700,color:T.text}}>{w.val}</div>
                <div style={{fontSize:11,color:T.muted}}>{w.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,padding:"20px 22px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:700,color:T.text}}>🥗 Nutrition Log</div>
            <span style={{fontSize:11,padding:"2px 8px",borderRadius:8,background:T.amberLight,color:T.amber,fontWeight:600}}>Syncing…</span>
          </div>
          {[{meal:"Breakfast",cal:420,notes:"Oats, banana"},{meal:"Lunch",cal:680,notes:"Chicken salad"},{meal:"Dinner",cal:null,notes:"Not yet logged"}].map((m,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:9,background:m.cal?T.slateBg:"none",marginBottom:6,border:`1px solid ${m.cal?T.border:"transparent"}`}}>
              <span style={{fontSize:14}}>{i===0?"🌅":i===1?"☀️":"🌙"}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:600,color:T.text}}>{m.meal}</div>
                <div style={{fontSize:11,color:T.muted}}>{m.notes}</div>
              </div>
              {m.cal&&<span style={{fontSize:12,fontWeight:700,color:T.muted}}>{m.cal} kcal</span>}
            </div>
          ))}
        </div>
      </div>
      {/* ML loading state */}
      <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,padding:"22px 24px",marginBottom:16,textAlign:"center"}}>
        <div style={{fontSize:32,marginBottom:10}}>⏳</div>
        <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:6}}>AI Model Collecting Baseline Data…</div>
        <div style={{fontSize:12,color:T.muted,marginBottom:16,maxWidth:400,margin:"0 auto 16px"}}>Your personalised lifestyle recommendations will be ready on Day 8 after the model analyses your first 7 days of glucose, activity and nutrition data.</div>
        <div style={{background:T.slateBg,borderRadius:10,padding:"10px 20px",display:"inline-block",fontSize:12,color:T.muted}}>Day {programDay} of 7 complete · {Math.round((programDay/7)*100)}% data collected</div>
      </div>
      {/* Chatbot */}
      <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,overflow:"hidden"}}>
        <div style={{padding:"16px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${T.sky},#38BDF8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🤖</div>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:T.text}}>TriSyd Health Assistant</div>
            <div style={{fontSize:11,color:T.green}}>● Online — here to support your journey</div>
          </div>
        </div>
        <div style={{height:220,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:10}}>
          {chatHistory.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.from==="bot"?"flex-start":"flex-end"}}>
              <div style={{maxWidth:"75%",padding:"10px 14px",borderRadius:m.from==="bot"?"4px 14px 14px 14px":"14px 4px 14px 14px",background:m.from==="bot"?T.slateBg:T.sky,color:m.from==="bot"?T.text:T.white,fontSize:13,lineHeight:1.5}}>{m.text}</div>
            </div>
          ))}
        </div>
        <div style={{padding:"12px 16px",borderTop:`1px solid ${T.border}`,display:"flex",gap:10}}>
          <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask a question or share how you're feeling…"
            style={{flex:1,padding:"9px 14px",borderRadius:9,border:`1.5px solid ${T.border}`,fontSize:13,fontFamily:"inherit",outline:"none",color:T.text,transition:"border-color 0.15s"}}
            onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
          <button onClick={sendChat} style={{padding:"9px 18px",borderRadius:9,background:T.sky,border:"none",color:T.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Send</button>
        </div>
      </div>
    </div>
  );
}

function PatientPortal({currentUser,onLogout,appointments,setAppointments,addToast}){
  const profileKey=`rews_profile_${currentUser.email}`;
  const [profile,setProfile]=useState(()=>{
    try{ return JSON.parse(localStorage.getItem(profileKey)||"null"); }catch{ return null; }
  });
  const [page,setPage]=useState("home");
  const pid=currentUser.patient_id||DEMO_PATIENT_ID;
  const me=PATIENTS.find(p=>p.patient_id===pid)||PATIENTS[0];
  const myAppts=appointments.filter(a=>a.patient===pid);
  const upcoming=myAppts.filter(a=>a.date>="2026-04-08").sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));
  const past=myAppts.filter(a=>a.date<"2026-04-08").sort((a,b)=>b.date.localeCompare(a.date));

  function handleOnboardingComplete(data){
    localStorage.setItem(profileKey,JSON.stringify(data));
    setProfile(data);
    addToast("Profile saved! Welcome to your health portal.");
  }

  // Show onboarding if profile not yet set
  if(!profile) return <PatientOnboarding currentUser={currentUser} onComplete={handleOnboardingComplete}/>;

  const PAT_NAV=[
    {id:"home",icon:"🏠",label:"Home"},
    {id:"intake",icon:"📝",label:"Report Symptoms"},
    {id:"appointments",icon:"📅",label:"My Appointments"},
    {id:"mycare",icon:"❤️",label:"My Care Team"},
    {id:"health",icon:"📋",label:"Health Summary"},
    {id:"messages",icon:"💬",label:"Messages"},
    {id:"programs",icon:"🩸",label:"My Programs"},
  ];
  const typeColor=t=>t==="Telehealth"?T.sky:t==="In-Person"?T.navy:T.amber;
  const statusColor=s=>s==="Confirmed"?T.green:s==="Scheduled"?T.sky:s==="Pending"?T.amber:T.muted;

  function renderPatientPage(){
    switch(page){
      case "home":         return <PatientHome me={me} upcoming={upcoming} setPage={setPage} currentUser={currentUser} statusColor={statusColor} profile={profile}/>;
      case "intake":       return <PatientIntakeForm me={me} profile={profile} currentUser={currentUser} addToast={addToast} onDone={()=>setPage("home")}/>;
      case "appointments": return <PatientAppointments me={me} upcoming={upcoming} past={past} typeColor={typeColor} statusColor={statusColor} appointments={appointments} setAppointments={setAppointments} addToast={addToast} pid={pid}/>;
      case "mycare":       return <PatientCareTeam me={me} addToast={addToast}/>;
      case "health":       return <PatientHealth me={me} profile={profile}/>;
      case "messages":     return <PatientMessages me={me} addToast={addToast}/>;
      case "programs":     return <PatientDiabetesProgram me={me} addToast={addToast}/>;
      default:             return <PatientHome me={me} upcoming={upcoming} setPage={setPage} currentUser={currentUser} statusColor={statusColor} profile={profile}/>;
    }
  }

  return(
    <div style={{display:"flex",minHeight:"100vh",fontFamily:"DM Sans,sans-serif",background:"#F8FAFC"}}>
      {/* Patient Sidebar */}
      <div style={{width:240,background:`linear-gradient(180deg, #0F172A 0%, #1E3A5F 100%)`,display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,height:"100vh",zIndex:50}}>
        <div style={{padding:"24px 20px 20px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
          <div style={{fontSize:28,fontWeight:700,color:T.white,letterSpacing:"-0.02em"}}>TriSyd</div>
          <div style={{fontSize:10,color:"#7DD3FC",letterSpacing:"0.12em",textTransform:"uppercase",marginTop:2,fontWeight:500}}>Patient Portal</div>
        </div>
        <div style={{margin:"16px 12px",background:"rgba(255,255,255,0.07)",borderRadius:12,padding:"14px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg, ${T.sky}, #38BDF8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,color:T.white,flexShrink:0}}>
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:T.white,lineHeight:1.2}}>{currentUser.name}</div>
              <div style={{fontSize:11,color:"#7DD3FC",marginTop:3}}>{me.patient_id} · {profile?.age||me.age} yrs</div>
            </div>
          </div>
        </div>
        <nav style={{flex:1,padding:"8px 8px",overflowY:"auto"}}>
          {PAT_NAV.map(item=>{
            const isActive=page===item.id;
            return(
              <button key={item.id} onClick={()=>setPage(item.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 14px",borderRadius:10,border:"none",background:isActive?"rgba(125,211,252,0.15)":"none",color:isActive?"#7DD3FC":T.textLight,fontSize:13,fontWeight:isActive?600:400,cursor:"pointer",fontFamily:"inherit",marginBottom:2,textAlign:"left",transition:"all 0.15s",position:"relative"}}
                onMouseEnter={e=>{if(!isActive)e.currentTarget.style.background="rgba(255,255,255,0.06)";}}
                onMouseLeave={e=>{if(!isActive)e.currentTarget.style.background="none";}}>
                {isActive&&<div style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",width:3,height:20,background:"#7DD3FC",borderRadius:"0 2px 2px 0"}}/>}
                <span style={{fontSize:16}}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div style={{padding:"14px 12px",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
          <button onClick={onLogout} style={{width:"100%",padding:"9px",borderRadius:8,background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"background 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.25)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,0.15)"}>
            Sign Out
          </button>
        </div>
      </div>
      {/* Main content */}
      <div style={{marginLeft:240,flex:1,display:"flex",flexDirection:"column",minHeight:"100vh"}}>
        <div style={{height:60,background:T.white,borderBottom:`1px solid ${T.border}`,padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:40,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
          <div style={{fontSize:17,fontWeight:700,color:T.text}}>{PAT_NAV.find(n=>n.id===page)?.label||"Home"}</div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:12,color:T.muted}}>{new Date().toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}</div>
            <div style={{width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg, ${T.sky}, #38BDF8)`,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontWeight:700,fontSize:14}}>{currentUser.name.charAt(0)}</div>
          </div>
        </div>
        <div style={{flex:1,padding:"32px",overflowY:"auto"}}>
          <div key={page} style={{animation:"pageIn 0.35s ease",maxWidth:900,margin:"0 auto"}}>
            <style>{`@keyframes pageIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
            {renderPatientPage()}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Patient: Home ────────────────────────────────────────────────────────────
function PatientHome({me,upcoming,setPage,currentUser,statusColor,profile}){
  const v=useVisible(50);
  const next=upcoming[0];
  const hour=new Date().getHours();
  const greeting=hour<12?"Good morning":hour<18?"Good afternoon":"Good evening";
  const tips=[
    {icon:"💧",text:"Stay hydrated — aim for 8 glasses of water today."},
    {icon:"🚶",text:"A 15-minute walk can help manage blood pressure."},
    {icon:"💊",text:`You have ${profile?.num_meds??me.num_meds} medications. Take them at the same time each day.`},
    {icon:"📞",text:"If you feel unwell, call your care team right away."},
  ];
  const tip=tips[Math.floor(Date.now()/86400000)%tips.length];
  // Check if there's a pending submission
  const submissions=JSON.parse(localStorage.getItem("rews_intake_submissions")||"[]");
  const pendingCount=submissions.filter(s=>s.patient_id===me.patient_id&&s.status==="pending").length;
  return(
    <div>
      <div style={{background:`linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)`,borderRadius:20,padding:"32px 36px",marginBottom:24,opacity:v?1:0,transform:v?"translateY(0)":"translateY(14px)",transition:"opacity 0.5s,transform 0.5s",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:200,height:200,borderRadius:"50%",background:"rgba(14,165,233,0.08)"}}/>
        <div style={{position:"absolute",bottom:-60,right:80,width:140,height:140,borderRadius:"50%",background:"rgba(14,165,233,0.05)"}}/>
        <div style={{fontSize:24,fontWeight:700,color:T.white,marginBottom:6}}>{greeting}, {currentUser.name.split(" ")[0]} 👋</div>
        <div style={{fontSize:14,color:"rgba(248,250,252,0.65)"}}>Here's your health overview for today.</div>
      </div>
      {/* Report Symptoms CTA */}
      <div onClick={()=>setPage("intake")} style={{background:T.white,borderRadius:16,border:`2px solid ${T.sky}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 26px",marginBottom:20,display:"flex",alignItems:"center",gap:18,cursor:"pointer",opacity:v?1:0,transition:"opacity 0.5s ease 50ms"}}
        onMouseEnter={e=>{e.currentTarget.style.background=T.skyLight;}}
        onMouseLeave={e=>{e.currentTarget.style.background=T.white;}}>
        <div style={{width:56,height:56,borderRadius:16,background:T.skyLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>📝</div>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:700,color:T.text,marginBottom:3}}>Not feeling well?</div>
          <div style={{fontSize:13,color:T.muted}}>Tell us your symptoms and a member of your care team will follow up with you.</div>
        </div>
        <div style={{padding:"10px 20px",borderRadius:10,background:T.sky,color:T.white,fontSize:13,fontWeight:700,flexShrink:0}}>Report Symptoms →</div>
      </div>
      {pendingCount>0&&(
        <div style={{background:T.amberLight,borderRadius:12,border:`1px solid ${T.amber}44`,padding:"14px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:20}}>⏳</span>
          <div style={{fontSize:13,color:"#92400E",fontWeight:500}}>You have <strong>{pendingCount}</strong> symptom report{pendingCount>1?"s":""} awaiting review by your care team.</div>
        </div>
      )}
      {next&&(
        <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"20px 24px",marginBottom:24,display:"flex",alignItems:"center",gap:20,opacity:v?1:0,transition:"opacity 0.5s ease 100ms",cursor:"pointer"}}
          onClick={()=>setPage("appointments")}>
          <div style={{width:56,height:56,borderRadius:16,background:T.skyLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>📅</div>
          <div style={{flex:1}}>
            <div style={{fontSize:11,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>Next Appointment</div>
            <div style={{fontSize:17,fontWeight:700,color:T.text}}>{next.type} with {next.clinician}</div>
            <div style={{fontSize:13,color:T.muted,marginTop:2}}>{new Date(next.date).toLocaleDateString("en-AU",{weekday:"long",day:"numeric",month:"long"})} at {next.time}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
            <span style={{padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600,background:statusColor(next.status)+"22",color:statusColor(next.status)}}>{next.status}</span>
            <span style={{fontSize:12,color:T.sky,fontWeight:500}}>View details →</span>
          </div>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:24}}>
        {[
          {icon:"📅",label:"Upcoming",value:upcoming.length,sub:"appointments",color:T.sky,page:"appointments"},
          {icon:"👨‍⚕️",label:"Care Team",value:DOCTORS.length,sub:"doctors assigned",color:T.green,page:"mycare"},
          {icon:"💊",label:"Medications",value:profile?.num_meds??me.num_meds,sub:"active prescriptions",color:T.amber,page:"health"},
        ].map((c,i)=>(
          <div key={i} onClick={()=>setPage(c.page)} style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",borderTop:`3px solid ${c.color}`,padding:"20px 22px",cursor:"pointer",opacity:v?1:0,transform:v?"translateY(0)":"translateY(16px)",transition:`opacity 0.5s ease ${100+i*80}ms,transform 0.5s ease ${100+i*80}ms`}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 6px 28px rgba(0,0,0,0.1)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)";}}>
            <div style={{fontSize:24,marginBottom:10}}>{c.icon}</div>
            <div style={{fontSize:11,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>{c.label}</div>
            <div style={{fontSize:34,fontWeight:700,color:T.text,lineHeight:1}}>{c.value}</div>
            <div style={{fontSize:12,color:T.muted,marginTop:4}}>{c.sub}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 24px",opacity:v?1:0,transition:"opacity 0.5s ease 400ms"}}>
          <div style={{fontSize:12,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:14}}>💡 Daily Health Tip</div>
          <div style={{fontSize:32,marginBottom:12}}>{tip.icon}</div>
          <div style={{fontSize:14,color:T.text,lineHeight:1.6}}>{tip.text}</div>
        </div>
        <div style={{background:`linear-gradient(135deg, ${T.red}, #DC2626)`,borderRadius:14,padding:"22px 24px",opacity:v?1:0,transition:"opacity 0.5s ease 480ms"}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:14}}>🚨 Emergency Contacts</div>
          {[{label:"Emergency",num:"000"},{label:"Nurse Hotline",num:"1800 022 222"},{label:"Your Clinic",num:"(08) 8911 0000"}].map((c,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:i<2?"1px solid rgba(255,255,255,0.15)":"none"}}>
              <span style={{fontSize:13,color:"rgba(255,255,255,0.8)"}}>{c.label}</span>
              <a href={`tel:${c.num.replace(/\s/g,"")}`} style={{fontSize:15,fontWeight:700,color:T.white,textDecoration:"none"}}>{c.num}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Patient: Appointments ────────────────────────────────────────────────────
function PatientAppointments({me,upcoming,past,statusColor,setAppointments,addToast,pid}){
  const v=useVisible(50);
  const [showForm,setShowForm]=useState(false);
  const [form,setForm]=useState({date:"2026-04-15",time:"09:00",clinician:"Dr. Sarah Chen",type:"Telehealth",note:""});
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const inp={width:"100%",padding:"9px 12px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box",color:T.text,transition:"border-color 0.15s"};

  function handleRequest(e){
    e.preventDefault();
    if(!form.date||!form.time||!form.clinician){addToast("Please fill in all fields.","error");return;}
    const newAppt={id:Date.now(),date:form.date,time:form.time,patient:pid,type:form.type,tier:me.risk_tier,clinician:form.clinician,status:"Pending"};
    setAppointments(a=>[...a,newAppt]);
    setShowForm(false);
    addToast(`Appointment request sent to ${form.clinician}. They'll confirm shortly.`);
  }

  function ApptCard({a,dim=false}){
    const d=new Date(a.date);
    const monthStr=d.toLocaleDateString("en-AU",{month:"short"});
    const dayStr=d.getDate();
    return(
      <div style={{background:dim?"#FAFAFA":T.white,borderRadius:14,border:`1px solid ${T.border}`,boxShadow:dim?"none":"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"18px 22px",display:"flex",alignItems:"center",gap:18,opacity:dim?0.6:1,marginBottom:12}}>
        <div style={{width:52,height:56,borderRadius:12,background:dim?T.slateBg:T.skyLight,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <div style={{fontSize:11,fontWeight:600,color:dim?T.muted:T.sky,textTransform:"uppercase"}}>{monthStr}</div>
          <div style={{fontSize:22,fontWeight:700,color:dim?T.muted:T.navy,lineHeight:1}}>{dayStr}</div>
        </div>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <span style={{fontWeight:700,color:T.text,fontSize:15}}>{a.type} Appointment</span>
            <span style={{padding:"2px 8px",borderRadius:8,fontSize:11,fontWeight:600,background:statusColor(a.status)+"22",color:statusColor(a.status)}}>{a.status}</span>
          </div>
          <div style={{fontSize:13,color:T.muted}}>👨‍⚕️ {a.clinician} · ⏰ {a.time}</div>
        </div>
        {!dim&&a.type==="Telehealth"&&(
          <button style={{padding:"8px 16px",borderRadius:9,background:T.sky,border:"none",color:T.white,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",flexShrink:0}}
            onClick={()=>addToast("Telehealth link sent to your email.")}>Join Call</button>
        )}
        {!dim&&a.type!=="Telehealth"&&(
          <button style={{padding:"8px 16px",borderRadius:9,background:"none",border:`1px solid ${T.border}`,color:T.muted,fontSize:12,cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>Get Directions</button>
        )}
      </div>
    );
  }

  return(
    <div style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div>
          <div style={{fontSize:20,fontWeight:700,color:T.text}}>My Appointments</div>
          <div style={{fontSize:13,color:T.muted,marginTop:2}}>{upcoming.length} upcoming · {past.length} past</div>
        </div>
        <button onClick={()=>setShowForm(f=>!f)} style={{padding:"10px 20px",borderRadius:10,background:T.sky,border:"none",color:T.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+ Request Appointment</button>
      </div>
      {showForm&&(
        <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"24px 28px",marginBottom:24}}>
          <div style={{fontSize:15,fontWeight:700,color:T.text,marginBottom:18}}>Request a New Appointment</div>
          <form onSubmit={handleRequest}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
              <div>
                <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:5}}>Preferred Date</div>
                <input type="date" value={form.date} onChange={set("date")} style={inp} onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
              </div>
              <div>
                <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:5}}>Preferred Time</div>
                <input type="time" value={form.time} onChange={set("time")} style={inp} onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
              </div>
              <div>
                <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:5}}>Doctor</div>
                <select value={form.clinician} onChange={set("clinician")} style={inp}>
                  {DOCTORS.map(d=><option key={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:5}}>Type</div>
                <select value={form.type} onChange={set("type")} style={inp}>
                  <option>Telehealth</option><option>In-Person</option><option>Follow-Up</option>
                </select>
              </div>
            </div>
            <div style={{marginBottom:16}}>
              <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:5}}>Reason / Note (optional)</div>
              <textarea value={form.note} onChange={set("note")} placeholder="Briefly describe your concern…" rows={3}
                style={{...inp,resize:"vertical"}} onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button type="submit" style={{padding:"10px 24px",borderRadius:9,background:T.sky,border:"none",color:T.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Send Request</button>
              <button type="button" onClick={()=>setShowForm(false)} style={{padding:"10px 18px",borderRadius:9,background:"none",border:`1px solid ${T.border}`,color:T.muted,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {upcoming.length>0?(
        <div style={{marginBottom:28}}>
          <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:T.green,display:"inline-block"}}/>Upcoming
          </div>
          {upcoming.map(a=><ApptCard key={a.id} a={a}/>)}
        </div>
      ):(
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,padding:"40px",textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:36,marginBottom:12}}>😭</div>
          <div style={{fontSize:16,fontWeight:600,color:T.text,marginBottom:6}}>No upcoming appointments</div>
          <div style={{fontSize:13,color:T.muted}}>Click "Request Appointment" above to book one.</div>
        </div>
      )}
      {past.length>0&&(
        <div>
          <div style={{fontSize:13,fontWeight:700,color:T.muted,marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:T.muted,display:"inline-block"}}/>Past Appointments
          </div>
          {past.map(a=><ApptCard key={a.id} a={a} dim/>)}
        </div>
      )}
    </div>
  );
}

// ─── Patient: Care Team ───────────────────────────────────────────────────────
function PatientCareTeam({me,addToast}){
  const v=useVisible(50);
  const avatarColors=["#0EA5E9","#10B981","#8B5CF6"];
  return(
    <div style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      <div style={{fontSize:20,fontWeight:700,color:T.text,marginBottom:4}}>My Care Team</div>
      <div style={{fontSize:13,color:T.muted,marginBottom:24}}>Your assigned healthcare professionals</div>
      <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:28}}>
        {DOCTORS.map((doc,i)=>(
          <div key={doc.id} style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"24px 28px",display:"flex",alignItems:"center",gap:20,opacity:v?1:0,transform:v?"translateY(0)":"translateY(16px)",transition:`opacity 0.5s ease ${i*80}ms,transform 0.5s ease ${i*80}ms`}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:avatarColors[i],display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,color:T.white,flexShrink:0}}>{doc.avatar}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:17,fontWeight:700,color:T.text,marginBottom:3}}>{doc.name}</div>
              <div style={{fontSize:13,color:T.sky,fontWeight:500,marginBottom:6}}>{doc.specialty}</div>
              <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                <span style={{fontSize:12,color:T.muted}}>⏰ {doc.available}</span>
                <span style={{fontSize:12,color:T.muted}}>✉️ {doc.email}</span>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8,flexShrink:0}}>
              <a href={`tel:${doc.phone.replace(/\s/g,"")}`}
                style={{padding:"9px 18px",borderRadius:9,background:T.sky,border:"none",color:T.white,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textDecoration:"none",textAlign:"center"}}
                onClick={()=>addToast(`Calling ${doc.name}…`)}>
                📞 Call
              </a>
              <button onClick={()=>addToast(`Message sent to ${doc.name}.`)}
                style={{padding:"9px 18px",borderRadius:9,background:"none",border:`1.5px solid ${T.border}`,color:T.muted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                💬 Message
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:`linear-gradient(135deg, #0F172A, #1E3A5F)`,borderRadius:16,padding:"24px 28px"}}>
        <div style={{fontSize:12,color:"rgba(248,250,252,0.5)",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:10}}>Your Current Care Plan</div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
          <span style={{fontSize:28}}>{iIcon[me.recommended_intervention]}</span>
          <div style={{fontSize:18,fontWeight:700,color:T.white}}>{me.recommended_intervention}</div>
        </div>
        <div style={{fontSize:13,color:"rgba(248,250,252,0.6)"}}>Recommended by your care team based on your health profile. Please keep all scheduled appointments.</div>
      </div>
    </div>
  );
}

// ─── Patient: Health Summary ──────────────────────────────────────────────────
function PatientHealth({me,profile}){
  const v=useVisible(50);
  // Merge profile (self-entered) with demo data — profile takes priority
  const age       = profile?.age       || me.age;
  const numMeds   = profile?.num_meds  ?? me.num_meds;
  const edVisits  = profile?.ed_visits ?? me.ed_visits;
  const missedApp = profile?.missed_appts ?? me.missed_appts;
  const daysSinceGp = profile?.days_since_gp ?? me.days_since_gp;
  const smokingStatus = profile?.smoking_status || me.smoking_status;
  const livesAlone    = profile?.lives_alone    || me.lives_alone;
  const telehealthUse = profile?.telehealth_6m  || me.telehealth_6m;

  // Build conditions list from profile if available, otherwise fall back to me.diagnosis
  const diagnoses = profile
    ? [...(profile.conditions||[]), ...(profile.conditions_other?[profile.conditions_other]:[])].filter(Boolean)
    : me.diagnosis.split(" | ");

  const rc=riskColor(me.risk_tier);
  const [ringKey]=useState(0);

  const meds=[
    {name:"Ramipril",dose:"5mg",freq:"Once daily",purpose:"Blood pressure"},
    {name:"Furosemide",dose:"40mg",freq:"Morning",purpose:"Fluid management"},
    {name:"Metformin",dose:"500mg",freq:"Twice daily",purpose:"Diabetes"},
    {name:"Atorvastatin",dose:"20mg",freq:"At night",purpose:"Cholesterol"},
  ].slice(0,Math.min(numMeds,4));

  return(
    <div style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <div style={{fontSize:20,fontWeight:700,color:T.text,marginBottom:4}}>Health Summary</div>
          <div style={{fontSize:13,color:T.muted}}>Your self-reported health profile</div>
        </div>
        {profile&&(
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:20,background:T.greenLight,border:`1px solid ${T.green}33`}}>
            <span style={{fontSize:12}}>✅</span>
            <span style={{fontSize:11,fontWeight:600,color:T.green}}>Profile complete</span>
          </div>
        )}
      </div>

      {/* Risk ring + quick stats */}
      <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:20,marginBottom:20}}>
        <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"24px 28px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minWidth:180}}>
          <div style={{position:"relative",marginBottom:12}}>
            <RiskRing key={ringKey} pct={me.risk_probability} size={120} stroke={10} color={rc}/>
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:700,color:rc,lineHeight:1}}>{me.risk_probability}%</div>
              <div style={{fontSize:10,color:T.muted}}>risk</div>
            </div>
          </div>
          <RiskBadge tier={me.risk_tier}/>
          <div style={{fontSize:11,color:T.muted,marginTop:8,textAlign:"center"}}>Health risk score</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[
            {label:"Age",val:`${age} years`,icon:"🎂"},
            {label:"Medications",val:`${me.num_meds} active`,icon:"💊"},
            {label:"ED Visits (6m)",val:edVisits,icon:"🏥",warn:edVisits>=3},
            {label:"Days Since GP Visit",val:`${daysSinceGp} days`,icon:"📅",warn:daysSinceGp>90},
          ].map((item,i)=>(
            <div key={i} style={{background:item.warn?T.redLight:T.white,borderRadius:12,border:`1px solid ${item.warn?T.red+"44":T.border}`,padding:"14px 18px",opacity:v?1:0,transform:v?"translateY(0)":"translateY(10px)",transition:`opacity 0.5s ease ${i*60}ms,transform 0.5s ease ${i*60}ms`}}>
              <div style={{fontSize:18,marginBottom:6}}>{item.icon}</div>
              <div style={{fontSize:11,color:item.warn?T.red:T.muted,fontWeight:500,marginBottom:3}}>{item.label}</div>
              <div style={{fontSize:15,fontWeight:700,color:item.warn?T.red:T.text}}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent history row */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        {[
          {label:"Missed Appointments",val:missedApp,icon:"📋",warn:missedApp>=3},
          {label:"Medications",val:`${numMeds} active`,icon:"💊",warn:false},
        ].map((item,i)=>(
          <div key={i} style={{background:item.warn?T.amberLight:T.white,borderRadius:12,border:`1px solid ${item.warn?T.amber+"44":T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06)",padding:"14px 18px"}}>
            <div style={{fontSize:18,marginBottom:6}}>{item.icon}</div>
            <div style={{fontSize:11,color:item.warn?T.amber:T.muted,fontWeight:500,marginBottom:3}}>{item.label}</div>
            <div style={{fontSize:15,fontWeight:700,color:item.warn?T.amber:T.text}}>{item.val}</div>
          </div>
        ))}
      </div>

      {/* Conditions */}
      <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 26px",marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:16}}>🩺 My Conditions</div>
        {diagnoses.length>0?(
          <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
            {diagnoses.map((d,i)=>(
              <span key={i} style={{padding:"7px 14px",borderRadius:20,background:T.skyLight,color:T.navy,fontSize:13,fontWeight:600,border:`1px solid ${T.sky}22`}}>{d}</span>
            ))}
          </div>
        ):(
          <div style={{fontSize:13,color:T.muted,fontStyle:"italic"}}>No conditions recorded.</div>
        )}
      </div>

      {/* Medications */}
      <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 26px",marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,color:T.text}}>💊 My Medications</div>
          <span style={{fontSize:12,color:T.muted}}>{numMeds} total active</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {meds.map((m,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 16px",borderRadius:10,background:T.slateBg}}>
              <div style={{width:36,height:36,borderRadius:10,background:T.white,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>💊</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:14,color:T.text}}>{m.name} <span style={{fontWeight:400,color:T.muted}}>{m.dose}</span></div>
                <div style={{fontSize:12,color:T.muted}}>{m.freq} · {m.purpose}</div>
              </div>
            </div>
          ))}
          {numMeds>4&&(
            <div style={{fontSize:12,color:T.muted,textAlign:"center",padding:"8px",fontStyle:"italic"}}>+{numMeds-4} more medications — ask your doctor for the full list</div>
          )}
        </div>
      </div>

      {/* Lifestyle */}
      <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 26px",marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:16}}>🌿 Lifestyle Factors</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[
            {label:"Smoking",val:smokingStatus==="never"?"Non-smoker":smokingStatus==="former"?"Former smoker":"Current smoker",ok:smokingStatus==="never",icon:"🚬"},
            {label:"Living Situation",val:livesAlone==="yes"?"Lives alone":"Lives with others",ok:livesAlone==="no",icon:"🏠"},
            {label:"Telehealth",val:telehealthUse==="yes"?"Telehealth capable":"Not set up",ok:telehealthUse==="yes",icon:"💻"},
            {label:"Telehealth Ready",val:me.telehealth_6m==="yes"?"Set up and available":"Not set up",ok:me.telehealth_6m==="yes",icon:"💻"},
          ].map((item,i)=>(
            <div key={i} style={{padding:"12px 16px",borderRadius:10,background:item.ok?T.greenLight:T.amberLight,border:`1px solid ${item.ok?T.green+"33":T.amber+"33"}`}}>
              <div style={{fontSize:11,color:item.ok?T.green:T.amber,fontWeight:600,marginBottom:4}}>{item.icon} {item.label}</div>
              <div style={{fontSize:13,fontWeight:600,color:T.text}}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Records */}
      <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",padding:"22px 26px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,color:T.text}}>📁 Medical Records</div>
          <div style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:14,background:"#EFF6FF",border:"1px solid #BFDBFE"}}>
            <span style={{fontSize:11}}>🔒</span>
            <span style={{fontSize:11,fontWeight:600,color:"#1D4ED8"}}>Private & Encrypted</span>
          </div>
        </div>
        {profile?.records?.length>0?(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {profile.records.map((r,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:9,background:T.slateBg,border:`1px solid ${T.border}`}}>
                <span style={{fontSize:18}}>{r.type?.includes("pdf")?"📄":r.type?.includes("image")?"🖼️":"📝"}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,color:T.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.name}</div>
                  <div style={{fontSize:11,color:T.muted}}>{(r.size/1024).toFixed(0)} KB · Uploaded {new Date(r.uploaded).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"})}</div>
                </div>
                <div style={{padding:"3px 8px",borderRadius:8,background:"#EFF6FF",border:"1px solid #BFDBFE",fontSize:10,fontWeight:600,color:"#1D4ED8",flexShrink:0}}>🔒 Private</div>
              </div>
            ))}
          </div>
        ):(
          <div style={{textAlign:"center",padding:"24px 0",color:T.muted}}>
            <div style={{fontSize:32,marginBottom:8}}>📂</div>
            <div style={{fontSize:13,fontWeight:500,marginBottom:4}}>No records uploaded yet</div>
            <div style={{fontSize:12,fontStyle:"italic"}}>You can upload medical records — they'll be private and only shared with your care team.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Patient: Intake Form ─────────────────────────────────────────────────────
function PatientIntakeForm({me,profile,currentUser,addToast,onDone}){
  const INTAKE_KEY="rews_intake_submissions";
  const [submitted,setSubmitted]=useState(false);
  const [loading,setLoading]=useState(false);

  const [form,setForm]=useState({
    // Red-flag symptoms
    chest_pain:false, shortness_of_breath:false, confusion_drowsy:false,
    speech_distress:false, heavy_bleeding:false, thunderclap_headache:false,
    // Proxy (shown conditionally)
    chest_radiates:false, chest_sweating:false, sob_worse_lying:false,
    // General symptoms
    heart_racing:false, fever:false, tiredness:false, nausea:false,
    bowel_change:false, low_mood:false, panic_attacks:false,
    sleep_disturb:false, joint_stiff_swelling:false, skin_rash:false, sugar_imbalance:false,
    // Vitals — null means "I don't know"
    o2_sat:"", o2_sat_unknown:false,
    heart_rate:"", heart_rate_unknown:false,
    systolic_bp:"", systolic_bp_unknown:false,
    temperature:"", temperature_unknown:false,
    // Duration & context
    duration_days:"1",
    notes:"",
    alone:false,
  });

  const set=k=>v=>setForm(f=>({...f,[k]:v}));
  const toggle=k=>setForm(f=>({...f,[k]:!f[k]}));

  function getSymptoms(f){
    return {
      chest_pain:f.chest_pain, shortness_of_breath:f.shortness_of_breath,
      confusion_drowsy:f.confusion_drowsy, speech_distress:f.speech_distress,
      heavy_bleeding:f.heavy_bleeding, thunderclap_headache:f.thunderclap_headache,
      heart_racing:f.heart_racing, fever:f.fever, tiredness:f.tiredness,
      bowel_change:f.bowel_change, low_mood:f.low_mood, panic_attacks:f.panic_attacks,
      sleep_disturb:f.sleep_disturb, joint_stiff_swelling:f.joint_stiff_swelling,
      skin_rash:f.skin_rash, sugar_imbalance:f.sugar_imbalance,
      o2_sat: f.o2_sat_unknown?"":f.o2_sat,
      heart_rate: f.heart_rate_unknown?"":f.heart_rate,
      systolic_bp: f.systolic_bp_unknown?"":f.systolic_bp,
      duration_days: f.duration_days||1,
    };
  }

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    const symptoms=getSymptoms(form);
    const payload=buildPredictionPayload(me,profile,symptoms);
    let risk_result = null;
    try {
      risk_result = await getPrediction(payload);
    } catch (err) {
      console.error("Risk calc failed silently", err);
      addToast("Risk calculation failed — submission saved without score.", "warn");
    }

    const submission={
      id:Date.now(),
      patient_id:me.patient_id,
      patient_name:currentUser.name,
      submitted_at:new Date().toISOString(),
      form:{...form},
      risk_result,
      status:"pending",
    };
    const prev=JSON.parse(localStorage.getItem(INTAKE_KEY)||"[]");
    localStorage.setItem(INTAKE_KEY,JSON.stringify([...prev,submission]));
    setLoading(false);
    setSubmitted(true);
    addToast("Your symptoms have been submitted to your care team.");
  }

  const v=useVisible(50);
  const inp={width:"100%",padding:"9px 12px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box",color:T.text,background:T.white,transition:"border-color 0.15s"};

  function SympChk({field,label,urgent=false}){
    return(
      <label style={{display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderRadius:9,border:`1.5px solid ${form[field]?(urgent?T.red:T.sky):T.border}`,background:form[field]?(urgent?T.redLight:T.skyLight):T.white,cursor:"pointer",transition:"all 0.12s",userSelect:"none"}} onClick={()=>toggle(field)}>
        <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${form[field]?(urgent?T.red:T.sky):T.muted}`,background:form[field]?(urgent?T.red:T.sky):"none",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.12s"}}>
          {form[field]&&<span style={{color:T.white,fontSize:11,fontWeight:700}}>✓</span>}
        </div>
        <span style={{fontSize:13,fontWeight:form[field]?600:400,color:form[field]?(urgent?T.red:T.navy):T.text}}>{label}</span>
      </label>
    );
  }

  function VitalInput({field,unknownField,label,unit,min,max,placeholder}){
    const unknown=form[unknownField];
    return(
      <div style={{background:T.white,borderRadius:12,border:`1px solid ${T.border}`,padding:"14px 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <span style={{fontSize:13,fontWeight:600,color:T.text}}>{label}</span>
          <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",userSelect:"none"}} onClick={()=>toggle(unknownField)}>
            <div style={{width:16,height:16,borderRadius:3,border:`1.5px solid ${unknown?T.amber:T.muted}`,background:unknown?T.amberLight:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {unknown&&<span style={{fontSize:10,color:T.amber,fontWeight:700}}>✓</span>}
            </div>
            <span style={{fontSize:11,color:T.muted}}>I don't know</span>
          </label>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <input type="number" min={min} max={max} placeholder={unknown?"—":placeholder}
            disabled={unknown} value={unknown?"":form[field]}
            onChange={e=>set(field)(e.target.value)}
            style={{...inp,flex:1,background:unknown?T.slateBg:"#fff",color:unknown?T.muted:T.text,cursor:unknown?"not-allowed":"text"}}
            onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
          <span style={{fontSize:12,color:T.muted,whiteSpace:"nowrap"}}>{unit}</span>
        </div>
      </div>
    );
  }

  if(submitted){
    return(
      <div style={{textAlign:"center",padding:"60px 24px",opacity:v?1:0,transition:"opacity 0.5s"}}>
        <div style={{fontSize:64,marginBottom:20}}>✅</div>
        <div style={{fontSize:22,fontWeight:700,color:T.text,marginBottom:10}}>Submitted successfully</div>
        <div style={{fontSize:14,color:T.muted,lineHeight:1.7,marginBottom:32,maxWidth:420,margin:"0 auto 32px"}}>
          Your symptom report has been sent to your care team. A team member will review it and contact you if needed. If your symptoms are getting worse, please call <strong>000</strong> or your clinic directly.
        </div>
        <button onClick={onDone} style={{padding:"12px 32px",borderRadius:10,background:T.sky,border:"none",color:T.white,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Back to Home</button>
      </div>
    );
  }

  return(
    <form onSubmit={handleSubmit} style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      <div style={{fontSize:20,fontWeight:700,color:T.text,marginBottom:4}}>Report Symptoms</div>
      <div style={{fontSize:13,color:T.muted,marginBottom:24}}>Tell us how you're feeling. Your care team will review this and follow up with you.</div>

      {/* Red-flag symptoms */}
      <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06)",padding:"22px 24px",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
          <span style={{fontSize:16}}>🚨</span>
          <div style={{fontSize:14,fontWeight:700,color:T.text}}>Urgent Symptoms</div>
        </div>
        <div style={{fontSize:12,color:T.muted,marginBottom:16}}>Select anything that applies right now</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <SympChk field="chest_pain" label="Chest pain or tightness" urgent/>
          <SympChk field="shortness_of_breath" label="Shortness of breath" urgent/>
          <SympChk field="confusion_drowsy" label="Confusion or drowsiness" urgent/>
          <SympChk field="speech_distress" label="Difficulty speaking" urgent/>
          <SympChk field="heavy_bleeding" label="Heavy or unusual bleeding" urgent/>
          <SympChk field="thunderclap_headache" label="Sudden severe headache" urgent/>
        </div>
        {/* Proxy questions — chest pain */}
        {form.chest_pain&&(
          <div style={{marginTop:14,padding:"14px 16px",borderRadius:10,background:T.redLight,border:`1px solid ${T.red}33`}}>
            <div style={{fontSize:12,fontWeight:600,color:T.red,marginBottom:10}}>A few more questions about your chest pain:</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <SympChk field="chest_radiates" label="Does the pain spread to your arm, jaw, or back?" urgent/>
              <SympChk field="chest_sweating" label="Are you also sweating or feeling nauseous?" urgent/>
            </div>
          </div>
        )}
        {/* Proxy — shortness of breath */}
        {form.shortness_of_breath&&(
          <div style={{marginTop:14,padding:"14px 16px",borderRadius:10,background:T.redLight,border:`1px solid ${T.red}33`}}>
            <div style={{fontSize:12,fontWeight:600,color:T.red,marginBottom:10}}>About your breathlessness:</div>
            <SympChk field="sob_worse_lying" label="Is it worse when lying flat?" urgent/>
          </div>
        )}
        {(form.chest_pain||form.shortness_of_breath||form.confusion_drowsy||form.speech_distress)&&(
          <div style={{marginTop:16,padding:"12px 14px",borderRadius:10,background:"#FFF7ED",border:"1px solid #FED7AA",display:"flex",gap:10,alignItems:"center"}}>
            <span style={{fontSize:18}}>⚠️</span>
            <span style={{fontSize:12,color:"#92400E",fontWeight:500}}>If your symptoms are severe or getting worse quickly, please call <strong>000</strong> immediately.</span>
          </div>
        )}
      </div>

      {/* General symptoms */}
      <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06)",padding:"22px 24px",marginBottom:20}}>
        <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:6}}>🩺 Other Symptoms</div>
        <div style={{fontSize:12,color:T.muted,marginBottom:16}}>Select everything that applies</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <SympChk field="heart_racing" label="Heart racing / palpitations"/>
          <SympChk field="fever" label="Fever or chills"/>
          <SympChk field="tiredness" label="Unusual tiredness / fatigue"/>
          <SympChk field="nausea" label="Nausea or vomiting"/>
          <SympChk field="bowel_change" label="Change in bowel habits"/>
          <SympChk field="low_mood" label="Low mood / feeling down"/>
          <SympChk field="panic_attacks" label="Anxiety or panic attacks"/>
          <SympChk field="sleep_disturb" label="Sleep problems"/>
          <SympChk field="joint_stiff_swelling" label="Joint pain or swelling"/>
          <SympChk field="skin_rash" label="New skin rash or sores"/>
          <SympChk field="sugar_imbalance" label="Blood sugar feeling off"/>
        </div>
      </div>

      {/* Vitals */}
      <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06)",padding:"22px 24px",marginBottom:20}}>
        <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:6}}>📊 Vitals <span style={{fontWeight:400,color:T.muted,fontSize:13}}>(optional — tick "I don't know" if unsure)</span></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:14}}>
          <VitalInput field="o2_sat" unknownField="o2_sat_unknown" label="Oxygen saturation" unit="%" min={70} max={100} placeholder="e.g. 97"/>
          <VitalInput field="heart_rate" unknownField="heart_rate_unknown" label="Heart rate" unit="bpm" min={30} max={250} placeholder="e.g. 72"/>
          <VitalInput field="systolic_bp" unknownField="systolic_bp_unknown" label="Systolic blood pressure" unit="mmHg" min={50} max={260} placeholder="e.g. 120"/>
          <VitalInput field="temperature" unknownField="temperature_unknown" label="Temperature" unit="°C" min={34} max={43} placeholder="e.g. 37.2"/>
        </div>
      </div>

      {/* Duration & notes */}
      <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06)",padding:"22px 24px",marginBottom:24}}>
        <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:16}}>📋 A little more detail</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
          <div>
            <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:6}}>How long have you had these symptoms?</div>
            <select value={form.duration_days} onChange={e=>set("duration_days")(e.target.value)} style={inp}>
              <option value="1">Today (less than 24 hours)</option>
              <option value="2">1–2 days</option>
              <option value="4">3–5 days</option>
              <option value="7">About a week</option>
              <option value="14">1–2 weeks</option>
              <option value="30">More than 2 weeks</option>
            </select>
          </div>
          <div>
            <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:6}}>Are you alone right now?</div>
            <div style={{display:"flex",gap:10}}>
              {[{val:true,label:"Yes, I'm alone"},{val:false,label:"No, someone is with me"}].map(opt=>(
                <button key={String(opt.val)} type="button" onClick={()=>set("alone")(opt.val)}
                  style={{flex:1,padding:"9px",borderRadius:9,border:`1.5px solid ${form.alone===opt.val?T.sky:T.border}`,background:form.alone===opt.val?T.skyLight:T.white,color:form.alone===opt.val?T.sky:T.muted,fontSize:12,fontWeight:form.alone===opt.val?700:400,cursor:"pointer",fontFamily:"inherit",transition:"all 0.12s"}}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div style={{fontSize:12,color:T.muted,fontWeight:500,marginBottom:6}}>Anything else you'd like your care team to know? <span style={{fontWeight:400}}>(optional)</span></div>
          <textarea value={form.notes} onChange={e=>set("notes")(e.target.value)} placeholder="Describe anything else that's worrying you…" rows={3}
            style={{...inp,resize:"vertical"}} onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
        </div>
      </div>

      <button type="submit" disabled={loading} style={{width:"100%",padding:"14px",borderRadius:12,background:loading?"#94a3b8":T.sky,border:"none",color:T.white,fontSize:15,fontWeight:700,cursor:loading?"not-allowed":"pointer",fontFamily:"inherit",transition:"background 0.15s"}}>
        {loading?"Submitting…":"Submit to Care Team →"}
      </button>
    </form>
  );
}

// ─── Patient: Messages ────────────────────────────────────────────────────────
function PatientMessages({addToast}){
  const v=useVisible(50);
  const [selected,setSelected]=useState(0);
  const [reply,setReply]=useState("");
  const MESSAGES=[
    {id:0,from:"Dr. Sarah Chen",avatar:"SC",color:"#0EA5E9",date:"Today",time:"09:15",preview:"Your latest test results are in — everything looks stable.",body:"Hi, just wanted to let you know your latest blood panel results came back. Your kidney function markers are stable, and your HbA1c is within target range. Keep up the good work with your diet and medication routine. I'd like to see you again in 4–6 weeks. Let me know if you have any questions or if anything changes before then.",unread:true},
    {id:1,from:"Dr. James Wu",avatar:"JW",color:"#10B981",date:"Yesterday",time:"14:30",preview:"Reminder about your upcoming telehealth appointment.",body:"Hi there, this is a reminder that your telehealth appointment is coming up on 10 April at 9:30am. Please ensure you are in a quiet, well-lit space with a stable internet connection. The link will be sent to your email 15 minutes before. Please have a list of any symptoms or concerns ready to discuss.",unread:false},
    {id:2,from:"TriSyd Care Team",avatar:"RT",color:"#8B5CF6",date:"Apr 5",time:"11:00",preview:"Welcome to the TriSyd patient portal!",body:"Welcome to the Early Warning System patient portal. Here you can view your appointments, contact your care team, and access your health summary. If you have any questions about how to use the portal, please reply to this message or call our helpline at 1800 022 222. We're here to support your health.",unread:false},
  ];
  const msg=MESSAGES[selected];
  return(
    <div style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      <div style={{fontSize:20,fontWeight:700,color:T.text,marginBottom:4}}>Messages</div>
      <div style={{fontSize:13,color:T.muted,marginBottom:20}}>Secure messages from your care team</div>
      <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:16,height:520}}>
        <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06)",overflow:"hidden",display:"flex",flexDirection:"column"}}>
          <div style={{padding:"14px 16px",borderBottom:`1px solid ${T.border}`,fontSize:12,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.06em"}}>Inbox</div>
          {MESSAGES.map((m,i)=>(
            <div key={m.id} onClick={()=>setSelected(i)} style={{padding:"14px 16px",borderBottom:`1px solid ${T.border}`,cursor:"pointer",background:selected===i?T.skyLight:"none",transition:"background 0.12s"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:m.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:T.white,flexShrink:0}}>{m.avatar}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:13,fontWeight:m.unread?700:500,color:T.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:120}}>{m.from}</span>
                    <span style={{fontSize:11,color:T.muted,flexShrink:0}}>{m.date}</span>
                  </div>
                  <div style={{fontSize:12,color:T.muted,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginTop:2}}>{m.preview}</div>
                </div>
              </div>
              {m.unread&&<div style={{width:8,height:8,borderRadius:"50%",background:T.sky,marginLeft:"auto",marginTop:-20}}/>}
            </div>
          ))}
        </div>
        <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06)",display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"18px 24px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:msg.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:T.white}}>{msg.avatar}</div>
            <div>
              <div style={{fontWeight:700,fontSize:15,color:T.text}}>{msg.from}</div>
              <div style={{fontSize:12,color:T.muted}}>{msg.date} at {msg.time}</div>
            </div>
          </div>
          <div style={{flex:1,padding:"24px",overflowY:"auto",fontSize:14,color:T.text,lineHeight:1.7}}>{msg.body}</div>
          <div style={{padding:"16px 24px",borderTop:`1px solid ${T.border}`,display:"flex",gap:10}}>
            <input value={reply} onChange={e=>setReply(e.target.value)} placeholder="Write a reply…"
              style={{flex:1,padding:"10px 14px",borderRadius:9,border:`1.5px solid ${T.border}`,fontSize:13,fontFamily:"inherit",outline:"none",color:T.text,transition:"border-color 0.15s"}}
              onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
            <button onClick={()=>{if(reply.trim()){addToast("Message sent to your care team.");setReply("");}}}
              style={{padding:"10px 20px",borderRadius:9,background:T.sky,border:"none",color:T.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Doctor: Intake Queue ─────────────────────────────────────────────────────
function PageIntakeQueue({addToast,onNavigate}){
  const INTAKE_KEY="rews_intake_submissions";
  const [submissions,setSubmissions]=useState(()=>{
    try{return JSON.parse(localStorage.getItem(INTAKE_KEY)||"[]");}catch{return [];}
  });
  const [filter,setFilter]=useState("pending");
  const [expanded,setExpanded]=useState(null);
  const v=useVisible(50);

  function reload(){
    try{setSubmissions(JSON.parse(localStorage.getItem(INTAKE_KEY)||"[]"));}catch{}
  }

  function markReviewed(id){
    const updated=submissions.map(s=>s.id===id?{...s,status:"reviewed"}:s);
    localStorage.setItem(INTAKE_KEY,JSON.stringify(updated));
    setSubmissions(updated);
    addToast("Intake marked as reviewed.");
  }

  function clearAll(){
    localStorage.setItem(INTAKE_KEY,"[]");
    setSubmissions([]);
    addToast("All intake submissions cleared.");
  }

  const shown=submissions
    .filter(s=>filter==="all"||s.status===filter)
    .sort((a,b)=>{
      const rA=a.risk_result?.risk_probability??0;
      const rB=b.risk_result?.risk_probability??0;
      return rB-rA;
    });

// const tierOrder={HIGH:0,MEDIUM:1,LOW:2};
  const rc=t=>t==="HIGH"?T.red:t==="MEDIUM"?T.amber:T.green;
  const rbg=t=>t==="HIGH"?T.redLight:t==="MEDIUM"?T.amberLight:T.greenLight;

  function FlagList({form}){
    const flags=[];
    if(form.chest_pain) flags.push("Chest pain");
    if(form.shortness_of_breath) flags.push("SOB");
    if(form.confusion_drowsy) flags.push("Confusion/drowsy");
    if(form.speech_distress) flags.push("Speech difficulty");
    if(form.heavy_bleeding) flags.push("Heavy bleeding");
    if(form.thunderclap_headache) flags.push("Thunderclap headache");
    if(form.heart_racing) flags.push("Palpitations");
    if(form.fever) flags.push("Fever");
    if(form.tiredness) flags.push("Fatigue");
    if(form.low_mood) flags.push("Low mood");
    if(form.panic_attacks) flags.push("Panic attacks");
    if(form.joint_stiff_swelling) flags.push("Joint pain/swelling");
    if(form.skin_rash) flags.push("Skin rash");
    if(form.sugar_imbalance) flags.push("Sugar imbalance");
    if(form.nausea) flags.push("Nausea");
    if(form.bowel_change) flags.push("Bowel change");
    if(form.sleep_disturb) flags.push("Sleep issues");
    if(flags.length===0) return <span style={{fontSize:12,color:T.muted,fontStyle:"italic"}}>No specific symptoms flagged</span>;
    return(
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {flags.map((f,i)=>(
          <span key={i} style={{padding:"2px 9px",borderRadius:10,fontSize:11,background:T.slateBg,border:`1px solid ${T.border}`,color:T.text,fontWeight:500}}>{f}</span>
        ))}
      </div>
    );
  }

  return(
    <div style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <div style={{fontSize:16,fontWeight:700,color:T.text}}>Patient Intake Queue</div>
          <div style={{fontSize:13,color:T.muted,marginTop:2}}>{shown.length} submission{shown.length!==1?"s":""} · sorted by calculated risk</div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {["pending","reviewed","all"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{padding:"6px 14px",borderRadius:16,fontSize:12,fontWeight:600,border:`1.5px solid ${filter===f?T.sky:T.border}`,background:filter===f?T.skyLight:"none",color:filter===f?T.sky:T.muted,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{f}</button>
          ))}
          <button onClick={reload} style={{padding:"6px 12px",borderRadius:8,background:"none",border:`1px solid ${T.border}`,color:T.muted,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>↻ Refresh</button>
        </div>
      </div>

      {shown.length===0&&(
        <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,padding:"60px",textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:12}}>📭</div>
          <div style={{fontSize:16,fontWeight:600,color:T.text,marginBottom:6}}>No {filter==="all"?"":filter} submissions</div>
          <div style={{fontSize:13,color:T.muted}}>Patient intake forms will appear here when submitted.</div>
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {shown.map((s,i)=>{
          const rr=s.risk_result;
          const tier=rr?.risk_tier;
          const pct=rr?.risk_probability;
          const isExp=expanded===s.id;
          const submittedDate=new Date(s.submitted_at);
          const timeAgo=(()=>{const m=Math.round((Date.now()-submittedDate)/60000);if(m<60)return `${m}m ago`;if(m<1440)return `${Math.floor(m/60)}h ago`;return submittedDate.toLocaleDateString("en-AU",{day:"numeric",month:"short"});})();
          return(
            <div key={s.id} style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,borderLeft:`4px solid ${tier?rc(tier):T.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.06),0 4px 20px rgba(0,0,0,0.06)",overflow:"hidden",opacity:v?1:0,transform:v?"translateY(0)":"translateY(16px)",transition:`opacity 0.5s ease ${i*50}ms,transform 0.5s ease ${i*50}ms`}}>
              {/* Header row */}
              <div style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:16,cursor:"pointer"}} onClick={()=>setExpanded(isExp?null:s.id)}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                    {tier&&<span style={{padding:"3px 9px",borderRadius:8,fontSize:11,fontWeight:700,background:rbg(tier),color:rc(tier)}}>{tier}</span>}
                    {pct!==undefined&&<span style={{fontSize:14,fontWeight:700,color:tier?rc(tier):T.muted}}>{pct.toFixed(1)}%</span>}
                    <span style={{fontWeight:700,color:T.text,fontSize:14}}>{s.patient_name}</span>
                    <span style={{fontSize:12,color:T.muted}}>({s.patient_id})</span>
                    {s.status==="reviewed"&&<span style={{padding:"2px 8px",borderRadius:8,fontSize:11,fontWeight:600,background:T.greenLight,color:T.green}}>✓ Reviewed</span>}
                    <span style={{fontSize:11,color:T.muted,marginLeft:"auto"}}>{timeAgo}</span>
                  </div>
                  {rr?.urgency&&<div style={{fontSize:12,color:T.muted,marginBottom:4}}>Urgency: <strong style={{color:T.text}}>{rr.urgency}</strong>{rr?.ats_category&&` · ATS: ${rr.ats_category}`}</div>}
                  <FlagList form={s.form}/>
                </div>
                <div style={{display:"flex",gap:8,flexShrink:0,alignItems:"center"}}>
                  {s.status==="pending"&&(
                    <button onClick={e=>{e.stopPropagation();markReviewed(s.id);}} style={{padding:"7px 14px",borderRadius:8,background:T.green,border:"none",color:T.white,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Mark Reviewed</button>
                  )}
                  <button onClick={e=>{e.stopPropagation();onNavigate("schedule");}} style={{padding:"7px 14px",borderRadius:8,background:T.sky,border:"none",color:T.white,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Schedule</button>
                  <span style={{fontSize:18,color:T.muted,transition:"transform 0.2s",display:"inline-block",transform:isExp?"rotate(180deg)":"none"}}>⌄</span>
                </div>
              </div>

              {/* Expanded detail */}
              {isExp&&(
                <div style={{borderTop:`1px solid ${T.border}`,padding:"18px 20px",background:T.slateBg}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:16}}>
                    {/* Vitals */}
                    {[
                      {label:"SpO2",val:s.form.o2_sat_unknown?"Unknown":s.form.o2_sat?`${s.form.o2_sat}%`:"Not provided",warn:!s.form.o2_sat_unknown&&s.form.o2_sat&&parseFloat(s.form.o2_sat)<94},
                      {label:"Heart Rate",val:s.form.heart_rate_unknown?"Unknown":s.form.heart_rate?`${s.form.heart_rate} bpm`:"Not provided",warn:!s.form.heart_rate_unknown&&s.form.heart_rate&&(parseFloat(s.form.heart_rate)>100||parseFloat(s.form.heart_rate)<50)},
                      {label:"Systolic BP",val:s.form.systolic_bp_unknown?"Unknown":s.form.systolic_bp?`${s.form.systolic_bp} mmHg`:"Not provided",warn:!s.form.systolic_bp_unknown&&s.form.systolic_bp&&(parseFloat(s.form.systolic_bp)>160||parseFloat(s.form.systolic_bp)<90)},
                      {label:"Temperature",val:s.form.temperature_unknown?"Unknown":s.form.temperature?`${s.form.temperature}°C`:"Not provided",warn:!s.form.temperature_unknown&&s.form.temperature&&parseFloat(s.form.temperature)>37.8},
                      {label:"Duration",val:`${s.form.duration_days} day(s)`},
                      {label:"Alone",val:s.form.alone?"Yes — patient alone":"No"},
                    ].map((item,j)=>(
                      <div key={j} style={{background:item.warn?T.redLight:T.white,borderRadius:9,border:`1px solid ${item.warn?T.red+"44":T.border}`,padding:"10px 14px"}}>
                        <div style={{fontSize:11,color:item.warn?T.red:T.muted,fontWeight:500,marginBottom:3}}>{item.label}</div>
                        <div style={{fontSize:13,fontWeight:600,color:item.warn?T.red:T.text}}>{item.val}</div>
                      </div>
                    ))}
                  </div>
                  {s.form.notes&&(
                    <div style={{background:T.white,borderRadius:9,border:`1px solid ${T.border}`,padding:"12px 14px"}}>
                      <div style={{fontSize:11,color:T.muted,fontWeight:500,marginBottom:4}}>Patient notes</div>
                      <div style={{fontSize:13,color:T.text,lineHeight:1.6}}>{s.form.notes}</div>
                    </div>
                  )}
                  {rr?.reasons?.length>0&&(
                    <div style={{marginTop:12,background:T.white,borderRadius:9,border:`1px solid ${T.border}`,padding:"12px 14px"}}>
                      <div style={{fontSize:11,color:T.muted,fontWeight:500,marginBottom:6}}>Risk factors flagged by model</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                        {rr.reasons.map((r,j)=><span key={j} style={{padding:"3px 9px",borderRadius:8,fontSize:11,background:T.redLight,color:T.red,fontWeight:500}}>{r}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {submissions.length>0&&(
        <div style={{marginTop:20,textAlign:"right"}}>
          <button onClick={clearAll} style={{padding:"8px 18px",borderRadius:8,background:"none",border:`1px solid ${T.border}`,color:T.muted,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Clear all submissions</button>
        </div>
      )}
    </div>
  );
}

// ─── Specialist Referrals ─────────────────────────────────────────────────────
function PageSpecialist({addToast}){
  const [subTab,setSubTab]=useState("diabetes");
  const [selPat,setSelPat]=useState(null);
  const [enrolled,setEnrolled]=useState({"P002":true,"P007":true,"P011":true});
  const [recNote,setRecNote]=useState("");
  const v=useVisible(50);
  const PROG={"P002":{day:3,phase:"monitoring",lastGlucose:148,avgGlucose:132},"P007":{day:9,phase:"recommendations",lastGlucose:118,avgGlucose:115},"P011":{day:3,phase:"monitoring",lastGlucose:125,avgGlucose:120}};
  function diabRisk(p){
    if(p.diagnosis.toLowerCase().includes("type 2 diabetes")) return "HIGH";
    if(p.age>=60&&p.num_meds>=8) return "MEDIUM";
    if(p.age>=50||p.risk_probability>=50) return "MEDIUM";
    return "LOW";
  }
  const diabPats=PATIENTS.map(p=>({...p,dr:diabRisk(p)})).sort((a,b)=>({HIGH:0,MEDIUM:1,LOW:2}[a.dr]-{HIGH:0,MEDIUM:1,LOW:2}[b.dr]));
  const sel=selPat?diabPats.find(p=>p.patient_id===selPat):null;
  const prog=sel&&PROG[sel.patient_id];
  const cgmReadings=[95,93,90,88,87,90,108,125,148,165,170,158,145,135,122,115,112,110,118,135,162,178,175,160,148,138,128,122,118,115,124,142,165,170,165,150,138,130,122,118,115,112,108,105,102,100,97,95];
  const cgmPath=cgmReadings.map((v,i)=>{const x=5+(i/(cgmReadings.length-1))*480;const y=105-((v-60)/140)*95;return `${i===0?"M":"L"}${x.toFixed(1)},${y.toFixed(1)}`;}).join(" ");
  return(
    <div style={{opacity:v?1:0,transition:"opacity 0.4s"}}>
      {/* Sub-tabs */}
      <div style={{display:"flex",gap:8,marginBottom:24}}>
        {[{id:"diabetes",icon:"🩸",label:"Diabetes"},{id:"cardio",icon:"❤️",label:"Cardiovascular"},{id:"other",icon:"🔬",label:"Other Conditions"}].map(tab=>(
          <button key={tab.id} onClick={()=>setSubTab(tab.id)} style={{padding:"10px 20px",borderRadius:10,border:`2px solid ${subTab===tab.id?T.sky:T.border}`,background:subTab===tab.id?T.skyLight:T.white,color:subTab===tab.id?T.sky:T.muted,fontSize:13,fontWeight:subTab===tab.id?700:400,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:7,transition:"all 0.15s"}}>
            <span>{tab.icon}</span>{tab.label}
            {tab.id!=="diabetes"&&<span style={{fontSize:10,background:T.slateBg,padding:"1px 6px",borderRadius:8,color:T.muted}}>Soon</span>}
          </button>
        ))}
      </div>
      {subTab!=="diabetes"&&(
        <div style={{textAlign:"center",padding:"80px 40px",background:T.white,borderRadius:16,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:48,marginBottom:16}}>{subTab==="cardio"?"❤️":"🔬"}</div>
          <div style={{fontSize:18,fontWeight:700,color:T.text,marginBottom:8}}>{subTab==="cardio"?"Cardiovascular Module":"Other Conditions Module"}</div>
          <div style={{fontSize:14,color:T.muted}}>This specialist module is coming soon. The diabetes program demonstrates the full workflow.</div>
        </div>
      )}
      {subTab==="diabetes"&&(
        <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:20,minHeight:"calc(100vh - 200px)"}}>
          {/* Patient list */}
          <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,overflow:"hidden",display:"flex",flexDirection:"column",maxHeight:"calc(100vh - 200px)"}}>
            <div style={{padding:"14px 16px",borderBottom:`1px solid ${T.border}`}}>
              <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:2}}>Diabetes Risk Screening</div>
              <div style={{fontSize:11,color:T.muted}}>{diabPats.filter(p=>p.dr==="HIGH").length} high · {diabPats.filter(p=>p.dr==="MEDIUM").length} medium risk</div>
            </div>
            <div style={{overflowY:"auto",flex:1}}>
              {diabPats.map(p=>{
                const isSel=selPat===p.patient_id;
                return(
                  <div key={p.patient_id} onClick={()=>setSelPat(p.patient_id)} style={{padding:"12px 16px",borderBottom:`1px solid ${T.border}`,cursor:"pointer",background:isSel?T.skyLight:T.white,borderLeft:`3px solid ${isSel?T.sky:"transparent"}`,transition:"background 0.12s"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <span style={{fontWeight:700,fontSize:13,color:T.text}}>{p.patient_id}</span>
                      <span style={{padding:"2px 8px",borderRadius:8,fontSize:10,fontWeight:700,background:riskBg(p.dr),color:riskColor(p.dr)}}>{p.dr}</span>
                    </div>
                    <div style={{fontSize:11,color:T.muted,marginBottom:3}}>{p.age}y · {p.diagnosis.split("|")[0].trim()}</div>
                    {enrolled[p.patient_id]&&<span style={{fontSize:10,padding:"1px 7px",borderRadius:8,background:T.greenLight,color:T.green,fontWeight:600}}>● Enrolled</span>}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Detail panel */}
          <div style={{overflowY:"auto",display:"flex",flexDirection:"column",gap:16}}>
            {!sel&&(
              <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,padding:"60px",textAlign:"center"}}>
                <div style={{fontSize:40,marginBottom:12}}>🩸</div>
                <div style={{fontSize:16,fontWeight:600,color:T.text,marginBottom:6}}>Select a patient</div>
                <div style={{fontSize:13,color:T.muted}}>Choose a patient to view their diabetes risk assessment and monitoring data.</div>
              </div>
            )}
            {sel&&(<>
              {/* Header */}
              <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,padding:"20px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                    <span style={{fontSize:16,fontWeight:700,color:T.text}}>{sel.patient_id}</span>
                    <span style={{padding:"3px 9px",borderRadius:8,fontSize:11,fontWeight:700,background:riskBg(sel.dr),color:riskColor(sel.dr)}}>{sel.dr} DIABETES RISK</span>
                    {enrolled[sel.patient_id]&&<span style={{padding:"3px 9px",borderRadius:8,fontSize:11,fontWeight:600,background:T.greenLight,color:T.green}}>● In Program</span>}
                  </div>
                  <div style={{fontSize:12,color:T.muted}}>{sel.age} years · {sel.diagnosis}</div>
                </div>
                {!enrolled[sel.patient_id]&&(
                  <button onClick={()=>{setEnrolled(e=>({...e,[sel.patient_id]:true}));addToast(`${sel.patient_id} enrolled in Diabetes Monitoring Program. CGM kit will be dispatched.`);}} style={{padding:"9px 18px",borderRadius:9,background:T.sky,border:"none",color:T.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+ Enroll in Program</button>
                )}
              </div>
              {/* AI Risk Assessment */}
              <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,padding:"20px 24px"}}>
                <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:16}}>🤖 AI Diabetes Risk Assessment</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12,marginBottom:16}}>
                  {[{label:"Diabetes Risk Score",val:sel.dr==="HIGH"?"78%":sel.dr==="MEDIUM"?"52%":"21%",color:riskColor(sel.dr)},{label:"Model Confidence",val:"84%",color:T.sky},{label:"Est. Time to Onset",val:sel.dr==="HIGH"?"1–2 yrs":sel.dr==="MEDIUM"?"3–5 yrs":">10 yrs",color:T.muted},{label:"HbA1c (predicted)",val:sel.dr==="HIGH"?"7.2%":sel.dr==="MEDIUM"?"6.1%":"5.4%",color:sel.dr==="HIGH"?T.red:T.muted}].map((item,i)=>(
                    <div key={i} style={{background:T.slateBg,borderRadius:10,padding:"12px 16px"}}>
                      <div style={{fontSize:10,color:T.muted,fontWeight:500,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>{item.label}</div>
                      <div style={{fontSize:20,fontWeight:700,color:item.color}}>{item.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:11,color:T.muted,fontWeight:600,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Key Risk Factors</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {[sel.diagnosis.includes("Type 2 Diabetes")&&"Active T2D diagnosis",sel.age>=65&&"Age ≥ 65",sel.num_meds>=8&&"Polypharmacy (≥8 meds)",sel.smoking_status==="current"&&"Current smoker",sel.diagnosis.includes("Heart")&&"Cardiovascular comorbidity",sel.diagnosis.includes("COPD")&&"COPD present"].filter(Boolean).map((f,i)=>(
                    <span key={i} style={{padding:"3px 10px",borderRadius:8,fontSize:11,background:T.redLight,color:T.red,fontWeight:500}}>{f}</span>
                  ))}
                </div>
              </div>
              {/* Enrolled: program panels */}
              {enrolled[sel.patient_id]&&prog&&(<>
                {/* Program status */}
                <div style={{background:`linear-gradient(135deg,${T.navy} 0%,#1a3a5c 100%)`,borderRadius:14,padding:"18px 24px",color:T.white}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:T.sky,marginBottom:4}}>Diabetes Monitoring Program</div>
                      <div style={{fontSize:22,fontWeight:700}}>Day {prog.day} of 14</div>
                      <div style={{fontSize:12,color:"rgba(248,250,252,0.6)",marginTop:3}}>{prog.phase==="monitoring"?"Phase 1: Data Collection (Days 1–7)":"Phase 2: AI Recommendations Active (Days 8–14)"}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:11,color:"rgba(248,250,252,0.5)",marginBottom:4}}>Latest Glucose</div>
                      <div style={{fontSize:28,fontWeight:700,color:prog.lastGlucose>140?T.amber:T.sky}}>{prog.lastGlucose} <span style={{fontSize:13,fontWeight:400}}>mg/dL</span></div>
                      <div style={{fontSize:11,color:"rgba(248,250,252,0.5)",marginTop:2}}>7-day avg: {prog.avgGlucose} mg/dL</div>
                    </div>
                  </div>
                  <div style={{marginTop:14,background:"rgba(255,255,255,0.08)",borderRadius:8,height:6,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${(prog.day/14)*100}%`,background:T.sky,borderRadius:8}}/>
                  </div>
                </div>
                {/* CGM chart */}
                <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,padding:"20px 24px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                    <div style={{fontSize:13,fontWeight:700,color:T.text}}>📈 Continuous Glucose Monitor — Today</div>
                    <span style={{fontSize:11,padding:"2px 8px",borderRadius:8,background:T.greenLight,color:T.green,fontWeight:600}}>Live Sync</span>
                  </div>
                  <svg width="100%" viewBox="0 0 490 115" style={{overflow:"visible"}}>
                    <rect x="5" y={105-((140-60)/140)*95} width="480" height={((140-70)/140)*95} fill="#D1FAE5" opacity="0.5" rx="3"/>
                    {[70,100,140,180].map(g=>{const y=105-((g-60)/140)*95;return(<g key={g}><line x1="5" y1={y} x2="485" y2={y} stroke={T.border} strokeWidth="0.5"/><text x="0" y={y+3} fontSize="9" fill={T.muted}>{g}</text></g>);})}
                    <path d={cgmPath} fill="none" stroke={T.sky} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:10}}>
                    {[{label:"Time in Range",val:"72%",color:T.green},{label:"Time Above",val:"21%",color:T.amber},{label:"Time Below",val:"7%",color:T.red}].map((s,i)=>(
                      <div key={i} style={{background:T.slateBg,borderRadius:9,padding:"10px 14px",textAlign:"center"}}>
                        <div style={{fontSize:18,fontWeight:700,color:s.color}}>{s.val}</div>
                        <div style={{fontSize:11,color:T.muted}}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Wearable + Nutrition */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,padding:"20px 24px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                      <div style={{fontSize:13,fontWeight:700,color:T.text}}>⌚ Wearable Device</div>
                      <span style={{fontSize:11,padding:"2px 8px",borderRadius:8,background:T.greenLight,color:T.green,fontWeight:600}}>Synced</span>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      {[{icon:"👣",label:"Steps Today",val:"4,521"},{icon:"🔥",label:"Calories",val:"1,847 kcal"},{icon:"💓",label:"Heart Rate",val:"72 bpm"},{icon:"😴",label:"Sleep",val:"6.8 hrs"}].map((w,i)=>(
                        <div key={i} style={{background:T.slateBg,borderRadius:10,padding:"12px"}}>
                          <div style={{fontSize:18,marginBottom:4}}>{w.icon}</div>
                          <div style={{fontSize:16,fontWeight:700,color:T.text}}>{w.val}</div>
                          <div style={{fontSize:11,color:T.muted}}>{w.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,padding:"20px 24px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                      <div style={{fontSize:13,fontWeight:700,color:T.text}}>🥗 Nutrition Tracker</div>
                      <span style={{fontSize:11,padding:"2px 8px",borderRadius:8,background:T.amberLight,color:T.amber,fontWeight:600}}>Syncing…</span>
                    </div>
                    {[{meal:"Breakfast",cal:420,notes:"Oats, banana, black coffee"},{meal:"Lunch",cal:680,notes:"Chicken salad, brown rice"},{meal:"Dinner",cal:null,notes:"Not yet logged"}].map((m,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:9,background:m.cal?T.slateBg:"none",border:`1px solid ${m.cal?T.border:"transparent"}`,marginBottom:6}}>
                        <span style={{fontSize:14}}>{i===0?"🌅":i===1?"☀️":"🌙"}</span>
                        <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:T.text}}>{m.meal}</div><div style={{fontSize:11,color:T.muted}}>{m.notes}</div></div>
                        {m.cal&&<div style={{textAlign:"right"}}><div style={{fontSize:12,fontWeight:700,color:T.text}}>{m.cal} kcal</div></div>}
                      </div>
                    ))}
                  </div>
                </div>
                {/* ML model */}
                <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,padding:"20px 24px"}}>
                  <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:14}}>🧠 AI Lifestyle Model</div>
                  {prog.phase==="monitoring"?(
                    <div style={{textAlign:"center",padding:"24px"}}>
                      <div style={{fontSize:32,marginBottom:10}}>⏳</div>
                      <div style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:6}}>Collecting baseline data…</div>
                      <div style={{fontSize:12,color:T.muted,marginBottom:16}}>Personalised recommendations will be ready on Day 8 after analysing 7 days of CGM, wearable and nutrition data.</div>
                      <div style={{background:T.slateBg,borderRadius:10,padding:"8px 16px",display:"inline-block",fontSize:12,color:T.muted}}>Day {prog.day} of 7 · {Math.round((prog.day/7)*100)}% collected</div>
                    </div>
                  ):(
                    <div style={{display:"flex",flexDirection:"column",gap:10}}>
                      <div style={{padding:"12px 16px",borderRadius:10,background:T.greenLight,border:`1px solid ${T.green}33`,fontSize:13,color:T.text}}><strong style={{color:T.green}}>✓ Reduce refined carbs</strong> — CGM shows consistent post-meal spikes above 160 mg/dL. Aim for &lt;45g net carbs per meal.</div>
                      <div style={{padding:"12px 16px",borderRadius:10,background:T.skyLight,border:`1px solid ${T.sky}33`,fontSize:13,color:T.text}}><strong style={{color:T.sky}}>✓ Post-meal activity</strong> — A 10-minute walk after meals reduces glucose spikes by up to 30% based on wearable data.</div>
                      <div style={{padding:"12px 16px",borderRadius:10,background:T.amberLight,border:`1px solid ${T.amber}33`,fontSize:13,color:T.text}}><strong style={{color:T.amber}}>⚠ Sleep quality</strong> — Average 6.8h sleep is contributing to elevated morning glucose. Target 7.5–8h per night.</div>
                    </div>
                  )}
                </div>
                {/* GP Notes & Referral */}
                <div style={{background:T.white,borderRadius:14,border:`1px solid ${T.border}`,padding:"20px 24px"}}>
                  <div style={{fontSize:13,fontWeight:700,color:T.text,marginBottom:14}}>📋 GP Notes & Referral</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
                    {DOCTORS.map(d=>(
                      <div key={d.id} style={{padding:"12px 14px",borderRadius:10,background:T.slateBg,border:`1px solid ${T.border}`,cursor:"pointer"}} onClick={()=>addToast(`${sel.patient_id} referred to ${d.name} (${d.specialty})`)}>
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                          <div style={{width:30,height:30,borderRadius:"50%",background:T.sky,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:T.white}}>{d.avatar}</div>
                          <div><div style={{fontSize:12,fontWeight:700,color:T.text}}>{d.name}</div><div style={{fontSize:10,color:T.muted}}>{d.specialty}</div></div>
                        </div>
                        <button style={{padding:"5px 12px",borderRadius:8,background:T.sky,border:"none",color:T.white,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",width:"100%"}}>Refer</button>
                      </div>
                    ))}
                  </div>
                  <textarea value={recNote} onChange={e=>setRecNote(e.target.value)} placeholder="Add clinical notes or recommendations for this patient…" rows={3}
                    style={{width:"100%",padding:"10px 14px",borderRadius:9,border:`1.5px solid ${T.border}`,fontSize:13,fontFamily:"inherit",outline:"none",resize:"vertical",boxSizing:"border-box",color:T.text,transition:"border-color 0.15s"}}
                    onFocus={e=>e.target.style.borderColor=T.sky} onBlur={e=>e.target.style.borderColor=T.border}/>
                  <button onClick={()=>{if(recNote.trim()){addToast("Note saved to patient record.");setRecNote("");}}} style={{marginTop:10,padding:"9px 20px",borderRadius:9,background:T.navy,border:"none",color:T.white,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Save Note</button>
                </div>
              </>)}
              {/* Not enrolled */}
              {!enrolled[sel.patient_id]&&(
                <div style={{background:T.white,borderRadius:14,border:`2px dashed ${T.border}`,padding:"48px",textAlign:"center"}}>
                  <div style={{fontSize:36,marginBottom:12}}>📲</div>
                  <div style={{fontSize:15,fontWeight:700,color:T.text,marginBottom:8}}>Ready to start monitoring?</div>
                  <div style={{fontSize:13,color:T.muted,marginBottom:20,maxWidth:360,margin:"0 auto 20px"}}>Enrolling this patient will dispatch a CGM kit and wearable device. The 14-day program begins when the patient activates their devices.</div>
                  <button onClick={()=>{setEnrolled(e=>({...e,[sel.patient_id]:true}));addToast(`${sel.patient_id} enrolled in Diabetes Monitoring Program. CGM kit will be dispatched.`);}} style={{padding:"11px 28px",borderRadius:10,background:T.sky,border:"none",color:T.white,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Enroll in 14-Day Program →</button>
                </div>
              )}
            </>)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Nav config ───────────────────────────────────────────────────────────────
const NAV=[{id:"dashboard",icon:"🏠",label:"Dashboard"},{id:"patients",icon:"👥",label:"Patients"},{id:"alerts",icon:"⚠️",label:"Active Alerts"},{id:"intake",icon:"📥",label:"Intake Queue"},{id:"schedule",icon:"📅",label:"Schedule"},{id:"analytics",icon:"📊",label:"Analytics"},{id:"specialist",icon:"🩺",label:"Specialist"},{id:"settings",icon:"⚙️",label:"Settings"}];
const PAGE_TITLES={dashboard:"Dashboard",patients:"Patients",alerts:"Active Alerts",intake:"Intake Queue",schedule:"Schedule & Calendar",analytics:"Analytics",specialist:"Specialist Referrals",settings:"Settings"};

// ─── Doctor Shell ─────────────────────────────────────────────────────────────
function DoctorShell({currentUser,onLogout,appointments,setAppointments,addToast}){
  const [page,setPage]=useState("dashboard");
  const alertCount=PATIENTS.filter(p=>p.risk_tier==="HIGH").length;
  const intakeCount=(()=>{try{return JSON.parse(localStorage.getItem("rews_intake_submissions")||"[]").filter(s=>s.status==="pending").length;}catch{return 0;}})();

  const renderPage=()=>{
    switch(page){
      case "dashboard": return <PageDashboard onNavigate={setPage}/>;
      case "patients":  return <PagePatients addToast={addToast}/>;
      case "alerts":    return <PageAlerts onNavigate={setPage} addToast={addToast}/>;
      case "intake":    return <PageIntakeQueue addToast={addToast} onNavigate={setPage}/>;
      case "schedule":  return <PageSchedule appointments={appointments} setAppointments={setAppointments} addToast={addToast}/>;
      case "analytics": return <PageAnalytics/>;
      case "specialist":return <PageSpecialist addToast={addToast}/>;
      case "settings":  return <PageSettings addToast={addToast}/>;
      default: return <PageDashboard onNavigate={setPage}/>;
    }
  };

  return(
    <div style={{display:"flex",minHeight:"100vh",fontFamily:"DM Sans,sans-serif",background:T.slateBg}}>
      {/* Sidebar */}
      <div style={{width:240,background:T.navy,display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,height:"100vh",zIndex:50}}>
        <div style={{padding:"24px 20px 20px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{fontSize:34,fontWeight:700,color:T.white,letterSpacing:"-0.02em",lineHeight:1}}>TriSyd</div>
          <div style={{fontSize:10,color:T.sky,letterSpacing:"0.12em",textTransform:"uppercase",marginTop:4,fontWeight:500}}>Early Warning</div>
        </div>
        <nav style={{flex:1,padding:"12px 8px",overflowY:"auto"}}>
          {NAV.map(item=>{
            const isActive=page===item.id;
            return(
              <button key={item.id} onClick={()=>setPage(item.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 12px",borderRadius:10,border:"none",background:isActive?"rgba(14,165,233,0.15)":"none",color:isActive?T.sky:T.textLight,fontSize:13,fontWeight:isActive?600:400,cursor:"pointer",fontFamily:"inherit",marginBottom:2,textAlign:"left",transition:"background 0.15s,color 0.15s",position:"relative"}}
                onMouseEnter={e=>{if(!isActive)e.currentTarget.style.background="rgba(255,255,255,0.05)";}}
                onMouseLeave={e=>{if(!isActive)e.currentTarget.style.background="none";}}>
                {isActive&&<div style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",width:3,height:20,background:T.sky,borderRadius:"0 2px 2px 0"}}/>}
                <span style={{fontSize:15}}>{item.icon}</span>
                <span>{item.label}</span>
                {item.id==="alerts"&&alertCount>0&&<span style={{marginLeft:"auto",background:T.red,color:T.white,borderRadius:10,padding:"1px 7px",fontSize:11,fontWeight:700}}>{alertCount}</span>}
                {item.id==="intake"&&intakeCount>0&&<span style={{marginLeft:"auto",background:T.amber,color:T.white,borderRadius:10,padding:"1px 7px",fontSize:11,fontWeight:700}}>{intakeCount}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{padding:"14px 16px",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:T.sky,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontWeight:700,fontSize:13,flexShrink:0}}>
              {currentUser.name.charAt(0)}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:600,color:T.white,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{currentUser.name}</div>
              <div style={{fontSize:10,color:T.sky,textTransform:"capitalize"}}>{currentUser.role}</div>
            </div>
          </div>
          <button onClick={onLogout} style={{width:"100%",padding:"7px",borderRadius:8,background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"background 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.25)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,0.15)"}>
            Sign Out
          </button>
        </div>
      </div>
      {/* Main content */}
      <div style={{marginLeft:240,flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{height:60,background:T.white,borderBottom:`1px solid ${T.border}`,padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:40}}>
          <div style={{fontSize:17,fontWeight:700,color:T.text}}>{PAGE_TITLES[page]}</div>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div style={{fontSize:12,color:T.muted}}>{new Date().toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}</div>
            <div style={{position:"relative",cursor:"pointer"}} onClick={()=>setPage("alerts")}>
              <span style={{fontSize:20}}>🔔</span>
              {alertCount>0&&<span style={{position:"absolute",top:-4,right:-4,width:16,height:16,background:T.red,borderRadius:"50%",fontSize:9,color:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{alertCount}</span>}
            </div>
            <div style={{width:34,height:34,borderRadius:"50%",background:T.sky,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontWeight:700,fontSize:14,cursor:"pointer"}}>{currentUser.name.charAt(0)}</div>
          </div>
        </div>
        <div style={{flex:1,padding:"32px",overflowY:page==="patients"?"hidden":"auto"}}>
          <div key={page} style={{animation:"pageIn 0.35s ease"}}>
            <style>{`@keyframes pageIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App(){
  const [currentUser,setCurrentUser]=useState(()=>{
    try{ return JSON.parse(localStorage.getItem("rews_user")||"null"); }catch{ return null; }
  });
  const [appointments,setAppointments]=useState(DEFAULT_APPOINTMENTS);
  const [toasts,setToasts]=useState([]);

  function addToast(msg,type="success"){
    const id=Date.now()+Math.random();
    setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),4000);
  }

  function handleLogin(user){
    localStorage.setItem("rews_user",JSON.stringify(user));
    setCurrentUser(user);
  }

  function handleLogout(){
    localStorage.removeItem("rews_user");
    setCurrentUser(null);
  }

  if(!currentUser) return <PageLogin onLogin={handleLogin}/>;

  if(currentUser.role==="patient"){
    return(
      <>
        <PatientPortal currentUser={currentUser} onLogout={handleLogout} appointments={appointments} setAppointments={setAppointments} addToast={addToast}/>
        <ToastContainer toasts={toasts}/>
      </>
    );
  }

  return(
    <>
      <DoctorShell currentUser={currentUser} onLogout={handleLogout} appointments={appointments} setAppointments={setAppointments} addToast={addToast}/>
      <ToastContainer toasts={toasts}/>
    </>
  );
}
