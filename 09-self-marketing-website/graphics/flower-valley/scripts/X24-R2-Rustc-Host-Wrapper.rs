// DJMRN X24-R2 owner-authored rustc invocation wrapper. No PATH mutations,
// no changes to original webgd source, no network/permissions/security changes.
// Cargo calls this with: rustc-wrapper.exe <actual rustc path> <normal args>.
// Adds only supported Windows GNU host flags for build-scripts/proc-macros.
use std::{env,ffi::{OsStr,OsString},process::{Command,exit}};
fn main() {
 let mut it=env::args_os().skip(1);
 let Some(compiler)=it.next() else {eprintln!("X24 wrapper missing rustc");exit(2)};
 let passed:Vec<OsString>=it.collect();
 let is_compile=passed.iter().any(|v|v==OsStr::new("--crate-name"));
 let is_wasm=passed.windows(2).any(|v|v[0]==OsStr::new("--target") &&
   v[1].to_string_lossy().starts_with("wasm32-"));
 let mut cmd=Command::new(compiler);
 cmd.args(&passed);
 if is_compile&&!is_wasm {
  cmd.arg("-C").arg("link-self-contained=yes");
  if let Some(dlltool)=env::var_os("DJMRN_DLLTOOL"){
   let mut flag=OsString::from("dlltool=");flag.push(dlltool);
   cmd.arg("-C").arg(flag);
  }
 }
 match cmd.status() {
  Ok(st)=>exit(st.code().unwrap_or(1)),
  Err(e)=>{eprintln!("X24 wrapper rustc spawn failed: {e}");exit(3)}
 }
}
