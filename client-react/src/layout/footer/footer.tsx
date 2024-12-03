export default function Footer() {
  const footerStyle: React.CSSProperties = {
    backgroundColor: "#EBC55A",
    color: "black",
    padding: "20px",
    textAlign: "center",
  };

  const textStyle: React.CSSProperties = {
    fontSize: "20px",
  };

  return (
    <footer style={footerStyle}>
      <p style={textStyle}>
        כל הזכויות שמורות לד'יגימון ישראל &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
