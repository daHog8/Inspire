export default function HomePage() {
  return (
    <main style={{minHeight:"100vh",display:"grid",placeItems:"center",textAlign:"center",padding:"24px"}}>
      <section>
        <p style={{letterSpacing:"0.35em",textTransform:"uppercase"}}>Maison de parfums</p>
        <h1 style={{fontSize:"clamp(4rem,12vw,8rem)",margin:"1rem 0"}}>INSPIRE</h1>
        <p style={{fontSize:"1.5rem"}}>L&apos;inspiration sur la peau.</p>
      </section>
    </main>
  );
}
